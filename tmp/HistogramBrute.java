import java.util.*;

public class HistogramBrute {
    public static int largestRectangleArea(int[] heights) {
        int n = heights.length;
        int maxArea = 0;

        // Visualization Hook Variable
        // Using int[] {start, end, height} for robustness
        int[] heights_rect = null;

        for (int i = 0; i < n; i++) {
            int left = i;
            int right = i;

            while (left >= 0 && heights[left] >= heights[i]) {
                left--;
            }

            while (right < n && heights[right] >= heights[i]) {
                right++;
            }

            int start = left + 1;
            int end = right - 1;

            int width = end - start + 1;
            int area = heights[i] * width;
            maxArea = Math.max(maxArea, area);

            // Visualizes the rectangle: [start, end, height]
            heights_rect = new int[] { start, end, heights[i] };
        }

        heights_rect = null;
        return maxArea;
    }

    public static void main(String[] args) {
        int[] heights = { 2, 1, 5, 6, 2, 3 };
        System.out.println(largestRectangleArea(heights));
    }
}
