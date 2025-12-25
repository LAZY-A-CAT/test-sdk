import { FC, useState } from "react";
import React from 'react';
import { Search } from "./Search";
import Require from "../require";
import { TbList } from "./TbList";
import { Card, Flex } from "antd";
import { TableParams } from "./type";
import type { PaginationProps } from "antd";
import type { TablePaginationConfig } from "antd/es/table";

interface UserListProps {}

const UserList: FC<UserListProps> = () => {
  const [label_id, setLabelID] = useState<any>(null);
  const [group_id, setGroupID] = useState<any>(null);
  const [organization_id, setOrganizationID] = useState<any>(null);
  const [nicknames, setNicknames] = useState<any>(null);
  const [nickname, setNickname] = useState<any>(null);
  const [phone, setPhone] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const showTotal: PaginationProps["showTotal"] = (total: any) =>
    `共${total}项`;

  const getRandomuserParams = (params: TableParams) => ({
    page_size: params.pagination?.pageSize,
    page: params.pagination?.current,
    nickname: params.nickname,
    phone: params?.phone,
    label_id: params?.label_id,
    group_id: params?.group_id,
    organization_id: params?.organization_id,
  });
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      hideOnSinglePage: true,
      showTotal: showTotal,
      showQuickJumper: true,
    },
  });
  const handleTableChange = (pagination: TablePaginationConfig) => {
    // setCount(count + 1);
    pagination["showTotal"] = tableParams.pagination?.showTotal;
    setTableParams({
      ...tableParams,
      pagination,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  return (
    <div className="user-list">
      <Card>
        <Flex align="center" gap={15}>
          <Search
            labelId={label_id}
            groupId={group_id}
            nicknames={nicknames}
            setGroupID={setGroupID}
            setLabelID={setLabelID}
            setNickname={setNickname}
            setNicknames={setNicknames}
            setOrganizationID={setOrganizationID}
            setPhone={setPhone}
          />
          <Require />
        </Flex>
        <TbList
          data={data}
          loading={loading}
          tableParams={tableParams}
          handleTableChange={handleTableChange}
        />
      </Card>
    </div>
  );
};

export default UserList;
