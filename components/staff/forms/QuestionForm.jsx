'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { questionSchema } from '@/lib/schemas';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createQuestion,
  getDifficultyLevels,
  getObjectivesQuiz,
  getSubjects,
  getSubtopics,
  getTopics,
  updateQuestion,
} from '@/lib/actions/Staff';
import { useToast } from '@/hooks/use-toast';
import CustomFormField from '@/components/forms/CustomFormField';
import { Form } from '@/components/ui/form';
import { useEffect, useState } from 'react';
import { FormFieldTypes } from '@/constants';
const QuestionForm = ({ questionToEdit = {}, setOpen }) => {
  const { toast } = useToast();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [selectedObjective, setSelectedObjective] = useState(null);
  const { id: editId, ...editValues } = questionToEdit;
  const isEditSession = Boolean(editId);

  const { data: subjects } = useQuery({
    queryKey: ['subjects'],
    queryFn: () => getSubjects({ pageIndex: 0 }).then((res) => res.results),
  });

  const { data: topics } = useQuery({
    queryKey: ['topics', selectedSubject],
    queryFn: () =>
      selectedSubject
        ? getTopics({ pageIndex: 0, subject_id: selectedSubject }).then(
            (res) => res.results
          )
        : [],
    enabled: !!selectedSubject,
  });

  const { data: subtopics } = useQuery({
    queryKey: ['subtopics', selectedTopic],
    queryFn: () =>
      selectedTopic
        ? getSubtopics({ pageIndex: 0, topic_id: selectedTopic }).then(
            (res) => res.results
          )
        : [],
    enabled: !!selectedTopic,
  });

  const { data: difficultyLevels } = useQuery({
    queryKey: ['difficultyLevels'],
    queryFn: () =>
      getDifficultyLevels({ pageIndex: 0 }).then((res) => res.results),
  });

  const { data: objectives } = useQuery({
    queryKey: ['objectives', selectedTopic],
    queryFn: () => {
      const params = { pageIndex: 0 };
      if (selectedTopic) {
        params.topic_id = selectedTopic;
      }
      return getObjectivesQuiz(params).then((res) => res.results);
    },
    enabled: !!selectedTopic,
  });
  useEffect(() => {
    if (isEditSession) {
      setSelectedSubject(editValues.subject || null);
      setSelectedTopic(editValues.topic || null);
      setSelectedSubtopic(editValues.subtopic || null);
      setSelectedObjective(editValues.objective || null);
    }
  }, [editValues, isEditSession]);
  const questionFormFields = [
    {
      name: 'subject',
      label: 'Subject',
      placeholder: 'PHYSICS',
      fieldType: FormFieldTypes.SELECT,
      selectItems: subjects,
      onChange: (selectedOption) =>
        setSelectedSubject(selectedOption ? selectedOption.value : null),
    },
    {
      name: 'topic',
      label: 'Topic',
      placeholder: 'ALGEBRA',
      fieldType: FormFieldTypes.SELECT,
      selectItems: topics,
      onChange: (selectedOption) => {
        setSelectedTopic(selectedOption ? selectedOption.value : null);
        setSelectedSubtopic(null);
      },
    },
    {
      name: 'subtopic',
      label: 'Subtopic',
      placeholder: 'DIVISION',
      fieldType: FormFieldTypes.SELECT,
      selectItems: subtopics,
      onChange: (selectedOption) =>
        setSelectedSubtopic(selectedOption ? selectedOption.value : null),
    },
    {
      name: 'difficulty_level',
      label: 'Difficulty Level',
      placeholder: 'MODERATE',
      fieldType: FormFieldTypes.SELECT,
      selectItems: difficultyLevels,
    },
    {
      name: 'objective',
      label: 'Objective',
      placeholder: 'Solve the equation',
      fieldType: FormFieldTypes.SELECT,
      selectItems: objectives,
      onChange: (selectedOption) =>
        setSelectedObjective(selectedOption ? selectedOption.value : null),
    },
    {
      name: 'marks',
      label: 'Marks',
      placeholder: '10',
      inputType: 'number',
      fieldType: FormFieldTypes.INPUT,
    },
    {
      name: 'description',
      label: 'Description',
      placeholder: 'Describe the question...',
      fieldType: FormFieldTypes.TEXTAREA,
    },
    {
      name: 'marking_scheme',
      label: 'Marking Scheme',
      placeholder: 'Describe the marking scheme...',
      fieldType: FormFieldTypes.TEXTAREA,
    },
  ];
  const form = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: editValues,
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['questionMutation', isEditSession ? editId : 'new'],
    mutationFn: (data) => {
      if (isEditSession) {
        return updateQuestion(editId, data);
      } else {
        return createQuestion(data);
      }
    },
    onSuccess: () => {
      toast({
        description: isEditSession
          ? 'Question updated successfully!'
          : 'Question created successfully!',
      });
      queryClient.invalidateQueries(['questions']);
      setOpen(false);
    },
    onError: (error) => {
      toast({
        title: isEditSession
          ? 'Failed to update question.'
          : 'Failed to create question.',
        description: error.message || 'Something went wrong!',
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
        {questionFormFields.map((field) => (
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
            onChange={field.onChange}
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
export default QuestionForm;
