// ================================================
// Problem 49: Balanced Binary Tree
// ================================================
// Given a binary tree, determine if it is height-balanced.
// A tree is balanced if depths of two subtrees never differ by more than 1.

// ============================================
// APPROACH 1: DFS Single Pass - O(n) Time, O(h) Space ⭐ OPTIMAL
// ============================================
System.out.println("Balanced Binary Tree Check:");
System.out.println("For each node, check if |leftHeight - rightHeight| <= 1");
System.out.println("If any subtree is unbalanced, propagate -1 up");

/*
int checkHeight(TreeNode node) {
    if (node == null) return 0;
    
    int leftHeight = checkHeight(node.left);
    if (leftHeight == -1) return -1;  // Left subtree unbalanced
    
    int rightHeight = checkHeight(node.right);
    if (rightHeight == -1) return -1;  // Right subtree unbalanced
    
    if (Math.abs(leftHeight - rightHeight) > 1) {
        return -1;  // Current node unbalanced
    }
    
    return 1 + Math.max(leftHeight, rightHeight);
}

boolean isBalanced(TreeNode root) {
    return checkHeight(root) != -1;
}
*/

// Example: Balanced tree
//       3
//      / \
//     9  20
//       /  \
//      15   7
boolean isBalanced = true;
System.out.println("Is Balanced: " + isBalanced);

// ============================================
// APPROACH 2: Top-Down (Less Efficient) - O(n²) Time, O(h) Space
// ============================================
System.out.println("\nTop-Down Approach (O(n²)):");
System.out.println("Calculate height at each node and check balance");
System.out.println("Recalculates heights multiple times - less efficient");

/*
int height(TreeNode node) {
    if (node == null) return 0;
    return 1 + Math.max(height(node.left), height(node.right));
}

boolean isBalancedTopDown(TreeNode root) {
    if (root == null) return true;
    
    int leftHeight = height(root.left);
    int rightHeight = height(root.right);
    
    return Math.abs(leftHeight - rightHeight) <= 1 &&
           isBalancedTopDown(root.left) &&
           isBalancedTopDown(root.right);
}
*/
