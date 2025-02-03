'use client';
import { useQuery } from '@tanstack/react-query';
import { usersColumns } from '@/components/tables/components/columns';
import { sentenceCase } from '@/lib/utils';
import { getUsers } from '@/lib/actions/Staff';
import CardWithTable from '@/components/staff/CardWithDatatable';

const defaultItems = [{ name: 'UserManagement', url: '/staff/usermanagement' }];

const Page = ({ params: { userType } }) => {
  const label = sentenceCase(userType);
  const updatedItems = [
    ...defaultItems,
    ...(userType ? [{ name: label }] : []),
  ];

  // Fetch users using React Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users', userType], // Cache key includes userType to refetch when it changes
    queryFn: async () => {
      const { results } = await getUsers(userType);
      return results;
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  return (
    <CardWithTable
      items={updatedItems}
      title="Users"
      columns={usersColumns}
      data={data}
      searchColumn="name"
      searchLabel="Name"
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  );
};

export default Page;
