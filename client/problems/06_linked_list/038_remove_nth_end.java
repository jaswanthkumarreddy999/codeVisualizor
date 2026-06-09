// ================================================
// Problem 38: Remove Nth Node From End of List
// ================================================
// Given the head of a linked list, remove the nth node from the end 
// of the list and return its head.

// ============================================
// APPROACH 1: Two Pointers - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[] list = {1, 2, 3, 4, 5};
int n = 2;  // Remove 2nd from end (node with value 4)

// Simulate two pointers with gap of n
int first = 0;  // Will point to node before the one to remove
int second = n; // n steps ahead

// Move second to the end
// When second reaches end, first will be at (length - n - 1)

int length = list.length;
int removeIdx = length - n;

// Create result without the removed element
int[] result = new int[length - 1];
int idx = 0;
for (int i = 0; i < length; i++) {
    if (i != removeIdx) {
        result[idx++] = list[i];
    }
}

System.out.println("After removing " + n + "th from end: " + Arrays.toString(result));

/*
// Actual LinkedList Implementation
ListNode removeNthFromEnd(ListNode head, int n) {
    ListNode dummy = new ListNode(0);
    dummy.next = head;
    
    ListNode first = dummy;
    ListNode second = dummy;
    
    // Move second n+1 steps ahead
    for (int i = 0; i <= n; i++) {
        second = second.next;
    }
    
    // Move both until second reaches end
    while (second != null) {
        first = first.next;
        second = second.next;
    }
    
    // Remove the nth node
    first.next = first.next.next;
    
    return dummy.next;
}
*/

// ============================================
// APPROACH 2: Two Pass - O(n) Time, O(1) Space
// ============================================
int[] list2 = {1, 2, 3, 4, 5};
int n2 = 2;

// First pass: count length
int len = list2.length;

// Second pass: find and remove (length - n)th node
int removeIdx2 = len - n2;

int[] result2 = new int[len - 1];
int j = 0;
for (int i = 0; i < len; i++) {
    if (i != removeIdx2) {
        result2[j++] = list2[i];
    }
}

System.out.println("Two Pass result: " + Arrays.toString(result2));
