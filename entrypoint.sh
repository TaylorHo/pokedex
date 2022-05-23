#!/bin/sh
echo "Starting container $hostname"
if [ -z "$MONGO_URI" ]; then
  echo "Container failed to start, please pass -e MONGO_URI=your_mongodb_uri"
  exit 1
fi
exec "$@"