// ================================================
// Problem 63: Word Search II
// ================================================
// Given an m x n board and a list of words, find all words on the board.

// ============================================
// APPROACH 1: Trie + Backtracking - O(m*n*4^L*W) ⭐ OPTIMAL
// ============================================
// Build trie from words, then DFS from each cell

char[][] board = {
    {'o', 'a', 'a', 'n'},
    {'e', 't', 'a', 'e'},
    {'i', 'h', 'k', 'r'},
    {'i', 'f', 'l', 'v'}
};
String[] words = {"oath", "pea", "eat", "rain"};

System.out.println("Word Search II:");
System.out.println("Words to find: " + Arrays.toString(words));

// Result: ["oath", "eat"]
List<String> found = new ArrayList<>();
found.add("oath");
found.add("eat");
System.out.println("Found: " + found);

/*
class Solution {
    int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    
    public List<String> findWords(char[][] board, String[] words) {
        // Build Trie
        TrieNode root = new TrieNode();
        for (String word : words) {
            TrieNode node = root;
            for (char c : word.toCharArray()) {
                if (node.children[c - 'a'] == null) {
                    node.children[c - 'a'] = new TrieNode();
                }
                node = node.children[c - 'a'];
            }
            node.word = word;  // Store word at end node
        }
        
        List<String> result = new ArrayList<>();
        int rows = board.length, cols = board[0].length;
        
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                dfs(board, i, j, root, result);
            }
        }
        
        return result;
    }
    
    void dfs(char[][] board, int r, int c, TrieNode node, List<String> result) {
        char ch = board[r][c];
        if (ch == '#' || node.children[ch - 'a'] == null) return;
        
        node = node.children[ch - 'a'];
        if (node.word != null) {
            result.add(node.word);
            node.word = null;  // Remove to avoid duplicates
        }
        
        board[r][c] = '#';  // Mark visited
        
        for (int[] dir : dirs) {
            int nr = r + dir[0], nc = c + dir[1];
            if (nr >= 0 && nr < board.length && nc >= 0 && nc < board[0].length) {
                dfs(board, nr, nc, node, result);
            }
        }
        
        board[r][c] = ch;  // Restore
    }
}
*/

// ============================================
// Optimization: Trie Pruning
// ============================================
System.out.println("\nOptimization: Remove trie branches after finding word");
System.out.println("Reduces unnecessary traversals");
