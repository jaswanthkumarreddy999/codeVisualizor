#!/bin/bash
# Run from repo root: ./backend/build-docker.sh
# Copies lib/ into backend/ for Docker build context, then builds
set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"

echo "Copying lib/ into backend/ for Docker build..."
cp -r "$REPO_ROOT/lib" "$SCRIPT_DIR/lib"

echo "Building Docker image..."
docker build -t codevisualizer-api "$SCRIPT_DIR"

echo "Cleaning up..."
rm -rf "$SCRIPT_DIR/lib"
echo "Done!"
