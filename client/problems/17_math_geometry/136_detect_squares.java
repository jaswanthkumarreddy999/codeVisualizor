// ================================================
// Problem 135: Detect Squares
// ================================================
// Design a data structure that supports adding points and counting
// squares that can be formed with a given query point.

// ============================================
// APPROACH 1: HashMap with Point Counting - O(n) per query ⭐ OPTIMAL
// ============================================
System.out.println("Detect Squares:");

/*
class DetectSquares {
    private Map<String, Integer> pointCount;
    private List<int[]> points;
    
    public DetectSquares() {
        pointCount = new HashMap<>();
        points = new ArrayList<>();
    }
    
    public void add(int[] point) {
        String key = point[0] + "," + point[1];
        pointCount.put(key, pointCount.getOrDefault(key, 0) + 1);
        points.add(point);
    }
    
    public int count(int[] point) {
        int px = point[0], py = point[1];
        int result = 0;
        
        for (int[] p : points) {
            int x = p[0], y = p[1];
            
            // Skip if not diagonal (same row or column won't form square)
            if (Math.abs(px - x) != Math.abs(py - y) || px == x) {
                continue;
            }
            
            // Check if other two corners exist
            // Corners are: (px, y) and (x, py)
            int count1 = pointCount.getOrDefault(px + "," + y, 0);
            int count2 = pointCount.getOrDefault(x + "," + py, 0);
            
            result += count1 * count2;
        }
        
        return result;
    }
}
*/

System.out.println("Data Structure:");
System.out.println("- HashMap<String, Integer> for point counts");
System.out.println("- ArrayList<int[]> for all added points");

System.out.println("\nQuery Algorithm:");
System.out.println("1. For each existing point P, treat (query, P) as diagonal");
System.out.println("2. Check if other two corners exist");
System.out.println("3. Multiply counts of the two corners");

// ============================================
// Visualization
// ============================================
System.out.println("\nExample:");
System.out.println("Add: [3,10], [11,2], [3,2]");
System.out.println("Query [11,10]:");
System.out.println("  Diagonal with [3,2]: check [3,10] and [11,2] -> 1*1 = 1");
System.out.println("  Result: 1 square");
