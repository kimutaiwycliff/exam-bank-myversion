'use client';

import { getExamDetails } from "@/lib/actions/Staff";
import { useQuery } from "@tanstack/react-query";
import SetExamPage from "../../SetExamPage";


const ExamPageProcessed = ({ params }) => {
  const { exam_id } = params;
  // Fetch data based on section_id (replace with your actual API or logic)
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
    <div>
     <SetExamPage status='processed' exam_details={exam_details?.details} isLoading={isLoading}/>
    </div>
  )
}
export default ExamPageProcessed
