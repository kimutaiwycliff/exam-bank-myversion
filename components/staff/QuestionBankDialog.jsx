'use client';

import { useToast } from '@/hooks/use-toast';
import {
  getDifficultyLevels,
  getSubtopics,
  getTopics,
} from '@/lib/actions/Staff';
import { questionBankSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Pencil } from 'lucide-react';
import { ExamBankQuestionCard } from './QuestionCard';
import { Form } from '../ui/form';
import CustomFormField from '../forms/CustomFormField';
import { FormFieldTypes } from '@/constants';

const QuestionBankDialog = ({ questionObject }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const { data: topics } = useQuery({
    queryKey: ['topics'],
    queryFn: () => getTopics({ pageIndex: 0 }).then((res) => res.results),
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
  const form = useForm({
    resolver: zodResolver(questionBankSchema),
    defaultValues: {
      id: `${questionObject?.id}`,
      topic: '',
      subtopic: '',
      difficulty_level: '',
      marks: `${questionObject?.marks}`,
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
  const onSubmit = async (data) => {
    // const params = {
    //   topic_id: data?.topic,
    //   subtopic_id: data?.subtopic,
    //   pageIndex: 1,
    // };
    // try {
    //   const loadedQuestions = await getQuestionsSections(params);
    //   console.log('loaded questions object', loadedQuestions); // Handle the response data as needed
    // } catch (error) {
    //   console.error('Failed to load questions:', error);
    // }
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="capitalize bg-green-100 text-black">
            <div className="flex flex-row gap-3">
              <Pencil />
              <p>Add to Question Bank</p>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className=" border-black min-w-[900px]">
          <DialogHeader className="mb-1">
            <DialogTitle className="capitalize bg-slate-200 py-3 rounded-md mb-3 ">
              <p className="mx-5">Add to Question Bank</p>
            </DialogTitle>
            <div className="bg-green-100 py-2 rounded-md mb-4 mx-2">
              <ExamBankQuestionCard
                index={questionObject?.index}
                number={questionObject?.number}
                question={questionObject?.question}
                marks={questionObject?.marks}
              />
            </div>
            <div className="flex flex-col space-y-7">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                  <div className="hidden">
                    <CustomFormField
                      control={form.control}
                      name="id"
                      fieldType={FormFieldTypes.INPUT}
                      inputType="hidden"
                    />
                  </div>
                  <div className="mx-4 mt-4">
                    <CustomFormField
                      control={form.control}
                      name="topic"
                      label="Select topic of the Question"
                      fieldType={FormFieldTypes.SELECT}
                      placeholder="Soil"
                      selectItems={topics}
                      onChange={(selectedOption) =>
                        setSelectedTopic(
                          selectedOption ? selectedOption.value : null
                        )
                      }
                    />
                  </div>
                  <div className="mx-4 mt-4">
                    <CustomFormField
                      control={form.control}
                      name="subtopic"
                      label="Select Sub-topic"
                      fieldType={FormFieldTypes.SELECT}
                      placeholder="Types of Soil"
                      selectItems={subtopics}
                    />
                  </div>
                  <div className="mx-4 mt-4">
                    <CustomFormField
                      control={form.control}
                      name="difficulty_level"
                      label="Select Difficulty Level"
                      fieldType={FormFieldTypes.SELECT}
                      placeholder="Analysis"
                      selectItems={difficultyLevels}
                    />
                  </div>
                  <div className="mx-4 mt-4">
                    <CustomFormField
                      control={form.control}
                      name="marks"
                      label="Edit Marks"
                      fieldType={FormFieldTypes.INPUT}
                      placeholder="2 Marks"
                    />
                  </div>
                  <div className="flex justify-between mt-5">
                    <Button
                      className="bg-blue-500 text-black w-3/4 mx-auto"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Adding...' : 'Save'}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default QuestionBankDialog;
