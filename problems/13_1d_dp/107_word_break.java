// ================================================
// Problem 107: Word Break
// ================================================
// Given string s and dictionary wordDict, return true if s can be segmented
// into space-separated sequence of dictionary words.

// ============================================
// APPROACH 1: DP - O(n² * m) Time, O(n) Space ⭐ OPTIMAL
// ============================================
String s = "leetcode";
List<String> wordDict = Arrays.asList("leet", "code");
Set<String> dict = new HashSet<>(wordDict);

int n = s.length();
boolean[] dp = new boolean[n + 1];
dp[0] = true;  // Empty string

for (int i = 1; i <= n; i++) {
    for (int j = 0; j < i; j++) {
        if (dp[j] && dict.contains(s.substring(j, i))) {
            dp[i] = true;
            break;
        }
    }
}

System.out.println("Word Break: " + dp[n]);

// ============================================
// APPROACH 2: BFS - O(n² * m) Time, O(n) Space
// ============================================
String s2 = "leetcode";
Set<String> dict2 = new HashSet<>(Arrays.asList("leet", "code"));

Queue<Integer> queue = new LinkedList<>();
boolean[] visited = new boolean[s2.length() + 1];
queue.offer(0);
visited[0] = true;
boolean found = false;

while (!queue.isEmpty() && !found) {
    int start = queue.poll();
    
    for (int end = start + 1; end <= s2.length(); end++) {
        if (!visited[end] && dict2.contains(s2.substring(start, end))) {
            if (end == s2.length()) {
                found = true;
                break;
            }
            visited[end] = true;
            queue.offer(end);
        }
    }
}

System.out.println("Word Break (BFS): " + found);

// ============================================
// APPROACH 3: Memoization - O(n² * m) Time
// ============================================
System.out.println("\nMemoization approach:");
System.out.println("Recursive with memo to avoid recomputation");
