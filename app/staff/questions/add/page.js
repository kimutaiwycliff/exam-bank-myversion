import BreadCrumbsHeader from '@/components/layout/BreadCrumbsHeader';
import QuestionForm from '@/components/staff/forms/QuestionForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const items = [
  { name: 'Questions', url: '/staff/questions' },
  { name: 'Add Question' },
];
const AddQuestionsPage = () => {
  return (
    <>
      <BreadCrumbsHeader items={items} containerClass={'pt-5 pl-7'}/>
      <div className="p-5 px-10">
        <Card className="w-[99%] shadow-md border-0">
          <CardHeader className="bg-slate-200 py-4">
            <CardTitle className="text-xl">Add Question</CardTitle>
          </CardHeader>
          <CardContent className="py-5">
            <QuestionForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
};
export default AddQuestionsPage;
