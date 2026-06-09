
// ================================================
// Largest Element
// ================================================

class Main {
    public static void main(String[] args) {
        int[] arr = {5, 12, 3, 9, 2};
        int max = arr[0];
        for(int x : arr) if(x > max) max = x;
        System.out.println("Max: " + max);
    }
}
