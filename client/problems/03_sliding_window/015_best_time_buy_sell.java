// ================================================
// Problem 15: Best Time to Buy and Sell Stock
// ================================================
// Given an array prices where prices[i] is the price of a stock on day i,
// find the maximum profit from one transaction (buy one, sell one).

// ============================================
// APPROACH 1: Brute Force - O(n²) Time, O(1) Space
// ============================================
int[] prices = {7, 1, 5, 3, 6, 4};
int maxProfit1 = 0;

for (int i = 0; i < prices.length; i++) {
    for (int j = i + 1; j < prices.length; j++) {
        int profit = prices[j] - prices[i];
        maxProfit1 = Math.max(maxProfit1, profit);
    }
}

System.out.println("Max Profit (Brute Force): " + maxProfit1);

// ============================================
// APPROACH 2: Single Pass - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
// Track minimum price so far and maximum profit
int[] prices2 = {7, 1, 5, 3, 6, 4};
int minPrice = Integer.MAX_VALUE;
int maxProfit2 = 0;

for (int price : prices2) {
    if (price < minPrice) {
        minPrice = price;
    } else {
        int profit = price - minPrice;
        maxProfit2 = Math.max(maxProfit2, profit);
    }
}

System.out.println("Max Profit (Single Pass): " + maxProfit2);

// ============================================
// APPROACH 3: Two Pointers (Sliding Window) - O(n) Time, O(1) Space
// ============================================
int[] prices3 = {7, 1, 5, 3, 6, 4};
int left3 = 0;  // Buy day
int right3 = 1; // Sell day
int maxProfit3 = 0;

while (right3 < prices3.length) {
    if (prices3[left3] < prices3[right3]) {
        int profit = prices3[right3] - prices3[left3];
        maxProfit3 = Math.max(maxProfit3, profit);
    } else {
        left3 = right3; // Found a lower buy price
    }
    right3++;
}

System.out.println("Max Profit (Two Pointers): " + maxProfit3);
