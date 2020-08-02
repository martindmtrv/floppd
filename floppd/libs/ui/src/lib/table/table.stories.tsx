import React from 'react';
import { Table, TableProps } from './table';

export default {
  component: Table,
  title: 'Table',
};

export const primary = () => {
  /* eslint-disable-next-line */
  const props: TableProps = {};

  return <Table />;
};
