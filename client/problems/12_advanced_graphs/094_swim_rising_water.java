// ================================================
// Problem 94: Swim in Rising Water
// ================================================
// Given n x n grid where grid[i][j] = elevation at time t, water rises.
// Find minimum time to swim from (0,0) to (n-1,n-1).

// ============================================
// APPROACH 1: Dijkstra's / Min Heap - O(n² log n) Time ⭐ OPTIMAL
// ============================================
int[][] grid = {
    {0, 2},
    {1, 3}
};

int n = grid.length;
// Min heap: [maxElevation, row, col]
PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
boolean[][] visited = new boolean[n][n];
int[][] dirs = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

pq.offer(new int[]{grid[0][0], 0, 0});
visited[0][0] = true;

int result = 0;
while (!pq.isEmpty()) {
    int[] curr = pq.poll();
    int maxElev = curr[0], r = curr[1], c = curr[2];
    result = Math.max(result, maxElev);
    
    if (r == n - 1 && c == n - 1) {
        break;
    }
    
    for (int[] dir : dirs) {
        int nr = r + dir[0], nc = c + dir[1];
        if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc]) {
            visited[nr][nc] = true;
            pq.offer(new int[]{grid[nr][nc], nr, nc});
        }
    }
}

System.out.println("Swim in Rising Water: " + result);

// ============================================
// APPROACH 2: Binary Search + BFS/DFS - O(n² log n) Time
// ============================================
System.out.println("\nBinary Search approach:");
System.out.println("Binary search on time t");
System.out.println("For each t, check if path exists using only cells <= t");
