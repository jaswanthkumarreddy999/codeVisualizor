// ================================================
// Problem 84: Rotting Oranges
// ================================================
// In a grid, 0=empty, 1=fresh orange, 2=rotten orange.
// Rotten oranges spread to adjacent fresh oranges each minute.
// Return minutes until no fresh oranges remain, or -1 if impossible.

// ============================================
// APPROACH 1: Multi-Source BFS - O(m*n) Time, O(m*n) Space ⭐ OPTIMAL
// ============================================
int[][] grid = {
    {2, 1, 1},
    {1, 1, 0},
    {0, 1, 1}
};

int rows = grid.length;
int cols = grid[0].length;

Queue<int[]> queue = new LinkedList<>();
int freshCount = 0;

// Find all rotten oranges and count fresh
for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
        if (grid[i][j] == 2) {
            queue.offer(new int[]{i, j});
        } else if (grid[i][j] == 1) {
            freshCount++;
        }
    }
}

if (freshCount == 0) {
    System.out.println("Minutes: 0");
} else {
    int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    int minutes = 0;
    
    while (!queue.isEmpty() && freshCount > 0) {
        int size = queue.size();
        minutes++;
        
        for (int i = 0; i < size; i++) {
            int[] cell = queue.poll();
            
            for (int[] dir : dirs) {
                int nr = cell[0] + dir[0];
                int nc = cell[1] + dir[1];
                
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                    grid[nr][nc] = 2;
                    freshCount--;
                    queue.offer(new int[]{nr, nc});
                }
            }
        }
    }
    
    int result = (freshCount == 0) ? minutes : -1;
    System.out.println("Minutes: " + result);
}

// ============================================
// Visualization: Step by step
// ============================================
System.out.println("\nStep-by-step:");
System.out.println("Initial: 2 1 1    (2=rotten, 1=fresh)");
System.out.println("         1 1 0");
System.out.println("         0 1 1");
System.out.println("Min 1:   2 2 1    (adjacent become rotten)");
System.out.println("         2 1 0");
System.out.println("         0 1 1");
System.out.println("Min 2:   2 2 2");
System.out.println("         2 2 0");
System.out.println("         0 2 1");
System.out.println("Min 3:   2 2 2");
System.out.println("         2 2 0");
System.out.println("         0 2 2");
System.out.println("Min 4:   All rotten! Result = 4");
