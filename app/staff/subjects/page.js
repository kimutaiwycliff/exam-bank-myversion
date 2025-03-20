'use client';
import CardWithTable from '@/components/staff/CardWithDatatable';
import SubjectForm from '@/components/staff/forms/SubjectForm';
import { subjectColumns } from '@/components/tables/components/columns';
import { getSubjects } from '@/lib/actions/Staff';
const SubjectsPage = () => {
  const items = [{ name: 'Subjects' }];
  return (
    <CardWithTable
      items={items}
      title="Subjects"
      columns={subjectColumns}
      fetchFunction={getSubjects}
      queryKey={'subjects'}
      searchColumn="name"
      searchLabel="Name"
      Form={SubjectForm}
    />
  );
};
export default SubjectsPage;
