// ================================================
// Problem 2: Valid Anagram
// ================================================
// Given two strings s and t, return true if t is an anagram of s, 
// and false otherwise.

// ============================================
// APPROACH 1: Sorting - O(n log n) Time, O(n) Space
// ============================================
String s1 = "anagram";
String t1 = "nagaram";

char[] sArr = s1.toCharArray();
char[] tArr = t1.toCharArray();
Arrays.sort(sArr);
Arrays.sort(tArr);

boolean isAnagram1 = Arrays.equals(sArr, tArr);
System.out.println("Valid Anagram (Sorting): " + isAnagram1);

// ============================================
// APPROACH 2: HashMap - O(n) Time, O(n) Space
// ============================================
String s2 = "anagram";
String t2 = "nagaram";

if (s2.length() != t2.length()) {
    System.out.println("Valid Anagram (HashMap): false");
} else {
    Map<Character, Integer> count = new HashMap<>();
    
    // Count characters in s
    for (char c : s2.toCharArray()) {
        count.put(c, count.getOrDefault(c, 0) + 1);
    }
    
    // Subtract characters in t
    for (char c : t2.toCharArray()) {
        count.put(c, count.getOrDefault(c, 0) - 1);
    }
    
    // Check if all counts are zero
    boolean isAnagram2 = true;
    for (int val : count.values()) {
        if (val != 0) {
            isAnagram2 = false;
            break;
        }
    }
    System.out.println("Valid Anagram (HashMap): " + isAnagram2);
}

// ============================================
// APPROACH 3: Array[26] - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
// Use fixed array for lowercase letters only
String s3 = "anagram";
String t3 = "nagaram";

int[] charCount = new int[26];

for (char c : s3.toCharArray()) {
    charCount[c - 'a']++;
}

for (char c : t3.toCharArray()) {
    charCount[c - 'a']--;
}

boolean isAnagram3 = true;
for (int count : charCount) {
    if (count != 0) {
        isAnagram3 = false;
        break;
    }
}

System.out.println("Valid Anagram (Array[26]): " + isAnagram3);
