import FileUploader from '@/components/fileupload/FileUploader';
import CardWithTable from '@/components/staff/CardWithDatatable';
import QuestionForm from '@/components/staff/forms/QuestionForm';
import { questionColumns } from '@/components/tables/components/columns';
import { Checkbox } from '@/components/ui/checkbox';
import { getQuestions } from '@/lib/actions/Staff';
import { useState } from 'react';

const NewEntryView = () => {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <div className="bg-slate-200 p-1 rounded-sm flex items-center justify-between">
        <span className="font-semibold text-md mx-5">New Entry</span>
        <div className="flex items-center space-x-2 bg-white p-2 rounded-full border mx-5">
          <Checkbox
            id="toggle"
            checked={checked}
            onCheckedChange={(value) => setChecked(value)}
          />
          <label htmlFor="toggle" className="text-sm font-semibold">
            Extract Questions from a PDF document
          </label>
        </div>
      </div>
      {checked ? (
        <FileUploader />
      ) : (
        <div className="mt-4 w-full">
          <CardWithTable
            title="Questions"
            columns={questionColumns}
            fetchFunction={getQuestions}
            queryKey="questions"
            searchColumn="subject_name"
            searchLabel="Subject"
            Form={QuestionForm}
            cardHeaderClass={'py-1 items-center text-md'}
            mainDivClass={'p-0 pt-5'}
          />
        </div>
      )}
    </>
  );
};
export default NewEntryView;
