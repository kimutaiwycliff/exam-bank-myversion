'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { topicSchema } from '@/lib/schemas';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTopic, getGrades, getSubjects, updateTopic } from '@/lib/actions/Staff';
import { useToast } from '@/hooks/use-toast';
import CustomFormField from '@/components/forms/CustomFormField';
import { Form } from '@/components/ui/form';
import { FormFieldTypes } from '@/constants';
const TopicForm = ({ setOpen, isEditSession, editId, editValues }) => {
  const { data: subjects } = useQuery({
    queryKey: ["subjects"],
    queryFn: () => getSubjects({ pageIndex: 0 }).then((res) => res.results),
  });

  const { data: grades } = useQuery({
    queryKey: ["grades"],
    queryFn: () => getGrades({ pageIndex: 0 }).then((res) => res.results),
  });
  const topicFormFields = [
    {
      name: "name",
      label: "Name",
      placeholder: "ALGEBRA",
      fieldType: FormFieldTypes.INPUT,
    },
    {
      name: "grade",
      label: "Grade",
      placeholder: "Form 1",
      fieldType: FormFieldTypes.SELECT,
      selectItems: grades,
    },
    {
      name: "subject",
      label: "Subject",
      placeholder: "Physics",
      fieldType: FormFieldTypes.SELECT,
      selectItems: subjects,
    },
    {
      name: "description",
      label: "Description",
      placeholder: "Describe the topic...",
      fieldType: FormFieldTypes.TEXTAREA,
    },
  ];
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(topicSchema),
    defaultValues: editValues,
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['topicMutation', isEditSession ? editId : 'new'],
    mutationFn: (data) => {
      if (isEditSession) {
        return updateTopic(editId, data);
      } else {
        return createTopic(data);
      }
    },
    onSuccess: () => {
      toast({
        description: isEditSession ? 'Topic updated successfully!' : 'Topic created successfully!',})
      queryClient.invalidateQueries(['topics']);
      setOpen(false);
    },
    onError: () => {
      toast({
        description: isEditSession ? 'Failed to update topic.' : 'Failed to create topic.',
        variant: 'destructive',
      })
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };
  return (
    <Form {...form}>
    <form action={form.handleSubmit(onSubmit)} className="w-full space-y-4">
      {topicFormFields.map((field) => (
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
  )
}
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
export default TopicForm
