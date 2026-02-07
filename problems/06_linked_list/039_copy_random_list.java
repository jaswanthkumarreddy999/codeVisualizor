// ================================================
// Problem 39: Copy List with Random Pointer
// ================================================
// Deep copy a linked list where each node has a next pointer and a random pointer.

// ============================================
// APPROACH 1: HashMap - O(n) Time, O(n) Space
// ============================================
System.out.println("Copy List with Random Pointer:");

/*
class Node {
    int val;
    Node next;
    Node random;
}

Node copyRandomList(Node head) {
    if (head == null) return null;
    
    Map<Node, Node> map = new HashMap<>();
    
    // First pass: create all nodes
    Node curr = head;
    while (curr != null) {
        map.put(curr, new Node(curr.val));
        curr = curr.next;
    }
    
    // Second pass: connect next and random pointers
    curr = head;
    while (curr != null) {
        map.get(curr).next = map.get(curr.next);
        map.get(curr).random = map.get(curr.random);
        curr = curr.next;
    }
    
    return map.get(head);
}
*/

// ============================================
// APPROACH 2: Interweaving Nodes - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
System.out.println("\nInterweaving Approach (O(1) Space):");
System.out.println("1. Insert copies between originals: A -> A' -> B -> B'");
System.out.println("2. Set random pointers: copy.random = original.random.next");
System.out.println("3. Separate the two lists");

/*
Node copyRandomListOptimal(Node head) {
    if (head == null) return null;
    
    // Step 1: Insert copies
    Node curr = head;
    while (curr != null) {
        Node copy = new Node(curr.val);
        copy.next = curr.next;
        curr.next = copy;
        curr = copy.next;
    }
    
    // Step 2: Set random pointers
    curr = head;
    while (curr != null) {
        if (curr.random != null) {
            curr.next.random = curr.random.next;
        }
        curr = curr.next.next;
    }
    
    // Step 3: Separate lists
    Node dummy = new Node(0);
    Node copyCurr = dummy;
    curr = head;
    while (curr != null) {
        copyCurr.next = curr.next;
        curr.next = curr.next.next;
        curr = curr.next;
        copyCurr = copyCurr.next;
    }
    
    return dummy.next;
}
*/
