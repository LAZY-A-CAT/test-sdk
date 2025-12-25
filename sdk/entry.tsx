// sdk/entry.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import MyFeaturePage, { MyFeatureProps } from "../src/pages/MyFeaturePage";

// 全局命名空间
declare global {
  interface Window {
    MySDK: {
      render: (options: {
        target: string | HTMLElement;
        props: MyFeatureProps;
      }) => void;
      unmount: (target: string | HTMLElement) => void;
    };
  }
}

interface SDKInstance {
  root: ReturnType<typeof createRoot>;
  container: HTMLElement;
}

const instances = new Map<string, SDKInstance>();

function getElementKey(el: string | HTMLElement): string {
  if (typeof el === "string") {
    return el; // 如 "#my-div"
  }
  // 如果是 HTMLElement，优先用 id，没有就用唯一标识
  if (el.id) {
    return "#" + el.id;
  }
  // 或者生成/使用 data 属性
  const existingKey = el.getAttribute("data-sdk-key");
  if (existingKey) return existingKey;

  // 否则生成一个唯一 key 并存到元素上（避免重复创建）
  const uniqueKey = `sdk-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;
  el.setAttribute("data-sdk-key", uniqueKey);
  return uniqueKey;
}

function render(options: {
  target: string | HTMLElement;
  props: MyFeatureProps;
}) {
  const { target, props } = options;

  const container =
    typeof target === "string"
      ? document.querySelector<HTMLElement>(target)
      : target;

  if (!container) {
    console.error("[MySDK] Target element not found:", target);
    return;
  }

  const root = createRoot(container);
  root.render(<MyFeaturePage {...props} />);

  // ✅ 统一转为 string key
  const key = getElementKey(target);
  instances.set(key, { root, container });
}

function unmount(target: string | HTMLElement) {
  const key = getElementKey(target); // ✅ 安全转 string
  const instance = instances.get(key);
  if (instance) {
    instance.root.unmount();
    instances.delete(key);
  }
}

// 挂载到 window
window.MySDK = { render, unmount };

// 也支持模块化引入（可选）
export { render, unmount };
