import { Skeleton } from '../ui/skeleton';

const SpinningLoader = () => {
  return (
    <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden">
      <div className="three-body">
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
      </div>
    </div>
  );
};
export function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className=" h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className=" h-4 w-[250px]" />
        <Skeleton className=" h-4 w-[200px]" />
      </div>
    </div>
  );
}

export function SkeletonMini() {
  return (
    <div className="flex flex-row space-x-1 items-center mx-6">
      <Skeleton className=" h-[5px] w-[5px] rounded-full" />
      <Skeleton className=" h-[6px] w-[6px] rounded-full" />
      <Skeleton className=" h-[7px] w-[7px] rounded-full" />
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="space-y-2 w-full mx-auto">
      {/* Filter Input */}
      <div className="flex justify-start mb-4">
        <Skeleton className="h-10 w-1/4  rounded" />
      </div>

      {/* Table Header */}
      <div className="flex flex-row justify-between space-x-2  p-3 rounded-md">
        <Skeleton className="h-6 w-6  rounded" />
        <Skeleton className="h-6 w-[40px]  rounded" />
        <Skeleton className="h-6 w-[80px]  rounded" />
        <Skeleton className="h-6 w-[120px]  rounded" />
        <Skeleton className="h-6 w-[100px]  rounded" />
        <Skeleton className="h-6 w-[80px] rounded" />
      </div>

      {/* Table Rows */}
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-row justify-between space-x-2 p-3 border rounded-md"
          >
            <Skeleton className="h-6 w-6  rounded" />
            <Skeleton className="h-6 w-[40px]  rounded" />
            <Skeleton className="h-6 w-[80px]  rounded" />
            <Skeleton className="h-6 w-[120px]  rounded" />
            <Skeleton className="h-6 w-[100px]  rounded" />
            <Skeleton className="h-6 w-[80px]  rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpinningLoader;
