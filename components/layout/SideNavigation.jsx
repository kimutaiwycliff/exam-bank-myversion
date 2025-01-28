'use client';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/constants';
import Logo from './Logo';
import clsx from 'clsx';

const NavigationItem = ({ item, isActive }) => (
  <SidebarMenuItem>
    <SidebarMenuButton asChild className="rounded-sm">
      <Link
        className={clsx(
          'py-5 px-10 hover:bg-primary transition-colors flex items-center gap-4 font-semibold',
          { 'bg-primary': isActive }
        )}
        href={item.href}
      >
        <item.icon />
        <span>{item.name}</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
);
const SideNavigation = () => {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="mx-auto mt-14 w-full">
          <Logo />
        </div>
      </SidebarHeader>

      <SidebarContent className="">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-4">
              {navLinks.map((item) => (
                <NavigationItem
                  key={item.name}
                  item={item}
                  isActive={pathname.includes(item.href)}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
export default SideNavigation;
