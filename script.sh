#!/bin/bash
git_res=$(git pull)
# Check if there are any changes
if [[ $git_res == *"Already up to date."* ]]; then
  echo "No changes in the repository."
else
  echo "Changes detected in the repository. Stopping Docker containers, pulling changes, and restarting containers."

  # Stop all running Docker containers
  docker stop $(docker ps -q)
  docker volume prune --force
  docker rmi -f $(docker images -aq)
  # Bring up Docker services using docker-compose
  docker-compose up -d --build --force-recreate
fi