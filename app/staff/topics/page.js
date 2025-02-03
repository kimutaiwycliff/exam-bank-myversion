'use client';
import CardWithTable from '@/components/staff/CardWithDatatable';
import TopicForm from '@/components/staff/forms/TopicForm';
import { topicColumns } from '@/components/tables/components/columns';
import {  getTopics } from '@/lib/actions/Staff';
import { useQuery } from '@tanstack/react-query';
const TopicsPage = () => {
  const items = [{ name: 'Topics' }];
  // Fetch users using React Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['topics'], // Cache key includes userType to refetch when it changes
    queryFn: async () => {
      const { results } = await getTopics({ pageIndex: 0 });
      return results;
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  return (
    <CardWithTable
      items={items}
      title="Topics"
      columns={topicColumns}
      data={data}
      searchColumn="name"
      searchLabel="Name"
      isLoading={isLoading}
      isError={isError}
      error={error}
      Form={TopicForm}
    />
  );
}
export default TopicsPage
