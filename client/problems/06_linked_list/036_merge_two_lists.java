// ================================================
// Problem 36: Merge Two Sorted Lists
// ================================================
// Merge two sorted linked lists and return it as a sorted list.

// ============================================
// APPROACH 1: Iterative - O(n+m) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[] list1 = {1, 2, 4};
int[] list2 = {1, 3, 4};

int[] merged = new int[list1.length + list2.length];
int i = 0, j = 0, k = 0;

while (i < list1.length && j < list2.length) {
    if (list1[i] <= list2[j]) {
        merged[k++] = list1[i++];
    } else {
        merged[k++] = list2[j++];
    }
}

while (i < list1.length) merged[k++] = list1[i++];
while (j < list2.length) merged[k++] = list2[j++];

System.out.println("Merged Lists (Iterative): " + Arrays.toString(merged));

/*
// Actual LinkedList Implementation
ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode current = dummy;
    
    while (l1 != null && l2 != null) {
        if (l1.val <= l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }
    
    current.next = (l1 != null) ? l1 : l2;
    return dummy.next;
}
*/

// ============================================
// APPROACH 2: Recursive - O(n+m) Time, O(n+m) Space
// ============================================
// Simulating recursive merge
int[] l1 = {1, 2, 4};
int[] l2 = {1, 3, 4};

List<Integer> result = new ArrayList<>();
mergeRecursive(l1, 0, l2, 0, result);
System.out.println("Merged Lists (Recursive): " + result);

/*
ListNode mergeTwoListsRecursive(ListNode l1, ListNode l2) {
    if (l1 == null) return l2;
    if (l2 == null) return l1;
    
    if (l1.val <= l2.val) {
        l1.next = mergeTwoListsRecursive(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoListsRecursive(l1, l2.next);
        return l2;
    }
}
*/

static void mergeRecursive(int[] l1, int i1, int[] l2, int i2, List<Integer> result) {
    if (i1 >= l1.length) {
        while (i2 < l2.length) result.add(l2[i2++]);
        return;
    }
    if (i2 >= l2.length) {
        while (i1 < l1.length) result.add(l1[i1++]);
        return;
    }
    
    if (l1[i1] <= l2[i2]) {
        result.add(l1[i1]);
        mergeRecursive(l1, i1 + 1, l2, i2, result);
    } else {
        result.add(l2[i2]);
        mergeRecursive(l1, i1, l2, i2 + 1, result);
    }
}
