import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/navbar';
import './dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();
    const [myJobs, setMyJobs] = useState([]);
    const [myApplications, setMyApplications] = useState([]);
    const [applicantsByJob, setApplicantsByJob] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user?.role === 'recruiter') {
                    const jobsRes = await axios.get('/jobs');
                    const allJobs = jobsRes.data?.jobs || [];
                    const owned = allJobs.filter((j) => j.postedby === user._id);
                    setMyJobs(owned);
                } else {
                    const appsRes = await axios.get('/application/my');
                    setMyApplications(appsRes.data?.applications || []);
                }
            } catch (err) {
                console.error("Dashboard fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchData();
        else setLoading(false);
    }, [user]);

    const handleDelete = async (jobId) => {
        if (!window.confirm('Delete this job posting?')) return;
        try {
            await axios.delete(`/jobs/${jobId}`);
            setMyJobs(myJobs.filter((j) => j._id !== jobId));
        } catch (err) {
            alert(err.response?.data?.message || 'Could not delete job.');
        }
    };

    const viewApplicants = async (jobId) => {
        try {
            const res = await axios.get(`/application/${jobId}/applicants`);
            setApplicantsByJob({ ...applicantsByJob, [jobId]: res.data?.applicants || [] });
        } catch (err) {
            alert(err.response?.data?.message || 'Could not load applicants.');
        }
    };

    const updateStatus = async (applicationId, jobId, status) => {
        try {
            await axios.put(`/application/${applicationId}/status`, { status });
            viewApplicants(jobId);
        } catch (err) {
            alert(err.response?.data?.message || 'Could not update status.');
        }
    };

    if (!user || loading) {
        return (
            <div className="dash-screen">
                <Navbar />
                <p className="dash-status">Loading dashboard…</p>
            </div>
        );
    }

    return (
        <div className="dash-screen">
            <Navbar />
            <div className="dash-body">
                <div className="dash-header">
                    <div>
                        <span className="dash-eyebrow">Dashboard</span>
                        <h1 className="dash-title">
                            {user.role === 'recruiter' ? 'Your posted roles' : 'Your applications'}
                        </h1>
                    </div>
                    {user.role === 'recruiter' && (
                        <Link to="/jobs/new" className="dash-new-btn">+ Post a job</Link>
                    )}
                </div>

                {user.role === 'recruiter' ? (
                    myJobs.length === 0 ? (
                        <p className="dash-status">You haven't posted any jobs yet.</p>
                    ) : (
                        <div className="dash-list">
                            {myJobs.map((job) => (
                                <div className="dash-card" key={job._id}>
                                    <div className="dash-card-top">
                                        <h3>{job.jobrole}</h3>
                                        <span className="dash-salary">Rs {job.salary?.toLocaleString()}</span>
                                    </div>
                                    <p className="dash-desc">{job.jobdescription}</p>
                                    <div className="dash-actions">
                                        <Link to={`/jobs/${job._id}/edit`}>Edit</Link>
                                        <button onClick={() => handleDelete(job._id)}>Delete</button>
                                        <button onClick={() => viewApplicants(job._id)}>View applicants</button>
                                    </div>

                                    {applicantsByJob[job._id] && (
                                        <div className="dash-applicants">
                                            {applicantsByJob[job._id].length === 0 ? (
                                                <p className="dash-status">No applicants yet.</p>
                                            ) : (
                                                applicantsByJob[job._id].map((app) => (
                                                    <div className="dash-applicant" key={app._id}>
                                                        <span>{app.userid?.username || app.userid}</span>
                                                        <span className={`dash-badge dash-badge-${app.status}`}>
                                                            {app.status}
                                                        </span>
                                                        <div className="dash-applicant-actions">
                                                            <button onClick={() => updateStatus(app._id, job._id, 'accepted')}>Accept</button>
                                                            <button onClick={() => updateStatus(app._id, job._id, 'rejected')}>Reject</button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )
                ) : myApplications.length === 0 ? (
                    <p className="dash-status">You haven't applied to any jobs yet.</p>
                ) : (
                    <div className="dash-list">
                        {myApplications.map((app) => (
                            <div className="dash-card" key={app._id}>
                                <div className="dash-card-top">
                                    <h3>{app.jobid?.jobrole || 'Job'}</h3>
                                    <span className={`dash-badge dash-badge-${app.status}`}>{app.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;