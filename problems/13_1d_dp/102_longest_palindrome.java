// ================================================
// Problem 102: Longest Palindromic Substring
// ================================================
// Given a string s, return the longest palindromic substring.

// ============================================
// APPROACH 1: Expand Around Center - O(n²) Time, O(1) Space ⭐ OPTIMAL
// ============================================
String s = "babad";

int start = 0, maxLen = 1;

for (int i = 0; i < s.length(); i++) {
    // Odd length palindrome (center = i)
    int len1 = expandAroundCenter(s, i, i);
    
    // Even length palindrome (center = i, i+1)
    int len2 = expandAroundCenter(s, i, i + 1);
    
    int len = Math.max(len1, len2);
    if (len > maxLen) {
        maxLen = len;
        start = i - (len - 1) / 2;
    }
}

String result = s.substring(start, start + maxLen);
System.out.println("Longest Palindrome: " + result);

static int expandAroundCenter(String s, int left, int right) {
    while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
        left--;
        right++;
    }
    return right - left - 1;
}

// ============================================
// APPROACH 2: DP - O(n²) Time, O(n²) Space
// ============================================
String s2 = "babad";
int n = s2.length();
boolean[][] dp = new boolean[n][n];

String result2 = String.valueOf(s2.charAt(0));

// All single characters are palindromes
for (int i = 0; i < n; i++) dp[i][i] = true;

// Fill DP table
for (int len = 2; len <= n; len++) {
    for (int i = 0; i <= n - len; i++) {
        int j = i + len - 1;
        
        if (s2.charAt(i) == s2.charAt(j)) {
            if (len == 2 || dp[i + 1][j - 1]) {
                dp[i][j] = true;
                if (len > result2.length()) {
                    result2 = s2.substring(i, j + 1);
                }
            }
        }
    }
}

System.out.println("Longest Palindrome (DP): " + result2);

// ============================================
// APPROACH 3: Manacher's Algorithm - O(n) Time, O(n) Space ⭐ TRULY OPTIMAL
// ============================================
System.out.println("\nManacher's Algorithm: O(n) time complexity");
System.out.println("Uses previously computed palindrome lengths");
