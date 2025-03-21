'use client';
import CustomFormField from '@/components/forms/CustomFormField';
import BreadCrumbsHeader from '@/components/layout/BreadCrumbsHeader';
import { SkeletonMini } from '@/components/loaders/SpinningLoader';
import CardWithTable from '@/components/staff/CardWithDatatable';
import QuestionCard from '@/components/staff/QuestionCard';
import SectionCard from '@/components/staff/SectionCard';
import SetExamModal from '@/components/staff/SetExamModal';
import { setExamColumns } from '@/components/tables/components/columns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { FormFieldTypes } from '@/constants';
import { useToast } from '@/hooks/use-toast';
import {
  createExam,
  getExamSectionList,
  getExamTypes,
  getGrades,
  getSubjects,
} from '@/lib/actions/Staff';
import { examSchema } from '@/lib/schemas';
import { capitalizeFirstLetter, extractQuestion } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const SetExamPage = ({ status, exam_details }) => {
  const { toast } = useToast();
  const [selectedSection, setSelectedSection] = useState(
    exam_details?.sections && exam_details?.sections.length > 0
      ? exam_details?.sections[0]
      : null
  );
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const router = useRouter();
  const unprocessedHeaders = [
    { name: 'Exams', url: '/staff/exams' },
    { name: 'Set Paper', url: '/staff/exams/set-paper' },
  ];

  const processedHeaders = [
    { name: 'Exams', url: '/staff/exams' },
    { name: 'Edit Paper', url: '/staff/exams/set-paper' },
    {
      name: `${exam_details?.exam_name}`,
      url: `/staff/exams/set-paper/exam_paper/${exam_details?.id}`,
    },
  ];
  let items = [];
  if (status === 'unprocessed') {
    items = unprocessedHeaders;
  } else {
    items = processedHeaders;
  }
  const { data: subjects } = useQuery({
    queryKey: ['subjects'],
    queryFn: () => getSubjects({ pageIndex: 0 }).then((res) => res.results),
    enabled: status === 'unprocessed',
  });
  const { data: grades } = useQuery({
    queryKey: ['grades'],
    queryFn: () => getGrades({ pageIndex: 0 }).then((res) => res.results),
    enabled: status === 'unprocessed',
  });
  const { data: examTypes } = useQuery({
    queryKey: ['examTypes'],
    queryFn: () => getExamTypes({ pageIndex: 0 }).then((res) => res.results),
    enabled: status === 'unprocessed',
  });
  const {
    data: examSectionsList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['examSectionsList'],
    queryFn: () =>
      getExamSectionList({
        exam_id: exam_details?.id,
      }).then((res) => res.results),
    enabled: status === 'unprocessed',
  });
  const form = useForm({
    resolver: zodResolver(examSchema),
    defaultValues: {
      subject: '',
      exam_type: '',
      grade: '',
      term: '',
      paper_type: '',
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
  const mutation = useMutation({
    mutationKey: ['examSetMutation'],
    mutationFn: (data) => {
      return createExam(data);
    },
    onSuccess: () => {
      toast({
        description: 'Exam created successfully!',
      });
      router.push(`/staff/exams/set-paper/exam_paper/${success?.details?.id}`);
    },
    onError: (error) => {
      toast({
        title: 'Failed to create exam',
        description: `${error.message}`,
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };
  return (
    <div>
      <BreadCrumbsHeader items={items} containerClass={'pt-10 pl-5'}/>
      <div className="p-5 px-10">
        <Card className="shadow-md border-0 mb-4">
          {status === 'unprocessed' && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                <CardHeader className="bg-slate-200 py-2">
                  <CardTitle className="text-lg flex flex-row justify-between">
                    <Button className="text-xl font-semibold" variant="ghost">
                      Set Exam Paper
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {' '}
                      {isSubmitting ? 'Processing...' : 'Process Paper'}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-5">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="max-w-[400px]">
                      <CustomFormField
                        control={form.control}
                        name="grade"
                        label="Select Class / Grade"
                        fieldType={FormFieldTypes.SELECT}
                        placeholder="Class"
                        selectItems={grades}
                      />
                    </div>
                    <div className="max-w-[400px]">
                      <CustomFormField
                        control={form.control}
                        name="subject"
                        label="Select Subject"
                        fieldType={FormFieldTypes.SELECT}
                        placeholder="Agriculture"
                        selectItems={subjects}
                      />
                    </div>
                    <div className="max-w-[400px]">
                      <CustomFormField
                        control={form.control}
                        name="exam_type"
                        label="Select Exam Type"
                        fieldType={FormFieldTypes.SELECT}
                        placeholder="Exam Type"
                        selectItems={examTypes}
                      />
                    </div>
                    <div className="max-w-[400px]">
                      <CustomFormField
                        control={form.control}
                        name="term"
                        label="Enter Term"
                        fieldType={FormFieldTypes.SELECT}
                        placeholder="Term"
                        selectItems={[
                          { id: 'TERM 1', name: 'Term 1' },
                          { id: 'TERM 2', name: 'Term 2' },
                          { id: 'TERM 3', name: 'Term 3' },
                        ]}
                      />
                    </div>
                    <div className="max-w-[400px]">
                      <CustomFormField
                        control={form.control}
                        name="paper_type"
                        label="Enter Paper Type"
                        fieldType={FormFieldTypes.SELECT}
                        placeholder="PAPER 2"
                        selectItems={[
                          { id: 'PAPER 1', name: 'PAPER 1' },
                          { id: 'PAPER 2', name: 'PAPER 2' },
                        ]}
                      />
                    </div>
                  </div>
                </CardContent>
              </form>
            </Form>
          )}
          {status === 'processed' && (
            <>
              <CardHeader className="bg-slate-200 py-2">
                <CardTitle className="text-lg flex flex-row justify-between">
                  <Button className="text-lg font-semibold" variant="ghost">
                    Edit Exam Paper
                  </Button>
                  <Button>Process Paper</Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="py-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 gap-x-80">
                  <SelectionField
                    label="Select Class / Grade"
                    value={exam_details?.exam_name}
                    isLoading={isLoading}
                  />
                  <SelectionField
                    label="Select Subject"
                    value={exam_details?.exam_name}
                    isLoading={isLoading}
                  />
                  <SelectionField
                    label="Select Exam Type"
                    value={exam_details?.exam_type}
                    isLoading={isLoading}
                  />
                  <SelectionField
                    label="Select Term"
                    value={exam_details?.term}
                    isLoading={isLoading}
                  />
                </div>
              </CardContent>
            </>
          )}

          {status === 'old_processed' && (
            <>
              <CardHeader className=" py-2 mx-4 rounded-lg mb-2 mt-3">
                <CardTitle className="text-lg flex flex-row justify-between">
                  <Button className="text-xl font-semibold" variant="ghost">
                    Section Details
                  </Button>
                  <SetExamModal
                    type="add sections"
                    exam_id={exam_details?.id}
                  />
                </CardTitle>
              </CardHeader>
              <CardHeader className="bg-green-50 py-1 mx-4 rounded-lg mb-4 mt-3">
                <CardTitle className="text-sm font-thin flex flex-row justify-between">
                  <p className="text-green-800">
                    {' '}
                    For each section add Number of Questions per section, marks
                    per section and instructions per section
                    <Button className="mx-9  rounded-2xl  " size="sm">
                      {exam_details?.subject_name}{' '}
                      {capitalizeFirstLetter(exam_details?.grade_name)}
                    </Button>
                  </p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardWithTable
                  title="Exam Type"
                  columns={setExamColumns}
                  data={examSectionsList}
                  searchColumn="name"
                  searchLabel="Name"
                  isLoading={isLoading}
                  isError={isError}
                  error={error}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost"></Button>
                <Button>Auto Generate</Button>
              </CardFooter>
            </>
          )}
          {status === 'processed' && (
            <>
              <div className="mx-4 border border-primary/75 rounded-md ">
                <CardHeader className="bg-slate-200 py-1 rounded-md mb-2">
                  <CardTitle className="text-lg flex flex-row justify-between">
                    <Button className="text-lg font-extrabold" variant="ghost">
                      {exam_details?.exam_name} Questions
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardHeader className="bg-gray-100 py-1 mb-2 min-h-[80px]">
                  <div className="mx-3 flex flex-row my-auto">
                    {exam_details?.sections.map((section, index) => (
                      <Button
                        key={index}
                        className={`text-md font-semibold rounded-none  border border-primary/75 h-[60px] w-[200px] ${
                          selectedSection?.name === section?.name &&
                          !isPreviewMode
                            ? 'bg-primary'
                            : 'bg-secondary text-primary hover:bg-primary/80 hover:text-secondary  '
                        }`}
                        onClick={() => {
                          setSelectedSection(section);
                          setIsPreviewMode(false);
                        }}
                      >
                        {section?.name}
                      </Button>
                    ))}
                    {exam_details?.sections.length !== 0 && (
                      <Button
                        className={`text-md font-semibold rounded-none border border-primary/75 h-[60px] w-[200px] ${
                          isPreviewMode
                            ? 'bg-primary'
                            : ' bg-secondary text-primary hover:bg-primary/80 hover:text-secondary'
                        }`}
                        onClick={() => setIsPreviewMode(true)}
                      >
                        PREVIEW
                      </Button>
                    )}
                  </div>
                </CardHeader>
                {isPreviewMode ? (
                  <div className="mt-4 mx-5">
                    {exam_details?.sections.map((section, index) => (
                      <div key={index} className="mb-4">
                        <SectionCard section={section} />
                      </div>
                    ))}
                  </div>
                ) : (
                  selectedSection && (
                    <div className="mt-3">
                      <div className="bg-green-50 mx-4 py-3 rounded-none mb-4">
                        <p className="text-green-600 text-sm font-bold mx-5">
                          You can change any loaded question with different
                          question of the same marks
                        </p>
                      </div>
                      <div className="border border-primary/75 mx-4 max-h-[400px] mb-3">
                        <div className="border border-primary/75 flex justify-end min-h-[55px]">
                          <Button
                            className=" font-bold border border-primary/85 my-auto mx-10 w-[120px]"
                            variant="ghost"
                          >
                            {selectedSection?.total_marks} Marks
                          </Button>
                        </div>
                        <div className="max-h-[340px] overflow-y-auto">
                          {selectedSection.questions.map((q, index) => (
                            <div
                              key={index}
                              className="flex flex-col mx-8 mt-2"
                            >
                              <QuestionCard
                                index={index}
                                number={q?.numbering}
                                question={extractQuestion(q?.question)}
                                marks={q.marks}
                                onEdit={q}
                                onChange={q}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-row justify-end mb-1 mx-4 space-x-4">
                        <Button className="bg-white  border border-gray-200 rounded-sm w-[100px] hover:text-white">
                          Back
                        </Button>
                        <Button className=" rounded-sm w-[100px]">
                          Save
                        </Button>
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="">
                <Button variant="ghost" className="w-1 h-1"></Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};
export const SelectionField = ({ label, value, isLoading }) => (
  <div className="max-w-[400px] flex flex-col space-y-2">
    <p className="text-md  font-semibold">{label}</p>
    <div className="rounded-md border border-primary py-2 bg-gray-100 ">
      {isLoading ? <SkeletonMini /> : <p className="mx-5">{value}</p>}
    </div>
  </div>
);
export default SetExamPage;
