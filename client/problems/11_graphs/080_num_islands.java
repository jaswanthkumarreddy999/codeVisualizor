// ================================================
// Problem 80: Number of Islands
// ================================================
// Given an m x n 2D grid map of '1's (land) and '0's (water), 
// return the number of islands.

// ============================================
// APPROACH 1: DFS - O(m*n) Time, O(m*n) Space ⭐ OPTIMAL
// ============================================
char[][] grid = {
    {'1', '1', '0', '0', '0'},
    {'1', '1', '0', '0', '0'},
    {'0', '0', '1', '0', '0'},
    {'0', '0', '0', '1', '1'}
};

int numIslands = 0;
int rows = grid.length;
int cols = grid[0].length;

for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
        if (grid[i][j] == '1') {
            numIslands++;
            // DFS to mark all connected land
            dfs(grid, i, j, rows, cols);
        }
    }
}

System.out.println("Number of Islands (DFS): " + numIslands);

static void dfs(char[][] grid, int i, int j, int rows, int cols) {
    if (i < 0 || i >= rows || j < 0 || j >= cols || grid[i][j] != '1') {
        return;
    }
    
    grid[i][j] = '0'; // Mark as visited
    
    dfs(grid, i + 1, j, rows, cols);
    dfs(grid, i - 1, j, rows, cols);
    dfs(grid, i, j + 1, rows, cols);
    dfs(grid, i, j - 1, rows, cols);
}

// ============================================
// APPROACH 2: BFS - O(m*n) Time, O(min(m,n)) Space
// ============================================
char[][] grid2 = {
    {'1', '1', '0', '0', '0'},
    {'1', '1', '0', '0', '0'},
    {'0', '0', '1', '0', '0'},
    {'0', '0', '0', '1', '1'}
};

int numIslands2 = 0;
int rows2 = grid2.length;
int cols2 = grid2[0].length;

for (int i = 0; i < rows2; i++) {
    for (int j = 0; j < cols2; j++) {
        if (grid2[i][j] == '1') {
            numIslands2++;
            bfs(grid2, i, j, rows2, cols2);
        }
    }
}

System.out.println("Number of Islands (BFS): " + numIslands2);

static void bfs(char[][] grid, int i, int j, int rows, int cols) {
    Queue<int[]> queue = new LinkedList<>();
    queue.offer(new int[]{i, j});
    grid[i][j] = '0';
    
    int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    
    while (!queue.isEmpty()) {
        int[] cell = queue.poll();
        for (int[] dir : dirs) {
            int ni = cell[0] + dir[0];
            int nj = cell[1] + dir[1];
            if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && grid[ni][nj] == '1') {
                grid[ni][nj] = '0';
                queue.offer(new int[]{ni, nj});
            }
        }
    }
}

// ============================================
// APPROACH 3: Union-Find - O(m*n * α(m*n)) Time, O(m*n) Space
// ============================================
System.out.println("\nUnion-Find Approach:");
System.out.println("1. Create disjoint set for each land cell");
System.out.println("2. Union adjacent land cells");
System.out.println("3. Count distinct roots");
