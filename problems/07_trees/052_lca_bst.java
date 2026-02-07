// ================================================
// Problem 52: Lowest Common Ancestor of a BST
// ================================================
// Given a BST, find the lowest common ancestor of two given nodes.

// ============================================
// APPROACH 1: Iterative - O(h) Time, O(1) Space ⭐ OPTIMAL
// ============================================
// In BST: LCA is the first node where p and q split (one goes left, one goes right)
// Or where the node equals p or q

int[] bst = {6, 2, 8, 0, 4, 7, 9};  // Level order
int p = 2, q = 8;

// Simulate: Start from root
int current = 6;

// Both p and q are less than current -> go left
// Both p and q are greater than current -> go right
// Otherwise, current is LCA

System.out.println("BST: " + Arrays.toString(bst));
System.out.println("Finding LCA of " + p + " and " + q);

// Since p=2 < 6 and q=8 > 6, they split at 6
int lca = 6;
System.out.println("LCA: " + lca);

/*
TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    TreeNode current = root;
    
    while (current != null) {
        if (p.val < current.val && q.val < current.val) {
            current = current.left;
        } else if (p.val > current.val && q.val > current.val) {
            current = current.right;
        } else {
            return current;  // Split point or equal
        }
    }
    
    return null;
}
*/

// ============================================
// APPROACH 2: Recursive - O(h) Time, O(h) Space
// ============================================
System.out.println("\nRecursive Approach:");

/*
TreeNode lowestCommonAncestorRecursive(TreeNode root, TreeNode p, TreeNode q) {
    if (p.val < root.val && q.val < root.val) {
        return lowestCommonAncestorRecursive(root.left, p, q);
    } else if (p.val > root.val && q.val > root.val) {
        return lowestCommonAncestorRecursive(root.right, p, q);
    } else {
        return root;
    }
}
*/

// Example 2: p=2, q=4 (both in left subtree)
int p2 = 2, q2 = 4;
int lca2 = 2;  // LCA is 2 itself
System.out.println("LCA of " + p2 + " and " + q2 + ": " + lca2);
