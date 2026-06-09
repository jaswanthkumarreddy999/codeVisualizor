
// ================================================
// Count Vowels
// ================================================

class Main {
    public static void main(String[] args) {
        String s = "Programming";
        int count = 0;
        String vowels = "aeiouAEIOU";
        for(char c : s.toCharArray()) {
            if(vowels.indexOf(c) != -1) count++;
        }
        System.out.println("Vowels: " + count);
    }
}
