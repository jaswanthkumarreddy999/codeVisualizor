// ================================================
// Problem 56: Validate Binary Search Tree
// ================================================
// Given the root of a binary tree, determine if it is a valid BST.

// ============================================
// APPROACH 1: DFS with Range - O(n) Time, O(h) Space ⭐ OPTIMAL
// ============================================
// Valid BST: left < node < right for all nodes
//       5
//      / \
//     3   7
//    / \
//   1   4

System.out.println("Validate BST with Range:");
System.out.println("Each node must be within valid range [min, max]");
System.out.println("Left subtree: node.val becomes new max");
System.out.println("Right subtree: node.val becomes new min");

// Example validation
int[] tree = {5, 3, 7, 1, 4};
boolean isValid = true;
System.out.println("Is Valid BST: " + isValid);

/*
boolean isValidBST(TreeNode root) {
    return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
}

boolean validate(TreeNode node, long min, long max) {
    if (node == null) return true;
    
    if (node.val <= min || node.val >= max) {
        return false;
    }
    
    return validate(node.left, min, node.val) &&
           validate(node.right, node.val, max);
}
*/

// ============================================
// APPROACH 2: Inorder Traversal - O(n) Time, O(h) Space
// ============================================
// BST's inorder traversal should be strictly increasing
System.out.println("\nInorder Traversal Approach:");
System.out.println("Inorder of BST should be sorted");

List<Integer> inorder = new ArrayList<>();
inorder.add(1);
inorder.add(3);
inorder.add(4);
inorder.add(5);
inorder.add(7);

boolean isSorted = true;
for (int i = 1; i < inorder.size(); i++) {
    if (inorder.get(i) <= inorder.get(i - 1)) {
        isSorted = false;
        break;
    }
}

System.out.println("Inorder: " + inorder);
System.out.println("Is Sorted (Valid BST): " + isSorted);

/*
TreeNode prev = null;

boolean isValidBSTInorder(TreeNode root) {
    return inorder(root);
}

boolean inorder(TreeNode node) {
    if (node == null) return true;
    
    if (!inorder(node.left)) return false;
    
    if (prev != null && node.val <= prev.val) return false;
    prev = node;
    
    return inorder(node.right);
}
*/
