// ================================================
// Problem 142: Pow(x, n)
// ================================================
// Implement pow(x, n), which calculates x raised to power n.

// ============================================
// APPROACH 1: Binary Exponentiation - O(log n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
double x = 2.0;
int n = 10;

long power = n;
double result = 1.0;

if (power < 0) {
    x = 1 / x;
    power = -power;
}

while (power > 0) {
    if ((power & 1) == 1) {  // Odd power
        result *= x;
    }
    x *= x;
    power >>= 1;
}

System.out.println("Pow(" + 2.0 + ", " + 10 + ") = " + result);

// ============================================
// APPROACH 2: Recursive - O(log n) Time, O(log n) Space
// ============================================
System.out.println("\nRecursive approach:");
System.out.println("pow(x, n) = pow(x, n/2)² if n is even");
System.out.println("pow(x, n) = x * pow(x, n/2)² if n is odd");

/*
double myPow(double x, int n) {
    if (n == 0) return 1;
    if (n < 0) {
        n = -n;
        x = 1 / x;
    }
    double half = myPow(x, n / 2);
    if (n % 2 == 0) {
        return half * half;
    } else {
        return x * half * half;
    }
}
*/

// ============================================
// Visualization
// ============================================
System.out.println("\nFor 2^10:");
System.out.println("10 = 1010 in binary");
System.out.println("2^10 = 2^8 * 2^2 = 256 * 4 = 1024");
