// ================================================
// Problem 16: Longest Substring Without Repeating Characters
// ================================================
// Given a string s, find the length of the longest substring 
// without repeating characters.

// ============================================
// APPROACH 1: Brute Force - O(n³) Time, O(min(n, m)) Space
// ============================================
String s = "abcabcbb";
int maxLen1 = 0;

for (int i = 0; i < s.length(); i++) {
    Set<Character> seen = new HashSet<>();
    for (int j = i; j < s.length(); j++) {
        if (seen.contains(s.charAt(j))) {
            break;
        }
        seen.add(s.charAt(j));
        maxLen1 = Math.max(maxLen1, j - i + 1);
    }
}

System.out.println("Longest Substring (Brute Force): " + maxLen1);

// ============================================
// APPROACH 2: Sliding Window + HashSet - O(n) Time, O(min(n, m)) Space ⭐ OPTIMAL
// ============================================
String s2 = "abcabcbb";
Set<Character> charSet = new HashSet<>();
int left = 0;
int maxLen2 = 0;

for (int right = 0; right < s2.length(); right++) {
    // Shrink window until no duplicates
    while (charSet.contains(s2.charAt(right))) {
        charSet.remove(s2.charAt(left));
        left++;
    }
    
    charSet.add(s2.charAt(right));
    maxLen2 = Math.max(maxLen2, right - left + 1);
}

System.out.println("Longest Substring (Sliding Window): " + maxLen2);

// ============================================
// APPROACH 3: Sliding Window + HashMap (Jump) - O(n) Time, O(min(n, m)) Space
// ============================================
// Store last index of each character to jump directly
String s3 = "abcabcbb";
Map<Character, Integer> lastIndex = new HashMap<>();
int left3 = 0;
int maxLen3 = 0;

for (int right = 0; right < s3.length(); right++) {
    char c = s3.charAt(right);
    
    if (lastIndex.containsKey(c) && lastIndex.get(c) >= left3) {
        left3 = lastIndex.get(c) + 1;
    }
    
    lastIndex.put(c, right);
    maxLen3 = Math.max(maxLen3, right - left3 + 1);
}

System.out.println("Longest Substring (HashMap Jump): " + maxLen3);
