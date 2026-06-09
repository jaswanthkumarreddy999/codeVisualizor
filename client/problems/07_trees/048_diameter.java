// ================================================
// Problem 48: Diameter of Binary Tree
// ================================================
// The diameter is the length of the longest path between any two nodes.
// This path may or may not pass through the root.

// ============================================
// APPROACH 1: DFS - O(n) Time, O(h) Space ⭐ OPTIMAL
// ============================================
//       1
//      / \
//     2   3
//    / \
//   4   5
// Diameter = 3 (path: 4 -> 2 -> 1 -> 3 or 5 -> 2 -> 1 -> 3)

int diameter = 0; // Global variable to track max diameter

// Simulate DFS calculation
System.out.println("Diameter of Binary Tree:");
System.out.println("For each node, diameter through it = leftHeight + rightHeight");
System.out.println("Track maximum diameter across all nodes");

// Example calculation:
// Node 2: leftHeight=1, rightHeight=1, diameter=2
// Node 1: leftHeight=2, rightHeight=1, diameter=3
int result = 3;
System.out.println("Diameter: " + result);

/*
class Solution {
    private int diameter = 0;
    
    public int diameterOfBinaryTree(TreeNode root) {
        height(root);
        return diameter;
    }
    
    private int height(TreeNode node) {
        if (node == null) return 0;
        
        int leftHeight = height(node.left);
        int rightHeight = height(node.right);
        
        // Update diameter if path through this node is longer
        diameter = Math.max(diameter, leftHeight + rightHeight);
        
        // Return height of this subtree
        return 1 + Math.max(leftHeight, rightHeight);
    }
}
*/

// ============================================
// APPROACH 2: DFS with Pair Return - O(n) Time, O(h) Space
// ============================================
// Return both height and diameter from each recursive call
System.out.println("\nAlternative: Return [height, diameter] pair");
System.out.println("Avoids using global/class variable");

/*
int[] heightAndDiameter(TreeNode node) {
    if (node == null) return new int[]{0, 0};
    
    int[] left = heightAndDiameter(node.left);
    int[] right = heightAndDiameter(node.right);
    
    int height = 1 + Math.max(left[0], right[0]);
    int diameter = Math.max(
        Math.max(left[1], right[1]),  // Max from subtrees
        left[0] + right[0]             // Path through current node
    );
    
    return new int[]{height, diameter};
}
*/
