'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import CardWithTable from '@/components/staff/CardWithDatatable';
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
                  fetchFunction={getQuestions}
                  queryKey="questions"
                  searchColumn="subject_name"
                  searchLabel="Subject"
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
