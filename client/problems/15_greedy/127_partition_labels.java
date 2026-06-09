// ================================================
// Problem 127: Partition Labels
// ================================================
// Partition string so that each letter appears in at most one part.
// Return list of sizes of these parts.

// ============================================
// APPROACH 1: Greedy with Last Occurrence - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
String s = "ababcbacadefegdehijhklij";

// Find last occurrence of each character
int[] lastIdx = new int[26];
for (int i = 0; i < s.length(); i++) {
    lastIdx[s.charAt(i) - 'a'] = i;
}

List<Integer> result = new ArrayList<>();
int partitionEnd = 0;
int partitionStart = 0;

for (int i = 0; i < s.length(); i++) {
    partitionEnd = Math.max(partitionEnd, lastIdx[s.charAt(i) - 'a']);
    
    // Found end of current partition
    if (i == partitionEnd) {
        result.add(partitionEnd - partitionStart + 1);
        partitionStart = i + 1;
    }
}

System.out.println("Partition Labels: " + result);

// ============================================
// Visualization
// ============================================
System.out.println("\nFor 'ababcbacadefegdehijhklij':");
System.out.println("Partition 1: 'ababcbaca' (size 9)");
System.out.println("  - 'a' last at index 8, so partition ends at 8");
System.out.println("Partition 2: 'defegde' (size 7)");
System.out.println("  - 'd','e' determine end at index 15");
System.out.println("Partition 3: 'hijhklij' (size 8)");
System.out.println("  - 'i','j' determine end at index 23");
