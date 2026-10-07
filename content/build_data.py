# -*- coding: utf-8 -*-
"""
build_data.py — 把 content/ 下的 YAML 内容数据编译成 web/js/data.js

业务背景：
    网页是纯静态、零构建、离线可用的（双击 index.html 即用），
    但内容必须与 content/graph.yaml、content/script.yaml 保持单一数据源。
    因此用这个小脚本把 YAML 转成一份 web/js/data.js（挂载到 window.LING_DATA），
    网页直接 <script src="js/data.js"> 读取，无需 fetch（file:// 下 fetch 会被浏览器拦截）。

用法（在本仓库根目录或 content/ 下运行均可）：
    python content/build_data.py
    # 或
    cd content && python build_data.py

改动文案/图谱后重新运行本脚本即可刷新网页数据。
"""

import json
import sys
from pathlib import Path

import yaml

# 定位 content/ 目录：无论从哪里调用都以脚本自身所在目录为准
CONTENT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = CONTENT_DIR.parent
OUT_FILE = PROJECT_ROOT / "web" / "js" / "data.js"


def load_yaml(name: str) -> dict:
    """读取 content/ 下的 YAML 文件，带 UTF-8 与友好报错。"""
    path = CONTENT_DIR / name
    if not path.exists():
        sys.exit(f"[build_data] 找不到内容文件：{path}")
    with path.open("r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def main() -> None:
    graph = load_yaml("graph.yaml")
    script = load_yaml("script.yaml")

    # 轻量自检：边的两端必须都是已声明的节点，避免网页渲染时悬空连线
    node_ids = {n["id"] for n in graph["nodes"]}
    for e in graph["edges"]:
        for end in ("source", "target"):
            if e[end] not in node_ids:
                sys.exit(f"[build_data] 边引用了未定义节点：{e[end]}（{e}）")

    payload = {"graph": graph, "script": script}
    js = (
        "// 本文件由 content/build_data.py 自动生成，请勿手改；"
        "改内容请编辑 content/*.yaml 后重跑构建脚本。\n"
        "window.LING_DATA = "
        + json.dumps(payload, ensure_ascii=False, indent=2)
        + ";\n"
    )

    OUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUT_FILE.write_text(js, encoding="utf-8")
    print(
        f"[build_data] 已生成 {OUT_FILE} "
        f"（节点 {len(graph['nodes'])} 个，边 {len(graph['edges'])} 条，"
        f"分页 {len(script['slides'])} 页）"
    )


if __name__ == "__main__":
    main()
