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
      className="hover:cursor-pointer shadow-md border-0 flex justify-center items-center bg-primary/70 hover:bg-primary rounded-md"
      onClick={() => handleFilter(filter?.toLowerCase().replace(' ', '-'))}
    >
      <CardContent className="py-4">
        <h2 className="tracking-wide font-bold text-lg">{title}</h2>
        <p className="tracking-wide font-semibold text-lg">Count: {count}</p>
      </CardContent>
    </Card>
  );
};
export default ExamCard;
