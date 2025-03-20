import BreadCrumbsHeader from '../layout/BreadCrumbsHeader';
import SpinningLoader from '../loaders/SpinningLoader';
import { DataTable } from '../tables/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import DialogModal from './DialogModal';

const CardWithTable = ({
  items,
  title,
  columns,
  fetchFunction,
  queryKey,
  rest,
  searchColumn,
  searchLabel,
  filters,
  Form,
  isEditSession,
  editId,
  editValues,
}) => {
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-4 p-8 md:flex">
        {items && <BreadCrumbsHeader items={items} />}

        <Card className=" border-1 sticky w-full">
          <CardHeader className=" py-4 flex flex-row justify-between bg-slate-200 rounded-md">
            {title && <CardTitle className="text-xl">{title}</CardTitle>}

            {Form && (
              <DialogModal
                title={title}
                FormComponent={Form}
                isEditSession={isEditSession}
                editId={editId}
                editValues={editValues}
              />
            )}
          </CardHeader>
          <CardContent className="py-5">
            <DataTable
              fetchFunction={fetchFunction}
              queryKey={queryKey}
              rest={rest}
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
