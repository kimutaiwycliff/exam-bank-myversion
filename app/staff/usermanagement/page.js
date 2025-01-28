'use client';
import BreadCrumbsHeader from '@/components/layout/BreadCrumbsHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePathname, useRouter } from 'next/navigation';
const items = [{ name: 'User Management' }];
const list = ['Staff', 'Schools', 'Teachers', 'Students'];
const UsersPage = () => {
  const pathname = usePathname();
  const handleClick = (name) => {
    const router = useRouter();
    router.push(`${pathname}/${name}`, { scroll: false });
  };
  return (
    <div className="md:w-1/2">
      <BreadCrumbsHeader items={items} />
      <div className="p-5 px-10">
        <Card className="border-0">
          <CardHeader className=" py-4">
            <CardTitle className="text-xl">User Management</CardTitle>
          </CardHeader>
          <CardContent className="py-5">
            <ul className="list-inside divide-y-2  border rounded-sm p-2">
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
const ListItem = ({ name, handleClick }) => {
  return (
    <li
      className="p-2 hover:cursor-pointer hover:bg-primary/75"
      onClick={() => handleClick(name.toLowerCase())}
    >
      {name}
    </li>
  );
};
export default UsersPage;
