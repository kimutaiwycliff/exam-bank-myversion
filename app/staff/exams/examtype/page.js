'use client';

import SpinningLoader from '@/components/loaders/SpinningLoader';
import CardWithTable from '@/components/staff/CardWithDatatable';
import { examColumns } from '@/components/tables/components/columns';
import { getExamsFull } from '@/lib/actions/Staff';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const PageContent = () => {
  const items = [
    { name: 'Exams', url: '/staff/exams' },
    { name: 'Exam Papers' },
  ];
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['exams'], // Cache key includes userType to refetch when it changes
    queryFn: async () => {
      const { results } = await getExamsFull({ pageIndex: 0 });
      return results;
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });
  return (
    <CardWithTable
      items={items}
      title="Exam Papers"
      columns={examColumns}
      data={data}
      searchColumn="subject_name"
      searchLabel="Subject"
      isLoading={isLoading}
      isError={isError}
      error={error}
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
