// ================================================
// Problem 68: Task Scheduler
// ================================================
// Given tasks and cooldown n, return minimum time to finish all tasks.

// ============================================
// APPROACH 1: Greedy with Max Heap - O(n log 26) Time ⭐ OPTIMAL
// ============================================
char[] tasks = {'A', 'A', 'A', 'B', 'B', 'B'};
int n = 2;  // Cooldown

// Count frequency of each task
int[] freq = new int[26];
for (char task : tasks) {
    freq[task - 'A']++;
}

// Max heap based on frequency
PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);
for (int f : freq) {
    if (f > 0) maxHeap.offer(f);
}

int time = 0;
while (!maxHeap.isEmpty()) {
    List<Integer> temp = new ArrayList<>();
    int cycle = n + 1;  // Each cycle is n+1 slots
    
    while (cycle > 0 && !maxHeap.isEmpty()) {
        int f = maxHeap.poll();
        if (f > 1) {
            temp.add(f - 1);
        }
        time++;
        cycle--;
    }
    
    for (int f : temp) {
        maxHeap.offer(f);
    }
    
    // Add idle time if more tasks remain
    if (!maxHeap.isEmpty()) {
        time += cycle;  // Remaining cycle slots are idle
    }
}

System.out.println("Task Scheduler - Minimum time: " + time);

// ============================================
// APPROACH 2: Math Formula - O(n) Time, O(26) Space ⭐ OPTIMAL
// ============================================
char[] tasks2 = {'A', 'A', 'A', 'B', 'B', 'B'};
int n2 = 2;

int[] freq2 = new int[26];
int maxFreq = 0;
int maxCount = 0;

for (char task : tasks2) {
    freq2[task - 'A']++;
    if (freq2[task - 'A'] > maxFreq) {
        maxFreq = freq2[task - 'A'];
        maxCount = 1;
    } else if (freq2[task - 'A'] == maxFreq) {
        maxCount++;
    }
}

// Formula: (maxFreq - 1) * (n + 1) + maxCount
int partCount = maxFreq - 1;
int partLength = n2 + 1;
int emptySlots = partCount * partLength + maxCount;

int result = Math.max(tasks2.length, emptySlots);
System.out.println("Task Scheduler (Math): " + result);
