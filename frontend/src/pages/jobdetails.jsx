import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/navbar';
import './jobdetails.css';

const JobDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applyStatus, setApplyStatus] = useState('');
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await axios.get(`/jobs/${id}`);
                setJob(res.data.jj);
            } catch (err) {
                setApplyStatus('Job not found.');
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    const handleApply = async () => {
        if (!token) {
            navigate('/login');
            return;
        }
        setApplying(true);
        setApplyStatus('');
        try {
            await axios.post(`/application/${id}/apply`);
            setApplyStatus('Application submitted.');
        } catch (err) {
            setApplyStatus(err.response?.data?.message || 'Could not apply.');
        } finally {
            setApplying(false);
        }
    };

    if (loading) return (
        <div className="detail-screen">
            <Navbar />
            <p className="detail-status">Loading…</p>
        </div>
    );

    if (!job) return (
        <div className="detail-screen">
            <Navbar />
            <p className="detail-status">{applyStatus || 'Job not found.'}</p>
        </div>
    );

    return (
        <div className="detail-screen">
            <Navbar />
            <div className="detail-card">
                <span className="detail-eyebrow">Open role</span>
                <h1 className="detail-title">{job.jobrole}</h1>
                <p className="detail-salary">Rs {job.salary?.toLocaleString()} / month</p>

                <p className="detail-desc">{job.jobdescription}</p>

                <button
                    className="detail-apply"
                    onClick={handleApply}
                    disabled={applying}
                >
                    {applying ? 'Applying…' : 'Apply now'}
                </button>

                {applyStatus && <p className="detail-message">{applyStatus}</p>}
            </div>
        </div>
    );
};

export default JobDetail;