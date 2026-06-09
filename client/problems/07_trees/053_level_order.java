// ================================================
// Problem 53: Binary Tree Level Order Traversal
// ================================================
// Given the root of a binary tree, return the level order traversal 
// (values of nodes at each level from left to right).

// ============================================
// APPROACH 1: BFS with Queue - O(n) Time, O(n) Space ⭐ OPTIMAL
// ============================================
//       3
//      / \
//     9  20
//       /  \
//      15   7
// Output: [[3], [9, 20], [15, 7]]

System.out.println("Level Order Traversal:");

List<List<Integer>> result = new ArrayList<>();
result.add(Arrays.asList(3));
result.add(Arrays.asList(9, 20));
result.add(Arrays.asList(15, 7));

System.out.println(result);

/*
List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    
    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        List<Integer> currentLevel = new ArrayList<>();
        
        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            currentLevel.add(node.val);
            
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        
        result.add(currentLevel);
    }
    
    return result;
}
*/

// ============================================
// APPROACH 2: DFS with Level Tracking - O(n) Time, O(n) Space
// ============================================
System.out.println("\nDFS Approach:");
System.out.println("Track level during DFS and add to corresponding list");

/*
List<List<Integer>> result = new ArrayList<>();

void dfs(TreeNode node, int level, List<List<Integer>> result) {
    if (node == null) return;
    
    // Create new level list if needed
    if (level == result.size()) {
        result.add(new ArrayList<>());
    }
    
    result.get(level).add(node.val);
    
    dfs(node.left, level + 1, result);
    dfs(node.right, level + 1, result);
}

List<List<Integer>> levelOrderDFS(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    dfs(root, 0, result);
    return result;
}
*/
