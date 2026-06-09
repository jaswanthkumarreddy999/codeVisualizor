
// ================================================
// Swap Two Numbers
// ================================================

class Main {
    public static void main(String[] args) {
        int a = 5, b = 10;
        System.out.println("Before: a=" + a + ", b=" + b);
        int temp = a;
        a = b;
        b = temp;
        System.out.println("After: a=" + a + ", b=" + b);
    }
}
