import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Projects from './components/public/Projects';
import Skills from './components/public/Skills';
import Bio from './components/public/Bio';
import Dashboard from './components/admin/Dashboard';
import SignIn from './components/auth/SignIn';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/bio" element={<Bio />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
