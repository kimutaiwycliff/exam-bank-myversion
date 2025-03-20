import Navbar from '../layout/Navbar';
import SideNavigation from '../layout/SideNavigation';
import { SidebarProvider } from '../ui/sidebar';

const SideBarProvider = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={true}>
       <div className="flex h-screen w-screen">
        {/* Sidebar */}
        <SideNavigation className="sticky top-0 h-screen overflow-auto" />

        {/* Main Content */}
        <main className="w-full overflow-auto">
          <Navbar />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};
export default SideBarProvider;
