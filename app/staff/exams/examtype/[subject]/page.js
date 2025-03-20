'use client';
import { useQuery } from '@tanstack/react-query';
import { getSubjectDetails } from '@/lib/actions/Staff';
import SubjectListView from '@/components/staff/SubjectListView';

const SubjectListPage = ({ params }) => {
  const { subject } = params;

  const {
    data: subject_details,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['SubjectListView'],
    queryFn: () =>
      getSubjectDetails(subject)
        .then((res) => res?.results)
        .catch((error) => {
          throw error;
        }),
    enabled: !!subject,
  });

  if (isError) {
    console.log(`Failed to fetch exam details: ${error}`);
  }

  return (
    <div>
      <SubjectListView
        isLoading={isLoading}
        data={subject_details}
        fetchFunction={getSubjectDetails}
        queryKey={'SubjectListView'}
        rest={subject}
      />
    </div>
  );
};
export default SubjectListPage;
