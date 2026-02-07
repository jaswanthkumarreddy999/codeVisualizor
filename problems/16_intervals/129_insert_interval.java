// ================================================
// Problem 129: Insert Interval
// ================================================
// Insert new interval into list of non-overlapping intervals, merging if needed.

// ============================================
// APPROACH 1: Linear Scan - O(n) Time, O(n) Space ⭐ OPTIMAL
// ============================================
int[][] intervals = {{1, 3}, {6, 9}};
int[] newInterval = {2, 5};

List<int[]> result = new ArrayList<>();
int i = 0;
int n = intervals.length;

// Add all intervals that come before newInterval
while (i < n && intervals[i][1] < newInterval[0]) {
    result.add(intervals[i]);
    i++;
}

// Merge overlapping intervals
while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
}
result.add(newInterval);

// Add remaining intervals
while (i < n) {
    result.add(intervals[i]);
    i++;
}

int[][] resultArray = result.toArray(new int[result.size()][]);
System.out.println("Insert Interval:");
for (int[] interval : resultArray) {
    System.out.println(Arrays.toString(interval));
}

// ============================================
// Visualization
// ============================================
System.out.println("\nFor intervals=[[1,3],[6,9]], newInterval=[2,5]:");
System.out.println("Step 1: No intervals before [2,5]");
System.out.println("Step 2: Merge [1,3] with [2,5] -> [1,5]");
System.out.println("Step 3: Add [6,9] after");
System.out.println("Result: [[1,5], [6,9]]");
