// ================================================
// Problem 64: Kth Largest Element in an Array
// ================================================
// Given integer array nums and k, return the kth largest element.

// ============================================
// APPROACH 1: Sorting - O(n log n) Time, O(1) Space
// ============================================
int[] nums = {3, 2, 1, 5, 6, 4};
int k = 2;

int[] sorted = nums.clone();
Arrays.sort(sorted);
int kthLargest1 = sorted[sorted.length - k];
System.out.println("Kth Largest (Sorting): " + kthLargest1);

// ============================================
// APPROACH 2: Min Heap of Size K - O(n log k) Time, O(k) Space ⭐ OPTIMAL for streaming
// ============================================
int[] nums2 = {3, 2, 1, 5, 6, 4};
int k2 = 2;

PriorityQueue<Integer> minHeap = new PriorityQueue<>();

for (int num : nums2) {
    minHeap.offer(num);
    if (minHeap.size() > k2) {
        minHeap.poll();  // Remove smallest
    }
}

int kthLargest2 = minHeap.peek();
System.out.println("Kth Largest (Min Heap): " + kthLargest2);

// ============================================
// APPROACH 3: QuickSelect - O(n) Average, O(n²) Worst Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[] nums3 = {3, 2, 1, 5, 6, 4};
int k3 = 2;

// Convert to kth smallest problem: (n - k)th index after sorting
int targetIdx = nums3.length - k3;

int left = 0, right = nums3.length - 1;
int kthLargest3 = -1;

while (left <= right) {
    int pivotIdx = partition(nums3, left, right);
    
    if (pivotIdx == targetIdx) {
        kthLargest3 = nums3[pivotIdx];
        break;
    } else if (pivotIdx < targetIdx) {
        left = pivotIdx + 1;
    } else {
        right = pivotIdx - 1;
    }
}

System.out.println("Kth Largest (QuickSelect): " + kthLargest3);

static int partition(int[] nums, int left, int right) {
    int pivot = nums[right];
    int i = left;
    
    for (int j = left; j < right; j++) {
        if (nums[j] <= pivot) {
            int temp = nums[i];
            nums[i] = nums[j];
            nums[j] = temp;
            i++;
        }
    }
    
    int temp = nums[i];
    nums[i] = nums[right];
    nums[right] = temp;
    
    return i;
}
