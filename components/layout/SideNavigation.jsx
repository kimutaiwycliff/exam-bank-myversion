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
import { useCallback, useMemo, memo } from 'react';
import dynamic from 'next/dynamic';
const Logo = dynamic(() => import('@/components/layout/Logo'), { ssr: false });
import clsx from 'clsx';
import { navLinks } from '@/constants';

// Memoized Navigation Item to prevent unnecessary re-renders
const NavigationItem = memo(({ item, isActive }) => (
  <SidebarMenuItem>
    <SidebarMenuButton asChild className="rounded-sm">
      <Link
        className={clsx(
          'py-5 px-5 text-lg hover:bg-slate-200 hover:text-slate-600 transition-colors flex items-center gap-4 font-semibold text-blue-100',
          { 'bg-primary': isActive }
        )}
        href={item.href}
      >
        <item.icon />
        <span>{item.name}</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
));

NavigationItem.displayName = "NavigationItem";

const SideNavigation = () => {
  const pathname = usePathname();

  // Memoize navLinks to avoid unnecessary re-renders
  const memoizedNavLinks = useMemo(() => navLinks, []);

  // Memoize isActive function to avoid re-creating it on every render
  const isActive = useCallback((href) => pathname.includes(href), [pathname]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="bg-slate-700">
        <div className="mx-auto mt-14 w-full">
          <Logo />
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-slate-700 pt-[1rem]">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-4">
              {memoizedNavLinks.map((item) => (
                <NavigationItem
                  key={item.name}
                  item={item}
                  isActive={isActive(item.href)}
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
