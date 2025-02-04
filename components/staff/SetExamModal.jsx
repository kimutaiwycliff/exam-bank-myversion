'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { CirclePlus } from 'lucide-react';
import SectionForm from './forms/SectionForm';

const SetExamModal = ({ type, set_exam, exam_id }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleClick = () => {
    if (type === 'add questions') {
      router.push(`/staff/exams/set-paper/${set_exam.id}`);
      console.log(
        'add questions to the section. Loading specific section',
        set_exam
      );
    }
    if (type === 'remove') {
      console.log('deleting the section');
    }
    if (type === 'view') {
      router.push(`/staff/exams/examtype/${set_exam?.subject_id}`);
    }
    if (type === 'subjectListView') {
      router.push(`/staff/exams/set-paper/exam_paper/preview/${set_exam?.id}`);
    }
  };
  return (
    <>
      {type === 'add sections' ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="capitalize ">
              <CirclePlus />
              {type}
            </Button>
          </DialogTrigger>
          <DialogContent className=" border-black min-w-[900px]">
            <DialogHeader className="mb-1  ">
              <DialogTitle className="capitalize  py-2 rounded-md ">
                {type}
              </DialogTitle>
              <DialogDescription>
                Please fill in the following details to {type}
              </DialogDescription>
            </DialogHeader>
            <SectionForm exam_id={exam_id} onClose={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      ) : (
        <Button
          className={`capitalize ${type === 'remove' ? 'bg-red-500' : ''} ${
            type === 'view' || ('subjectListView' && 'w-[100px] rounded-md')
          }`}
          onClick={handleClick}
        >
          {type === 'subjectListView' ? 'View' : type}
        </Button>
      )}
    </>
  );
};
export default SetExamModal;
