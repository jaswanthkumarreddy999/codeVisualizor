// ================================================
// Problem 97: Reconstruct Itinerary
// ================================================
// Given airline tickets, reconstruct itinerary starting from "JFK".
// Must use all tickets exactly once. Smallest lexical order if multiple.

// ============================================
// APPROACH 1: Hierholzer's Algorithm (Eulerian Path) - O(E log E) ⭐ OPTIMAL
// ============================================
List<List<String>> tickets = Arrays.asList(
    Arrays.asList("MUC", "LHR"),
    Arrays.asList("JFK", "MUC"),
    Arrays.asList("SFO", "SJC"),
    Arrays.asList("LHR", "SFO")
);

// Build adjacency list with sorted destinations
Map<String, PriorityQueue<String>> graph = new HashMap<>();
for (List<String> ticket : tickets) {
    graph.computeIfAbsent(ticket.get(0), k -> new PriorityQueue<>()).offer(ticket.get(1));
}

LinkedList<String> itinerary = new LinkedList<>();
dfsItinerary("JFK", graph, itinerary);

System.out.println("Itinerary: " + itinerary);

static void dfsItinerary(String airport, Map<String, PriorityQueue<String>> graph, 
                          LinkedList<String> result) {
    PriorityQueue<String> destinations = graph.get(airport);
    
    while (destinations != null && !destinations.isEmpty()) {
        dfsItinerary(destinations.poll(), graph, result);
    }
    
    result.addFirst(airport);  // Add in reverse order
}

// ============================================
// Key Insight
// ============================================
System.out.println("\nHierholzer's Algorithm:");
System.out.println("1. Use DFS with post-order traversal");
System.out.println("2. Add airport to result AFTER visiting all destinations");
System.out.println("3. Reverse gives correct order");
System.out.println("4. PriorityQueue ensures lexical order");
