// ================================================
// Problem 87: Course Schedule
// ================================================
// There are numCourses courses and prerequisites. Determine if you can 
// finish all courses. prerequisites[i] = [a, b] means take b before a.

// ============================================
// APPROACH 1: DFS Cycle Detection - O(V + E) Time, O(V + E) Space ⭐ OPTIMAL
// ============================================
int numCourses = 4;
int[][] prerequisites = {{1, 0}, {2, 1}, {3, 2}};

// Build adjacency list
List<List<Integer>> graph = new ArrayList<>();
for (int i = 0; i < numCourses; i++) {
    graph.add(new ArrayList<>());
}
for (int[] pre : prerequisites) {
    graph.get(pre[1]).add(pre[0]);  // b -> a
}

// 0 = unvisited, 1 = visiting, 2 = visited
int[] state = new int[numCourses];
boolean canFinish = true;

for (int i = 0; i < numCourses && canFinish; i++) {
    if (state[i] == 0) {
        canFinish = dfs(graph, i, state);
    }
}

System.out.println("Can finish all courses: " + canFinish);

static boolean dfs(List<List<Integer>> graph, int course, int[] state) {
    state[course] = 1;  // Visiting
    
    for (int next : graph.get(course)) {
        if (state[next] == 1) return false;  // Cycle detected
        if (state[next] == 0) {
            if (!dfs(graph, next, state)) return false;
        }
    }
    
    state[course] = 2;  // Visited
    return true;
}

// ============================================
// APPROACH 2: BFS Topological Sort (Kahn's) - O(V + E) Time, O(V + E) Space
// ============================================
int numCourses2 = 4;
int[][] prerequisites2 = {{1, 0}, {2, 1}, {3, 2}};

// Build graph and indegree array
List<List<Integer>> graph2 = new ArrayList<>();
int[] indegree = new int[numCourses2];

for (int i = 0; i < numCourses2; i++) {
    graph2.add(new ArrayList<>());
}
for (int[] pre : prerequisites2) {
    graph2.get(pre[1]).add(pre[0]);
    indegree[pre[0]]++;
}

// Start with courses that have no prerequisites
Queue<Integer> queue = new LinkedList<>();
for (int i = 0; i < numCourses2; i++) {
    if (indegree[i] == 0) queue.offer(i);
}

int completed = 0;
while (!queue.isEmpty()) {
    int course = queue.poll();
    completed++;
    
    for (int next : graph2.get(course)) {
        indegree[next]--;
        if (indegree[next] == 0) {
            queue.offer(next);
        }
    }
}

boolean canFinish2 = (completed == numCourses2);
System.out.println("Can finish (BFS): " + canFinish2);
