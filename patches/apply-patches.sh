#!/bin/bash

# Apply patches to node_modules
echo "Applying patches to node_modules..."

# Three-mesh-bvh BatchedMesh fix
THREE_MESH_BVH_FILE="node_modules/three-mesh-bvh/src/utils/ExtensionUtilities.js"

# Check if the file exists and contains the pattern we need to fix
if [ -f "$THREE_MESH_BVH_FILE" ] && grep -q "const BatchedMesh = THREE.BatchedMesh || null;" "$THREE_MESH_BVH_FILE"; then
  echo "Applying patch to $THREE_MESH_BVH_FILE"
  # Check OS type for sed compatibility
  if [[ "$(uname)" == "Darwin" ]]; then
    # macOS requires an empty string for -i
    sed -i '' 's/const BatchedMesh = THREE.BatchedMesh || null;/const BatchedMesh = null; \/\/ Fixed version to prevent build errors/' "$THREE_MESH_BVH_FILE"
  else
    # Linux doesn't need the empty string
    sed -i 's/const BatchedMesh = THREE.BatchedMesh || null;/const BatchedMesh = null; \/\/ Fixed version to prevent build errors/' "$THREE_MESH_BVH_FILE"
  fi
  echo "Patch applied successfully"
else
  echo "Skipping patch for $THREE_MESH_BVH_FILE (already patched or file not found)"
fi

echo "Patches applied successfully!"