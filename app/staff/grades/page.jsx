'use client'
import CardWithTable from "@/components/staff/CardWithDatatable";
import GradeForm from "@/components/staff/forms/GradeForm";
import { gradeColumns } from "@/components/tables/components/columns";
import { getGrades } from "@/lib/actions/Staff";

const GradesPage = () => {
  const items = [{ name: "Grades"}];
  return (
    <CardWithTable
      items={items}
      title="Grades"
      columns={gradeColumns}
      fetchFunction={getGrades}
      queryKey={'grades'}
      searchColumn="name"
      searchLabel="Name"
      Form={GradeForm}
    />
  )
}
export default GradesPage
