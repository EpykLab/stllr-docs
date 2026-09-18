#!/usr/bin/env python3
"""Verify that the MkDocs build preserves the public documentation URLs."""

from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit
from xml.etree import ElementTree


ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "site"
EXPECTED_FILE = ROOT / "tests" / "expected_urls.txt"
EXPECTED_VIDEO_FILE = ROOT / "tests" / "expected_video_urls.txt"
EXPECTED_STATIC_FILE = ROOT / "tests" / "expected_static_urls.txt"
EXPECTED_ANCHORS_FILE = ROOT / "tests" / "expected_anchors.txt"
LINK_PATTERN = re.compile(r'''(?:href|src)=["']([^"']+)["']''')


def route_to_output(route: str) -> Path:
    return SITE / route.lstrip("/") / "index.html"


def fail(messages: list[str]) -> None:
    for message in messages:
        print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(1)


def main() -> None:
    expected = {
        line.strip()
        for line in EXPECTED_FILE.read_text(encoding="utf-8").splitlines()
        if line.strip() and not line.startswith("#")
    }
    expected_videos = {
        line.strip()
        for line in EXPECTED_VIDEO_FILE.read_text(encoding="utf-8").splitlines()
        if line.strip() and not line.startswith("#")
    }
    expected_static = {
        line.strip()
        for line in EXPECTED_STATIC_FILE.read_text(encoding="utf-8").splitlines()
        if line.strip() and not line.startswith("#")
    }
    expected_anchors = {
        line.strip()
        for line in EXPECTED_ANCHORS_FILE.read_text(encoding="utf-8").splitlines()
        if line.strip() and not line.startswith("#")
    }
    errors: list[str] = []

    for route in sorted(expected):
        if not route.startswith("/docs/") or not route.endswith("/"):
            errors.append(f"invalid URL contract entry: {route}")
        elif not route_to_output(route).is_file():
            errors.append(f"missing generated page for {route}")

    for route in sorted(expected_videos):
        if not route.startswith("/videos/") or not route.endswith("/"):
            errors.append(f"invalid video URL contract entry: {route}")
        elif not route_to_output(route).is_file():
            errors.append(f"missing generated page for {route}")

    generated = {
        f"/{path.relative_to(SITE).parent.as_posix()}/"
        for path in (SITE / "docs").rglob("index.html")
    }
    for route in sorted(generated - expected):
        errors.append(f"unexpected documentation URL: {route}")
    for route in sorted(expected - generated):
        errors.append(f"expected documentation URL was not generated: {route}")

    generated_videos = {
        f"/{path.relative_to(SITE).parent.as_posix()}/"
        for path in (SITE / "videos").rglob("index.html")
    }
    for route in sorted(generated_videos - expected_videos):
        errors.append(f"unexpected video URL: {route}")
    for route in sorted(expected_videos - generated_videos):
        errors.append(f"expected video URL was not generated: {route}")

    for url in sorted(expected_static):
        output = SITE / unquote(url).lstrip("/")
        if not output.is_file():
            errors.append(f"missing preserved static URL: {url}")

    for url in sorted(expected_anchors):
        target = urlsplit(url)
        output = route_to_output(target.path)
        if not output.is_file():
            errors.append(f"missing page for preserved heading URL: {url}")
            continue
        html = output.read_text(encoding="utf-8")
        if f'id="{unquote(target.fragment)}"' not in html:
            errors.append(f"missing preserved heading URL: {url}")

    for html_file in SITE.rglob("*.html"):
        html = html_file.read_text(encoding="utf-8")
        for raw_target in LINK_PATTERN.findall(html):
            target = urlsplit(raw_target)
            if target.netloc and target.netloc != "docs.stellarbridge.app":
                continue
            if not target.path.startswith("/"):
                continue

            decoded_path = unquote(target.path)
            output = SITE / decoded_path.lstrip("/")
            if decoded_path == "/":
                output = SITE / "index.html"
            elif decoded_path.endswith("/"):
                output /= "index.html"
            if not output.exists():
                source = html_file.relative_to(SITE)
                errors.append(f"broken internal URL in {source}: {raw_target}")
                continue
            if target.fragment and output.suffix == ".html":
                target_html = output.read_text(encoding="utf-8")
                fragment = unquote(target.fragment)
                if f'id="{fragment}"' not in target_html:
                    source = html_file.relative_to(SITE)
                    errors.append(f"broken heading anchor in {source}: {raw_target}")

    if not (SITE / "index.html").is_file():
        errors.append("missing root fallback page")

    sitemap = ElementTree.parse(SITE / "sitemap.xml")
    sitemap_locations = {
        element.text
        for element in sitemap.findall("{http://www.sitemaps.org/schemas/sitemap/0.9}url/{http://www.sitemaps.org/schemas/sitemap/0.9}loc")
    }
    expected_sitemap_locations = {
        f"https://docs.stellarbridge.app{route}"
        for route in expected | expected_videos
    }
    if sitemap_locations != expected_sitemap_locations:
        for location in sorted(expected_sitemap_locations - sitemap_locations):
            errors.append(f"missing sitemap URL: {location}")
        for location in sorted(sitemap_locations - expected_sitemap_locations):
            errors.append(f"unexpected sitemap URL: {location}")

    if errors:
        fail(errors)

    print(
        f"Verified {len(expected)} documentation URLs, "
        f"{len(expected_videos)} video URLs, "
        f"{len(expected_static)} static URLs, {len(expected_anchors)} heading URLs, "
        "and all same-site absolute links."
    )


if __name__ == "__main__":
    main()
