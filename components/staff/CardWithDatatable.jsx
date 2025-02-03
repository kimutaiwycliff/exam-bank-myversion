import BreadCrumbsHeader from '../layout/BreadCrumbsHeader';
import SpinningLoader from '../loaders/SpinningLoader';
import { DataTable } from '../tables/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const CardWithTable = ({
  items,
  title,
  columns,
  data,
  searchColumn,
  searchLabel,
  filters,
  isLoading,
  isError,
  error
}) => {

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <BreadCrumbsHeader items={items} />
        <Card className=" border-1">
          <CardHeader className=" py-4">
            <CardTitle className="text-xl">{title}</CardTitle>
          </CardHeader>
          <CardContent className="py-5">
          {isLoading ? (
            <div className="mx-auto">
              <SpinningLoader />
            </div>
          ) : isError ? (
            <p className="text-red-500">Error: {error.message}</p>
          ) : (
            <DataTable
              data={data}
              columns={columns}
              searchColumn={searchColumn}
              searchLabel={searchLabel}
              filters={filters}
            />
          )}
        </CardContent>
        </Card>
      </div>
    </>
  );
};
export default CardWithTable;
