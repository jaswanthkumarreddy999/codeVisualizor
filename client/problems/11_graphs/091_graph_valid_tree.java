// ================================================
// Problem 91: Graph Valid Tree
// ================================================
// Given n nodes and undirected edges, check if these edges form a valid tree.
// A valid tree has n-1 edges and is connected with no cycles.

// ============================================
// APPROACH 1: Union-Find - O(n + e * α(n)) Time ⭐ OPTIMAL
// ============================================
int n = 5;
int[][] edges = {{0, 1}, {0, 2}, {0, 3}, {1, 4}};

// Tree conditions: n-1 edges + no cycle
if (edges.length != n - 1) {
    System.out.println("Valid Tree: false (wrong edge count)");
} else {
    int[] parent = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    
    boolean validTree = true;
    
    for (int[] edge : edges) {
        int root1 = find(parent, edge[0]);
        int root2 = find(parent, edge[1]);
        
        if (root1 == root2) {
            validTree = false;  // Cycle detected
            break;
        }
        parent[root1] = root2;
    }
    
    System.out.println("Valid Tree: " + validTree);
}

static int find(int[] parent, int x) {
    if (parent[x] != x) {
        parent[x] = find(parent, parent[x]);
    }
    return parent[x];
}

// ============================================
// APPROACH 2: DFS - O(n + e) Time
// ============================================
System.out.println("\nDFS Approach:");
System.out.println("1. Check edge count = n - 1");
System.out.println("2. DFS from node 0");
System.out.println("3. Check all nodes visited (connected)");
System.out.println("4. No back edges (no cycles) - tracked by parent");

/*
boolean validTreeDFS(int n, int[][] edges) {
    if (edges.length != n - 1) return false;
    
    List<List<Integer>> graph = buildGraph(n, edges);
    boolean[] visited = new boolean[n];
    
    dfs(graph, 0, -1, visited);
    
    // Check all nodes visited
    for (boolean v : visited) {
        if (!v) return false;
    }
    return true;
}
*/
