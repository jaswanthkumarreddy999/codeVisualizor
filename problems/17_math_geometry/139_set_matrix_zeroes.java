// ================================================
// Problem 139: Set Matrix Zeroes
// ================================================
// If element is 0, set its entire row and column to 0. In-place.

// ============================================
// APPROACH 1: Use First Row/Column as Markers - O(m*n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[][] matrix = {
    {1, 1, 1},
    {1, 0, 1},
    {1, 1, 1}
};

int m = matrix.length, n = matrix[0].length;
boolean firstRowZero = false, firstColZero = false;

// Check if first row/column should be zeroed
for (int j = 0; j < n; j++) {
    if (matrix[0][j] == 0) firstRowZero = true;
}
for (int i = 0; i < m; i++) {
    if (matrix[i][0] == 0) firstColZero = true;
}

// Mark zeros in first row/column
for (int i = 1; i < m; i++) {
    for (int j = 1; j < n; j++) {
        if (matrix[i][j] == 0) {
            matrix[i][0] = 0;
            matrix[0][j] = 0;
        }
    }
}

// Set zeros based on markers
for (int i = 1; i < m; i++) {
    for (int j = 1; j < n; j++) {
        if (matrix[i][0] == 0 || matrix[0][j] == 0) {
            matrix[i][j] = 0;
        }
    }
}

// Handle first row and column
if (firstRowZero) {
    for (int j = 0; j < n; j++) matrix[0][j] = 0;
}
if (firstColZero) {
    for (int i = 0; i < m; i++) matrix[i][0] = 0;
}

System.out.println("Set Matrix Zeroes:");
for (int[] row : matrix) {
    System.out.println(Arrays.toString(row));
}

// ============================================
// APPROACH 2: Use Extra Arrays - O(m*n) Time, O(m+n) Space
// ============================================
System.out.println("\nO(m+n) Space approach:");
System.out.println("Use boolean[] rows and boolean[] cols to mark");
