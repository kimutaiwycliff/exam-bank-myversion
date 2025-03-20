'use client';
import CardWithTable from '@/components/staff/CardWithDatatable';
import DifficultyLevelForm from '@/components/staff/forms/DifficultyLevelForm';
import { difficultyLevelsColumns } from '@/components/tables/components/columns';
import {  getDifficultyLevels } from '@/lib/actions/Staff';
const DifficultyPage = () => {
  const items = [{ name: "Difficulty Level" }];
  return (
    <CardWithTable
      items={items}
      title="Difficulty Levels"
      columns={difficultyLevelsColumns}
      fetchFunction={getDifficultyLevels}
      queryKey={'difficultyLevels'}
      searchColumn="name"
      searchLabel="Name"
      Form={DifficultyLevelForm}
    />
  );
}
export default DifficultyPage
