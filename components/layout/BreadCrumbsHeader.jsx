import { Fragment } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

const BreadCrumbsHeader = ({ items }) => {
  return (
    <Breadcrumb className="mx-2">
      <BreadcrumbList className="text-md">
        <BreadcrumbItem>
          <BreadcrumbLink href="/staff/dashboard">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {items.map((item, index) => (
          <Fragment key={index}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {item.url ? (
                <BreadcrumbLink href={item.url}>{item.name}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.name}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
export default BreadCrumbsHeader;
