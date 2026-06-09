// ================================================
// Problem 137: Rotate Image (Matrix)
// ================================================
// Rotate an n x n 2D matrix by 90 degrees clockwise. In-place.

// ============================================
// APPROACH 1: Transpose + Reverse - O(n²) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

int n = matrix.length;

// Step 1: Transpose (swap matrix[i][j] with matrix[j][i])
for (int i = 0; i < n; i++) {
    for (int j = i + 1; j < n; j++) {
        int temp = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = temp;
    }
}

// Step 2: Reverse each row
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n / 2; j++) {
        int temp = matrix[i][j];
        matrix[i][j] = matrix[i][n - 1 - j];
        matrix[i][n - 1 - j] = temp;
    }
}

System.out.println("Rotated Matrix:");
for (int[] row : matrix) {
    System.out.println(Arrays.toString(row));
}

// ============================================
// APPROACH 2: Rotate Four Cells at a Time - O(n²) Time, O(1) Space
// ============================================
System.out.println("\nRotate Four Cells Approach:");
System.out.println("For each layer, rotate 4 cells in a cycle");

/*
void rotateFour(int[][] matrix) {
    int n = matrix.length;
    
    for (int layer = 0; layer < n / 2; layer++) {
        int first = layer;
        int last = n - 1 - layer;
        
        for (int i = first; i < last; i++) {
            int offset = i - first;
            
            // Save top
            int top = matrix[first][i];
            
            // Left -> Top
            matrix[first][i] = matrix[last - offset][first];
            
            // Bottom -> Left
            matrix[last - offset][first] = matrix[last][last - offset];
            
            // Right -> Bottom
            matrix[last][last - offset] = matrix[i][last];
            
            // Top -> Right
            matrix[i][last] = top;
        }
    }
}
*/

// ============================================
// Visualization
// ============================================
System.out.println("\n90° Clockwise:");
System.out.println("[1,2,3]    [7,4,1]");
System.out.println("[4,5,6] -> [8,5,2]");
System.out.println("[7,8,9]    [9,6,3]");
