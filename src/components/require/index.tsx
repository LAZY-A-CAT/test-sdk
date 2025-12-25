import { Button, Flex } from "antd";
import { FC } from "react";
import React from 'react';

interface RequireProps {}

const Require: FC<RequireProps> = () => {
  return (
    <Flex gap={10} align="center">
      <Button type="primary">查询</Button>
      <Button color="default">重置</Button>
    </Flex>
  );
};

export default Require;
