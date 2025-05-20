#!/bin/bash

# Apply patches to node_modules
echo "Applying patches to node_modules..."

# Three-mesh-bvh BatchedMesh fix
patch -p0 < patches/three-mesh-bvh-fix.patch

echo "Patches applied successfully!"