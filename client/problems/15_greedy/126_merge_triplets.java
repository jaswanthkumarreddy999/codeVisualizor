// ================================================
// Problem 126: Merge Triplets to Form Target Triplet
// ================================================
// Given array of triplets, check if we can pick some triplets and max them
// to form target triplet.

// ============================================
// APPROACH 1: Greedy - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[][] triplets = {{2, 5, 3}, {1, 8, 4}, {1, 7, 5}};
int[] target = {2, 7, 5};

boolean[] found = new boolean[3];

for (int[] triplet : triplets) {
    // Only consider triplets where all values <= target
    if (triplet[0] <= target[0] && triplet[1] <= target[1] && triplet[2] <= target[2]) {
        if (triplet[0] == target[0]) found[0] = true;
        if (triplet[1] == target[1]) found[1] = true;
        if (triplet[2] == target[2]) found[2] = true;
    }
}

boolean result = found[0] && found[1] && found[2];
System.out.println("Merge Triplets: " + result);

// ============================================
// Key Insight
// ============================================
System.out.println("\nKey Insight:");
System.out.println("1. Can only use triplets where all elements <= target");
System.out.println("2. Need to find at least one triplet with target[i] for each i");
System.out.println("3. max() operation ensures we can combine them");

// ============================================
// Visualization
// ============================================
System.out.println("\nFor triplets=[[2,5,3],[1,8,4],[1,7,5]], target=[2,7,5]:");
System.out.println("[2,5,3]: valid (all <= target), has target[0]=2");
System.out.println("[1,8,4]: invalid (8 > target[1]=7)");
System.out.println("[1,7,5]: valid, has target[1]=7 and target[2]=5");
System.out.println("Combine: max([2,5,3], [1,7,5]) = [2,7,5] ✓");
