'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CirclePlus, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function DataTableRowActions({ row: set_exam, type }) {
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
      {type === 'dots' && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <MoreHorizontal />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Make a copy</DropdownMenuItem>
            <DropdownMenuItem>Favorite</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {type === 'dialog' && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="capitalize ">
              <CirclePlus />
              {type}
            </Button>
          </DialogTrigger>
          <DialogContent className=" border-black min-w-[900px]">
            <DialogHeader className="mb-1  ">
              <DialogTitle className="capitalize py-2 rounded-md ">
                {type}
              </DialogTitle>
              <DialogDescription>
                Please fill in the following details to {type}
              </DialogDescription>
            </DialogHeader>
            {/* <SectionForm exam_id={exam_id} onClose={() => setOpen(false)}/> */}
          </DialogContent>
        </Dialog>
      )}
      {type === 'button' && (
        <Button
          className={`capitalize ${
            type === 'remove' ? 'bg-red-500' : 'bg-primary'
          } ${
            type === 'view' || ('subjectListView' && 'w-[100px] rounded-md')
          }`}
          onClick={handleClick}
        >
          {type === 'subjectListView' ? 'View' : type}
        </Button>
      )}
    </>
  );
}
