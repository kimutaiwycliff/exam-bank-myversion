import { useRouter } from "next/navigation";
import BreadCrumbsHeader from "../layout/BreadCrumbsHeader";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Eye, Printer } from "lucide-react";
import { SkeletonDemo } from "../loaders/SpinningLoader";
import SectionCard from "./SectionCard";
import generatePDF from "./GeneratePdf";

const PreviewPage = ({ exam_details, isLoading }) => {
  const router = useRouter();
  const items = [
    { name: 'Exams', url: '/staff/exams' },
    { name: 'Set Paper', url: '/staff/exams/set-paper' },
  ];
  return (
    <div className="px-10">
      <BreadCrumbsHeader items={items} />
      <Card className="shadow-md border-0 mt-3 rounded-lg">
        <CardHeader className="flex flex-row justify-between  py-1 rounded-sm">
          <Button variant="ghost" className=" font-bold text-md mt-1">
            {exam_details?.exam_name}
          </Button>
          <div className="flex flex-row space-x-2">
            <Button
              className=" min-w-[80px]"
              onClick={() => router.back()}
            >
              Back
            </Button>
            <Button

              onClick={() => generatePDF(exam_details?.sections)}
            >
              <Printer className="text-black" />
              Print Paper
            </Button>
          </div>
        </CardHeader>
        <CardContent className="py-5">
          <div className="container flex flex-col mx-auto">
            <div className="flex flex-row space-x-4 border-b-2 mb-3">
              {' '}
              <Button
                className={
                  'text-md rounded-none font-semibold min-w-[200px] border-b-2 border-primary'
                }
                variant="ghost"
              >
                <Eye />
                Preview Paper
              </Button>
            </div>{' '}
            {isLoading ? (
              <div className="mx-auto my-40">
                <SkeletonDemo />
              </div>
            ) : (
              <div className="container mt-3">
                {exam_details?.sections.map((section, index) => (
                  <SectionCard
                    key={index}
                    section={section}
                    show={index === 0}
                  />
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      </div>
  )
}
export default PreviewPage
