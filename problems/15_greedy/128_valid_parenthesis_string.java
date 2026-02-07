// ================================================
// Problem 128: Valid Parenthesis String
// ================================================
// String with '(', ')' and '*' (* can be '(', ')' or empty).
// Determine if string is valid.

// ============================================
// APPROACH 1: Two Counters - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
String s = "(*)";

int minOpen = 0;  // Min possible open parentheses
int maxOpen = 0;  // Max possible open parentheses

for (char c : s.toCharArray()) {
    if (c == '(') {
        minOpen++;
        maxOpen++;
    } else if (c == ')') {
        minOpen--;
        maxOpen--;
    } else {  // '*'
        minOpen--;  // Treat as ')'
        maxOpen++;  // Treat as '('
    }
    
    // Can't have negative open count
    if (maxOpen < 0) break;
    
    // Reset min to 0 if negative
    minOpen = Math.max(minOpen, 0);
}

boolean isValid = minOpen == 0;
System.out.println("Valid Parenthesis String: " + isValid);

// ============================================
// APPROACH 2: Greedy with Two Passes - O(n) Time
// ============================================
System.out.println("\nTwo Passes approach:");
System.out.println("1. Left to right: ensure ')' always has matching '(' or '*'");
System.out.println("2. Right to left: ensure '(' always has matching ')' or '*'");

// ============================================
// APPROACH 3: DP - O(n²) Time
// ============================================
System.out.println("\nDP approach:");
System.out.println("dp[i][j] = true if s[i:] is valid with j open '('s");

// ============================================
// Visualization
// ============================================
System.out.println("\nFor '(*)':");
System.out.println("i=0 '(': minOpen=1, maxOpen=1");
System.out.println("i=1 '*': minOpen=0, maxOpen=2");
System.out.println("i=2 ')': minOpen=0, maxOpen=1");
System.out.println("minOpen=0 at end -> Valid!");
