'use client';
import { capitalizeFirstLetter } from '@/lib/utils';
import BreadCrumbsHeader from '../layout/BreadCrumbsHeader';
import { SkeletonTable } from '../loaders/SpinningLoader';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import CardWithTable from './CardWithDatatable';
import { SubjectListViewColumns } from '../tables/components/columns';

const SubjectListView = ({ data, isLoading, isError, error }) => {
  const items = [
    { name: 'Exams', url: '/staff/exams' },
    { name: 'Exam Papers', url: '/staff/exams/examtype' },
    {
      name: `${capitalizeFirstLetter(data?.subject_name)}`,
      url: `/staff/exams/examtype/${data?.id}`,
    },
  ];

  return (
    <div>
      <BreadCrumbsHeader items={items} />
      <div className="p-5 px-10">
        <Card className="shadow-md border">
          <CardHeader className=" py-2 ">
            <CardTitle className="text-lg">Exam Papers </CardTitle>
          </CardHeader>
          <CardHeader className=" py-2 mx-3 rounded-lg">
            {data?.subject_name && (
              <CardTitle className="text-lg">
                {' '}
                {`${capitalizeFirstLetter(
                  data?.subject_name
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
                data={data}
                searchColumn="term"
                searchLabel="Term"
                isLoading={isLoading}
                isError={isError}
                error={error}
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
