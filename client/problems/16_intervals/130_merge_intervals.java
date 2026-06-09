// ================================================
// Problem 130: Merge Intervals
// ================================================
// Given an array of intervals, merge all overlapping intervals.

// ============================================
// APPROACH 1: Sort and Merge - O(n log n) Time, O(n) Space ⭐ OPTIMAL
// ============================================
int[][] intervals = {{1,3}, {2,6}, {8,10}, {15,18}};

// Sort by start time
Arrays.sort(intervals, (a, b) -> a[0] - b[0]);

List<int[]> merged = new ArrayList<>();
int[] current = intervals[0];

for (int i = 1; i < intervals.length; i++) {
    if (intervals[i][0] <= current[1]) {
        // Overlapping - extend the end
        current[1] = Math.max(current[1], intervals[i][1]);
    } else {
        // Non-overlapping - add current and start new
        merged.add(current);
        current = intervals[i];
    }
}
merged.add(current);

System.out.println("Merged Intervals:");
for (int[] interval : merged) {
    System.out.println("  [" + interval[0] + ", " + interval[1] + "]");
}

// ============================================
// APPROACH 2: Connected Components (Graph) - O(n²) Time, O(n²) Space
// ============================================
// Build graph where overlapping intervals are connected
// Find connected components
// Each component's merged interval is [min start, max end]

System.out.println("\nGraph Approach (Conceptual):");
System.out.println("1. Build adjacency list for overlapping intervals");
System.out.println("2. DFS/BFS to find connected components");
System.out.println("3. For each component, find [min start, max end]");
