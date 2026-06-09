// ================================================
// Problem 92: Min Cost to Connect All Points (Prim's/Kruskal's)
// ================================================
// Given n points, return min cost to connect all points.
// Cost = Manhattan distance = |xi - xj| + |yi - yj|

// ============================================
// APPROACH 1: Prim's Algorithm - O(n² log n) Time ⭐ OPTIMAL for dense graphs
// ============================================
int[][] points = {{0, 0}, {2, 2}, {3, 10}, {5, 2}, {7, 0}};
int n = points.length;

// Min heap: [cost, pointIndex]
PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
boolean[] visited = new boolean[n];
int totalCost = 0;
int edges = 0;

pq.offer(new int[]{0, 0});  // Start from point 0

while (edges < n && !pq.isEmpty()) {
    int[] curr = pq.poll();
    int cost = curr[0];
    int point = curr[1];
    
    if (visited[point]) continue;
    
    visited[point] = true;
    totalCost += cost;
    edges++;
    
    // Add edges to unvisited points
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            int dist = Math.abs(points[point][0] - points[i][0]) + 
                       Math.abs(points[point][1] - points[i][1]);
            pq.offer(new int[]{dist, i});
        }
    }
}

System.out.println("Min Cost (Prim's): " + totalCost);

// ============================================
// APPROACH 2: Kruskal's with Union-Find - O(n² log n) Time
// ============================================
System.out.println("\nKruskal's Algorithm:");
System.out.println("1. Generate all edges with costs");
System.out.println("2. Sort edges by cost");
System.out.println("3. Add edge if it doesn't form cycle (Union-Find)");
System.out.println("4. Stop when n-1 edges added");

/*
int minCostKruskal(int[][] points) {
    int n = points.length;
    List<int[]> edges = new ArrayList<>();  // [cost, i, j]
    
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            int cost = Math.abs(points[i][0] - points[j][0]) + 
                       Math.abs(points[i][1] - points[j][1]);
            edges.add(new int[]{cost, i, j});
        }
    }
    
    Collections.sort(edges, (a, b) -> a[0] - b[0]);
    
    int[] parent = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    
    int totalCost = 0, edgeCount = 0;
    for (int[] edge : edges) {
        if (edgeCount == n - 1) break;
        
        int root1 = find(parent, edge[1]);
        int root2 = find(parent, edge[2]);
        
        if (root1 != root2) {
            parent[root1] = root2;
            totalCost += edge[0];
            edgeCount++;
        }
    }
    
    return totalCost;
}
*/
