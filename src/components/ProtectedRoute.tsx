import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import supabase from '../services/supabase'; // Supabase instance
import Spinner from './Spinner';

const ProtectedRoute: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession(); // Fetch session from Supabase
      if (session) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setLoading(false); // Stop loading once session is checked
    };

    checkSession();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
