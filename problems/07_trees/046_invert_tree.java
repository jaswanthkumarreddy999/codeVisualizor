// ================================================
// Problem 46: Invert Binary Tree
// ================================================
// Given the root of a binary tree, invert the tree, and return its root.

// ============================================
// APPROACH 1: DFS Recursive - O(n) Time, O(h) Space ⭐ OPTIMAL
// ============================================
// Using array representation of tree for visualization
// Index i: left child at 2i+1, right child at 2i+2
int[] tree = {4, 2, 7, 1, 3, 6, 9};  // Level order
int[] inverted = new int[tree.length];

// Copy and swap at each level
for (int i = 0; i < tree.length; i++) {
    inverted[i] = tree[i];
}

// Swap children at each parent
for (int i = 0; i < tree.length / 2; i++) {
    int leftIdx = 2 * i + 1;
    int rightIdx = 2 * i + 2;
    
    if (rightIdx < tree.length) {
        int temp = inverted[leftIdx];
        inverted[leftIdx] = inverted[rightIdx];
        inverted[rightIdx] = temp;
    }
}

System.out.println("Original Tree: " + Arrays.toString(tree));
System.out.println("Inverted Tree: " + Arrays.toString(inverted));

/*
// Actual TreeNode Implementation
TreeNode invertTree(TreeNode root) {
    if (root == null) return null;
    
    TreeNode temp = root.left;
    root.left = root.right;
    root.right = temp;
    
    invertTree(root.left);
    invertTree(root.right);
    
    return root;
}
*/

// ============================================
// APPROACH 2: BFS Iterative - O(n) Time, O(n) Space
// ============================================
System.out.println("\nBFS Approach (Level Order):");
System.out.println("1. Use queue starting with root");
System.out.println("2. For each node, swap its children");
System.out.println("3. Add children to queue");

/*
TreeNode invertTreeBFS(TreeNode root) {
    if (root == null) return null;
    
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    
    while (!queue.isEmpty()) {
        TreeNode node = queue.poll();
        
        // Swap children
        TreeNode temp = node.left;
        node.left = node.right;
        node.right = temp;
        
        if (node.left != null) queue.offer(node.left);
        if (node.right != null) queue.offer(node.right);
    }
    
    return root;
}
*/
