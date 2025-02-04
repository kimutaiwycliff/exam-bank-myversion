'use client';

import { SkeletonDemo } from '@/components/loaders/SpinningLoader';
import { retrieveSection } from '@/lib/actions/Staff';
import { useQuery } from '@tanstack/react-query';
import SectionPage from '../SectionPage';

export default function Page({ params }) {
  const { section_id } = params;
  // Fetch data based on section_id (replace with your actual API or logic)
  const { data: section, isLoading } = useQuery({
    queryKey: ['retrieveSection', section_id],
    queryFn: () => retrieveSection(section_id).then((res) => res),
  });
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <SkeletonDemo />
      </div>
    );
  }

  if (!section) {
    return <div>Section not found</div>;
  }

  return (
    <div>
      <SectionPage fetchedSection={section?.details} isLoading={isLoading} />
    </div>
  );
}
