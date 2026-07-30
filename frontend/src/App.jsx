import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import JobListing from './pages/joblisting';
import JobDetail from './pages/jobdetails';
import JobForm from './pages/jobform';
import Dashboard from './pages/dashboard';
function App() {
  return (
    <Routes>
      <Route path="/jobs/new" element={<JobForm />} />
<Route path="/jobs/:id/edit" element={<JobForm />} />
      <Route path="/" element={<JobListing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/jobs/:id" element={<JobDetail />} />
    </Routes>
  );
}

export default App;

