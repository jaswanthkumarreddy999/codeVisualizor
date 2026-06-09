// ================================================
// Problem 60: Serialize and Deserialize Binary Tree
// ================================================
// Design an algorithm to serialize and deserialize a binary tree.

// ============================================
// APPROACH 1: BFS (Level Order) - O(n) Time, O(n) Space ⭐
// ============================================
System.out.println("Serialize and Deserialize Binary Tree:");

//     1
//    / \
//   2   3
//      / \
//     4   5
// Serialized: "1,2,3,null,null,4,5"

/*
// Serialize
String serialize(TreeNode root) {
    if (root == null) return "";
    
    StringBuilder sb = new StringBuilder();
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    
    while (!queue.isEmpty()) {
        TreeNode node = queue.poll();
        
        if (node == null) {
            sb.append("null,");
        } else {
            sb.append(node.val).append(",");
            queue.offer(node.left);
            queue.offer(node.right);
        }
    }
    
    return sb.toString();
}

// Deserialize
TreeNode deserialize(String data) {
    if (data.isEmpty()) return null;
    
    String[] nodes = data.split(",");
    TreeNode root = new TreeNode(Integer.parseInt(nodes[0]));
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    
    int i = 1;
    while (!queue.isEmpty() && i < nodes.length) {
        TreeNode parent = queue.poll();
        
        if (!nodes[i].equals("null")) {
            parent.left = new TreeNode(Integer.parseInt(nodes[i]));
            queue.offer(parent.left);
        }
        i++;
        
        if (i < nodes.length && !nodes[i].equals("null")) {
            parent.right = new TreeNode(Integer.parseInt(nodes[i]));
            queue.offer(parent.right);
        }
        i++;
    }
    
    return root;
}
*/

// ============================================
// APPROACH 2: DFS (Preorder) - O(n) Time, O(n) Space ⭐ OPTIMAL
// ============================================
System.out.println("\nDFS Preorder Approach:");
System.out.println("Serialize: Root, Left, Right with null markers");
System.out.println("Deserialize: Use queue/index to rebuild");

/*
// Serialize
String serializeDFS(TreeNode root) {
    StringBuilder sb = new StringBuilder();
    serializeHelper(root, sb);
    return sb.toString();
}

void serializeHelper(TreeNode node, StringBuilder sb) {
    if (node == null) {
        sb.append("null,");
        return;
    }
    sb.append(node.val).append(",");
    serializeHelper(node.left, sb);
    serializeHelper(node.right, sb);
}

// Deserialize
TreeNode deserializeDFS(String data) {
    Queue<String> queue = new LinkedList<>(Arrays.asList(data.split(",")));
    return deserializeHelper(queue);
}

TreeNode deserializeHelper(Queue<String> queue) {
    String val = queue.poll();
    if (val.equals("null")) return null;
    
    TreeNode node = new TreeNode(Integer.parseInt(val));
    node.left = deserializeHelper(queue);
    node.right = deserializeHelper(queue);
    return node;
}
*/
