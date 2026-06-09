// ================================================
// Problem 19: Minimum Window Substring
// ================================================
// Given strings s and t, return the minimum window substring of s 
// such that every character in t (including duplicates) is included.

// ============================================
// APPROACH 1: Sliding Window with HashMap - O(n + m) Time, O(m) Space ⭐ OPTIMAL
// ============================================
String s = "ADOBECODEBANC";
String t = "ABC";

if (s.length() == 0 || t.length() == 0) {
    System.out.println("Minimum Window: \"\"");
} else {
    // Count characters needed from t
    Map<Character, Integer> need = new HashMap<>();
    for (char c : t.toCharArray()) {
        need.put(c, need.getOrDefault(c, 0) + 1);
    }
    
    Map<Character, Integer> window = new HashMap<>();
    int have = 0;
    int required = need.size();
    
    int left = 0;
    int minLen = Integer.MAX_VALUE;
    int minStart = 0;
    
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        window.put(c, window.getOrDefault(c, 0) + 1);
        
        // Check if we satisfied this character's requirement
        if (need.containsKey(c) && window.get(c).equals(need.get(c))) {
            have++;
        }
        
        // Try to shrink window while valid
        while (have == required) {
            // Update minimum
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
            }
            
            // Remove leftmost character
            char leftChar = s.charAt(left);
            window.put(leftChar, window.get(leftChar) - 1);
            
            if (need.containsKey(leftChar) && window.get(leftChar) < need.get(leftChar)) {
                have--;
            }
            
            left++;
        }
    }
    
    String result = minLen == Integer.MAX_VALUE ? "" : s.substring(minStart, minStart + minLen);
    System.out.println("Minimum Window (HashMap): \"" + result + "\"");
}

// ============================================
// APPROACH 2: Sliding Window with Array - O(n + m) Time, O(1) Space
// ============================================
String s2 = "ADOBECODEBANC";
String t2 = "ABC";

int[] need2 = new int[128]; // ASCII
int[] window2 = new int[128];

for (char c : t2.toCharArray()) {
    need2[c]++;
}

// Count unique characters needed
int required2 = 0;
for (int n : need2) {
    if (n > 0) required2++;
}

int left2 = 0;
int have2 = 0;
int minLen2 = Integer.MAX_VALUE;
int minStart2 = 0;

for (int right = 0; right < s2.length(); right++) {
    char c = s2.charAt(right);
    window2[c]++;
    
    if (need2[c] > 0 && window2[c] == need2[c]) {
        have2++;
    }
    
    while (have2 == required2) {
        if (right - left2 + 1 < minLen2) {
            minLen2 = right - left2 + 1;
            minStart2 = left2;
        }
        
        char leftChar = s2.charAt(left2);
        window2[leftChar]--;
        
        if (need2[leftChar] > 0 && window2[leftChar] < need2[leftChar]) {
            have2--;
        }
        
        left2++;
    }
}

String result2 = minLen2 == Integer.MAX_VALUE ? "" : s2.substring(minStart2, minStart2 + minLen2);
System.out.println("Minimum Window (Array): \"" + result2 + "\"");
