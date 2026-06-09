
// ================================================
// Count Digits
// ================================================

class Main {
    public static void main(String[] args) {
        int n = 12345;
        int count = 0;
        int temp = n;
        while(temp != 0) {
            temp /= 10;
            count++;
        }
        System.out.println("Digits in " + n + ": " + count);
    }
}
