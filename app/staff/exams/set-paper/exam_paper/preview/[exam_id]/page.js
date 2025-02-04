'use client';

import PreviewPage from "@/components/staff/PreviewPage";
import { getExamDetails } from "@/lib/actions/Staff";
import { useQuery } from "@tanstack/react-query";

const Page = ({params}) => {
  const { exam_id } = params;
  const { data: exam_details, isError, error, isLoading } = useQuery({
    queryKey: ["fetchExamDetails", exam_id],
    queryFn: () =>
      getExamDetails(exam_id)
        .then((res) => res)
        .catch((error) => {
          throw error; // Ensure React Query handles it as an error
        }),
    enabled: !!exam_id,
    retry: false, // Disable retries for debugging
  });

  if (isError) {
    console.log(`Failed to fetch exam details: ${error}`);
  }

  return (
    <PreviewPage exam_details={exam_details?.details} isLoading={isLoading} />
  )
}
export default Page
