// ================================================
// Problem 105: Coin Change
// ================================================
// Given coins array and amount, return fewest coins to make up that amount.
// If not possible, return -1.

// ============================================
// APPROACH 1: DP Bottom-Up - O(amount * n) Time, O(amount) Space ⭐ OPTIMAL
// ============================================
int[] coins = {1, 2, 5};
int amount = 11;

int[] dp = new int[amount + 1];
Arrays.fill(dp, amount + 1); // Initialize with impossible value
dp[0] = 0;

for (int i = 1; i <= amount; i++) {
    for (int coin : coins) {
        if (coin <= i) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
}

int result1 = dp[amount] > amount ? -1 : dp[amount];
System.out.println("Coin Change (DP): " + result1);

// ============================================
// APPROACH 2: BFS - O(amount * n) Time, O(amount) Space
// ============================================
int[] coins2 = {1, 2, 5};
int amount2 = 11;

Queue<Integer> queue = new LinkedList<>();
Set<Integer> visited = new HashSet<>();
queue.offer(amount2);
visited.add(amount2);
int level = 0;
int result2 = -1;

while (!queue.isEmpty()) {
    int size = queue.size();
    
    for (int i = 0; i < size; i++) {
        int curr = queue.poll();
        
        if (curr == 0) {
            result2 = level;
            break;
        }
        
        for (int coin : coins2) {
            int next = curr - coin;
            if (next >= 0 && !visited.contains(next)) {
                visited.add(next);
                queue.offer(next);
            }
        }
    }
    
    if (result2 != -1) break;
    level++;
}

System.out.println("Coin Change (BFS): " + result2);

// ============================================
// APPROACH 3: Recursion with Memoization - O(amount * n) Time, O(amount) Space
// ============================================
int[] coins3 = {1, 2, 5};
int amount3 = 11;
int[] memo = new int[amount3 + 1];
Arrays.fill(memo, -2);

int result3 = coinChangeMemo(coins3, amount3, memo);
System.out.println("Coin Change (Memo): " + result3);

static int coinChangeMemo(int[] coins, int amount, int[] memo) {
    if (amount == 0) return 0;
    if (amount < 0) return -1;
    if (memo[amount] != -2) return memo[amount];
    
    int minCoins = Integer.MAX_VALUE;
    for (int coin : coins) {
        int subResult = coinChangeMemo(coins, amount - coin, memo);
        if (subResult >= 0) {
            minCoins = Math.min(minCoins, subResult + 1);
        }
    }
    
    memo[amount] = (minCoins == Integer.MAX_VALUE) ? -1 : minCoins;
    return memo[amount];
}
