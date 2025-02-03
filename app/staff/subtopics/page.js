'use client';
import CardWithTable from '@/components/staff/CardWithDatatable';
import SubtopicForm from '@/components/staff/forms/SubtopicForm';
import { subtopicColumns } from '@/components/tables/components/columns';
import {  getSubtopics } from '@/lib/actions/Staff';
import { useQuery } from '@tanstack/react-query';
const SubTopicsPage = () => {
  const items = [{ name: 'Subtopics' }];
  // Fetch users using React Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['subtopics'], // Cache key includes userType to refetch when it changes
    queryFn: async () => {
      const { results } = await getSubtopics({ pageIndex: 0 });
      return results;
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  return (
    <CardWithTable
      items={items}
      title="Subtopics"
      columns={subtopicColumns}
      data={data}
      searchColumn="name"
      searchLabel="Name"
      isLoading={isLoading}
      isError={isError}
      error={error}
      Form={SubtopicForm}
    />
  );
}
export default SubTopicsPage
