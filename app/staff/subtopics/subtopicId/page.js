'use client';
import CardWithTable from '@/components/staff/CardWithDatatable';
import TopicForm from '@/components/staff/forms/TopicForm';
import { objectiveColumns } from '@/components/tables/components/columns';
import { getObjectives, getSubtopic, getTopic } from '@/lib/actions/Staff';
import { useQuery } from '@tanstack/react-query';
const Page = () => {
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
  const { data, isLoading, isError, error } = useQuery({
      queryKey: ['objectives'], // Cache key includes userType to refetch when it changes
      queryFn: async () => {
        const { results } = await getObjectives({ pageIndex: 0 });
        return results;
      },
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });
  const nameLowerCase = sentenceCase(name);

  return (
    <CardWithTable
      items={[...items, { name: nameLowerCase }]}
      title={`${nameLowerCase} Objectives`}
      columns={objectiveColumns}
      data={data}
      searchColumn="description"
      searchLabel="Description"
      isLoading={isLoading}
      isError={isError}
      error={error}
      Form={TopicForm}
    />
  );
}
export default Page
