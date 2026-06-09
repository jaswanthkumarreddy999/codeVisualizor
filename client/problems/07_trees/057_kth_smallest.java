// ================================================
// Problem 57: Kth Smallest Element in a BST
// ================================================
// Given the root of a BST and an integer k, return the kth smallest value.

// ============================================
// APPROACH 1: Inorder Traversal - O(n) Time, O(h) Space ⭐ OPTIMAL
// ============================================
// BST's inorder traversal gives elements in sorted order
// Return the kth element during traversal

int[] bst = {3, 1, 4, 2};  // BST: 3 as root, 1 left, 4 right, 2 as right of 1
int k = 1;

// Inorder: [1, 2, 3, 4]
// k=1 means smallest = 1
int kthSmallest = 1;
System.out.println("BST Inorder: [1, 2, 3, 4]");
System.out.println("Kth Smallest (k=" + k + "): " + kthSmallest);

/*
int kthSmallest(TreeNode root, int k) {
    int[] count = new int[]{0};  // Count of nodes visited
    int[] result = new int[]{0};
    inorder(root, k, count, result);
    return result[0];
}

void inorder(TreeNode node, int k, int[] count, int[] result) {
    if (node == null) return;
    
    inorder(node.left, k, count, result);
    
    count[0]++;
    if (count[0] == k) {
        result[0] = node.val;
        return;
    }
    
    inorder(node.right, k, count, result);
}
*/

// ============================================
// APPROACH 2: Iterative Inorder with Stack - O(h + k) Time, O(h) Space
// ============================================
System.out.println("\nIterative with Stack:");
System.out.println("Only traverse until we find kth element - more efficient for small k");

/*
int kthSmallestIterative(TreeNode root, int k) {
    Stack<TreeNode> stack = new Stack<>();
    TreeNode current = root;
    
    while (current != null || !stack.isEmpty()) {
        // Go all the way left
        while (current != null) {
            stack.push(current);
            current = current.left;
        }
        
        current = stack.pop();
        k--;
        
        if (k == 0) return current.val;
        
        current = current.right;
    }
    
    return -1;
}
*/

// ============================================
// APPROACH 3: Augmented BST - O(h) Time, O(n) Space for preprocessing
// ============================================
System.out.println("\nAugmented BST (for frequent queries):");
System.out.println("Store count of left subtree nodes");
System.out.println("Binary search to find kth element in O(h)");
