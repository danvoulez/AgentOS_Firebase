#!/bin/bash

# Make all .sh files executable
find . -maxdepth 1 -name "*.sh" -print0 | while IFS= read -r -d $'\0' script; do
  chmod +x "$script"
done

find . -maxdepth 1 -name "*.sh" -executable -print0 | while IFS= read -r -d $'\0' script; do
  if [[ "$script" != "./run_all.sh" ]]; then
    echo "Running: $script"
    "$script"
  fi
done