// ================================================
// Problem 37: Reorder List
// ================================================
// Given a singly linked list: L0 → L1 → ... → Ln-1 → Ln
// Reorder it to: L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → ...

// ============================================
// APPROACH 1: Find Middle + Reverse + Merge - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[] list = {1, 2, 3, 4, 5};
int n = list.length;

// Step 1: Find the middle
int mid = (n - 1) / 2;

// Step 2: Reverse second half
int[] secondHalf = new int[n - mid - 1];
for (int i = n - 1, j = 0; i > mid; i--, j++) {
    secondHalf[j] = list[i];
}

// Step 3: Merge first half and reversed second half
int[] reordered = new int[n];
int first = 0, second = 0, idx = 0;

while (first <= mid || second < secondHalf.length) {
    if (first <= mid) {
        reordered[idx++] = list[first++];
    }
    if (second < secondHalf.length) {
        reordered[idx++] = secondHalf[second++];
    }
}

System.out.println("Reordered List: " + Arrays.toString(reordered));

/*
// Actual LinkedList Implementation
void reorderList(ListNode head) {
    if (head == null || head.next == null) return;
    
    // Step 1: Find middle using slow/fast pointers
    ListNode slow = head, fast = head;
    while (fast.next != null && fast.next.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // Step 2: Reverse second half
    ListNode second = reverse(slow.next);
    slow.next = null;
    
    // Step 3: Merge alternating
    ListNode first = head;
    while (second != null) {
        ListNode tmp1 = first.next;
        ListNode tmp2 = second.next;
        first.next = second;
        second.next = tmp1;
        first = tmp1;
        second = tmp2;
    }
}

ListNode reverse(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}
*/
