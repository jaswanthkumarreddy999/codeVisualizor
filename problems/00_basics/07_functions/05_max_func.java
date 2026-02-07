
// ================================================
// Function Max of Three
// ================================================

class Main {
    static int max(int a, int b, int c) {
        return Math.max(a, Math.max(b, c));
    }
    public static void main(String[] args) {
        System.out.println("Max: " + max(10, 5, 20));
    }
}
