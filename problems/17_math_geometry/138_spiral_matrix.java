// ================================================
// Problem 138: Spiral Matrix
// ================================================
// Given an m x n matrix, return all elements in spiral order.

// ============================================
// APPROACH 1: Simulation with Boundaries - O(m*n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

List<Integer> result = new ArrayList<>();
int top = 0, bottom = matrix.length - 1;
int left = 0, right = matrix[0].length - 1;

while (top <= bottom && left <= right) {
    // Traverse right
    for (int j = left; j <= right; j++) {
        result.add(matrix[top][j]);
    }
    top++;
    
    // Traverse down
    for (int i = top; i <= bottom; i++) {
        result.add(matrix[i][right]);
    }
    right--;
    
    // Traverse left (if row exists)
    if (top <= bottom) {
        for (int j = right; j >= left; j--) {
            result.add(matrix[bottom][j]);
        }
        bottom--;
    }
    
    // Traverse up (if column exists)
    if (left <= right) {
        for (int i = bottom; i >= top; i--) {
            result.add(matrix[i][left]);
        }
        left++;
    }
}

System.out.println("Spiral Order: " + result);

// ============================================
// APPROACH 2: Direction Array - O(m*n) Time, O(m*n) Space for visited
// ============================================
System.out.println("\nDirection Array approach:");
System.out.println("Use directions: right, down, left, up");
System.out.println("Change direction when hitting boundary or visited cell");

/*
int[][] dirs = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
int dir = 0;  // Start going right
int r = 0, c = 0;
boolean[][] visited = new boolean[m][n];

for (int i = 0; i < m * n; i++) {
    result.add(matrix[r][c]);
    visited[r][c] = true;
    
    int nr = r + dirs[dir][0];
    int nc = c + dirs[dir][1];
    
    // Change direction if needed
    if (nr < 0 || nr >= m || nc < 0 || nc >= n || visited[nr][nc]) {
        dir = (dir + 1) % 4;
        nr = r + dirs[dir][0];
        nc = c + dirs[dir][1];
    }
    
    r = nr;
    c = nc;
}
*/

// ============================================
// Visualization
// ============================================
System.out.println("\nSpiral path:");
System.out.println("1 → 2 → 3");
System.out.println("        ↓");
System.out.println("4 → 5   6");
System.out.println("↑       ↓");
System.out.println("7 ← 8 ← 9");
System.out.println("Result: [1,2,3,6,9,8,7,4,5]");
