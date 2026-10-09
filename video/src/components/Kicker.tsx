// Kicker：章节标签（英文大写宽字距 + 中文小字），与网页 .kicker 同款
import React from "react";
import { C, F } from "../tokens";

export const Kicker: React.FC<{ en: string; zh: string; color?: string }> = ({
  en,
  zh,
  color = C.accent,
}) => (
  <div style={{ display: "flex", alignItems: "baseline", gap: 28 }}>
    <span
      style={{
        fontFamily: F.enUi,
        fontSize: 21,
        fontWeight: 600,
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color,
      }}
    >
      {en}
    </span>
    <span
      style={{
        fontFamily: F.zhSerif,
        fontSize: 20,
        letterSpacing: "0.18em",
        color: C.inkFaint,
      }}
    >
      {zh}
    </span>
  </div>
);
