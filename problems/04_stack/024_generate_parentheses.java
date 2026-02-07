// ================================================
// Problem 24: Generate Parentheses
// ================================================
// Given n pairs of parentheses, generate all combinations of 
// well-formed parentheses.

// ============================================
// APPROACH 1: Backtracking - O(4^n / sqrt(n)) Time ⭐ OPTIMAL
// ============================================
int n = 3;
List<String> result = new ArrayList<>();
StringBuilder current = new StringBuilder();

// Backtracking with open and close counts
Stack<int[]> states = new Stack<>();
states.push(new int[]{0, 0}); // [open count, close count]

// Simulate backtracking iteratively for visualization
result.clear();
current = new StringBuilder();
int open = 0, close = 0;

// Using iterative approach with explicit stack for visualization
List<String> generated = new ArrayList<>();
generateParentheses(generated, "", n, 0, 0);

System.out.println("Generate Parentheses (n=" + n + "): " + generated);

// ============================================
// APPROACH 2: Dynamic Programming - O(4^n / sqrt(n)) Time
// ============================================
// Build from smaller subproblems
// Each valid sequence of length 2n = "(" + inside + ")" + outside
int n2 = 3;
List<List<String>> dp = new ArrayList<>();

// Base case: n = 0
dp.add(new ArrayList<>());
dp.get(0).add("");

for (int i = 1; i <= n2; i++) {
    List<String> current2 = new ArrayList<>();
    
    // Split: j pairs inside (), (i-1-j) pairs outside
    for (int j = 0; j < i; j++) {
        for (String inside : dp.get(j)) {
            for (String outside : dp.get(i - 1 - j)) {
                current2.add("(" + inside + ")" + outside);
            }
        }
    }
    
    dp.add(current2);
}

System.out.println("Generate Parentheses DP: " + dp.get(n2));

// Helper method (simulated in main for visualization)
static void generateParentheses(List<String> result, String current, int n, int open, int close) {
    if (current.length() == 2 * n) {
        result.add(current);
        return;
    }
    
    if (open < n) {
        generateParentheses(result, current + "(", n, open + 1, close);
    }
    
    if (close < open) {
        generateParentheses(result, current + ")", n, open, close + 1);
    }
}
