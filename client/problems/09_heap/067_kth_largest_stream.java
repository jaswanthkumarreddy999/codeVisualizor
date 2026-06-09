// ================================================
// Problem 67: Kth Largest Element in a Stream
// ================================================
// Design a class to find kth largest element in a stream.

// ============================================
// APPROACH 1: Min Heap - O(log k) add, O(1) findKthLargest ⭐ OPTIMAL
// ============================================
System.out.println("Kth Largest Element in Stream:");

int k = 3;
int[] initial = {4, 5, 8, 2};

PriorityQueue<Integer> minHeap = new PriorityQueue<>();

// Add initial elements
for (int num : initial) {
    minHeap.offer(num);
    if (minHeap.size() > k) {
        minHeap.poll();
    }
}

System.out.println("Initial heap (k=" + k + "): " + minHeap);
System.out.println("Kth largest: " + minHeap.peek());

// Add new element
int newVal = 3;
minHeap.offer(newVal);
if (minHeap.size() > k) {
    minHeap.poll();
}
System.out.println("After adding " + newVal + ": Kth largest = " + minHeap.peek());

/*
class KthLargest {
    private PriorityQueue<Integer> heap;
    private int k;
    
    public KthLargest(int k, int[] nums) {
        this.k = k;
        this.heap = new PriorityQueue<>();
        
        for (int num : nums) {
            add(num);
        }
    }
    
    public int add(int val) {
        heap.offer(val);
        
        if (heap.size() > k) {
            heap.poll();
        }
        
        return heap.peek();
    }
}
*/

// ============================================
// APPROACH 2: Sorted List - O(n) add, O(1) find
// ============================================
System.out.println("\nSorted List approach (less efficient)");
System.out.println("Maintain sorted list, return (size - k)th element");
