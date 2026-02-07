// ================================================
// Problem 51: Subtree of Another Tree
// ================================================
// Given roots of two binary trees root and subRoot, return true if 
// there is a subtree of root with the same structure and values as subRoot.

// ============================================
// APPROACH 1: DFS - O(m * n) Time, O(h) Space ⭐
// ============================================
System.out.println("Subtree Check:");
System.out.println("For each node in main tree, check if subtree rooted there matches subRoot");

/*
boolean isSubtree(TreeNode root, TreeNode subRoot) {
    if (root == null) return false;
    
    if (isSameTree(root, subRoot)) return true;
    
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

boolean isSameTree(TreeNode p, TreeNode q) {
    if (p == null && q == null) return true;
    if (p == null || q == null) return false;
    if (p.val != q.val) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
*/

// Example
int[] mainTree = {3, 4, 5, 1, 2};
int[] subTree = {4, 1, 2};
boolean isSubtree = true;
System.out.println("Main Tree: " + Arrays.toString(mainTree));
System.out.println("SubTree: " + Arrays.toString(subTree));
System.out.println("Is Subtree: " + isSubtree);

// ============================================
// APPROACH 2: String Serialization - O(m + n) Time, O(m + n) Space
// ============================================
System.out.println("\nString Serialization Approach:");
System.out.println("1. Serialize both trees to strings (preorder with markers)");
System.out.println("2. Check if subRoot's string is substring of root's string");

/*
String serialize(TreeNode node) {
    if (node == null) return "#";
    return "^" + node.val + serialize(node.left) + serialize(node.right);
}

boolean isSubtreeString(TreeNode root, TreeNode subRoot) {
    String s1 = serialize(root);
    String s2 = serialize(subRoot);
    return s1.contains(s2);
}
*/

// ============================================
// APPROACH 3: Tree Hashing - O(m + n) Time, O(m + n) Space ⭐ OPTIMAL
// ============================================
System.out.println("\nMerkle Tree Hashing:");
System.out.println("Compute hash for each subtree");
System.out.println("Compare hashes for O(1) equality check");
