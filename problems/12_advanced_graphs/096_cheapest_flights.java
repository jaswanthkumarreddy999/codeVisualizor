// ================================================
// Problem 96: Cheapest Flights Within K Stops
// ================================================
// Find cheapest price from src to dst with at most k stops.

// ============================================
// APPROACH 1: Bellman-Ford Variant - O(k * E) Time ⭐ OPTIMAL for k stops
// ============================================
int n = 4;
int[][] flights = {{0, 1, 100}, {1, 2, 100}, {2, 0, 100}, {1, 3, 600}, {2, 3, 200}};
int src = 0, dst = 3, k = 1;

int[] prices = new int[n];
Arrays.fill(prices, Integer.MAX_VALUE);
prices[src] = 0;

// Relax edges k+1 times (k stops = k+1 flights)
for (int i = 0; i <= k; i++) {
    int[] temp = Arrays.copyOf(prices, n);
    
    for (int[] flight : flights) {
        int from = flight[0], to = flight[1], price = flight[2];
        if (prices[from] != Integer.MAX_VALUE) {
            temp[to] = Math.min(temp[to], prices[from] + price);
        }
    }
    
    prices = temp;
}

int result = prices[dst] == Integer.MAX_VALUE ? -1 : prices[dst];
System.out.println("Cheapest Flight: " + result);

// ============================================
// APPROACH 2: BFS with Level Limit - O(k * E) Time
// ============================================
System.out.println("\nBFS approach:");
System.out.println("Use queue with (node, cost, stops)");
System.out.println("Stop when stops > k");

// ============================================
// APPROACH 3: Dijkstra's Modified - O(E log V) Time
// ============================================
System.out.println("\nDijkstra's with stops tracking");
System.out.println("Priority queue: (cost, node, stops)");
