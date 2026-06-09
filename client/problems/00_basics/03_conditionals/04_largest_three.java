
// ================================================
// Largest of Three
// ================================================

class Main {
    public static void main(String[] args) {
        int a = 10, b = 25, c = 15;
        int max = a;
        if (b > max) max = b;
        if (c > max) max = c;
        System.out.println("Largest: " + max);
    }
}
