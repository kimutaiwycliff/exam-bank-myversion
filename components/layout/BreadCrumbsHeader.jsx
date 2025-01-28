import { Fragment } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { cn } from '@/lib/utils';

const BreadCrumbsHeader = ({ items, containerClass }) => {
  return (
    <Breadcrumb className={cn('mx-10 mt-5', containerClass)}>
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
