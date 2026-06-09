// ================================================
// Problem 23: Evaluate Reverse Polish Notation
// ================================================
// Evaluate the value of an arithmetic expression in Reverse Polish Notation.
// Valid operators are +, -, *, /. Integer division truncates toward zero.

// ============================================
// APPROACH 1: Stack - O(n) Time, O(n) Space ⭐ OPTIMAL
// ============================================
String[] tokens = {"2", "1", "+", "3", "*"};
Stack<Integer> stack = new Stack<>();

for (String token : tokens) {
    if (token.equals("+")) {
        int b = stack.pop();
        int a = stack.pop();
        stack.push(a + b);
    } else if (token.equals("-")) {
        int b = stack.pop();
        int a = stack.pop();
        stack.push(a - b);
    } else if (token.equals("*")) {
        int b = stack.pop();
        int a = stack.pop();
        stack.push(a * b);
    } else if (token.equals("/")) {
        int b = stack.pop();
        int a = stack.pop();
        stack.push(a / b);  // Integer division
    } else {
        stack.push(Integer.parseInt(token));
    }
}

int result = stack.pop();
System.out.println("RPN Result: " + result);  // (2 + 1) * 3 = 9

// ============================================
// Example 2: More complex expression
// ============================================
String[] tokens2 = {"4", "13", "5", "/", "+"};
Stack<Integer> stack2 = new Stack<>();

for (String token : tokens2) {
    if (token.equals("+") || token.equals("-") || token.equals("*") || token.equals("/")) {
        int b = stack2.pop();
        int a = stack2.pop();
        int res = 0;
        switch (token) {
            case "+": res = a + b; break;
            case "-": res = a - b; break;
            case "*": res = a * b; break;
            case "/": res = a / b; break;
        }
        stack2.push(res);
    } else {
        stack2.push(Integer.parseInt(token));
    }
}

int result2 = stack2.pop();
System.out.println("RPN Result 2: " + result2);  // 4 + (13 / 5) = 4 + 2 = 6
