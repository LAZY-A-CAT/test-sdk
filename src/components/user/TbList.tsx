import { FC } from "react";

import { TbListProps } from "./type";
import { Table } from "antd";
import { useColumns } from "./hooks/useColumns";
import React from 'react';

export const TbList: FC<TbListProps> = ({
  loading,
  handleTableChange,
  tableParams,
  data,
}) => {
  const [columns] = useColumns();
  return (
    <Table
      columns={columns}
      loading={loading}
      dataSource={data}
      bordered
      pagination={{
        ...tableParams.pagination,
        style: { justifyContent: "center" },
      }}
      onChange={handleTableChange}
      size="small"
      scroll={{ y: 400 }}
    />
  );
};
