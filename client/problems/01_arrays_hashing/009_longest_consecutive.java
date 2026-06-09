// ================================================
// Problem 9: Longest Consecutive Sequence
// ================================================
// Given an unsorted array of integers nums, return the length of the 
// longest consecutive elements sequence.
// Must run in O(n) time.

// ============================================
// APPROACH 1: Sorting - O(n log n) Time, O(1) Space
// ============================================
int[] nums = {100, 4, 200, 1, 3, 2};
int[] sorted = nums.clone();
Arrays.sort(sorted);

int longest1 = 1;
int current1 = 1;

for (int i = 1; i < sorted.length; i++) {
    if (sorted[i] == sorted[i - 1]) {
        continue; // Skip duplicates
    } else if (sorted[i] == sorted[i - 1] + 1) {
        current1++;
    } else {
        longest1 = Math.max(longest1, current1);
        current1 = 1;
    }
}
longest1 = Math.max(longest1, current1);

System.out.println("Longest Consecutive (Sorting): " + longest1);

// ============================================
// APPROACH 2: HashSet - O(n) Time, O(n) Space ⭐ OPTIMAL
// ============================================
int[] nums2 = {100, 4, 200, 1, 3, 2};
Set<Integer> numSet = new HashSet<>();
for (int num : nums2) {
    numSet.add(num);
}

int longest2 = 0;

for (int num : numSet) {
    // Only start counting if this is the start of a sequence
    // (i.e., num - 1 is not in the set)
    if (!numSet.contains(num - 1)) {
        int currentNum = num;
        int currentStreak = 1;
        
        while (numSet.contains(currentNum + 1)) {
            currentNum++;
            currentStreak++;
        }
        
        longest2 = Math.max(longest2, currentStreak);
    }
}

System.out.println("Longest Consecutive (HashSet): " + longest2);

// ============================================
// APPROACH 3: Union-Find - O(n * α(n)) ≈ O(n) Time, O(n) Space
// ============================================
int[] nums3 = {100, 4, 200, 1, 3, 2};

// Union-Find with size tracking
Map<Integer, Integer> parent = new HashMap<>();
Map<Integer, Integer> size = new HashMap<>();

// Initialize each number as its own parent
for (int num : nums3) {
    parent.put(num, num);
    size.put(num, 1);
}

// Find with path compression
// Note: In visualizer, using loop instead of recursion
for (int num : nums3) {
    // Try to union with num + 1 if it exists
    if (parent.containsKey(num + 1)) {
        // Find roots
        int root1 = num;
        while (parent.get(root1) != root1) {
            root1 = parent.get(root1);
        }
        
        int root2 = num + 1;
        while (parent.get(root2) != root2) {
            root2 = parent.get(root2);
        }
        
        // Union by size
        if (root1 != root2) {
            if (size.get(root1) < size.get(root2)) {
                parent.put(root1, root2);
                size.put(root2, size.get(root1) + size.get(root2));
            } else {
                parent.put(root2, root1);
                size.put(root1, size.get(root1) + size.get(root2));
            }
        }
    }
}

int longest3 = 0;
for (int s : size.values()) {
    longest3 = Math.max(longest3, s);
}

System.out.println("Longest Consecutive (Union-Find): " + longest3);
