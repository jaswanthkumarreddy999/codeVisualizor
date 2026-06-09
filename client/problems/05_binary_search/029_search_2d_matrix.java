// ================================================
// Problem 29: Search a 2D Matrix
// ================================================
// Write an efficient algorithm that searches for a value in a m x n matrix.
// Integers in each row are sorted. First integer of each row > last of previous.

// ============================================
// APPROACH 1: Binary Search on Flattened - O(log(m*n)) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[][] matrix = {
    {1, 3, 5, 7},
    {10, 11, 16, 20},
    {23, 30, 34, 60}
};
int target = 3;

int m = matrix.length;
int n = matrix[0].length;
int left = 0;
int right = m * n - 1;
boolean found = false;

while (left <= right) {
    int mid = left + (right - left) / 2;
    int row = mid / n;
    int col = mid % n;
    int midVal = matrix[row][col];
    
    if (midVal == target) {
        found = true;
        break;
    } else if (midVal < target) {
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}

System.out.println("Search 2D Matrix (Flattened): " + found);

// ============================================
// APPROACH 2: Two Binary Searches - O(log m + log n) Time, O(1) Space
// ============================================
int[][] matrix2 = {
    {1, 3, 5, 7},
    {10, 11, 16, 20},
    {23, 30, 34, 60}
};
int target2 = 3;

m = matrix2.length;
n = matrix2[0].length;

// First: binary search for the row
int top = 0, bottom = m - 1;
int targetRow = -1;

while (top <= bottom) {
    int midRow = top + (bottom - top) / 2;
    
    if (matrix2[midRow][0] <= target2 && target2 <= matrix2[midRow][n-1]) {
        targetRow = midRow;
        break;
    } else if (matrix2[midRow][0] > target2) {
        bottom = midRow - 1;
    } else {
        top = midRow + 1;
    }
}

boolean found2 = false;
if (targetRow != -1) {
    // Second: binary search within the row
    left = 0;
    right = n - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (matrix2[targetRow][mid] == target2) {
            found2 = true;
            break;
        } else if (matrix2[targetRow][mid] < target2) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
}

System.out.println("Search 2D Matrix (Two BS): " + found2);
