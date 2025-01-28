import { sentenceCase } from "@/lib/utils";

const defaultItems = [{ name: "UserManagement", url: "/staff/usermanagement" }];
const Page = ({ params: { userType } }) => {
  const label = sentenceCase(userType);
  const updatedItems = [
    ...defaultItems,
    ...(userType ? [{ name: label }] : []),
  ];
  return (
    <div>Page</div>
  )
}
export default Page
