// ================================================
// Problem 133: Meeting Rooms II
// ================================================
// Find minimum number of conference rooms required for all meetings.

// ============================================
// APPROACH 1: Two Pointers - O(n log n) Time, O(n) Space ⭐ OPTIMAL
// ============================================
int[][] intervals = {{0, 30}, {5, 10}, {15, 20}};
int n = intervals.length;

int[] starts = new int[n];
int[] ends = new int[n];

for (int i = 0; i < n; i++) {
    starts[i] = intervals[i][0];
    ends[i] = intervals[i][1];
}

Arrays.sort(starts);
Arrays.sort(ends);

int rooms = 0, endPtr = 0;

for (int start : starts) {
    if (start < ends[endPtr]) {
        rooms++;  // Need new room
    } else {
        endPtr++;  // Reuse room that just freed up
    }
}

System.out.println("Meeting Rooms II: " + rooms);

// ============================================
// APPROACH 2: Min Heap - O(n log n) Time, O(n) Space
// ============================================
int[][] intervals2 = {{0, 30}, {5, 10}, {15, 20}};
Arrays.sort(intervals2, (a, b) -> a[0] - b[0]);

PriorityQueue<Integer> minHeap = new PriorityQueue<>();

for (int[] interval : intervals2) {
    // If earliest ending room ends before current starts, reuse it
    if (!minHeap.isEmpty() && minHeap.peek() <= interval[0]) {
        minHeap.poll();
    }
    minHeap.offer(interval[1]);
}

System.out.println("Meeting Rooms II (Heap): " + minHeap.size());

// ============================================
// Visualization
// ============================================
System.out.println("\nFor [[0,30], [5,10], [15,20]]:");
System.out.println("Time 0: [0,30] starts -> 1 room");
System.out.println("Time 5: [5,10] starts, [0,30] ongoing -> 2 rooms");
System.out.println("Time 10: [5,10] ends -> 1 room");
System.out.println("Time 15: [15,20] starts, [0,30] ongoing -> 2 rooms");
System.out.println("Result: 2 rooms needed");
