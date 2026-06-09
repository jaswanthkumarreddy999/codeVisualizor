// ================================================
// Problem 47: Maximum Depth of Binary Tree
// ================================================
// Given the root of a binary tree, return its maximum depth.

// ============================================
// APPROACH 1: DFS Recursive - O(n) Time, O(h) Space ⭐ OPTIMAL
// ============================================
// Tree: [3, 9, 20, null, null, 15, 7]
//       3
//      / \
//     9  20
//       /  \
//      15   7

// Simulating with levels
int[] tree = {3, 9, 20, -1, -1, 15, 7}; // -1 represents null
int depth = 3; // Calculated depth

System.out.println("Max Depth (DFS): " + depth);

/*
int maxDepth(TreeNode root) {
    if (root == null) return 0;
    
    int leftDepth = maxDepth(root.left);
    int rightDepth = maxDepth(root.right);
    
    return 1 + Math.max(leftDepth, rightDepth);
}
*/

// ============================================
// APPROACH 2: BFS Level Order - O(n) Time, O(n) Space
// ============================================
System.out.println("\nBFS Level Order:");
System.out.println("1. Use queue for level order traversal");
System.out.println("2. Count number of levels");

/*
int maxDepthBFS(TreeNode root) {
    if (root == null) return 0;
    
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    int depth = 0;
    
    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        depth++;
        
        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
    }
    
    return depth;
}
*/

// ============================================
// APPROACH 3: DFS Iterative with Stack - O(n) Time, O(n) Space
// ============================================
System.out.println("\nDFS Iterative:");
System.out.println("1. Use stack with [node, depth] pairs");
System.out.println("2. Track maximum depth seen");

/*
int maxDepthIterative(TreeNode root) {
    if (root == null) return 0;
    
    Stack<Object[]> stack = new Stack<>();
    stack.push(new Object[]{root, 1});
    int maxDepth = 0;
    
    while (!stack.isEmpty()) {
        Object[] current = stack.pop();
        TreeNode node = (TreeNode) current[0];
        int depth = (int) current[1];
        
        maxDepth = Math.max(maxDepth, depth);
        
        if (node.left != null) stack.push(new Object[]{node.left, depth + 1});
        if (node.right != null) stack.push(new Object[]{node.right, depth + 1});
    }
    
    return maxDepth;
}
*/
