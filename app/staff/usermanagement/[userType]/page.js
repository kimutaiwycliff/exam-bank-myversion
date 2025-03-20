'use client';
import { usersColumns } from '@/components/tables/components/columns';
import { sentenceCase } from '@/lib/utils';
import { getUsers } from '@/lib/actions/Staff';
import CardWithTable from '@/components/staff/CardWithDatatable';
import StaffForm from '@/components/staff/forms/StaffForm';

const defaultItems = [{ name: 'UserManagement', url: '/staff/usermanagement' }];

const Page = ({ params: { userType } }) => {
  const label = sentenceCase(userType);
  const updatedItems = [
    ...defaultItems,
    ...(userType ? [{ name: label }] : []),
  ];
  return (
    <CardWithTable
      items={updatedItems}
      title="Users"
      columns={usersColumns}
      fetchFunction={getUsers}
      queryKey={{ userType }}
      rest={{ userType }}
      searchColumn="name"
      searchLabel="Name"
      Form={StaffForm}
    />
  );
};

export default Page;
