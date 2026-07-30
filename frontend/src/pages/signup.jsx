import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import './login.css';

const Signup = () => {
    const [form, setForm] = useState({
        userid: '',
        username: '',
        email: '',
        password: '',
        contact: '',
        role: 'seeker'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await axios.post('/auth/signup', form);
            login(res.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. Please check your details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-screen">
            <div className="auth-panel">
                <span className="auth-eyebrow">SkillSwipe</span>
                <h1 className="auth-headline">
                    Post roles.<br />Find people.
                </h1>
                <p className="auth-sub">
                    Create an account to start applying to jobs, or list openings if you're hiring.
                </p>
                <div className="auth-stack" aria-hidden="true">
                    <div className="stack-card stack-card-1" />
                    <div className="stack-card stack-card-2" />
                    <div className="stack-card stack-card-3" />
                </div>
            </div>

            <div className="auth-form-wrap">
                <div className="ticket">
                    <div className="ticket-tag">NEW&nbsp;ACCOUNT</div>

                    <div className="ticket-body">
                        <h2 className="ticket-title">Create account</h2>
                        <p className="ticket-caption">Takes less than a minute</p>

                        <form onSubmit={handleSubmit} className="ticket-form">
                            <label className="field">
                                <span className="field-label">User ID</span>
                                <input
                                    type="text"
                                    name="userid"
                                    value={form.userid}
                                    onChange={handleChange}
                                    placeholder="Choose a unique ID"
                                    required
                                />
                            </label>

                            <label className="field">
                                <span className="field-label">Full name</span>
                                <input
                                    type="text"
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    required
                                />
                            </label>

                            <label className="field">
                                <span className="field-label">Email</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                />
                            </label>

                            <label className="field">
                                <span className="field-label">Contact number</span>
                                <input
                                    type="text"
                                    name="contact"
                                    value={form.contact}
                                    onChange={handleChange}
                                    placeholder="03xxxxxxxxx"
                                    required
                                />
                            </label>

                            <label className="field">
                                <span className="field-label">Password</span>
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="At least 6 characters"
                                    required
                                    minLength={6}
                                />
                            </label>

                            <label className="field">
                                <span className="field-label">I am a</span>
                                <select name="role" value={form.role} onChange={handleChange}>
                                    <option value="seeker">Job seeker</option>
                                    <option value="recruiter">Recruiter</option>
                                </select>
                            </label>

                            {error && <p className="field-error">{error}</p>}

                            <button type="submit" className="ticket-submit" disabled={loading}>
                                {loading ? 'Creating account…' : 'Create account'}
                            </button>
                        </form>

                        <p className="ticket-footer">
                            Already have an account? <Link to="/login">Sign in</Link>
                        </p>
                    </div>

                    <div className="ticket-perforation" aria-hidden="true">
                        {Array.from({ length: 22 }).map((_, i) => (
                            <span key={i} />
                        ))}
                    </div>

                    <div className="ticket-stub">
                        <span>Valid for one session</span>
                        <span className="stub-code">SS–{new Date().getFullYear()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;