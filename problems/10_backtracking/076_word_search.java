// ================================================
// Problem 76: Word Search
// ================================================
// Given an m x n board and a word, find if word exists in the grid.
// Can only move horizontally or vertically to adjacent cells.

// ============================================
// APPROACH 1: Backtracking DFS - O(m*n*4^L) Time, O(L) Space ⭐ OPTIMAL
// ============================================
char[][] board = {
    {'A', 'B', 'C', 'E'},
    {'S', 'F', 'C', 'S'},
    {'A', 'D', 'E', 'E'}
};
String word = "ABCCED";

boolean found = false;
int rows = board.length;
int cols = board[0].length;

for (int i = 0; i < rows && !found; i++) {
    for (int j = 0; j < cols && !found; j++) {
        if (dfsWord(board, word, 0, i, j, rows, cols)) {
            found = true;
        }
    }
}

System.out.println("Word '" + word + "' found: " + found);

static boolean dfsWord(char[][] board, String word, int idx, int r, int c, int rows, int cols) {
    if (idx == word.length()) return true;
    
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
    if (board[r][c] != word.charAt(idx)) return false;
    
    // Mark as visited
    char temp = board[r][c];
    board[r][c] = '#';
    
    // Explore all 4 directions
    boolean result = dfsWord(board, word, idx + 1, r + 1, c, rows, cols) ||
                     dfsWord(board, word, idx + 1, r - 1, c, rows, cols) ||
                     dfsWord(board, word, idx + 1, r, c + 1, rows, cols) ||
                     dfsWord(board, word, idx + 1, r, c - 1, rows, cols);
    
    // Restore
    board[r][c] = temp;
    
    return result;
}

// ============================================
// Optimization: Early Termination
// ============================================
System.out.println("\nOptimizations:");
System.out.println("1. Check if all word characters exist in board");
System.out.println("2. Start from rarer characters");
System.out.println("3. Reverse word if last char is rarer than first");
