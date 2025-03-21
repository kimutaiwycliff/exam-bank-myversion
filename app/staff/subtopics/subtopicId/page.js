'use client';
import CardWithTable from '@/components/staff/CardWithDatatable';
import TopicForm from '@/components/staff/forms/TopicForm';
import { objectiveColumns } from '@/components/tables/components/columns';
import { getObjectives, getSubtopic } from '@/lib/actions/Staff';
import { sentenceCase } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
const Page = ({params}) => {
  const { subtopicId } = params;
  const items = [{ name: "Subtopics", url: "/staff/subtopics" }];
  // Fetch users using React Query
  const { data: name } = useQuery({
    queryKey: ['topic', subtopicId], // Cache key includes userType to refetch when it changes
    queryFn: async () => {
      const { name } = await getSubtopic(subtopicId);
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
}
export default Page
