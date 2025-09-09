import {Navigate} from 'react-router-dom';
import {useAuth} from '../auth/AuthContext';

type GuardProps = {
  mode?: 'public' | 'private';
};

export default function RouteGuard<P extends object>(
  Component: React.ComponentType<P>,
  options: GuardProps = {},
) {
  const Wrapped: React.FC<P> = (props) => {
    const {isAuthenticated} = useAuth();
    const {mode = 'public'} = options;

    if (mode === 'private' && !isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (mode === 'public' && isAuthenticated) {
      return <Navigate to="/todos" replace />;
    }

    return <Component {...(props as P)} />;
  };

  return Wrapped;
}
