// ================================================
// Problem 140: Happy Number
// ================================================
// A number is happy if repeatedly replacing it with sum of squares of digits
// eventually reaches 1. Return true if n is happy.

// ============================================
// APPROACH 1: Floyd's Cycle Detection - O(log n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int n = 19;

int slow = n, fast = n;

do {
    slow = sumOfSquares(slow);
    fast = sumOfSquares(sumOfSquares(fast));
} while (slow != fast);

boolean isHappy = slow == 1;
System.out.println("Happy Number " + n + ": " + isHappy);

static int sumOfSquares(int n) {
    int sum = 0;
    while (n > 0) {
        int digit = n % 10;
        sum += digit * digit;
        n /= 10;
    }
    return sum;
}

// ============================================
// APPROACH 2: HashSet - O(log n) Time, O(log n) Space
// ============================================
int n2 = 19;
Set<Integer> seen = new HashSet<>();

while (n2 != 1 && !seen.contains(n2)) {
    seen.add(n2);
    n2 = sumOfSquares(n2);
}

boolean isHappy2 = n2 == 1;
System.out.println("Happy Number (HashSet): " + isHappy2);

// ============================================
// Visualization
// ============================================
System.out.println("\nFor n=19:");
System.out.println("19 -> 1² + 9² = 82");
System.out.println("82 -> 8² + 2² = 68");
System.out.println("68 -> 6² + 8² = 100");
System.out.println("100 -> 1² + 0² + 0² = 1");
System.out.println("Reached 1 -> Happy!");
