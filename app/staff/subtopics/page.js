'use client';
import CardWithTable from '@/components/staff/CardWithDatatable';
import SubtopicForm from '@/components/staff/forms/SubtopicForm';
import { subtopicColumns } from '@/components/tables/components/columns';
import {  getSubtopics } from '@/lib/actions/Staff';
const SubTopicsPage = () => {
  const items = [{ name: 'Subtopics' }];
  return (
    <CardWithTable
      items={items}
      title="Subtopics"
      columns={subtopicColumns}
      fetchFunction={getSubtopics}
      queryKey={'subtopics'}
      searchColumn="name"
      searchLabel="Name"
      Form={SubtopicForm}
    />
  );
}
export default SubTopicsPage
