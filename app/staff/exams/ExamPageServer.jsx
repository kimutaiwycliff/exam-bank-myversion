import { getExamCounts } from "@/lib/actions/Staff";
import ExamPageClient from "./ExamPageClient";

const ExamPageServer = async() => {
  const examsCounter = await getExamCounts();
  const exams = examsCounter?.grouped_data;

  return <ExamPageClient examsCounter={examsCounter} exams={exams} />;
}
export default ExamPageServer
