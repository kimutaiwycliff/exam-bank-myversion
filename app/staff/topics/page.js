'use client';
import CardWithTable from '@/components/staff/CardWithDatatable';
import TopicForm from '@/components/staff/forms/TopicForm';
import { topicColumns } from '@/components/tables/components/columns';
import {  getTopics } from '@/lib/actions/Staff';
const TopicsPage = () => {
  const items = [{ name: 'Topics' }];
  return (
    <CardWithTable
      items={items}
      title="Topics"
      columns={topicColumns}
      fetchFunction={getTopics}
      queryKey={'topics'}
      searchColumn="name"
      searchLabel="Name"
      Form={TopicForm}
    />
  );
}
export default TopicsPage
