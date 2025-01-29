import CardWithTable from '@/components/staff/CardWithDatatable';
import { sentenceCase } from '@/lib/utils';

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
      title={label}
      fetchFn={getUsers}
      fetchQueryKey={`usermanagement-${userType}`}
      columns={[]}
      searchColumn="name"
      searchLabel="Name"
    />
  );
};
export default Page;
