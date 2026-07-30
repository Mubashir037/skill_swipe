import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import './landing.css';

const testimonials = [
    { name: 'Ayesha R.', role: 'Hired as Backend Developer', quote: 'Found a role in nine days. The application tracker kept me from chasing every recruiter by email.' },
    { name: 'Bilal K.', role: 'Recruiter, fintech startup', quote: "Posted a role, reviewed applicants, and moved someone to accepted the same afternoon. That's the whole point." },
    { name: 'Fatima S.', role: 'Hired as UI Designer', quote: 'No noise, no irrelevant listings. Just roles that matched what I searched for.' },
];

const Landing = () => {
    return (
        <div className="land-screen">
            <Navbar />

            {/* HERO */}
            <section className="land-hero">
                <span className="land-eyebrow">SkillSwipe · Job Portal</span>
                <h1 className="land-headline">
                    A quieter way<br />to find your next role
                </h1>
                <p className="land-sub">
                    Post a job in minutes, or apply to one in seconds. No clutter,
                    no cold outreach — just people and roles that fit.
                </p>
                <div className="land-cta-row">
                    <Link to="/signup" className="land-cta-primary">Get started</Link>
                    <Link to="/jobs" className="land-cta-secondary">Browse open roles →</Link>
                </div>

                <div className="land-stats">
                    <div className="land-stat">
                        <span className="land-stat-num">1,200+</span>
                        <span className="land-stat-label">Roles posted</span>
                    </div>
                    <div className="land-stat">
                        <span className="land-stat-num">340+</span>
                        <span className="land-stat-label">Companies hiring</span>
                    </div>
                    <div className="land-stat">
                        <span className="land-stat-num">9 days</span>
                        <span className="land-stat-label">Median time to hire</span>
                    </div>
                </div>
            </section>

            {/* MISSION */}
            <section className="land-mission">
                <div className="land-mission-inner">
                    <span className="land-eyebrow">Why we built this</span>
                    <h2 className="land-mission-title">
                        Hiring shouldn't feel like<br />shouting into a crowd.
                    </h2>
                    <p className="land-mission-text">
                        Most job boards optimize for volume — more listings, more applicants,
                        more noise. We built SkillSwipe around the opposite idea: fewer,
                        better-matched connections between people who are hiring and people
                        who are ready to work. One dashboard, one clear status for every
                        application, no guessing where you stand.
                    </p>
                </div>

                <div className="land-pillars">
                    <div className="land-pillar">
                        <span className="land-pillar-mark">01</span>
                        <h3>Post in minutes</h3>
                        <p>Write a role, set a salary, publish it. No approval queues.</p>
                    </div>
                    <div className="land-pillar">
                        <span className="land-pillar-mark">02</span>
                        <h3>Apply with one click</h3>
                        <p>Your profile carries over — no repeated forms per listing.</p>
                    </div>
                    <div className="land-pillar">
                        <span className="land-pillar-mark">03</span>
                        <h3>Track every status</h3>
                        <p>Pending, accepted, or rejected — always visible, never a mystery.</p>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="land-reviews">
                <span className="land-eyebrow" style={{ textAlign: 'center', display: 'block' }}>
                    What people are saying
                </span>
                <h2 className="land-reviews-title">Stamped and approved</h2>

                <div className="land-review-grid">
                    {testimonials.map((t, i) => (
                        <div className="review-card" key={i}>
                            <div className="review-stamp">✓ VERIFIED</div>
                            <p className="review-quote">"{t.quote}"</p>
                            <div className="review-author">
                                <span className="review-name">{t.name}</span>
                                <span className="review-role">{t.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="land-final-cta">
                <h2>Ready to find what's next?</h2>
                <Link to="/signup" className="land-cta-primary">Create your free account</Link>
            </section>

            {/* FOOTER */}
            <footer className="land-footer">
                <div className="land-footer-top">
                    <div className="land-footer-brand">
                        <span className="land-footer-logo">SkillSwipe</span>
                        <p>A quieter way to hire and get hired.</p>
                    </div>

                    <div className="land-footer-col">
                        <span className="land-footer-heading">Product</span>
                        <Link to="/jobs">Browse jobs</Link>
                        <Link to="/signup">Post a job</Link>
                        <Link to="/dashboard">Dashboard</Link>
                    </div>

                    <div className="land-footer-col">
                        <span className="land-footer-heading">Company</span>
                        <a href="#">About</a>
                        <a href="#">Mission</a>
                        <a href="#">Contact</a>
                    </div>

                    <div className="land-footer-col">
                        <span className="land-footer-heading">Account</span>
                        <Link to="/login">Sign in</Link>
                        <Link to="/signup">Create account</Link>
                    </div>
                </div>

                <div className="land-footer-bottom">
                    <span>© {new Date().getFullYear()} SkillSwipe. All rights reserved.</span>
                </div>
            </footer>
        </div>
    );
};

export default Landing;