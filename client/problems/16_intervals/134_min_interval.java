// ================================================
// Problem 134: Minimum Interval to Include Each Query
// ================================================
// Given intervals and queries, return smallest interval length containing each query.

// ============================================
// APPROACH 1: Sweep Line + Min Heap - O((n+q) log n) Time ⭐ OPTIMAL
// ============================================
int[][] intervals = {{1, 4}, {2, 4}, {3, 6}, {4, 4}};
int[] queries = {2, 3, 4, 5};

// Sort intervals by start
int[][] sortedIntervals = intervals.clone();
Arrays.sort(sortedIntervals, (a, b) -> a[0] - b[0]);

// Sort queries with original indices
int[][] sortedQueries = new int[queries.length][2];
for (int i = 0; i < queries.length; i++) {
    sortedQueries[i] = new int[]{queries[i], i};
}
Arrays.sort(sortedQueries, (a, b) -> a[0] - b[0]);

// Min heap: [interval size, end]
PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> a[0] - b[0]);
int[] result = new int[queries.length];
Arrays.fill(result, -1);

int i = 0;
for (int[] query : sortedQueries) {
    int q = query[0];
    int idx = query[1];
    
    // Add all intervals that start <= query
    while (i < sortedIntervals.length && sortedIntervals[i][0] <= q) {
        int size = sortedIntervals[i][1] - sortedIntervals[i][0] + 1;
        minHeap.offer(new int[]{size, sortedIntervals[i][1]});
        i++;
    }
    
    // Remove intervals that ended before query
    while (!minHeap.isEmpty() && minHeap.peek()[1] < q) {
        minHeap.poll();
    }
    
    if (!minHeap.isEmpty()) {
        result[idx] = minHeap.peek()[0];
    }
}

System.out.println("Min Interval Sizes: " + Arrays.toString(result));

// ============================================
// Visualization
// ============================================
System.out.println("\nFor intervals=[[1,4],[2,4],[3,6],[4,4]], queries=[2,3,4,5]:");
System.out.println("Query 2: [1,4]=4, [2,4]=3 contain it. Min size = 3");
System.out.println("Query 3: [1,4]=4, [2,4]=3, [3,6]=4 contain it. Min size = 3");
System.out.println("Query 4: [1,4]=4, [2,4]=3, [3,6]=4, [4,4]=1. Min size = 1");
System.out.println("Query 5: [3,6]=4 contains it. Min size = 4");
