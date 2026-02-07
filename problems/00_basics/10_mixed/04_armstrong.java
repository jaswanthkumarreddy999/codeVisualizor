
// ================================================
// Check Armstrong Number
// ================================================

class Main {
    public static void main(String[] args) {
        int n = 153;
        int sum = 0, temp = n;
        while(temp > 0) {
            int d = temp % 10;
            sum += d * d * d;
            temp /= 10;
        }
        if(sum == n) System.out.println(n + " is Armstrong");
        else System.out.println(n + " is not Armstrong");
    }
}
