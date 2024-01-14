#!/bin/bash

# Check if the current directory is a Git repository
if ! git rev-parse --is-inside-work-tree &> /dev/null; then
  echo "Not a Git repository. Exiting."
  exit 1
fi

# Check if there are any changes
if git diff --quiet; then
  echo "No changes in the repository."
else
  echo "Changes detected in the repository. Stopping Docker containers, pulling changes, and restarting containers."

  # Stop all running Docker containers
  docker stop $(docker ps -q)

  # Perform a git pull
  git pull

  # Bring up Docker services using docker-compose
  docker-compose up -d --build --force-recreate
fi
