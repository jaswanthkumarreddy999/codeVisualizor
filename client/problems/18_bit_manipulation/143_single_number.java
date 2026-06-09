// ================================================
// Problem 143: Single Number
// ================================================
// Given a non-empty array where every element appears twice except one.
// Find that single one. Must be O(1) space.

// ============================================
// APPROACH 1: XOR - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
// XOR properties: a ^ a = 0, a ^ 0 = a
int[] nums = {4, 1, 2, 1, 2};

int single = 0;
for (int num : nums) {
    single ^= num;
}

System.out.println("Single Number (XOR): " + single);

// ============================================
// APPROACH 2: HashSet - O(n) Time, O(n) Space
// ============================================
int[] nums2 = {4, 1, 2, 1, 2};
Set<Integer> seen = new HashSet<>();

for (int num : nums2) {
    if (seen.contains(num)) {
        seen.remove(num);
    } else {
        seen.add(num);
    }
}

int single2 = seen.iterator().next();
System.out.println("Single Number (HashSet): " + single2);

// ============================================
// APPROACH 3: Math (2*sum - sum) - O(n) Time, O(n) Space
// ============================================
// 2*(a+b+c) - (a+a+b+b+c) = c
int[] nums3 = {4, 1, 2, 1, 2};
Set<Integer> unique = new HashSet<>();
int totalSum = 0;

for (int num : nums3) {
    unique.add(num);
    totalSum += num;
}

int uniqueSum = 0;
for (int num : unique) {
    uniqueSum += num;
}

int single3 = 2 * uniqueSum - totalSum;
System.out.println("Single Number (Math): " + single3);
