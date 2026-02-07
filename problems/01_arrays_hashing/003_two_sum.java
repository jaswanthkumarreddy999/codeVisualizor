// ================================================
// Problem 3: Two Sum
// ================================================
// Given an array of integers nums and an integer target, 
// return indices of the two numbers such that they add up to target.

// ============================================
// APPROACH 1: Brute Force - O(n²) Time, O(1) Space
// ============================================
int[] nums = {2, 7, 11, 15};
int target = 9;
int[] result1 = new int[2];

for (int i = 0; i < nums.length; i++) {
    for (int j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] == target) {
            result1[0] = i;
            result1[1] = j;
            break;
        }
    }
}

System.out.println("Two Sum (Brute Force): [" + result1[0] + ", " + result1[1] + "]");

// ============================================
// APPROACH 2: HashMap One-Pass - O(n) Time, O(n) Space ⭐ OPTIMAL
// ============================================
int[] nums2 = {2, 7, 11, 15};
int target2 = 9;
int[] result2 = new int[2];

Map<Integer, Integer> numToIndex = new HashMap<>();

for (int i = 0; i < nums2.length; i++) {
    int complement = target2 - nums2[i];
    
    if (numToIndex.containsKey(complement)) {
        result2[0] = numToIndex.get(complement);
        result2[1] = i;
        break;
    }
    
    numToIndex.put(nums2[i], i);
}

System.out.println("Two Sum (HashMap): [" + result2[0] + ", " + result2[1] + "]");

// ============================================
// APPROACH 3: Two Pointers (if sorted) - O(n log n) Time, O(n) Space
// ============================================
// Note: This only works if we can sort and don't need original indices
int[] nums3 = {2, 7, 11, 15};
int target3 = 9;

// Create array with original indices
int[][] indexed = new int[nums3.length][2];
for (int i = 0; i < nums3.length; i++) {
    indexed[i][0] = nums3[i];
    indexed[i][1] = i;
}

// Sort by value
Arrays.sort(indexed, (a, b) -> a[0] - b[0]);

int left = 0, right = nums3.length - 1;
int[] result3 = new int[2];

while (left < right) {
    int sum = indexed[left][0] + indexed[right][0];
    
    if (sum == target3) {
        result3[0] = Math.min(indexed[left][1], indexed[right][1]);
        result3[1] = Math.max(indexed[left][1], indexed[right][1]);
        break;
    } else if (sum < target3) {
        left++;
    } else {
        right--;
    }
}

System.out.println("Two Sum (Two Pointers): [" + result3[0] + ", " + result3[1] + "]");
