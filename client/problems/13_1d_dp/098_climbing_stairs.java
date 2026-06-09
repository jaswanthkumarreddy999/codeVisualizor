// ================================================
// Problem 98: Climbing Stairs
// ================================================
// You are climbing a staircase. It takes n steps to reach the top.
// Each time you can climb 1 or 2 steps. How many distinct ways to climb?

// ============================================
// APPROACH 1: Recursion with Memoization - O(n) Time, O(n) Space
// ============================================
int n = 5;
int[] memo = new int[n + 1];
Arrays.fill(memo, -1);

int ways1 = climbMemo(n, memo);
System.out.println("Climbing Stairs (Memoization): " + ways1);

static int climbMemo(int n, int[] memo) {
    if (n <= 2) return n;
    if (memo[n] != -1) return memo[n];
    
    memo[n] = climbMemo(n - 1, memo) + climbMemo(n - 2, memo);
    return memo[n];
}

// ============================================
// APPROACH 2: DP Bottom-Up - O(n) Time, O(n) Space
// ============================================
int n2 = 5;
int[] dp = new int[n2 + 1];
dp[1] = 1;
dp[2] = 2;

for (int i = 3; i <= n2; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
}

System.out.println("Climbing Stairs (DP): " + dp[n2]);

// ============================================
// APPROACH 3: Fibonacci (Space Optimized) - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int n3 = 5;
int prev2 = 1; // ways to reach step 1
int prev1 = 2; // ways to reach step 2

if (n3 == 1) {
    System.out.println("Climbing Stairs (Fib): 1");
} else if (n3 == 2) {
    System.out.println("Climbing Stairs (Fib): 2");
} else {
    int current = 0;
    for (int i = 3; i <= n3; i++) {
        current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    System.out.println("Climbing Stairs (Fib): " + current);
}

// ============================================
// APPROACH 4: Matrix Exponentiation - O(log n) Time, O(1) Space
// ============================================
System.out.println("\nMatrix Exponentiation (Advanced):");
System.out.println("Use [F(n+1), F(n)] = [[1,1],[1,0]]^n * [F(1), F(0)]");
System.out.println("Time: O(log n) using fast matrix power");
