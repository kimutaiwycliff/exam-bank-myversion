'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { CirclePlus } from 'lucide-react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const DialogModal = ({
  title,
  FormComponent,
  isEditSession,
  editId,
  editValues,
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {title === 'Questions' && (
        <Button onClick={() => router.push('/staff/questions/add')}>
          {isEditSession ? (
            `Edit ${title}`
          ) : (
            <>
              <CirclePlus />
              Add {title}
            </>
          )}
        </Button>
      )}
      {title !== 'Questions' && (
        <DialogTrigger asChild>
          <Button>
            {isEditSession ? (
              `Edit ${title}`
            ) : (
              <>
                <CirclePlus />
                Add {title}
              </>
            )}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="  ">
        <DialogHeader className="mb-1  ">
          <DialogTitle className="capitalize  py-2 rounded-md ">
            {isEditSession ? `Edit ${title}` : `Add ${title}`}
          </DialogTitle>
          <DialogDescription>
            {isEditSession
              ? `Please fill in the following details to Edit ${title}`
              : `Please fill in the following details to Add ${title}`}
          </DialogDescription>
        </DialogHeader>
        <FormComponent
          setOpen={setOpen}
          isEditSession={isEditSession}
          editId={editId}
          editValues={editValues}
        />
      </DialogContent>
    </Dialog>
  );
};
export default DialogModal;
