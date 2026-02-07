// ================================================
// Problem 104: Decode Ways
// ================================================
// Given encoded message containing digits, count number of ways to decode it.
// 'A' = 1, 'B' = 2, ..., 'Z' = 26

// ============================================
// APPROACH 1: DP - O(n) Time, O(n) Space ⭐
// ============================================
String s = "226";
int n = s.length();

if (s.isEmpty() || s.charAt(0) == '0') {
    System.out.println("Decode Ways: 0");
} else {
    int[] dp = new int[n + 1];
    dp[0] = 1;  // Empty string
    dp[1] = 1;  // First character
    
    for (int i = 2; i <= n; i++) {
        int oneDigit = Integer.parseInt(s.substring(i - 1, i));
        int twoDigit = Integer.parseInt(s.substring(i - 2, i));
        
        if (oneDigit >= 1 && oneDigit <= 9) {
            dp[i] += dp[i - 1];
        }
        
        if (twoDigit >= 10 && twoDigit <= 26) {
            dp[i] += dp[i - 2];
        }
    }
    
    System.out.println("Decode Ways: " + dp[n]);
}

// ============================================
// APPROACH 2: Space Optimized - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
String s2 = "226";
int n2 = s2.length();

if (s2.isEmpty() || s2.charAt(0) == '0') {
    System.out.println("Decode Ways (opt): 0");
} else {
    int prev2 = 1;  // dp[i-2]
    int prev1 = 1;  // dp[i-1]
    
    for (int i = 2; i <= n2; i++) {
        int curr = 0;
        int oneDigit = s2.charAt(i - 1) - '0';
        int twoDigit = Integer.parseInt(s2.substring(i - 2, i));
        
        if (oneDigit >= 1) curr += prev1;
        if (twoDigit >= 10 && twoDigit <= 26) curr += prev2;
        
        prev2 = prev1;
        prev1 = curr;
    }
    
    System.out.println("Decode Ways (opt): " + prev1);
}

// ============================================
// Visualization
// ============================================
System.out.println("\nFor '226':");
System.out.println("'2' '2' '6' -> 'BBF'");
System.out.println("'22' '6' -> 'VF'");
System.out.println("'2' '26' -> 'BZ'");
System.out.println("Total: 3 ways");
