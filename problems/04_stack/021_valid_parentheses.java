// ================================================
// Problem 21: Valid Parentheses
// ================================================
// Given a string s containing just the characters '(', ')', '{', '}', 
// '[' and ']', determine if the input string is valid.

// ============================================
// APPROACH 1: Stack - O(n) Time, O(n) Space ⭐ OPTIMAL
// ============================================
String s = "()[]{}";
Stack<Character> stack = new Stack<>();
boolean isValid = true;

Map<Character, Character> pairs = new HashMap<>();
pairs.put(')', '(');
pairs.put('}', '{');
pairs.put(']', '[');

for (char c : s.toCharArray()) {
    if (pairs.containsKey(c)) {
        // Closing bracket
        if (stack.isEmpty() || stack.pop() != pairs.get(c)) {
            isValid = false;
            break;
        }
    } else {
        // Opening bracket
        stack.push(c);
    }
}

if (!stack.isEmpty()) {
    isValid = false;
}

System.out.println("Valid Parentheses (Stack): " + isValid);

// ============================================
// APPROACH 2: Replace Method - O(n²) Time, O(n) Space (Simpler but slower)
// ============================================
String s2 = "()[]{}";
String temp = s2;

while (temp.contains("()") || temp.contains("{}") || temp.contains("[]")) {
    temp = temp.replace("()", "");
    temp = temp.replace("{}", "");
    temp = temp.replace("[]", "");
}

boolean isValid2 = temp.isEmpty();
System.out.println("Valid Parentheses (Replace): " + isValid2);
