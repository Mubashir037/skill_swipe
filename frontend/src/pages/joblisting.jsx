import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import Navbar from '../components/navbar';
import './joblisting.css';

const JobListing = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get('/jobs');
                setJobs(res.data.jobs);
            } catch (err) {
                setError('Could not load jobs right now.');
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter(job =>
        job.jobrole?.toLowerCase().includes(search.toLowerCase()) ||
        job.jobdescription?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="listing-screen">
            <Navbar />

            <div className="listing-hero">
                <span className="listing-eyebrow">Open roles</span>
                <h1 className="listing-headline">Find work worth doing</h1>
                <input
                    type="text"
                    className="listing-search"
                    placeholder="Search by role or keyword…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="listing-body">
                {loading && <p className="listing-status">Loading jobs…</p>}
                {error && <p className="listing-status listing-error">{error}</p>}
                {!loading && !error && filteredJobs.length === 0 && (
                    <p className="listing-status">No jobs match your search yet.</p>
                )}

                <div className="job-grid">
                    {filteredJobs.map((job) => (
                        <Link to={`/jobs/${job._id}`} className="job-card" key={job._id}>
                            <span className="job-card-role">{job.jobrole}</span>
                            <p className="job-card-desc">{job.jobdescription}</p>
                            <div className="job-card-footer">
                                <span className="job-card-salary">
                                    Rs {job.salary?.toLocaleString()}
                                </span>
                                <span className="job-card-arrow">View →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JobListing;