'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { objectiveSchema } from '@/lib/schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createObjective,
  updateObjective
} from '@/lib/actions/Staff';
import { useToast } from '@/hooks/use-toast';
import CustomFormField from '@/components/forms/CustomFormField';
import { Form } from '@/components/ui/form';
import { objectiveFormFields } from './fields';
const ObjectiveForm = ({
  setOpen,
  isEditSession,
  editId,
  editValues,
  ...rest
}) => {
  const { topicId, subtopicId } = {
    topicId: rest.topicId ?? null,
    subtopicId: rest.subtopicId ?? null,
    ...rest,
  };
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(objectiveSchema),
    defaultValues: { ...editValues, topic: topicId, subtopic: subtopicId },
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['objectiveMutation', isEditSession ? editId : 'new'],
    mutationFn: (data) => {
      if (isEditSession) {
        return updateObjective(editId, data);
      } else {
        return createObjective(data);
      }
    },
    onSuccess: () => {
      toast({
        description: isEditSession ? 'Objective updated successfully!' : 'Objective created successfully!',})
      queryClient.invalidateQueries(['objectives']);
      setOpen(false);
    },
    onError: () => {
      toast({
        description: isEditSession ? 'Failed to update objective.' : 'Failed to create objective.',
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
        {objectiveFormFields.map((field) => (
          <CustomFormField
            key={field.name}
            control={form.control}
            name={field.name}
            label={field.label}
            fieldType={field.fieldType}
            placeholder={field.placeholder}
            iconSrc={field.iconSrc}
            iconAlt={field.iconAlt}
            inputType={field.inputType}
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
export default ObjectiveForm;
