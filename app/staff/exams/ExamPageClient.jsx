"use client";

import { useQuery } from "@tanstack/react-query";
import BreadCrumbsHeader from "@/components/layout/BreadCrumbsHeader";
import SpinningLoader from "@/components/loaders/SpinningLoader";
import ExamCard from "@/components/staff/ExamCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getExamCounts } from "@/lib/actions/Staff";

const ExamPageClient = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["examsCount"],
    queryFn: async () => {
      const results = await getExamCounts();
      return results;
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <SpinningLoader />;
  if (isError) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div>
      <BreadCrumbsHeader items={[{ name: "Exams" }]} containerClass={"pt-10 pl-7"} />
      <div className="p-5 px-10">
        <Card className="shadow-md border-0">
          <CardHeader className="bg-slate-200 py-4">
            <CardTitle className="text-xl">Exams</CardTitle>
          </CardHeader>
          <CardContent className="py-5">
            <div className="grid grid-cols-3 gap-4">
              <ExamCard filter="all" title="Exam Papers" count={data?.total_count} />
              {data?.grouped_data?.map((exam, index) => (
                <ExamCard key={index} filter={exam?.exam_type} title={exam?.exam_type} count={exam?.count} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExamPageClient;
