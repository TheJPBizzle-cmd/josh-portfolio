#!/usr/bin/env bash
# Publish the site to Cloudflare Pages (project: josh-portfolio).
# The project is a Direct Upload project, so pushing to GitHub does not deploy it.
# Only index.html and media/ are published; masters and backups stay local.
set -euo pipefail
cd "$(dirname "$0")"

rm -rf dist
mkdir -p dist
cp -l index.html dist/ 2>/dev/null || cp index.html dist/
cp -rl media dist/ 2>/dev/null || cp -r media dist/

npx.cmd --yes wrangler@4 pages deploy dist --project-name josh-portfolio --branch main --commit-dirty=true
