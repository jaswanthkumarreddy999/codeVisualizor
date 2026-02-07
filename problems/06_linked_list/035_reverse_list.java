// ================================================
// Problem 35: Reverse Linked List
// ================================================
// Given the head of a singly linked list, reverse the list and return the head.

// ============================================
// APPROACH 1: Iterative - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
// Simulating LinkedList with array for visualization
int[] list = {1, 2, 3, 4, 5};

// Simulate reversal with pointers
int prevIdx = -1;  // null
int currIdx = 0;   // head

int[] reversed = new int[list.length];
int writeIdx = list.length - 1;

for (int i = 0; i < list.length; i++) {
    reversed[writeIdx--] = list[i];
}

System.out.println("Reversed List (Iterative): " + Arrays.toString(reversed));

// ============================================
// Actual LinkedList Implementation (for reference)
// ============================================
/*
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

// Iterative approach
ListNode prev = null;
ListNode curr = head;

while (curr != null) {
    ListNode nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
}
return prev;  // New head
*/

// ============================================
// APPROACH 2: Recursive - O(n) Time, O(n) Space
// ============================================
// Simulating recursion
int[] list2 = {1, 2, 3, 4, 5};
Stack<Integer> stack = new Stack<>();

for (int val : list2) {
    stack.push(val);
}

int[] reversed2 = new int[list2.length];
for (int i = 0; i < list2.length; i++) {
    reversed2[i] = stack.pop();
}

System.out.println("Reversed List (Recursive): " + Arrays.toString(reversed2));

/*
// Actual recursive implementation
ListNode reverseList(ListNode head) {
    if (head == null || head.next == null) {
        return head;
    }
    
    ListNode newHead = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    
    return newHead;
}
*/
