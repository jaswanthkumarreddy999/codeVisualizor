// ================================================
// Problem 125: Hand of Straights
// ================================================
// Given hand of cards and groupSize, check if can rearrange into groups of 
// consecutive cards of size groupSize.

// ============================================
// APPROACH 1: TreeMap Greedy - O(n log n) Time, O(n) Space ⭐ OPTIMAL
// ============================================
int[] hand = {1, 2, 3, 6, 2, 3, 4, 7, 8};
int groupSize = 3;

if (hand.length % groupSize != 0) {
    System.out.println("Hand of Straights: false");
} else {
    TreeMap<Integer, Integer> count = new TreeMap<>();
    for (int card : hand) {
        count.put(card, count.getOrDefault(card, 0) + 1);
    }
    
    boolean possible = true;
    while (!count.isEmpty() && possible) {
        int first = count.firstKey();
        
        for (int i = first; i < first + groupSize; i++) {
            if (!count.containsKey(i)) {
                possible = false;
                break;
            }
            
            int c = count.get(i);
            if (c == 1) {
                count.remove(i);
            } else {
                count.put(i, c - 1);
            }
        }
    }
    
    System.out.println("Hand of Straights: " + possible);
}

// ============================================
// APPROACH 2: HashMap + Sorting - O(n log n) Time
// ============================================
System.out.println("\nSorting approach:");
System.out.println("1. Sort the array");
System.out.println("2. For each remaining card, try to form group starting from it");

// ============================================
// Visualization
// ============================================
System.out.println("\nFor hand=[1,2,3,6,2,3,4,7,8], groupSize=3:");
System.out.println("Sort: [1,2,2,3,3,4,6,7,8]");
System.out.println("Group 1: [1,2,3]");
System.out.println("Group 2: [2,3,4]");
System.out.println("Group 3: [6,7,8]");
System.out.println("Result: true");
