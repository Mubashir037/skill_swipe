import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import Navbar from '../components/navbar';
import './jobdetails.css';

const JobForm = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const [form, setForm] = useState({ jobrole: '', jobdescription: '', salary: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEdit) {
            axios.get(`/jobs/${id}`).then((res) => {
                const job = res.data.job;
                setForm({
                    jobrole: job.jobrole,
                    jobdescription: job.jobdescription,
                    salary: job.salary
                });
            });
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (isEdit) {
                await axios.put(`/jobs/${id}`, form);
            } else {
                await axios.post('/jobs', form);
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="detail-screen">
            <Navbar />
            <div className="detail-card">
                <span className="detail-eyebrow">{isEdit ? 'Edit role' : 'New role'}</span>
                <h1 className="detail-title">{isEdit ? 'Edit job posting' : 'Post a job'}</h1>

                <form onSubmit={handleSubmit} className="ticket-form" style={{ marginTop: '1.5rem' }}>
                    <label className="field">
                        <span className="field-label">Job role</span>
                        <input
                            type="text"
                            name="jobrole"
                            value={form.jobrole}
                            onChange={handleChange}
                            placeholder="e.g. Backend Developer"
                            required
                        />
                    </label>

                    <label className="field">
                        <span className="field-label">Description</span>
                        <textarea
                            name="jobdescription"
                            value={form.jobdescription}
                            onChange={handleChange}
                            placeholder="Describe the role, responsibilities, requirements…"
                            rows={5}
                            required
                        />
                    </label>

                    <label className="field">
                        <span className="field-label">Salary (Rs / month)</span>
                        <input
                            type="number"
                            name="salary"
                            value={form.salary}
                            onChange={handleChange}
                            placeholder="80000"
                            required
                            min={0}
                        />
                    </label>

                    {error && <p className="field-error">{error}</p>}

                    <button type="submit" className="detail-apply" disabled={loading}>
                        {loading ? 'Saving…' : isEdit ? 'Save changes' : 'Post job'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default JobForm;