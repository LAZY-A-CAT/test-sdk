import type { ColumnsType } from "antd/es/table";
import { DataType } from "../type";
import { useEffect, useState } from "react";
import { Flex, Space, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import React from 'react';
export const useColumns = () => {
  const [columns, setColumns] = useState<any>(null);
  useEffect(() => {
    const columns: ColumnsType<DataType> = [
      {
        title: "用户昵称",
        dataIndex: "nickname",
        align: "center",
      },
      {
        title: "电话",
        dataIndex: "phone",
        align: "center",
      },
      {
        title: "用户标签",
        dataIndex: "label",
        align: "center",
        render: (text) => (
          <Flex justify="center" wrap gap={5}>
            {text?.map((item: any, index: number) => (
              <Tag color="#2db7f5" key={index}>
                {item?.name}
              </Tag>
            ))}
          </Flex>
        ),
      },
      {
        title: "用户组",
        dataIndex: "group",
        align: "center",
        render: (text) => (
          <Flex gap={5} wrap justify="center">
            {text?.map((item: any, index: number) => (
              <Tag color="#87d068" key={index}>
                {item?.name}
              </Tag>
            ))}
          </Flex>
        ),
      },
      {
        title: "组织",
        dataIndex: "organization",
        align: "center",
      },
      {
        title: "时间",
        dataIndex: "date",
        align: "center",
      },
      {
        title: "操作",
        key: "operation",
        align: "center",
        render: (_, record) => (
          <Space>
            <EyeOutlined />
          </Space>
        ),
      },
    ];
    setColumns(columns);
  }, []);
  return [columns];
};
