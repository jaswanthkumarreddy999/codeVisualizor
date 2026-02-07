// ================================================
// Problem 89: Redundant Connection
// ================================================
// In a graph that started as a tree, find the edge that was added last
// that creates a cycle.

// ============================================
// APPROACH 1: Union-Find - O(n * α(n)) ≈ O(n) Time ⭐ OPTIMAL
// ============================================
int[][] edges = {{1, 2}, {1, 3}, {2, 3}};
int n = edges.length;

int[] parent = new int[n + 1];
int[] rank = new int[n + 1];

// Initialize: each node is its own parent
for (int i = 1; i <= n; i++) {
    parent[i] = i;
    rank[i] = 0;
}

int[] redundant = null;

for (int[] edge : edges) {
    int u = edge[0], v = edge[1];
    
    int rootU = find(parent, u);
    int rootV = find(parent, v);
    
    if (rootU == rootV) {
        // Found cycle - this edge is redundant
        redundant = edge;
    } else {
        // Union by rank
        if (rank[rootU] < rank[rootV]) {
            parent[rootU] = rootV;
        } else if (rank[rootU] > rank[rootV]) {
            parent[rootV] = rootU;
        } else {
            parent[rootV] = rootU;
            rank[rootU]++;
        }
    }
}

System.out.println("Redundant Connection: " + Arrays.toString(redundant));

static int find(int[] parent, int x) {
    if (parent[x] != x) {
        parent[x] = find(parent, parent[x]);  // Path compression
    }
    return parent[x];
}

// ============================================
// APPROACH 2: DFS Cycle Detection - O(n²) Time
// ============================================
System.out.println("\nDFS Approach:");
System.out.println("For each edge, check if path already exists between nodes");
System.out.println("If yes, this edge creates a cycle");
