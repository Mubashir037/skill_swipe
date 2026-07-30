import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await axios.post('/auth/login', { userid, password });
            login(res.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Check your details and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-screen">
            <div className="auth-panel">
                <span className="auth-eyebrow">SkillSwipe</span>
                <h1 className="auth-headline">
                    Your next role<br />is already posted.
                </h1>
                <p className="auth-sub">
                    Sign in to apply, track your applications, or manage the roles you've listed.
                </p>
                <div className="auth-stack" aria-hidden="true">
                    <div className="stack-card stack-card-1" />
                    <div className="stack-card stack-card-2" />
                    <div className="stack-card stack-card-3" />
                </div>
            </div>

            <div className="auth-form-wrap">
                <div className="ticket">
                    <div className="ticket-tag">ACCESS&nbsp;PASS</div>

                    <div className="ticket-body">
                        <h2 className="ticket-title">Sign in</h2>
                        <p className="ticket-caption">Enter your credentials to continue</p>

                        <form onSubmit={handleSubmit} className="ticket-form">
                            <label className="field">
                                <span className="field-label">User ID</span>
                                <input
                                    type="text"
                                    value={userid}
                                    onChange={(e) => setUserid(e.target.value)}
                                    placeholder="e.g. u010"
                                    required
                                />
                            </label>

                            <label className="field">
                                <span className="field-label">Password</span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                            </label>

                            {error && <p className="field-error">{error}</p>}

                            <button type="submit" className="ticket-submit" disabled={loading}>
                                {loading ? 'Signing in…' : 'Sign in'}
                            </button>
                        </form>

                        <p className="ticket-footer">
                            New here? <Link to="/signup">Create an account</Link>
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

export default Login;