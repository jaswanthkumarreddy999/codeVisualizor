// ================================================
// Problem 143: Multiply Strings
// ================================================
// Multiply two non-negative integers represented as strings.

// ============================================
// APPROACH 1: Grade School Multiplication - O(m*n) Time, O(m+n) Space ⭐ OPTIMAL
// ============================================
String num1 = "123";
String num2 = "456";

int m = num1.length(), n = num2.length();
int[] result = new int[m + n];

// Multiply from right to left
for (int i = m - 1; i >= 0; i--) {
    for (int j = n - 1; j >= 0; j--) {
        int mul = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');
        int p1 = i + j;     // Higher position
        int p2 = i + j + 1; // Lower position
        
        int sum = mul + result[p2];
        result[p2] = sum % 10;
        result[p1] += sum / 10;
    }
}

// Build result string
StringBuilder sb = new StringBuilder();
for (int digit : result) {
    if (!(sb.length() == 0 && digit == 0)) {  // Skip leading zeros
        sb.append(digit);
    }
}

String product = sb.length() == 0 ? "0" : sb.toString();
System.out.println("Multiply Strings: " + num1 + " × " + num2 + " = " + product);

// ============================================
// Visualization
// ============================================
System.out.println("\nGrade school multiplication:");
System.out.println("    1 2 3");
System.out.println("  ×   4 5 6");
System.out.println("  -------");
System.out.println("    7 3 8  (123 × 6)");
System.out.println("  6 1 5    (123 × 5)");
System.out.println("4 9 2      (123 × 4)");
System.out.println("---------");
System.out.println("5 6 0 8 8");
