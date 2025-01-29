'use client';
import SideBarProvider from '@/components/providers/SideBarProvider';

const MainLayout = ({ children }) => {
  return <SideBarProvider>{children}</SideBarProvider>;
};
export default MainLayout;
