
// ================================================
// Function Factorial
// ================================================

class Main {
    static long factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
    public static void main(String[] args) {
        System.out.println("5! = " + factorial(5));
    }
}
