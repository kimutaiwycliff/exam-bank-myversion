'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { gradeSchema } from '@/lib/schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createExamType, updateExamType } from '@/lib/actions/Staff';
import { useToast } from '@/hooks/use-toast';
import CustomFormField from '@/components/forms/CustomFormField';
import { Form } from '@/components/ui/form';
import { examTypeFormFields } from './fields';
const ExamTypeForm = ({ setOpen, isEditSession, editId, editValues }) => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(gradeSchema),
    defaultValues: editValues,
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['examTypeMutation', isEditSession ? editId : 'new'],
    mutationFn: (data) => {
      if (isEditSession) {
        return updateExamType(editId, data);
      } else {
        return createExamType(data);
      }
    },
    onSuccess: () => {
      toast({
        description: isEditSession
          ? 'Exam type updated successfully!'
          : 'Exam type created successfully!',
      });
      queryClient.invalidateQueries(['subjects']);
      setOpen(false);
    },
    onError: () => {
      toast({
        description: isEditSession
          ? 'Failed to update exam type.'
          : 'Failed to create exam type.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };
  return (
    <Form {...form}>
      <form action={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        {examTypeFormFields.map((field) => (
          <CustomFormField
            key={field.name}
            control={form.control}
            name={field.name}
            label={field.label}
            fieldType={field.fieldType}
            placeholder={field.placeholder}
            iconSrc={field.iconSrc}
            iconAlt={field.iconAlt}
            selectItems={field.selectItems}
          />
        ))}
        <SubmitButton />
      </form>
    </Form>
  );
};
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className=" w-full disabled:bg-gray-500"
      disabled={pending}
    >
      {pending ? 'Submitting...' : 'Submit'}
    </Button>
  );
}
export default ExamTypeForm;
