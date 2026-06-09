// ================================================
// Problem 149: Sum of Two Integers
// ================================================
// Calculate sum of two integers a and b without using + or -.

// ============================================
// APPROACH 1: Bit Manipulation - O(1) Time, O(1) Space ⭐ OPTIMAL
// ============================================
// XOR gives sum without carry
// AND gives carry bits, shift left to add next iteration

int a = 5, b = 3;

while (b != 0) {
    int carry = a & b;
    a = a ^ b;      // Sum without carry
    b = carry << 1; // Carry for next position
}

System.out.println("Sum without + : " + a);

// ============================================
// Visualization
// ============================================
System.out.println("\nFor a=5 (101), b=3 (011):");
System.out.println("Step 1:");
System.out.println("  carry = 101 & 011 = 001");
System.out.println("  a = 101 ^ 011 = 110 (6)");
System.out.println("  b = 001 << 1 = 010 (2)");
System.out.println("Step 2:");
System.out.println("  carry = 110 & 010 = 010");
System.out.println("  a = 110 ^ 010 = 100 (4)");
System.out.println("  b = 010 << 1 = 100 (4)");
System.out.println("Step 3:");
System.out.println("  carry = 100 & 100 = 100");
System.out.println("  a = 100 ^ 100 = 000 (0)");
System.out.println("  b = 100 << 1 = 1000 (8)");
System.out.println("Step 4:");
System.out.println("  carry = 0000 & 1000 = 0");
System.out.println("  a = 0 ^ 8 = 8");
System.out.println("  b = 0");
System.out.println("Result: 8");

// ============================================
// Subtraction
// ============================================
System.out.println("\nFor subtraction a - b:");
System.out.println("Use getSum(a, getSum(~b, 1))");
System.out.println("~b + 1 = -b (two's complement)");
