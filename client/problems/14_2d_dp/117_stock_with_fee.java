// ================================================
// Problem 117: Best Time to Buy and Sell Stock with Transaction Fee
// ================================================
// Can do as many transactions as you like, each transaction has a fee.

// ============================================
// APPROACH 1: State Machine DP - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[] prices = {1, 3, 2, 8, 4, 9};
int fee = 2;

int hold = Integer.MIN_VALUE;  // Max profit while holding stock
int cash = 0;                   // Max profit without holding

for (int price : prices) {
    int prevCash = cash;
    cash = Math.max(cash, hold + price - fee);  // Sell and pay fee
    hold = Math.max(hold, prevCash - price);     // Buy
}

System.out.println("Max Profit with Fee: " + cash);

// ============================================
// APPROACH 2: DP Array - O(n) Time, O(n) Space
// ============================================
int[] prices2 = {1, 3, 2, 8, 4, 9};
int fee2 = 2;
int n = prices2.length;

int[] hold2 = new int[n];
int[] cash2 = new int[n];

hold2[0] = -prices2[0];
cash2[0] = 0;

for (int i = 1; i < n; i++) {
    hold2[i] = Math.max(hold2[i-1], cash2[i-1] - prices2[i]);
    cash2[i] = Math.max(cash2[i-1], hold2[i-1] + prices2[i] - fee2);
}

System.out.println("Max Profit (Array): " + cash2[n-1]);

// ============================================
// Visualization
// ============================================
System.out.println("\nFor prices=[1,3,2,8,4,9], fee=2:");
System.out.println("Buy at 1, sell at 8: profit = 8-1-2 = 5");
System.out.println("Buy at 4, sell at 9: profit = 9-4-2 = 3");
System.out.println("Total: 8");
