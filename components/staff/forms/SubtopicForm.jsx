'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { subtopicSchema } from '@/lib/schemas';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createSubtopic,
  getTopics,
  updateSubtopic
} from '@/lib/actions/Staff';
import { useToast } from '@/hooks/use-toast';
import CustomFormField from '@/components/forms/CustomFormField';
import { Form } from '@/components/ui/form';
import { FormFieldTypes } from '@/constants';
const SubtopicForm = ({ setOpen, isEditSession, editId, editValues }) => {
  const { data: topics } = useQuery({
    queryKey: ['topics'],
    queryFn: () => getTopics({ pageIndex: 0 }).then((res) => res.results),
  });
  const subtopicFormFields = [
    {
      name: 'name',
      label: 'Name',
      placeholder: 'DIVISION',
      fieldType: FormFieldTypes.INPUT,
    },
    {
      name: 'topic',
      label: 'Topic',
      placeholder: 'ALGEBRA',
      fieldType: FormFieldTypes.SELECT,
      selectItems: topics,
    },
  ];
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(subtopicSchema),
    defaultValues: editValues,
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['subtopicMutation', isEditSession ? editId : 'new'],
    mutationFn: (data) => {
      if (isEditSession) {
        return updateSubtopic(editId, data);
      } else {
        return createSubtopic(data);
      }
    },
    onSuccess: () => {
      toast({
        description: isEditSession
          ? 'Subtopic updated successfully!'
          : 'Subtopic created successfully!',
      });
      queryClient.invalidateQueries(['subtopics']);
      setOpen(false);
    },
    onError: () => {
      toast({
        description: isEditSession
          ? 'Failed to update subtopic.'
          : 'Failed to create subtopic.',
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
        {subtopicFormFields.map((field) => (
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
export default SubtopicForm;
