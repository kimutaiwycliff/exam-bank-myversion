'use client'
import CardWithTable from "@/components/staff/CardWithDatatable";
import GradeForm from "@/components/staff/forms/GradeForm";
import { gradeColumns } from "@/components/tables/components/columns";
import { getGrades } from "@/lib/actions/Staff";
import { useQuery } from "@tanstack/react-query";

const GradesPage = () => {
  const items = [{ name: "Grades"}];
  // Fetch users using React Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['grades' ], // Cache key includes userType to refetch when it changes
    queryFn: async () => {
      const { results } = await getGrades({ pageIndex: 0 });
      return results;
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  return (
    <CardWithTable
      items={items}
      title="Grades"
      columns={gradeColumns}
      data={data}
      searchColumn="name"
      searchLabel="Name"
      isLoading={isLoading}
      isError={isError}
      error={error}
      Form={GradeForm}
    />
  )
}
export default GradesPage
