// ================================================
// Problem 132: Meeting Rooms
// ================================================
// Given array of meeting time intervals, determine if one person can attend all.

// ============================================
// APPROACH 1: Sorting - O(n log n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[][] intervals = {{0, 30}, {5, 10}, {15, 20}};

// Sort by start time
Arrays.sort(intervals, (a, b) -> a[0] - b[0]);

boolean canAttendAll = true;
for (int i = 1; i < intervals.length; i++) {
    // Check if current meeting starts before previous ends
    if (intervals[i][0] < intervals[i - 1][1]) {
        canAttendAll = false;
        break;
    }
}

System.out.println("Meeting Rooms: " + canAttendAll);

// ============================================
// APPROACH 2: Brute Force - O(n²) Time
// ============================================
System.out.println("\nBrute Force: Check all pairs for overlap");
System.out.println("Two intervals [s1,e1] and [s2,e2] overlap if:");
System.out.println("  NOT (e1 <= s2 OR e2 <= s1)");

// ============================================
// Visualization
// ============================================
System.out.println("\nFor [[0,30], [5,10], [15,20]]:");
System.out.println("Sorted: [[0,30], [5,10], [15,20]]");
System.out.println("[0,30] ends at 30, [5,10] starts at 5 -> Overlap!");
System.out.println("Result: false");
