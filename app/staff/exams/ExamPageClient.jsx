'use client'

import BreadCrumbsHeader from "@/components/layout/BreadCrumbsHeader";
import SpinningLoader from "@/components/loaders/SpinningLoader";
import ExamCard from "@/components/staff/ExamCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";

const ExamPageClient = ({ examsCounter, exams }) => {
  const items = [{ name: "Exams" }];
  return (
    <div>
    <BreadCrumbsHeader items={items} />
    <div className="p-5 px-10">
      <Card className="shadow-md border-0">
        <CardHeader className=" py-4">
          <CardTitle className="text-xl">Exams</CardTitle>
        </CardHeader>
        <CardContent className="py-5">
          <Suspense fallback={<SpinningLoader />}>
            <div className="grid grid-cols-3 gap-4">
              <ExamCard
                filter="all"
                title="Exam Papers"
                count={examsCounter?.total_count}
              />
              {exams?.map((exam, index) => (
                <ExamCard
                  key={index}
                  filter={exam.filter}
                  title={exam.title}
                  count={exam.count}
                />
              ))}
            </div>
          </Suspense>
        </CardContent>
      </Card>
    </div>
  </div>
  )
}
export default ExamPageClient
