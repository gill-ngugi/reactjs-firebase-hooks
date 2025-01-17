import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function PrivateRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="loading">
                <p>Loading...</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/signin" />;
    }

    const adminUID = process.env.REACT_APP_ADMIN_UID;
    if (user.uid !== adminUID) {
        return <Navigate to="/" />;
    }

    return children;
}

export default PrivateRoute;
