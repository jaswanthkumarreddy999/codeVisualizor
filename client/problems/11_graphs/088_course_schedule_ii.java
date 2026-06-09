// ================================================
// Problem 88: Course Schedule II
// ================================================
// Return the order of courses to finish all courses. Return empty if impossible.

// ============================================
// APPROACH 1: BFS Topological Sort (Kahn's) - O(V + E) Time ⭐ OPTIMAL
// ============================================
int numCourses = 4;
int[][] prerequisites = {{1, 0}, {2, 0}, {3, 1}, {3, 2}};

// Build graph and indegree
List<List<Integer>> graph = new ArrayList<>();
int[] indegree = new int[numCourses];

for (int i = 0; i < numCourses; i++) {
    graph.add(new ArrayList<>());
}
for (int[] pre : prerequisites) {
    graph.get(pre[1]).add(pre[0]);
    indegree[pre[0]]++;
}

// BFS with indegree 0 nodes
Queue<Integer> queue = new LinkedList<>();
for (int i = 0; i < numCourses; i++) {
    if (indegree[i] == 0) queue.offer(i);
}

int[] order = new int[numCourses];
int idx = 0;

while (!queue.isEmpty()) {
    int course = queue.poll();
    order[idx++] = course;
    
    for (int next : graph.get(course)) {
        indegree[next]--;
        if (indegree[next] == 0) {
            queue.offer(next);
        }
    }
}

if (idx == numCourses) {
    System.out.println("Course Order: " + Arrays.toString(order));
} else {
    System.out.println("Impossible - cycle detected");
}

// ============================================
// APPROACH 2: DFS Topological Sort - O(V + E) Time
// ============================================
System.out.println("\nDFS Approach:");
System.out.println("1. Use 3-state coloring (white, gray, black)");
System.out.println("2. Post-order traversal gives reverse topological order");
System.out.println("3. Detect cycle if we visit a gray node");

/*
int[] findOrderDFS(int numCourses, int[][] prerequisites) {
    // Build graph
    List<List<Integer>> graph = buildGraph(numCourses, prerequisites);
    
    int[] state = new int[numCourses]; // 0=white, 1=gray, 2=black
    List<Integer> order = new ArrayList<>();
    
    for (int i = 0; i < numCourses; i++) {
        if (state[i] == 0) {
            if (!dfs(graph, i, state, order)) {
                return new int[0]; // Cycle detected
            }
        }
    }
    
    Collections.reverse(order);
    return order.stream().mapToInt(i -> i).toArray();
}
*/
