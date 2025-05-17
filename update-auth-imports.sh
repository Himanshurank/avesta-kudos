#!/bin/bash

# Files to update
FILES=(
  "src/pages/dashboard/index.tsx"
  "src/pages/dashboard/analytics.tsx"
  "src/pages/dashboard/user-management.tsx"
  "src/pages/dashboard/approval-queue.tsx"
  "src/pages/auth/forgot-password.tsx"
  "src/components/templates/KudosLayout.tsx"
  "src/components/templates/DashboardLayout.tsx"
)

# Update the import statement in each file
for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Updating $file..."
    # Replace import statement
    sed -i 's/import { useAuth } from "@\/core\/application\/context\/AuthContext";/import { useAuthContext } from "@\/components\/contexts\/AuthContext";/g' "$file"
    # Replace usage of useAuth() with useAuthContext()
    sed -i 's/useAuth()/useAuthContext()/g' "$file"
  else
    echo "File $file not found, skipping..."
  fi
done

echo "Update complete!"