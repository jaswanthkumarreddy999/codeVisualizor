// ================================================
// Problem 25: Daily Temperatures
// ================================================
// Given an array of integers temperatures, return an array answer such that
// answer[i] is the number of days you have to wait after day i to get a 
// warmer temperature.

// ============================================
// APPROACH 1: Brute Force - O(n²) Time, O(1) Space
// ============================================
int[] temperatures = {73, 74, 75, 71, 69, 72, 76, 73};
int[] answer1 = new int[temperatures.length];

for (int i = 0; i < temperatures.length; i++) {
    for (int j = i + 1; j < temperatures.length; j++) {
        if (temperatures[j] > temperatures[i]) {
            answer1[i] = j - i;
            break;
        }
    }
}

System.out.println("Daily Temperatures (Brute Force): " + Arrays.toString(answer1));

// ============================================
// APPROACH 2: Monotonic Stack - O(n) Time, O(n) Space ⭐ OPTIMAL
// ============================================
// Stack stores indices of temperatures in decreasing order
int[] temperatures2 = {73, 74, 75, 71, 69, 72, 76, 73};
int[] answer2 = new int[temperatures2.length];
Stack<Integer> stack = new Stack<>();

for (int i = 0; i < temperatures2.length; i++) {
    // Pop all temperatures smaller than current
    while (!stack.isEmpty() && temperatures2[i] > temperatures2[stack.peek()]) {
        int prevIndex = stack.pop();
        answer2[prevIndex] = i - prevIndex;
    }
    stack.push(i);
}

System.out.println("Daily Temperatures (Stack): " + Arrays.toString(answer2));

// ============================================
// APPROACH 3: Iterate from Right - O(n) Time, O(1) Space
// ============================================
int[] temperatures3 = {73, 74, 75, 71, 69, 72, 76, 73};
int[] answer3 = new int[temperatures3.length];

for (int i = temperatures3.length - 2; i >= 0; i--) {
    int j = i + 1;
    
    while (j < temperatures3.length) {
        if (temperatures3[j] > temperatures3[i]) {
            answer3[i] = j - i;
            break;
        } else if (answer3[j] == 0) {
            // No warmer day after j
            answer3[i] = 0;
            break;
        } else {
            // Jump to the next warmer day after j
            j += answer3[j];
        }
    }
}

System.out.println("Daily Temperatures (Right Iterate): " + Arrays.toString(answer3));
