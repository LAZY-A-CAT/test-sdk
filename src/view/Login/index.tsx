import { FC, useRef, useState } from "react";
import React from 'react';
import { LoginProps } from "@/type";
import { Button, Flex, Input } from "antd";
import "./index.scss";
import { ToLogin } from "../../utils/operate";
import UserList from "@/components/user";
import AccessibilityPage from "@/components/test";

const Login: FC<LoginProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [captcha, setCaptcha] = useState<string>("");
  // 获取验证码
  const randomRef = useRef<any>(null);
  const baseUrl = process.env.REACT_APP_DEVLOPMENT_BASE_UL;
  const getCaptcha = () => {
    if (randomRef && randomRef.current) {
      randomRef.current.setAttribute(
        "src",
        `${baseUrl}/captcha?v=${Math.random()}`
      );
    }
  };

  const ToHome = () => {};

  const loginApi = () => {
    ToLogin({ username, password, captcha }, setLoading, ToHome);
  };
  return (
    <div className="login">
      <Flex align="center" gap={10} className="mb1">
        <div className="login-tag">Username:</div>
        <Input
          placeholder="Username"
          className="flex"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Flex>
      <Flex align="center" gap={10} className="mb1">
        <div className="login-tag">Password:</div>
        <Input
          placeholder="Username"
          className="flex"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Flex>
      <Flex align="center" gap={10} className="mb1">
        <div className="login-tag">Captcha:</div>
        <Input
          placeholder="Username"
          className="flex"
          value={captcha}
          onChange={(e) => setCaptcha(e.target.value)}
        />
        <img
          src={baseUrl + "/captcha"}
          alt="captcha"
          ref={randomRef}
          onClick={getCaptcha}
        />
      </Flex>
      <Flex align="center" justify="center" className="mb1">
        <Button loading={loading} onClick={loginApi}>
          Login
        </Button>
      </Flex>
      {/* <UserList /> */}
      <AccessibilityPage />
    </div>
  );
};
export default Login;
