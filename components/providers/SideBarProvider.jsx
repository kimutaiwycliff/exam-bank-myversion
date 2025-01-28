import Navbar from '../layout/Navbar';
import SideNavigation from '../layout/SideNavigation';
import { SidebarProvider } from '../ui/sidebar';

const SideBarProvider = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <SideNavigation />
      <main className="w-full">
        <Navbar />
        {children}
      </main>
    </SidebarProvider>
  );
};
export default SideBarProvider;
