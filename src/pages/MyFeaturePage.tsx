// src/pages/MyFeaturePage.tsx
import React from "react";
import Login from "@/view/Login";

export interface MyFeatureProps {
  apiEndpoint: string;
  userId: string;
  onEvent?: (event: string) => void;
}

const MyFeaturePage: React.FC<MyFeatureProps> = ({
  apiEndpoint,
  userId,
  onEvent,
}) => {
  // ❌ 不要使用 useNavigate(), useLocation()
  // ❌ 不要依赖 Redux/Zustand（除非你封装进去）
  // ✅ 只依赖 props 和 React 内置 hooks

  return (
    <div className="my-feature-sdk">
      <h2>Hello from SDK!</h2>
      <p>User: {userId}</p>
      <p>apiEndpoint: {apiEndpoint}</p>
      <div style={{ marginTop: "20px" }}>
        <Login />
      </div>
    </div>
  );
};

export default MyFeaturePage;
