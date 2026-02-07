// ================================================
// Problem 8: Encode and Decode Strings
// ================================================
// Design an algorithm to encode a list of strings to a string.
// The encoded string is then sent over the network and decoded 
// back to the original list of strings.

// ============================================
// APPROACH 1: Length Prefix - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
// Format: "length#string" for each string
String[] strs = {"Hello", "World", "foo#bar", "123"};

// ENCODE
StringBuilder encoded = new StringBuilder();
for (String s : strs) {
    encoded.append(s.length()).append('#').append(s);
}
String encodedStr = encoded.toString();
System.out.println("Encoded: " + encodedStr);

// DECODE
List<String> decoded = new ArrayList<>();
int i = 0;
while (i < encodedStr.length()) {
    // Find the delimiter '#'
    int j = i;
    while (encodedStr.charAt(j) != '#') {
        j++;
    }
    
    int length = Integer.parseInt(encodedStr.substring(i, j));
    String s = encodedStr.substring(j + 1, j + 1 + length);
    decoded.add(s);
    
    i = j + 1 + length;
}

System.out.println("Decoded: " + decoded);

// ============================================
// APPROACH 2: Escape Character - O(n) Time, O(n) Space
// ============================================
// Use a special delimiter and escape it if it appears in strings
String[] strs2 = {"Hello", "World", "foo/bar", "123"};
String DELIMITER = "/:";

// ENCODE
StringBuilder encoded2 = new StringBuilder();
for (int idx = 0; idx < strs2.length; idx++) {
    // Escape existing delimiters
    String escaped = strs2[idx].replace("/", "//");
    encoded2.append(escaped);
    if (idx < strs2.length - 1) {
        encoded2.append(DELIMITER);
    }
}
String encodedStr2 = encoded2.toString();
System.out.println("\nEscaped Encoded: " + encodedStr2);

// DECODE (simplified - assumes no conflicting patterns)
List<String> decoded2 = new ArrayList<>();
String[] parts = encodedStr2.split("/:");
for (String part : parts) {
    decoded2.add(part.replace("//", "/"));
}
System.out.println("Escaped Decoded: " + decoded2);

// ============================================
// APPROACH 3: Non-ASCII Delimiter - O(n) Time, O(1) Space
// ============================================
// Use a non-ASCII character as delimiter (simple but not always safe)
String[] strs3 = {"Hello", "World", "test"};
char DELIM = (char) 257; // Non-ASCII character

// ENCODE
StringBuilder encoded3 = new StringBuilder();
for (int idx = 0; idx < strs3.length; idx++) {
    encoded3.append(strs3[idx]);
    if (idx < strs3.length - 1) {
        encoded3.append(DELIM);
    }
}
String encodedStr3 = encoded3.toString();

// DECODE
String[] decoded3 = encodedStr3.split(String.valueOf(DELIM));
System.out.println("\nNon-ASCII Decoded: " + Arrays.toString(decoded3));
