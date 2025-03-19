'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import CardWithTable from '@/components/staff/CardWithDatatable';
import { useQuery } from '@tanstack/react-query';
import { getQuestions } from '@/lib/actions/Staff';
import { questionColumns } from '@/components/tables/components/columns';
import QuestionForm from '@/components/staff/forms/QuestionForm';
import FileUploader from '@/components/fileupload/FileUploader';
const QuestionContent = () => {
  const items = [{ name: 'Questions' }];
  const [active, setActive] = useState('single');
  const handleSwitch = (button) => {
    setActive(button);
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['questions'], // Cache key includes userType to refetch when it changes
    queryFn: async () => {
      const { results } = await getQuestions({ pageIndex: 0 });
      return results;
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });
  return (
    <div className="mx-5 my-5">
      <Card className="shadow-md border-0">
        <CardHeader className=" py-1 rounded-sm"></CardHeader>
        <CardContent className="">
          <div className="container flex flex-col mx-auto">
            <div className="flex flex-row space-x-4 border-b-2 mb-3">
              <Button
                className={`text-md rounded-none font-semibold min-w-[200px] ${
                  active === 'single'
                    ? 'border-b-2 border-primary text-primary'
                    : 'border-b-2 border-transparent'
                }`}
                variant="ghost"
                onClick={() => handleSwitch('single')}
              >
                Add Single Question
              </Button>
              <Button
                className={`text-md rounded-none font-semibold min-w-[200px] ${
                  active === 'extract'
                    ? 'border-b-2 border-primary text-primary'
                    : 'border-b-2 border-transparent'
                }`}
                variant="ghost"
                onClick={() => handleSwitch('extract')}
              >
                Extract Questions From PDF
              </Button>
            </div>
            {active === 'single' && (
              <>
                <CardWithTable
                  items={items}
                  title="Questions"
                  columns={questionColumns}
                  data={data}
                  searchColumn="subject_name"
                  searchLabel="Subject"
                  isLoading={isLoading}
                  isError={isError}
                  error={error}
                  Form={QuestionForm}
                />
              </>
            )}
            {active === 'extract' && (
              <>

                <FileUploader />
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default QuestionContent;
