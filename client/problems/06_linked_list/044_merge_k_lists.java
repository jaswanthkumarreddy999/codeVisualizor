// ================================================
// Problem 44: Merge K Sorted Lists
// ================================================
// Merge k sorted linked lists and return it as one sorted list.

// ============================================
// APPROACH 1: Min Heap - O(n log k) Time, O(k) Space ⭐ OPTIMAL
// ============================================
// n = total elements, k = number of lists
System.out.println("Merge K Sorted Lists:");

// Simulated with arrays
int[][] lists = {{1, 4, 5}, {1, 3, 4}, {2, 6}};

PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> a[0] - b[0]);
// [value, listIndex, elementIndex]

// Add first element from each list
for (int i = 0; i < lists.length; i++) {
    if (lists[i].length > 0) {
        minHeap.offer(new int[]{lists[i][0], i, 0});
    }
}

List<Integer> result = new ArrayList<>();
while (!minHeap.isEmpty()) {
    int[] curr = minHeap.poll();
    result.add(curr[0]);
    
    int listIdx = curr[1];
    int elemIdx = curr[2] + 1;
    
    if (elemIdx < lists[listIdx].length) {
        minHeap.offer(new int[]{lists[listIdx][elemIdx], listIdx, elemIdx});
    }
}

System.out.println("Merged: " + result);

/*
ListNode mergeKLists(ListNode[] lists) {
    PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> a.val - b.val);
    
    for (ListNode list : lists) {
        if (list != null) pq.offer(list);
    }
    
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    
    while (!pq.isEmpty()) {
        ListNode node = pq.poll();
        curr.next = node;
        curr = curr.next;
        
        if (node.next != null) {
            pq.offer(node.next);
        }
    }
    
    return dummy.next;
}
*/

// ============================================
// APPROACH 2: Divide and Conquer - O(n log k) Time, O(log k) Space
// ============================================
System.out.println("\nDivide and Conquer:");
System.out.println("Recursively merge pairs of lists");
System.out.println("Similar to merge sort");

// ============================================
// APPROACH 3: Merge One by One - O(n*k) Time, O(1) Space
// ============================================
System.out.println("\nMerge one by one (slower but simple)");
