'use client';
import CardWithTable from '@/components/staff/CardWithDatatable';
import SubjectForm from '@/components/staff/forms/SubjectForm';
import { subjectColumns } from '@/components/tables/components/columns';
import { getSubjects } from '@/lib/actions/Staff';
import { useQuery } from '@tanstack/react-query';
const SubjectsPage = () => {
  const items = [{ name: 'Subjects' }];
  // Fetch users using React Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['subjects'], // Cache key includes userType to refetch when it changes
    queryFn: async () => {
      const { results } = await getSubjects({ pageIndex: 0 });
      return results;
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  return (
    <CardWithTable
      items={items}
      title="Grades"
      columns={subjectColumns}
      data={data}
      searchColumn="name"
      searchLabel="Name"
      isLoading={isLoading}
      isError={isError}
      error={error}
      Form={SubjectForm}
    />
  );
};
export default SubjectsPage;
