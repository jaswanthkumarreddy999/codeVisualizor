// ================================================
// Problem 131: Non-overlapping Intervals
// ================================================
// Given array of intervals, return minimum number to remove for non-overlapping.

// ============================================
// APPROACH 1: Greedy (Sort by End) - O(n log n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[][] intervals = {{1, 2}, {2, 3}, {3, 4}, {1, 3}};

// Sort by end time
Arrays.sort(intervals, (a, b) -> a[1] - b[1]);

int count = 0;
int prevEnd = Integer.MIN_VALUE;

for (int[] interval : intervals) {
    if (interval[0] >= prevEnd) {
        // No overlap, keep this interval
        prevEnd = interval[1];
    } else {
        // Overlap, remove this interval
        count++;
    }
}

System.out.println("Intervals to remove: " + count);

// ============================================
// APPROACH 2: Greedy (Sort by Start) - O(n log n) Time, O(1) Space
// ============================================
int[][] intervals2 = {{1, 2}, {2, 3}, {3, 4}, {1, 3}};

// Sort by start time
Arrays.sort(intervals2, (a, b) -> a[0] - b[0]);

int count2 = 0;
int prevEnd2 = intervals2[0][1];

for (int i = 1; i < intervals2.length; i++) {
    if (intervals2[i][0] < prevEnd2) {
        // Overlap - remove the one with larger end
        count2++;
        prevEnd2 = Math.min(prevEnd2, intervals2[i][1]);
    } else {
        prevEnd2 = intervals2[i][1];
    }
}

System.out.println("Intervals to remove (by start): " + count2);

// ============================================
// Visualization
// ============================================
System.out.println("\nIntervals: [[1,2], [2,3], [3,4], [1,3]]");
System.out.println("Sorted by end: [[1,2], [2,3], [1,3], [3,4]]");
System.out.println("Keep [1,2]: prevEnd=2");
System.out.println("Keep [2,3]: 2>=2, prevEnd=3");
System.out.println("Remove [1,3]: 1<3, overlap!");
System.out.println("Keep [3,4]: 3>=3, prevEnd=4");
System.out.println("Result: Remove 1 interval");
