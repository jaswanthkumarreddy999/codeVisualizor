// ================================================
// Problem 40: Add Two Numbers
// ================================================
// Given two non-empty linked lists representing non-negative integers in reverse order.
// Add the two numbers and return it as a linked list.

// ============================================
// APPROACH 1: Elementary Addition - O(max(m,n)) Time, O(max(m,n)) Space ⭐ OPTIMAL
// ============================================
// l1 = [2,4,3] represents 342
// l2 = [5,6,4] represents 465
// Output: [7,0,8] represents 807

System.out.println("Add Two Numbers:");

// Simulating with arrays
int[] l1 = {2, 4, 3};  // 342
int[] l2 = {5, 6, 4};  // 465

List<Integer> result = new ArrayList<>();
int carry = 0;
int i = 0, j = 0;

while (i < l1.length || j < l2.length || carry > 0) {
    int sum = carry;
    if (i < l1.length) sum += l1[i++];
    if (j < l2.length) sum += l2[j++];
    
    result.add(sum % 10);
    carry = sum / 10;
}

System.out.println("Result: " + result);  // [7, 0, 8]

/*
ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    int carry = 0;
    
    while (l1 != null || l2 != null || carry > 0) {
        int sum = carry;
        
        if (l1 != null) {
            sum += l1.val;
            l1 = l1.next;
        }
        
        if (l2 != null) {
            sum += l2.val;
            l2 = l2.next;
        }
        
        curr.next = new ListNode(sum % 10);
        curr = curr.next;
        carry = sum / 10;
    }
    
    return dummy.next;
}
*/

// ============================================
// Visualization
// ============================================
System.out.println("\n  2 -> 4 -> 3  (342)");
System.out.println("+ 5 -> 6 -> 4  (465)");
System.out.println("= 7 -> 0 -> 8  (807)");
