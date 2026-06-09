// ================================================
// Problem 124: Gas Station
// ================================================
// Circular gas stations, gas[i] = fuel gained, cost[i] = fuel to travel.
// Find starting station to complete the circuit, or return -1.

// ============================================
// APPROACH 1: Greedy - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[] gas = {1, 2, 3, 4, 5};
int[] cost = {3, 4, 5, 1, 2};

int totalTank = 0;
int currTank = 0;
int startStation = 0;

for (int i = 0; i < gas.length; i++) {
    int netGain = gas[i] - cost[i];
    totalTank += netGain;
    currTank += netGain;
    
    // Can't reach station i+1 from current start
    if (currTank < 0) {
        startStation = i + 1;
        currTank = 0;
    }
}

int result = totalTank >= 0 ? startStation : -1;
System.out.println("Gas Station: " + result);

// ============================================
// Key Insights
// ============================================
System.out.println("\nKey Insights:");
System.out.println("1. If total gas >= total cost, solution exists");
System.out.println("2. If we can't reach station i from start, start from i+1");
System.out.println("3. There's at most one valid starting station");

// ============================================
// Visualization
// ============================================
System.out.println("\nFor gas=[1,2,3,4,5], cost=[3,4,5,1,2]:");
System.out.println("Station 0: net=-2, can't start here");
System.out.println("Station 1: net=-2, can't start here");
System.out.println("Station 2: net=-2, can't start here");
System.out.println("Station 3: net=+3, good start!");
System.out.println("Station 4: net=+3");
System.out.println("Total net = 0, solution exists. Start at station 3.");
