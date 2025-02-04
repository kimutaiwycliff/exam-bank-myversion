'use client';

import CustomFormField from '@/components/forms/CustomFormField';
import BreadCrumbsHeader from '@/components/layout/BreadCrumbsHeader';
import PreviewCard from '@/components/staff/PreviewCard';
import QuestionCard from '@/components/staff/QuestionCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { FormFieldTypes } from '@/constants';
import { useToast } from '@/hooks/use-toast';
import {
  addExamQuestion,
  getDifficultyLevels,
  getSubtopics,
  getTopics,
} from '@/lib/actions/Staff';
import { loadQuestionsSchema } from '@/lib/schemas';
import { extractQuestion } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const SectionPage = ({ fetchedSection, isLoading }) => {
  const { toast } = useToast();
  const items = [
    { name: 'Exams', url: '/staff/exams' },
    { name: 'Set Paper', url: '/staff/exams/set-paper' },
    {
      name: `${fetchedSection?.name}`,
      url: `/staff/exams/set-paper/${fetchedSection?.id}`,
    },
  ];
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [section, setSection] = useState('questions');
  const [sectionData, setSectionData] = useState(fetchedSection);
  const router = useRouter();
  //Form to load questions
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
    queryKey: ['getDifficultyLevels'],
    queryFn: () =>
      getDifficultyLevels({ pageIndex: 0 }).then((res) => res.results),
  });
  const formLoadQuestions = useForm({
    resolver: zodResolver(loadQuestionsSchema),
    defaultValues: {
      exam_id: `${fetchedSection?.exam}`,
      section_id: `${fetchedSection?.id}`,
      topic: '',
      question_number: '',
      subtopic: '',
      diagram: null,
      difficulty_level: '',
      marks: '',
    },
  });
  const { errors, isSubmitting } = formLoadQuestions.formState;
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
    console.log('Submitted Data:', data);
    try {
      const quiz = await addExamQuestion(data);
      console.log('Quiz:', quiz);
      const newQuestion = {
        id: quiz?.details?.id,
        date_created: new Date().toISOString(),
        date_deleted: null,
        date_updated: new Date().toISOString(),
        description: quiz?.details?.question?.description,
        exam: sectionData?.exam,
        marking_scheme: '',
        marks: quiz?.details?.marks,
        numbering: quiz?.details?.question_number,
      };
      setSectionData((prevSectionData) => ({
        ...prevSectionData,
        questions: [...prevSectionData.questions, newQuestion],
      }));
    } catch (error) {
      toast({ variant: 'destructive', description: `${error.message}` });
    }
  };
  const handleSaveSection = () => {
    router.push(`/staff/exams/set-paper/exam_paper/${sectionData?.exam}`);
  };
  console.log('Saved Questions Section:', sectionData);
  return (
    <div>
      <BreadCrumbsHeader items={items} />
      <div className="p-5 px-10">
        <Card className="shadow-md border-0 mb-4">
          <CardHeader className=" py-2">
            <CardTitle className="text-lg flex flex-row justify-items-start">
              <Button className="text-xl font-semibold" variant="ghost">
                Set Exam Paper
              </Button>
            </CardTitle>
          </CardHeader>
          <div className="mt-10 border border-slate-300 rounded-lg mx-7">
            <CardHeader className=" py-1 rounded-xl mt-4 mx-3 mb-5">
              <div className="flex flex-row justify-end">
                <Button className="text-sm font-semibold" variant="ghost">
                  <p className=" ml-5">
                    {sectionData?.questions_remaining}{' '}
                    <span className="bg-pink-100 ml-1 rounded-lg">
                      Questions Remaining
                    </span>
                  </p>
                </Button>
              </div>
            </CardHeader>
            {/* <CardHeader className="bg-green-100 py-1 mx-4 rounded-lg mb-4 mt-3">
              <CardTitle className="text-sm font-semibold flex flex-row justify-between">
                <p className="text-green-800">
                  {' '}
                  To select multiple questions for the same question number,
                  keep the question number unchanged. The questions will appear
                  in a sequence based on the selected question tag. eg (No. 21
                  (a), (b), (c) or 21. (i), (ii), (iii).)
                </p>
              </CardTitle>
            </CardHeader> */}
            <CardContent>
              <Form {...formLoadQuestions}>
                <form
                  onSubmit={formLoadQuestions.handleSubmit(onSubmit, onError)}
                >
                  <div className="flex flex-row gap-96 justify-between">
                    <CustomFormField
                      control={formLoadQuestions.control}
                      name="question_number"
                      label="Enter Question number to assign question"
                      fieldType={FormFieldTypes.INPUT}
                      placeholder="1 (a)"
                      // iconSrc="/icons/sticky.svg"
                      // iconAlt="subject"
                      // onChange={field.onChange}
                    />
                    <div className="hidden">
                      <CustomFormField
                        control={formLoadQuestions.control}
                        name="exam_id"
                        fieldType={FormFieldTypes.INPUT}
                        inputType="hidden"
                      />
                      <CustomFormField
                        control={formLoadQuestions.control}
                        name="section_id"
                        fieldType={FormFieldTypes.INPUT}
                        inputType="hidden"
                      />
                    </div>

                    <CustomFormField
                      control={formLoadQuestions.control}
                      name="topic"
                      label="Select Topic"
                      fieldType={FormFieldTypes.SELECT}
                      placeholder="Soil"
                      // iconSrc="/icons/sticky.svg"
                      // iconAlt="subject"
                      selectItems={topics}
                      onChange={(selectedOption) =>
                        setSelectedTopic(
                          selectedOption ? selectedOption.value : null
                        )
                      }
                    />
                  </div>
                  <div className="flex flex-row gap-96 justify-between mt-8">
                    <CustomFormField
                      control={formLoadQuestions.control}
                      name="diagram"
                      label="Include Diagram?"
                      fieldType={FormFieldTypes.SELECT}
                      placeholder="Yes / No"
                      // iconSrc="/icons/sticky.svg"
                      // iconAlt="subject"
                      selectItems={[
                        { id: 'Yes', name: 'Yes' },
                        { id: null, name: 'No' },
                      ]}
                      // onChange={field.onChange}
                    />
                    <CustomFormField
                      control={formLoadQuestions.control}
                      name="subtopic"
                      label="Select Subtopic"
                      fieldType={FormFieldTypes.SELECT}
                      placeholder="Types of soil"
                      // iconSrc="/icons/sticky.svg"
                      // iconAlt="subject"
                      selectItems={subtopics}
                      // onChange={field.onChange}
                    />
                  </div>
                  <div className="flex flex-row gap-96 justify-between mt-8">
                    <CustomFormField
                      control={formLoadQuestions.control}
                      name="marks"
                      label="Enter Marks"
                      fieldType={FormFieldTypes.INPUT}
                      placeholder="3"
                      // iconSrc="/icons/sticky.svg"
                      // iconAlt="subject"
                      inputType="number"
                    />
                    <CustomFormField
                      control={formLoadQuestions.control}
                      name="difficulty_level"
                      label="Select Difficulty Level"
                      fieldType={FormFieldTypes.SELECT}
                      placeholder="Easy"
                      // iconSrc="/icons/sticky.svg"
                      // iconAlt="subject"
                      selectItems={difficultyLevels}
                    />
                  </div>
                  <div className="flex flex-row justify-end mt-6">
                    <Button
                      type="submit"
                      className=" bg-blue-500 "
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Loading....' : 'Load Questions'}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </div>
          {/* {questionsData.length !== 0 && (
            <div className="mt-10 border border-slate-300 rounded-lg mx-7">
              <CardHeader className="bg-slate-200 py-0 rounded-xl mt-4 mx-3 mb-4">
                <div className="flex flex-row justify-end rounded-lg">
                  <Button className="text-sm font-semibold " variant="ghost">
                    <p className="bg-white ml-5">
                      {questionsData.length}
                      <span className="bg-pink-200 ml-1 rounded-lg">
                        Questions Found
                      </span>
                    </p>
                  </Button>
                  <Button className="text-sm font-semibold" variant="ghost">
                    <p className="bg-white ml-5">
                      {selectedQuestions.length}/{questionsData.length}{' '}
                      <span className="bg-pink-100 ml-1 rounded-lg">
                        Selected
                      </span>
                    </p>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {currentQuestions.map((q, index) => (
                  <QuestionCard
                    key={q.id}
                    checkboxKey={true}
                    number={(currentPage - 1) * questionsPerPage + index + 1}
                    question={extractQuestion(q.description)}
                    marks={q.marks}
                    selected={selectedQuestions.includes(q.id)}
                    onSelectChange={() => toggleSelectQuestion(q.id)}
                    onEdit={q}
                    onChange={q}
                  />
                ))}
                <div className="flex flex-row justify-end space-x-3">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
                <div className="flex flex-row justify-end space-x-3">
                  <Button
                    onClick={clearSelectedQuestions}
                    className="bg-white text-blue-500 border border-blue-500 hover:bg-white"
                  >
                    Clear
                  </Button>
                  <Button
                    disabled={selectedQuestions.length === 0}
                    onClick={saveSelectedQuestions}
                    className={` text-white ${selectedQuestions.length === 0 ? 'bg-blue-200' : 'bg-blue-500'}`}
                  >
                    Save
                  </Button>
                </div>
              </CardContent>
            </div>
          )} */}

          {sectionData?.questions.length !== 0 && (
            <div className="mt-10 border border-slate-300 rounded-lg mx-7 mb-0">
              <CardHeader className=" py-0">
                <CardTitle className="text-md flex flex-row justify-between">
                  <div>
                    <Button className="text-md font-semibold" variant="ghost">
                      Section Questions
                    </Button>
                  </div>
                  <div className="flex flex-row">
                    <Button className="text-sm font-semibold" variant="ghost">
                      <p className=" ml-5">
                        {sectionData?.total_marks -
                          sectionData?.marks_remaining}
                        /{sectionData?.total_marks}{' '}
                        <span className="bg-pink-100 ml-1 rounded-lg">
                          Marks
                        </span>
                      </p>
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardHeader className=" py-2 mt-2">
                <CardTitle className="text-md flex flex-row justify-items-start mx-5">
                  <Button
                    onClick={() => setSection('questions')}
                    className={`text-md font-semibold w-[150px] h-[50px] rounded-sm ${
                      section === 'questions'
                        ? 'bg-primary '
                        : ' text-primary border border-slate-400'
                    }`}
                  >
                    {fetchedSection?.name}
                  </Button>
                  <Button
                    onClick={() => setSection('preview')}
                    className={`text-md font-semibold w-[150px] h-[50px] rounded-sm ${
                      section === 'preview'
                        ? 'bg-primary '
                        : 'text-primary border border-slate-400'
                    }`}
                  >
                    PREVIEW
                  </Button>
                </CardTitle>
              </CardHeader>
              {section === 'questions' ? (
                <CardHeader className="bg-green-100 py-2 mx-2 rounded-lg mb-4 mt-3">
                  <CardTitle className="text-sm font-semibold">
                    <p className="text-green-800">
                      You can Change any loaded question with different question
                      of the same mark.
                    </p>
                  </CardTitle>
                </CardHeader>
              ) : (
                <>
                  <CardHeader className=" py-2 mx-2 rounded-lg mt-1">
                    <CardTitle className="text-lg text-center font-bold">
                      <p>{fetchedSection?.name}</p>
                    </CardTitle>
                  </CardHeader>
                  <CardHeader className=" py-1 mx-2 rounded-lg mb-4 mt-3">
                    <CardTitle className="text-lg text-center font-semibold">
                      <p>{fetchedSection?.instructions}</p>
                    </CardTitle>
                  </CardHeader>
                </>
              )}
              <CardContent>
                <div className="p-4">
                  {section === 'questions'
                    ? sectionData?.questions.map((q, index) => (
                        <QuestionCard
                          key={index}
                          number={q?.numbering}
                          question={extractQuestion(q?.description)}
                          marks={q.marks}
                          onEdit={q}
                          onChange={q}
                        />
                      ))
                    : sectionData?.questions.map((q, index) => (
                        <PreviewCard
                          key={index}
                          number={q?.numbering}
                          question={extractQuestion(q?.description)}
                          marks={q.marks}
                        />
                      ))}
                </div>
                <div className="flex flex-row justify-end space-x-3 mt-3">
                  <Button onClick={handleSaveSection}>Save Section</Button>
                </div>
              </CardContent>
            </div>
          )}

          <div>
            <Button variant="ghost"></Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default SectionPage;
