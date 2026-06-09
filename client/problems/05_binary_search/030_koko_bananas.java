// ================================================
// Problem 30: Koko Eating Bananas
// ================================================
// Koko loves to eat bananas. There are n piles of bananas, and guards will 
// return in h hours. Koko can decide her eating speed k (bananas per hour).
// Return the minimum integer k such that she can eat all bananas within h hours.

// ============================================
// APPROACH 1: Binary Search on Answer - O(n * log(max)) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[] piles = {3, 6, 7, 11};
int h = 8;

// Find the maximum value in piles
int maxPile = 0;
for (int pile : piles) {
    maxPile = Math.max(maxPile, pile);
}

int left = 1;
int right = maxPile;
int result = maxPile;

while (left <= right) {
    int mid = left + (right - left) / 2;  // Current eating speed k
    
    // Calculate hours needed at this speed
    long hoursNeeded = 0;
    for (int pile : piles) {
        hoursNeeded += (pile + mid - 1) / mid;  // Ceiling division
    }
    
    if (hoursNeeded <= h) {
        result = mid;         // This speed works, try slower
        right = mid - 1;
    } else {
        left = mid + 1;       // Need faster speed
    }
}

System.out.println("Koko Eating Speed: " + result);

// ============================================
// APPROACH 2: Linear Search (Brute Force) - O(n * max) Time, O(1) Space
// ============================================
int[] piles2 = {3, 6, 7, 11};
int h2 = 8;

maxPile = 0;
for (int pile : piles2) {
    maxPile = Math.max(maxPile, pile);
}

int result2 = maxPile;
for (int k = 1; k <= maxPile; k++) {
    long hoursNeeded = 0;
    for (int pile : piles2) {
        hoursNeeded += (pile + k - 1) / k;
    }
    
    if (hoursNeeded <= h2) {
        result2 = k;
        break;
    }
}

System.out.println("Koko Eating Speed (Linear): " + result2);
