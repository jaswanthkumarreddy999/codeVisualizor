
// ================================================
// Primes up to N
// ================================================

class Main {
    public static void main(String[] args) {
        int n = 20;
        System.out.print("Primes: ");
        for (int i=2; i<=n; i++) {
            boolean p = true;
            for (int j=2; j*j<=i; j++) if (i%j==0) { p=false; break; }
            if (p) System.out.print(i + " ");
        }
        System.out.println();
    }
}
