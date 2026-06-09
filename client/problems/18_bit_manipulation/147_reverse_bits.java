// ================================================
// Problem 147: Reverse Bits
// ================================================
// Reverse bits of a given 32 bits unsigned integer.

// ============================================
// APPROACH 1: Bit Manipulation - O(32) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int n = 0b00000010100101000001111010011100;  // 43261596

int result = 0;
int num = n;

for (int i = 0; i < 32; i++) {
    result <<= 1;          // Make room
    result |= (num & 1);   // Add rightmost bit
    num >>>= 1;            // Move to next bit
}

System.out.println("Reversed bits: " + result);

// ============================================
// APPROACH 2: Divide and Conquer - O(1) Time (fixed operations)
// ============================================
// Swap halves recursively
int n2 = 0b00000010100101000001111010011100;

// Swap 16-bit halves
n2 = (n2 >>> 16) | (n2 << 16);
// Swap 8-bit halves
n2 = ((n2 & 0xFF00FF00) >>> 8) | ((n2 & 0x00FF00FF) << 8);
// Swap 4-bit halves
n2 = ((n2 & 0xF0F0F0F0) >>> 4) | ((n2 & 0x0F0F0F0F) << 4);
// Swap 2-bit halves
n2 = ((n2 & 0xCCCCCCCC) >>> 2) | ((n2 & 0x33333333) << 2);
// Swap 1-bit halves
n2 = ((n2 & 0xAAAAAAAA) >>> 1) | ((n2 & 0x55555555) << 1);

System.out.println("Reversed (D&C): " + n2);

// ============================================
// Visualization
// ============================================
System.out.println("\nReverse Bits Process:");
System.out.println("Input:  00000010100101000001111010011100");
System.out.println("Output: 00111001011110000010100101000000");
System.out.println("(Read bits from right to left)");
