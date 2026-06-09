
// ================================================
// Check Palindrome
// ================================================

class Main {
    public static void main(String[] args) {
        String s = "madam";
        String rev = new StringBuilder(s).reverse().toString();
        System.out.println("Palindrome? " + s.equals(rev));
    }
}
