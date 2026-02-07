
// ================================================
// Check Vowel or Consonant
// ================================================

class Main {
    public static void main(String[] args) {
        char c = 'e';
        String vowels = "aeiouAEIOU";
        if (vowels.indexOf(c) != -1) System.out.println(c + " is Vowel");
        else System.out.println(c + " is Consonant");
    }
}
