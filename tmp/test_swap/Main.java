import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;

public class Main {
    static int count = 0;
    
    // STATIC ROOT: Keeps the tree stable across recursive calls
    static VizNode root;

    static class VizNode {
        String label;
        int[] snapshot; // Holds the array data for visualization
        VizNode left, right;
        
        VizNode(String label, int[] data) {
            this.label = label;
            this.snapshot = data;
        }
    }

    public static void main(String[] args) {
        int[] nums = {1, 3, 2, 3, 1};
        
        // Initialize the static root
        root = new VizNode("Root", Arrays.copyOfRange(nums, 0, nums.length));
        
        mergeSort(nums, 0, nums.length - 1, root);
        
        System.out.println("Global Count: " + count);
    }

    static void mergeSort(int[] nums, int low, int high, VizNode self) {
        if (low >= high) return;

        int mid = low + (high - low) / 2;

        // 1. EXPAND: Create children
        self.left = new VizNode("L", Arrays.copyOfRange(nums, low, mid + 1));
        mergeSort(nums, low, mid, self.left);

        self.right = new VizNode("R", Arrays.copyOfRange(nums, mid + 1, high + 1));
        mergeSort(nums, mid + 1, high, self.right);

        countPairs(nums, low, mid, high);
        merge(nums, low, mid, high);
        
        // 2. UPDATE: Show sorted state in the current node
        self.snapshot = Arrays.copyOfRange(nums, low, high + 1);
        
        // 3. COLLAPSE: Remove children from the tree
        self.left = null;
        self.right = null;
    }

    static void countPairs(int[] nums, int low, int mid, int high) {
        int j = mid + 1;
        for (int i = low; i <= mid; i++) {
            while (j <= high && (long) nums[i] > 2L * nums[j]) {
                j++;
            }
            count += (j - (mid + 1));
        }
    }

    static void merge(int[] nums, int low, int mid, int high) {
        int[] temp = new int[high - low + 1];
        int i = low, j = mid + 1, k = 0;

        while (i <= mid && j <= high) {
            if (nums[i] <= nums[j]) {
                temp[k++] = nums[i++];
            } else {
                temp[k++] = nums[j++];
            }
        }

        while (i <= mid) temp[k++] = nums[i++];
        while (j <= high) temp[k++] = nums[j++];

        for (int x = 0; x < temp.length; x++) {
            nums[low + x] = temp[x];
        }
    }
}
