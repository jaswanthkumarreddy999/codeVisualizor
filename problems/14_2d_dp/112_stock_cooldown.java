// ================================================
// Problem 112: Best Time to Buy and Sell Stock with Cooldown
// ================================================
// Can't buy again immediately after selling (must wait 1 day cooldown).

// ============================================
// APPROACH 1: State Machine DP - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
// States: hold (holding stock), sold (just sold), rest (can buy)
int[] prices = {1, 2, 3, 0, 2};

int hold = Integer.MIN_VALUE;  // Max profit while holding
int sold = 0;                   // Max profit just after selling
int rest = 0;                   // Max profit while resting

for (int price : prices) {
    int prevSold = sold;
    
    sold = hold + price;           // Sell: hold -> sold
    hold = Math.max(hold, rest - price);  // Buy or keep holding
    rest = Math.max(rest, prevSold);      // Rest or after cooldown
}

int maxProfit = Math.max(sold, rest);
System.out.println("Max Profit with Cooldown: " + maxProfit);

// ============================================
// APPROACH 2: DP Array - O(n) Time, O(n) Space
// ============================================
int[] prices2 = {1, 2, 3, 0, 2};
int n = prices2.length;

if (n == 0) {
    System.out.println("Max Profit (Array): 0");
} else {
    int[] hold2 = new int[n];
    int[] sold2 = new int[n];
    int[] rest2 = new int[n];
    
    hold2[0] = -prices2[0];
    sold2[0] = 0;
    rest2[0] = 0;
    
    for (int i = 1; i < n; i++) {
        hold2[i] = Math.max(hold2[i-1], rest2[i-1] - prices2[i]);
        sold2[i] = hold2[i-1] + prices2[i];
        rest2[i] = Math.max(rest2[i-1], sold2[i-1]);
    }
    
    System.out.println("Max Profit (Array): " + Math.max(sold2[n-1], rest2[n-1]));
}

// ============================================
// State Diagram
// ============================================
System.out.println("\nState Transitions:");
System.out.println("REST --buy--> HOLD --sell--> SOLD --cooldown--> REST");
System.out.println("HOLD --hold--> HOLD");
System.out.println("REST --rest--> REST");
