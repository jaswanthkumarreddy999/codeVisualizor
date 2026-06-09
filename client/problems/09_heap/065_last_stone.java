// ================================================
// Problem 65: Last Stone Weight
// ================================================
// Smash heaviest stones together. Return weight of last remaining stone.

// ============================================
// APPROACH 1: Max Heap - O(n log n) Time, O(n) Space ⭐ OPTIMAL
// ============================================
int[] stones = {2, 7, 4, 1, 8, 1};

// Max heap (reverse order)
PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);

for (int stone : stones) {
    maxHeap.offer(stone);
}

while (maxHeap.size() > 1) {
    int stone1 = maxHeap.poll();  // Largest
    int stone2 = maxHeap.poll();  // Second largest
    
    if (stone1 != stone2) {
        maxHeap.offer(stone1 - stone2);
    }
}

int lastStone = maxHeap.isEmpty() ? 0 : maxHeap.poll();
System.out.println("Last Stone Weight: " + lastStone);

// ============================================
// APPROACH 2: Sorting (Less Efficient) - O(n² log n) Time, O(1) Space
// ============================================
int[] stones2 = {2, 7, 4, 1, 8, 1};
List<Integer> stoneList = new ArrayList<>();
for (int s : stones2) stoneList.add(s);

while (stoneList.size() > 1) {
    Collections.sort(stoneList);
    int n = stoneList.size();
    int s1 = stoneList.remove(n - 1);
    int s2 = stoneList.remove(n - 2);
    
    if (s1 != s2) {
        stoneList.add(s1 - s2);
    }
}

int lastStone2 = stoneList.isEmpty() ? 0 : stoneList.get(0);
System.out.println("Last Stone (Sorting): " + lastStone2);

// ============================================
// APPROACH 3: Bucket Sort - O(n + W) Time, O(W) Space where W = max weight
// ============================================
System.out.println("\nBucket Sort approach:");
System.out.println("Create buckets for each weight");
System.out.println("Process from heaviest to lightest");
