'use client';
import { useToast } from '@/hooks/use-toast';
import {
  getQuestionsSections,
  getSubtopics,
  getTopics,
} from '@/lib/actions/Staff';
import { editSingleQuestionSchema, singleQuestionSchema } from '@/lib/schemas';
import { extractQuestion } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Pencil } from 'lucide-react';
import { DialogContent } from '@radix-ui/react-dialog';
import CustomFormField from '../forms/CustomFormField';
import { FormFieldTypes } from '@/constants';
import QuestionCard from './QuestionCard';
import { Form } from '../ui/form';

const QuestionDialog = ({ type, questionObject }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const questionsData = [
    {
      id: 1,
      question:
        'State two reasons why agriculture is important to the Kenyan economy.',
      marks: 2,
    },
    {
      id: 2,
      question: 'Name two types of land tenure systems practiced in Kenya.',
      marks: 2,
    },
    {
      id: 3,
      question: "Give the meaning of the term 'agroforestry.'",
      marks: 2,
    },
    {
      id: 4,
      question: 'List two examples of pastoralist communities in Kenya.',
      marks: 2,
    },
    {
      id: 5,
      question:
        'Name any two types of crops classified as cash crops in Kenya.',
      marks: 2,
    },
    {
      id: 6,
      question: 'State two advantages of mixed farming over monoculture.',
      marks: 2,
    },
    {
      id: 7,
      question: 'What is the main purpose of irrigation in agriculture?',
      marks: 2,
    },
    {
      id: 8,
      question:
        'State two reasons why agriculture is important to the Kenyan economy.',
      marks: 2,
    },
    {
      id: 9,
      question: 'Name two types of land tenure systems practiced in Kenya.',
      marks: 2,
    },
    {
      id: 10,
      question: "Give the meaning of the term 'agroforestry.'",
      marks: 2,
    },
    {
      id: 11,
      question: 'List two examples of pastoralist communities in Kenya.',
      marks: 2,
    },
    {
      id: 12,
      question:
        'Name any two types of crops classified as cash crops in Kenya.',
      marks: 2,
    },
    {
      id: 13,
      question: 'State two advantages of mixed farming over monoculture.',
      marks: 2,
    },
    {
      id: 14,
      question: 'What is the main purpose of irrigation in agriculture?',
      marks: 2,
    },
  ];
  const toggleSelectQuestion = (id) => {
    setSelectedQuestions((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((qId) => qId !== id)
        : [...prevSelected, id]
    );
  };
  const saveSelectedQuestions = () => {
    console.log('Saved Question IDs:', selectedQuestions);
    alert(`Saved Questions: ${selectedQuestions.join(', ')}`);
  };
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
  const formLoadQuestionDetails = useForm({
    resolver: zodResolver(singleQuestionSchema),
    defaultValues: {
      topic: '',
      subtopic: '',
    },
  });
  const { errors, isSubmitting } = formLoadQuestionDetails.formState;
  const onError = (errors) => {
    const errorMessages = Object.values(errors)
      .map((error) => error.message)
      .join('\n');

    toast({
      variant: 'destructive',
      title: 'Please fix the following errors',
      description: `${errorMessages}`,
    });
  };
  const onSubmit = async (data) => {
    const params = {
      topic_id: data?.topic,
      subtopic_id: data?.subtopic,
      pageIndex: 1,
    };
    try {
      const loadedQuestions = await getQuestionsSections(params);
      console.log('loaded questions object', loadedQuestions); // Handle the response data as needed
    } catch (error) {
      console.error('Failed to load questions:', error);
    }
  };
  const editFormLoadQuestionDetails = useForm({
    resolver: zodResolver(editSingleQuestionSchema),
    defaultValues: {
      question: `${extractQuestion(questionObject.description)}`,
      marks: `${questionObject.marks}`,
    },
  });
  return (
    <>
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="capitalize  ">
              {type === 'change' ? (
                <p>Change</p>
              ) : (
                <div className="flex flex-row gap-3">
                  <Pencil />
                  <p>Edit</p>
                </div>
              )}
            </Button>
          </DialogTrigger>
          {type === 'change' ? (
            <DialogContent className=" border-black min-w-[900px]">
              <DialogHeader className="mb-1  ">
                <DialogTitle className="capitalize  py-3 rounded-md mb-3 ">
                  <p className="mx-5">Change Question</p>
                </DialogTitle>
                <div className="bg-green-100 py-2 rounded-md mb-4 mx-2">
                  <p className="text-green-800 font-semibold mx-4">
                    {questionsData.length} Available Questions to choose from
                  </p>
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                  <p className=" mx-4 font-semibold text-md mt-4">
                    Active Question
                  </p>
                  <div className="rounded-md border border-slate-300 mx-4 py-2 flex flex-row space-x-4 mb-5">
                    <p className="mx-5">
                      {extractQuestion(questionObject.description)}
                    </p>
                    <p>({questionObject.marks} Marks)</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-7">
                  <Form {...formLoadQuestionDetails}>
                    <form
                      onSubmit={formLoadQuestionDetails.handleSubmit(
                        onSubmit,
                        onError
                      )}
                    >
                      <div className="mx-4 mt-4">
                        <CustomFormField
                          control={formLoadQuestionDetails.control}
                          name="topic"
                          label="Select Topic to choose from"
                          fieldType={FormFieldTypes.SELECT}
                          placeholder="E.g Soil"
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
                          control={formLoadQuestionDetails.control}
                          name="subtopic"
                          label="Select Subtopic to choose from"
                          fieldType={FormFieldTypes.SELECT}
                          placeholder="E.g Drainage"
                          selectItems={subtopics}
                        />
                      </div>

                      <p className=" mx-4 font-semibold text-md mt-7">
                        Select Preferred Question
                      </p>
                      <div className="h-72 overflow-y-auto rounded-md border border-slate-300 mx-4 py-2 mt-3">
                        {questionsData.map((q, index) => (
                          <QuestionCard
                            index={index}
                            key={q.id}
                            checkboxKey={true}
                            number={index + 1}
                            scrollableOption={true}
                            question={q.question}
                            marks={q.marks}
                            selected={selectedQuestions.includes(q.id)}
                            onSelectChange={() => toggleSelectQuestion(q.id)}
                            onEdit={q}
                            onChange={q}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between mt-5">
                        <Button
                          className="bg-blue-500 text-black w-3/4 mx-auto"
                          onClick={saveSelectedQuestions}
                        >
                          Save
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </DialogHeader>
            </DialogContent>
          ) : (
            <DialogContent className=" border-black min-w-[900px]">
              <DialogHeader className="mb-1  ">
                <DialogTitle className="capitalize bg-slate-200 py-3 rounded-md mb-3 ">
                  <p className="mx-5">Edit Question</p>
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col space-y-8">
                <Form {...editFormLoadQuestionDetails}>
                  <form action="">
                    <div className="mx-4 mt-4">
                      <CustomFormField
                        control={editFormLoadQuestionDetails.control}
                        name="question"
                        label="Edit Question"
                        fieldType={FormFieldTypes.INPUT}
                        placeholder="State two reasons why agriculture is important to the Kenyan economy."
                      />
                    </div>
                    <div className="mx-4 mt-4">
                      <CustomFormField
                        control={editFormLoadQuestionDetails.control}
                        name="marks"
                        label="Edit Marks"
                        fieldType={FormFieldTypes.INPUT}
                        placeholder="2"
                      />
                    </div>
                    <div className="flex justify-between mt-5">
                      <Button className="bg-blue-500 text-black w-3/4 mx-auto">
                        Save
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>{' '}
    </>
  );
};
export default QuestionDialog;
