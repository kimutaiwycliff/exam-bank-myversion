'use client';

import BreadCrumbsHeader from '../layout/BreadCrumbsHeader';
import { DataTable } from '../tables/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const CardWithTable = ({
  items,
  title,
  fetchFn,
  fetchQueryKey,
  columns,
  searchColumn,
  searchLabel,
  filters,
}) => {
  const { data } = useQuery({
    queryKey: [{ fetchQueryKey }],
    queryFn: () => fetchFn({ pageIndex: 0 }).then((res) => res.results),
  });
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <BreadCrumbsHeader items={items} />
        <Card className=" border-1">
          <CardHeader className=" py-4">
            <CardTitle className="text-xl">{title}</CardTitle>
          </CardHeader>
          <CardContent className="py-5">
            <DataTable
              data={data}
              columns={columns}
              searchColumn={searchColumn}
              searchLabel={searchLabel}
              filters={filters}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};
export default CardWithTable;
