// ================================================
// Problem 20: Sliding Window Maximum
// ================================================
// Given an array nums and a sliding window of size k, return 
// the max value in each window as it slides from left to right.

// ============================================
// APPROACH 1: Brute Force - O(n * k) Time, O(1) Space
// ============================================
int[] nums = {1, 3, -1, -3, 5, 3, 6, 7};
int k = 3;

int[] result1 = new int[nums.length - k + 1];

for (int i = 0; i <= nums.length - k; i++) {
    int max = Integer.MIN_VALUE;
    for (int j = i; j < i + k; j++) {
        max = Math.max(max, nums[j]);
    }
    result1[i] = max;
}

System.out.println("Sliding Window Max (Brute Force): " + Arrays.toString(result1));

// ============================================
// APPROACH 2: Max Heap - O(n log n) Time, O(n) Space
// ============================================
int[] nums2 = {1, 3, -1, -3, 5, 3, 6, 7};
int k2 = 3;

// Max heap storing [value, index]
PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> b[0] - a[0]);
int[] result2 = new int[nums2.length - k2 + 1];
int idx = 0;

for (int i = 0; i < nums2.length; i++) {
    maxHeap.offer(new int[]{nums2[i], i});
    
    // Remove elements outside window
    while (maxHeap.peek()[1] <= i - k2) {
        maxHeap.poll();
    }
    
    if (i >= k2 - 1) {
        result2[idx++] = maxHeap.peek()[0];
    }
}

System.out.println("Sliding Window Max (Max Heap): " + Arrays.toString(result2));

// ============================================
// APPROACH 3: Monotonic Deque - O(n) Time, O(k) Space ⭐ OPTIMAL
// ============================================
// Deque stores indices of elements in decreasing order
int[] nums3 = {1, 3, -1, -3, 5, 3, 6, 7};
int k3 = 3;

Deque<Integer> deque = new ArrayDeque<>();
int[] result3 = new int[nums3.length - k3 + 1];
int idx3 = 0;

for (int i = 0; i < nums3.length; i++) {
    // Remove elements outside window
    while (!deque.isEmpty() && deque.peekFirst() <= i - k3) {
        deque.pollFirst();
    }
    
    // Remove smaller elements (they can never be max)
    while (!deque.isEmpty() && nums3[deque.peekLast()] < nums3[i]) {
        deque.pollLast();
    }
    
    deque.offerLast(i);
    
    if (i >= k3 - 1) {
        result3[idx3++] = nums3[deque.peekFirst()];
    }
}

System.out.println("Sliding Window Max (Deque): " + Arrays.toString(result3));
