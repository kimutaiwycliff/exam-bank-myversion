'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent } from '../ui/card';

const ExamCard = ({ title, count, filter }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set('type', filter);
    router.replace(`${pathname}/examtype?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <Card
      className="hover:cursor-pointer shadow-md border-0 flex justify-center items-center bg-slate-700 hover:bg-slate-500 text-white rounded-md"
      onClick={() => handleFilter(filter?.toLowerCase().replace(' ', '-'))}
    >
      <CardContent className="py-4">
        <h2 className="tracking-wide font-bold text-md">{title}</h2>
        <p className="tracking-wide font-semibold text-md">Count: {count}</p>
      </CardContent>
    </Card>
  );
};
export default ExamCard;
