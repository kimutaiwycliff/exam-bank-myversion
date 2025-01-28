'use client';
import { Toaster } from '../ui/toaster';
import ReactQueryProvider from './react-query-provider';
import SideBarProvider from './SideBarProvider';
import { ThemeProvider } from './theme-provider';

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
        <SideBarProvider>{children}</SideBarProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
};
export default ClientProviders;
