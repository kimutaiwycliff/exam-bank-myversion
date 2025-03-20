'use client';
import CardWithTable from '@/components/staff/CardWithDatatable';
import DifficultyLevelForm from '@/components/staff/forms/DifficultyLevelForm';
import { difficultyLevelsColumns } from '@/components/tables/components/columns';
import {  getExamTypes } from '@/lib/actions/Staff';
const ExamTypesPage = () => {
  const items = [{ name: "Exam Type" }];
  return (
    <CardWithTable
      items={items}
      title="Exam Types"
      columns={difficultyLevelsColumns}
      fetchFunction={getExamTypes}
      queryKey={'examTypes'}
      searchColumn="name"
      searchLabel="Name"
      Form={DifficultyLevelForm}
    />
  );
}
export default ExamTypesPage
