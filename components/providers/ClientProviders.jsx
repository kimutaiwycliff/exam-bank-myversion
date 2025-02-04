'use client';
import { Toaster } from '../ui/toaster';
import ReactQueryProvider from './react-query-provider';
import SideBarProvider from './SideBarProvider';
import { ThemeProvider } from './theme-provider';
import { UserProvider } from './UserContext';

const ClientProviders = ({ children }) => {
  return (
    <ReactQueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster />
        {children}
        {/* <SideBarProvider>{children}</SideBarProvider> */}
        <UserProvider />
      </ThemeProvider>
    </ReactQueryProvider>
  );
};
export default ClientProviders;
