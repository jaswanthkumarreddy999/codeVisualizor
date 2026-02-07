// ================================================
// Problem 50: Same Tree
// ================================================
// Given the roots of two binary trees, check if they are the same.

// ============================================
// APPROACH 1: DFS Recursive - O(n) Time, O(h) Space ⭐ OPTIMAL
// ============================================
// Two trees are same if:
// 1. Both roots are null, OR
// 2. Values equal AND left subtrees same AND right subtrees same

System.out.println("Same Tree Check (DFS):");

// Example trees
int[] tree1 = {1, 2, 3};
int[] tree2 = {1, 2, 3};
boolean isSame = true;
System.out.println("Tree1: " + Arrays.toString(tree1));
System.out.println("Tree2: " + Arrays.toString(tree2));
System.out.println("Are Same: " + isSame);

/*
boolean isSameTree(TreeNode p, TreeNode q) {
    if (p == null && q == null) return true;
    if (p == null || q == null) return false;
    if (p.val != q.val) return false;
    
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
*/

// ============================================
// APPROACH 2: BFS Iterative - O(n) Time, O(n) Space
// ============================================
System.out.println("\nBFS Iterative Approach:");
System.out.println("Use two queues to traverse both trees level by level");
System.out.println("Compare nodes at each step");

/*
boolean isSameTreeBFS(TreeNode p, TreeNode q) {
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(p);
    queue.offer(q);
    
    while (!queue.isEmpty()) {
        TreeNode node1 = queue.poll();
        TreeNode node2 = queue.poll();
        
        if (node1 == null && node2 == null) continue;
        if (node1 == null || node2 == null) return false;
        if (node1.val != node2.val) return false;
        
        queue.offer(node1.left);
        queue.offer(node2.left);
        queue.offer(node1.right);
        queue.offer(node2.right);
    }
    
    return true;
}
*/
