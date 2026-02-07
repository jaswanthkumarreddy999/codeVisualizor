// ================================================
// Problem 34: Median of Two Sorted Arrays
// ================================================
// Given two sorted arrays nums1 and nums2, return the median of 
// the combined sorted array. Must be O(log(m+n)).

// ============================================
// APPROACH 1: Merge and Find - O(m+n) Time, O(m+n) Space (Not optimal but intuitive)
// ============================================
int[] nums1 = {1, 3};
int[] nums2 = {2};

int[] merged = new int[nums1.length + nums2.length];
int i = 0, j = 0, k = 0;

while (i < nums1.length && j < nums2.length) {
    if (nums1[i] <= nums2[j]) {
        merged[k++] = nums1[i++];
    } else {
        merged[k++] = nums2[j++];
    }
}

while (i < nums1.length) merged[k++] = nums1[i++];
while (j < nums2.length) merged[k++] = nums2[j++];

double median1;
int n = merged.length;
if (n % 2 == 0) {
    median1 = (merged[n/2 - 1] + merged[n/2]) / 2.0;
} else {
    median1 = merged[n/2];
}

System.out.println("Median (Merge): " + median1);

// ============================================
// APPROACH 2: Binary Search - O(log(min(m,n))) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[] A = {1, 3};
int[] B = {2};

// Ensure A is the shorter array
if (A.length > B.length) {
    int[] temp = A;
    A = B;
    B = temp;
}

int m = A.length;
n = B.length;
int lo = 0, hi = m;

while (lo <= hi) {
    int partitionA = (lo + hi) / 2;
    int partitionB = (m + n + 1) / 2 - partitionA;
    
    int maxLeftA = (partitionA == 0) ? Integer.MIN_VALUE : A[partitionA - 1];
    int minRightA = (partitionA == m) ? Integer.MAX_VALUE : A[partitionA];
    
    int maxLeftB = (partitionB == 0) ? Integer.MIN_VALUE : B[partitionB - 1];
    int minRightB = (partitionB == n) ? Integer.MAX_VALUE : B[partitionB];
    
    if (maxLeftA <= minRightB && maxLeftB <= minRightA) {
        // Found correct partition
        double median2;
        if ((m + n) % 2 == 0) {
            median2 = (Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2.0;
        } else {
            median2 = Math.max(maxLeftA, maxLeftB);
        }
        System.out.println("Median (Binary Search): " + median2);
        break;
    } else if (maxLeftA > minRightB) {
        hi = partitionA - 1;
    } else {
        lo = partitionA + 1;
    }
}
