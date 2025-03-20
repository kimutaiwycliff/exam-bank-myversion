'use client';
import { useQuery } from '@tanstack/react-query';
import { getSubjectDetails, getSubjectDetails_2 } from '@/lib/actions/Staff';
import SubjectListView from '@/components/staff/SubjectListView';

const SubjectListPage = ({ params }) => {
  const { subject } = params;
  const rest_object = {subject_id: subject}

  const {
    data: subject_details,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: [subject],
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
        fetchFunction={getSubjectDetails_2}
        queryKey={subject}
        rest={rest_object}
      />
    </div>
  );
};
export default SubjectListPage;
