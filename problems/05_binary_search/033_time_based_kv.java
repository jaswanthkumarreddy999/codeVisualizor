// ================================================
// Problem 33: Time Based Key-Value Store
// ================================================
// Design a time-based key-value data structure that can store multiple 
// values for the same key at different timestamps and retrieve the 
// value at a certain timestamp.

// ============================================
// APPROACH 1: HashMap + Binary Search - O(1) set, O(log n) get ⭐ OPTIMAL
// ============================================
// Using HashMap where value is list of [timestamp, value] pairs
Map<String, List<int[]>> store = new HashMap<>();

// SET operation
String key1 = "foo";
String val1 = "bar";
int timestamp1 = 1;

if (!store.containsKey(key1)) {
    store.put(key1, new ArrayList<>());
}
// Store as integer for simplicity (in real impl, store string)
store.get(key1).add(new int[]{timestamp1, 1}); // 1 represents "bar"

// Another set
String key2 = "foo";
String val2 = "bar2";
int timestamp2 = 4;
store.get(key2).add(new int[]{timestamp2, 2}); // 2 represents "bar2"

// GET operation using binary search
String getKey = "foo";
int getTimestamp = 3;

List<int[]> values = store.get(getKey);
int left = 0, right = values.size() - 1;
int result = -1;  // -1 means no value found

while (left <= right) {
    int mid = left + (right - left) / 2;
    
    if (values.get(mid)[0] <= getTimestamp) {
        result = values.get(mid)[1];  // Candidate result
        left = mid + 1;               // Look for closer timestamp
    } else {
        right = mid - 1;
    }
}

System.out.println("TimeMap get(foo, 3): " + result); // Should be 1 (bar)

// ============================================
// APPROACH 2: HashMap + TreeMap - O(1) set, O(log n) get
// ============================================
Map<String, TreeMap<Integer, String>> store2 = new HashMap<>();

// SET
store2.put("foo", new TreeMap<>());
store2.get("foo").put(1, "bar");
store2.get("foo").put(4, "bar2");

// GET using TreeMap's floorEntry
TreeMap<Integer, String> timeMap = store2.get("foo");
Map.Entry<Integer, String> entry = timeMap.floorEntry(3);
String result2 = (entry != null) ? entry.getValue() : "";

System.out.println("TimeMap TreeMap get(foo, 3): " + result2);

// GET at exact timestamp
Map.Entry<Integer, String> entry2 = timeMap.floorEntry(4);
String result3 = (entry2 != null) ? entry2.getValue() : "";

System.out.println("TimeMap TreeMap get(foo, 4): " + result3);
