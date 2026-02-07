// ================================================
// Problem 90: Number of Connected Components in an Undirected Graph
// ================================================
// Given n nodes and list of edges, find number of connected components.

// ============================================
// APPROACH 1: Union-Find - O(n + e * α(n)) Time ⭐ OPTIMAL
// ============================================
int n = 5;
int[][] edges = {{0, 1}, {1, 2}, {3, 4}};

int[] parent = new int[n];
for (int i = 0; i < n; i++) parent[i] = i;

int components = n;

for (int[] edge : edges) {
    int root1 = find(parent, edge[0]);
    int root2 = find(parent, edge[1]);
    
    if (root1 != root2) {
        parent[root1] = root2;
        components--;
    }
}

System.out.println("Connected Components: " + components);

static int find(int[] parent, int x) {
    if (parent[x] != x) {
        parent[x] = find(parent, parent[x]);
    }
    return parent[x];
}

// ============================================
// APPROACH 2: DFS - O(n + e) Time
// ============================================
int n2 = 5;
int[][] edges2 = {{0, 1}, {1, 2}, {3, 4}};

// Build adjacency list
List<List<Integer>> graph = new ArrayList<>();
for (int i = 0; i < n2; i++) graph.add(new ArrayList<>());
for (int[] edge : edges2) {
    graph.get(edge[0]).add(edge[1]);
    graph.get(edge[1]).add(edge[0]);
}

boolean[] visited = new boolean[n2];
int components2 = 0;

for (int i = 0; i < n2; i++) {
    if (!visited[i]) {
        dfs(graph, i, visited);
        components2++;
    }
}

System.out.println("Connected Components (DFS): " + components2);

static void dfs(List<List<Integer>> graph, int node, boolean[] visited) {
    visited[node] = true;
    for (int neighbor : graph.get(node)) {
        if (!visited[neighbor]) {
            dfs(graph, neighbor, visited);
        }
    }
}
