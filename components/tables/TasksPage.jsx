'use client'

import BreadCrumbsHeader from "../layout/BreadCrumbsHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { gradesColumns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { priorities, statuses } from "./data/data";

export const metadata = {
  title: 'Tasks',
  description: 'A task and issue tracker build using Tanstack Table.',
};

const items = [{ name: 'Grades' }];

export default  function TaskPage() {
  const grades = [
    {
      id: 'f349855a-da36-4c17-a395-be90a8851a1a',
      date_created: '2024-11-16T11:38:12.818591+03:00',
      date_updated: '2024-11-16T11:38:12.818652+03:00',
      date_deleted: null,
      name: 'GRADE 2',
      description: 'CBC GRADE 2',
    },
    {
      id: '56b47d51-2306-4875-81fb-5ff3fd2e5647',
      date_created: '2024-11-14T16:59:54.524904+03:00',
      date_updated: '2024-11-16T11:38:55.582247+03:00',
      date_deleted: null,
      name: 'GRADE 1',
      description: 'CBC GRADE 1',
    },
    {
      id: '9d8df402-61d1-4e9a-b094-19bf746e9bf6',
      date_created: '2024-11-14T16:59:37.626598+03:00',
      date_updated: '2024-11-14T16:59:37.626630+03:00',
      date_deleted: null,
      name: 'FORM 4',
      description: 'FORM 4',
    },
    {
      id: 'f782b314-9b8c-4e6f-9fd5-3dbbf2afbed3',
      date_created: '2024-11-14T16:57:15.700720+03:00',
      date_updated: '2024-11-14T16:57:15.700738+03:00',
      date_deleted: null,
      name: 'FORM 3',
      description: 'FORM 3',
    },
    {
      id: '3b856991-a7a6-46b0-ab11-32fee92c0b1f',
      date_created: '2024-11-14T16:56:58.748567+03:00',
      date_updated: '2024-11-14T16:56:58.748584+03:00',
      date_deleted: null,
      name: 'FORM 2',
      description: 'FORM 2',
    },
    {
      id: 'b9e65b41-5d03-4850-b64d-fee94284bbcd',
      date_created: '2024-11-14T16:10:31.670808+03:00',
      date_updated: '2024-11-14T16:10:31.670890+03:00',
      date_deleted: null,
      name: 'FORM 1',
      description: 'FORM 1',
    },
  ];

  const filters = [
    { column: 'name', title: 'Name', options: statuses },
    { column: 'description', title: 'Description', options: priorities },
  ];
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <BreadCrumbsHeader items={items} />
        <Card className=" border-1">
          <CardHeader className="shadow-md py-4">
            <CardTitle className="text-xl">Grades</CardTitle>
          </CardHeader>
          <CardContent className="py-5">
            <DataTable
              data={grades}
              columns={gradesColumns}
              searchColumn="name"
              searchLabel="grades"
              filters={filters}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
