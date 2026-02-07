// ================================================
// Problem 79: N-Queens
// ================================================
// Place n queens on an n×n chessboard such that no two queens attack each other.

// ============================================
// APPROACH 1: Backtracking - O(n!) Time, O(n²) Space ⭐ OPTIMAL
// ============================================
int n = 4;
List<List<String>> solutions = new ArrayList<>();

int[] queens = new int[n];  // queens[row] = column of queen in that row
Arrays.fill(queens, -1);

Set<Integer> cols = new HashSet<>();
Set<Integer> diag1 = new HashSet<>();  // row - col
Set<Integer> diag2 = new HashSet<>();  // row + col

solveNQueens(0, n, queens, cols, diag1, diag2, solutions);

System.out.println("N-Queens Solutions for n=" + n + ":");
for (List<String> solution : solutions) {
    for (String row : solution) {
        System.out.println("  " + row);
    }
    System.out.println();
}

static void solveNQueens(int row, int n, int[] queens, Set<Integer> cols, 
                          Set<Integer> diag1, Set<Integer> diag2, 
                          List<List<String>> solutions) {
    if (row == n) {
        // Found valid solution
        List<String> board = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            char[] rowChars = new char[n];
            Arrays.fill(rowChars, '.');
            rowChars[queens[i]] = 'Q';
            board.add(new String(rowChars));
        }
        solutions.add(board);
        return;
    }
    
    for (int col = 0; col < n; col++) {
        if (cols.contains(col)) continue;
        if (diag1.contains(row - col)) continue;
        if (diag2.contains(row + col)) continue;
        
        // Place queen
        queens[row] = col;
        cols.add(col);
        diag1.add(row - col);
        diag2.add(row + col);
        
        solveNQueens(row + 1, n, queens, cols, diag1, diag2, solutions);
        
        // Remove queen
        cols.remove(col);
        diag1.remove(row - col);
        diag2.remove(row + col);
    }
}

// ============================================
// Visualization: 4-Queens Solution
// ============================================
System.out.println("4-Queens Example:");
System.out.println(". Q . .");
System.out.println(". . . Q");
System.out.println("Q . . .");
System.out.println(". . Q .");
