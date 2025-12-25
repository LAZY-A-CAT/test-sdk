// sdk/entry.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import MyFeaturePage, { MyFeatureProps } from "../src/pages/MyFeaturePage";

const instances = new Map<string, any>();

function getElementKey(el: string | HTMLElement): string {
  if (typeof el === "string") return el;
  if (el.id) return "#" + el.id;
  const existingKey = el.getAttribute("data-sdk-key");
  if (existingKey) return existingKey;
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

  const key = getElementKey(target);
  instances.set(key, { root, container });
}

function unmount(target: string | HTMLElement) {
  const key = getElementKey(target);
  const instance = instances.get(key);
  if (instance) {
    instance.root.unmount();
    instances.delete(key);
  }
}

// ✅ 关键：创建 SDK 对象并 default 导出
const MySDK = { render, unmount };

export default MySDK; // ←←← 必须这一行！
