// ================================================
// Problem 83: Number of Islands
// ================================================
// Given 2D grid of '1's (land) and '0's (water), count the number of islands.

// ============================================
// APPROACH 1: DFS - O(m*n) Time, O(m*n) Space ⭐ OPTIMAL
// ============================================
char[][] grid = {
    {'1', '1', '0', '0', '0'},
    {'1', '1', '0', '0', '0'},
    {'0', '0', '1', '0', '0'},
    {'0', '0', '0', '1', '1'}
};

int m = grid.length, n = grid[0].length;
int islands = 0;

for (int i = 0; i < m; i++) {
    for (int j = 0; j < n; j++) {
        if (grid[i][j] == '1') {
            dfsIsland(grid, i, j);
            islands++;
        }
    }
}

System.out.println("Number of Islands: " + islands);

static void dfsIsland(char[][] grid, int r, int c) {
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] != '1') {
        return;
    }
    
    grid[r][c] = '0';  // Mark as visited
    
    dfsIsland(grid, r + 1, c);
    dfsIsland(grid, r - 1, c);
    dfsIsland(grid, r, c + 1);
    dfsIsland(grid, r, c - 1);
}

// ============================================
// APPROACH 2: BFS - O(m*n) Time, O(min(m,n)) Space
// ============================================
System.out.println("\nBFS Approach:");
System.out.println("Use queue to explore neighbors level by level");
System.out.println("Mark cells as visited when adding to queue");

// ============================================
// APPROACH 3: Union-Find - O(m*n * α(m*n)) Time
// ============================================
System.out.println("\nUnion-Find Approach:");
System.out.println("Union adjacent land cells");
System.out.println("Count distinct components at end");
