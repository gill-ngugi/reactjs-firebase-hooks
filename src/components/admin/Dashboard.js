import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ProjectForm from './ProjectForm';
import SkillForm from './SkillForm';
import BioForm from './BioForm';

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user.email}</p>
      </div>

      <div className="dashboard-container">
        <nav className="dashboard-nav">
          <ul>
            <li>
              <Link to="/dashboard">Overview</Link>
            </li>
            <li>
              <Link to="/dashboard/projects">Manage Projects</Link>
            </li>
            <li>
              <Link to="/dashboard/skills">Manage Skills</Link>
            </li>
            <li>
              <Link to="/dashboard/bio">Manage Bio</Link>
            </li>
          </ul>
        </nav>

        <div className="dashboard-content">
          <Routes>
            <Route path="/" element={
              <div className="dashboard-overview">
                <h2>Dashboard Overview</h2>
                <div className="dashboard-cards">
                  <div className="card">
                    <h3>Projects</h3>
                    <p>Manage your portfolio projects</p>
                    <Link to="/dashboard/projects" className="card-link">
                      Manage Projects
                    </Link>
                  </div>
                  <div className="card">
                    <h3>Skills</h3>
                    <p>Update your technical skills</p>
                    <Link to="/dashboard/skills" className="card-link">
                      Manage Skills
                    </Link>
                  </div>
                  <div className="card">
                    <h3>Bio</h3>
                    <p>Edit your professional bio</p>
                    <Link to="/dashboard/bio" className="card-link">
                      Update Bio
                    </Link>
                  </div>
                </div>
              </div>
            } />
            <Route path="projects" element={<ProjectForm />} />
            <Route path="skills" element={<SkillForm />} />
            <Route path="bio" element={<BioForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
