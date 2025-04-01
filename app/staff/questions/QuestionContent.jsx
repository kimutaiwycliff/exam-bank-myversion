'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import FileUploader from '@/components/fileupload/FileUploader';
import BreadCrumbsHeader from '@/components/layout/BreadCrumbsHeader';
import { CounterButton } from '@/components/buttons/AnimatedButton';
import NewEntryView from './NewEntryView';
import CardWithTable from '@/components/staff/CardWithDatatable';
import { questionColumns } from '@/components/tables/components/columns';
import { getQuestions } from '@/lib/actions/Staff';
import QuestionForm from '@/components/staff/forms/QuestionForm';
const QuestionContent = () => {
  const items = [{ name: 'Questions' }];
  const [active, setActive] = useState('single');
  const handleSwitch = (button) => {
    setActive(button);
  };
  const buttonData = [
    { label: 'New Entry', count: 5, key: 'single' },
    { label: 'Question Review', count: 10, key: 'review' },
    { label: 'Reviewed Question', count: 3, key: 'reviewed' },
    { label: 'Recommendations', count: 0, key: 'recommendations' },
  ];
  return (
    <div className="mx-10 my-5">
      <BreadCrumbsHeader items={items} containerClass={'pb-5 mx-0'} />
      <Card className="shadow-md border-0">
        <CardHeader className="  py-2 flex flex-row justify-between bg-slate-200 rounded-md">
          <CardTitle className="text-lg">Questions</CardTitle>
        </CardHeader>
        <CardContent className="pt-10">
          <div className="container flex flex-col mx-auto">
            <div className="flex flex-row border-b-[1px] border-gray-500 mb-3">
              {buttonData.map(({ label, count, key }) => (
                <CounterButton
                  key={key}
                  label={label}
                  count={count}
                  isActive={active === key}
                  onClick={() => handleSwitch(key)}
                />
              ))}
            </div>
            {active === 'single' && (
              <div className="mt-5">
                <NewEntryView />
              </div>
            )}
            {active === 'review' && (
              <div className="mt-1 w-full">
                <CardWithTable
                  title="Question Review"
                  columns={questionColumns}
                  fetchFunction={getQuestions}
                  queryKey="questions"
                  searchColumn="subject_name"
                  searchLabel="Subject"
                  cardHeaderClass={'py-3 items-center text-md'}
                  mainDivClass={'p-0 pt-5'}
                />
              </div>
            )}
             {active === 'reviewed' && (
              <div className="mt-1 w-full">
                <CardWithTable
                  title="Reviewed Questions"
                  columns={questionColumns}
                  fetchFunction={getQuestions}
                  queryKey="questions"
                  searchColumn="subject_name"
                  searchLabel="Subject"
                  cardHeaderClass={'py-3 items-center text-md'}
                  mainDivClass={'p-0 pt-5'}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default QuestionContent;
