// ================================================
// Problem 18: Permutation in String
// ================================================
// Given two strings s1 and s2, return true if s2 contains a 
// permutation of s1 (s2 contains a substring that is an anagram of s1).

// ============================================
// APPROACH 1: Sorting with Sliding Window - O(n * m log m) Time, O(m) Space
// ============================================
String s1 = "ab";
String s2 = "eidbaooo";

char[] s1Sorted = s1.toCharArray();
Arrays.sort(s1Sorted);
String s1SortedStr = new String(s1Sorted);

boolean found1 = false;
for (int i = 0; i <= s2.length() - s1.length(); i++) {
    char[] window = s2.substring(i, i + s1.length()).toCharArray();
    Arrays.sort(window);
    if (new String(window).equals(s1SortedStr)) {
        found1 = true;
        break;
    }
}

System.out.println("Permutation (Sorting): " + found1);

// ============================================
// APPROACH 2: Sliding Window with HashMap - O(n) Time, O(26) = O(1) Space ⭐ OPTIMAL
// ============================================
String s1b = "ab";
String s2b = "eidbaooo";

if (s1b.length() > s2b.length()) {
    System.out.println("Permutation (HashMap): false");
} else {
    // Count characters in s1
    Map<Character, Integer> s1Count = new HashMap<>();
    Map<Character, Integer> windowCount = new HashMap<>();
    
    for (char c : s1b.toCharArray()) {
        s1Count.put(c, s1Count.getOrDefault(c, 0) + 1);
    }
    
    int left = 0;
    boolean found2 = false;
    
    for (int right = 0; right < s2b.length(); right++) {
        char c = s2b.charAt(right);
        windowCount.put(c, windowCount.getOrDefault(c, 0) + 1);
        
        // Shrink window if too large
        if (right - left + 1 > s1b.length()) {
            char leftChar = s2b.charAt(left);
            windowCount.put(leftChar, windowCount.get(leftChar) - 1);
            if (windowCount.get(leftChar) == 0) {
                windowCount.remove(leftChar);
            }
            left++;
        }
        
        // Check if window matches s1
        if (windowCount.equals(s1Count)) {
            found2 = true;
            break;
        }
    }
    
    System.out.println("Permutation (HashMap): " + found2);
}

// ============================================
// APPROACH 3: Sliding Window with Array - O(n) Time, O(1) Space
// ============================================
String s1c = "ab";
String s2c = "eidbaooo";

int[] s1Freq = new int[26];
int[] windowFreq = new int[26];

for (char c : s1c.toCharArray()) {
    s1Freq[c - 'a']++;
}

int left3 = 0;
boolean found3 = false;

for (int right = 0; right < s2c.length(); right++) {
    windowFreq[s2c.charAt(right) - 'a']++;
    
    if (right - left3 + 1 > s1c.length()) {
        windowFreq[s2c.charAt(left3) - 'a']--;
        left3++;
    }
    
    if (Arrays.equals(s1Freq, windowFreq)) {
        found3 = true;
        break;
    }
}

System.out.println("Permutation (Array): " + found3);
