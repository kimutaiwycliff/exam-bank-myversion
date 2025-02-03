'use client';
import CardWithTable from '@/components/staff/CardWithDatatable';
import DifficultyLevelForm from '@/components/staff/forms/DifficultyLevelForm';
import { difficultyLevelsColumns } from '@/components/tables/components/columns';
import {  getDifficultyLevels } from '@/lib/actions/Staff';
import { useQuery } from '@tanstack/react-query';
const DifficultyPage = () => {
  const items = [{ name: "Difficulty Level" }];
  // Fetch users using React Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['difficultyLevels'], // Cache key includes userType to refetch when it changes
    queryFn: async () => {
      const { results } = await getDifficultyLevels({ pageIndex: 0 });
      return results;
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  return (
    <CardWithTable
      items={items}
      title="Difficulty Levels"
      columns={difficultyLevelsColumns}
      data={data}
      searchColumn="name"
      searchLabel="Name"
      isLoading={isLoading}
      isError={isError}
      error={error}
      Form={DifficultyLevelForm}
    />
  );
}
export default DifficultyPage
