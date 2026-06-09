// ================================================
// Problem 43: LRU Cache
// ================================================
// Design LRU (Least Recently Used) cache with get and put in O(1).

// ============================================
// APPROACH 1: HashMap + Doubly Linked List - O(1) Time ⭐ OPTIMAL
// ============================================
System.out.println("LRU Cache Implementation:");

/*
class LRUCache {
    private int capacity;
    private Map<Integer, Node> cache;
    private Node head, tail;  // Dummy nodes
    
    class Node {
        int key, value;
        Node prev, next;
        Node(int k, int v) { key = k; value = v; }
    }
    
    public LRUCache(int capacity) {
        this.capacity = capacity;
        cache = new HashMap<>();
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }
    
    public int get(int key) {
        if (!cache.containsKey(key)) return -1;
        
        Node node = cache.get(key);
        remove(node);
        insertAtHead(node);
        return node.value;
    }
    
    public void put(int key, int value) {
        if (cache.containsKey(key)) {
            remove(cache.get(key));
        }
        
        Node node = new Node(key, value);
        cache.put(key, node);
        insertAtHead(node);
        
        if (cache.size() > capacity) {
            Node lru = tail.prev;
            remove(lru);
            cache.remove(lru.key);
        }
    }
    
    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    
    private void insertAtHead(Node node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }
}
*/

// ============================================
// APPROACH 2: LinkedHashMap - O(1) Time (Java built-in)
// ============================================
System.out.println("\nLinkedHashMap (built-in):");

/*
class LRUCacheSimple extends LinkedHashMap<Integer, Integer> {
    private int capacity;
    
    public LRUCacheSimple(int capacity) {
        super(capacity, 0.75f, true);  // accessOrder = true
        this.capacity = capacity;
    }
    
    public int get(int key) {
        return super.getOrDefault(key, -1);
    }
    
    public void put(int key, int value) {
        super.put(key, value);
    }
    
    @Override
    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        return size() > capacity;
    }
}
*/

// ============================================
// Visualization
// ============================================
System.out.println("\nExample with capacity = 2:");
System.out.println("put(1, 1) -> cache: {1=1}");
System.out.println("put(2, 2) -> cache: {1=1, 2=2}");
System.out.println("get(1)    -> returns 1, cache: {2=2, 1=1}");
System.out.println("put(3, 3) -> evicts 2, cache: {1=1, 3=3}");
System.out.println("get(2)    -> returns -1 (not found)");
