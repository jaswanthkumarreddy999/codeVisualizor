// ================================================
// Problem 45: Reverse Nodes in K-Group
// ================================================
// Given a linked list, reverse the nodes of a linked list k at a time.

// ============================================
// APPROACH 1: Iterative - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
System.out.println("Reverse Nodes in K-Group:");

// Simulated with array
int[] list = {1, 2, 3, 4, 5};
int k = 2;

// Result should be: [2, 1, 4, 3, 5]

List<Integer> result = new ArrayList<>();
int i = 0;

while (i < list.length) {
    // Check if we have k nodes left
    if (i + k <= list.length) {
        // Reverse k nodes
        for (int j = i + k - 1; j >= i; j--) {
            result.add(list[j]);
        }
        i += k;
    } else {
        // Add remaining nodes as-is
        while (i < list.length) {
            result.add(list[i++]);
        }
    }
}

System.out.println("Result (k=" + k + "): " + result);

/*
ListNode reverseKGroup(ListNode head, int k) {
    ListNode dummy = new ListNode(0);
    dummy.next = head;
    ListNode prevGroupEnd = dummy;
    
    while (true) {
        // Check if k nodes exist
        ListNode kth = getKth(prevGroupEnd, k);
        if (kth == null) break;
        
        ListNode nextGroupStart = kth.next;
        
        // Reverse the group
        ListNode prev = nextGroupStart;
        ListNode curr = prevGroupEnd.next;
        
        while (curr != nextGroupStart) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        
        // Connect with previous part
        ListNode tmp = prevGroupEnd.next;
        prevGroupEnd.next = kth;
        prevGroupEnd = tmp;
    }
    
    return dummy.next;
}

ListNode getKth(ListNode node, int k) {
    while (node != null && k > 0) {
        node = node.next;
        k--;
    }
    return node;
}
*/

// ============================================
// Visualization
// ============================================
System.out.println("\nk=2: [1,2,3,4,5] -> [2,1,4,3,5]");
System.out.println("k=3: [1,2,3,4,5] -> [3,2,1,4,5]");
