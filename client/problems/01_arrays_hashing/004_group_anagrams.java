// ================================================
// Problem 4: Group Anagrams
// ================================================
// Given an array of strings strs, group the anagrams together.
// You can return the answer in any order.

// ============================================
// APPROACH 1: Sorted String as Key - O(n * k log k) Time, O(n * k) Space
// ============================================
// k = average length of strings
String[] strs = {"eat", "tea", "tan", "ate", "nat", "bat"};
Map<String, List<String>> groups = new HashMap<>();

for (String s : strs) {
    // Sort characters to create key
    char[] chars = s.toCharArray();
    Arrays.sort(chars);
    String key = new String(chars);
    
    // Add to group
    if (!groups.containsKey(key)) {
        groups.put(key, new ArrayList<>());
    }
    groups.get(key).add(s);
}

System.out.println("Group Anagrams (Sorted Key):");
for (List<String> group : groups.values()) {
    System.out.println("  " + group);
}

// ============================================
// APPROACH 2: Character Count as Key - O(n * k) Time, O(n * k) Space ⭐ OPTIMAL
// ============================================
// Use character frequency as key (avoids sorting)
String[] strs2 = {"eat", "tea", "tan", "ate", "nat", "bat"};
Map<String, List<String>> groups2 = new HashMap<>();

for (String s : strs2) {
    // Count characters
    int[] count = new int[26];
    for (char c : s.toCharArray()) {
        count[c - 'a']++;
    }
    
    // Create key from count array
    StringBuilder keyBuilder = new StringBuilder();
    for (int i = 0; i < 26; i++) {
        keyBuilder.append('#');
        keyBuilder.append(count[i]);
    }
    String key = keyBuilder.toString();
    
    // Add to group
    if (!groups2.containsKey(key)) {
        groups2.put(key, new ArrayList<>());
    }
    groups2.get(key).add(s);
}

System.out.println("\nGroup Anagrams (Count Key):");
for (List<String> group : groups2.values()) {
    System.out.println("  " + group);
}
