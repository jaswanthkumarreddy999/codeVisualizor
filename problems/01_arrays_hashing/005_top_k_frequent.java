// ================================================
// Problem 5: Top K Frequent Elements
// ================================================
// Given an integer array nums and an integer k, return the k most 
// frequent elements. You may return the answer in any order.

// ============================================
// APPROACH 1: HashMap + Sorting - O(n log n) Time, O(n) Space
// ============================================
int[] nums = {1, 1, 1, 2, 2, 3};
int k = 2;

// Count frequencies
Map<Integer, Integer> freq = new HashMap<>();
for (int num : nums) {
    freq.put(num, freq.getOrDefault(num, 0) + 1);
}

// Sort by frequency
List<Integer> candidates = new ArrayList<>(freq.keySet());
candidates.sort((a, b) -> freq.get(b) - freq.get(a));

// Get top k
int[] result1 = new int[k];
for (int i = 0; i < k; i++) {
    result1[i] = candidates.get(i);
}

System.out.println("Top K Frequent (Sorting): " + Arrays.toString(result1));

// ============================================
// APPROACH 2: HashMap + Min Heap - O(n log k) Time, O(n + k) Space
// ============================================
int[] nums2 = {1, 1, 1, 2, 2, 3};
int k2 = 2;

Map<Integer, Integer> freq2 = new HashMap<>();
for (int num : nums2) {
    freq2.put(num, freq2.getOrDefault(num, 0) + 1);
}

// Min heap to keep top k elements
PriorityQueue<Integer> minHeap = new PriorityQueue<>((a, b) -> freq2.get(a) - freq2.get(b));

for (int num : freq2.keySet()) {
    minHeap.offer(num);
    if (minHeap.size() > k2) {
        minHeap.poll(); // Remove least frequent
    }
}

int[] result2 = new int[k2];
for (int i = 0; i < k2; i++) {
    result2[i] = minHeap.poll();
}

System.out.println("Top K Frequent (Min Heap): " + Arrays.toString(result2));

// ============================================
// APPROACH 3: Bucket Sort - O(n) Time, O(n) Space ⭐ OPTIMAL
// ============================================
int[] nums3 = {1, 1, 1, 2, 2, 3};
int k3 = 2;

Map<Integer, Integer> freq3 = new HashMap<>();
for (int num : nums3) {
    freq3.put(num, freq3.getOrDefault(num, 0) + 1);
}

// Create buckets where index = frequency
List<List<Integer>> buckets = new ArrayList<>();
for (int i = 0; i <= nums3.length; i++) {
    buckets.add(new ArrayList<>());
}

for (Map.Entry<Integer, Integer> entry : freq3.entrySet()) {
    int frequency = entry.getValue();
    buckets.get(frequency).add(entry.getKey());
}

// Collect top k from highest frequency buckets
int[] result3 = new int[k3];
int index = 0;

for (int i = buckets.size() - 1; i >= 0 && index < k3; i--) {
    for (int num : buckets.get(i)) {
        if (index < k3) {
            result3[index++] = num;
        }
    }
}

System.out.println("Top K Frequent (Bucket Sort): " + Arrays.toString(result3));
