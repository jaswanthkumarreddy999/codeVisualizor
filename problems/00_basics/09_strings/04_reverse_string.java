
// ================================================
// Reverse String
// ================================================

class Main {
    public static void main(String[] args) {
        String s = "Java";
        String rev = new StringBuilder(s).reverse().toString();
        System.out.println("Reversed: " + rev);
    }
}
