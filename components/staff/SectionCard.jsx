import { useRouter } from 'next/navigation';
import { CardHeader, CardTitle } from '../ui/card';
import { capitalizeAllLetters, extractQuestion } from '@/lib/utils';
import { Button } from '../ui/button';
import PreviewCard from './PreviewCard';
import { Pencil } from 'lucide-react';

const SectionCard = ({ section, show = false }) => {
  const router = useRouter();

  const handleEditPaper = () => {
    router.push(`/staff/exams/set-paper/exam_paper/${section?.exam}`);
  };
  return (
    <>
      <CardHeader className=" py-1 rounded-md flex flex-row items-center justify-between min-h-[50px] max-h-[50px] mt-2">
        <div className=" flex-1 text-center">
          <CardTitle className="text-lg font-bold">
            <p className=" font-bold capitalize">
              {capitalizeAllLetters(section?.name)}
            </p>
          </CardTitle>
        </div>
        {show && (
          <Button onClick={handleEditPaper}>
            <Pencil />
            Edit Paper
          </Button>
        )}
      </CardHeader>
      <CardHeader className=" py-1 mx-2 rounded-lg mb-4 mt-2">
        <CardTitle className="text-lg text-center font-semibold">
          <p>{section?.instructions}</p>
        </CardTitle>
      </CardHeader>
      {section?.questions.map((q, index) => (
        <PreviewCard
          key={index}
          number={q?.numbering}
          question={extractQuestion(q?.description)}
          marks={q.marks}
        />
      ))}
    </>
  );
};
export default SectionCard;
