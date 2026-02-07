// ================================================
// Problem 103: Palindromic Substrings
// ================================================
// Given a string s, return the number of palindromic substrings in it.

// ============================================
// APPROACH 1: Expand Around Center - O(n²) Time, O(1) Space ⭐ OPTIMAL
// ============================================
String s = "aaa";
int count = 0;

for (int i = 0; i < s.length(); i++) {
    // Odd length palindromes
    count += countPalindromes(s, i, i);
    
    // Even length palindromes
    count += countPalindromes(s, i, i + 1);
}

System.out.println("Palindromic Substrings: " + count);

static int countPalindromes(String s, int left, int right) {
    int count = 0;
    while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
        count++;
        left--;
        right++;
    }
    return count;
}

// ============================================
// APPROACH 2: DP - O(n²) Time, O(n²) Space
// ============================================
String s2 = "aaa";
int n = s2.length();
boolean[][] dp = new boolean[n][n];
int count2 = 0;

for (int i = n - 1; i >= 0; i--) {
    for (int j = i; j < n; j++) {
        if (s2.charAt(i) == s2.charAt(j)) {
            if (j - i <= 2 || dp[i + 1][j - 1]) {
                dp[i][j] = true;
                count2++;
            }
        }
    }
}

System.out.println("Palindromic Substrings (DP): " + count2);

// ============================================
// Visualization
// ============================================
System.out.println("\nFor 'aaa':");
System.out.println("Single chars: 'a', 'a', 'a' = 3");
System.out.println("Length 2: 'aa', 'aa' = 2");
System.out.println("Length 3: 'aaa' = 1");
System.out.println("Total: 6 palindromic substrings");
