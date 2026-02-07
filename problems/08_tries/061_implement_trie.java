// ================================================
// Problem 61: Implement Trie (Prefix Tree)
// ================================================
// Implement a trie with insert, search, and startsWith operations.

// ============================================
// APPROACH 1: HashMap-based Trie Node ⭐ FLEXIBLE
// ============================================
// TrieNode with HashMap for children
System.out.println("Trie Implementation:");

/*
class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    boolean isEndOfWord = false;
}

class Trie {
    private TrieNode root;
    
    public Trie() {
        root = new TrieNode();
    }
    
    // O(m) where m = word length
    public void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            node.children.putIfAbsent(c, new TrieNode());
            node = node.children.get(c);
        }
        node.isEndOfWord = true;
    }
    
    // O(m)
    public boolean search(String word) {
        TrieNode node = searchPrefix(word);
        return node != null && node.isEndOfWord;
    }
    
    // O(m)
    public boolean startsWith(String prefix) {
        return searchPrefix(prefix) != null;
    }
    
    private TrieNode searchPrefix(String prefix) {
        TrieNode node = root;
        for (char c : prefix.toCharArray()) {
            if (!node.children.containsKey(c)) return null;
            node = node.children.get(c);
        }
        return node;
    }
}
*/

// ============================================
// APPROACH 2: Array-based Trie Node ⭐ FASTER for lowercase letters
// ============================================
System.out.println("\nArray-based (26 children for a-z):");

/*
class TrieNodeArray {
    TrieNodeArray[] children = new TrieNodeArray[26];
    boolean isEnd = false;
}
*/

// ============================================
// Visualization
// ============================================
System.out.println("\nTrie for words: [apple, app, application]");
System.out.println("       root");
System.out.println("        |");
System.out.println("        a");
System.out.println("        |");
System.out.println("        p");
System.out.println("        |");
System.out.println("        p*  (app ends here)");
System.out.println("        |");
System.out.println("        l");
System.out.println("       / \\");
System.out.println("      e*  i");
System.out.println("          |");
System.out.println("          c -> a -> t -> i -> o -> n*");

// Operations demo
System.out.println("\nOperations:");
System.out.println("insert('apple') - traverse/create a->p->p->l->e, mark e as end");
System.out.println("search('app') - traverse a->p->p, check isEnd = true ✓");
System.out.println("startsWith('appl') - traverse a->p->p->l, exists ✓");
