// ================================================
// Problem 86: Surrounded Regions
// ================================================
// Capture all 'O's not on the border or connected to border.

// ============================================
// APPROACH 1: DFS from Border - O(m*n) Time, O(m*n) Space ⭐ OPTIMAL
// ============================================
char[][] board = {
    {'X', 'X', 'X', 'X'},
    {'X', 'O', 'O', 'X'},
    {'X', 'X', 'O', 'X'},
    {'X', 'O', 'X', 'X'}
};

int m = board.length;
int n = board[0].length;

// Mark border-connected 'O's as 'T' (temporary)
for (int i = 0; i < m; i++) {
    markBorder(board, i, 0, m, n);
    markBorder(board, i, n - 1, m, n);
}
for (int j = 0; j < n; j++) {
    markBorder(board, 0, j, m, n);
    markBorder(board, m - 1, j, m, n);
}

// Convert: 'O' -> 'X' (captured), 'T' -> 'O' (restore)
for (int i = 0; i < m; i++) {
    for (int j = 0; j < n; j++) {
        if (board[i][j] == 'O') board[i][j] = 'X';
        if (board[i][j] == 'T') board[i][j] = 'O';
    }
}

System.out.println("Captured Board:");
for (char[] row : board) {
    System.out.println(Arrays.toString(row));
}

static void markBorder(char[][] board, int r, int c, int m, int n) {
    if (r < 0 || r >= m || c < 0 || c >= n) return;
    if (board[r][c] != 'O') return;
    
    board[r][c] = 'T';
    
    markBorder(board, r + 1, c, m, n);
    markBorder(board, r - 1, c, m, n);
    markBorder(board, r, c + 1, m, n);
    markBorder(board, r, c - 1, m, n);
}

// ============================================
// APPROACH 2: Union-Find - O(m*n * α) Time, O(m*n) Space
// ============================================
System.out.println("\nUnion-Find Approach:");
System.out.println("1. Connect all border 'O's to a virtual node");
System.out.println("2. Connect adjacent 'O's");
System.out.println("3. Capture 'O's not connected to virtual node");
