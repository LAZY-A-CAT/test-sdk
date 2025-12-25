import { Cascader, Flex, Input, Select } from "antd";
import { FC, useState } from "react";
import { isStrictPhoneNumber } from "./operate";
import React from 'react';

interface SearchProps {
  labelId: any;
  setLabelID: (val: any) => void;
  groupId: any;
  setGroupID: (val: any) => void;
  setOrganizationID: (val: any) => void;
  nicknames: any;
  setNicknames: any;
  setNickname: any;
  setPhone: any;
}

export const Search: FC<SearchProps> = ({
  labelId,
  setLabelID,
  groupId,
  setGroupID,
  setOrganizationID,
  nicknames,
  setNickname,
  setNicknames,
  setPhone,
}) => {
  const [options, setOptions] = useState<any[]>([]); //标签
  const [loading, setLoading] = useState<boolean>(false);
  const [options2, setOptions2] = useState<any[]>([]); //用户组
  const [loading2, setLoading2] = useState<boolean>(false);
  const [options3, setOptions3] = useState<any[]>([]); //组织
  const [loading3, setLoading3] = useState<boolean>(false);
  const [orgV, setOrgV] = useState<any>(null);
  const onChange = (value: any) => {
    setOrgV(value);
    if (value && value?.length) {
      setOrganizationID(value[value?.length - 1]);
    } else {
      setOrganizationID(null);
    }
  };
  const displayRender = (labels: string[]) => labels[labels.length - 1];
  return (
    <Flex align="center" gap={10}>
      <Select
        placeholder="标签"
        allowClear
        style={{ width: "200px", height: "32px" }}
        options={options}
        onChange={(val) => setLabelID(val)}
        loading={loading}
        value={labelId}
      />
      <Select
        placeholder="用户组"
        allowClear
        style={{ width: "200px", height: "32px" }}
        options={options2}
        onChange={(val) => setGroupID(val)}
        loading={loading2}
        value={groupId}
      />
      <Cascader
        options={options3}
        value={orgV}
        onChange={onChange}
        className="ipt2"
        placeholder="组织"
        displayRender={displayRender}
        allowClear
      />
      <Input
        placeholder="名称或电话"
        style={{ width: "200px", height: "32px" }}
        allowClear
        value={nicknames}
        onChange={(e) => {
          setNicknames(e.target.value);
          if (isStrictPhoneNumber(e.target.value)) {
            setPhone(e.target.value);
            setNickname("");
          } else {
            setNickname(e.target.value);
            setPhone("");
          }
        }}
      />
    </Flex>
  );
};
