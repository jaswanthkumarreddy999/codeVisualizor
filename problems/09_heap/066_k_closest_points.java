// ================================================
// Problem 66: K Closest Points to Origin
// ================================================
// Given array of points, return k closest points to origin (0, 0).

// ============================================
// APPROACH 1: Max Heap of Size K - O(n log k) Time, O(k) Space ⭐ OPTIMAL for streaming
// ============================================
int[][] points = {{1, 3}, {-2, 2}, {5, 8}, {0, 1}};
int k = 2;

// Max heap based on distance (keep k smallest)
PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> 
    (b[0]*b[0] + b[1]*b[1]) - (a[0]*a[0] + a[1]*a[1])
);

for (int[] point : points) {
    maxHeap.offer(point);
    if (maxHeap.size() > k) {
        maxHeap.poll();
    }
}

System.out.println("K Closest Points:");
while (!maxHeap.isEmpty()) {
    int[] p = maxHeap.poll();
    System.out.println("  [" + p[0] + ", " + p[1] + "]");
}

// ============================================
// APPROACH 2: Sorting - O(n log n) Time, O(n) Space
// ============================================
int[][] points2 = {{1, 3}, {-2, 2}, {5, 8}, {0, 1}};
int k2 = 2;

Arrays.sort(points2, (a, b) -> 
    (a[0]*a[0] + a[1]*a[1]) - (b[0]*b[0] + b[1]*b[1])
);

System.out.println("\nK Closest (Sorting):");
for (int i = 0; i < k2; i++) {
    System.out.println("  [" + points2[i][0] + ", " + points2[i][1] + "]");
}

// ============================================
// APPROACH 3: QuickSelect - O(n) Average Time, O(1) Space ⭐ OPTIMAL
// ============================================
System.out.println("\nQuickSelect approach:");
System.out.println("Partition based on distance");
System.out.println("Find kth position, return all points before it");

/*
int[][] kClosest(int[][] points, int k) {
    int left = 0, right = points.length - 1;
    
    while (left <= right) {
        int pivotIdx = partition(points, left, right);
        
        if (pivotIdx == k - 1) {
            break;
        } else if (pivotIdx < k - 1) {
            left = pivotIdx + 1;
        } else {
            right = pivotIdx - 1;
        }
    }
    
    return Arrays.copyOf(points, k);
}
*/
