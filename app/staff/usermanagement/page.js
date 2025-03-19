'use client';
import BreadCrumbsHeader from '@/components/layout/BreadCrumbsHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePathname, useRouter } from 'next/navigation';
const items = [{ name: 'User Management' }];
const list = ['Staff', 'Schools', 'Teachers', 'Students'];
const UsersPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const handleClick = (name) => {
    router.push(`${pathname}/${name}`);
  };
  return (
    <div className="md:w-1/2">
      <BreadCrumbsHeader items={items} containerClass={'pt-10 pl-7'} />
      <div className="p-5 px-10">
        <Card className="border-0">
          <CardHeader className=" py-4 bg-slate-200">
            <CardTitle className="text-xl">User Management</CardTitle>
          </CardHeader>
          <CardContent className="py-5">
            <ul className="list-inside divide-y-2  border rounded-none p-2">
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
      className="p-2 hover:cursor-pointer hover:bg-slate-100 rounded-lg"
      onClick={() => handleClick(name.toLowerCase())}
    >
      {name}
    </li>
  );
};
export default UsersPage;
