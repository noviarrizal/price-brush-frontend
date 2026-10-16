"""Inline tools/pb-base.css, pb-head.js and pb-icons.svg into every design HTML file.

Regions are delimited by markers so each HTML file stays self-contained:
  /*pb-base:start*/ ... /*pb-base:end*/      (inside <style>)
  //pb-head:start ... //pb-head:end          (inside <script>)
  <!--pb-icons:start--> ... <!--pb-icons:end-->

Usage: python -I docs/design/tools/sync-base.py
"""
import pathlib
import re

tools = pathlib.Path(__file__).resolve().parent
design = tools.parent
css = (tools / "pb-base.css").read_text(encoding="utf-8")
js = (tools / "pb-head.js").read_text(encoding="utf-8")
svg = (tools / "pb-icons.svg").read_text(encoding="utf-8")

files = sorted((design / "prototypes").glob("*.html")) + [design / "design-system.html"]
for f in files:
    if not f.exists():
        continue
    s = f.read_text(encoding="utf-8")
    o = s
    s = re.sub(r"/\*pb-base:start\*/.*?/\*pb-base:end\*/",
               lambda m: "/*pb-base:start*/\n" + css + "/*pb-base:end*/", s, flags=re.S)
    s = re.sub(r"//pb-head:start.*?//pb-head:end",
               lambda m: "//pb-head:start\n" + js + "//pb-head:end", s, flags=re.S)
    s = re.sub(r"<!--pb-icons:start-->.*?<!--pb-icons:end-->",
               lambda m: "<!--pb-icons:start-->\n" + svg + "<!--pb-icons:end-->", s, flags=re.S)
    if s != o:
        f.write_text(s, encoding="utf-8", newline="\n")
        print("synced", f.name)
