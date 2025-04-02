'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { gradeSchema } from '@/lib/schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSubject, updateSubject } from '@/lib/actions/Staff';
import { useToast } from '@/hooks/use-toast';
import CustomFormField from '@/components/forms/CustomFormField';
import { Form } from '@/components/ui/form';
import { subjectFormFields } from './fields';
const SubjectForm = ({ setOpen, isEditSession, editId, editValues }) => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(gradeSchema),
    defaultValues: editValues,
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['subjectMutation', isEditSession ? editId : 'new'],
    mutationFn: (data) => {
      if (isEditSession) {
        return updateSubject(editId, data);
      } else {
        return createSubject(data);
      }
    },
    onSuccess: () => {
      toast({
        description: isEditSession
          ? 'Subject updated successfully!'
          : 'Subject created successfully!',
        variant: 'success',
      });
      queryClient.invalidateQueries(['subjects']);
      setOpen(false);
    },
    onError: () => {
      toast({
        description: isEditSession
          ? 'Failed to update subject.'
          : 'Failed to create subject.',
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
        {subjectFormFields.map((field) => (
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
export default SubjectForm;
