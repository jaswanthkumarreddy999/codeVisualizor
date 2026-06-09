// ================================================
// Problem 55: Count Good Nodes in Binary Tree
// ================================================
// A node X is good if path from root to X has no node with value greater than X.

// ============================================
// APPROACH 1: DFS - O(n) Time, O(h) Space ⭐ OPTIMAL
// ============================================
//       3
//      / \
//     1   4
//    /   / \
//   3   1   5
// Good nodes: 3 (root), 4, 3, 5 = 4 nodes

System.out.println("Count Good Nodes:");

int goodNodes = 4;
System.out.println("Result: " + goodNodes);

/*
int goodNodes(TreeNode root) {
    return dfs(root, Integer.MIN_VALUE);
}

int dfs(TreeNode node, int maxSoFar) {
    if (node == null) return 0;
    
    int count = 0;
    if (node.val >= maxSoFar) {
        count = 1;
        maxSoFar = node.val;
    }
    
    count += dfs(node.left, maxSoFar);
    count += dfs(node.right, maxSoFar);
    
    return count;
}
*/

// ============================================
// APPROACH 2: BFS with Max Tracking - O(n) Time, O(n) Space
// ============================================
System.out.println("\nBFS Approach:");
System.out.println("Store [node, maxSoFar] pairs in queue");

/*
int goodNodesBFS(TreeNode root) {
    if (root == null) return 0;
    
    int count = 0;
    Queue<Object[]> queue = new LinkedList<>();
    queue.offer(new Object[]{root, Integer.MIN_VALUE});
    
    while (!queue.isEmpty()) {
        Object[] curr = queue.poll();
        TreeNode node = (TreeNode) curr[0];
        int maxSoFar = (int) curr[1];
        
        if (node.val >= maxSoFar) {
            count++;
            maxSoFar = node.val;
        }
        
        if (node.left != null) queue.offer(new Object[]{node.left, maxSoFar});
        if (node.right != null) queue.offer(new Object[]{node.right, maxSoFar});
    }
    
    return count;
}
*/
