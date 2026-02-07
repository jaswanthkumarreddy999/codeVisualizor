// ================================================
// Problem 146: Single Number
// ================================================
// Every element appears twice except one. Find that single one.

// ============================================
// APPROACH 1: XOR - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
// Key: XOR of a number with itself = 0, XOR with 0 = itself

int[] nums = {4, 1, 2, 1, 2};

int single = 0;
for (int num : nums) {
    single ^= num;
}

System.out.println("Single Number (XOR): " + single);

// ============================================
// APPROACH 2: HashMap - O(n) Time, O(n) Space
// ============================================
int[] nums2 = {4, 1, 2, 1, 2};

Map<Integer, Integer> count = new HashMap<>();
for (int num : nums2) {
    count.put(num, count.getOrDefault(num, 0) + 1);
}

int single2 = 0;
for (Map.Entry<Integer, Integer> entry : count.entrySet()) {
    if (entry.getValue() == 1) {
        single2 = entry.getKey();
        break;
    }
}

System.out.println("Single Number (HashMap): " + single2);

// ============================================
// APPROACH 3: Math (Sum) - O(n) Time, O(n) Space
// ============================================
System.out.println("\nMath approach:");
System.out.println("2 * (sum of unique) - (sum of all) = single");

// ============================================
// XOR Properties
// ============================================
System.out.println("\nXOR Properties:");
System.out.println("a ^ a = 0");
System.out.println("a ^ 0 = a");
System.out.println("a ^ b ^ a = b (commutative)");
System.out.println("[4,1,2,1,2]: 4^1^2^1^2 = 4^(1^1)^(2^2) = 4^0^0 = 4");
