
// ================================================
// Digit or Alphabet
// ================================================

class Main {
    public static void main(String[] args) {
        char c = '5';
        if (Character.isDigit(c)) System.out.println("Digit");
        else if (Character.isLetter(c)) System.out.println("Alphabet");
        else System.out.println("Other");
    }
}
