// ================================================
// Problem 77: Palindrome Partitioning
// ================================================
// Partition string so that every substring is a palindrome.
// Return all possible palindrome partitionings.

// ============================================
// APPROACH 1: Backtracking - O(n * 2^n) Time ⭐ OPTIMAL
// ============================================
String s = "aab";

List<List<String>> result = new ArrayList<>();
backtrackPalindrome(s, 0, new ArrayList<>(), result);
System.out.println("Palindrome Partitioning: " + result);

static void backtrackPalindrome(String s, int start, List<String> current,
                                 List<List<String>> result) {
    if (start == s.length()) {
        result.add(new ArrayList<>(current));
        return;
    }
    
    for (int end = start + 1; end <= s.length(); end++) {
        String substring = s.substring(start, end);
        
        if (isPalindrome(substring)) {
            current.add(substring);
            backtrackPalindrome(s, end, current, result);
            current.remove(current.size() - 1);
        }
    }
}

static boolean isPalindrome(String s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        if (s.charAt(left) != s.charAt(right)) return false;
        left++;
        right--;
    }
    return true;
}

// ============================================
// APPROACH 2: DP Preprocessing + Backtracking - O(n * 2^n) Time
// ============================================
System.out.println("\nWith DP Preprocessing:");
System.out.println("Precompute dp[i][j] = true if s[i..j] is palindrome");
System.out.println("Speeds up palindrome checking to O(1)");

/*
// Precompute palindrome table
boolean[][] dp = new boolean[n][n];
for (int i = n - 1; i >= 0; i--) {
    for (int j = i; j < n; j++) {
        if (s.charAt(i) == s.charAt(j) && (j - i <= 2 || dp[i+1][j-1])) {
            dp[i][j] = true;
        }
    }
}
*/

// ============================================
// Visualization
// ============================================
System.out.println("\nFor 'aab':");
System.out.println("  [['a', 'a', 'b']]");
System.out.println("  [['aa', 'b']]");
