import { Outlet } from 'react-router-dom';
import { Footer, Navbar, Sidebar } from '../components';
import AuthWrapper from './AuthWrapper';

const SharedPage = () => {
  return (
    <AuthWrapper>
      <Navbar />
      <Sidebar />
      <Outlet />
      <Footer />
    </AuthWrapper>
  );
};
export default SharedPage;
