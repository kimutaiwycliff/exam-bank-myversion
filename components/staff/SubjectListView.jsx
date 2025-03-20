'use client';
import { capitalizeFirstLetter } from '@/lib/utils';
import BreadCrumbsHeader from '../layout/BreadCrumbsHeader';
import { SkeletonTable } from '../loaders/SpinningLoader';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import CardWithTable from './CardWithDatatable';
import { SubjectListViewColumns } from '../tables/components/columns';

const SubjectListView = ({ data, fetchFunction, queryKey, rest, isLoading}) => {
  const items = [
    { name: 'Exams', url: '/staff/exams' },
    { name: 'Exam Papers', url: '/staff/exams/examtype' },
    {
      name: `${capitalizeFirstLetter(data?.[0]?.subject_name)}`,
      url: `/staff/exams/examtype/${data?.[0]?.id}`,
    },
  ];

  return (
    <div>
      <BreadCrumbsHeader items={items} containerClass={'pt-5 pl-7'}/>
      <div className="p-5 px-10">
        <Card className="shadow-md border">
          <CardHeader className=" bg-slate-200 py-2 rounded-lg">
            {data?.[0]?.subject_name && (
              <CardTitle className="text-lg">
                {' '}
                {`${capitalizeFirstLetter(
                  data?.[0]?.subject_name
                )} Exam Papers`}{' '}
              </CardTitle>
            )}
          </CardHeader>
          <CardContent className=" ">
            {isLoading ? (
              <div className="w-full flex flex-col justify-between">
                <SkeletonTable />
              </div>
            ) : (
              <CardWithTable
                columns={SubjectListViewColumns}
                fetchFunction={fetchFunction}
                queryKey={queryKey}
                rest={rest}
                searchColumn="term"
                searchLabel="Term"
                // Form={GradeForm}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default SubjectListView;
