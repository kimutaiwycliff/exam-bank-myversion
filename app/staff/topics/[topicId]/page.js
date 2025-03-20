'use client';
import CardWithTable from '@/components/staff/CardWithDatatable';
import TopicForm from '@/components/staff/forms/TopicForm';
import { objectiveColumns } from '@/components/tables/components/columns';
import { getObjectives, getTopic } from '@/lib/actions/Staff';
import { useQuery } from '@tanstack/react-query';
const ObjectivePage = ({ params }) => {
  const { topicId } = params;
  const items = [{ name: 'Topics', url: '/staff/topics' }];
  // Fetch users using React Query
  const { data: name } = useQuery({
    queryKey: ['topic', topicId], 
    queryFn: async () => {
      const { name } = await getTopic(topicId);
      return name;
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });
  const nameLowerCase = sentenceCase(name);

  return (
    <CardWithTable
      items={[...items, { name: nameLowerCase }]}
      title={`${nameLowerCase} Objectives`}
      columns={objectiveColumns}
      fetchFunction={getObjectives}
      queryKey={'objectives'}
      searchColumn="description"
      searchLabel="Description"
      Form={TopicForm}
    />
  );
};
export default ObjectivePage;
