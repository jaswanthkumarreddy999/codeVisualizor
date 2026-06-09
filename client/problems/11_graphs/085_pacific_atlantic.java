// ================================================
// Problem 85: Pacific Atlantic Water Flow
// ================================================
// Given m x n matrix of heights, find cells where water can flow to both oceans.
// Pacific touches left and top edges, Atlantic touches right and bottom edges.

// ============================================
// APPROACH 1: DFS from Oceans - O(m*n) Time, O(m*n) Space ⭐ OPTIMAL
// ============================================
int[][] heights = {
    {1, 2, 2, 3, 5},
    {3, 2, 3, 4, 4},
    {2, 4, 5, 3, 1},
    {6, 7, 1, 4, 5},
    {5, 1, 1, 2, 4}
};

int m = heights.length;
int n = heights[0].length;

boolean[][] pacific = new boolean[m][n];
boolean[][] atlantic = new boolean[m][n];

// DFS from Pacific edges (top and left)
for (int i = 0; i < m; i++) dfs(heights, i, 0, pacific, Integer.MIN_VALUE);
for (int j = 0; j < n; j++) dfs(heights, 0, j, pacific, Integer.MIN_VALUE);

// DFS from Atlantic edges (bottom and right)
for (int i = 0; i < m; i++) dfs(heights, i, n - 1, atlantic, Integer.MIN_VALUE);
for (int j = 0; j < n; j++) dfs(heights, m - 1, j, atlantic, Integer.MIN_VALUE);

// Find cells reachable from both
List<List<Integer>> result = new ArrayList<>();
for (int i = 0; i < m; i++) {
    for (int j = 0; j < n; j++) {
        if (pacific[i][j] && atlantic[i][j]) {
            result.add(Arrays.asList(i, j));
        }
    }
}

System.out.println("Cells reaching both oceans: " + result);

static void dfs(int[][] heights, int r, int c, boolean[][] visited, int prevHeight) {
    int m = heights.length, n = heights[0].length;
    
    if (r < 0 || r >= m || c < 0 || c >= n) return;
    if (visited[r][c] || heights[r][c] < prevHeight) return;
    
    visited[r][c] = true;
    
    dfs(heights, r + 1, c, visited, heights[r][c]);
    dfs(heights, r - 1, c, visited, heights[r][c]);
    dfs(heights, r, c + 1, visited, heights[r][c]);
    dfs(heights, r, c - 1, visited, heights[r][c]);
}

// ============================================
// APPROACH 2: BFS from Oceans - O(m*n) Time, O(m*n) Space
// ============================================
System.out.println("\nBFS Approach:");
System.out.println("Start from ocean edges and BFS backwards");
System.out.println("Water flows uphill from ocean perspective");
