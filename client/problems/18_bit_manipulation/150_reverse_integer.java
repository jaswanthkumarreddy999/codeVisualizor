// ================================================
// Problem 150: Reverse Integer
// ================================================
// Given a 32-bit signed integer, return its reverse. Return 0 if overflow.

// ============================================
// APPROACH 1: Math - O(log n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int x = 123;

int result = 0;
int num = x;

while (num != 0) {
    int digit = num % 10;
    num /= 10;
    
    // Check overflow before adding
    if (result > Integer.MAX_VALUE / 10 || 
        (result == Integer.MAX_VALUE / 10 && digit > 7)) {
        result = 0;
        break;
    }
    if (result < Integer.MIN_VALUE / 10 || 
        (result == Integer.MIN_VALUE / 10 && digit < -8)) {
        result = 0;
        break;
    }
    
    result = result * 10 + digit;
}

System.out.println("Reverse Integer: " + result);

// ============================================
// Approach using Long
// ============================================
int x2 = 123;
long rev = 0;
int num2 = x2;

while (num2 != 0) {
    rev = rev * 10 + num2 % 10;
    num2 /= 10;
}

int result2;
if (rev > Integer.MAX_VALUE || rev < Integer.MIN_VALUE) {
    result2 = 0;
} else {
    result2 = (int) rev;
}

System.out.println("Reverse (Long): " + result2);

// ============================================
// Visualization
// ============================================
System.out.println("\nFor x=123:");
System.out.println("Step 1: digit=3, result=3");
System.out.println("Step 2: digit=2, result=32");
System.out.println("Step 3: digit=1, result=321");

System.out.println("\nOverflow check:");
System.out.println("INT_MAX = 2147483647");
System.out.println("Before adding last digit, if result > 214748364, overflow");
