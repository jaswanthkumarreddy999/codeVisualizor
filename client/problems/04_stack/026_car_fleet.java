// ================================================
// Problem 26: Car Fleet
// ================================================
// There are n cars heading to the same destination. Each car has a 
// position and speed. A car fleet is a group of cars that travel at 
// the same speed. Return the number of car fleets.

// ============================================
// APPROACH 1: Sort + Stack - O(n log n) Time, O(n) Space ⭐ OPTIMAL
// ============================================
int target = 12;
int[] position = {10, 8, 0, 5, 3};
int[] speed = {2, 4, 1, 1, 3};

// Pair positions with speeds and sort by position descending
int n = position.length;
int[][] cars = new int[n][2];
for (int i = 0; i < n; i++) {
    cars[i][0] = position[i];
    cars[i][1] = speed[i];
}

// Sort by position in descending order (cars closer to target first)
Arrays.sort(cars, (a, b) -> b[0] - a[0]);

// Calculate time to reach target for each car
double[] timeToTarget = new double[n];
for (int i = 0; i < n; i++) {
    timeToTarget[i] = (double)(target - cars[i][0]) / cars[i][1];
}

// Stack to count fleets
Stack<Double> fleets = new Stack<>();

for (double time : timeToTarget) {
    // If current car takes longer than fleet at top, it forms new fleet
    // Otherwise, it joins the existing fleet
    if (fleets.isEmpty() || time > fleets.peek()) {
        fleets.push(time);
    }
    // If time <= fleets.peek(), car catches up and joins that fleet
}

System.out.println("Car Fleet (Stack): " + fleets.size());

// ============================================
// APPROACH 2: Sort + Counter - O(n log n) Time, O(n) Space
// ============================================
int target2 = 12;
int[] position2 = {10, 8, 0, 5, 3};
int[] speed2 = {2, 4, 1, 1, 3};

int n2 = position2.length;
double[][] carsWithTime = new double[n2][2];
for (int i = 0; i < n2; i++) {
    carsWithTime[i][0] = position2[i];
    carsWithTime[i][1] = (double)(target2 - position2[i]) / speed2[i];
}

// Sort by position descending
Arrays.sort(carsWithTime, (a, b) -> Double.compare(b[0], a[0]));

int fleetCount = 0;
double maxTime = 0;

for (int i = 0; i < n2; i++) {
    if (carsWithTime[i][1] > maxTime) {
        fleetCount++;
        maxTime = carsWithTime[i][1];
    }
}

System.out.println("Car Fleet (Counter): " + fleetCount);
