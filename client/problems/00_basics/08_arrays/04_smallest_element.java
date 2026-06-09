
// ================================================
// Smallest Element
// ================================================

class Main {
    public static void main(String[] args) {
        int[] arr = {5, 12, 3, 9, 2};
        int min = arr[0];
        for(int x : arr) if(x < min) min = x;
        System.out.println("Min: " + min);
    }
}
