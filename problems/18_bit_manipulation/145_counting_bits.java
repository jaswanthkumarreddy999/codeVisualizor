// ================================================
// Problem 145: Counting Bits
// ================================================
// Given integer n, return array ans where ans[i] is number of 1s in binary of i.

// ============================================
// APPROACH 1: DP with Last Set Bit - O(n) Time, O(n) Space ⭐ OPTIMAL
// ============================================
int n = 5;
int[] ans = new int[n + 1];

for (int i = 1; i <= n; i++) {
    ans[i] = ans[i & (i - 1)] + 1;  // Remove last set bit, add 1
}

System.out.println("Counting Bits (DP): " + Arrays.toString(ans));

// ============================================
// APPROACH 2: DP with Right Shift - O(n) Time, O(n) Space
// ============================================
int n2 = 5;
int[] ans2 = new int[n2 + 1];

for (int i = 1; i <= n2; i++) {
    ans2[i] = ans2[i >> 1] + (i & 1);  // i/2 bits + last bit
}

System.out.println("Counting Bits (Shift): " + Arrays.toString(ans2));

// ============================================
// APPROACH 3: Brute Force - O(n log n) Time
// ============================================
int n3 = 5;
int[] ans3 = new int[n3 + 1];

for (int i = 0; i <= n3; i++) {
    int count = 0;
    int num = i;
    while (num != 0) {
        num &= (num - 1);
        count++;
    }
    ans3[i] = count;
}

System.out.println("Counting Bits (Brute): " + Arrays.toString(ans3));

// ============================================
// Visualization
// ============================================
System.out.println("\nNumber:  Binary  1-bits");
System.out.println("0:       0       0");
System.out.println("1:       1       1");
System.out.println("2:       10      1");
System.out.println("3:       11      2");
System.out.println("4:       100     1");
System.out.println("5:       101     2");
