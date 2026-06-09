// ================================================
// Problem 41: Linked List Cycle
// ================================================
// Given head, determine if the linked list has a cycle.

// ============================================
// APPROACH 1: Floyd's Cycle Detection - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
// Simulating with conceptual explanation
// In linked list: slow moves 1 step, fast moves 2 steps
// If there's a cycle, they will meet

System.out.println("Floyd's Cycle Detection Algorithm:");
System.out.println("1. Initialize slow and fast pointers at head");
System.out.println("2. Move slow by 1, fast by 2");
System.out.println("3. If they meet, cycle exists");
System.out.println("4. If fast reaches null, no cycle");

// Simulation with array (no actual cycle possible)
int[] list = {3, 2, 0, -4};
boolean hasCycle1 = false;

// For array simulation, we'll check if any index repeats
Set<Integer> visited = new HashSet<>();
for (int val : list) {
    if (visited.contains(val)) {
        hasCycle1 = true;
        break;
    }
    visited.add(val);
}

System.out.println("\nHas Cycle (Simulation): " + hasCycle1);

/*
// Actual LinkedList Implementation
boolean hasCycle(ListNode head) {
    if (head == null || head.next == null) {
        return false;
    }
    
    ListNode slow = head;
    ListNode fast = head;
    
    while (fast != null && fast.next != null) {
        slow = slow.next;          // 1 step
        fast = fast.next.next;     // 2 steps
        
        if (slow == fast) {
            return true;  // Cycle detected
        }
    }
    
    return false;  // No cycle
}
*/

// ============================================
// APPROACH 2: HashSet - O(n) Time, O(n) Space
// ============================================
System.out.println("\nHashSet Approach:");
System.out.println("1. Maintain set of visited nodes");
System.out.println("2. For each node, check if already in set");
System.out.println("3. If found, cycle exists");

/*
boolean hasCycleHashSet(ListNode head) {
    Set<ListNode> seen = new HashSet<>();
    
    ListNode current = head;
    while (current != null) {
        if (seen.contains(current)) {
            return true;
        }
        seen.add(current);
        current = current.next;
    }
    
    return false;
}
*/
