// ================================================
// Problem 10: Valid Palindrome
// ================================================
// A phrase is a palindrome if, after converting all uppercase letters to 
// lowercase and removing all non-alphanumeric characters, it reads the 
// same forward and backward.

// ============================================
// APPROACH 1: Two Pointers - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
String s = "A man, a plan, a canal: Panama";
int left = 0;
int right = s.length() - 1;
boolean isPalindrome1 = true;

while (left < right) {
    // Skip non-alphanumeric from left
    while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
        left++;
    }
    // Skip non-alphanumeric from right
    while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
        right--;
    }
    
    // Compare characters (case-insensitive)
    if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
        isPalindrome1 = false;
        break;
    }
    
    left++;
    right--;
}

System.out.println("Valid Palindrome (Two Pointers): " + isPalindrome1);

// ============================================
// APPROACH 2: Filter + Reverse - O(n) Time, O(n) Space
// ============================================
String s2 = "A man, a plan, a canal: Panama";
StringBuilder filtered = new StringBuilder();

for (char c : s2.toCharArray()) {
    if (Character.isLetterOrDigit(c)) {
        filtered.append(Character.toLowerCase(c));
    }
}

String original = filtered.toString();
String reversed = filtered.reverse().toString();
boolean isPalindrome2 = original.equals(reversed);

System.out.println("Valid Palindrome (Filter + Reverse): " + isPalindrome2);
