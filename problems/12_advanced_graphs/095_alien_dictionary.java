// ================================================
// Problem 95: Alien Dictionary
// ================================================
// Given sorted list of words from alien language, derive letter ordering.

// ============================================
// APPROACH 1: Topological Sort (BFS) - O(C) Time where C = total chars ⭐ OPTIMAL
// ============================================
String[] words = {"wrt", "wrf", "er", "ett", "rftt"};

// Build graph from adjacent word pairs
Map<Character, Set<Character>> graph = new HashMap<>();
Map<Character, Integer> indegree = new HashMap<>();

// Initialize all characters
for (String word : words) {
    for (char c : word.toCharArray()) {
        graph.putIfAbsent(c, new HashSet<>());
        indegree.putIfAbsent(c, 0);
    }
}

// Compare adjacent words to find ordering
boolean invalid = false;
for (int i = 0; i < words.length - 1 && !invalid; i++) {
    String w1 = words[i], w2 = words[i + 1];
    
    // Check for invalid case: prefix is longer
    if (w1.length() > w2.length() && w1.startsWith(w2)) {
        invalid = true;
        break;
    }
    
    // Find first different character
    for (int j = 0; j < Math.min(w1.length(), w2.length()); j++) {
        char c1 = w1.charAt(j), c2 = w2.charAt(j);
        if (c1 != c2) {
            if (!graph.get(c1).contains(c2)) {
                graph.get(c1).add(c2);
                indegree.put(c2, indegree.get(c2) + 1);
            }
            break;
        }
    }
}

// Topological sort
StringBuilder order = new StringBuilder();
Queue<Character> queue = new LinkedList<>();

for (char c : indegree.keySet()) {
    if (indegree.get(c) == 0) queue.offer(c);
}

while (!queue.isEmpty()) {
    char c = queue.poll();
    order.append(c);
    
    for (char next : graph.get(c)) {
        indegree.put(next, indegree.get(next) - 1);
        if (indegree.get(next) == 0) queue.offer(next);
    }
}

String result = order.length() == indegree.size() ? order.toString() : "";
System.out.println("Alien Dictionary: " + result);
