import {
  BookAIcon,
  BookCopy,
  BookDashedIcon,
  BookDownIcon,
  BookOpen,
  ChartBar,
  Home,
  LucideAlignVerticalJustifyCenter,
  Settings,
  ShieldQuestion,
  Users,
} from 'lucide-react';

export const navLinks = [
  { name: 'Home', href: '/staff/dashboard', icon: Home },
  { name: 'Users', href: '/staff/usermanagement', icon: Users },
  { name: 'Grades', href: '/staff/grades', icon: ChartBar },
  { name: 'Subjects', href: '/staff/subjects', icon: BookOpen },
  { name: 'Topics', href: '/staff/topics', icon: BookCopy },
  { name: 'Subtopics', href: '/staff/subtopics', icon: BookDownIcon },
  {
    name: 'Difficulty Levels',
    href: '/staff/difficulty-levels',
    icon: LucideAlignVerticalJustifyCenter,
  },
  { name: 'Questions', href: '/staff/questions', icon: ShieldQuestion },
  { name: 'Exam Types', href: '/staff/exam-types', icon: BookAIcon },
  { name: 'Exams', href: '/staff/exams', icon: BookDashedIcon },
  // {name: 'Settings', href: '/staff/settings', icon: Settings},
];

export const FormFieldTypes = {
  INPUT: 'input',
  TEXTAREA: 'textarea',
  PHONE_INPUT: 'phoneInput',
  CHECKBOX: 'checkbox',
  SELECT: 'select',
  DATE_PICKER: 'datePicker',
  SKELETON: 'skeleton',
  EDITOR: 'editor',
};
