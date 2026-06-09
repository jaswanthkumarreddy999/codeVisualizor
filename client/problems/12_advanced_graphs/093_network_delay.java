// ================================================
// Problem 93: Network Delay Time (Dijkstra's)
// ================================================
// n nodes, times[i] = [u, v, w] means signal from u to v takes w time.
// Return time for all nodes to receive signal from source k. Return -1 if impossible.

// ============================================
// APPROACH 1: Dijkstra's Algorithm - O((V+E) log V) Time ⭐ OPTIMAL
// ============================================
int[][] times = {{2, 1, 1}, {2, 3, 1}, {3, 4, 1}};
int n = 4, k = 2;

// Build adjacency list
List<List<int[]>> graph = new ArrayList<>();
for (int i = 0; i <= n; i++) graph.add(new ArrayList<>());
for (int[] time : times) {
    graph.get(time[0]).add(new int[]{time[1], time[2]});
}

// Min heap: [time, node]
PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
int[] dist = new int[n + 1];
Arrays.fill(dist, Integer.MAX_VALUE);

pq.offer(new int[]{0, k});
dist[k] = 0;

while (!pq.isEmpty()) {
    int[] curr = pq.poll();
    int currTime = curr[0];
    int node = curr[1];
    
    if (currTime > dist[node]) continue;
    
    for (int[] neighbor : graph.get(node)) {
        int nextNode = neighbor[0];
        int weight = neighbor[1];
        int newDist = currTime + weight;
        
        if (newDist < dist[nextNode]) {
            dist[nextNode] = newDist;
            pq.offer(new int[]{newDist, nextNode});
        }
    }
}

int maxTime = 0;
for (int i = 1; i <= n; i++) {
    if (dist[i] == Integer.MAX_VALUE) {
        maxTime = -1;
        break;
    }
    maxTime = Math.max(maxTime, dist[i]);
}

System.out.println("Network Delay Time: " + maxTime);

// ============================================
// APPROACH 2: Bellman-Ford - O(V * E) Time
// ============================================
System.out.println("\nBellman-Ford (handles negative weights):");
System.out.println("Relax all edges V-1 times");

/*
int networkDelayBellmanFord(int[][] times, int n, int k) {
    int[] dist = new int[n + 1];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[k] = 0;
    
    for (int i = 0; i < n - 1; i++) {
        for (int[] time : times) {
            int u = time[0], v = time[1], w = time[2];
            if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    
    int maxTime = 0;
    for (int i = 1; i <= n; i++) {
        if (dist[i] == Integer.MAX_VALUE) return -1;
        maxTime = Math.max(maxTime, dist[i]);
    }
    return maxTime;
}
*/
