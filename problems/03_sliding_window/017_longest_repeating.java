// ================================================
// Problem 17: Longest Repeating Character Replacement
// ================================================
// Given a string s and an integer k, you can change at most k characters
// to any other uppercase English letter. Return the length of the longest
// substring containing the same letter after performing the operations.

// ============================================
// APPROACH 1: Sliding Window with Frequency Count - O(26n) = O(n) Time, O(26) = O(1) Space
// ============================================
String s = "AABABBA";
int k = 1;
int maxLen = 0;

// Try each character as the target
for (char target = 'A'; target <= 'Z'; target++) {
    int left = 0;
    int changes = 0;
    
    for (int right = 0; right < s.length(); right++) {
        if (s.charAt(right) != target) {
            changes++;
        }
        
        // Shrink window if too many changes needed
        while (changes > k) {
            if (s.charAt(left) != target) {
                changes--;
            }
            left++;
        }
        
        maxLen = Math.max(maxLen, right - left + 1);
    }
}

System.out.println("Longest Repeating (Per Character): " + maxLen);

// ============================================
// APPROACH 2: Sliding Window - Track Max Frequency - O(n) Time, O(26) = O(1) Space ⭐ OPTIMAL
// ============================================
String s2 = "AABABBA";
int k2 = 1;

int[] count = new int[26];
int left2 = 0;
int maxFreq = 0;  // Max frequency of any character in current window
int maxLen2 = 0;

for (int right = 0; right < s2.length(); right++) {
    count[s2.charAt(right) - 'A']++;
    maxFreq = Math.max(maxFreq, count[s2.charAt(right) - 'A']);
    
    // Window size - max frequency = characters to change
    // If > k, shrink window
    int windowSize = right - left2 + 1;
    if (windowSize - maxFreq > k2) {
        count[s2.charAt(left2) - 'A']--;
        left2++;
    }
    
    maxLen2 = Math.max(maxLen2, right - left2 + 1);
}

System.out.println("Longest Repeating (Max Freq): " + maxLen2);
