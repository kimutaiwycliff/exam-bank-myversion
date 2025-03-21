'use client';
import BreadCrumbsHeader from '@/components/layout/BreadCrumbsHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useMemo, memo } from 'react';

const items = [{ name: 'User Management' }];

const UsersPage = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Memoize the list to prevent reallocation
  const list = useMemo(() => ['Staff', 'Schools', 'Teachers', 'Students'], []);

  // Memoize handleClick to prevent re-renders
  const handleClick = useCallback(
    (name) => router.push(`${pathname}/${name}`),
    [pathname, router]
  );

  return (
    <div className="md:w-1/2">
      <BreadCrumbsHeader items={items} containerClass={'pt-10 pl-7'} />
      <div className="p-5 px-10">
        <Card className="border-0">
          <CardHeader className="py-4 bg-slate-200">
            <CardTitle className="text-xl">User Management</CardTitle>
          </CardHeader>
          <CardContent className="py-5">
            <ul className="list-inside divide-y-2 border rounded-none p-2">
              {list.map((item) => (
                <ListItem key={item} name={item} handleClick={handleClick} />
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Memoized ListItem to prevent unnecessary re-renders
const ListItem = memo(({ name, handleClick }) => {
  return (
    <li
      className="p-2 hover:cursor-pointer hover:bg-slate-100 rounded-lg"
      onClick={() => handleClick(name.toLowerCase())}
    >
      {name}
    </li>
  );
});
ListItem.displayName = "ListItem";
export default UsersPage;
