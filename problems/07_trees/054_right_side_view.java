// ================================================
// Problem 54: Binary Tree Right Side View
// ================================================
// Given the root of a binary tree, return values visible from the right side.

// ============================================
// APPROACH 1: BFS Level Order - O(n) Time, O(n) Space ⭐
// ============================================
//       1
//      / \
//     2   3
//      \   \
//       5   4
// Right side view: [1, 3, 4]

System.out.println("Binary Tree Right Side View:");

List<Integer> rightSide = new ArrayList<>();
rightSide.add(1);
rightSide.add(3);
rightSide.add(4);
System.out.println("BFS Result: " + rightSide);

/*
List<Integer> rightSideView(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    if (root == null) return result;
    
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    
    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        
        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            
            // Last node in level is visible from right
            if (i == levelSize - 1) {
                result.add(node.val);
            }
            
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
    }
    
    return result;
}
*/

// ============================================
// APPROACH 2: DFS (Right First) - O(n) Time, O(h) Space ⭐ OPTIMAL Space
// ============================================
System.out.println("\nDFS Approach:");
System.out.println("Visit right child first");
System.out.println("Add node if it's the first at its depth");

/*
List<Integer> rightSideViewDFS(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    dfs(root, 0, result);
    return result;
}

void dfs(TreeNode node, int depth, List<Integer> result) {
    if (node == null) return;
    
    if (depth == result.size()) {
        result.add(node.val);  // First node at this depth
    }
    
    dfs(node.right, depth + 1, result);  // Right first
    dfs(node.left, depth + 1, result);
}
*/
