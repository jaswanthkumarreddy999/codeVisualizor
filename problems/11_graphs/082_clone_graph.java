// ================================================
// Problem 82: Clone Graph
// ================================================
// Given a reference to a node in a connected undirected graph, 
// return a deep copy of the graph.

// ============================================
// APPROACH 1: DFS with HashMap - O(V + E) Time, O(V) Space ⭐ OPTIMAL
// ============================================
System.out.println("Clone Graph - DFS Approach:");
System.out.println("1. Use HashMap to track original -> clone mapping");
System.out.println("2. DFS: If node exists in map, return clone");
System.out.println("3. Otherwise, create clone and recursively clone neighbors");

/*
class Node {
    int val;
    List<Node> neighbors;
}

Map<Node, Node> visited = new HashMap<>();

Node cloneGraph(Node node) {
    if (node == null) return null;
    
    if (visited.containsKey(node)) {
        return visited.get(node);
    }
    
    Node clone = new Node(node.val, new ArrayList<>());
    visited.put(node, clone);
    
    for (Node neighbor : node.neighbors) {
        clone.neighbors.add(cloneGraph(neighbor));
    }
    
    return clone;
}
*/

// ============================================
// APPROACH 2: BFS with HashMap - O(V + E) Time, O(V) Space
// ============================================
System.out.println("\nBFS Approach:");
System.out.println("1. Create queue starting with root node");
System.out.println("2. Clone each node and track in HashMap");
System.out.println("3. For each neighbor, create if not exists, add to clone's neighbors");

/*
Node cloneGraphBFS(Node node) {
    if (node == null) return null;
    
    Map<Node, Node> visited = new HashMap<>();
    Queue<Node> queue = new LinkedList<>();
    
    visited.put(node, new Node(node.val, new ArrayList<>()));
    queue.offer(node);
    
    while (!queue.isEmpty()) {
        Node curr = queue.poll();
        
        for (Node neighbor : curr.neighbors) {
            if (!visited.containsKey(neighbor)) {
                visited.put(neighbor, new Node(neighbor.val, new ArrayList<>()));
                queue.offer(neighbor);
            }
            visited.get(curr).neighbors.add(visited.get(neighbor));
        }
    }
    
    return visited.get(node);
}
*/

// Example graph
System.out.println("\nExample: 1 -- 2");
System.out.println("         |    |");
System.out.println("         4 -- 3");
