// ================================================
// Problem 78: Letter Combinations of a Phone Number
// ================================================
// Given a string containing digits 2-9, return all possible letter combinations.

// ============================================
// APPROACH 1: Backtracking - O(4^n) Time, O(n) Space ⭐ OPTIMAL
// ============================================
String digits = "23";

Map<Character, String> phone = new HashMap<>();
phone.put('2', "abc");
phone.put('3', "def");
phone.put('4', "ghi");
phone.put('5', "jkl");
phone.put('6', "mno");
phone.put('7', "pqrs");
phone.put('8', "tuv");
phone.put('9', "wxyz");

List<String> result = new ArrayList<>();
if (!digits.isEmpty()) {
    backtrackLetters(digits, 0, new StringBuilder(), phone, result);
}
System.out.println("Letter Combinations: " + result);

static void backtrackLetters(String digits, int idx, StringBuilder current,
                              Map<Character, String> phone, List<String> result) {
    if (idx == digits.length()) {
        result.add(current.toString());
        return;
    }
    
    String letters = phone.get(digits.charAt(idx));
    for (char letter : letters.toCharArray()) {
        current.append(letter);
        backtrackLetters(digits, idx + 1, current, phone, result);
        current.deleteCharAt(current.length() - 1);
    }
}

// ============================================
// APPROACH 2: Iterative BFS - O(4^n) Time
// ============================================
String digits2 = "23";

List<String> result2 = new ArrayList<>();
if (!digits2.isEmpty()) {
    result2.add("");
    
    for (char digit : digits2.toCharArray()) {
        String letters = phone.get(digit);
        List<String> temp = new ArrayList<>();
        
        for (String s : result2) {
            for (char letter : letters.toCharArray()) {
                temp.add(s + letter);
            }
        }
        
        result2 = temp;
    }
}

System.out.println("Letter Combinations (Iterative): " + result2);
