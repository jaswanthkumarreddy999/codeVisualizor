// ================================================
// Problem 62: Design Add and Search Words Data Structure
// ================================================
// Design data structure supporting addWord and search.
// search can contain '.' which can match any letter.

// ============================================
// APPROACH 1: Trie with DFS Search - O(m) insert, O(26^k * m) worst search ⭐
// ============================================
System.out.println("Word Dictionary with Wildcards:");

/*
class WordDictionary {
    private TrieNode root;
    
    public WordDictionary() {
        root = new TrieNode();
    }
    
    // O(m) - same as regular trie insert
    public void addWord(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            if (node.children[c - 'a'] == null) {
                node.children[c - 'a'] = new TrieNode();
            }
            node = node.children[c - 'a'];
        }
        node.isEnd = true;
    }
    
    // O(m) for exact match, O(26^dots * m) with wildcards
    public boolean search(String word) {
        return searchDFS(word, 0, root);
    }
    
    private boolean searchDFS(String word, int idx, TrieNode node) {
        if (node == null) return false;
        if (idx == word.length()) return node.isEnd;
        
        char c = word.charAt(idx);
        
        if (c == '.') {
            // Try all 26 possible children
            for (TrieNode child : node.children) {
                if (searchDFS(word, idx + 1, child)) {
                    return true;
                }
            }
            return false;
        } else {
            return searchDFS(word, idx + 1, node.children[c - 'a']);
        }
    }
    
    private class TrieNode {
        TrieNode[] children = new TrieNode[26];
        boolean isEnd = false;
    }
}
*/

// ============================================
// Visualization
// ============================================
System.out.println("\nExample:");
System.out.println("addWord('bad')");
System.out.println("addWord('dad')");
System.out.println("addWord('mad')");
System.out.println("");
System.out.println("search('pad') -> false");
System.out.println("search('bad') -> true");
System.out.println("search('.ad') -> true (matches bad, dad, mad)");
System.out.println("search('b..') -> true (matches bad)");
