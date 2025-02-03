import { FormFieldTypes } from "@/constants";

export const staffFormFields = [
  {
    name: "email",
    label: "Email",
    placeholder: "johndoe@mail.com",
    // iconSrc: "/icons/copy.svg",
    // iconAlt: "mail icon",
    fieldType: FormFieldTypes.INPUT,
  },
  {
    name: "phone_number",
    label: "Phone Number",
    placeholder: "0712345678",
    fieldType: FormFieldTypes.PHONE_INPUT,
  },
  {
    name: "first_name",
    label: "First Name",
    placeholder: "John",
    fieldType: FormFieldTypes.INPUT,
  },
  {
    name: "middle_name",
    label: "Middle Name",
    placeholder: "Barry",
    fieldType: FormFieldTypes.INPUT,
  },
  {
    name: "last_name",
    label: "Last Name",
    placeholder: "Doe",
    fieldType: FormFieldTypes.INPUT,
  },
];

export const gradeFormFields = [
  {
    name: "name",
    label: "Name",
    placeholder: "Form 1",
    fieldType: FormFieldTypes.INPUT,
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Describe the grade...",
    fieldType: FormFieldTypes.TEXTAREA,
  },
];

export const subjectFormFields = [
  {
    name: "name",
    label: "Name",
    placeholder: "Physics",
    fieldType: FormFieldTypes.INPUT,
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Describe the subject...",
    fieldType: FormFieldTypes.TEXTAREA,
  },
];

export const objectiveFormFields = [
  {
    name: "description",
    label: "Description",
    placeholder: "Describe the subject...",
    fieldType: FormFieldTypes.TEXTAREA,
  },
  {
    name: "subtopic",
    inputType: "hidden",
    fieldType: FormFieldTypes.INPUT,
  },
  {
    name: "topic",
    inputType: "hidden",
    fieldType: FormFieldTypes.INPUT,
  },
];

export const difficultyLevelFormFields = [
  {
    name: "name",
    label: "Name",
    placeholder: "MODERATE",
    fieldType: FormFieldTypes.INPUT,
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Describe the difficulty level...",
    fieldType: FormFieldTypes.TEXTAREA,
  },
];
