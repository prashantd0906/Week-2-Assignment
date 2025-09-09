import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import RouteGuard from './routes/RouteGuard';

const Login = lazy(() => import('./Pages/Login'));
const Todos = lazy(() => import('./Pages/Todos'));
const Toggle = lazy(() => import('./Component/Toggle'));

export default function App() {

  const PublicLogin = RouteGuard(Login); // defaults to public
  const ProtectedTodos = RouteGuard(Todos, { mode: "private" });

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          <Route path="/login" element={<PublicLogin />} />
          <Route path="/todos" element={<ProtectedTodos />} />
          
          <Route path="/toggle" element={<Toggle />} />

          <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
