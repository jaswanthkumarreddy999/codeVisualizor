// ================================================
// Problem 7: Valid Sudoku
// ================================================
// Determine if a 9x9 Sudoku board is valid. Only the filled cells 
// need to be validated according to the following rules:
// - Each row must contain the digits 1-9 without repetition.
// - Each column must contain the digits 1-9 without repetition.
// - Each of the nine 3x3 sub-boxes must contain 1-9 without repetition.

// ============================================
// APPROACH 1: HashSet per Row/Col/Box - O(81) = O(1) Time, O(81) = O(1) Space
// ============================================
char[][] board = {
    {'5','3','.','.','7','.','.','.','.'},
    {'6','.','.','1','9','5','.','.','.'},
    {'.','9','8','.','.','.','.','6','.'},
    {'8','.','.','.','6','.','.','.','3'},
    {'4','.','.','8','.','3','.','.','1'},
    {'7','.','.','.','2','.','.','.','6'},
    {'.','6','.','.','.','.','2','8','.'},
    {'.','.','.','4','1','9','.','.','5'},
    {'.','.','.','.','8','.','.','7','9'}
};

// Use HashSets for each row, column, and 3x3 box
Set<Character>[] rows = new HashSet[9];
Set<Character>[] cols = new HashSet[9];
Set<Character>[] boxes = new HashSet[9];

for (int i = 0; i < 9; i++) {
    rows[i] = new HashSet<>();
    cols[i] = new HashSet<>();
    boxes[i] = new HashSet<>();
}

boolean isValid = true;

for (int r = 0; r < 9; r++) {
    for (int c = 0; c < 9; c++) {
        char digit = board[r][c];
        if (digit == '.') continue;
        
        int boxIndex = (r / 3) * 3 + (c / 3);
        
        // Check if digit already exists
        if (rows[r].contains(digit) || cols[c].contains(digit) || boxes[boxIndex].contains(digit)) {
            isValid = false;
            break;
        }
        
        rows[r].add(digit);
        cols[c].add(digit);
        boxes[boxIndex].add(digit);
    }
    if (!isValid) break;
}

System.out.println("Valid Sudoku (HashSet): " + isValid);

// ============================================
// APPROACH 2: Bitmask - O(1) Time, O(1) Space ⭐ SPACE OPTIMAL
// ============================================
char[][] board2 = {
    {'5','3','.','.','7','.','.','.','.'},
    {'6','.','.','1','9','5','.','.','.'},
    {'.','9','8','.','.','.','.','6','.'},
    {'8','.','.','.','6','.','.','.','3'},
    {'4','.','.','8','.','3','.','.','1'},
    {'7','.','.','.','2','.','.','.','6'},
    {'.','6','.','.','.','.','2','8','.'},
    {'.','.','.','4','1','9','.','.','5'},
    {'.','.','.','.','8','.','.','7','9'}
};

// Use bitmasks instead of HashSets
int[] rowMask = new int[9];
int[] colMask = new int[9];
int[] boxMask = new int[9];

boolean isValid2 = true;

for (int r = 0; r < 9; r++) {
    for (int c = 0; c < 9; c++) {
        if (board2[r][c] == '.') continue;
        
        int num = board2[r][c] - '1'; // 0-8
        int bit = 1 << num;
        int boxIndex = (r / 3) * 3 + (c / 3);
        
        // Check if bit is already set
        if ((rowMask[r] & bit) != 0 || (colMask[c] & bit) != 0 || (boxMask[boxIndex] & bit) != 0) {
            isValid2 = false;
            break;
        }
        
        rowMask[r] |= bit;
        colMask[c] |= bit;
        boxMask[boxIndex] |= bit;
    }
    if (!isValid2) break;
}

System.out.println("Valid Sudoku (Bitmask): " + isValid2);
