'use client';

import SpinningLoader from '@/components/loaders/SpinningLoader';
import CardWithTable from '@/components/staff/CardWithDatatable';
import { examColumns } from '@/components/tables/components/columns';
import { getExamsFull } from '@/lib/actions/Staff';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const PageContent = () => {
  const items = [
    { name: 'Exams', url: '/staff/exams' },
    { name: 'Exam Papers' },
  ];
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  return (
    <CardWithTable
      items={items}
      title="Exam Papers"
      columns={examColumns}
      fetchFunction={getExamsFull}
      queryKey={'exams'}
      searchColumn="subject_name"
      searchLabel="Subject"
      // Form={SubjectForm}
    />
  );
};
const Page = () => {
  return (
    <Suspense fallback={<SpinningLoader />}>
      <PageContent />
    </Suspense>
  );
};
export default Page;
