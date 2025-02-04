'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from './data-table-column-header';
import { labels, priorities, statuses } from '../data/data';
import { DataTableRowActions } from './data-table-row-actions';
import { Badge } from '@/components/ui/badge';
import SetExamModal from '@/components/staff/SetExamModal';
import { format } from 'date-fns';

export const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('title')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status')
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue('priority')
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

export const gradesColumns = [
  {
    id: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div className="w-[80px]">{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <span className="w-[100px] truncate font-medium">
          {row.getValue('name')}
        </span>
      );
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <span className="w-[100px] truncate font-medium">
          {row.getValue('description')}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

export const usersColumns = [
  {
    id: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div className="w-[80px]">{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'username',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => {
      return (
        <span className="w-[100px] truncate font-medium">
          {row.getValue('username')}
        </span>
      );
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <span className="w-[100px] truncate font-medium">
          {row.getValue('name')}
        </span>
      );
    },
  },
  {
    accessorKey: 'phone_number',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => {
      return (
        <span className="w-[100px] truncate font-medium">
          {row.getValue('phone_number')}
        </span>
      );
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <span className="w-[100px] truncate font-medium">
          {row.getValue('email')}
        </span>
      );
    },
  },
];

export const gradeColumns = [
  {
    id: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div className="w-[80px]">{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <span className="w-[100px] truncate font-medium">
          {row.getValue('name')}
        </span>
      );
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <span className="w-[100px] truncate font-medium">
          {row.getValue('description')}
        </span>
      );
    },
  },
];

export const subjectColumns = [
  {
    id: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div className="w-[80px]">{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <span className="w-[100px] truncate font-medium">
          {row.getValue('name')}
        </span>
      );
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[250px] truncate font-medium">
          {row.getValue('description')}
        </div>
      );
    },
  },
];
export const topicColumns = [
  {
    id: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div className="w-[80px]">{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <span className="w-[100px] truncate font-medium">
          {row.getValue('name')}
        </span>
      );
    },
  },
  {
    accessorKey: 'grade_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Grade" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[10px] truncate font-medium">
          {row.getValue('grade_name')}
        </span>
      );
    },
  },
  {
    accessorKey: 'subject_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subject" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[10px] truncate font-medium">
          {row.getValue('subject_name')}
        </span>
      );
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[10px] truncate font-medium">
          {row.getValue('description')}
        </span>
      );
    },
  },
];
export const objectiveColumns = [
  {
    id: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div className="w-[80px]">{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[10px] truncate font-medium">
          {row.getValue('description')}
        </span>
      );
    },
  },
];
export const subtopicColumns = [
  {
    id: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div className="w-[80px]">{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <span className="w-[100px] truncate font-medium">
          {row.getValue('name')}
        </span>
      );
    },
  },
  {
    accessorKey: 'topic_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Topic" />
    ),
    cell: ({ row }) => {
      return (
        <span className="w-[100px] truncate font-medium">
          {row.getValue('topic_name')}
        </span>
      );
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[10px] truncate font-medium">
          {row.getValue('description')}
        </span>
      );
    },
  },
];
export const difficultyLevelsColumns = [
  {
    id: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div className="w-[80px]">{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <span className=" w-[100px]truncate font-medium">
          {row.getValue('name')}
        </span>
      );
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[250px]  truncate font-medium">
          {row.getValue('description')}
        </div>
      );
    },
  },
];
export const questionColumns = [
  {
    id: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div className="w-[80px]">{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'subject_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subject" />
    ),
    cell: ({ row }) => {
      return (
        <span className="w-[100px] truncate font-medium">
          {row.getValue('subject_name')}
        </span>
      );
    },
  },
  {
    accessorKey: 'topic_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Topic" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[250px] truncate font-medium">
          {row.getValue('topic_name')}
        </div>
      );
    },
  },
  {
    accessorKey: 'difficulty_level_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Difficulty Level" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[250px] truncate font-medium">
          {row.getValue('difficulty_level_name')}
        </div>
      );
    },
  },
  {
    accessorKey: 'marks',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Marks" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[250px] truncate font-medium">
          {row.getValue('marks')}
        </div>
      );
    },
  },
  {
    accessorKey: 'date_created',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Added" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[250px] truncate font-medium">
          {row.getValue('date_created')}
        </div>
      );
    },
  },
];
export const examColumns = [
  {
    id: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div className="w-[80px]">{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'subject_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subject" />
    ),
    cell: ({ row }) => {
      return (
        <span className="w-[100px] truncate font-medium">
          {row.getValue('subject_name')}
        </span>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className="">Actions</div>,
    cell: ({ row }) => {
      const set_exam = row.original;

      return (
        <>
          {/* {label === 'setExam' && (
            <div className="flex gap-1">
              <SetExamModal type="add questions" set_exam={set_exam} />
              <SetExamModal type="remove" set_exam={set_exam} />
            </div>
          )} */}

          <div className="flex gap-1 ">
            <SetExamModal type="view" set_exam={set_exam} />
          </div>
        </>
      );
    },
  },
];
export const SubjectListViewColumns = [
  // {
  //     id: "select",
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && "indeterminate")
  //         }
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //       />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  {
    header: "No.",
    cell: (info) => info.row.index + 1,
},
  {
      accessorKey: "term",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Term" />
      ),
    },
    {
      accessorKey: "grade_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Class/Grade" />
      ),
    },
    {
      accessorKey: "exam_type_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Exam Type" />
      ),
    },
    {
      accessorKey: "date_created",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Process Date" />
      ),
      cell: ({ cell }) => {
        const date = new Date(cell.getValue());
        return format(date, "do MMMM yyyy");
      },
    },
    {
      id: 'actions',
      header: () => <div className="pl-4">Actions</div>,
      cell: ({ row }) => {
        const set_exam = row.original;

        return (
          <>
            <SetExamModal type="subjectListView" set_exam={set_exam} />
          </>
        );
      },
    },

]
