// ================================================
// Problem 58: Construct Binary Tree from Preorder and Inorder
// ================================================
// Given preorder and inorder traversal, construct the binary tree.

// ============================================
// APPROACH 1: Recursion with HashMap - O(n) Time, O(n) Space ⭐ OPTIMAL
// ============================================
// Preorder: [3,9,20,15,7]  (Root, Left, Right)
// Inorder:  [9,3,15,20,7]  (Left, Root, Right)

System.out.println("Construct Tree from Preorder + Inorder:");

int[] preorder = {3, 9, 20, 15, 7};
int[] inorder = {9, 3, 15, 20, 7};

// Build map for quick lookup of root position in inorder
Map<Integer, Integer> inorderMap = new HashMap<>();
for (int i = 0; i < inorder.length; i++) {
    inorderMap.put(inorder[i], i);
}

System.out.println("Tree structure:");
System.out.println("    3");
System.out.println("   / \\");
System.out.println("  9  20");
System.out.println("    /  \\");
System.out.println("   15   7");

/*
int preorderIdx = 0;

TreeNode buildTree(int[] preorder, int[] inorder) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < inorder.length; i++) {
        map.put(inorder[i], i);
    }
    return build(preorder, 0, inorder.length - 1, map);
}

TreeNode build(int[] preorder, int left, int right, Map<Integer, Integer> map) {
    if (left > right) return null;
    
    int rootVal = preorder[preorderIdx++];
    TreeNode root = new TreeNode(rootVal);
    
    int inorderIdx = map.get(rootVal);
    
    root.left = build(preorder, left, inorderIdx - 1, map);
    root.right = build(preorder, inorderIdx + 1, right, map);
    
    return root;
}
*/

// ============================================
// Key Insight
// ============================================
System.out.println("\nKey Insight:");
System.out.println("- Preorder first element = root");
System.out.println("- Find root in inorder to split left/right subtrees");
System.out.println("- Left subtree size determines split in preorder");
