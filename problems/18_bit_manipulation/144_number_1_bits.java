// ================================================
// Problem 144: Number of 1 Bits
// ================================================
// Write a function that returns the number of '1' bits (Hamming weight).

// ============================================
// APPROACH 1: Brian Kernighan's - O(k) where k = number of 1 bits ⭐ OPTIMAL
// ============================================
int n = 0b00001011;  // Binary: 11 = 1011

int count = 0;
int num = n;
while (num != 0) {
    num = num & (num - 1);  // Removes rightmost 1 bit
    count++;
}

System.out.println("Number of 1 bits (Kernighan): " + count);

// ============================================
// APPROACH 2: Iterate Bits - O(32) Time
// ============================================
int n2 = 0b00001011;
int count2 = 0;

for (int i = 0; i < 32; i++) {
    if ((n2 & (1 << i)) != 0) {
        count2++;
    }
}

System.out.println("Number of 1 bits (Iterate): " + count2);

// ============================================
// APPROACH 3: Right Shift - O(32) Time
// ============================================
int n3 = 0b00001011;
int count3 = 0;

while (n3 != 0) {
    count3 += (n3 & 1);
    n3 >>>= 1;  // Unsigned right shift
}

System.out.println("Number of 1 bits (Shift): " + count3);

// ============================================
// Visualization
// ============================================
System.out.println("\nBrian Kernighan's Algorithm:");
System.out.println("n = 1011 (11)");
System.out.println("n-1 = 1010 (10)");
System.out.println("n & (n-1) = 1010 -> removes rightmost 1");
System.out.println("Continue until n = 0");
