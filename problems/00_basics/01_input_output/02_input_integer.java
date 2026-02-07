
// ================================================
// Take Integer Input
// ================================================

import java.util.Scanner;

class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter an integer: ");
        if (sc.hasNextInt()) {
            int num = sc.nextInt();
            System.out.println("You entered: " + num);
        }
    }
}
