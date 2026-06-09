// ================================================
// Problem 70: Find Median from Data Stream
// ================================================
// Design a data structure that supports adding numbers and finding median.

// ============================================
// APPROACH 1: Two Heaps - O(log n) add, O(1) find ⭐ OPTIMAL
// ============================================
// Small heap (max heap) for lower half
// Large heap (min heap) for upper half
// Median is either top of large or average of both tops

PriorityQueue<Integer> small = new PriorityQueue<>((a, b) -> b - a); // Max heap
PriorityQueue<Integer> large = new PriorityQueue<>(); // Min heap

// Add number
int[] stream = {41, 35, 62, 4, 97, 108};

for (int num : stream) {
    // Add to small first, then balance
    small.offer(num);
    large.offer(small.poll());
    
    // Keep sizes balanced (small can be 1 larger)
    if (large.size() > small.size()) {
        small.offer(large.poll());
    }
    
    // Find median
    double median;
    if (small.size() > large.size()) {
        median = small.peek();
    } else {
        median = (small.peek() + large.peek()) / 2.0;
    }
    
    System.out.println("Added " + num + " -> Median: " + median);
}

// ============================================
// APPROACH 2: Sorted List - O(n) add, O(1) find
// ============================================
System.out.println("\nSorted List approach:");
System.out.println("Maintain sorted list");
System.out.println("Binary search for insertion point");
System.out.println("Median at middle index");

// ============================================
// APPROACH 3: Balanced BST (TreeMap) - O(log n) add, O(log n) find
// ============================================
System.out.println("\nBalanced BST (TreeMap) approach:");
System.out.println("Use TreeMap with counts");
System.out.println("Track median position with pointers");
