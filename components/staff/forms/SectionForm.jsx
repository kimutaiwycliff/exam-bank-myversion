'use client';

import CustomFormField from '@/components/forms/CustomFormField';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { FormFieldTypes } from '@/constants';
import { useToast } from '@/hooks/use-toast';
import { addSection } from '@/lib/actions/Staff';
import { sectionSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, useForm } from 'react-hook-form';

const SectionForm = ({ exam_id, onClose }) => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      exam_id: `${exam_id}`,
      name: '',
      number_of_questions: '',
      total_marks: '',
      instructions: '',
    },
  });
  const { errors, isSubmitting } = form.formState;
  const onError = (errors) => {
    const errorMessages = Object.values(errors)
      .map((error) => error.message)
      .join('\n');
    toast({
      variant: 'destructive',
      title: 'Please fix the following errors:',
      description: `${errorMessages}`,
    });
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['sectionMutation'],
    mutationFn: (data) => {
      return addSection(data);
    },
    onSuccess: () => {
      toast({
        description: 'Section added successfully!',
      });
      queryClient.invalidateQueries(['exams']);
      onClose();
    },
    onError: (error) => {
      toast({
        title: 'Failed to add section',
        description: `${error.message}`,
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };
  return (
    <Card className="shadow-md border-0 mb-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)}>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 min-w-fit mb-4 ">
              <CustomFormField
                control={form.control}
                name="name"
                label="Select Section"
                fieldType={FormFieldTypes.INPUT}
                placeholder="E.g Section A"
              />
            </div>
            <div className="grid grid-cols-2 gap-6 mb-4 ">
              <CustomFormField
                control={form.control}
                name="number_of_questions"
                label="Enter Number of Questions"
                fieldType={FormFieldTypes.INPUT}
                placeholder="E.g 15"
                inputType="number"
              />
              <CustomFormField
                control={form.control}
                name="total_marks"
                label="Enter Marks"
                fieldType={FormFieldTypes.INPUT}
                placeholder="E.g 30"
              />
            </div>
            <div className="grid grid-cols-1 gap-6 mb-8">
              <CustomFormField
                control={form.control}
                name="instructions"
                label="Select Instructions"
                fieldType={FormFieldTypes.INPUT}
                placeholder="e.g Answer all the questions in the spaces provided"
              />
              <div className="hidden">
                {' '}
                <CustomFormField
                  control={form.control}
                  name="exam_id"
                  label="Select Exam"
                  fieldType={FormFieldTypes.INPUT}
                  placeholder="E.g 15"
                  inputType="hidden"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className=" w-full mx-8"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding....' : 'Add Section'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
export default SectionForm;
