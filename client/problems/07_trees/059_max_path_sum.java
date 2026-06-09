// ================================================
// Problem 59: Binary Tree Maximum Path Sum
// ================================================
// A path is any sequence of nodes. Return the maximum path sum.

// ============================================
// APPROACH 1: DFS with Global Max - O(n) Time, O(h) Space ⭐ OPTIMAL
// ============================================
//       -10
//       /  \
//      9   20
//         /  \
//        15   7
// Max path: 15 -> 20 -> 7 = 42

System.out.println("Binary Tree Maximum Path Sum:");
int maxSum = 42;
System.out.println("Result: " + maxSum);

/*
int maxSum = Integer.MIN_VALUE;

int maxPathSum(TreeNode root) {
    dfs(root);
    return maxSum;
}

int dfs(TreeNode node) {
    if (node == null) return 0;
    
    // Get max path sum from left and right subtrees
    // Ignore negative contributions
    int leftMax = Math.max(0, dfs(node.left));
    int rightMax = Math.max(0, dfs(node.right));
    
    // Path through this node (left -> node -> right)
    int pathThroughNode = node.val + leftMax + rightMax;
    maxSum = Math.max(maxSum, pathThroughNode);
    
    // Return max contribution to parent (only one side)
    return node.val + Math.max(leftMax, rightMax);
}
*/

// ============================================
// Key Insight
// ============================================
System.out.println("\nKey Insight:");
System.out.println("- At each node, we can form a path using both children");
System.out.println("- But when returning to parent, can only use one side");
System.out.println("- Track global max separately from return value");
