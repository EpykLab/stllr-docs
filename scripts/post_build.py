"""Post-process MkDocs output to retain the previous sitemap contract."""

from __future__ import annotations

import gzip
import json
from pathlib import Path
from xml.etree import ElementTree


SITEMAP_NAMESPACE = "http://www.sitemaps.org/schemas/sitemap/0.9"


def on_post_build(*, config, **_kwargs) -> None:
    sitemap = Path(config.site_dir) / "sitemap.xml"
    tree = ElementTree.parse(sitemap)
    root = tree.getroot()
    site_root = config.site_url.rstrip("/") + "/"

    for entry in list(root):
        location = entry.find(f"{{{SITEMAP_NAMESPACE}}}loc")
        if location is not None and location.text == site_root:
            root.remove(entry)

    ElementTree.register_namespace("", SITEMAP_NAMESPACE)
    tree.write(sitemap, encoding="utf-8", xml_declaration=True)
    with sitemap.open("rb") as source, gzip.open(f"{sitemap}.gz", "wb") as target:
        target.write(source.read())

    search_index = Path(config.site_dir) / "search" / "search_index.json"
    search_data = json.loads(search_index.read_text(encoding="utf-8"))
    compatibility_dir = Path(config.site_dir) / "compat"
    compatibility_dir.mkdir()

    pages_by_location: dict[str, dict] = {}
    for document in search_data["docs"]:
        location = document["location"].split("#", 1)[0]
        if not location.startswith("docs/"):
            continue
        if location not in pages_by_location:
            pages_by_location[location] = {
                "id": location,
                "title": document["title"],
                "href": f"/{location}",
                "summary": "",
                "content": "",
                "tags": [],
            }
        pages_by_location[location]["content"] += f" {document['text']}"

    pages = list(pages_by_location.values())

    nav_root: dict[str, dict] = {}
    for page in pages:
        segments = page["href"].removeprefix("/docs/").strip("/").split("/")
        if segments == [""]:
            continue
        cursor = nav_root
        branch = []
        for segment in segments:
            branch.append(segment)
            node = cursor.setdefault(
                segment,
                {
                    "title": segment.replace("-", " "),
                    "href": f"/docs/{'/'.join(branch)}/",
                    "children": {},
                },
            )
            cursor = node["children"]
        node["title"] = page["title"]

    def serialize_nav(nodes: dict[str, dict]) -> list[dict]:
        result = [
            {
                "title": node["title"],
                "href": node["href"],
                "children": serialize_nav(node["children"]),
            }
            for node in nodes.values()
        ]
        return sorted(result, key=lambda item: item["title"].casefold())

    (compatibility_dir / "nav.json").write_text(
        json.dumps({"nav": serialize_nav(nav_root)}, separators=(",", ":")),
        encoding="utf-8",
    )
    (compatibility_dir / "search-index.json").write_text(
        json.dumps({"docs": pages}, separators=(",", ":")),
        encoding="utf-8",
    )
