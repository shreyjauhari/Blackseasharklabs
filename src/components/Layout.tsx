import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <div className="relative min-h-screen bg-base-black">
      <div className="ambient-bg" />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        {!isLogin && <Footer />}
      </div>
    </div>
  );
}
