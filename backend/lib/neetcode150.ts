import { SavedProject } from '../types/Project';

export const NEETCODE_150_PROJECTS: SavedProject[] = [
    {
        "id": "nc150-basics-01_hello_world-1",
        "name": "Hello World",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Print Hello World\n// ================================================\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-02_input_integer-1",
        "name": "Input Integer",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Take Integer Input\n// ================================================\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int num = sc.nextInt();\n        System.out.println(\"You entered: \" + num);\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-03_sum_two_numbers-1",
        "name": "Sum Two Numbers",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Sum of Two Numbers\n// ================================================\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(\"Sum: \" + (a + b));\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-04_arithmetic_ops-1",
        "name": "Arithmetic Ops",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Arithmetic Operations\n// ================================================\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(\"Sum: \" + (a + b));\n        System.out.println(\"Difference: \" + (a - b));\n        System.out.println(\"Product: \" + (a * b));\n        // prevent division by zero\n        if (b != 0) System.out.println(\"Quotient: \" + (a / b));\n        else System.out.println(\"Quotient: Division by zero\");\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-05_name_age-1",
        "name": "Name Age",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Name and Age Format\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String name = sc.next();\n        int age = sc.nextInt();\n        System.out.println(\"My name is \" + name + \" and I am \" + age + \" years old.\");\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-01_declare_print-1",
        "name": "Declare Print",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Declare and Print Variables\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        int i = 10;\n        float f = 20.5f;\n        char c = 'A';\n        String s = \"Hello\";\n        System.out.println(i + \"\\n\" + f + \"\\n\" + c + \"\\n\" + s);\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-02_size_of-1",
        "name": "Size Of",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Size of Data Types\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        System.out.println(\"Size of int: \" + (Integer.SIZE / 8) + \" bytes\");\n        System.out.println(\"Size of float: \" + (Float.SIZE / 8) + \" bytes\");\n        System.out.println(\"Size of char: \" + (Character.SIZE / 8) + \" bytes\");\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-03_int_to_float-1",
        "name": "Int To Float",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Convert Int to Float\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int i = sc.nextInt();\n        float f = i;\n        System.out.println(\"Int: \" + i + \", Float: \" + f);\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-04_char_to_int-1",
        "name": "Char To Int",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Convert Char to Int (ASCII)\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        char c = 'A';\n        int ascii = (int) c;\n        System.out.println(\"Char: \" + c + \", ASCII: \" + ascii);\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-05_swap_vars-1",
        "name": "Swap Vars",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Swap Two Numbers\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(\"Before: a=\" + a + \", b=\" + b);\n        int temp = a;\n        a = b;\n        b = temp;\n        System.out.println(\"After: a=\" + a + \", b=\" + b);\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-01_even_odd-1",
        "name": "Even Odd",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Check Even or Odd\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int num = sc.nextInt();\n        if (num % 2 == 0) System.out.println(num + \" is Even\");\n        else System.out.println(num + \" is Odd\");\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-02_pos_neg-1",
        "name": "Pos Neg",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Positive Negative Zero\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int num = sc.nextInt();\n        if (num > 0) System.out.println(\"Positive\");\n        else if (num < 0) System.out.println(\"Negative\");\n        else System.out.println(\"Zero\");\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-03_largest_two-1",
        "name": "Largest Two",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Largest of Two\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        if (a > b) System.out.println(a + \" is larger\");\n        else System.out.println(b + \" is larger\");\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-04_largest_three-1",
        "name": "Largest Three",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Largest of Three\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        int c = sc.nextInt();\n        int max = a;\n        if (b > max) max = b;\n        if (c > max) max = c;\n        System.out.println(\"Largest: \" + max);\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-05_leap_year-1",
        "name": "Leap Year",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Check Leap Year\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int year = sc.nextInt();\n        boolean isLeap = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);\n        System.out.println(year + \" is leap year? \" + isLeap);\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-01_1_to_n-1",
        "name": "1 To N",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Print 1 to N\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for(int i=1; i<=n; i++) System.out.print(i + \" \");\n        System.out.println();\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-02_n_to_1-1",
        "name": "N To 1",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Print N to 1\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for(int i=n; i>=1; i--) System.out.print(i + \" \");\n        System.out.println();\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-03_even_upto_n-1",
        "name": "Even Upto N",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Print Even Numbers\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for(int i=1; i<=n; i++) {\n            if(i % 2 == 0) System.out.print(i + \" \");\n        }\n        System.out.println();\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-04_sum_upto_n-1",
        "name": "Sum Upto N",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Sum of First N Numbers\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int sum = 0;\n        for(int i=1; i<=n; i++) sum += i;\n        System.out.println(\"Sum: \" + sum);\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-05_multiplication_table-1",
        "name": "Multiplication Table",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Multiplication Table\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int num = sc.nextInt();\n        for(int i=1; i<=10; i++) System.out.println(num + \" x \" + i + \" = \" + (num*i));\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-01_factorial-1",
        "name": "Factorial",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Find Factorial\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long fact = 1;\n        for(int i=1; i<=n; i++) fact *= i;\n        System.out.println(\"Factorial of \" + n + \": \" + fact);\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-02_check_prime-1",
        "name": "Check Prime",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Check Prime Number\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        boolean isPrime = true;\n        if (n <= 1) isPrime = false;\n        for (int i=2; i*i<=n; i++) {\n            if (n % i == 0) {\n                isPrime = false;\n                break;\n            }\n        }\n        System.out.println(n + \" is Prime? \" + isPrime);\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-03_primes_upto_n-1",
        "name": "Primes Upto N",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Primes up to N\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        System.out.print(\"Primes: \");\n        for (int i=2; i<=n; i++) {\n            boolean p = true;\n            for (int j=2; j*j<=i; j++) if (i%j==0) { p=false; break; }\n            if (p) System.out.print(i + \" \");\n        }\n        System.out.println();\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-04_count_digits-1",
        "name": "Count Digits",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Count Digits\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int count = 0;\n        int temp = n;\n        while(temp != 0) {\n            temp /= 10;\n            count++;\n        }\n        System.out.println(\"Digits in \" + n + \": \" + count);\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-05_reverse_number-1",
        "name": "Reverse Number",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Reverse Number\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        int n = 1234;\n        int rev = 0;\n        while(n != 0) {\n            rev = rev * 10 + n % 10;\n            n /= 10;\n        }\n        System.out.println(\"Reversed: \" + rev);\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-01_ascii_val-1",
        "name": "Ascii Val",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Print ASCII Value\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        char c = 'a';\n        System.out.println(\"ASCII of \" + c + \": \" + (int)c);\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-02_a_to_z-1",
        "name": "A To Z",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Print A to Z\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        for(char c='A'; c<='Z'; c++) System.out.print(c + \" \");\n        System.out.println();\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-03_vowel_consonant-1",
        "name": "Vowel Consonant",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Check Vowel or Consonant\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        char c = 'e';\n        String vowels = \"aeiouAEIOU\";\n        if (vowels.indexOf(c) != -1) System.out.println(c + \" is Vowel\");\n        else System.out.println(c + \" is Consonant\");\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-04_digit_alpha-1",
        "name": "Digit Alpha",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Digit or Alphabet\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        char c = '5';\n        if (Character.isDigit(c)) System.out.println(\"Digit\");\n        else if (Character.isLetter(c)) System.out.println(\"Alphabet\");\n        else System.out.println(\"Other\");\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-05_lower_upper-1",
        "name": "Lower Upper",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Lowercase to Uppercase\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        char c = 'b';\n        System.out.println(\"Upper: \" + Character.toUpperCase(c));\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-01_add_func-1",
        "name": "Add Func",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Function Add Two Numbers\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        static int add(int a, int b) { return a + b; }\n    public static void main(String[] args) {\n        System.out.println(\"Sum: \" + add(5, 7));\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-02_even_odd_func-1",
        "name": "Even Odd Func",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Function Check Even/Odd\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        static boolean isEven(int n) { return n % 2 == 0; }\n    public static void main(String[] args) {\n        System.out.println(\"Is 4 even? \" + isEven(4));\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-03_fact_func-1",
        "name": "Fact Func",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Function Factorial\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        static long factorial(int n) {\n        if (n <= 1) return 1;\n        return n * factorial(n - 1);\n    }\n        public static void main(String[] args) {\n        System.out.println(\"5! = \" + factorial(5));\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-04_prime_func-1",
        "name": "Prime Func",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Function Check Prime\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        static boolean isPrime(int n) {\n        if(n<=1) return false;\n        for(int i=2;i*i<=n;i++) if(n%i==0) return false;\n        return true;\n    }\n        public static void main(String[] args) {\n        System.out.println(\"Is 7 prime? \" + isPrime(7));\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-05_max_func-1",
        "name": "Max Func",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Function Max of Three\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        static int max(int a, int b, int c) {\n        return Math.max(a, Math.max(b, c));\n    }\n        public static void main(String[] args) {\n        System.out.println(\"Max: \" + max(10, 5, 20));\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-01_print_array-1",
        "name": "Print Array",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Print Array Elements\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5};\n        for(int x : arr) System.out.print(x + \" \");\n        System.out.println();\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-02_sum_array-1",
        "name": "Sum Array",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Sum of Array\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        int[] arr = {10, 20, 30};\n        int sum = 0;\n        for(int x : arr) sum += x;\n        System.out.println(\"Sum: \" + sum);\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-03_largest_element-1",
        "name": "Largest Element",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Largest Element\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        int[] arr = {5, 12, 3, 9, 2};\n        int max = arr[0];\n        for(int x : arr) if(x > max) max = x;\n        System.out.println(\"Max: \" + max);\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-04_smallest_element-1",
        "name": "Smallest Element",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Smallest Element\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        int[] arr = {5, 12, 3, 9, 2};\n        int min = arr[0];\n        for(int x : arr) if(x < min) min = x;\n        System.out.println(\"Min: \" + min);\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-05_count_even_odd-1",
        "name": "Count Even Odd",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Count Even Odd\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5, 6};\n        int even = 0, odd = 0;\n        for(int x : arr) {\n            if(x % 2 == 0) even++; else odd++;\n        }\n        System.out.println(\"Evens: \" + even + \", Odds: \" + odd);\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-01_print_string-1",
        "name": "Print String",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Read and Print String\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        String s = \"Hello World\";\n        System.out.println(s);\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-02_string_len-1",
        "name": "String Len",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Length of String\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        String s = \"CodeVisualizor\";\n        System.out.println(\"Length: \" + s.length());\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-03_count_vowels-1",
        "name": "Count Vowels",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Count Vowels\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        String s = \"Programming\";\n        int count = 0;\n        String vowels = \"aeiouAEIOU\";\n        for(char c : s.toCharArray()) {\n            if(vowels.indexOf(c) != -1) count++;\n        }\n        System.out.println(\"Vowels: \" + count);\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-04_reverse_string-1",
        "name": "Reverse String",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Reverse String\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        String s = \"Java\";\n        String rev = new StringBuilder(s).reverse().toString();\n        System.out.println(\"Reversed: \" + rev);\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-05_palindrome-1",
        "name": "Palindrome",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Check Palindrome\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        String s = \"madam\";\n        String rev = new StringBuilder(s).reverse().toString();\n        System.out.println(\"Palindrome? \" + s.equals(rev));\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-01_star_pattern-1",
        "name": "Star Pattern",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Star Triangle\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        int n = 5;\n        for(int i=1; i<=n; i++) {\n            for(int j=1; j<=i; j++) System.out.print(\"* \");\n            System.out.println();\n        }\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-02_simple_interest-1",
        "name": "Simple Interest",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Calculate Simple Interest\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        double p = 1000, r = 5, t = 2;\n        double si = (p * r * t) / 100;\n        System.out.println(\"Simple Interest: \" + si);\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-03_area_circle-1",
        "name": "Area Circle",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Area of Circle\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        double r = 7;\n        double area = Math.PI * r * r;\n        System.out.println(\"Area: \" + area);\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-04_armstrong-1",
        "name": "Armstrong",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Check Armstrong Number\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        int n = 153;\n        int sum = 0, temp = n;\n        while(temp > 0) {\n            int d = temp % 10;\n            sum += d * d * d;\n            temp /= 10;\n        }\n        if(sum == n) System.out.println(n + \" is Armstrong\");\n        else System.out.println(n + \" is not Armstrong\");\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-05_fibonacci-1",
        "name": "Fibonacci",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Fibonacci Series\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        int n = 10;\n        int a = 0, b = 1;\n        System.out.print(a + \" \" + b + \" \");\n        for(int i=2; i<n; i++) {\n            int next = a + b;\n            System.out.print(next + \" \");\n            a = b;\n            b = next;\n        }\n        System.out.println();\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-basics-06_linear_search-1",
        "name": "Linear Search",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Linear Search\n// ================================================\n\n\n\npublic class Main {\n    // Helper Methods\n        public static void main(String[] args) {\n        int[] arr = {4, 2, 7, 1, 9, 3};\n        int target = 7;\n        int foundIndex = -1;\n        for (int i = 0; i < arr.length; i++) {\n            if (arr[i] == target) {\n                foundIndex = i;\n                break;\n            }\n        }\n        if (foundIndex != -1) {\n            System.out.println(\"Found \" + target + \" at index \" + foundIndex);\n        } else {\n            System.out.println(target + \" not found\");\n        }\n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "basics"
    },
    {
        "id": "nc150-arrays-001_contains_duplicate-1",
        "name": "Contains Duplicate: Brute Force",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 1: Contains Duplicate\n// ================================================\n// Given an integer array nums, return true if any value appears \n// at least twice in the array, and return false if every element is distinct.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Compare every pair of elements\n        int[] nums = {1, 2, 3, 1};\n        boolean hasDuplicate = false;\n        \n        for (int i = 0; i < nums.length; i++) {\n            for (int j = i + 1; j < nums.length; j++) {\n                if (nums[i] == nums[j]) {\n                    hasDuplicate = true;\n                    break;\n                }\n            }\n            if (hasDuplicate) break;\n        }\n        \n        System.out.println(\"Has Duplicate (Brute Force): \" + hasDuplicate);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "arrays"
    },
    {
        "id": "nc150-arrays-001_contains_duplicate-2",
        "name": "Contains Duplicate: Sorting",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 1: Contains Duplicate\n// ================================================\n// Given an integer array nums, return true if any value appears \n// at least twice in the array, and return false if every element is distinct.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Sort array and check adjacent elements\n        int[] nums2 = {1, 2, 3, 1};\n        Arrays.sort(nums2);\n        \n        boolean hasDuplicate2 = false;\n        for (int i = 0; i < nums2.length - 1; i++) {\n            if (nums2[i] == nums2[i + 1]) {\n                hasDuplicate2 = true;\n                break;\n            }\n        }\n        \n        System.out.println(\"Has Duplicate (Sorting): \" + hasDuplicate2);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "arrays"
    },
    {
        "id": "nc150-arrays-001_contains_duplicate-3",
        "name": "Contains Duplicate: HashSet",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 1: Contains Duplicate\n// ================================================\n// Given an integer array nums, return true if any value appears \n// at least twice in the array, and return false if every element is distinct.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Use HashSet to track seen elements\n        int[] nums3 = {1, 2, 3, 1};\n        Set<Integer> seen = new HashSet<>();\n        boolean hasDuplicate3 = false;\n        \n        for (int num : nums3) {\n            if (seen.contains(num)) {\n                hasDuplicate3 = true;\n                break;\n            }\n            seen.add(num);\n        }\n        \n        System.out.println(\"Has Duplicate (HashSet): \" + hasDuplicate3);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "arrays"
    },
    {
        "id": "nc150-arrays-002_valid_anagram-1",
        "name": "Valid Anagram: Sorting",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 2: Valid Anagram\n// ================================================\n// Given two strings s and t, return true if t is an anagram of s, \n// and false otherwise.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String s1 = \"anagram\";\n        String t1 = \"nagaram\";\n        \n        char[] sArr = s1.toCharArray();\n        char[] tArr = t1.toCharArray();\n        Arrays.sort(sArr);\n        Arrays.sort(tArr);\n        \n        boolean isAnagram1 = Arrays.equals(sArr, tArr);\n        System.out.println(\"Valid Anagram (Sorting): \" + isAnagram1);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "arrays"
    },
    {
        "id": "nc150-arrays-002_valid_anagram-2",
        "name": "Valid Anagram: HashMap",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 2: Valid Anagram\n// ================================================\n// Given two strings s and t, return true if t is an anagram of s, \n// and false otherwise.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String s2 = \"anagram\";\n        String t2 = \"nagaram\";\n        \n        if (s2.length() != t2.length()) {\n            System.out.println(\"Valid Anagram (HashMap): false\");\n        } else {\n            Map<Character, Integer> count = new HashMap<>();\n            \n            // Count characters in s\n            for (char c : s2.toCharArray()) {\n                count.put(c, count.getOrDefault(c, 0) + 1);\n            }\n            \n            // Subtract characters in t\n            for (char c : t2.toCharArray()) {\n                count.put(c, count.getOrDefault(c, 0) - 1);\n            }\n            \n            // Check if all counts are zero\n            boolean isAnagram2 = true;\n            for (int val : count.values()) {\n                if (val != 0) {\n                    isAnagram2 = false;\n                    break;\n                }\n            }\n            System.out.println(\"Valid Anagram (HashMap): \" + isAnagram2);\n        }\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "arrays"
    },
    {
        "id": "nc150-arrays-002_valid_anagram-3",
        "name": "Valid Anagram: Array[26]",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 2: Valid Anagram\n// ================================================\n// Given two strings s and t, return true if t is an anagram of s, \n// and false otherwise.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Use fixed array for lowercase letters only\n        String s3 = \"anagram\";\n        String t3 = \"nagaram\";\n        \n        int[] charCount = new int[26];\n        \n        for (char c : s3.toCharArray()) {\n            charCount[c - 'a']++;\n        }\n        \n        for (char c : t3.toCharArray()) {\n            charCount[c - 'a']--;\n        }\n        \n        boolean isAnagram3 = true;\n        for (int count : charCount) {\n            if (count != 0) {\n                isAnagram3 = false;\n                break;\n            }\n        }\n        \n        System.out.println(\"Valid Anagram (Array[26]): \" + isAnagram3);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "arrays"
    },
    {
        "id": "nc150-arrays-003_two_sum-1",
        "name": "Two Sum: Brute Force",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 3: Two Sum\n// ================================================\n// Given an array of integers nums and an integer target, \n// return indices of the two numbers such that they add up to target.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums = {2, 7, 11, 15};\n        int target = 9;\n        int[] result1 = new int[2];\n        \n        for (int i = 0; i < nums.length; i++) {\n            for (int j = i + 1; j < nums.length; j++) {\n                if (nums[i] + nums[j] == target) {\n                    result1[0] = i;\n                    result1[1] = j;\n                    break;\n                }\n            }\n        }\n        \n        System.out.println(\"Two Sum (Brute Force): [\" + result1[0] + \", \" + result1[1] + \"]\");\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "arrays"
    },
    {
        "id": "nc150-arrays-003_two_sum-2",
        "name": "Two Sum: HashMap One",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 3: Two Sum\n// ================================================\n// Given an array of integers nums and an integer target, \n// return indices of the two numbers such that they add up to target.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums2 = {2, 7, 11, 15};\n        int target2 = 9;\n        int[] result2 = new int[2];\n        \n        Map<Integer, Integer> numToIndex = new HashMap<>();\n        \n        for (int i = 0; i < nums2.length; i++) {\n            int complement = target2 - nums2[i];\n            \n            if (numToIndex.containsKey(complement)) {\n                result2[0] = numToIndex.get(complement);\n                result2[1] = i;\n                break;\n            }\n            \n            numToIndex.put(nums2[i], i);\n        }\n        \n        System.out.println(\"Two Sum (HashMap): [\" + result2[0] + \", \" + result2[1] + \"]\");\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "arrays"
    },
    {
        "id": "nc150-arrays-003_two_sum-3",
        "name": "Two Sum: Two Pointers (if sorted)",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 3: Two Sum\n// ================================================\n// Given an array of integers nums and an integer target, \n// return indices of the two numbers such that they add up to target.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Note: This only works if we can sort and don't need original indices\n        int[] nums3 = {2, 7, 11, 15};\n        int target3 = 9;\n        \n        // Create array with original indices\n        int[][] indexed = new int[nums3.length][2];\n        for (int i = 0; i < nums3.length; i++) {\n            indexed[i][0] = nums3[i];\n            indexed[i][1] = i;\n        }\n        \n        // Sort by value\n        Arrays.sort(indexed, (a, b) -> a[0] - b[0]);\n        \n        int left = 0, right = nums3.length - 1;\n        int[] result3 = new int[2];\n        \n        while (left < right) {\n            int sum = indexed[left][0] + indexed[right][0];\n            \n            if (sum == target3) {\n                result3[0] = Math.min(indexed[left][1], indexed[right][1]);\n                result3[1] = Math.max(indexed[left][1], indexed[right][1]);\n                break;\n            } else if (sum < target3) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n        \n        System.out.println(\"Two Sum (Two Pointers): [\" + result3[0] + \", \" + result3[1] + \"]\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "arrays"
    },
    {
        "id": "nc150-arrays-004_group_anagrams-1",
        "name": "Group Anagrams: Sorted String as Key",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 4: Group Anagrams\n// ================================================\n// Given an array of strings strs, group the anagrams together.\n// You can return the answer in any order.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // k = average length of strings\n        String[] strs = {\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"};\n        Map<String, List<String>> groups = new HashMap<>();\n        \n        for (String s : strs) {\n            // Sort characters to create key\n            char[] chars = s.toCharArray();\n            Arrays.sort(chars);\n            String key = new String(chars);\n            \n            // Add to group\n            if (!groups.containsKey(key)) {\n                groups.put(key, new ArrayList<>());\n            }\n            groups.get(key).add(s);\n        }\n        \n        System.out.println(\"Group Anagrams (Sorted Key):\");\n        for (List<String> group : groups.values()) {\n            System.out.println(\"  \" + group);\n        }\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "arrays"
    },
    {
        "id": "nc150-arrays-004_group_anagrams-2",
        "name": "Group Anagrams: Character Count as Key",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 4: Group Anagrams\n// ================================================\n// Given an array of strings strs, group the anagrams together.\n// You can return the answer in any order.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Use character frequency as key (avoids sorting)\n        String[] strs2 = {\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"};\n        Map<String, List<String>> groups2 = new HashMap<>();\n        \n        for (String s : strs2) {\n            // Count characters\n            int[] count = new int[26];\n            for (char c : s.toCharArray()) {\n                count[c - 'a']++;\n            }\n            \n            // Create key from count array\n            StringBuilder keyBuilder = new StringBuilder();\n            for (int i = 0; i < 26; i++) {\n                keyBuilder.append('#');\n                keyBuilder.append(count[i]);\n            }\n            String key = keyBuilder.toString();\n            \n            // Add to group\n            if (!groups2.containsKey(key)) {\n                groups2.put(key, new ArrayList<>());\n            }\n            groups2.get(key).add(s);\n        }\n        \n        System.out.println(\"\\nGroup Anagrams (Count Key):\");\n        for (List<String> group : groups2.values()) {\n            System.out.println(\"  \" + group);\n        }\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "arrays"
    },
    {
        "id": "nc150-arrays-005_top_k_frequent-1",
        "name": "Top K Frequent: HashMap + Sorting",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 5: Top K Frequent Elements\n// ================================================\n// Given an integer array nums and an integer k, return the k most \n// frequent elements. You may return the answer in any order.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums = {1, 1, 1, 2, 2, 3};\n        int k = 2;\n        \n        // Count frequencies\n        Map<Integer, Integer> freq = new HashMap<>();\n        for (int num : nums) {\n            freq.put(num, freq.getOrDefault(num, 0) + 1);\n        }\n        \n        // Sort by frequency\n        List<Integer> candidates = new ArrayList<>(freq.keySet());\n        candidates.sort((a, b) -> freq.get(b) - freq.get(a));\n        \n        // Get top k\n        int[] result1 = new int[k];\n        for (int i = 0; i < k; i++) {\n            result1[i] = candidates.get(i);\n        }\n        \n        System.out.println(\"Top K Frequent (Sorting): \" + Arrays.toString(result1));\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "arrays"
    },
    {
        "id": "nc150-arrays-005_top_k_frequent-2",
        "name": "Top K Frequent: HashMap + Min Heap",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 5: Top K Frequent Elements\n// ================================================\n// Given an integer array nums and an integer k, return the k most \n// frequent elements. You may return the answer in any order.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums2 = {1, 1, 1, 2, 2, 3};\n        int k2 = 2;\n        \n        Map<Integer, Integer> freq2 = new HashMap<>();\n        for (int num : nums2) {\n            freq2.put(num, freq2.getOrDefault(num, 0) + 1);\n        }\n        \n        // Min heap to keep top k elements\n        PriorityQueue<Integer> minHeap = new PriorityQueue<>((a, b) -> freq2.get(a) - freq2.get(b));\n        \n        for (int num : freq2.keySet()) {\n            minHeap.offer(num);\n            if (minHeap.size() > k2) {\n                minHeap.poll(); // Remove least frequent\n            }\n        }\n        \n        int[] result2 = new int[k2];\n        for (int i = 0; i < k2; i++) {\n            result2[i] = minHeap.poll();\n        }\n        \n        System.out.println(\"Top K Frequent (Min Heap): \" + Arrays.toString(result2));\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "arrays"
    },
    {
        "id": "nc150-arrays-005_top_k_frequent-3",
        "name": "Top K Frequent: Bucket Sort",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 5: Top K Frequent Elements\n// ================================================\n// Given an integer array nums and an integer k, return the k most \n// frequent elements. You may return the answer in any order.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums3 = {1, 1, 1, 2, 2, 3};\n        int k3 = 2;\n        \n        Map<Integer, Integer> freq3 = new HashMap<>();\n        for (int num : nums3) {\n            freq3.put(num, freq3.getOrDefault(num, 0) + 1);\n        }\n        \n        // Create buckets where index = frequency\n        List<List<Integer>> buckets = new ArrayList<>();\n        for (int i = 0; i <= nums3.length; i++) {\n            buckets.add(new ArrayList<>());\n        }\n        \n        for (Map.Entry<Integer, Integer> entry : freq3.entrySet()) {\n            int frequency = entry.getValue();\n            buckets.get(frequency).add(entry.getKey());\n        }\n        \n        // Collect top k from highest frequency buckets\n        int[] result3 = new int[k3];\n        int index = 0;\n        \n        for (int i = buckets.size() - 1; i >= 0 && index < k3; i--) {\n            for (int num : buckets.get(i)) {\n                if (index < k3) {\n                    result3[index++] = num;\n                }\n            }\n        }\n        \n        System.out.println(\"Top K Frequent (Bucket Sort): \" + Arrays.toString(result3));\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "arrays"
    },
    {
        "id": "nc150-arrays-006_product_except_self-1",
        "name": "Product Except Self: Prefix and Suffix Arrays",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 6: Product of Array Except Self\n// ================================================\n// Given an integer array nums, return an array answer such that answer[i] \n// is equal to the product of all the elements of nums except nums[i].\n// Must run in O(n) time without using division.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3, 4};\n        int n = nums.length;\n        \n        // Calculate prefix products\n        int[] prefix = new int[n];\n        prefix[0] = 1;\n        for (int i = 1; i < n; i++) {\n            prefix[i] = prefix[i - 1] * nums[i - 1];\n        }\n        \n        // Calculate suffix products\n        int[] suffix = new int[n];\n        suffix[n - 1] = 1;\n        for (int i = n - 2; i >= 0; i--) {\n            suffix[i] = suffix[i + 1] * nums[i + 1];\n        }\n        \n        // Combine prefix and suffix\n        int[] result1 = new int[n];\n        for (int i = 0; i < n; i++) {\n            result1[i] = prefix[i] * suffix[i];\n        }\n        \n        System.out.println(\"Product Except Self (Two Arrays): \" + Arrays.toString(result1));\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "arrays"
    },
    {
        "id": "nc150-arrays-006_product_except_self-2",
        "name": "Product Except Self: Single Array with Running Suffix",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 6: Product of Array Except Self\n// ================================================\n// Given an integer array nums, return an array answer such that answer[i] \n// is equal to the product of all the elements of nums except nums[i].\n// Must run in O(n) time without using division.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums2 = {1, 2, 3, 4};\n        int n2 = nums2.length;\n        int[] result2 = new int[n2];\n        \n        // First pass: calculate prefix products in result array\n        result2[0] = 1;\n        for (int i = 1; i < n2; i++) {\n            result2[i] = result2[i - 1] * nums2[i - 1];\n        }\n        \n        // Second pass: multiply by suffix products using running variable\n        int suffix2 = 1;\n        for (int i = n2 - 1; i >= 0; i--) {\n            result2[i] *= suffix2;\n            suffix2 *= nums2[i];\n        }\n        \n        System.out.println(\"Product Except Self (O(1) Space): \" + Arrays.toString(result2));\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "arrays"
    },
    {
        "id": "nc150-arrays-007_valid_sudoku-1",
        "name": "Valid Sudoku: HashSet per Row/Col/Box",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 7: Valid Sudoku\n// ================================================\n// Determine if a 9x9 Sudoku board is valid. Only the filled cells \n// need to be validated according to the following rules:\n// - Each row must contain the digits 1-9 without repetition.\n// - Each column must contain the digits 1-9 without repetition.\n// - Each of the nine 3x3 sub-boxes must contain 1-9 without repetition.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        char[][] board = {\n            {'5','3','.','.','7','.','.','.','.'},\n            {'6','.','.','1','9','5','.','.','.'},\n            {'.','9','8','.','.','.','.','6','.'},\n            {'8','.','.','.','6','.','.','.','3'},\n            {'4','.','.','8','.','3','.','.','1'},\n            {'7','.','.','.','2','.','.','.','6'},\n            {'.','6','.','.','.','.','2','8','.'},\n            {'.','.','.','4','1','9','.','.','5'},\n            {'.','.','.','.','8','.','.','7','9'}\n        };\n        \n        // Use HashSets for each row, column, and 3x3 box\n        Set<Character>[] rows = new HashSet[9];\n        Set<Character>[] cols = new HashSet[9];\n        Set<Character>[] boxes = new HashSet[9];\n        \n        for (int i = 0; i < 9; i++) {\n            rows[i] = new HashSet<>();\n            cols[i] = new HashSet<>();\n            boxes[i] = new HashSet<>();\n        }\n        \n        boolean isValid = true;\n        \n        for (int r = 0; r < 9; r++) {\n            for (int c = 0; c < 9; c++) {\n                char digit = board[r][c];\n                if (digit == '.') continue;\n                \n                int boxIndex = (r / 3) * 3 + (c / 3);\n                \n                // Check if digit already exists\n                if (rows[r].contains(digit) || cols[c].contains(digit) || boxes[boxIndex].contains(digit)) {\n                    isValid = false;\n                    break;\n                }\n                \n                rows[r].add(digit);\n                cols[c].add(digit);\n                boxes[boxIndex].add(digit);\n            }\n            if (!isValid) break;\n        }\n        \n        System.out.println(\"Valid Sudoku (HashSet): \" + isValid);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "arrays"
    },
    {
        "id": "nc150-arrays-007_valid_sudoku-2",
        "name": "Valid Sudoku: Bitmask",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 7: Valid Sudoku\n// ================================================\n// Determine if a 9x9 Sudoku board is valid. Only the filled cells \n// need to be validated according to the following rules:\n// - Each row must contain the digits 1-9 without repetition.\n// - Each column must contain the digits 1-9 without repetition.\n// - Each of the nine 3x3 sub-boxes must contain 1-9 without repetition.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        char[][] board2 = {\n            {'5','3','.','.','7','.','.','.','.'},\n            {'6','.','.','1','9','5','.','.','.'},\n            {'.','9','8','.','.','.','.','6','.'},\n            {'8','.','.','.','6','.','.','.','3'},\n            {'4','.','.','8','.','3','.','.','1'},\n            {'7','.','.','.','2','.','.','.','6'},\n            {'.','6','.','.','.','.','2','8','.'},\n            {'.','.','.','4','1','9','.','.','5'},\n            {'.','.','.','.','8','.','.','7','9'}\n        };\n        \n        // Use bitmasks instead of HashSets\n        int[] rowMask = new int[9];\n        int[] colMask = new int[9];\n        int[] boxMask = new int[9];\n        \n        boolean isValid2 = true;\n        \n        for (int r = 0; r < 9; r++) {\n            for (int c = 0; c < 9; c++) {\n                if (board2[r][c] == '.') continue;\n                \n                int num = board2[r][c] - '1'; // 0-8\n                int bit = 1 << num;\n                int boxIndex = (r / 3) * 3 + (c / 3);\n                \n                // Check if bit is already set\n                if ((rowMask[r] & bit) != 0 || (colMask[c] & bit) != 0 || (boxMask[boxIndex] & bit) != 0) {\n                    isValid2 = false;\n                    break;\n                }\n                \n                rowMask[r] |= bit;\n                colMask[c] |= bit;\n                boxMask[boxIndex] |= bit;\n            }\n            if (!isValid2) break;\n        }\n        \n        System.out.println(\"Valid Sudoku (Bitmask): \" + isValid2);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "arrays"
    },
    {
        "id": "nc150-arrays-008_encode_decode_strings-1",
        "name": "Encode Decode Strings: Length Prefix",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 8: Encode and Decode Strings\n// ================================================\n// Design an algorithm to encode a list of strings to a string.\n// The encoded string is then sent over the network and decoded \n// back to the original list of strings.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Format: \"length#string\" for each string\n        String[] strs = {\"Hello\", \"World\", \"foo#bar\", \"123\"};\n        \n        // ENCODE\n        StringBuilder encoded = new StringBuilder();\n        for (String s : strs) {\n            encoded.append(s.length()).append('#').append(s);\n        }\n        String encodedStr = encoded.toString();\n        System.out.println(\"Encoded: \" + encodedStr);\n        \n        // DECODE\n        List<String> decoded = new ArrayList<>();\n        int i = 0;\n        while (i < encodedStr.length()) {\n            // Find the delimiter '#'\n            int j = i;\n            while (encodedStr.charAt(j) != '#') {\n                j++;\n            }\n            \n            int length = Integer.parseInt(encodedStr.substring(i, j));\n            String s = encodedStr.substring(j + 1, j + 1 + length);\n            decoded.add(s);\n            \n            i = j + 1 + length;\n        }\n        \n        System.out.println(\"Decoded: \" + decoded);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "arrays"
    },
    {
        "id": "nc150-arrays-008_encode_decode_strings-2",
        "name": "Encode Decode Strings: Escape Character",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 8: Encode and Decode Strings\n// ================================================\n// Design an algorithm to encode a list of strings to a string.\n// The encoded string is then sent over the network and decoded \n// back to the original list of strings.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Use a special delimiter and escape it if it appears in strings\n        String[] strs2 = {\"Hello\", \"World\", \"foo/bar\", \"123\"};\n        String DELIMITER = \"/:\";\n        \n        // ENCODE\n        StringBuilder encoded2 = new StringBuilder();\n        for (int idx = 0; idx < strs2.length; idx++) {\n            // Escape existing delimiters\n            String escaped = strs2[idx].replace(\"/\", \"//\");\n            encoded2.append(escaped);\n            if (idx < strs2.length - 1) {\n                encoded2.append(DELIMITER);\n            }\n        }\n        String encodedStr2 = encoded2.toString();\n        System.out.println(\"\\nEscaped Encoded: \" + encodedStr2);\n        \n        // DECODE (simplified - assumes no conflicting patterns)\n        List<String> decoded2 = new ArrayList<>();\n        String[] parts = encodedStr2.split(\"/:\");\n        for (String part : parts) {\n            decoded2.add(part.replace(\"//\", \"/\"));\n        }\n        System.out.println(\"Escaped Decoded: \" + decoded2);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "arrays"
    },
    {
        "id": "nc150-arrays-008_encode_decode_strings-3",
        "name": "Encode Decode Strings: Non",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 8: Encode and Decode Strings\n// ================================================\n// Design an algorithm to encode a list of strings to a string.\n// The encoded string is then sent over the network and decoded \n// back to the original list of strings.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Use a non-ASCII character as delimiter (simple but not always safe)\n        String[] strs3 = {\"Hello\", \"World\", \"test\"};\n        char DELIM = (char) 257; // Non-ASCII character\n        \n        // ENCODE\n        StringBuilder encoded3 = new StringBuilder();\n        for (int idx = 0; idx < strs3.length; idx++) {\n            encoded3.append(strs3[idx]);\n            if (idx < strs3.length - 1) {\n                encoded3.append(DELIM);\n            }\n        }\n        String encodedStr3 = encoded3.toString();\n        \n        // DECODE\n        String[] decoded3 = encodedStr3.split(String.valueOf(DELIM));\n        System.out.println(\"\\nNon-ASCII Decoded: \" + Arrays.toString(decoded3));\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "arrays"
    },
    {
        "id": "nc150-arrays-009_longest_consecutive-1",
        "name": "Longest Consecutive: Sorting",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 9: Longest Consecutive Sequence\n// ================================================\n// Given an unsorted array of integers nums, return the length of the \n// longest consecutive elements sequence.\n// Must run in O(n) time.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums = {100, 4, 200, 1, 3, 2};\n        int[] sorted = nums.clone();\n        Arrays.sort(sorted);\n        \n        int longest1 = 1;\n        int current1 = 1;\n        \n        for (int i = 1; i < sorted.length; i++) {\n            if (sorted[i] == sorted[i - 1]) {\n                continue; // Skip duplicates\n            } else if (sorted[i] == sorted[i - 1] + 1) {\n                current1++;\n            } else {\n                longest1 = Math.max(longest1, current1);\n                current1 = 1;\n            }\n        }\n        longest1 = Math.max(longest1, current1);\n        \n        System.out.println(\"Longest Consecutive (Sorting): \" + longest1);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "arrays"
    },
    {
        "id": "nc150-arrays-009_longest_consecutive-2",
        "name": "Longest Consecutive: HashSet",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 9: Longest Consecutive Sequence\n// ================================================\n// Given an unsorted array of integers nums, return the length of the \n// longest consecutive elements sequence.\n// Must run in O(n) time.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums2 = {100, 4, 200, 1, 3, 2};\n        Set<Integer> numSet = new HashSet<>();\n        for (int num : nums2) {\n            numSet.add(num);\n        }\n        \n        int longest2 = 0;\n        \n        for (int num : numSet) {\n            // Only start counting if this is the start of a sequence\n            // (i.e., num - 1 is not in the set)\n            if (!numSet.contains(num - 1)) {\n                int currentNum = num;\n                int currentStreak = 1;\n                \n                while (numSet.contains(currentNum + 1)) {\n                    currentNum++;\n                    currentStreak++;\n                }\n                \n                longest2 = Math.max(longest2, currentStreak);\n            }\n        }\n        \n        System.out.println(\"Longest Consecutive (HashSet): \" + longest2);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "arrays"
    },
    {
        "id": "nc150-arrays-009_longest_consecutive-3",
        "name": "Longest Consecutive: Union",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 9: Longest Consecutive Sequence\n// ================================================\n// Given an unsorted array of integers nums, return the length of the \n// longest consecutive elements sequence.\n// Must run in O(n) time.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums3 = {100, 4, 200, 1, 3, 2};\n        \n        // Union-Find with size tracking\n        Map<Integer, Integer> parent = new HashMap<>();\n        Map<Integer, Integer> size = new HashMap<>();\n        \n        // Initialize each number as its own parent\n        for (int num : nums3) {\n            parent.put(num, num);\n            size.put(num, 1);\n        }\n        \n        // Find with path compression\n        // Note: In visualizer, using loop instead of recursion\n        for (int num : nums3) {\n            // Try to union with num + 1 if it exists\n            if (parent.containsKey(num + 1)) {\n                // Find roots\n                int root1 = num;\n                while (parent.get(root1) != root1) {\n                    root1 = parent.get(root1);\n                }\n                \n                int root2 = num + 1;\n                while (parent.get(root2) != root2) {\n                    root2 = parent.get(root2);\n                }\n                \n                // Union by size\n                if (root1 != root2) {\n                    if (size.get(root1) < size.get(root2)) {\n                        parent.put(root1, root2);\n                        size.put(root2, size.get(root1) + size.get(root2));\n                    } else {\n                        parent.put(root2, root1);\n                        size.put(root1, size.get(root1) + size.get(root2));\n                    }\n                }\n            }\n        }\n        \n        int longest3 = 0;\n        for (int s : size.values()) {\n            longest3 = Math.max(longest3, s);\n        }\n        \n        System.out.println(\"Longest Consecutive (Union-Find): \" + longest3);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "arrays"
    },
    {
        "id": "nc150-two-pointers-010_valid_palindrome-1",
        "name": "Valid Palindrome: Two Pointers",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 10: Valid Palindrome\n// ================================================\n// A phrase is a palindrome if, after converting all uppercase letters to \n// lowercase and removing all non-alphanumeric characters, it reads the \n// same forward and backward.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String s = \"A man, a plan, a canal: Panama\";\n        int left = 0;\n        int right = s.length() - 1;\n        boolean isPalindrome1 = true;\n        \n        while (left < right) {\n            // Skip non-alphanumeric from left\n            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {\n                left++;\n            }\n            // Skip non-alphanumeric from right\n            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {\n                right--;\n            }\n            \n            // Compare characters (case-insensitive)\n            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {\n                isPalindrome1 = false;\n                break;\n            }\n            \n            left++;\n            right--;\n        }\n        \n        System.out.println(\"Valid Palindrome (Two Pointers): \" + isPalindrome1);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "two-pointers"
    },
    {
        "id": "nc150-two-pointers-010_valid_palindrome-2",
        "name": "Valid Palindrome: Filter + Reverse",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 10: Valid Palindrome\n// ================================================\n// A phrase is a palindrome if, after converting all uppercase letters to \n// lowercase and removing all non-alphanumeric characters, it reads the \n// same forward and backward.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String s2 = \"A man, a plan, a canal: Panama\";\n        StringBuilder filtered = new StringBuilder();\n        \n        for (char c : s2.toCharArray()) {\n            if (Character.isLetterOrDigit(c)) {\n                filtered.append(Character.toLowerCase(c));\n            }\n        }\n        \n        String original = filtered.toString();\n        String reversed = filtered.reverse().toString();\n        boolean isPalindrome2 = original.equals(reversed);\n        \n        System.out.println(\"Valid Palindrome (Filter + Reverse): \" + isPalindrome2);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "two-pointers"
    },
    {
        "id": "nc150-two-pointers-011_two_sum_ii-1",
        "name": "Two Sum Ii: Two Pointers",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 11: Two Sum II - Input Array Is Sorted\n// ================================================\n// Given a 1-indexed array of integers that is already sorted in \n// non-decreasing order, find two numbers that add up to target.\n// Return indices (1-indexed).\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] numbers = {2, 7, 11, 15};\n        int target = 9;\n        \n        int left = 0;\n        int right = numbers.length - 1;\n        int[] result1 = new int[2];\n        \n        while (left < right) {\n            int sum = numbers[left] + numbers[right];\n            \n            if (sum == target) {\n                result1[0] = left + 1;  // 1-indexed\n                result1[1] = right + 1;\n                break;\n            } else if (sum < target) {\n                left++;  // Need larger sum\n            } else {\n                right--;  // Need smaller sum\n            }\n        }\n        \n        System.out.println(\"Two Sum II (Two Pointers): [\" + result1[0] + \", \" + result1[1] + \"]\");\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "two-pointers"
    },
    {
        "id": "nc150-two-pointers-011_two_sum_ii-2",
        "name": "Two Sum Ii: Binary Search",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 11: Two Sum II - Input Array Is Sorted\n// ================================================\n// Given a 1-indexed array of integers that is already sorted in \n// non-decreasing order, find two numbers that add up to target.\n// Return indices (1-indexed).\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] numbers2 = {2, 7, 11, 15};\n        int target2 = 9;\n        int[] result2 = new int[2];\n        \n        for (int i = 0; i < numbers2.length; i++) {\n            int complement = target2 - numbers2[i];\n            \n            // Binary search for complement in remaining array\n            int lo = i + 1;\n            int hi = numbers2.length - 1;\n            \n            while (lo <= hi) {\n                int mid = lo + (hi - lo) / 2;\n                \n                if (numbers2[mid] == complement) {\n                    result2[0] = i + 1;\n                    result2[1] = mid + 1;\n                    break;\n                } else if (numbers2[mid] < complement) {\n                    lo = mid + 1;\n                } else {\n                    hi = mid - 1;\n                }\n            }\n            \n            if (result2[0] != 0) break;\n        }\n        \n        System.out.println(\"Two Sum II (Binary Search): [\" + result2[0] + \", \" + result2[1] + \"]\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "two-pointers"
    },
    {
        "id": "nc150-two-pointers-012_3sum-1",
        "name": "3Sum: Sort + Two Pointers",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 12: 3Sum\n// ================================================\n// Given an integer array nums, return all triplets [nums[i], nums[j], nums[k]] \n// such that i != j, i != k, j != k, and nums[i] + nums[j] + nums[k] == 0.\n// Solution set must not contain duplicate triplets.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums = {-1, 0, 1, 2, -1, -4};\n        Arrays.sort(nums);\n        List<List<Integer>> result = new ArrayList<>();\n        \n        for (int i = 0; i < nums.length - 2; i++) {\n            // Skip duplicates for first element\n            if (i > 0 && nums[i] == nums[i - 1]) {\n                continue;\n            }\n            \n            int left = i + 1;\n            int right = nums.length - 1;\n            int target = -nums[i];\n            \n            while (left < right) {\n                int sum = nums[left] + nums[right];\n                \n                if (sum == target) {\n                    result.add(Arrays.asList(nums[i], nums[left], nums[right]));\n                    \n                    // Skip duplicates for second element\n                    while (left < right && nums[left] == nums[left + 1]) {\n                        left++;\n                    }\n                    // Skip duplicates for third element\n                    while (left < right && nums[right] == nums[right - 1]) {\n                        right--;\n                    }\n                    \n                    left++;\n                    right--;\n                } else if (sum < target) {\n                    left++;\n                } else {\n                    right--;\n                }\n            }\n        }\n        \n        System.out.println(\"3Sum (Two Pointers): \" + result);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "two-pointers"
    },
    {
        "id": "nc150-two-pointers-012_3sum-2",
        "name": "3Sum: HashSet for Deduplication",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 12: 3Sum\n// ================================================\n// Given an integer array nums, return all triplets [nums[i], nums[j], nums[k]] \n// such that i != j, i != k, j != k, and nums[i] + nums[j] + nums[k] == 0.\n// Solution set must not contain duplicate triplets.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums2 = {-1, 0, 1, 2, -1, -4};\n        Arrays.sort(nums2);\n        Set<List<Integer>> resultSet = new HashSet<>();\n        \n        for (int i = 0; i < nums2.length - 2; i++) {\n            Set<Integer> seen = new HashSet<>();\n            \n            for (int j = i + 1; j < nums2.length; j++) {\n                int complement = -nums2[i] - nums2[j];\n                \n                if (seen.contains(complement)) {\n                    resultSet.add(Arrays.asList(nums2[i], complement, nums2[j]));\n                }\n                \n                seen.add(nums2[j]);\n            }\n        }\n        \n        System.out.println(\"3Sum (HashSet): \" + new ArrayList<>(resultSet));\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "two-pointers"
    },
    {
        "id": "nc150-two-pointers-013_container_water-1",
        "name": "Container Water: Brute Force",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 13: Container With Most Water\n// ================================================\n// Given n non-negative integers representing vertical lines at positions \n// 0 to n-1, find two lines that together with the x-axis forms a container \n// that holds the most water.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] height = {1, 8, 6, 2, 5, 4, 8, 3, 7};\n        int maxArea1 = 0;\n        \n        for (int i = 0; i < height.length; i++) {\n            for (int j = i + 1; j < height.length; j++) {\n                int h = Math.min(height[i], height[j]);\n                int w = j - i;\n                int area = h * w;\n                maxArea1 = Math.max(maxArea1, area);\n            }\n        }\n        \n        System.out.println(\"Container Water (Brute Force): \" + maxArea1);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "two-pointers"
    },
    {
        "id": "nc150-two-pointers-013_container_water-2",
        "name": "Container Water: Two Pointers",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 13: Container With Most Water\n// ================================================\n// Given n non-negative integers representing vertical lines at positions \n// 0 to n-1, find two lines that together with the x-axis forms a container \n// that holds the most water.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Key insight: Move the pointer with smaller height inward\n        // because keeping it won't lead to a larger area\n        int[] height2 = {1, 8, 6, 2, 5, 4, 8, 3, 7};\n        int left = 0;\n        int right = height2.length - 1;\n        int maxArea2 = 0;\n        \n        while (left < right) {\n            int h = Math.min(height2[left], height2[right]);\n            int w = right - left;\n            int area = h * w;\n            maxArea2 = Math.max(maxArea2, area);\n            \n            // Move the pointer with smaller height\n            if (height2[left] < height2[right]) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n        \n        System.out.println(\"Container Water (Two Pointers): \" + maxArea2);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "two-pointers"
    },
    {
        "id": "nc150-two-pointers-014_trapping_rain_water-1",
        "name": "Trapping Rain Water: Brute Force",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 14: Trapping Rain Water\n// ================================================\n// Given n non-negative integers representing an elevation map where \n// the width of each bar is 1, compute how much water it can trap after raining.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] height = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};\n        int water1 = 0;\n        \n        for (int i = 0; i < height.length; i++) {\n            int leftMax = 0, rightMax = 0;\n            \n            // Find max height to the left\n            for (int j = 0; j <= i; j++) {\n                leftMax = Math.max(leftMax, height[j]);\n            }\n            \n            // Find max height to the right\n            for (int j = i; j < height.length; j++) {\n                rightMax = Math.max(rightMax, height[j]);\n            }\n            \n            water1 += Math.min(leftMax, rightMax) - height[i];\n        }\n        \n        System.out.println(\"Trapping Rain Water (Brute Force): \" + water1);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "two-pointers"
    },
    {
        "id": "nc150-two-pointers-014_trapping_rain_water-2",
        "name": "Trapping Rain Water: DP with Prefix/Suffix",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 14: Trapping Rain Water\n// ================================================\n// Given n non-negative integers representing an elevation map where \n// the width of each bar is 1, compute how much water it can trap after raining.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] height2 = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};\n        int n = height2.length;\n        \n        // Precompute left max for each position\n        int[] leftMax = new int[n];\n        leftMax[0] = height2[0];\n        for (int i = 1; i < n; i++) {\n            leftMax[i] = Math.max(leftMax[i - 1], height2[i]);\n        }\n        \n        // Precompute right max for each position\n        int[] rightMax = new int[n];\n        rightMax[n - 1] = height2[n - 1];\n        for (int i = n - 2; i >= 0; i--) {\n            rightMax[i] = Math.max(rightMax[i + 1], height2[i]);\n        }\n        \n        // Calculate water\n        int water2 = 0;\n        for (int i = 0; i < n; i++) {\n            water2 += Math.min(leftMax[i], rightMax[i]) - height2[i];\n        }\n        \n        System.out.println(\"Trapping Rain Water (DP): \" + water2);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "two-pointers"
    },
    {
        "id": "nc150-two-pointers-014_trapping_rain_water-3",
        "name": "Trapping Rain Water: Two Pointers",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 14: Trapping Rain Water\n// ================================================\n// Given n non-negative integers representing an elevation map where \n// the width of each bar is 1, compute how much water it can trap after raining.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] height3 = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};\n        int left = 0, right = height3.length - 1;\n        int leftMaxVal = 0, rightMaxVal = 0;\n        int water3 = 0;\n        \n        while (left < right) {\n            if (height3[left] < height3[right]) {\n                if (height3[left] >= leftMaxVal) {\n                    leftMaxVal = height3[left];\n                } else {\n                    water3 += leftMaxVal - height3[left];\n                }\n                left++;\n            } else {\n                if (height3[right] >= rightMaxVal) {\n                    rightMaxVal = height3[right];\n                } else {\n                    water3 += rightMaxVal - height3[right];\n                }\n                right--;\n            }\n        }\n        \n        System.out.println(\"Trapping Rain Water (Two Pointers): \" + water3);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "two-pointers"
    },
    {
        "id": "nc150-two-pointers-014_trapping_rain_water-4",
        "name": "Trapping Rain Water: Monotonic Stack",
        "updatedAt": 1700000000003,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 14: Trapping Rain Water\n// ================================================\n// Given n non-negative integers representing an elevation map where \n// the width of each bar is 1, compute how much water it can trap after raining.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] height4 = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};\n        Stack<Integer> stack = new Stack<>();\n        int water4 = 0;\n        \n        for (int i = 0; i < height4.length; i++) {\n            while (!stack.isEmpty() && height4[i] > height4[stack.peek()]) {\n                int mid = stack.pop();\n                \n                if (stack.isEmpty()) break;\n                \n                int left4 = stack.peek();\n                int h = Math.min(height4[left4], height4[i]) - height4[mid];\n                int w = i - left4 - 1;\n                water4 += h * w;\n            }\n            stack.push(i);\n        }\n        \n        System.out.println(\"Trapping Rain Water (Stack): \" + water4);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "two-pointers"
    },
    {
        "id": "nc150-sliding-window-015_best_time_buy_sell-1",
        "name": "Best Time Buy Sell: Brute Force",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 15: Best Time to Buy and Sell Stock\n// ================================================\n// Given an array prices where prices[i] is the price of a stock on day i,\n// find the maximum profit from one transaction (buy one, sell one).\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] prices = {7, 1, 5, 3, 6, 4};\n        int maxProfit1 = 0;\n        \n        for (int i = 0; i < prices.length; i++) {\n            for (int j = i + 1; j < prices.length; j++) {\n                int profit = prices[j] - prices[i];\n                maxProfit1 = Math.max(maxProfit1, profit);\n            }\n        }\n        \n        System.out.println(\"Max Profit (Brute Force): \" + maxProfit1);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "sliding-window"
    },
    {
        "id": "nc150-sliding-window-015_best_time_buy_sell-2",
        "name": "Best Time Buy Sell: Single Pass",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 15: Best Time to Buy and Sell Stock\n// ================================================\n// Given an array prices where prices[i] is the price of a stock on day i,\n// find the maximum profit from one transaction (buy one, sell one).\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Track minimum price so far and maximum profit\n        int[] prices2 = {7, 1, 5, 3, 6, 4};\n        int minPrice = Integer.MAX_VALUE;\n        int maxProfit2 = 0;\n        \n        for (int price : prices2) {\n            if (price < minPrice) {\n                minPrice = price;\n            } else {\n                int profit = price - minPrice;\n                maxProfit2 = Math.max(maxProfit2, profit);\n            }\n        }\n        \n        System.out.println(\"Max Profit (Single Pass): \" + maxProfit2);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "sliding-window"
    },
    {
        "id": "nc150-sliding-window-015_best_time_buy_sell-3",
        "name": "Best Time Buy Sell: Two Pointers (Sliding Window)",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 15: Best Time to Buy and Sell Stock\n// ================================================\n// Given an array prices where prices[i] is the price of a stock on day i,\n// find the maximum profit from one transaction (buy one, sell one).\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] prices3 = {7, 1, 5, 3, 6, 4};\n        int left3 = 0;  // Buy day\n        int right3 = 1; // Sell day\n        int maxProfit3 = 0;\n        \n        while (right3 < prices3.length) {\n            if (prices3[left3] < prices3[right3]) {\n                int profit = prices3[right3] - prices3[left3];\n                maxProfit3 = Math.max(maxProfit3, profit);\n            } else {\n                left3 = right3; // Found a lower buy price\n            }\n            right3++;\n        }\n        \n        System.out.println(\"Max Profit (Two Pointers): \" + maxProfit3);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "sliding-window"
    },
    {
        "id": "nc150-sliding-window-016_longest_substring-1",
        "name": "Longest Substring: Brute Force",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 16: Longest Substring Without Repeating Characters\n// ================================================\n// Given a string s, find the length of the longest substring \n// without repeating characters.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String s = \"abcabcbb\";\n        int maxLen1 = 0;\n        \n        for (int i = 0; i < s.length(); i++) {\n            Set<Character> seen = new HashSet<>();\n            for (int j = i; j < s.length(); j++) {\n                if (seen.contains(s.charAt(j))) {\n                    break;\n                }\n                seen.add(s.charAt(j));\n                maxLen1 = Math.max(maxLen1, j - i + 1);\n            }\n        }\n        \n        System.out.println(\"Longest Substring (Brute Force): \" + maxLen1);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "sliding-window"
    },
    {
        "id": "nc150-sliding-window-016_longest_substring-2",
        "name": "Longest Substring: Sliding Window + HashSet",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 16: Longest Substring Without Repeating Characters\n// ================================================\n// Given a string s, find the length of the longest substring \n// without repeating characters.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String s2 = \"abcabcbb\";\n        Set<Character> charSet = new HashSet<>();\n        int left = 0;\n        int maxLen2 = 0;\n        \n        for (int right = 0; right < s2.length(); right++) {\n            // Shrink window until no duplicates\n            while (charSet.contains(s2.charAt(right))) {\n                charSet.remove(s2.charAt(left));\n                left++;\n            }\n            \n            charSet.add(s2.charAt(right));\n            maxLen2 = Math.max(maxLen2, right - left + 1);\n        }\n        \n        System.out.println(\"Longest Substring (Sliding Window): \" + maxLen2);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "sliding-window"
    },
    {
        "id": "nc150-sliding-window-016_longest_substring-3",
        "name": "Longest Substring: Sliding Window + HashMap (Jump)",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 16: Longest Substring Without Repeating Characters\n// ================================================\n// Given a string s, find the length of the longest substring \n// without repeating characters.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Store last index of each character to jump directly\n        String s3 = \"abcabcbb\";\n        Map<Character, Integer> lastIndex = new HashMap<>();\n        int left3 = 0;\n        int maxLen3 = 0;\n        \n        for (int right = 0; right < s3.length(); right++) {\n            char c = s3.charAt(right);\n            \n            if (lastIndex.containsKey(c) && lastIndex.get(c) >= left3) {\n                left3 = lastIndex.get(c) + 1;\n            }\n            \n            lastIndex.put(c, right);\n            maxLen3 = Math.max(maxLen3, right - left3 + 1);\n        }\n        \n        System.out.println(\"Longest Substring (HashMap Jump): \" + maxLen3);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "sliding-window"
    },
    {
        "id": "nc150-sliding-window-017_longest_repeating-1",
        "name": "Longest Repeating: Sliding Window with Frequency Count",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 17: Longest Repeating Character Replacement\n// ================================================\n// Given a string s and an integer k, you can change at most k characters\n// to any other uppercase English letter. Return the length of the longest\n// substring containing the same letter after performing the operations.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String s = \"AABABBA\";\n        int k = 1;\n        int maxLen = 0;\n        \n        // Try each character as the target\n        for (char target = 'A'; target <= 'Z'; target++) {\n            int left = 0;\n            int changes = 0;\n            \n            for (int right = 0; right < s.length(); right++) {\n                if (s.charAt(right) != target) {\n                    changes++;\n                }\n                \n                // Shrink window if too many changes needed\n                while (changes > k) {\n                    if (s.charAt(left) != target) {\n                        changes--;\n                    }\n                    left++;\n                }\n                \n                maxLen = Math.max(maxLen, right - left + 1);\n            }\n        }\n        \n        System.out.println(\"Longest Repeating (Per Character): \" + maxLen);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "sliding-window"
    },
    {
        "id": "nc150-sliding-window-017_longest_repeating-2",
        "name": "Longest Repeating: Sliding Window",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 17: Longest Repeating Character Replacement\n// ================================================\n// Given a string s and an integer k, you can change at most k characters\n// to any other uppercase English letter. Return the length of the longest\n// substring containing the same letter after performing the operations.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String s2 = \"AABABBA\";\n        int k2 = 1;\n        \n        int[] count = new int[26];\n        int left2 = 0;\n        int maxFreq = 0;  // Max frequency of any character in current window\n        int maxLen2 = 0;\n        \n        for (int right = 0; right < s2.length(); right++) {\n            count[s2.charAt(right) - 'A']++;\n            maxFreq = Math.max(maxFreq, count[s2.charAt(right) - 'A']);\n            \n            // Window size - max frequency = characters to change\n            // If > k, shrink window\n            int windowSize = right - left2 + 1;\n            if (windowSize - maxFreq > k2) {\n                count[s2.charAt(left2) - 'A']--;\n                left2++;\n            }\n            \n            maxLen2 = Math.max(maxLen2, right - left2 + 1);\n        }\n        \n        System.out.println(\"Longest Repeating (Max Freq): \" + maxLen2);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "sliding-window"
    },
    {
        "id": "nc150-sliding-window-018_permutation_in_string-1",
        "name": "Permutation In String: Sorting with Sliding Window",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 18: Permutation in String\n// ================================================\n// Given two strings s1 and s2, return true if s2 contains a \n// permutation of s1 (s2 contains a substring that is an anagram of s1).\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String s1 = \"ab\";\n        String s2 = \"eidbaooo\";\n        \n        char[] s1Sorted = s1.toCharArray();\n        Arrays.sort(s1Sorted);\n        String s1SortedStr = new String(s1Sorted);\n        \n        boolean found1 = false;\n        for (int i = 0; i <= s2.length() - s1.length(); i++) {\n            char[] window = s2.substring(i, i + s1.length()).toCharArray();\n            Arrays.sort(window);\n            if (new String(window).equals(s1SortedStr)) {\n                found1 = true;\n                break;\n            }\n        }\n        \n        System.out.println(\"Permutation (Sorting): \" + found1);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "sliding-window"
    },
    {
        "id": "nc150-sliding-window-018_permutation_in_string-2",
        "name": "Permutation In String: Sliding Window with HashMap",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 18: Permutation in String\n// ================================================\n// Given two strings s1 and s2, return true if s2 contains a \n// permutation of s1 (s2 contains a substring that is an anagram of s1).\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String s1b = \"ab\";\n        String s2b = \"eidbaooo\";\n        \n        if (s1b.length() > s2b.length()) {\n            System.out.println(\"Permutation (HashMap): false\");\n        } else {\n            // Count characters in s1\n            Map<Character, Integer> s1Count = new HashMap<>();\n            Map<Character, Integer> windowCount = new HashMap<>();\n            \n            for (char c : s1b.toCharArray()) {\n                s1Count.put(c, s1Count.getOrDefault(c, 0) + 1);\n            }\n            \n            int left = 0;\n            boolean found2 = false;\n            \n            for (int right = 0; right < s2b.length(); right++) {\n                char c = s2b.charAt(right);\n                windowCount.put(c, windowCount.getOrDefault(c, 0) + 1);\n                \n                // Shrink window if too large\n                if (right - left + 1 > s1b.length()) {\n                    char leftChar = s2b.charAt(left);\n                    windowCount.put(leftChar, windowCount.get(leftChar) - 1);\n                    if (windowCount.get(leftChar) == 0) {\n                        windowCount.remove(leftChar);\n                    }\n                    left++;\n                }\n                \n                // Check if window matches s1\n                if (windowCount.equals(s1Count)) {\n                    found2 = true;\n                    break;\n                }\n            }\n            \n            System.out.println(\"Permutation (HashMap): \" + found2);\n        }\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "sliding-window"
    },
    {
        "id": "nc150-sliding-window-018_permutation_in_string-3",
        "name": "Permutation In String: Sliding Window with Array",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 18: Permutation in String\n// ================================================\n// Given two strings s1 and s2, return true if s2 contains a \n// permutation of s1 (s2 contains a substring that is an anagram of s1).\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String s1c = \"ab\";\n        String s2c = \"eidbaooo\";\n        \n        int[] s1Freq = new int[26];\n        int[] windowFreq = new int[26];\n        \n        for (char c : s1c.toCharArray()) {\n            s1Freq[c - 'a']++;\n        }\n        \n        int left3 = 0;\n        boolean found3 = false;\n        \n        for (int right = 0; right < s2c.length(); right++) {\n            windowFreq[s2c.charAt(right) - 'a']++;\n            \n            if (right - left3 + 1 > s1c.length()) {\n                windowFreq[s2c.charAt(left3) - 'a']--;\n                left3++;\n            }\n            \n            if (Arrays.equals(s1Freq, windowFreq)) {\n                found3 = true;\n                break;\n            }\n        }\n        \n        System.out.println(\"Permutation (Array): \" + found3);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "sliding-window"
    },
    {
        "id": "nc150-sliding-window-019_minimum_window-1",
        "name": "Minimum Window: Sliding Window with HashMap",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 19: Minimum Window Substring\n// ================================================\n// Given strings s and t, return the minimum window substring of s \n// such that every character in t (including duplicates) is included.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String s = \"ADOBECODEBANC\";\n        String t = \"ABC\";\n        \n        if (s.length() == 0 || t.length() == 0) {\n            System.out.println(\"Minimum Window: \\\"\\\"\");\n        } else {\n            // Count characters needed from t\n            Map<Character, Integer> need = new HashMap<>();\n            for (char c : t.toCharArray()) {\n                need.put(c, need.getOrDefault(c, 0) + 1);\n            }\n            \n            Map<Character, Integer> window = new HashMap<>();\n            int have = 0;\n            int required = need.size();\n            \n            int left = 0;\n            int minLen = Integer.MAX_VALUE;\n            int minStart = 0;\n            \n            for (int right = 0; right < s.length(); right++) {\n                char c = s.charAt(right);\n                window.put(c, window.getOrDefault(c, 0) + 1);\n                \n                // Check if we satisfied this character's requirement\n                if (need.containsKey(c) && window.get(c).equals(need.get(c))) {\n                    have++;\n                }\n                \n                // Try to shrink window while valid\n                while (have == required) {\n                    // Update minimum\n                    if (right - left + 1 < minLen) {\n                        minLen = right - left + 1;\n                        minStart = left;\n                    }\n                    \n                    // Remove leftmost character\n                    char leftChar = s.charAt(left);\n                    window.put(leftChar, window.get(leftChar) - 1);\n                    \n                    if (need.containsKey(leftChar) && window.get(leftChar) < need.get(leftChar)) {\n                        have--;\n                    }\n                    \n                    left++;\n                }\n            }\n            \n            String result = minLen == Integer.MAX_VALUE ? \"\" : s.substring(minStart, minStart + minLen);\n            System.out.println(\"Minimum Window (HashMap): \\\"\" + result + \"\\\"\");\n        }\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "sliding-window"
    },
    {
        "id": "nc150-sliding-window-019_minimum_window-2",
        "name": "Minimum Window: Sliding Window with Array",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 19: Minimum Window Substring\n// ================================================\n// Given strings s and t, return the minimum window substring of s \n// such that every character in t (including duplicates) is included.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String s2 = \"ADOBECODEBANC\";\n        String t2 = \"ABC\";\n        \n        int[] need2 = new int[128]; // ASCII\n        int[] window2 = new int[128];\n        \n        for (char c : t2.toCharArray()) {\n            need2[c]++;\n        }\n        \n        // Count unique characters needed\n        int required2 = 0;\n        for (int n : need2) {\n            if (n > 0) required2++;\n        }\n        \n        int left2 = 0;\n        int have2 = 0;\n        int minLen2 = Integer.MAX_VALUE;\n        int minStart2 = 0;\n        \n        for (int right = 0; right < s2.length(); right++) {\n            char c = s2.charAt(right);\n            window2[c]++;\n            \n            if (need2[c] > 0 && window2[c] == need2[c]) {\n                have2++;\n            }\n            \n            while (have2 == required2) {\n                if (right - left2 + 1 < minLen2) {\n                    minLen2 = right - left2 + 1;\n                    minStart2 = left2;\n                }\n                \n                char leftChar = s2.charAt(left2);\n                window2[leftChar]--;\n                \n                if (need2[leftChar] > 0 && window2[leftChar] < need2[leftChar]) {\n                    have2--;\n                }\n                \n                left2++;\n            }\n        }\n        \n        String result2 = minLen2 == Integer.MAX_VALUE ? \"\" : s2.substring(minStart2, minStart2 + minLen2);\n        System.out.println(\"Minimum Window (Array): \\\"\" + result2 + \"\\\"\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "sliding-window"
    },
    {
        "id": "nc150-sliding-window-020_sliding_window_max-1",
        "name": "Sliding Window Max: Brute Force",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 20: Sliding Window Maximum\n// ================================================\n// Given an array nums and a sliding window of size k, return \n// the max value in each window as it slides from left to right.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums = {1, 3, -1, -3, 5, 3, 6, 7};\n        int k = 3;\n        \n        int[] result1 = new int[nums.length - k + 1];\n        \n        for (int i = 0; i <= nums.length - k; i++) {\n            int max = Integer.MIN_VALUE;\n            for (int j = i; j < i + k; j++) {\n                max = Math.max(max, nums[j]);\n            }\n            result1[i] = max;\n        }\n        \n        System.out.println(\"Sliding Window Max (Brute Force): \" + Arrays.toString(result1));\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "sliding-window"
    },
    {
        "id": "nc150-sliding-window-020_sliding_window_max-2",
        "name": "Sliding Window Max: Max Heap",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 20: Sliding Window Maximum\n// ================================================\n// Given an array nums and a sliding window of size k, return \n// the max value in each window as it slides from left to right.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums2 = {1, 3, -1, -3, 5, 3, 6, 7};\n        int k2 = 3;\n        \n        // Max heap storing [value, index]\n        PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> b[0] - a[0]);\n        int[] result2 = new int[nums2.length - k2 + 1];\n        int idx = 0;\n        \n        for (int i = 0; i < nums2.length; i++) {\n            maxHeap.offer(new int[]{nums2[i], i});\n            \n            // Remove elements outside window\n            while (maxHeap.peek()[1] <= i - k2) {\n                maxHeap.poll();\n            }\n            \n            if (i >= k2 - 1) {\n                result2[idx++] = maxHeap.peek()[0];\n            }\n        }\n        \n        System.out.println(\"Sliding Window Max (Max Heap): \" + Arrays.toString(result2));\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "sliding-window"
    },
    {
        "id": "nc150-sliding-window-020_sliding_window_max-3",
        "name": "Sliding Window Max: Monotonic Deque",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 20: Sliding Window Maximum\n// ================================================\n// Given an array nums and a sliding window of size k, return \n// the max value in each window as it slides from left to right.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Deque stores indices of elements in decreasing order\n        int[] nums3 = {1, 3, -1, -3, 5, 3, 6, 7};\n        int k3 = 3;\n        \n        Deque<Integer> deque = new ArrayDeque<>();\n        int[] result3 = new int[nums3.length - k3 + 1];\n        int idx3 = 0;\n        \n        for (int i = 0; i < nums3.length; i++) {\n            // Remove elements outside window\n            while (!deque.isEmpty() && deque.peekFirst() <= i - k3) {\n                deque.pollFirst();\n            }\n            \n            // Remove smaller elements (they can never be max)\n            while (!deque.isEmpty() && nums3[deque.peekLast()] < nums3[i]) {\n                deque.pollLast();\n            }\n            \n            deque.offerLast(i);\n            \n            if (i >= k3 - 1) {\n                result3[idx3++] = nums3[deque.peekFirst()];\n            }\n        }\n        \n        System.out.println(\"Sliding Window Max (Deque): \" + Arrays.toString(result3));\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "sliding-window"
    },
    {
        "id": "nc150-stack-021_valid_parentheses-1",
        "name": "Valid Parentheses: Stack",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 21: Valid Parentheses\n// ================================================\n// Given a string s containing just the characters '(', ')', '{', '}', \n// '[' and ']', determine if the input string is valid.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String s = \"()[]{}\";\n        Stack<Character> stack = new Stack<>();\n        boolean isValid = true;\n        \n        Map<Character, Character> pairs = new HashMap<>();\n        pairs.put(')', '(');\n        pairs.put('}', '{');\n        pairs.put(']', '[');\n        \n        for (char c : s.toCharArray()) {\n            if (pairs.containsKey(c)) {\n                // Closing bracket\n                if (stack.isEmpty() || stack.pop() != pairs.get(c)) {\n                    isValid = false;\n                    break;\n                }\n            } else {\n                // Opening bracket\n                stack.push(c);\n            }\n        }\n        \n        if (!stack.isEmpty()) {\n            isValid = false;\n        }\n        \n        System.out.println(\"Valid Parentheses (Stack): \" + isValid);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "stack"
    },
    {
        "id": "nc150-stack-021_valid_parentheses-2",
        "name": "Valid Parentheses: Replace Method",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 21: Valid Parentheses\n// ================================================\n// Given a string s containing just the characters '(', ')', '{', '}', \n// '[' and ']', determine if the input string is valid.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String s2 = \"()[]{}\";\n        String temp = s2;\n        \n        while (temp.contains(\"()\") || temp.contains(\"{}\") || temp.contains(\"[]\")) {\n            temp = temp.replace(\"()\", \"\");\n            temp = temp.replace(\"{}\", \"\");\n            temp = temp.replace(\"[]\", \"\");\n        }\n        \n        boolean isValid2 = temp.isEmpty();\n        System.out.println(\"Valid Parentheses (Replace): \" + isValid2);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "stack"
    },
    {
        "id": "nc150-stack-022_min_stack-1",
        "name": "Min Stack: Two Stacks",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 22: Min Stack\n// ================================================\n// Design a stack that supports push, pop, top, and retrieving the \n// minimum element in constant time.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        Stack<Integer> mainStack = new Stack<>();\n        Stack<Integer> minStack = new Stack<>();\n        \n        // Push operation\n        int val1 = -2;\n        mainStack.push(val1);\n        if (minStack.isEmpty() || val1 <= minStack.peek()) {\n            minStack.push(val1);\n        }\n        \n        int val2 = 0;\n        mainStack.push(val2);\n        if (minStack.isEmpty() || val2 <= minStack.peek()) {\n            minStack.push(val2);\n        }\n        \n        int val3 = -3;\n        mainStack.push(val3);\n        if (minStack.isEmpty() || val3 <= minStack.peek()) {\n            minStack.push(val3);\n        }\n        \n        System.out.println(\"Min Stack - getMin(): \" + minStack.peek()); // -3\n        \n        // Pop operation\n        int popped = mainStack.pop();\n        if (popped == minStack.peek()) {\n            minStack.pop();\n        }\n        \n        System.out.println(\"Min Stack - top(): \" + mainStack.peek()); // 0\n        System.out.println(\"Min Stack - getMin(): \" + minStack.peek()); // -2\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "stack"
    },
    {
        "id": "nc150-stack-022_min_stack-2",
        "name": "Min Stack: Single Stack with Pairs",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 22: Min Stack\n// ================================================\n// Design a stack that supports push, pop, top, and retrieving the \n// minimum element in constant time.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Store [value, minAtThisPoint] pairs\n        Stack<int[]> singleStack = new Stack<>();\n        \n        // Push operations\n        int v1 = -2;\n        int min1 = singleStack.isEmpty() ? v1 : Math.min(v1, singleStack.peek()[1]);\n        singleStack.push(new int[]{v1, min1});\n        \n        int v2 = 0;\n        int min2 = Math.min(v2, singleStack.peek()[1]);\n        singleStack.push(new int[]{v2, min2});\n        \n        int v3 = -3;\n        int min3 = Math.min(v3, singleStack.peek()[1]);\n        singleStack.push(new int[]{v3, min3});\n        \n        System.out.println(\"\\nSingle Stack - getMin(): \" + singleStack.peek()[1]); // -3\n        \n        // Pop\n        singleStack.pop();\n        \n        System.out.println(\"Single Stack - top(): \" + singleStack.peek()[0]); // 0\n        System.out.println(\"Single Stack - getMin(): \" + singleStack.peek()[1]); // -2\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "stack"
    },
    {
        "id": "nc150-stack-023_eval_rpn-1",
        "name": "Eval Rpn",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 23: Evaluate Reverse Polish Notation\n// ================================================\n// Evaluate the value of an arithmetic expression in Reverse Polish Notation.\n// Valid operators are +, -, *, /. Integer division truncates toward zero.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String[] tokens = {\"2\", \"1\", \"+\", \"3\", \"*\"};\n        Stack<Integer> stack = new Stack<>();\n        \n        for (String token : tokens) {\n            if (token.equals(\"+\")) {\n                int b = stack.pop();\n                int a = stack.pop();\n                stack.push(a + b);\n            } else if (token.equals(\"-\")) {\n                int b = stack.pop();\n                int a = stack.pop();\n                stack.push(a - b);\n            } else if (token.equals(\"*\")) {\n                int b = stack.pop();\n                int a = stack.pop();\n                stack.push(a * b);\n            } else if (token.equals(\"/\")) {\n                int b = stack.pop();\n                int a = stack.pop();\n                stack.push(a / b);  // Integer division\n            } else {\n                stack.push(Integer.parseInt(token));\n            }\n        }\n        \n        int result = stack.pop();\n        System.out.println(\"RPN Result: \" + result);  // (2 + 1) * 3 = 9\n        \n        // ============================================\n        // Example 2: More complex expression\n        // ============================================\n        String[] tokens2 = {\"4\", \"13\", \"5\", \"/\", \"+\"};\n        Stack<Integer> stack2 = new Stack<>();\n        \n        for (String token : tokens2) {\n            if (token.equals(\"+\") || token.equals(\"-\") || token.equals(\"*\") || token.equals(\"/\")) {\n                int b = stack2.pop();\n                int a = stack2.pop();\n                int res = 0;\n                switch (token) {\n                    case \"+\": res = a + b; break;\n                    case \"-\": res = a - b; break;\n                    case \"*\": res = a * b; break;\n                    case \"/\": res = a / b; break;\n                }\n                stack2.push(res);\n            } else {\n                stack2.push(Integer.parseInt(token));\n            }\n        }\n        \n        int result2 = stack2.pop();\n        System.out.println(\"RPN Result 2: \" + result2);  // 4 + (13 / 5) = 4 + 2 = 6\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "stack"
    },
    {
        "id": "nc150-stack-024_generate_parentheses-1",
        "name": "Generate Parentheses: Backtracking",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 24: Generate Parentheses\n// ================================================\n// Given n pairs of parentheses, generate all combinations of \n// well-formed parentheses.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int n = 3;\n        List<String> result = new ArrayList<>();\n        StringBuilder current = new StringBuilder();\n        \n        // Backtracking with open and close counts\n        Stack<int[]> states = new Stack<>();\n        states.push(new int[]{0, 0}); // [open count, close count]\n        \n        // Simulate backtracking iteratively for visualization\n        result.clear();\n        current = new StringBuilder();\n        int open = 0, close = 0;\n        \n        // Using iterative approach with explicit stack for visualization\n        List<String> generated = new ArrayList<>();\n        generateParentheses(generated, \"\", n, 0, 0);\n        \n        System.out.println(\"Generate Parentheses (n=\" + n + \"): \" + generated);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "stack"
    },
    {
        "id": "nc150-stack-024_generate_parentheses-2",
        "name": "Generate Parentheses: Dynamic Programming",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 24: Generate Parentheses\n// ================================================\n// Given n pairs of parentheses, generate all combinations of \n// well-formed parentheses.\n\n\n\npublic class Main {\n    // Helper Methods\n    static void generateParentheses(List<String> result, String current, int n, int open, int close) {\n    if (current.length() == 2 * n) {\n        result.add(current);\n        return;\n    }\n    \n    if (open < n) {\n        generateParentheses(result, current + \"(\", n, open + 1, close);\n    }\n    \n    if (close < open) {\n        generateParentheses(result, current + \")\", n, open, close + 1);\n    }\n}\n\n    public static void main(String[] args) {\n        // Build from smaller subproblems\n        // Each valid sequence of length 2n = \"(\" + inside + \")\" + outside\n        int n2 = 3;\n        List<List<String>> dp = new ArrayList<>();\n        \n        // Base case: n = 0\n        dp.add(new ArrayList<>());\n        dp.get(0).add(\"\");\n        \n        for (int i = 1; i <= n2; i++) {\n            List<String> current2 = new ArrayList<>();\n            \n            // Split: j pairs inside (), (i-1-j) pairs outside\n            for (int j = 0; j < i; j++) {\n                for (String inside : dp.get(j)) {\n                    for (String outside : dp.get(i - 1 - j)) {\n                        current2.add(\"(\" + inside + \")\" + outside);\n                    }\n                }\n            }\n            \n            dp.add(current2);\n        }\n        \n        System.out.println(\"Generate Parentheses DP: \" + dp.get(n2));\n        \n        // Helper method (simulated in main for visualization)\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "stack"
    },
    {
        "id": "nc150-stack-025_daily_temperatures-1",
        "name": "Daily Temperatures: Brute Force",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 25: Daily Temperatures\n// ================================================\n// Given an array of integers temperatures, return an array answer such that\n// answer[i] is the number of days you have to wait after day i to get a \n// warmer temperature.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] temperatures = {73, 74, 75, 71, 69, 72, 76, 73};\n        int[] answer1 = new int[temperatures.length];\n        \n        for (int i = 0; i < temperatures.length; i++) {\n            for (int j = i + 1; j < temperatures.length; j++) {\n                if (temperatures[j] > temperatures[i]) {\n                    answer1[i] = j - i;\n                    break;\n                }\n            }\n        }\n        \n        System.out.println(\"Daily Temperatures (Brute Force): \" + Arrays.toString(answer1));\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "stack"
    },
    {
        "id": "nc150-stack-025_daily_temperatures-2",
        "name": "Daily Temperatures: Monotonic Stack",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 25: Daily Temperatures\n// ================================================\n// Given an array of integers temperatures, return an array answer such that\n// answer[i] is the number of days you have to wait after day i to get a \n// warmer temperature.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Stack stores indices of temperatures in decreasing order\n        int[] temperatures2 = {73, 74, 75, 71, 69, 72, 76, 73};\n        int[] answer2 = new int[temperatures2.length];\n        Stack<Integer> stack = new Stack<>();\n        \n        for (int i = 0; i < temperatures2.length; i++) {\n            // Pop all temperatures smaller than current\n            while (!stack.isEmpty() && temperatures2[i] > temperatures2[stack.peek()]) {\n                int prevIndex = stack.pop();\n                answer2[prevIndex] = i - prevIndex;\n            }\n            stack.push(i);\n        }\n        \n        System.out.println(\"Daily Temperatures (Stack): \" + Arrays.toString(answer2));\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "stack"
    },
    {
        "id": "nc150-stack-025_daily_temperatures-3",
        "name": "Daily Temperatures: Iterate from Right",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 25: Daily Temperatures\n// ================================================\n// Given an array of integers temperatures, return an array answer such that\n// answer[i] is the number of days you have to wait after day i to get a \n// warmer temperature.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] temperatures3 = {73, 74, 75, 71, 69, 72, 76, 73};\n        int[] answer3 = new int[temperatures3.length];\n        \n        for (int i = temperatures3.length - 2; i >= 0; i--) {\n            int j = i + 1;\n            \n            while (j < temperatures3.length) {\n                if (temperatures3[j] > temperatures3[i]) {\n                    answer3[i] = j - i;\n                    break;\n                } else if (answer3[j] == 0) {\n                    // No warmer day after j\n                    answer3[i] = 0;\n                    break;\n                } else {\n                    // Jump to the next warmer day after j\n                    j += answer3[j];\n                }\n            }\n        }\n        \n        System.out.println(\"Daily Temperatures (Right Iterate): \" + Arrays.toString(answer3));\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "stack"
    },
    {
        "id": "nc150-stack-026_car_fleet-1",
        "name": "Car Fleet: Sort + Stack",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 26: Car Fleet\n// ================================================\n// There are n cars heading to the same destination. Each car has a \n// position and speed. A car fleet is a group of cars that travel at \n// the same speed. Return the number of car fleets.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int target = 12;\n        int[] position = {10, 8, 0, 5, 3};\n        int[] speed = {2, 4, 1, 1, 3};\n        \n        // Pair positions with speeds and sort by position descending\n        int n = position.length;\n        int[][] cars = new int[n][2];\n        for (int i = 0; i < n; i++) {\n            cars[i][0] = position[i];\n            cars[i][1] = speed[i];\n        }\n        \n        // Sort by position in descending order (cars closer to target first)\n        Arrays.sort(cars, (a, b) -> b[0] - a[0]);\n        \n        // Calculate time to reach target for each car\n        double[] timeToTarget = new double[n];\n        for (int i = 0; i < n; i++) {\n            timeToTarget[i] = (double)(target - cars[i][0]) / cars[i][1];\n        }\n        \n        // Stack to count fleets\n        Stack<Double> fleets = new Stack<>();\n        \n        for (double time : timeToTarget) {\n            // If current car takes longer than fleet at top, it forms new fleet\n            // Otherwise, it joins the existing fleet\n            if (fleets.isEmpty() || time > fleets.peek()) {\n                fleets.push(time);\n            }\n            // If time <= fleets.peek(), car catches up and joins that fleet\n        }\n        \n        System.out.println(\"Car Fleet (Stack): \" + fleets.size());\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "stack"
    },
    {
        "id": "nc150-stack-026_car_fleet-2",
        "name": "Car Fleet: Sort + Counter",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 26: Car Fleet\n// ================================================\n// There are n cars heading to the same destination. Each car has a \n// position and speed. A car fleet is a group of cars that travel at \n// the same speed. Return the number of car fleets.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int target2 = 12;\n        int[] position2 = {10, 8, 0, 5, 3};\n        int[] speed2 = {2, 4, 1, 1, 3};\n        \n        int n2 = position2.length;\n        double[][] carsWithTime = new double[n2][2];\n        for (int i = 0; i < n2; i++) {\n            carsWithTime[i][0] = position2[i];\n            carsWithTime[i][1] = (double)(target2 - position2[i]) / speed2[i];\n        }\n        \n        // Sort by position descending\n        Arrays.sort(carsWithTime, (a, b) -> Double.compare(b[0], a[0]));\n        \n        int fleetCount = 0;\n        double maxTime = 0;\n        \n        for (int i = 0; i < n2; i++) {\n            if (carsWithTime[i][1] > maxTime) {\n                fleetCount++;\n                maxTime = carsWithTime[i][1];\n            }\n        }\n        \n        System.out.println(\"Car Fleet (Counter): \" + fleetCount);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "stack"
    },
    {
        "id": "nc150-stack-027_largest_rectangle-1",
        "name": "Largest Rectangle: Brute Force",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 27: Largest Rectangle in Histogram\n// ================================================\n// Given an array of integers heights representing the histogram's bar \n// heights, find the area of the largest rectangle in the histogram.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] heights = {2, 1, 5, 6, 2, 3};\n        int maxArea1 = 0;\n        \n        for (int i = 0; i < heights.length; i++) {\n            int minHeight = heights[i];\n            for (int j = i; j < heights.length; j++) {\n                minHeight = Math.min(minHeight, heights[j]);\n                int width = j - i + 1;\n                int area = minHeight * width;\n                maxArea1 = Math.max(maxArea1, area);\n            }\n        }\n        \n        System.out.println(\"Largest Rectangle (Brute Force): \" + maxArea1);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "stack"
    },
    {
        "id": "nc150-stack-027_largest_rectangle-2",
        "name": "Largest Rectangle: Monotonic Stack",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 27: Largest Rectangle in Histogram\n// ================================================\n// Given an array of integers heights representing the histogram's bar \n// heights, find the area of the largest rectangle in the histogram.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Stack stores indices of increasing heights\n        int[] heights2 = {2, 1, 5, 6, 2, 3};\n        Stack<Integer> stack = new Stack<>();\n        int maxArea2 = 0;\n        \n        for (int i = 0; i <= heights2.length; i++) {\n            // Use 0 as sentinel for the end\n            int currentHeight = (i == heights2.length) ? 0 : heights2[i];\n            \n            while (!stack.isEmpty() && currentHeight < heights2[stack.peek()]) {\n                int height = heights2[stack.pop()];\n                int width = stack.isEmpty() ? i : i - stack.peek() - 1;\n                int area = height * width;\n                maxArea2 = Math.max(maxArea2, area);\n            }\n            \n            stack.push(i);\n        }\n        \n        System.out.println(\"Largest Rectangle (Stack): \" + maxArea2);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "stack"
    },
    {
        "id": "nc150-stack-027_largest_rectangle-3",
        "name": "Largest Rectangle: Left and Right Boundaries",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 27: Largest Rectangle in Histogram\n// ================================================\n// Given an array of integers heights representing the histogram's bar \n// heights, find the area of the largest rectangle in the histogram.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] heights3 = {2, 1, 5, 6, 2, 3};\n        int n = heights3.length;\n        \n        // Find first smaller element on left for each bar\n        int[] leftBoundary = new int[n];\n        Stack<Integer> leftStack = new Stack<>();\n        for (int i = 0; i < n; i++) {\n            while (!leftStack.isEmpty() && heights3[leftStack.peek()] >= heights3[i]) {\n                leftStack.pop();\n            }\n            leftBoundary[i] = leftStack.isEmpty() ? -1 : leftStack.peek();\n            leftStack.push(i);\n        }\n        \n        // Find first smaller element on right for each bar\n        int[] rightBoundary = new int[n];\n        Stack<Integer> rightStack = new Stack<>();\n        for (int i = n - 1; i >= 0; i--) {\n            while (!rightStack.isEmpty() && heights3[rightStack.peek()] >= heights3[i]) {\n                rightStack.pop();\n            }\n            rightBoundary[i] = rightStack.isEmpty() ? n : rightStack.peek();\n            rightStack.push(i);\n        }\n        \n        // Calculate max area using boundaries\n        int maxArea3 = 0;\n        for (int i = 0; i < n; i++) {\n            int width = rightBoundary[i] - leftBoundary[i] - 1;\n            int area = heights3[i] * width;\n            maxArea3 = Math.max(maxArea3, area);\n        }\n        \n        System.out.println(\"Largest Rectangle (Boundaries): \" + maxArea3);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "stack"
    },
    {
        "id": "nc150-binary-search-028_binary_search-1",
        "name": "Binary Search: Iterative",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 28: Binary Search\n// ================================================\n// Given an array of integers nums sorted in ascending order, and an \n// integer target, search for target in nums. Return index or -1.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums = {-1, 0, 3, 5, 9, 12};\n        int target = 9;\n        \n        int left = 0;\n        int right = nums.length - 1;\n        int result = -1;\n        \n        while (left <= right) {\n            int mid = left + (right - left) / 2;  // Avoid overflow\n            \n            if (nums[mid] == target) {\n                result = mid;\n                break;\n            } else if (nums[mid] < target) {\n                left = mid + 1;\n            } else {\n                right = mid - 1;\n            }\n        }\n        \n        System.out.println(\"Binary Search (Iterative): \" + result);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "binary-search"
    },
    {
        "id": "nc150-binary-search-028_binary_search-2",
        "name": "Binary Search: Recursive",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 28: Binary Search\n// ================================================\n// Given an array of integers nums sorted in ascending order, and an \n// integer target, search for target in nums. Return index or -1.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums2 = {-1, 0, 3, 5, 9, 12};\n        int target2 = 9;\n        \n        // Simulating recursion with explicit stack for visualization\n        Stack<int[]> callStack = new Stack<>();\n        callStack.push(new int[]{0, nums2.length - 1});\n        int result2 = -1;\n        \n        while (!callStack.isEmpty() && result2 == -1) {\n            int[] range = callStack.pop();\n            int lo = range[0];\n            int hi = range[1];\n            \n            if (lo <= hi) {\n                int mid = lo + (hi - lo) / 2;\n                \n                if (nums2[mid] == target2) {\n                    result2 = mid;\n                } else if (nums2[mid] < target2) {\n                    callStack.push(new int[]{mid + 1, hi});\n                } else {\n                    callStack.push(new int[]{lo, mid - 1});\n                }\n            }\n        }\n        \n        System.out.println(\"Binary Search (Recursive sim): \" + result2);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "binary-search"
    },
    {
        "id": "nc150-binary-search-029_search_2d_matrix-1",
        "name": "Search 2D Matrix: Binary Search on Flattened",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 29: Search a 2D Matrix\n// ================================================\n// Write an efficient algorithm that searches for a value in a m x n matrix.\n// Integers in each row are sorted. First integer of each row > last of previous.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[][] matrix = {\n            {1, 3, 5, 7},\n            {10, 11, 16, 20},\n            {23, 30, 34, 60}\n        };\n        int target = 3;\n        \n        int m = matrix.length;\n        int n = matrix[0].length;\n        int left = 0;\n        int right = m * n - 1;\n        boolean found = false;\n        \n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            int row = mid / n;\n            int col = mid % n;\n            int midVal = matrix[row][col];\n            \n            if (midVal == target) {\n                found = true;\n                break;\n            } else if (midVal < target) {\n                left = mid + 1;\n            } else {\n                right = mid - 1;\n            }\n        }\n        \n        System.out.println(\"Search 2D Matrix (Flattened): \" + found);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "binary-search"
    },
    {
        "id": "nc150-binary-search-029_search_2d_matrix-2",
        "name": "Search 2D Matrix: Two Binary Searches",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 29: Search a 2D Matrix\n// ================================================\n// Write an efficient algorithm that searches for a value in a m x n matrix.\n// Integers in each row are sorted. First integer of each row > last of previous.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[][] matrix2 = {\n            {1, 3, 5, 7},\n            {10, 11, 16, 20},\n            {23, 30, 34, 60}\n        };\n        int target2 = 3;\n        \n        int m = matrix2.length;\n        int n = matrix2[0].length;\n        \n        // First: binary search for the row\n        int top = 0, bottom = m - 1;\n        int targetRow = -1;\n        \n        while (top <= bottom) {\n            int midRow = top + (bottom - top) / 2;\n            \n            if (matrix2[midRow][0] <= target2 && target2 <= matrix2[midRow][n-1]) {\n                targetRow = midRow;\n                break;\n            } else if (matrix2[midRow][0] > target2) {\n                bottom = midRow - 1;\n            } else {\n                top = midRow + 1;\n            }\n        }\n        \n        boolean found2 = false;\n        if (targetRow != -1) {\n            // Second: binary search within the row\n            int left = 0;\n            int right = n - 1;\n            \n            while (left <= right) {\n                int mid = left + (right - left) / 2;\n                \n                if (matrix2[targetRow][mid] == target2) {\n                    found2 = true;\n                    break;\n                } else if (matrix2[targetRow][mid] < target2) {\n                    left = mid + 1;\n                } else {\n                    right = mid - 1;\n                }\n            }\n        }\n        \n        System.out.println(\"Search 2D Matrix (Two BS): \" + found2);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "binary-search"
    },
    {
        "id": "nc150-binary-search-030_koko_bananas-1",
        "name": "Koko Bananas: Binary Search on Answer",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 30: Koko Eating Bananas\n// ================================================\n// Koko loves to eat bananas. There are n piles of bananas, and guards will \n// return in h hours. Koko can decide her eating speed k (bananas per hour).\n// Return the minimum integer k such that she can eat all bananas within h hours.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] piles = {3, 6, 7, 11};\n        int h = 8;\n        \n        // Find the maximum value in piles\n        int maxPile = 0;\n        for (int pile : piles) {\n            maxPile = Math.max(maxPile, pile);\n        }\n        \n        int left = 1;\n        int right = maxPile;\n        int result = maxPile;\n        \n        while (left <= right) {\n            int mid = left + (right - left) / 2;  // Current eating speed k\n            \n            // Calculate hours needed at this speed\n            long hoursNeeded = 0;\n            for (int pile : piles) {\n                hoursNeeded += (pile + mid - 1) / mid;  // Ceiling division\n            }\n            \n            if (hoursNeeded <= h) {\n                result = mid;         // This speed works, try slower\n                right = mid - 1;\n            } else {\n                left = mid + 1;       // Need faster speed\n            }\n        }\n        \n        System.out.println(\"Koko Eating Speed: \" + result);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "binary-search"
    },
    {
        "id": "nc150-binary-search-030_koko_bananas-2",
        "name": "Koko Bananas: Linear Search (Brute Force)",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 30: Koko Eating Bananas\n// ================================================\n// Koko loves to eat bananas. There are n piles of bananas, and guards will \n// return in h hours. Koko can decide her eating speed k (bananas per hour).\n// Return the minimum integer k such that she can eat all bananas within h hours.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] piles2 = {3, 6, 7, 11};\n        int h2 = 8;\n        \n        maxPile = 0;\n        for (int pile : piles2) {\n            maxPile = Math.max(maxPile, pile);\n        }\n        \n        int result2 = maxPile;\n        for (int k = 1; k <= maxPile; k++) {\n            long hoursNeeded = 0;\n            for (int pile : piles2) {\n                hoursNeeded += (pile + k - 1) / k;\n            }\n            \n            if (hoursNeeded <= h2) {\n                result2 = k;\n                break;\n            }\n        }\n        \n        System.out.println(\"Koko Eating Speed (Linear): \" + result2);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "binary-search"
    },
    {
        "id": "nc150-binary-search-031_min_rotated_array-1",
        "name": "Min Rotated Array: Binary Search",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 31: Find Minimum in Rotated Sorted Array\n// ================================================\n// Suppose an array of length n sorted in ascending order is rotated \n// between 1 and n times. Find the minimum element.\n// Array has no duplicates.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums = {3, 4, 5, 1, 2};\n        \n        int left = 0;\n        int right = nums.length - 1;\n        \n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            \n            if (nums[mid] > nums[right]) {\n                // Minimum is in right half\n                left = mid + 1;\n            } else {\n                // Minimum is in left half (including mid)\n                right = mid;\n            }\n        }\n        \n        int minimum = nums[left];\n        System.out.println(\"Minimum in Rotated Array: \" + minimum);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "binary-search"
    },
    {
        "id": "nc150-binary-search-031_min_rotated_array-2",
        "name": "Min Rotated Array: Find Pivot Point",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 31: Find Minimum in Rotated Sorted Array\n// ================================================\n// Suppose an array of length n sorted in ascending order is rotated \n// between 1 and n times. Find the minimum element.\n// Array has no duplicates.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums2 = {3, 4, 5, 1, 2};\n        \n        // If array is not rotated\n        if (nums2[0] < nums2[nums2.length - 1]) {\n            System.out.println(\"Minimum (Pivot): \" + nums2[0]);\n        } else {\n            int left = 0;\n            int right = nums2.length - 1;\n            \n            while (left < right) {\n                int mid = left + (right - left) / 2;\n                \n                if (nums2[mid] > nums2[mid + 1]) {\n                    // Found the pivot, minimum is at mid + 1\n                    System.out.println(\"Minimum (Pivot): \" + nums2[mid + 1]);\n                    break;\n                } else if (nums2[mid] >= nums2[left]) {\n                    left = mid + 1;\n                } else {\n                    right = mid;\n                }\n            }\n        }\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "binary-search"
    },
    {
        "id": "nc150-binary-search-031_min_rotated_array-3",
        "name": "Min Rotated Array: Linear Search",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 31: Find Minimum in Rotated Sorted Array\n// ================================================\n// Suppose an array of length n sorted in ascending order is rotated \n// between 1 and n times. Find the minimum element.\n// Array has no duplicates.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums3 = {3, 4, 5, 1, 2};\n        int min3 = nums3[0];\n        \n        for (int num : nums3) {\n            min3 = Math.min(min3, num);\n        }\n        \n        System.out.println(\"Minimum (Linear): \" + min3);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "binary-search"
    },
    {
        "id": "nc150-binary-search-032_search_rotated-1",
        "name": "Search Rotated: Binary Search",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 32: Search in Rotated Sorted Array\n// ================================================\n// There is an integer array nums sorted in ascending order (distinct values).\n// Array is possibly rotated. Given target, return index or -1.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums = {4, 5, 6, 7, 0, 1, 2};\n        int target = 0;\n        \n        int left = 0;\n        int right = nums.length - 1;\n        int result = -1;\n        \n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            \n            if (nums[mid] == target) {\n                result = mid;\n                break;\n            }\n            \n            // Determine which half is sorted\n            if (nums[left] <= nums[mid]) {\n                // Left half is sorted\n                if (nums[left] <= target && target < nums[mid]) {\n                    right = mid - 1;  // Target in left half\n                } else {\n                    left = mid + 1;   // Target in right half\n                }\n            } else {\n                // Right half is sorted\n                if (nums[mid] < target && target <= nums[right]) {\n                    left = mid + 1;   // Target in right half\n                } else {\n                    right = mid - 1;  // Target in left half\n                }\n            }\n        }\n        \n        System.out.println(\"Search Rotated Array: \" + result);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "binary-search"
    },
    {
        "id": "nc150-binary-search-032_search_rotated-2",
        "name": "Search Rotated: Find Pivot + Binary Search",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 32: Search in Rotated Sorted Array\n// ================================================\n// There is an integer array nums sorted in ascending order (distinct values).\n// Array is possibly rotated. Given target, return index or -1.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums2 = {4, 5, 6, 7, 0, 1, 2};\n        int target2 = 0;\n        int n = nums2.length;\n        \n        // Step 1: Find the pivot (minimum element index)\n        int lo = 0, hi = n - 1;\n        while (lo < hi) {\n            int mid = lo + (hi - lo) / 2;\n            if (nums2[mid] > nums2[hi]) {\n                lo = mid + 1;\n            } else {\n                hi = mid;\n            }\n        }\n        int pivot = lo;  // Index of minimum element\n        \n        // Step 2: Determine which half to search\n        lo = 0;\n        hi = n - 1;\n        if (target2 >= nums2[pivot] && target2 <= nums2[n - 1]) {\n            lo = pivot;\n        } else {\n            hi = pivot - 1;\n        }\n        \n        // Step 3: Standard binary search\n        int result2 = -1;\n        while (lo <= hi) {\n            int mid = lo + (hi - lo) / 2;\n            if (nums2[mid] == target2) {\n                result2 = mid;\n                break;\n            } else if (nums2[mid] < target2) {\n                lo = mid + 1;\n            } else {\n                hi = mid - 1;\n            }\n        }\n        \n        System.out.println(\"Search Rotated (Two Phase): \" + result2);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "binary-search"
    },
    {
        "id": "nc150-binary-search-033_time_based_kv-1",
        "name": "Time Based Kv: HashMap + Binary Search",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 33: Time Based Key-Value Store\n// ================================================\n// Design a time-based key-value data structure that can store multiple \n// values for the same key at different timestamps and retrieve the \n// value at a certain timestamp.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Using HashMap where value is list of [timestamp, value] pairs\n        Map<String, List<int[]>> store = new HashMap<>();\n        \n        // SET operation\n        String key1 = \"foo\";\n        String val1 = \"bar\";\n        int timestamp1 = 1;\n        \n        if (!store.containsKey(key1)) {\n            store.put(key1, new ArrayList<>());\n        }\n        // Store as integer for simplicity (in real impl, store string)\n        store.get(key1).add(new int[]{timestamp1, 1}); // 1 represents \"bar\"\n        \n        // Another set\n        String key2 = \"foo\";\n        String val2 = \"bar2\";\n        int timestamp2 = 4;\n        store.get(key2).add(new int[]{timestamp2, 2}); // 2 represents \"bar2\"\n        \n        // GET operation using binary search\n        String getKey = \"foo\";\n        int getTimestamp = 3;\n        \n        List<int[]> values = store.get(getKey);\n        int left = 0, right = values.size() - 1;\n        int result = -1;  // -1 means no value found\n        \n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            \n            if (values.get(mid)[0] <= getTimestamp) {\n                result = values.get(mid)[1];  // Candidate result\n                left = mid + 1;               // Look for closer timestamp\n            } else {\n                int right = mid - 1;\n            }\n        }\n        \n        System.out.println(\"TimeMap get(foo, 3): \" + result); // Should be 1 (bar)\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "binary-search"
    },
    {
        "id": "nc150-binary-search-033_time_based_kv-2",
        "name": "Time Based Kv: HashMap + TreeMap",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 33: Time Based Key-Value Store\n// ================================================\n// Design a time-based key-value data structure that can store multiple \n// values for the same key at different timestamps and retrieve the \n// value at a certain timestamp.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        Map<String, TreeMap<Integer, String>> store2 = new HashMap<>();\n        \n        // SET\n        store2.put(\"foo\", new TreeMap<>());\n        store2.get(\"foo\").put(1, \"bar\");\n        store2.get(\"foo\").put(4, \"bar2\");\n        \n        // GET using TreeMap's floorEntry\n        TreeMap<Integer, String> timeMap = store2.get(\"foo\");\n        Map.Entry<Integer, String> entry = timeMap.floorEntry(3);\n        String result2 = (entry != null) ? entry.getValue() : \"\";\n        \n        System.out.println(\"TimeMap TreeMap get(foo, 3): \" + result2);\n        \n        // GET at exact timestamp\n        Map.Entry<Integer, String> entry2 = timeMap.floorEntry(4);\n        String result3 = (entry2 != null) ? entry2.getValue() : \"\";\n        \n        System.out.println(\"TimeMap TreeMap get(foo, 4): \" + result3);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "binary-search"
    },
    {
        "id": "nc150-binary-search-034_median_two_arrays-1",
        "name": "Median Two Arrays: Merge and Find",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 34: Median of Two Sorted Arrays\n// ================================================\n// Given two sorted arrays nums1 and nums2, return the median of \n// the combined sorted array. Must be O(log(m+n)).\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums1 = {1, 3};\n        int[] nums2 = {2};\n        \n        int[] merged = new int[nums1.length + nums2.length];\n        int i = 0, j = 0, k = 0;\n        \n        while (i < nums1.length && j < nums2.length) {\n            if (nums1[i] <= nums2[j]) {\n                merged[k++] = nums1[i++];\n            } else {\n                merged[k++] = nums2[j++];\n            }\n        }\n        \n        while (i < nums1.length) merged[k++] = nums1[i++];\n        while (j < nums2.length) merged[k++] = nums2[j++];\n        \n        double median1;\n        int n = merged.length;\n        if (n % 2 == 0) {\n            median1 = (merged[n/2 - 1] + merged[n/2]) / 2.0;\n        } else {\n            median1 = merged[n/2];\n        }\n        \n        System.out.println(\"Median (Merge): \" + median1);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "binary-search"
    },
    {
        "id": "nc150-binary-search-034_median_two_arrays-2",
        "name": "Median Two Arrays: Binary Search",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 34: Median of Two Sorted Arrays\n// ================================================\n// Given two sorted arrays nums1 and nums2, return the median of \n// the combined sorted array. Must be O(log(m+n)).\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] A = {1, 3};\n        int[] B = {2};\n        \n        // Ensure A is the shorter array\n        if (A.length > B.length) {\n            int[] temp = A;\n            A = B;\n            B = temp;\n        }\n        \n        int m = A.length;\n        int n = B.length;\n        int lo = 0, hi = m;\n        \n        while (lo <= hi) {\n            int partitionA = (lo + hi) / 2;\n            int partitionB = (m + n + 1) / 2 - partitionA;\n            \n            int maxLeftA = (partitionA == 0) ? Integer.MIN_VALUE : A[partitionA - 1];\n            int minRightA = (partitionA == m) ? Integer.MAX_VALUE : A[partitionA];\n            \n            int maxLeftB = (partitionB == 0) ? Integer.MIN_VALUE : B[partitionB - 1];\n            int minRightB = (partitionB == n) ? Integer.MAX_VALUE : B[partitionB];\n            \n            if (maxLeftA <= minRightB && maxLeftB <= minRightA) {\n                // Found correct partition\n                double median2;\n                if ((m + n) % 2 == 0) {\n                    median2 = (Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2.0;\n                } else {\n                    median2 = Math.max(maxLeftA, maxLeftB);\n                }\n                System.out.println(\"Median (Binary Search): \" + median2);\n                break;\n            } else if (maxLeftA > minRightB) {\n                hi = partitionA - 1;\n            } else {\n                lo = partitionA + 1;\n            }\n        }\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "binary-search"
    },
    {
        "id": "nc150-linked-list-035_reverse_list-1",
        "name": "Reverse List: Iterative",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 35: Reverse Linked List\n// ================================================\n// Given the head of a singly linked list, reverse the list and return the head.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Simulating LinkedList with array for visualization\n        int[] list = {1, 2, 3, 4, 5};\n        \n        // Simulate reversal with pointers\n        int prevIdx = -1;  // null\n        int currIdx = 0;   // head\n        \n        int[] reversed = new int[list.length];\n        int writeIdx = list.length - 1;\n        \n        for (int i = 0; i < list.length; i++) {\n            reversed[writeIdx--] = list[i];\n        }\n        \n        System.out.println(\"Reversed List (Iterative): \" + Arrays.toString(reversed));\n        \n        // ============================================\n        // Actual LinkedList Implementation (for reference)\n        // ============================================\n        /*\n        class ListNode {\n            int val;\n            ListNode next;\n            ListNode(int val) { this.val = val; }\n        }\n        \n        // Iterative approach\n        ListNode prev = null;\n        ListNode curr = head;\n        \n        while (curr != null) {\n            ListNode nextTemp = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = nextTemp;\n        }\n        return prev;  // New head\n        */\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "linked-list"
    },
    {
        "id": "nc150-linked-list-035_reverse_list-2",
        "name": "Reverse List: Recursive",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 35: Reverse Linked List\n// ================================================\n// Given the head of a singly linked list, reverse the list and return the head.\n\n\n\npublic class Main {\n    // Helper Methods\n    static ListNode reverseList(ListNode head) {\n    if (head == null || head.next == null) {\n        return head;\n    }\n    \n    ListNode newHead = reverseList(head.next);\n    head.next.next = head;\n    head.next = null;\n    \n    return newHead;\n}\n\n    public static void main(String[] args) {\n        // Simulating recursion\n        int[] list2 = {1, 2, 3, 4, 5};\n        Stack<Integer> stack = new Stack<>();\n        \n        for (int val : list2) {\n            stack.push(val);\n        }\n        \n        int[] reversed2 = new int[list2.length];\n        for (int i = 0; i < list2.length; i++) {\n            reversed2[i] = stack.pop();\n        }\n        \n        System.out.println(\"Reversed List (Recursive): \" + Arrays.toString(reversed2));\n        \n        /*\n        // Actual recursive implementation\n        */\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "linked-list"
    },
    {
        "id": "nc150-linked-list-036_merge_two_lists-1",
        "name": "Merge Two Lists: Iterative",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 36: Merge Two Sorted Lists\n// ================================================\n// Merge two sorted linked lists and return it as a sorted list.\n\n\n\npublic class Main {\n    // Helper Methods\n    static ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n    ListNode dummy = new ListNode(0);\n    ListNode current = dummy;\n    \n    while (l1 != null && l2 != null) {\n        if (l1.val <= l2.val) {\n            current.next = l1;\n            l1 = l1.next;\n        } else {\n            current.next = l2;\n            l2 = l2.next;\n        }\n        current = current.next;\n    }\n    \n    current.next = (l1 != null) ? l1 : l2;\n    return dummy.next;\n}\n\n    public static void main(String[] args) {\n        int[] list1 = {1, 2, 4};\n        int[] list2 = {1, 3, 4};\n        \n        int[] merged = new int[list1.length + list2.length];\n        int i = 0, j = 0, k = 0;\n        \n        while (i < list1.length && j < list2.length) {\n            if (list1[i] <= list2[j]) {\n                merged[k++] = list1[i++];\n            } else {\n                merged[k++] = list2[j++];\n            }\n        }\n        \n        while (i < list1.length) merged[k++] = list1[i++];\n        while (j < list2.length) merged[k++] = list2[j++];\n        \n        System.out.println(\"Merged Lists (Iterative): \" + Arrays.toString(merged));\n        \n        /*\n        // Actual LinkedList Implementation\n        */\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "linked-list"
    },
    {
        "id": "nc150-linked-list-036_merge_two_lists-2",
        "name": "Merge Two Lists: Recursive",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 36: Merge Two Sorted Lists\n// ================================================\n// Merge two sorted linked lists and return it as a sorted list.\n\n\n\npublic class Main {\n    // Helper Methods\n    static ListNode mergeTwoListsRecursive(ListNode l1, ListNode l2) {\n    if (l1 == null) return l2;\n    if (l2 == null) return l1;\n    \n    if (l1.val <= l2.val) {\n        l1.next = mergeTwoListsRecursive(l1.next, l2);\n        return l1;\n    } else {\n        l2.next = mergeTwoListsRecursive(l1, l2.next);\n        return l2;\n    }\n}\n    static void mergeRecursive(int[] l1, int i1, int[] l2, int i2, List<Integer> result) {\n    if (i1 >= l1.length) {\n        while (i2 < l2.length) result.add(l2[i2++]);\n        return;\n    }\n    if (i2 >= l2.length) {\n        while (i1 < l1.length) result.add(l1[i1++]);\n        return;\n    }\n    \n    if (l1[i1] <= l2[i2]) {\n        result.add(l1[i1]);\n        mergeRecursive(l1, i1 + 1, l2, i2, result);\n    } else {\n        result.add(l2[i2]);\n        mergeRecursive(l1, i1, l2, i2 + 1, result);\n    }\n}\n\n    public static void main(String[] args) {\n        // Simulating recursive merge\n        int[] l1 = {1, 2, 4};\n        int[] l2 = {1, 3, 4};\n        \n        List<Integer> result = new ArrayList<>();\n        mergeRecursive(l1, 0, l2, 0, result);\n        System.out.println(\"Merged Lists (Recursive): \" + result);\n        \n        /*\n        */\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "linked-list"
    },
    {
        "id": "nc150-linked-list-037_reorder_list-1",
        "name": "Reorder List",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 37: Reorder List\n// ================================================\n// Given a singly linked list: L0 \u2192 L1 \u2192 ... \u2192 Ln-1 \u2192 Ln\n// Reorder it to: L0 \u2192 Ln \u2192 L1 \u2192 Ln-1 \u2192 L2 \u2192 Ln-2 \u2192 ...\n\n\n\npublic class Main {\n    // Helper Methods\n    static void reorderList(ListNode head) {\n    if (head == null || head.next == null) return;\n    \n    // Step 1: Find middle using slow/fast pointers\n    ListNode slow = head, fast = head;\n    while (fast.next != null && fast.next.next != null) {\n        slow = slow.next;\n        fast = fast.next.next;\n    }\n    \n    // Step 2: Reverse second half\n    ListNode second = reverse(slow.next);\n    slow.next = null;\n    \n    // Step 3: Merge alternating\n    ListNode first = head;\n    while (second != null) {\n        ListNode tmp1 = first.next;\n        ListNode tmp2 = second.next;\n        first.next = second;\n        second.next = tmp1;\n        first = tmp1;\n        second = tmp2;\n    }\n}\n    static ListNode reverse(ListNode head) {\n    ListNode prev = null, curr = head;\n    while (curr != null) {\n        ListNode next = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}\n\n    public static void main(String[] args) {\n        int[] list = {1, 2, 3, 4, 5};\n        int n = list.length;\n        \n        // Step 1: Find the middle\n        int mid = (n - 1) / 2;\n        \n        // Step 2: Reverse second half\n        int[] secondHalf = new int[n - mid - 1];\n        for (int i = n - 1, j = 0; i > mid; i--, j++) {\n            secondHalf[j] = list[i];\n        }\n        \n        // Step 3: Merge first half and reversed second half\n        int[] reordered = new int[n];\n        int first = 0, second = 0, idx = 0;\n        \n        while (first <= mid || second < secondHalf.length) {\n            if (first <= mid) {\n                reordered[idx++] = list[first++];\n            }\n            if (second < secondHalf.length) {\n                reordered[idx++] = secondHalf[second++];\n            }\n        }\n        \n        System.out.println(\"Reordered List: \" + Arrays.toString(reordered));\n        \n        /*\n        // Actual LinkedList Implementation\n        \n        */\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "linked-list"
    },
    {
        "id": "nc150-linked-list-038_remove_nth_end-1",
        "name": "Remove Nth End: Two Pointers",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 38: Remove Nth Node From End of List\n// ================================================\n// Given the head of a linked list, remove the nth node from the end \n// of the list and return its head.\n\n\n\npublic class Main {\n    // Helper Methods\n    static ListNode removeNthFromEnd(ListNode head, int n) {\n    ListNode dummy = new ListNode(0);\n    dummy.next = head;\n    \n    ListNode first = dummy;\n    ListNode second = dummy;\n    \n    // Move second n+1 steps ahead\n    for (int i = 0; i <= n; i++) {\n        second = second.next;\n    }\n    \n    // Move both until second reaches end\n    while (second != null) {\n        first = first.next;\n        second = second.next;\n    }\n    \n    // Remove the nth node\n    first.next = first.next.next;\n    \n    return dummy.next;\n}\n\n    public static void main(String[] args) {\n        int[] list = {1, 2, 3, 4, 5};\n        int n = 2;  // Remove 2nd from end (node with value 4)\n        \n        // Simulate two pointers with gap of n\n        int first = 0;  // Will point to node before the one to remove\n        int second = n; // n steps ahead\n        \n        // Move second to the end\n        // When second reaches end, first will be at (length - n - 1)\n        \n        int length = list.length;\n        int removeIdx = length - n;\n        \n        // Create result without the removed element\n        int[] result = new int[length - 1];\n        int idx = 0;\n        for (int i = 0; i < length; i++) {\n            if (i != removeIdx) {\n                result[idx++] = list[i];\n            }\n        }\n        \n        System.out.println(\"After removing \" + n + \"th from end: \" + Arrays.toString(result));\n        \n        /*\n        // Actual LinkedList Implementation\n        */\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "linked-list"
    },
    {
        "id": "nc150-linked-list-038_remove_nth_end-2",
        "name": "Remove Nth End: Two Pass",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 38: Remove Nth Node From End of List\n// ================================================\n// Given the head of a linked list, remove the nth node from the end \n// of the list and return its head.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] list2 = {1, 2, 3, 4, 5};\n        int n2 = 2;\n        \n        // First pass: count length\n        int len = list2.length;\n        \n        // Second pass: find and remove (length - n)th node\n        int removeIdx2 = len - n2;\n        \n        int[] result2 = new int[len - 1];\n        int j = 0;\n        for (int i = 0; i < len; i++) {\n            if (i != removeIdx2) {\n                result2[j++] = list2[i];\n            }\n        }\n        \n        System.out.println(\"Two Pass result: \" + Arrays.toString(result2));\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "linked-list"
    },
    {
        "id": "nc150-linked-list-039_copy_random_list-1",
        "name": "Copy Random List: HashMap",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 39: Copy List with Random Pointer\n// ================================================\n// Deep copy a linked list where each node has a next pointer and a random pointer.\n\n\n\npublic class Main {\n    // Helper Methods\n    static Node copyRandomList(Node head) {\n    if (head == null) return null;\n    \n    Map<Node, Node> map = new HashMap<>();\n    \n    // First pass: create all nodes\n    Node curr = head;\n    while (curr != null) {\n        map.put(curr, new Node(curr.val));\n        curr = curr.next;\n    }\n    \n    // Second pass: connect next and random pointers\n    curr = head;\n    while (curr != null) {\n        map.get(curr).next = map.get(curr.next);\n        map.get(curr).random = map.get(curr.random);\n        curr = curr.next;\n    }\n    \n    return map.get(head);\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"Copy List with Random Pointer:\");\n        \n        /*\n        class Node {\n            int val;\n            Node next;\n            Node random;\n        }\n        \n        */\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "linked-list"
    },
    {
        "id": "nc150-linked-list-039_copy_random_list-2",
        "name": "Copy Random List: Interweaving Nodes",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 39: Copy List with Random Pointer\n// ================================================\n// Deep copy a linked list where each node has a next pointer and a random pointer.\n\n\n\npublic class Main {\n    // Helper Methods\n    static Node copyRandomListOptimal(Node head) {\n    if (head == null) return null;\n    \n    // Step 1: Insert copies\n    Node curr = head;\n    while (curr != null) {\n        Node copy = new Node(curr.val);\n        copy.next = curr.next;\n        curr.next = copy;\n        curr = copy.next;\n    }\n    \n    // Step 2: Set random pointers\n    curr = head;\n    while (curr != null) {\n        if (curr.random != null) {\n            curr.next.random = curr.random.next;\n        }\n        curr = curr.next.next;\n    }\n    \n    // Step 3: Separate lists\n    Node dummy = new Node(0);\n    Node copyCurr = dummy;\n    curr = head;\n    while (curr != null) {\n        copyCurr.next = curr.next;\n        curr.next = curr.next.next;\n        curr = curr.next;\n        copyCurr = copyCurr.next;\n    }\n    \n    return dummy.next;\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"\\nInterweaving Approach (O(1) Space):\");\n        System.out.println(\"1. Insert copies between originals: A -> A' -> B -> B'\");\n        System.out.println(\"2. Set random pointers: copy.random = original.random.next\");\n        System.out.println(\"3. Separate the two lists\");\n        \n        /*\n        */\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "linked-list"
    },
    {
        "id": "nc150-linked-list-040_add_two_numbers-1",
        "name": "Add Two Numbers",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 40: Add Two Numbers\n// ================================================\n// Given two non-empty linked lists representing non-negative integers in reverse order.\n// Add the two numbers and return it as a linked list.\n\n\n\npublic class Main {\n    // Helper Methods\n    static ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n    ListNode dummy = new ListNode(0);\n    ListNode curr = dummy;\n    int carry = 0;\n    \n    while (l1 != null || l2 != null || carry > 0) {\n        int sum = carry;\n        \n        if (l1 != null) {\n            sum += l1.val;\n            l1 = l1.next;\n        }\n        \n        if (l2 != null) {\n            sum += l2.val;\n            l2 = l2.next;\n        }\n        \n        curr.next = new ListNode(sum % 10);\n        curr = curr.next;\n        carry = sum / 10;\n    }\n    \n    return dummy.next;\n}\n\n    public static void main(String[] args) {\n        // l1 = [2,4,3] represents 342\n        // l2 = [5,6,4] represents 465\n        // Output: [7,0,8] represents 807\n        \n        System.out.println(\"Add Two Numbers:\");\n        \n        // Simulating with arrays\n        int[] l1 = {2, 4, 3};  // 342\n        int[] l2 = {5, 6, 4};  // 465\n        \n        List<Integer> result = new ArrayList<>();\n        int carry = 0;\n        int i = 0, j = 0;\n        \n        while (i < l1.length || j < l2.length || carry > 0) {\n            int sum = carry;\n            if (i < l1.length) sum += l1[i++];\n            if (j < l2.length) sum += l2[j++];\n            \n            result.add(sum % 10);\n            carry = sum / 10;\n        }\n        \n        System.out.println(\"Result: \" + result);  // [7, 0, 8]\n        \n        /*\n        */\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\n  2 -> 4 -> 3  (342)\");\n        System.out.println(\"+ 5 -> 6 -> 4  (465)\");\n        System.out.println(\"= 7 -> 0 -> 8  (807)\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "linked-list"
    },
    {
        "id": "nc150-linked-list-041_linked_list_cycle-1",
        "name": "Linked List Cycle: Floyd's Cycle Detection",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 41: Linked List Cycle\n// ================================================\n// Given head, determine if the linked list has a cycle.\n\n\n\npublic class Main {\n    // Helper Methods\n    static boolean hasCycle(ListNode head) {\n    if (head == null || head.next == null) {\n        return false;\n    }\n    \n    ListNode slow = head;\n    ListNode fast = head;\n    \n    while (fast != null && fast.next != null) {\n        slow = slow.next;          // 1 step\n        fast = fast.next.next;     // 2 steps\n        \n        if (slow == fast) {\n            return true;  // Cycle detected\n        }\n    }\n    \n    return false;  // No cycle\n}\n\n    public static void main(String[] args) {\n        // Simulating with conceptual explanation\n        // In linked list: slow moves 1 step, fast moves 2 steps\n        // If there's a cycle, they will meet\n        \n        System.out.println(\"Floyd's Cycle Detection Algorithm:\");\n        System.out.println(\"1. Initialize slow and fast pointers at head\");\n        System.out.println(\"2. Move slow by 1, fast by 2\");\n        System.out.println(\"3. If they meet, cycle exists\");\n        System.out.println(\"4. If fast reaches null, no cycle\");\n        \n        // Simulation with array (no actual cycle possible)\n        int[] list = {3, 2, 0, -4};\n        boolean hasCycle1 = false;\n        \n        // For array simulation, we'll check if any index repeats\n        Set<Integer> visited = new HashSet<>();\n        for (int val : list) {\n            if (visited.contains(val)) {\n                hasCycle1 = true;\n                break;\n            }\n            visited.add(val);\n        }\n        \n        System.out.println(\"\\nHas Cycle (Simulation): \" + hasCycle1);\n        \n        /*\n        // Actual LinkedList Implementation\n        */\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "linked-list"
    },
    {
        "id": "nc150-linked-list-041_linked_list_cycle-2",
        "name": "Linked List Cycle: HashSet",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 41: Linked List Cycle\n// ================================================\n// Given head, determine if the linked list has a cycle.\n\n\n\npublic class Main {\n    // Helper Methods\n    static boolean hasCycleHashSet(ListNode head) {\n    Set<ListNode> seen = new HashSet<>();\n    \n    ListNode current = head;\n    while (current != null) {\n        if (seen.contains(current)) {\n            return true;\n        }\n        seen.add(current);\n        current = current.next;\n    }\n    \n    return false;\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"\\nHashSet Approach:\");\n        System.out.println(\"1. Maintain set of visited nodes\");\n        System.out.println(\"2. For each node, check if already in set\");\n        System.out.println(\"3. If found, cycle exists\");\n        \n        /*\n        */\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "linked-list"
    },
    {
        "id": "nc150-linked-list-042_find_duplicate-1",
        "name": "Find Duplicate: Floyd's Cycle Detection",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 42: Find the Duplicate Number\n// ================================================\n// Given an array of integers nums containing n + 1 integers where each \n// integer is in the range [1, n] inclusive. Find the one duplicate.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Treat array as linked list: index -> nums[index]\n        int[] nums = {1, 3, 4, 2, 2};\n        \n        int slow = nums[0];\n        int fast = nums[0];\n        \n        // Phase 1: Find intersection point\n        do {\n            slow = nums[slow];\n            fast = nums[nums[fast]];\n        } while (slow != fast);\n        \n        // Phase 2: Find entrance to cycle (duplicate)\n        slow = nums[0];\n        while (slow != fast) {\n            slow = nums[slow];\n            fast = nums[fast];\n        }\n        \n        int duplicate = slow;\n        System.out.println(\"Duplicate (Floyd's): \" + duplicate);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "linked-list"
    },
    {
        "id": "nc150-linked-list-042_find_duplicate-2",
        "name": "Find Duplicate: HashSet",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 42: Find the Duplicate Number\n// ================================================\n// Given an array of integers nums containing n + 1 integers where each \n// integer is in the range [1, n] inclusive. Find the one duplicate.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums2 = {1, 3, 4, 2, 2};\n        Set<Integer> seen = new HashSet<>();\n        int duplicate2 = -1;\n        \n        for (int num : nums2) {\n            if (seen.contains(num)) {\n                duplicate2 = num;\n                break;\n            }\n            seen.add(num);\n        }\n        \n        System.out.println(\"Duplicate (HashSet): \" + duplicate2);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "linked-list"
    },
    {
        "id": "nc150-linked-list-042_find_duplicate-3",
        "name": "Find Duplicate: Sorting",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 42: Find the Duplicate Number\n// ================================================\n// Given an array of integers nums containing n + 1 integers where each \n// integer is in the range [1, n] inclusive. Find the one duplicate.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums3 = {1, 3, 4, 2, 2};\n        Arrays.sort(nums3);\n        \n        int duplicate3 = -1;\n        for (int i = 1; i < nums3.length; i++) {\n            if (nums3[i] == nums3[i - 1]) {\n                duplicate3 = nums3[i];\n                break;\n            }\n        }\n        \n        System.out.println(\"Duplicate (Sorting): \" + duplicate3);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "linked-list"
    },
    {
        "id": "nc150-linked-list-042_find_duplicate-4",
        "name": "Find Duplicate: Binary Search on Value Range",
        "updatedAt": 1700000000003,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 42: Find the Duplicate Number\n// ================================================\n// Given an array of integers nums containing n + 1 integers where each \n// integer is in the range [1, n] inclusive. Find the one duplicate.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums4 = {1, 3, 4, 2, 2};\n        int n = nums4.length - 1;\n        \n        int lo = 1, hi = n;\n        int duplicate4 = -1;\n        \n        while (lo < hi) {\n            int mid = lo + (hi - lo) / 2;\n            \n            // Count numbers <= mid\n            int count = 0;\n            for (int num : nums4) {\n                if (num <= mid) count++;\n            }\n            \n            if (count > mid) {\n                hi = mid;  // Duplicate in lower half\n            } else {\n                lo = mid + 1;  // Duplicate in upper half\n            }\n        }\n        \n        duplicate4 = lo;\n        System.out.println(\"Duplicate (Binary Search): \" + duplicate4);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "linked-list"
    },
    {
        "id": "nc150-linked-list-043_lru_cache-1",
        "name": "Lru Cache: HashMap + Doubly Linked List",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 43: LRU Cache\n// ================================================\n// Design LRU (Least Recently Used) cache with get and put in O(1).\n\n\n\npublic class Main {\n    // Helper Methods\n    static     public LRUCache(int capacity) {\n        this.capacity = capacity;\n        cache = new HashMap<>();\n        head = new Node(0, 0);\n        tail = new Node(0, 0);\n        head.next = tail;\n        tail.prev = head;\n    }\n    static     public int get(int key) {\n        if (!cache.containsKey(key)) return -1;\n        \n        Node node = cache.get(key);\n        remove(node);\n        insertAtHead(node);\n        return node.value;\n    }\n    static     public void put(int key, int value) {\n        if (cache.containsKey(key)) {\n            remove(cache.get(key));\n        }\n        \n        Node node = new Node(key, value);\n        cache.put(key, node);\n        insertAtHead(node);\n        \n        if (cache.size() > capacity) {\n            Node lru = tail.prev;\n            remove(lru);\n            cache.remove(lru.key);\n        }\n    }\n    static     private void remove(Node node) {\n        node.prev.next = node.next;\n        node.next.prev = node.prev;\n    }\n    static     private void insertAtHead(Node node) {\n        node.next = head.next;\n        node.prev = head;\n        head.next.prev = node;\n        head.next = node;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"LRU Cache Implementation:\");\n        \n        /*\n        class LRUCache {\n            private int capacity;\n            private Map<Integer, Node> cache;\n            private Node head, tail;  // Dummy nodes\n            \n            class Node {\n                int key, value;\n                Node prev, next;\n                Node(int k, int v) { key = k; value = v; }\n            }\n            \n            \n            \n            \n            \n        }\n        */\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "linked-list"
    },
    {
        "id": "nc150-linked-list-043_lru_cache-2",
        "name": "Lru Cache: LinkedHashMap",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 43: LRU Cache\n// ================================================\n// Design LRU (Least Recently Used) cache with get and put in O(1).\n\n\n\npublic class Main {\n    // Helper Methods\n    static     public LRUCacheSimple(int capacity) {\n        super(capacity, 0.75f, true);  // accessOrder = true\n        this.capacity = capacity;\n    }\n    static     public int get(int key) {\n        return super.getOrDefault(key, -1);\n    }\n    static     public void put(int key, int value) {\n        super.put(key, value);\n    }\n    static     protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {\n        return size() > capacity;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"\\nLinkedHashMap (built-in):\");\n        \n        /*\n        class LRUCacheSimple extends LinkedHashMap<Integer, Integer> {\n            private int capacity;\n            \n            \n            \n            \n            @Override\n        }\n        */\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nExample with capacity = 2:\");\n        System.out.println(\"put(1, 1) -> cache: {1=1}\");\n        System.out.println(\"put(2, 2) -> cache: {1=1, 2=2}\");\n        System.out.println(\"get(1)    -> returns 1, cache: {2=2, 1=1}\");\n        System.out.println(\"put(3, 3) -> evicts 2, cache: {1=1, 3=3}\");\n        System.out.println(\"get(2)    -> returns -1 (not found)\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "linked-list"
    },
    {
        "id": "nc150-linked-list-044_merge_k_lists-1",
        "name": "Merge K Lists: Min Heap",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 44: Merge K Sorted Lists\n// ================================================\n// Merge k sorted linked lists and return it as one sorted list.\n\n\n\npublic class Main {\n    // Helper Methods\n    static ListNode mergeKLists(ListNode[] lists) {\n    PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> a.val - b.val);\n    \n    for (ListNode list : lists) {\n        if (list != null) pq.offer(list);\n    }\n    \n    ListNode dummy = new ListNode(0);\n    ListNode curr = dummy;\n    \n    while (!pq.isEmpty()) {\n        ListNode node = pq.poll();\n        curr.next = node;\n        curr = curr.next;\n        \n        if (node.next != null) {\n            pq.offer(node.next);\n        }\n    }\n    \n    return dummy.next;\n}\n\n    public static void main(String[] args) {\n        // n = total elements, k = number of lists\n        System.out.println(\"Merge K Sorted Lists:\");\n        \n        // Simulated with arrays\n        int[][] lists = {{1, 4, 5}, {1, 3, 4}, {2, 6}};\n        \n        PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> a[0] - b[0]);\n        // [value, listIndex, elementIndex]\n        \n        // Add first element from each list\n        for (int i = 0; i < lists.length; i++) {\n            if (lists[i].length > 0) {\n                minHeap.offer(new int[]{lists[i][0], i, 0});\n            }\n        }\n        \n        List<Integer> result = new ArrayList<>();\n        while (!minHeap.isEmpty()) {\n            int[] curr = minHeap.poll();\n            result.add(curr[0]);\n            \n            int listIdx = curr[1];\n            int elemIdx = curr[2] + 1;\n            \n            if (elemIdx < lists[listIdx].length) {\n                minHeap.offer(new int[]{lists[listIdx][elemIdx], listIdx, elemIdx});\n            }\n        }\n        \n        System.out.println(\"Merged: \" + result);\n        \n        /*\n        */\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "linked-list"
    },
    {
        "id": "nc150-linked-list-044_merge_k_lists-2",
        "name": "Merge K Lists: Divide and Conquer",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 44: Merge K Sorted Lists\n// ================================================\n// Merge k sorted linked lists and return it as one sorted list.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nDivide and Conquer:\");\n        System.out.println(\"Recursively merge pairs of lists\");\n        System.out.println(\"Similar to merge sort\");\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "linked-list"
    },
    {
        "id": "nc150-linked-list-044_merge_k_lists-3",
        "name": "Merge K Lists: Merge One by One",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 44: Merge K Sorted Lists\n// ================================================\n// Merge k sorted linked lists and return it as one sorted list.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nMerge one by one (slower but simple)\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "linked-list"
    },
    {
        "id": "nc150-linked-list-045_reverse_k_group-1",
        "name": "Reverse K Group",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 45: Reverse Nodes in K-Group\n// ================================================\n// Given a linked list, reverse the nodes of a linked list k at a time.\n\n\n\npublic class Main {\n    // Helper Methods\n    static ListNode reverseKGroup(ListNode head, int k) {\n    ListNode dummy = new ListNode(0);\n    dummy.next = head;\n    ListNode prevGroupEnd = dummy;\n    \n    while (true) {\n        // Check if k nodes exist\n        ListNode kth = getKth(prevGroupEnd, k);\n        if (kth == null) break;\n        \n        ListNode nextGroupStart = kth.next;\n        \n        // Reverse the group\n        ListNode prev = nextGroupStart;\n        ListNode curr = prevGroupEnd.next;\n        \n        while (curr != nextGroupStart) {\n            ListNode next = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = next;\n        }\n        \n        // Connect with previous part\n        ListNode tmp = prevGroupEnd.next;\n        prevGroupEnd.next = kth;\n        prevGroupEnd = tmp;\n    }\n    \n    return dummy.next;\n}\n    static ListNode getKth(ListNode node, int k) {\n    while (node != null && k > 0) {\n        node = node.next;\n        k--;\n    }\n    return node;\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"Reverse Nodes in K-Group:\");\n        \n        // Simulated with array\n        int[] list = {1, 2, 3, 4, 5};\n        int k = 2;\n        \n        // Result should be: [2, 1, 4, 3, 5]\n        \n        List<Integer> result = new ArrayList<>();\n        int i = 0;\n        \n        while (i < list.length) {\n            // Check if we have k nodes left\n            if (i + k <= list.length) {\n                // Reverse k nodes\n                for (int j = i + k - 1; j >= i; j--) {\n                    result.add(list[j]);\n                }\n                i += k;\n            } else {\n                // Add remaining nodes as-is\n                while (i < list.length) {\n                    result.add(list[i++]);\n                }\n            }\n        }\n        \n        System.out.println(\"Result (k=\" + k + \"): \" + result);\n        \n        /*\n        \n        */\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nk=2: [1,2,3,4,5] -> [2,1,4,3,5]\");\n        System.out.println(\"k=3: [1,2,3,4,5] -> [3,2,1,4,5]\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "linked-list"
    },
    {
        "id": "nc150-trees-046_invert_tree-1",
        "name": "Invert Tree: DFS Recursive",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 46: Invert Binary Tree\n// ================================================\n// Given the root of a binary tree, invert the tree, and return its root.\n\n\n\npublic class Main {\n    // Helper Methods\n    static TreeNode invertTree(TreeNode root) {\n    if (root == null) return null;\n    \n    TreeNode temp = root.left;\n    root.left = root.right;\n    root.right = temp;\n    \n    invertTree(root.left);\n    invertTree(root.right);\n    \n    return root;\n}\n\n    public static void main(String[] args) {\n        // Using array representation of tree for visualization\n        // Index i: left child at 2i+1, right child at 2i+2\n        int[] tree = {4, 2, 7, 1, 3, 6, 9};  // Level order\n        int[] inverted = new int[tree.length];\n        \n        // Copy and swap at each level\n        for (int i = 0; i < tree.length; i++) {\n            inverted[i] = tree[i];\n        }\n        \n        // Swap children at each parent\n        for (int i = 0; i < tree.length / 2; i++) {\n            int leftIdx = 2 * i + 1;\n            int rightIdx = 2 * i + 2;\n            \n            if (rightIdx < tree.length) {\n                int temp = inverted[leftIdx];\n                inverted[leftIdx] = inverted[rightIdx];\n                inverted[rightIdx] = temp;\n            }\n        }\n        \n        System.out.println(\"Original Tree: \" + Arrays.toString(tree));\n        System.out.println(\"Inverted Tree: \" + Arrays.toString(inverted));\n        \n        /*\n        // Actual TreeNode Implementation\n        */\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-046_invert_tree-2",
        "name": "Invert Tree: BFS Iterative",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 46: Invert Binary Tree\n// ================================================\n// Given the root of a binary tree, invert the tree, and return its root.\n\n\n\npublic class Main {\n    // Helper Methods\n    static TreeNode invertTreeBFS(TreeNode root) {\n    if (root == null) return null;\n    \n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(root);\n    \n    while (!queue.isEmpty()) {\n        TreeNode node = queue.poll();\n        \n        // Swap children\n        TreeNode temp = node.left;\n        node.left = node.right;\n        node.right = temp;\n        \n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n    }\n    \n    return root;\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"\\nBFS Approach (Level Order):\");\n        System.out.println(\"1. Use queue starting with root\");\n        System.out.println(\"2. For each node, swap its children\");\n        System.out.println(\"3. Add children to queue\");\n        \n        /*\n        */\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-047_max_depth-1",
        "name": "Max Depth: DFS Recursive",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 47: Maximum Depth of Binary Tree\n// ================================================\n// Given the root of a binary tree, return its maximum depth.\n\n\n\npublic class Main {\n    // Helper Methods\n    static int maxDepth(TreeNode root) {\n    if (root == null) return 0;\n    \n    int leftDepth = maxDepth(root.left);\n    int rightDepth = maxDepth(root.right);\n    \n    return 1 + Math.max(leftDepth, rightDepth);\n}\n\n    public static void main(String[] args) {\n        // Tree: [3, 9, 20, null, null, 15, 7]\n        //       3\n        //      / \\\n        //     9  20\n        //       /  \\\n        //      15   7\n        \n        // Simulating with levels\n        int[] tree = {3, 9, 20, -1, -1, 15, 7}; // -1 represents null\n        int depth = 3; // Calculated depth\n        \n        System.out.println(\"Max Depth (DFS): \" + depth);\n        \n        /*\n        */\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-047_max_depth-2",
        "name": "Max Depth: BFS Level Order",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 47: Maximum Depth of Binary Tree\n// ================================================\n// Given the root of a binary tree, return its maximum depth.\n\n\n\npublic class Main {\n    // Helper Methods\n    static int maxDepthBFS(TreeNode root) {\n    if (root == null) return 0;\n    \n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(root);\n    int depth = 0;\n    \n    while (!queue.isEmpty()) {\n        int levelSize = queue.size();\n        depth++;\n        \n        for (int i = 0; i < levelSize; i++) {\n            TreeNode node = queue.poll();\n            if (node.left != null) queue.offer(node.left);\n            if (node.right != null) queue.offer(node.right);\n        }\n    }\n    \n    return depth;\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"\\nBFS Level Order:\");\n        System.out.println(\"1. Use queue for level order traversal\");\n        System.out.println(\"2. Count number of levels\");\n        \n        /*\n        */\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-047_max_depth-3",
        "name": "Max Depth: DFS Iterative with Stack",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 47: Maximum Depth of Binary Tree\n// ================================================\n// Given the root of a binary tree, return its maximum depth.\n\n\n\npublic class Main {\n    // Helper Methods\n    static int maxDepthIterative(TreeNode root) {\n    if (root == null) return 0;\n    \n    Stack<Object[]> stack = new Stack<>();\n    stack.push(new Object[]{root, 1});\n    int maxDepth = 0;\n    \n    while (!stack.isEmpty()) {\n        Object[] current = stack.pop();\n        TreeNode node = (TreeNode) current[0];\n        int depth = (int) current[1];\n        \n        maxDepth = Math.max(maxDepth, depth);\n        \n        if (node.left != null) stack.push(new Object[]{node.left, depth + 1});\n        if (node.right != null) stack.push(new Object[]{node.right, depth + 1});\n    }\n    \n    return maxDepth;\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"\\nDFS Iterative:\");\n        System.out.println(\"1. Use stack with [node, depth] pairs\");\n        System.out.println(\"2. Track maximum depth seen\");\n        \n        /*\n        */\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-048_diameter-1",
        "name": "Diameter: DFS",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 48: Diameter of Binary Tree\n// ================================================\n// The diameter is the length of the longest path between any two nodes.\n// This path may or may not pass through the root.\n\n\n\npublic class Main {\n    // Helper Methods\n    static     public int diameterOfBinaryTree(TreeNode root) {\n        height(root);\n        return diameter;\n    }\n    static     private int height(TreeNode node) {\n        if (node == null) return 0;\n        \n        int leftHeight = height(node.left);\n        int rightHeight = height(node.right);\n        \n        // Update diameter if path through this node is longer\n        diameter = Math.max(diameter, leftHeight + rightHeight);\n        \n        // Return height of this subtree\n        return 1 + Math.max(leftHeight, rightHeight);\n    }\n\n    public static void main(String[] args) {\n        //       1\n        //      / \\\n        //     2   3\n        //    / \\\n        //   4   5\n        // Diameter = 3 (path: 4 -> 2 -> 1 -> 3 or 5 -> 2 -> 1 -> 3)\n        \n        int diameter = 0; // Global variable to track max diameter\n        \n        // Simulate DFS calculation\n        System.out.println(\"Diameter of Binary Tree:\");\n        System.out.println(\"For each node, diameter through it = leftHeight + rightHeight\");\n        System.out.println(\"Track maximum diameter across all nodes\");\n        \n        // Example calculation:\n        // Node 2: leftHeight=1, rightHeight=1, diameter=2\n        // Node 1: leftHeight=2, rightHeight=1, diameter=3\n        int result = 3;\n        System.out.println(\"Diameter: \" + result);\n        \n        /*\n        class Solution {\n            private int diameter = 0;\n            \n            \n        }\n        */\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-048_diameter-2",
        "name": "Diameter: DFS with Pair Return",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 48: Diameter of Binary Tree\n// ================================================\n// The diameter is the length of the longest path between any two nodes.\n// This path may or may not pass through the root.\n\n\n\npublic class Main {\n    // Helper Methods\n    static int[] heightAndDiameter(TreeNode node) {\n    if (node == null) return new int[]{0, 0};\n    \n    int[] left = heightAndDiameter(node.left);\n    int[] right = heightAndDiameter(node.right);\n    \n    int height = 1 + Math.max(left[0], right[0]);\n    int diameter = Math.max(\n        Math.max(left[1], right[1]),  // Max from subtrees\n        left[0] + right[0]             // Path through current node\n    );\n    \n    return new int[]{height, diameter};\n}\n\n    public static void main(String[] args) {\n        // Return both height and diameter from each recursive call\n        System.out.println(\"\\nAlternative: Return [height, diameter] pair\");\n        System.out.println(\"Avoids using global/class variable\");\n        \n        /*\n        */\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-049_balanced_tree-1",
        "name": "Balanced Tree: DFS Single Pass",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 49: Balanced Binary Tree\n// ================================================\n// Given a binary tree, determine if it is height-balanced.\n// A tree is balanced if depths of two subtrees never differ by more than 1.\n\n\n\npublic class Main {\n    // Helper Methods\n    static int checkHeight(TreeNode node) {\n    if (node == null) return 0;\n    \n    int leftHeight = checkHeight(node.left);\n    if (leftHeight == -1) return -1;  // Left subtree unbalanced\n    \n    int rightHeight = checkHeight(node.right);\n    if (rightHeight == -1) return -1;  // Right subtree unbalanced\n    \n    if (Math.abs(leftHeight - rightHeight) > 1) {\n        return -1;  // Current node unbalanced\n    }\n    \n    return 1 + Math.max(leftHeight, rightHeight);\n}\n    static boolean isBalanced(TreeNode root) {\n    return checkHeight(root) != -1;\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"Balanced Binary Tree Check:\");\n        System.out.println(\"For each node, check if |leftHeight - rightHeight| <= 1\");\n        System.out.println(\"If any subtree is unbalanced, propagate -1 up\");\n        \n        /*\n        \n        */\n        \n        // Example: Balanced tree\n        //       3\n        //      / \\\n        //     9  20\n        //       /  \\\n        //      15   7\n        boolean isBalanced = true;\n        System.out.println(\"Is Balanced: \" + isBalanced);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-049_balanced_tree-2",
        "name": "Balanced Tree: Top",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 49: Balanced Binary Tree\n// ================================================\n// Given a binary tree, determine if it is height-balanced.\n// A tree is balanced if depths of two subtrees never differ by more than 1.\n\n\n\npublic class Main {\n    // Helper Methods\n    static int height(TreeNode node) {\n    if (node == null) return 0;\n    return 1 + Math.max(height(node.left), height(node.right));\n}\n    static boolean isBalancedTopDown(TreeNode root) {\n    if (root == null) return true;\n    \n    int leftHeight = height(root.left);\n    int rightHeight = height(root.right);\n    \n    return Math.abs(leftHeight - rightHeight) <= 1 &&\n           isBalancedTopDown(root.left) &&\n           isBalancedTopDown(root.right);\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"\\nTop-Down Approach (O(n\u00b2)):\");\n        System.out.println(\"Calculate height at each node and check balance\");\n        System.out.println(\"Recalculates heights multiple times - less efficient\");\n        \n        /*\n        \n        */\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-050_same_tree-1",
        "name": "Same Tree: DFS Recursive",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 50: Same Tree\n// ================================================\n// Given the roots of two binary trees, check if they are the same.\n\n\n\npublic class Main {\n    // Helper Methods\n    static boolean isSameTree(TreeNode p, TreeNode q) {\n    if (p == null && q == null) return true;\n    if (p == null || q == null) return false;\n    if (p.val != q.val) return false;\n    \n    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n}\n\n    public static void main(String[] args) {\n        // Two trees are same if:\n        // 1. Both roots are null, OR\n        // 2. Values equal AND left subtrees same AND right subtrees same\n        \n        System.out.println(\"Same Tree Check (DFS):\");\n        \n        // Example trees\n        int[] tree1 = {1, 2, 3};\n        int[] tree2 = {1, 2, 3};\n        boolean isSame = true;\n        System.out.println(\"Tree1: \" + Arrays.toString(tree1));\n        System.out.println(\"Tree2: \" + Arrays.toString(tree2));\n        System.out.println(\"Are Same: \" + isSame);\n        \n        /*\n        */\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-050_same_tree-2",
        "name": "Same Tree: BFS Iterative",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 50: Same Tree\n// ================================================\n// Given the roots of two binary trees, check if they are the same.\n\n\n\npublic class Main {\n    // Helper Methods\n    static boolean isSameTreeBFS(TreeNode p, TreeNode q) {\n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(p);\n    queue.offer(q);\n    \n    while (!queue.isEmpty()) {\n        TreeNode node1 = queue.poll();\n        TreeNode node2 = queue.poll();\n        \n        if (node1 == null && node2 == null) continue;\n        if (node1 == null || node2 == null) return false;\n        if (node1.val != node2.val) return false;\n        \n        queue.offer(node1.left);\n        queue.offer(node2.left);\n        queue.offer(node1.right);\n        queue.offer(node2.right);\n    }\n    \n    return true;\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"\\nBFS Iterative Approach:\");\n        System.out.println(\"Use two queues to traverse both trees level by level\");\n        System.out.println(\"Compare nodes at each step\");\n        \n        /*\n        */\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-051_subtree-1",
        "name": "Subtree: DFS",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 51: Subtree of Another Tree\n// ================================================\n// Given roots of two binary trees root and subRoot, return true if \n// there is a subtree of root with the same structure and values as subRoot.\n\n\n\npublic class Main {\n    // Helper Methods\n    static boolean isSubtree(TreeNode root, TreeNode subRoot) {\n    if (root == null) return false;\n    \n    if (isSameTree(root, subRoot)) return true;\n    \n    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);\n}\n    static boolean isSameTree(TreeNode p, TreeNode q) {\n    if (p == null && q == null) return true;\n    if (p == null || q == null) return false;\n    if (p.val != q.val) return false;\n    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"Subtree Check:\");\n        System.out.println(\"For each node in main tree, check if subtree rooted there matches subRoot\");\n        \n        /*\n        \n        */\n        \n        // Example\n        int[] mainTree = {3, 4, 5, 1, 2};\n        int[] subTree = {4, 1, 2};\n        boolean isSubtree = true;\n        System.out.println(\"Main Tree: \" + Arrays.toString(mainTree));\n        System.out.println(\"SubTree: \" + Arrays.toString(subTree));\n        System.out.println(\"Is Subtree: \" + isSubtree);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-051_subtree-2",
        "name": "Subtree: String Serialization",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 51: Subtree of Another Tree\n// ================================================\n// Given roots of two binary trees root and subRoot, return true if \n// there is a subtree of root with the same structure and values as subRoot.\n\n\n\npublic class Main {\n    // Helper Methods\n    static String serialize(TreeNode node) {\n    if (node == null) return \"#\";\n    return \"^\" + node.val + serialize(node.left) + serialize(node.right);\n}\n    static boolean isSubtreeString(TreeNode root, TreeNode subRoot) {\n    String s1 = serialize(root);\n    String s2 = serialize(subRoot);\n    return s1.contains(s2);\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"\\nString Serialization Approach:\");\n        System.out.println(\"1. Serialize both trees to strings (preorder with markers)\");\n        System.out.println(\"2. Check if subRoot's string is substring of root's string\");\n        \n        /*\n        \n        */\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-051_subtree-3",
        "name": "Subtree: Tree Hashing",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 51: Subtree of Another Tree\n// ================================================\n// Given roots of two binary trees root and subRoot, return true if \n// there is a subtree of root with the same structure and values as subRoot.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nMerkle Tree Hashing:\");\n        System.out.println(\"Compute hash for each subtree\");\n        System.out.println(\"Compare hashes for O(1) equality check\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-052_lca_bst-1",
        "name": "Lca Bst: Iterative",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 52: Lowest Common Ancestor of a BST\n// ================================================\n// Given a BST, find the lowest common ancestor of two given nodes.\n\n\n\npublic class Main {\n    // Helper Methods\n    static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    TreeNode current = root;\n    \n    while (current != null) {\n        if (p.val < current.val && q.val < current.val) {\n            current = current.left;\n        } else if (p.val > current.val && q.val > current.val) {\n            current = current.right;\n        } else {\n            return current;  // Split point or equal\n        }\n    }\n    \n    return null;\n}\n\n    public static void main(String[] args) {\n        // In BST: LCA is the first node where p and q split (one goes left, one goes right)\n        // Or where the node equals p or q\n        \n        int[] bst = {6, 2, 8, 0, 4, 7, 9};  // Level order\n        int p = 2, q = 8;\n        \n        // Simulate: Start from root\n        int current = 6;\n        \n        // Both p and q are less than current -> go left\n        // Both p and q are greater than current -> go right\n        // Otherwise, current is LCA\n        \n        System.out.println(\"BST: \" + Arrays.toString(bst));\n        System.out.println(\"Finding LCA of \" + p + \" and \" + q);\n        \n        // Since p=2 < 6 and q=8 > 6, they split at 6\n        int lca = 6;\n        System.out.println(\"LCA: \" + lca);\n        \n        /*\n        */\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-052_lca_bst-2",
        "name": "Lca Bst: Recursive",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 52: Lowest Common Ancestor of a BST\n// ================================================\n// Given a BST, find the lowest common ancestor of two given nodes.\n\n\n\npublic class Main {\n    // Helper Methods\n    static TreeNode lowestCommonAncestorRecursive(TreeNode root, TreeNode p, TreeNode q) {\n    if (p.val < root.val && q.val < root.val) {\n        return lowestCommonAncestorRecursive(root.left, p, q);\n    } else if (p.val > root.val && q.val > root.val) {\n        return lowestCommonAncestorRecursive(root.right, p, q);\n    } else {\n        return root;\n    }\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"\\nRecursive Approach:\");\n        \n        /*\n        */\n        \n        // Example 2: p=2, q=4 (both in left subtree)\n        int p2 = 2, q2 = 4;\n        int lca2 = 2;  // LCA is 2 itself\n        System.out.println(\"LCA of \" + p2 + \" and \" + q2 + \": \" + lca2);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-053_level_order-1",
        "name": "Level Order: BFS with Queue",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 53: Binary Tree Level Order Traversal\n// ================================================\n// Given the root of a binary tree, return the level order traversal \n// (values of nodes at each level from left to right).\n\n\n\npublic class Main {\n    // Helper Methods\n    static List<List<Integer>> levelOrder(TreeNode root) {\n    List<List<Integer>> result = new ArrayList<>();\n    if (root == null) return result;\n    \n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(root);\n    \n    while (!queue.isEmpty()) {\n        int levelSize = queue.size();\n        List<Integer> currentLevel = new ArrayList<>();\n        \n        for (int i = 0; i < levelSize; i++) {\n            TreeNode node = queue.poll();\n            currentLevel.add(node.val);\n            \n            if (node.left != null) queue.offer(node.left);\n            if (node.right != null) queue.offer(node.right);\n        }\n        \n        result.add(currentLevel);\n    }\n    \n    return result;\n}\n\n    public static void main(String[] args) {\n        //       3\n        //      / \\\n        //     9  20\n        //       /  \\\n        //      15   7\n        // Output: [[3], [9, 20], [15, 7]]\n        \n        System.out.println(\"Level Order Traversal:\");\n        \n        List<List<Integer>> result = new ArrayList<>();\n        result.add(Arrays.asList(3));\n        result.add(Arrays.asList(9, 20));\n        result.add(Arrays.asList(15, 7));\n        \n        System.out.println(result);\n        \n        /*\n        */\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-053_level_order-2",
        "name": "Level Order: DFS with Level Tracking",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 53: Binary Tree Level Order Traversal\n// ================================================\n// Given the root of a binary tree, return the level order traversal \n// (values of nodes at each level from left to right).\n\n\n\npublic class Main {\n    // Helper Methods\n    static void dfs(TreeNode node, int level, List<List<Integer>> result) {\n    if (node == null) return;\n    \n    // Create new level list if needed\n    if (level == result.size()) {\n        result.add(new ArrayList<>());\n    }\n    \n    result.get(level).add(node.val);\n    \n    dfs(node.left, level + 1, result);\n    dfs(node.right, level + 1, result);\n}\n    static List<List<Integer>> levelOrderDFS(TreeNode root) {\n    List<List<Integer>> result = new ArrayList<>();\n    dfs(root, 0, result);\n    return result;\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"\\nDFS Approach:\");\n        System.out.println(\"Track level during DFS and add to corresponding list\");\n        \n        /*\n        List<List<Integer>> result = new ArrayList<>();\n        \n        \n        */\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-054_right_side_view-1",
        "name": "Right Side View: BFS Level Order",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 54: Binary Tree Right Side View\n// ================================================\n// Given the root of a binary tree, return values visible from the right side.\n\n\n\npublic class Main {\n    // Helper Methods\n    static List<Integer> rightSideView(TreeNode root) {\n    List<Integer> result = new ArrayList<>();\n    if (root == null) return result;\n    \n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(root);\n    \n    while (!queue.isEmpty()) {\n        int levelSize = queue.size();\n        \n        for (int i = 0; i < levelSize; i++) {\n            TreeNode node = queue.poll();\n            \n            // Last node in level is visible from right\n            if (i == levelSize - 1) {\n                result.add(node.val);\n            }\n            \n            if (node.left != null) queue.offer(node.left);\n            if (node.right != null) queue.offer(node.right);\n        }\n    }\n    \n    return result;\n}\n\n    public static void main(String[] args) {\n        //       1\n        //      / \\\n        //     2   3\n        //      \\   \\\n        //       5   4\n        // Right side view: [1, 3, 4]\n        \n        System.out.println(\"Binary Tree Right Side View:\");\n        \n        List<Integer> rightSide = new ArrayList<>();\n        rightSide.add(1);\n        rightSide.add(3);\n        rightSide.add(4);\n        System.out.println(\"BFS Result: \" + rightSide);\n        \n        /*\n        */\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-054_right_side_view-2",
        "name": "Right Side View: DFS (Right First)",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 54: Binary Tree Right Side View\n// ================================================\n// Given the root of a binary tree, return values visible from the right side.\n\n\n\npublic class Main {\n    // Helper Methods\n    static List<Integer> rightSideViewDFS(TreeNode root) {\n    List<Integer> result = new ArrayList<>();\n    dfs(root, 0, result);\n    return result;\n}\n    static void dfs(TreeNode node, int depth, List<Integer> result) {\n    if (node == null) return;\n    \n    if (depth == result.size()) {\n        result.add(node.val);  // First node at this depth\n    }\n    \n    dfs(node.right, depth + 1, result);  // Right first\n    dfs(node.left, depth + 1, result);\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"\\nDFS Approach:\");\n        System.out.println(\"Visit right child first\");\n        System.out.println(\"Add node if it's the first at its depth\");\n        \n        /*\n        \n        */\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-055_good_nodes-1",
        "name": "Good Nodes: DFS",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 55: Count Good Nodes in Binary Tree\n// ================================================\n// A node X is good if path from root to X has no node with value greater than X.\n\n\n\npublic class Main {\n    // Helper Methods\n    static int goodNodes(TreeNode root) {\n    return dfs(root, Integer.MIN_VALUE);\n}\n    static int dfs(TreeNode node, int maxSoFar) {\n    if (node == null) return 0;\n    \n    int count = 0;\n    if (node.val >= maxSoFar) {\n        count = 1;\n        maxSoFar = node.val;\n    }\n    \n    count += dfs(node.left, maxSoFar);\n    count += dfs(node.right, maxSoFar);\n    \n    return count;\n}\n\n    public static void main(String[] args) {\n        //       3\n        //      / \\\n        //     1   4\n        //    /   / \\\n        //   3   1   5\n        // Good nodes: 3 (root), 4, 3, 5 = 4 nodes\n        \n        System.out.println(\"Count Good Nodes:\");\n        \n        int goodNodes = 4;\n        System.out.println(\"Result: \" + goodNodes);\n        \n        /*\n        \n        */\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-055_good_nodes-2",
        "name": "Good Nodes: BFS with Max Tracking",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 55: Count Good Nodes in Binary Tree\n// ================================================\n// A node X is good if path from root to X has no node with value greater than X.\n\n\n\npublic class Main {\n    // Helper Methods\n    static int goodNodesBFS(TreeNode root) {\n    if (root == null) return 0;\n    \n    int count = 0;\n    Queue<Object[]> queue = new LinkedList<>();\n    queue.offer(new Object[]{root, Integer.MIN_VALUE});\n    \n    while (!queue.isEmpty()) {\n        Object[] curr = queue.poll();\n        TreeNode node = (TreeNode) curr[0];\n        int maxSoFar = (int) curr[1];\n        \n        if (node.val >= maxSoFar) {\n            count++;\n            maxSoFar = node.val;\n        }\n        \n        if (node.left != null) queue.offer(new Object[]{node.left, maxSoFar});\n        if (node.right != null) queue.offer(new Object[]{node.right, maxSoFar});\n    }\n    \n    return count;\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"\\nBFS Approach:\");\n        System.out.println(\"Store [node, maxSoFar] pairs in queue\");\n        \n        /*\n        */\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-056_validate_bst-1",
        "name": "Validate Bst: DFS with Range",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 56: Validate Binary Search Tree\n// ================================================\n// Given the root of a binary tree, determine if it is a valid BST.\n\n\n\npublic class Main {\n    // Helper Methods\n    static boolean isValidBST(TreeNode root) {\n    return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);\n}\n    static boolean validate(TreeNode node, long min, long max) {\n    if (node == null) return true;\n    \n    if (node.val <= min || node.val >= max) {\n        return false;\n    }\n    \n    return validate(node.left, min, node.val) &&\n           validate(node.right, node.val, max);\n}\n\n    public static void main(String[] args) {\n        // Valid BST: left < node < right for all nodes\n        //       5\n        //      / \\\n        //     3   7\n        //    / \\\n        //   1   4\n        \n        System.out.println(\"Validate BST with Range:\");\n        System.out.println(\"Each node must be within valid range [min, max]\");\n        System.out.println(\"Left subtree: node.val becomes new max\");\n        System.out.println(\"Right subtree: node.val becomes new min\");\n        \n        // Example validation\n        int[] tree = {5, 3, 7, 1, 4};\n        boolean isValid = true;\n        System.out.println(\"Is Valid BST: \" + isValid);\n        \n        /*\n        \n        */\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-056_validate_bst-2",
        "name": "Validate Bst: Inorder Traversal",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 56: Validate Binary Search Tree\n// ================================================\n// Given the root of a binary tree, determine if it is a valid BST.\n\n\n\npublic class Main {\n    // Helper Methods\n    static boolean isValidBSTInorder(TreeNode root) {\n    return inorder(root);\n}\n    static boolean inorder(TreeNode node) {\n    if (node == null) return true;\n    \n    if (!inorder(node.left)) return false;\n    \n    if (prev != null && node.val <= prev.val) return false;\n    prev = node;\n    \n    return inorder(node.right);\n}\n\n    public static void main(String[] args) {\n        // BST's inorder traversal should be strictly increasing\n        System.out.println(\"\\nInorder Traversal Approach:\");\n        System.out.println(\"Inorder of BST should be sorted\");\n        \n        List<Integer> inorder = new ArrayList<>();\n        inorder.add(1);\n        inorder.add(3);\n        inorder.add(4);\n        inorder.add(5);\n        inorder.add(7);\n        \n        boolean isSorted = true;\n        for (int i = 1; i < inorder.size(); i++) {\n            if (inorder.get(i) <= inorder.get(i - 1)) {\n                isSorted = false;\n                break;\n            }\n        }\n        \n        System.out.println(\"Inorder: \" + inorder);\n        System.out.println(\"Is Sorted (Valid BST): \" + isSorted);\n        \n        /*\n        TreeNode prev = null;\n        \n        \n        */\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-057_kth_smallest-1",
        "name": "Kth Smallest: Inorder Traversal",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 57: Kth Smallest Element in a BST\n// ================================================\n// Given the root of a BST and an integer k, return the kth smallest value.\n\n\n\npublic class Main {\n    // Helper Methods\n    static int kthSmallest(TreeNode root, int k) {\n    int[] count = new int[]{0};  // Count of nodes visited\n    int[] result = new int[]{0};\n    inorder(root, k, count, result);\n    return result[0];\n}\n    static void inorder(TreeNode node, int k, int[] count, int[] result) {\n    if (node == null) return;\n    \n    inorder(node.left, k, count, result);\n    \n    count[0]++;\n    if (count[0] == k) {\n        result[0] = node.val;\n        return;\n    }\n    \n    inorder(node.right, k, count, result);\n}\n\n    public static void main(String[] args) {\n        // BST's inorder traversal gives elements in sorted order\n        // Return the kth element during traversal\n        \n        int[] bst = {3, 1, 4, 2};  // BST: 3 as root, 1 left, 4 right, 2 as right of 1\n        int k = 1;\n        \n        // Inorder: [1, 2, 3, 4]\n        // k=1 means smallest = 1\n        int kthSmallest = 1;\n        System.out.println(\"BST Inorder: [1, 2, 3, 4]\");\n        System.out.println(\"Kth Smallest (k=\" + k + \"): \" + kthSmallest);\n        \n        /*\n        \n        */\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-057_kth_smallest-2",
        "name": "Kth Smallest: Iterative Inorder with Stack",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 57: Kth Smallest Element in a BST\n// ================================================\n// Given the root of a BST and an integer k, return the kth smallest value.\n\n\n\npublic class Main {\n    // Helper Methods\n    static int kthSmallestIterative(TreeNode root, int k) {\n    Stack<TreeNode> stack = new Stack<>();\n    TreeNode current = root;\n    \n    while (current != null || !stack.isEmpty()) {\n        // Go all the way left\n        while (current != null) {\n            stack.push(current);\n            current = current.left;\n        }\n        \n        current = stack.pop();\n        k--;\n        \n        if (k == 0) return current.val;\n        \n        current = current.right;\n    }\n    \n    return -1;\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"\\nIterative with Stack:\");\n        System.out.println(\"Only traverse until we find kth element - more efficient for small k\");\n        \n        /*\n        */\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-057_kth_smallest-3",
        "name": "Kth Smallest: Augmented BST",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 57: Kth Smallest Element in a BST\n// ================================================\n// Given the root of a BST and an integer k, return the kth smallest value.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nAugmented BST (for frequent queries):\");\n        System.out.println(\"Store count of left subtree nodes\");\n        System.out.println(\"Binary search to find kth element in O(h)\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-058_construct_tree-1",
        "name": "Construct Tree",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 58: Construct Binary Tree from Preorder and Inorder\n// ================================================\n// Given preorder and inorder traversal, construct the binary tree.\n\n\n\npublic class Main {\n    // Helper Methods\n    static TreeNode buildTree(int[] preorder, int[] inorder) {\n    Map<Integer, Integer> map = new HashMap<>();\n    for (int i = 0; i < inorder.length; i++) {\n        map.put(inorder[i], i);\n    }\n    return build(preorder, 0, inorder.length - 1, map);\n}\n    static TreeNode build(int[] preorder, int left, int right, Map<Integer, Integer> map) {\n    if (left > right) return null;\n    \n    int rootVal = preorder[preorderIdx++];\n    TreeNode root = new TreeNode(rootVal);\n    \n    int inorderIdx = map.get(rootVal);\n    \n    root.left = build(preorder, left, inorderIdx - 1, map);\n    root.right = build(preorder, inorderIdx + 1, right, map);\n    \n    return root;\n}\n\n    public static void main(String[] args) {\n        // Preorder: [3,9,20,15,7]  (Root, Left, Right)\n        // Inorder:  [9,3,15,20,7]  (Left, Root, Right)\n        \n        System.out.println(\"Construct Tree from Preorder + Inorder:\");\n        \n        int[] preorder = {3, 9, 20, 15, 7};\n        int[] inorder = {9, 3, 15, 20, 7};\n        \n        // Build map for quick lookup of root position in inorder\n        Map<Integer, Integer> inorderMap = new HashMap<>();\n        for (int i = 0; i < inorder.length; i++) {\n            inorderMap.put(inorder[i], i);\n        }\n        \n        System.out.println(\"Tree structure:\");\n        System.out.println(\"    3\");\n        System.out.println(\"   / \\\\\");\n        System.out.println(\"  9  20\");\n        System.out.println(\"    /  \\\\\");\n        System.out.println(\"   15   7\");\n        \n        /*\n        int preorderIdx = 0;\n        \n        \n        */\n        \n        // ============================================\n        // Key Insight\n        // ============================================\n        System.out.println(\"\\nKey Insight:\");\n        System.out.println(\"- Preorder first element = root\");\n        System.out.println(\"- Find root in inorder to split left/right subtrees\");\n        System.out.println(\"- Left subtree size determines split in preorder\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-059_max_path_sum-1",
        "name": "Max Path Sum",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 59: Binary Tree Maximum Path Sum\n// ================================================\n// A path is any sequence of nodes. Return the maximum path sum.\n\n\n\npublic class Main {\n    // Helper Methods\n    static int maxPathSum(TreeNode root) {\n    dfs(root);\n    return maxSum;\n}\n    static int dfs(TreeNode node) {\n    if (node == null) return 0;\n    \n    // Get max path sum from left and right subtrees\n    // Ignore negative contributions\n    int leftMax = Math.max(0, dfs(node.left));\n    int rightMax = Math.max(0, dfs(node.right));\n    \n    // Path through this node (left -> node -> right)\n    int pathThroughNode = node.val + leftMax + rightMax;\n    maxSum = Math.max(maxSum, pathThroughNode);\n    \n    // Return max contribution to parent (only one side)\n    return node.val + Math.max(leftMax, rightMax);\n}\n\n    public static void main(String[] args) {\n        //       -10\n        //       /  \\\n        //      9   20\n        //         /  \\\n        //        15   7\n        // Max path: 15 -> 20 -> 7 = 42\n        \n        System.out.println(\"Binary Tree Maximum Path Sum:\");\n        int maxSum = 42;\n        System.out.println(\"Result: \" + maxSum);\n        \n        /*\n        int maxSum = Integer.MIN_VALUE;\n        \n        \n        */\n        \n        // ============================================\n        // Key Insight\n        // ============================================\n        System.out.println(\"\\nKey Insight:\");\n        System.out.println(\"- At each node, we can form a path using both children\");\n        System.out.println(\"- But when returning to parent, can only use one side\");\n        System.out.println(\"- Track global max separately from return value\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-060_serialize_deserialize-1",
        "name": "Serialize Deserialize: BFS (Level Order)",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 60: Serialize and Deserialize Binary Tree\n// ================================================\n// Design an algorithm to serialize and deserialize a binary tree.\n\n\n\npublic class Main {\n    // Helper Methods\n    static String serialize(TreeNode root) {\n    if (root == null) return \"\";\n    \n    StringBuilder sb = new StringBuilder();\n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(root);\n    \n    while (!queue.isEmpty()) {\n        TreeNode node = queue.poll();\n        \n        if (node == null) {\n            sb.append(\"null,\");\n        } else {\n            sb.append(node.val).append(\",\");\n            queue.offer(node.left);\n            queue.offer(node.right);\n        }\n    }\n    \n    return sb.toString();\n}\n    static TreeNode deserialize(String data) {\n    if (data.isEmpty()) return null;\n    \n    String[] nodes = data.split(\",\");\n    TreeNode root = new TreeNode(Integer.parseInt(nodes[0]));\n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(root);\n    \n    int i = 1;\n    while (!queue.isEmpty() && i < nodes.length) {\n        TreeNode parent = queue.poll();\n        \n        if (!nodes[i].equals(\"null\")) {\n            parent.left = new TreeNode(Integer.parseInt(nodes[i]));\n            queue.offer(parent.left);\n        }\n        i++;\n        \n        if (i < nodes.length && !nodes[i].equals(\"null\")) {\n            parent.right = new TreeNode(Integer.parseInt(nodes[i]));\n            queue.offer(parent.right);\n        }\n        i++;\n    }\n    \n    return root;\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"Serialize and Deserialize Binary Tree:\");\n        \n        //     1\n        //    / \\\n        //   2   3\n        //      / \\\n        //     4   5\n        // Serialized: \"1,2,3,null,null,4,5\"\n        \n        /*\n        // Serialize\n        \n        // Deserialize\n        */\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-trees-060_serialize_deserialize-2",
        "name": "Serialize Deserialize: DFS (Preorder)",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 60: Serialize and Deserialize Binary Tree\n// ================================================\n// Design an algorithm to serialize and deserialize a binary tree.\n\n\n\npublic class Main {\n    // Helper Methods\n    static String serializeDFS(TreeNode root) {\n    StringBuilder sb = new StringBuilder();\n    serializeHelper(root, sb);\n    return sb.toString();\n}\n    static void serializeHelper(TreeNode node, StringBuilder sb) {\n    if (node == null) {\n        sb.append(\"null,\");\n        return;\n    }\n    sb.append(node.val).append(\",\");\n    serializeHelper(node.left, sb);\n    serializeHelper(node.right, sb);\n}\n    static TreeNode deserializeDFS(String data) {\n    Queue<String> queue = new LinkedList<>(Arrays.asList(data.split(\",\")));\n    return deserializeHelper(queue);\n}\n    static TreeNode deserializeHelper(Queue<String> queue) {\n    String val = queue.poll();\n    if (val.equals(\"null\")) return null;\n    \n    TreeNode node = new TreeNode(Integer.parseInt(val));\n    node.left = deserializeHelper(queue);\n    node.right = deserializeHelper(queue);\n    return node;\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"\\nDFS Preorder Approach:\");\n        System.out.println(\"Serialize: Root, Left, Right with null markers\");\n        System.out.println(\"Deserialize: Use queue/index to rebuild\");\n        \n        /*\n        // Serialize\n        \n        \n        // Deserialize\n        \n        */\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "trees"
    },
    {
        "id": "nc150-tries-061_implement_trie-1",
        "name": "Implement Trie: HashMap",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 61: Implement Trie (Prefix Tree)\n// ================================================\n// Implement a trie with insert, search, and startsWith operations.\n\n\n\npublic class Main {\n    // Helper Methods\n    static     public Trie() {\n        root = new TrieNode();\n    }\n    static     public void insert(String word) {\n        TrieNode node = root;\n        for (char c : word.toCharArray()) {\n            node.children.putIfAbsent(c, new TrieNode());\n            node = node.children.get(c);\n        }\n        node.isEndOfWord = true;\n    }\n    static     public boolean search(String word) {\n        TrieNode node = searchPrefix(word);\n        return node != null && node.isEndOfWord;\n    }\n    static     public boolean startsWith(String prefix) {\n        return searchPrefix(prefix) != null;\n    }\n    static     private TrieNode searchPrefix(String prefix) {\n        TrieNode node = root;\n        for (char c : prefix.toCharArray()) {\n            if (!node.children.containsKey(c)) return null;\n            node = node.children.get(c);\n        }\n        return node;\n    }\n\n    public static void main(String[] args) {\n        // TrieNode with HashMap for children\n        System.out.println(\"Trie Implementation:\");\n        \n        /*\n        class TrieNode {\n            Map<Character, TrieNode> children = new HashMap<>();\n            boolean isEndOfWord = false;\n        }\n        \n        class Trie {\n            private TrieNode root;\n            \n            \n            // O(m) where m = word length\n            \n            // O(m)\n            \n            // O(m)\n            \n        }\n        */\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "tries"
    },
    {
        "id": "nc150-tries-061_implement_trie-2",
        "name": "Implement Trie: Array",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 61: Implement Trie (Prefix Tree)\n// ================================================\n// Implement a trie with insert, search, and startsWith operations.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nArray-based (26 children for a-z):\");\n        \n        /*\n        class TrieNodeArray {\n            TrieNodeArray[] children = new TrieNodeArray[26];\n            boolean isEnd = false;\n        }\n        */\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nTrie for words: [apple, app, application]\");\n        System.out.println(\"       root\");\n        System.out.println(\"        |\");\n        System.out.println(\"        a\");\n        System.out.println(\"        |\");\n        System.out.println(\"        p\");\n        System.out.println(\"        |\");\n        System.out.println(\"        p*  (app ends here)\");\n        System.out.println(\"        |\");\n        System.out.println(\"        l\");\n        System.out.println(\"       / \\\\\");\n        System.out.println(\"      e*  i\");\n        System.out.println(\"          |\");\n        System.out.println(\"          c -> a -> t -> i -> o -> n*\");\n        \n        // Operations demo\n        System.out.println(\"\\nOperations:\");\n        System.out.println(\"insert('apple') - traverse/create a->p->p->l->e, mark e as end\");\n        System.out.println(\"search('app') - traverse a->p->p, check isEnd = true \u2713\");\n        System.out.println(\"startsWith('appl') - traverse a->p->p->l, exists \u2713\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "tries"
    },
    {
        "id": "nc150-tries-062_word_dictionary-1",
        "name": "Word Dictionary",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 62: Design Add and Search Words Data Structure\n// ================================================\n// Design data structure supporting addWord and search.\n// search can contain '.' which can match any letter.\n\n\n\npublic class Main {\n    // Helper Methods\n    static     public WordDictionary() {\n        root = new TrieNode();\n    }\n    static     public void addWord(String word) {\n        TrieNode node = root;\n        for (char c : word.toCharArray()) {\n            if (node.children[c - 'a'] == null) {\n                node.children[c - 'a'] = new TrieNode();\n            }\n            node = node.children[c - 'a'];\n        }\n        node.isEnd = true;\n    }\n    static     public boolean search(String word) {\n        return searchDFS(word, 0, root);\n    }\n    static     private boolean searchDFS(String word, int idx, TrieNode node) {\n        if (node == null) return false;\n        if (idx == word.length()) return node.isEnd;\n        \n        char c = word.charAt(idx);\n        \n        if (c == '.') {\n            // Try all 26 possible children\n            for (TrieNode child : node.children) {\n                if (searchDFS(word, idx + 1, child)) {\n                    return true;\n                }\n            }\n            return false;\n        } else {\n            return searchDFS(word, idx + 1, node.children[c - 'a']);\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Word Dictionary with Wildcards:\");\n        \n        /*\n        class WordDictionary {\n            private TrieNode root;\n            \n            \n            // O(m) - same as regular trie insert\n            \n            // O(m) for exact match, O(26^dots * m) with wildcards\n            \n            \n            private class TrieNode {\n                TrieNode[] children = new TrieNode[26];\n                boolean isEnd = false;\n            }\n        }\n        */\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nExample:\");\n        System.out.println(\"addWord('bad')\");\n        System.out.println(\"addWord('dad')\");\n        System.out.println(\"addWord('mad')\");\n        System.out.println(\"\");\n        System.out.println(\"search('pad') -> false\");\n        System.out.println(\"search('bad') -> true\");\n        System.out.println(\"search('.ad') -> true (matches bad, dad, mad)\");\n        System.out.println(\"search('b..') -> true (matches bad)\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "tries"
    },
    {
        "id": "nc150-tries-063_word_search_ii-1",
        "name": "Word Search Ii",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 63: Word Search II\n// ================================================\n// Given an m x n board and a list of words, find all words on the board.\n\n\n\npublic class Main {\n    // Helper Methods\n    static     public List<String> findWords(char[][] board, String[] words) {\n        // Build Trie\n        TrieNode root = new TrieNode();\n        for (String word : words) {\n            TrieNode node = root;\n            for (char c : word.toCharArray()) {\n                if (node.children[c - 'a'] == null) {\n                    node.children[c - 'a'] = new TrieNode();\n                }\n                node = node.children[c - 'a'];\n            }\n            node.word = word;  // Store word at end node\n        }\n        \n        List<String> result = new ArrayList<>();\n        int rows = board.length, cols = board[0].length;\n        \n        for (int i = 0; i < rows; i++) {\n            for (int j = 0; j < cols; j++) {\n                dfs(board, i, j, root, result);\n            }\n        }\n        \n        return result;\n    }\n    static     void dfs(char[][] board, int r, int c, TrieNode node, List<String> result) {\n        char ch = board[r][c];\n        if (ch == '#' || node.children[ch - 'a'] == null) return;\n        \n        node = node.children[ch - 'a'];\n        if (node.word != null) {\n            result.add(node.word);\n            node.word = null;  // Remove to avoid duplicates\n        }\n        \n        board[r][c] = '#';  // Mark visited\n        \n        for (int[] dir : dirs) {\n            int nr = r + dir[0], nc = c + dir[1];\n            if (nr >= 0 && nr < board.length && nc >= 0 && nc < board[0].length) {\n                dfs(board, nr, nc, node, result);\n            }\n        }\n        \n        board[r][c] = ch;  // Restore\n    }\n\n    public static void main(String[] args) {\n        // Build trie from words, then DFS from each cell\n        \n        char[][] board = {\n            {'o', 'a', 'a', 'n'},\n            {'e', 't', 'a', 'e'},\n            {'i', 'h', 'k', 'r'},\n            {'i', 'f', 'l', 'v'}\n        };\n        String[] words = {\"oath\", \"pea\", \"eat\", \"rain\"};\n        \n        System.out.println(\"Word Search II:\");\n        System.out.println(\"Words to find: \" + Arrays.toString(words));\n        \n        // Result: [\"oath\", \"eat\"]\n        List<String> found = new ArrayList<>();\n        found.add(\"oath\");\n        found.add(\"eat\");\n        System.out.println(\"Found: \" + found);\n        \n        /*\n        class Solution {\n            int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};\n            \n            \n        }\n        */\n        \n        // ============================================\n        // Optimization: Trie Pruning\n        // ============================================\n        System.out.println(\"\\nOptimization: Remove trie branches after finding word\");\n        System.out.println(\"Reduces unnecessary traversals\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "tries"
    },
    {
        "id": "nc150-heap-064_kth_largest-1",
        "name": "Kth Largest: Sorting",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 64: Kth Largest Element in an Array\n// ================================================\n// Given integer array nums and k, return the kth largest element.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums = {3, 2, 1, 5, 6, 4};\n        int k = 2;\n        \n        int[] sorted = nums.clone();\n        Arrays.sort(sorted);\n        int kthLargest1 = sorted[sorted.length - k];\n        System.out.println(\"Kth Largest (Sorting): \" + kthLargest1);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "heap"
    },
    {
        "id": "nc150-heap-064_kth_largest-2",
        "name": "Kth Largest: Min Heap of Size K",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 64: Kth Largest Element in an Array\n// ================================================\n// Given integer array nums and k, return the kth largest element.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums2 = {3, 2, 1, 5, 6, 4};\n        int k2 = 2;\n        \n        PriorityQueue<Integer> minHeap = new PriorityQueue<>();\n        \n        for (int num : nums2) {\n            minHeap.offer(num);\n            if (minHeap.size() > k2) {\n                minHeap.poll();  // Remove smallest\n            }\n        }\n        \n        int kthLargest2 = minHeap.peek();\n        System.out.println(\"Kth Largest (Min Heap): \" + kthLargest2);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "heap"
    },
    {
        "id": "nc150-heap-064_kth_largest-3",
        "name": "Kth Largest: QuickSelect",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 64: Kth Largest Element in an Array\n// ================================================\n// Given integer array nums and k, return the kth largest element.\n\n\n\npublic class Main {\n    // Helper Methods\n    static int partition(int[] nums, int left, int right) {\n    int pivot = nums[right];\n    int i = left;\n    \n    for (int j = left; j < right; j++) {\n        if (nums[j] <= pivot) {\n            int temp = nums[i];\n            nums[i] = nums[j];\n            nums[j] = temp;\n            i++;\n        }\n    }\n    \n    int temp = nums[i];\n    nums[i] = nums[right];\n    nums[right] = temp;\n    \n    return i;\n}\n\n    public static void main(String[] args) {\n        int[] nums3 = {3, 2, 1, 5, 6, 4};\n        int k3 = 2;\n        \n        // Convert to kth smallest problem: (n - k)th index after sorting\n        int targetIdx = nums3.length - k3;\n        \n        int left = 0, right = nums3.length - 1;\n        int kthLargest3 = -1;\n        \n        while (left <= right) {\n            int pivotIdx = partition(nums3, left, right);\n            \n            if (pivotIdx == targetIdx) {\n                kthLargest3 = nums3[pivotIdx];\n                break;\n            } else if (pivotIdx < targetIdx) {\n                left = pivotIdx + 1;\n            } else {\n                int right = pivotIdx - 1;\n            }\n        }\n        \n        System.out.println(\"Kth Largest (QuickSelect): \" + kthLargest3);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "heap"
    },
    {
        "id": "nc150-heap-065_last_stone-1",
        "name": "Last Stone: Max Heap",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 65: Last Stone Weight\n// ================================================\n// Smash heaviest stones together. Return weight of last remaining stone.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] stones = {2, 7, 4, 1, 8, 1};\n        \n        // Max heap (reverse order)\n        PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);\n        \n        for (int stone : stones) {\n            maxHeap.offer(stone);\n        }\n        \n        while (maxHeap.size() > 1) {\n            int stone1 = maxHeap.poll();  // Largest\n            int stone2 = maxHeap.poll();  // Second largest\n            \n            if (stone1 != stone2) {\n                maxHeap.offer(stone1 - stone2);\n            }\n        }\n        \n        int lastStone = maxHeap.isEmpty() ? 0 : maxHeap.poll();\n        System.out.println(\"Last Stone Weight: \" + lastStone);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "heap"
    },
    {
        "id": "nc150-heap-065_last_stone-2",
        "name": "Last Stone: Sorting (Less Efficient)",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 65: Last Stone Weight\n// ================================================\n// Smash heaviest stones together. Return weight of last remaining stone.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] stones2 = {2, 7, 4, 1, 8, 1};\n        List<Integer> stoneList = new ArrayList<>();\n        for (int s : stones2) stoneList.add(s);\n        \n        while (stoneList.size() > 1) {\n            Collections.sort(stoneList);\n            int n = stoneList.size();\n            int s1 = stoneList.remove(n - 1);\n            int s2 = stoneList.remove(n - 2);\n            \n            if (s1 != s2) {\n                stoneList.add(s1 - s2);\n            }\n        }\n        \n        int lastStone2 = stoneList.isEmpty() ? 0 : stoneList.get(0);\n        System.out.println(\"Last Stone (Sorting): \" + lastStone2);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "heap"
    },
    {
        "id": "nc150-heap-065_last_stone-3",
        "name": "Last Stone: Bucket Sort",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 65: Last Stone Weight\n// ================================================\n// Smash heaviest stones together. Return weight of last remaining stone.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nBucket Sort approach:\");\n        System.out.println(\"Create buckets for each weight\");\n        System.out.println(\"Process from heaviest to lightest\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "heap"
    },
    {
        "id": "nc150-heap-066_k_closest_points-1",
        "name": "K Closest Points: Max Heap of Size K",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 66: K Closest Points to Origin\n// ================================================\n// Given array of points, return k closest points to origin (0, 0).\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[][] points = {{1, 3}, {-2, 2}, {5, 8}, {0, 1}};\n        int k = 2;\n        \n        // Max heap based on distance (keep k smallest)\n        PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> \n            (b[0]*b[0] + b[1]*b[1]) - (a[0]*a[0] + a[1]*a[1])\n        );\n        \n        for (int[] point : points) {\n            maxHeap.offer(point);\n            if (maxHeap.size() > k) {\n                maxHeap.poll();\n            }\n        }\n        \n        System.out.println(\"K Closest Points:\");\n        while (!maxHeap.isEmpty()) {\n            int[] p = maxHeap.poll();\n            System.out.println(\"  [\" + p[0] + \", \" + p[1] + \"]\");\n        }\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "heap"
    },
    {
        "id": "nc150-heap-066_k_closest_points-2",
        "name": "K Closest Points: Sorting",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 66: K Closest Points to Origin\n// ================================================\n// Given array of points, return k closest points to origin (0, 0).\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[][] points2 = {{1, 3}, {-2, 2}, {5, 8}, {0, 1}};\n        int k2 = 2;\n        \n        Arrays.sort(points2, (a, b) -> \n            (a[0]*a[0] + a[1]*a[1]) - (b[0]*b[0] + b[1]*b[1])\n        );\n        \n        System.out.println(\"\\nK Closest (Sorting):\");\n        for (int i = 0; i < k2; i++) {\n            System.out.println(\"  [\" + points2[i][0] + \", \" + points2[i][1] + \"]\");\n        }\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "heap"
    },
    {
        "id": "nc150-heap-066_k_closest_points-3",
        "name": "K Closest Points: QuickSelect",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 66: K Closest Points to Origin\n// ================================================\n// Given array of points, return k closest points to origin (0, 0).\n\n\n\npublic class Main {\n    // Helper Methods\n    static int[][] kClosest(int[][] points, int k) {\n    int left = 0, right = points.length - 1;\n    \n    while (left <= right) {\n        int pivotIdx = partition(points, left, right);\n        \n        if (pivotIdx == k - 1) {\n            break;\n        } else if (pivotIdx < k - 1) {\n            left = pivotIdx + 1;\n        } else {\n            right = pivotIdx - 1;\n        }\n    }\n    \n    return Arrays.copyOf(points, k);\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"\\nQuickSelect approach:\");\n        System.out.println(\"Partition based on distance\");\n        System.out.println(\"Find kth position, return all points before it\");\n        \n        /*\n        */\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "heap"
    },
    {
        "id": "nc150-heap-067_kth_largest_stream-1",
        "name": "Kth Largest Stream: Min Heap",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 67: Kth Largest Element in a Stream\n// ================================================\n// Design a class to find kth largest element in a stream.\n\n\n\npublic class Main {\n    // Helper Methods\n    static     public KthLargest(int k, int[] nums) {\n        this.k = k;\n        this.heap = new PriorityQueue<>();\n        \n        for (int num : nums) {\n            add(num);\n        }\n    }\n    static     public int add(int val) {\n        heap.offer(val);\n        \n        if (heap.size() > k) {\n            heap.poll();\n        }\n        \n        return heap.peek();\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Kth Largest Element in Stream:\");\n        \n        int k = 3;\n        int[] initial = {4, 5, 8, 2};\n        \n        PriorityQueue<Integer> minHeap = new PriorityQueue<>();\n        \n        // Add initial elements\n        for (int num : initial) {\n            minHeap.offer(num);\n            if (minHeap.size() > k) {\n                minHeap.poll();\n            }\n        }\n        \n        System.out.println(\"Initial heap (k=\" + k + \"): \" + minHeap);\n        System.out.println(\"Kth largest: \" + minHeap.peek());\n        \n        // Add new element\n        int newVal = 3;\n        minHeap.offer(newVal);\n        if (minHeap.size() > k) {\n            minHeap.poll();\n        }\n        System.out.println(\"After adding \" + newVal + \": Kth largest = \" + minHeap.peek());\n        \n        /*\n        class KthLargest {\n            private PriorityQueue<Integer> heap;\n            private int k;\n            \n            \n        }\n        */\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "heap"
    },
    {
        "id": "nc150-heap-067_kth_largest_stream-2",
        "name": "Kth Largest Stream: Sorted List",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 67: Kth Largest Element in a Stream\n// ================================================\n// Design a class to find kth largest element in a stream.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nSorted List approach (less efficient)\");\n        System.out.println(\"Maintain sorted list, return (size - k)th element\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "heap"
    },
    {
        "id": "nc150-heap-068_task_scheduler-1",
        "name": "Task Scheduler: Greedy with Max Heap",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 68: Task Scheduler\n// ================================================\n// Given tasks and cooldown n, return minimum time to finish all tasks.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        char[] tasks = {'A', 'A', 'A', 'B', 'B', 'B'};\n        int n = 2;  // Cooldown\n        \n        // Count frequency of each task\n        int[] freq = new int[26];\n        for (char task : tasks) {\n            freq[task - 'A']++;\n        }\n        \n        // Max heap based on frequency\n        PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);\n        for (int f : freq) {\n            if (f > 0) maxHeap.offer(f);\n        }\n        \n        int time = 0;\n        while (!maxHeap.isEmpty()) {\n            List<Integer> temp = new ArrayList<>();\n            int cycle = n + 1;  // Each cycle is n+1 slots\n            \n            while (cycle > 0 && !maxHeap.isEmpty()) {\n                int f = maxHeap.poll();\n                if (f > 1) {\n                    temp.add(f - 1);\n                }\n                time++;\n                cycle--;\n            }\n            \n            for (int f : temp) {\n                maxHeap.offer(f);\n            }\n            \n            // Add idle time if more tasks remain\n            if (!maxHeap.isEmpty()) {\n                time += cycle;  // Remaining cycle slots are idle\n            }\n        }\n        \n        System.out.println(\"Task Scheduler - Minimum time: \" + time);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "heap"
    },
    {
        "id": "nc150-heap-068_task_scheduler-2",
        "name": "Task Scheduler: Math Formula",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 68: Task Scheduler\n// ================================================\n// Given tasks and cooldown n, return minimum time to finish all tasks.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        char[] tasks2 = {'A', 'A', 'A', 'B', 'B', 'B'};\n        int n2 = 2;\n        \n        int[] freq2 = new int[26];\n        int maxFreq = 0;\n        int maxCount = 0;\n        \n        for (char task : tasks2) {\n            freq2[task - 'A']++;\n            if (freq2[task - 'A'] > maxFreq) {\n                maxFreq = freq2[task - 'A'];\n                maxCount = 1;\n            } else if (freq2[task - 'A'] == maxFreq) {\n                maxCount++;\n            }\n        }\n        \n        // Formula: (maxFreq - 1) * (n + 1) + maxCount\n        int partCount = maxFreq - 1;\n        int partLength = n2 + 1;\n        int emptySlots = partCount * partLength + maxCount;\n        \n        int result = Math.max(tasks2.length, emptySlots);\n        System.out.println(\"Task Scheduler (Math): \" + result);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "heap"
    },
    {
        "id": "nc150-heap-069_design_twitter-1",
        "name": "Design Twitter",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 69: Design Twitter\n// ================================================\n// Design a simplified version of Twitter with post, follow, getNewsFeed.\n\n\n\npublic class Main {\n    // Helper Methods\n    static     public Twitter() {\n        follows = new HashMap<>();\n        tweets = new HashMap<>();\n        timestamp = 0;\n    }\n    static     public void postTweet(int userId, int tweetId) {\n        tweets.computeIfAbsent(userId, k -> new ArrayList<>()).add(new int[]{timestamp++, tweetId});\n    }\n    static     public List<Integer> getNewsFeed(int userId) {\n        // Max heap: [time, tweetId, userId, tweetIndex]\n        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> b[0] - a[0]);\n        \n        // Add user's own tweets\n        Set<Integer> followees = follows.getOrDefault(userId, new HashSet<>());\n        followees.add(userId);  // Include self\n        \n        for (int followeeId : followees) {\n            List<int[]> userTweets = tweets.get(followeeId);\n            if (userTweets != null && !userTweets.isEmpty()) {\n                int idx = userTweets.size() - 1;\n                int[] tweet = userTweets.get(idx);\n                heap.offer(new int[]{tweet[0], tweet[1], followeeId, idx});\n            }\n        }\n        \n        List<Integer> feed = new ArrayList<>();\n        while (!heap.isEmpty() && feed.size() < 10) {\n            int[] top = heap.poll();\n            feed.add(top[1]);\n            \n            int idx = top[3] - 1;\n            if (idx >= 0) {\n                int[] prevTweet = tweets.get(top[2]).get(idx);\n                heap.offer(new int[]{prevTweet[0], prevTweet[1], top[2], idx});\n            }\n        }\n        \n        return feed;\n    }\n    static     public void follow(int followerId, int followeeId) {\n        follows.computeIfAbsent(followerId, k -> new HashSet<>()).add(followeeId);\n    }\n    static     public void unfollow(int followerId, int followeeId) {\n        if (follows.containsKey(followerId)) {\n            follows.get(followerId).remove(followeeId);\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Design Twitter:\");\n        \n        /*\n        class Twitter {\n            private Map<Integer, Set<Integer>> follows;    // userId -> set of followees\n            private Map<Integer, List<int[]>> tweets;      // userId -> list of [time, tweetId]\n            private int timestamp;\n            \n            \n            // O(1)\n            \n            // O(n log 10) where n = total tweets from followees\n            \n            // O(1)\n            \n            // O(1)\n        }\n        */\n        \n        System.out.println(\"Data Structures:\");\n        System.out.println(\"- HashMap<userId, Set<followeeId>> for follows\");\n        System.out.println(\"- HashMap<userId, List<[time, tweetId]>> for tweets\");\n        System.out.println(\"- PriorityQueue for merging k sorted lists (news feed)\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "heap"
    },
    {
        "id": "nc150-heap-070_median_stream-1",
        "name": "Median Stream: Two Heaps",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 70: Find Median from Data Stream\n// ================================================\n// Design a data structure that supports adding numbers and finding median.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Small heap (max heap) for lower half\n        // Large heap (min heap) for upper half\n        // Median is either top of large or average of both tops\n        \n        PriorityQueue<Integer> small = new PriorityQueue<>((a, b) -> b - a); // Max heap\n        PriorityQueue<Integer> large = new PriorityQueue<>(); // Min heap\n        \n        // Add number\n        int[] stream = {41, 35, 62, 4, 97, 108};\n        \n        for (int num : stream) {\n            // Add to small first, then balance\n            small.offer(num);\n            large.offer(small.poll());\n            \n            // Keep sizes balanced (small can be 1 larger)\n            if (large.size() > small.size()) {\n                small.offer(large.poll());\n            }\n            \n            // Find median\n            double median;\n            if (small.size() > large.size()) {\n                median = small.peek();\n            } else {\n                median = (small.peek() + large.peek()) / 2.0;\n            }\n            \n            System.out.println(\"Added \" + num + \" -> Median: \" + median);\n        }\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "heap"
    },
    {
        "id": "nc150-heap-070_median_stream-2",
        "name": "Median Stream: Sorted List",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 70: Find Median from Data Stream\n// ================================================\n// Design a data structure that supports adding numbers and finding median.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nSorted List approach:\");\n        System.out.println(\"Maintain sorted list\");\n        System.out.println(\"Binary search for insertion point\");\n        System.out.println(\"Median at middle index\");\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "heap"
    },
    {
        "id": "nc150-heap-070_median_stream-3",
        "name": "Median Stream: Balanced BST (TreeMap)",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 70: Find Median from Data Stream\n// ================================================\n// Design a data structure that supports adding numbers and finding median.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nBalanced BST (TreeMap) approach:\");\n        System.out.println(\"Use TreeMap with counts\");\n        System.out.println(\"Track median position with pointers\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "heap"
    },
    {
        "id": "nc150-backtracking-071_subsets-1",
        "name": "Subsets: Backtracking",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 71: Subsets\n// ================================================\n// Given an integer array nums of unique elements, return all subsets.\n\n\n\npublic class Main {\n    // Helper Methods\n    static void backtrackSubsets(int[] nums, int start, List<Integer> current, List<List<Integer>> result) {\n    result.add(new ArrayList<>(current));\n    \n    for (int i = start; i < nums.length; i++) {\n        current.add(nums[i]);\n        backtrackSubsets(nums, i + 1, current, result);\n        current.remove(current.size() - 1);\n    }\n}\n\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3};\n        List<List<Integer>> subsets = new ArrayList<>();\n        \n        backtrackSubsets(nums, 0, new ArrayList<>(), subsets);\n        System.out.println(\"Subsets (Backtracking): \" + subsets);\n        \n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "backtracking"
    },
    {
        "id": "nc150-backtracking-071_subsets-2",
        "name": "Subsets: Iterative",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 71: Subsets\n// ================================================\n// Given an integer array nums of unique elements, return all subsets.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums2 = {1, 2, 3};\n        List<List<Integer>> subsets2 = new ArrayList<>();\n        subsets2.add(new ArrayList<>());  // Empty set\n        \n        for (int num : nums2) {\n            int size = subsets2.size();\n            for (int i = 0; i < size; i++) {\n                List<Integer> newSubset = new ArrayList<>(subsets2.get(i));\n                newSubset.add(num);\n                subsets2.add(newSubset);\n            }\n        }\n        \n        System.out.println(\"Subsets (Iterative): \" + subsets2);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "backtracking"
    },
    {
        "id": "nc150-backtracking-071_subsets-3",
        "name": "Subsets: Bit Manipulation",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 71: Subsets\n// ================================================\n// Given an integer array nums of unique elements, return all subsets.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums3 = {1, 2, 3};\n        int n = nums3.length;\n        List<List<Integer>> subsets3 = new ArrayList<>();\n        \n        // 2^n subsets, each represented by a bitmask\n        for (int mask = 0; mask < (1 << n); mask++) {\n            List<Integer> subset = new ArrayList<>();\n            for (int i = 0; i < n; i++) {\n                if ((mask & (1 << i)) != 0) {\n                    subset.add(nums3[i]);\n                }\n            }\n            subsets3.add(subset);\n        }\n        \n        System.out.println(\"Subsets (Bitmask): \" + subsets3);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "backtracking"
    },
    {
        "id": "nc150-backtracking-072_combination_sum-1",
        "name": "Combination Sum: Backtracking",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 72: Combination Sum\n// ================================================\n// Given array of distinct integers and target, find all unique combinations \n// that sum to target. Same number may be chosen unlimited times.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // T = target, M = min candidate value\n        int[] candidates = {2, 3, 6, 7};\n        int target = 7;\n        \n        List<List<Integer>> result = new ArrayList<>();\n        backtrackSum(candidates, target, 0, new ArrayList<>(), result);\n        System.out.println(\"Combination Sum: \" + result);\n        \n        static void backtrackSum(int[] candidates, int target, int start, \n                                  List<Integer> current, List<List<Integer>> result) {\n            if (target == 0) {\n                result.add(new ArrayList<>(current));\n                return;\n            }\n            \n            if (target < 0) {\n                return;\n            }\n            \n            for (int i = start; i < candidates.length; i++) {\n                current.add(candidates[i]);\n                // Use same index i (can reuse same number)\n                backtrackSum(candidates, target - candidates[i], i, current, result);\n                current.remove(current.size() - 1);\n            }\n        }\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "backtracking"
    },
    {
        "id": "nc150-backtracking-072_combination_sum-2",
        "name": "Combination Sum: DP (for counting only)",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 72: Combination Sum\n// ================================================\n// Given array of distinct integers and target, find all unique combinations \n// that sum to target. Same number may be chosen unlimited times.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] candidates2 = {2, 3, 6, 7};\n        int target2 = 7;\n        \n        // Count combinations (not actual combinations)\n        int[] dp = new int[target2 + 1];\n        dp[0] = 1;\n        \n        for (int coin : candidates2) {\n            for (int i = coin; i <= target2; i++) {\n                dp[i] += dp[i - coin];\n            }\n        }\n        \n        System.out.println(\"Number of combinations: \" + dp[target2]);\n        \n        // ============================================\n        // Visualization: Decision Tree\n        // ============================================\n        System.out.println(\"\\nDecision Tree for target=7, candidates=[2,3,6,7]:\");\n        System.out.println(\"Root -> choose 2 -> choose 2 -> choose 2 -> FAIL (>7)\");\n        System.out.println(\"     -> choose 2 -> choose 2 -> choose 3 -> SUCCESS [2,2,3]=7\");\n        System.out.println(\"     -> choose 7 -> SUCCESS [7]=7\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "backtracking"
    },
    {
        "id": "nc150-backtracking-073_permutations-1",
        "name": "Permutations: Backtracking with Used Array",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 73: Permutations\n// ================================================\n// Given an array nums of distinct integers, return all possible permutations.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3};\n        List<List<Integer>> permutations = new ArrayList<>();\n        boolean[] used = new boolean[nums.length];\n        \n        backtrackPerm(nums, new ArrayList<>(), used, permutations);\n        System.out.println(\"Permutations: \" + permutations);\n        \n        static void backtrackPerm(int[] nums, List<Integer> current, \n                                   boolean[] used, List<List<Integer>> result) {\n            if (current.size() == nums.length) {\n                result.add(new ArrayList<>(current));\n                return;\n            }\n            \n            for (int i = 0; i < nums.length; i++) {\n                if (used[i]) continue;\n                \n                used[i] = true;\n                current.add(nums[i]);\n                backtrackPerm(nums, current, used, result);\n                current.remove(current.size() - 1);\n                used[i] = false;\n            }\n        }\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "backtracking"
    },
    {
        "id": "nc150-backtracking-073_permutations-2",
        "name": "Permutations: Backtracking with Swap",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 73: Permutations\n// ================================================\n// Given an array nums of distinct integers, return all possible permutations.\n\n\n\npublic class Main {\n    // Helper Methods\n    static void backtrackSwap(int[] nums, int start, List<List<Integer>> result) {\n    if (start == nums.length) {\n        List<Integer> perm = new ArrayList<>();\n        for (int num : nums) perm.add(num);\n        result.add(perm);\n        return;\n    }\n    \n    for (int i = start; i < nums.length; i++) {\n        // Swap\n        int temp = nums[start];\n        nums[start] = nums[i];\n        nums[i] = temp;\n        \n        backtrackSwap(nums, start + 1, result);\n        \n        // Swap back\n        temp = nums[start];\n        nums[start] = nums[i];\n        nums[i] = temp;\n    }\n}\n\n    public static void main(String[] args) {\n        int[] nums2 = {1, 2, 3};\n        List<List<Integer>> permutations2 = new ArrayList<>();\n        \n        backtrackSwap(nums2, 0, permutations2);\n        System.out.println(\"Permutations (Swap): \" + permutations2);\n        \n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "backtracking"
    },
    {
        "id": "nc150-backtracking-073_permutations-3",
        "name": "Permutations: Iterative",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 73: Permutations\n// ================================================\n// Given an array nums of distinct integers, return all possible permutations.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nIterative approach:\");\n        System.out.println(\"Start with [[1]]\");\n        System.out.println(\"Insert 2 at all positions: [[2,1], [1,2]]\");\n        System.out.println(\"Insert 3 at all positions: [[3,2,1], [2,3,1], [2,1,3], ...]\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "backtracking"
    },
    {
        "id": "nc150-backtracking-074_subsets_ii-1",
        "name": "Subsets Ii: Backtracking with Sorting",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 74: Subsets II\n// ================================================\n// Given an integer array nums that may contain duplicates, return all \n// possible subsets (the power set) without duplicate subsets.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 2};\n        Arrays.sort(nums);  // Sort to handle duplicates\n        \n        List<List<Integer>> result = new ArrayList<>();\n        backtrackSubsets(nums, 0, new ArrayList<>(), result);\n        System.out.println(\"Subsets II: \" + result);\n        \n        static void backtrackSubsets(int[] nums, int start, List<Integer> current, \n                                      List<List<Integer>> result) {\n            result.add(new ArrayList<>(current));\n            \n            for (int i = start; i < nums.length; i++) {\n                // Skip duplicates\n                if (i > start && nums[i] == nums[i - 1]) continue;\n                \n                current.add(nums[i]);\n                backtrackSubsets(nums, i + 1, current, result);\n                current.remove(current.size() - 1);\n            }\n        }\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "backtracking"
    },
    {
        "id": "nc150-backtracking-074_subsets_ii-2",
        "name": "Subsets Ii: Iterative with Duplicate Handling",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 74: Subsets II\n// ================================================\n// Given an integer array nums that may contain duplicates, return all \n// possible subsets (the power set) without duplicate subsets.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums2 = {1, 2, 2};\n        Arrays.sort(nums2);\n        \n        List<List<Integer>> result2 = new ArrayList<>();\n        result2.add(new ArrayList<>());\n        \n        int start = 0;\n        for (int i = 0; i < nums2.length; i++) {\n            int size = result2.size();\n            \n            // If duplicate, only add to subsets created in last iteration\n            start = (i > 0 && nums2[i] == nums2[i - 1]) ? size / 2 : 0;\n            \n            for (int j = start; j < size; j++) {\n                List<Integer> subset = new ArrayList<>(result2.get(j));\n                subset.add(nums2[i]);\n                result2.add(subset);\n            }\n        }\n        \n        System.out.println(\"Subsets II (Iterative): \" + result2);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "backtracking"
    },
    {
        "id": "nc150-backtracking-075_combination_sum_ii-1",
        "name": "Combination Sum Ii",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 75: Combination Sum II\n// ================================================\n// Find all unique combinations that sum to target.\n// Each number can only be used once. No duplicate combinations.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] candidates = {10, 1, 2, 7, 6, 1, 5};\n        int target = 8;\n        \n        Arrays.sort(candidates);  // Sort to handle duplicates\n        \n        List<List<Integer>> result = new ArrayList<>();\n        backtrackSum(candidates, target, 0, new ArrayList<>(), result);\n        System.out.println(\"Combination Sum II: \" + result);\n        \n        static void backtrackSum(int[] candidates, int target, int start,\n                                  List<Integer> current, List<List<Integer>> result) {\n            if (target == 0) {\n                result.add(new ArrayList<>(current));\n                return;\n            }\n            \n            for (int i = start; i < candidates.length; i++) {\n                // Skip duplicates at same level\n                if (i > start && candidates[i] == candidates[i - 1]) continue;\n                \n                // Prune: if current candidate > target, all following are too large\n                if (candidates[i] > target) break;\n                \n                current.add(candidates[i]);\n                backtrackSum(candidates, target - candidates[i], i + 1, current, result);\n                current.remove(current.size() - 1);\n            }\n        }\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nFor target=8, candidates=[1,1,2,5,6,7,10]:\");\n        System.out.println(\"Combinations:\");\n        System.out.println(\"  [1, 1, 6]\");\n        System.out.println(\"  [1, 2, 5]\");\n        System.out.println(\"  [1, 7]\");\n        System.out.println(\"  [2, 6]\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "backtracking"
    },
    {
        "id": "nc150-backtracking-076_word_search-1",
        "name": "Word Search",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 76: Word Search\n// ================================================\n// Given an m x n board and a word, find if word exists in the grid.\n// Can only move horizontally or vertically to adjacent cells.\n\n\n\npublic class Main {\n    // Helper Methods\n    static boolean dfsWord(char[][] board, String word, int idx, int r, int c, int rows, int cols) {\n    if (idx == word.length()) return true;\n    \n    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;\n    if (board[r][c] != word.charAt(idx)) return false;\n    \n    // Mark as visited\n    char temp = board[r][c];\n    board[r][c] = '#';\n    \n    // Explore all 4 directions\n    boolean result = dfsWord(board, word, idx + 1, r + 1, c, rows, cols) ||\n                     dfsWord(board, word, idx + 1, r - 1, c, rows, cols) ||\n                     dfsWord(board, word, idx + 1, r, c + 1, rows, cols) ||\n                     dfsWord(board, word, idx + 1, r, c - 1, rows, cols);\n    \n    // Restore\n    board[r][c] = temp;\n    \n    return result;\n}\n\n    public static void main(String[] args) {\n        char[][] board = {\n            {'A', 'B', 'C', 'E'},\n            {'S', 'F', 'C', 'S'},\n            {'A', 'D', 'E', 'E'}\n        };\n        String word = \"ABCCED\";\n        \n        boolean found = false;\n        int rows = board.length;\n        int cols = board[0].length;\n        \n        for (int i = 0; i < rows && !found; i++) {\n            for (int j = 0; j < cols && !found; j++) {\n                if (dfsWord(board, word, 0, i, j, rows, cols)) {\n                    found = true;\n                }\n            }\n        }\n        \n        System.out.println(\"Word '\" + word + \"' found: \" + found);\n        \n        \n        // ============================================\n        // Optimization: Early Termination\n        // ============================================\n        System.out.println(\"\\nOptimizations:\");\n        System.out.println(\"1. Check if all word characters exist in board\");\n        System.out.println(\"2. Start from rarer characters\");\n        System.out.println(\"3. Reverse word if last char is rarer than first\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "backtracking"
    },
    {
        "id": "nc150-backtracking-077_palindrome_partition-1",
        "name": "Palindrome Partition: Backtracking",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 77: Palindrome Partitioning\n// ================================================\n// Partition string so that every substring is a palindrome.\n// Return all possible palindrome partitionings.\n\n\n\npublic class Main {\n    // Helper Methods\n    static boolean isPalindrome(String s) {\n    int left = 0, right = s.length() - 1;\n    while (left < right) {\n        if (s.charAt(left) != s.charAt(right)) return false;\n        left++;\n        right--;\n    }\n    return true;\n}\n\n    public static void main(String[] args) {\n        String s = \"aab\";\n        \n        List<List<String>> result = new ArrayList<>();\n        backtrackPalindrome(s, 0, new ArrayList<>(), result);\n        System.out.println(\"Palindrome Partitioning: \" + result);\n        \n        static void backtrackPalindrome(String s, int start, List<String> current,\n                                         List<List<String>> result) {\n            if (start == s.length()) {\n                result.add(new ArrayList<>(current));\n                return;\n            }\n            \n            for (int end = start + 1; end <= s.length(); end++) {\n                String substring = s.substring(start, end);\n                \n                if (isPalindrome(substring)) {\n                    current.add(substring);\n                    backtrackPalindrome(s, end, current, result);\n                    current.remove(current.size() - 1);\n                }\n            }\n        }\n        \n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "backtracking"
    },
    {
        "id": "nc150-backtracking-077_palindrome_partition-2",
        "name": "Palindrome Partition: DP Preprocessing + Backtracking",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 77: Palindrome Partitioning\n// ================================================\n// Partition string so that every substring is a palindrome.\n// Return all possible palindrome partitionings.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nWith DP Preprocessing:\");\n        System.out.println(\"Precompute dp[i][j] = true if s[i..j] is palindrome\");\n        System.out.println(\"Speeds up palindrome checking to O(1)\");\n        \n        /*\n        // Precompute palindrome table\n        boolean[][] dp = new boolean[n][n];\n        for (int i = n - 1; i >= 0; i--) {\n            for (int j = i; j < n; j++) {\n                if (s.charAt(i) == s.charAt(j) && (j - i <= 2 || dp[i+1][j-1])) {\n                    dp[i][j] = true;\n                }\n            }\n        }\n        */\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nFor 'aab':\");\n        System.out.println(\"  [['a', 'a', 'b']]\");\n        System.out.println(\"  [['aa', 'b']]\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "backtracking"
    },
    {
        "id": "nc150-backtracking-078_letter_combinations-1",
        "name": "Letter Combinations: Backtracking",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 78: Letter Combinations of a Phone Number\n// ================================================\n// Given a string containing digits 2-9, return all possible letter combinations.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String digits = \"23\";\n        \n        Map<Character, String> phone = new HashMap<>();\n        phone.put('2', \"abc\");\n        phone.put('3', \"def\");\n        phone.put('4', \"ghi\");\n        phone.put('5', \"jkl\");\n        phone.put('6', \"mno\");\n        phone.put('7', \"pqrs\");\n        phone.put('8', \"tuv\");\n        phone.put('9', \"wxyz\");\n        \n        List<String> result = new ArrayList<>();\n        if (!digits.isEmpty()) {\n            backtrackLetters(digits, 0, new StringBuilder(), phone, result);\n        }\n        System.out.println(\"Letter Combinations: \" + result);\n        \n        static void backtrackLetters(String digits, int idx, StringBuilder current,\n                                      Map<Character, String> phone, List<String> result) {\n            if (idx == digits.length()) {\n                result.add(current.toString());\n                return;\n            }\n            \n            String letters = phone.get(digits.charAt(idx));\n            for (char letter : letters.toCharArray()) {\n                current.append(letter);\n                backtrackLetters(digits, idx + 1, current, phone, result);\n                current.deleteCharAt(current.length() - 1);\n            }\n        }\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "backtracking"
    },
    {
        "id": "nc150-backtracking-078_letter_combinations-2",
        "name": "Letter Combinations: Iterative BFS",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 78: Letter Combinations of a Phone Number\n// ================================================\n// Given a string containing digits 2-9, return all possible letter combinations.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String digits2 = \"23\";\n        \n        List<String> result2 = new ArrayList<>();\n        if (!digits2.isEmpty()) {\n            result2.add(\"\");\n            \n            for (char digit : digits2.toCharArray()) {\n                String letters = phone.get(digit);\n                List<String> temp = new ArrayList<>();\n                \n                for (String s : result2) {\n                    for (char letter : letters.toCharArray()) {\n                        temp.add(s + letter);\n                    }\n                }\n                \n                result2 = temp;\n            }\n        }\n        \n        System.out.println(\"Letter Combinations (Iterative): \" + result2);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "backtracking"
    },
    {
        "id": "nc150-backtracking-079_n_queens-1",
        "name": "N Queens",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 79: N-Queens\n// ================================================\n// Place n queens on an n\u00d7n chessboard such that no two queens attack each other.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int n = 4;\n        List<List<String>> solutions = new ArrayList<>();\n        \n        int[] queens = new int[n];  // queens[row] = column of queen in that row\n        Arrays.fill(queens, -1);\n        \n        Set<Integer> cols = new HashSet<>();\n        Set<Integer> diag1 = new HashSet<>();  // row - col\n        Set<Integer> diag2 = new HashSet<>();  // row + col\n        \n        solveNQueens(0, n, queens, cols, diag1, diag2, solutions);\n        \n        System.out.println(\"N-Queens Solutions for n=\" + n + \":\");\n        for (List<String> solution : solutions) {\n            for (String row : solution) {\n                System.out.println(\"  \" + row);\n            }\n            System.out.println();\n        }\n        \n        static void solveNQueens(int row, int n, int[] queens, Set<Integer> cols, \n                                  Set<Integer> diag1, Set<Integer> diag2, \n                                  List<List<String>> solutions) {\n            if (row == n) {\n                // Found valid solution\n                List<String> board = new ArrayList<>();\n                for (int i = 0; i < n; i++) {\n                    char[] rowChars = new char[n];\n                    Arrays.fill(rowChars, '.');\n                    rowChars[queens[i]] = 'Q';\n                    board.add(new String(rowChars));\n                }\n                solutions.add(board);\n                return;\n            }\n            \n            for (int col = 0; col < n; col++) {\n                if (cols.contains(col)) continue;\n                if (diag1.contains(row - col)) continue;\n                if (diag2.contains(row + col)) continue;\n                \n                // Place queen\n                queens[row] = col;\n                cols.add(col);\n                diag1.add(row - col);\n                diag2.add(row + col);\n                \n                solveNQueens(row + 1, n, queens, cols, diag1, diag2, solutions);\n                \n                // Remove queen\n                cols.remove(col);\n                diag1.remove(row - col);\n                diag2.remove(row + col);\n            }\n        }\n        \n        // ============================================\n        // Visualization: 4-Queens Solution\n        // ============================================\n        System.out.println(\"4-Queens Example:\");\n        System.out.println(\". Q . .\");\n        System.out.println(\". . . Q\");\n        System.out.println(\"Q . . .\");\n        System.out.println(\". . Q .\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "backtracking"
    },
    {
        "id": "nc150-graphs-080_num_islands-1",
        "name": "Num Islands: DFS",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 80: Number of Islands\n// ================================================\n// Given an m x n 2D grid map of '1's (land) and '0's (water), \n// return the number of islands.\n\n\n\npublic class Main {\n    // Helper Methods\n    static void dfs(char[][] grid, int i, int j, int rows, int cols) {\n    if (i < 0 || i >= rows || j < 0 || j >= cols || grid[i][j] != '1') {\n        return;\n    }\n    \n    grid[i][j] = '0'; // Mark as visited\n    \n    dfs(grid, i + 1, j, rows, cols);\n    dfs(grid, i - 1, j, rows, cols);\n    dfs(grid, i, j + 1, rows, cols);\n    dfs(grid, i, j - 1, rows, cols);\n}\n\n    public static void main(String[] args) {\n        char[][] grid = {\n            {'1', '1', '0', '0', '0'},\n            {'1', '1', '0', '0', '0'},\n            {'0', '0', '1', '0', '0'},\n            {'0', '0', '0', '1', '1'}\n        };\n        \n        int numIslands = 0;\n        int rows = grid.length;\n        int cols = grid[0].length;\n        \n        for (int i = 0; i < rows; i++) {\n            for (int j = 0; j < cols; j++) {\n                if (grid[i][j] == '1') {\n                    numIslands++;\n                    // DFS to mark all connected land\n                    dfs(grid, i, j, rows, cols);\n                }\n            }\n        }\n        \n        System.out.println(\"Number of Islands (DFS): \" + numIslands);\n        \n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "graphs"
    },
    {
        "id": "nc150-graphs-080_num_islands-2",
        "name": "Num Islands: BFS",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 80: Number of Islands\n// ================================================\n// Given an m x n 2D grid map of '1's (land) and '0's (water), \n// return the number of islands.\n\n\n\npublic class Main {\n    // Helper Methods\n    static void bfs(char[][] grid, int i, int j, int rows, int cols) {\n    Queue<int[]> queue = new LinkedList<>();\n    queue.offer(new int[]{i, j});\n    grid[i][j] = '0';\n    \n    int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};\n    \n    while (!queue.isEmpty()) {\n        int[] cell = queue.poll();\n        for (int[] dir : dirs) {\n            int ni = cell[0] + dir[0];\n            int nj = cell[1] + dir[1];\n            if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && grid[ni][nj] == '1') {\n                grid[ni][nj] = '0';\n                queue.offer(new int[]{ni, nj});\n            }\n        }\n    }\n}\n\n    public static void main(String[] args) {\n        char[][] grid2 = {\n            {'1', '1', '0', '0', '0'},\n            {'1', '1', '0', '0', '0'},\n            {'0', '0', '1', '0', '0'},\n            {'0', '0', '0', '1', '1'}\n        };\n        \n        int numIslands2 = 0;\n        int rows2 = grid2.length;\n        int cols2 = grid2[0].length;\n        \n        for (int i = 0; i < rows2; i++) {\n            for (int j = 0; j < cols2; j++) {\n                if (grid2[i][j] == '1') {\n                    numIslands2++;\n                    bfs(grid2, i, j, rows2, cols2);\n                }\n            }\n        }\n        \n        System.out.println(\"Number of Islands (BFS): \" + numIslands2);\n        \n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "graphs"
    },
    {
        "id": "nc150-graphs-080_num_islands-3",
        "name": "Num Islands: Union",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 80: Number of Islands\n// ================================================\n// Given an m x n 2D grid map of '1's (land) and '0's (water), \n// return the number of islands.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nUnion-Find Approach:\");\n        System.out.println(\"1. Create disjoint set for each land cell\");\n        System.out.println(\"2. Union adjacent land cells\");\n        System.out.println(\"3. Count distinct roots\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "graphs"
    },
    {
        "id": "nc150-graphs-082_clone_graph-1",
        "name": "Clone Graph: DFS with HashMap",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 82: Clone Graph\n// ================================================\n// Given a reference to a node in a connected undirected graph, \n// return a deep copy of the graph.\n\n\n\npublic class Main {\n    // Helper Methods\n    static Node cloneGraph(Node node) {\n    if (node == null) return null;\n    \n    if (visited.containsKey(node)) {\n        return visited.get(node);\n    }\n    \n    Node clone = new Node(node.val, new ArrayList<>());\n    visited.put(node, clone);\n    \n    for (Node neighbor : node.neighbors) {\n        clone.neighbors.add(cloneGraph(neighbor));\n    }\n    \n    return clone;\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"Clone Graph - DFS Approach:\");\n        System.out.println(\"1. Use HashMap to track original -> clone mapping\");\n        System.out.println(\"2. DFS: If node exists in map, return clone\");\n        System.out.println(\"3. Otherwise, create clone and recursively clone neighbors\");\n        \n        /*\n        class Node {\n            int val;\n            List<Node> neighbors;\n        }\n        \n        Map<Node, Node> visited = new HashMap<>();\n        \n        */\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "graphs"
    },
    {
        "id": "nc150-graphs-082_clone_graph-2",
        "name": "Clone Graph: BFS with HashMap",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 82: Clone Graph\n// ================================================\n// Given a reference to a node in a connected undirected graph, \n// return a deep copy of the graph.\n\n\n\npublic class Main {\n    // Helper Methods\n    static Node cloneGraphBFS(Node node) {\n    if (node == null) return null;\n    \n    Map<Node, Node> visited = new HashMap<>();\n    Queue<Node> queue = new LinkedList<>();\n    \n    visited.put(node, new Node(node.val, new ArrayList<>()));\n    queue.offer(node);\n    \n    while (!queue.isEmpty()) {\n        Node curr = queue.poll();\n        \n        for (Node neighbor : curr.neighbors) {\n            if (!visited.containsKey(neighbor)) {\n                visited.put(neighbor, new Node(neighbor.val, new ArrayList<>()));\n                queue.offer(neighbor);\n            }\n            visited.get(curr).neighbors.add(visited.get(neighbor));\n        }\n    }\n    \n    return visited.get(node);\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"\\nBFS Approach:\");\n        System.out.println(\"1. Create queue starting with root node\");\n        System.out.println(\"2. Clone each node and track in HashMap\");\n        System.out.println(\"3. For each neighbor, create if not exists, add to clone's neighbors\");\n        \n        /*\n        */\n        \n        // Example graph\n        System.out.println(\"\\nExample: 1 -- 2\");\n        System.out.println(\"         |    |\");\n        System.out.println(\"         4 -- 3\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "graphs"
    },
    {
        "id": "nc150-graphs-083_number_of_islands-1",
        "name": "Number Of Islands: DFS",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 83: Number of Islands\n// ================================================\n// Given 2D grid of '1's (land) and '0's (water), count the number of islands.\n\n\n\npublic class Main {\n    // Helper Methods\n    static void dfsIsland(char[][] grid, int r, int c) {\n    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] != '1') {\n        return;\n    }\n    \n    grid[r][c] = '0';  // Mark as visited\n    \n    dfsIsland(grid, r + 1, c);\n    dfsIsland(grid, r - 1, c);\n    dfsIsland(grid, r, c + 1);\n    dfsIsland(grid, r, c - 1);\n}\n\n    public static void main(String[] args) {\n        char[][] grid = {\n            {'1', '1', '0', '0', '0'},\n            {'1', '1', '0', '0', '0'},\n            {'0', '0', '1', '0', '0'},\n            {'0', '0', '0', '1', '1'}\n        };\n        \n        int m = grid.length, n = grid[0].length;\n        int islands = 0;\n        \n        for (int i = 0; i < m; i++) {\n            for (int j = 0; j < n; j++) {\n                if (grid[i][j] == '1') {\n                    dfsIsland(grid, i, j);\n                    islands++;\n                }\n            }\n        }\n        \n        System.out.println(\"Number of Islands: \" + islands);\n        \n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "graphs"
    },
    {
        "id": "nc150-graphs-083_number_of_islands-2",
        "name": "Number Of Islands: BFS",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 83: Number of Islands\n// ================================================\n// Given 2D grid of '1's (land) and '0's (water), count the number of islands.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nBFS Approach:\");\n        System.out.println(\"Use queue to explore neighbors level by level\");\n        System.out.println(\"Mark cells as visited when adding to queue\");\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "graphs"
    },
    {
        "id": "nc150-graphs-083_number_of_islands-3",
        "name": "Number Of Islands: Union",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 83: Number of Islands\n// ================================================\n// Given 2D grid of '1's (land) and '0's (water), count the number of islands.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nUnion-Find Approach:\");\n        System.out.println(\"Union adjacent land cells\");\n        System.out.println(\"Count distinct components at end\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "graphs"
    },
    {
        "id": "nc150-graphs-084_rotting_oranges-1",
        "name": "Rotting Oranges",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 84: Rotting Oranges\n// ================================================\n// In a grid, 0=empty, 1=fresh orange, 2=rotten orange.\n// Rotten oranges spread to adjacent fresh oranges each minute.\n// Return minutes until no fresh oranges remain, or -1 if impossible.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[][] grid = {\n            {2, 1, 1},\n            {1, 1, 0},\n            {0, 1, 1}\n        };\n        \n        int rows = grid.length;\n        int cols = grid[0].length;\n        \n        Queue<int[]> queue = new LinkedList<>();\n        int freshCount = 0;\n        \n        // Find all rotten oranges and count fresh\n        for (int i = 0; i < rows; i++) {\n            for (int j = 0; j < cols; j++) {\n                if (grid[i][j] == 2) {\n                    queue.offer(new int[]{i, j});\n                } else if (grid[i][j] == 1) {\n                    freshCount++;\n                }\n            }\n        }\n        \n        if (freshCount == 0) {\n            System.out.println(\"Minutes: 0\");\n        } else {\n            int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};\n            int minutes = 0;\n            \n            while (!queue.isEmpty() && freshCount > 0) {\n                int size = queue.size();\n                minutes++;\n                \n                for (int i = 0; i < size; i++) {\n                    int[] cell = queue.poll();\n                    \n                    for (int[] dir : dirs) {\n                        int nr = cell[0] + dir[0];\n                        int nc = cell[1] + dir[1];\n                        \n                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {\n                            grid[nr][nc] = 2;\n                            freshCount--;\n                            queue.offer(new int[]{nr, nc});\n                        }\n                    }\n                }\n            }\n            \n            int result = (freshCount == 0) ? minutes : -1;\n            System.out.println(\"Minutes: \" + result);\n        }\n        \n        // ============================================\n        // Visualization: Step by step\n        // ============================================\n        System.out.println(\"\\nStep-by-step:\");\n        System.out.println(\"Initial: 2 1 1    (2=rotten, 1=fresh)\");\n        System.out.println(\"         1 1 0\");\n        System.out.println(\"         0 1 1\");\n        System.out.println(\"Min 1:   2 2 1    (adjacent become rotten)\");\n        System.out.println(\"         2 1 0\");\n        System.out.println(\"         0 1 1\");\n        System.out.println(\"Min 2:   2 2 2\");\n        System.out.println(\"         2 2 0\");\n        System.out.println(\"         0 2 1\");\n        System.out.println(\"Min 3:   2 2 2\");\n        System.out.println(\"         2 2 0\");\n        System.out.println(\"         0 2 2\");\n        System.out.println(\"Min 4:   All rotten! Result = 4\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "graphs"
    },
    {
        "id": "nc150-graphs-085_pacific_atlantic-1",
        "name": "Pacific Atlantic: DFS from Oceans",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 85: Pacific Atlantic Water Flow\n// ================================================\n// Given m x n matrix of heights, find cells where water can flow to both oceans.\n// Pacific touches left and top edges, Atlantic touches right and bottom edges.\n\n\n\npublic class Main {\n    // Helper Methods\n    static void dfs(int[][] heights, int r, int c, boolean[][] visited, int prevHeight) {\n    int m = heights.length, n = heights[0].length;\n    \n    if (r < 0 || r >= m || c < 0 || c >= n) return;\n    if (visited[r][c] || heights[r][c] < prevHeight) return;\n    \n    visited[r][c] = true;\n    \n    dfs(heights, r + 1, c, visited, heights[r][c]);\n    dfs(heights, r - 1, c, visited, heights[r][c]);\n    dfs(heights, r, c + 1, visited, heights[r][c]);\n    dfs(heights, r, c - 1, visited, heights[r][c]);\n}\n\n    public static void main(String[] args) {\n        int[][] heights = {\n            {1, 2, 2, 3, 5},\n            {3, 2, 3, 4, 4},\n            {2, 4, 5, 3, 1},\n            {6, 7, 1, 4, 5},\n            {5, 1, 1, 2, 4}\n        };\n        \n        int m = heights.length;\n        int n = heights[0].length;\n        \n        boolean[][] pacific = new boolean[m][n];\n        boolean[][] atlantic = new boolean[m][n];\n        \n        // DFS from Pacific edges (top and left)\n        for (int i = 0; i < m; i++) dfs(heights, i, 0, pacific, Integer.MIN_VALUE);\n        for (int j = 0; j < n; j++) dfs(heights, 0, j, pacific, Integer.MIN_VALUE);\n        \n        // DFS from Atlantic edges (bottom and right)\n        for (int i = 0; i < m; i++) dfs(heights, i, n - 1, atlantic, Integer.MIN_VALUE);\n        for (int j = 0; j < n; j++) dfs(heights, m - 1, j, atlantic, Integer.MIN_VALUE);\n        \n        // Find cells reachable from both\n        List<List<Integer>> result = new ArrayList<>();\n        for (int i = 0; i < m; i++) {\n            for (int j = 0; j < n; j++) {\n                if (pacific[i][j] && atlantic[i][j]) {\n                    result.add(Arrays.asList(i, j));\n                }\n            }\n        }\n        \n        System.out.println(\"Cells reaching both oceans: \" + result);\n        \n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "graphs"
    },
    {
        "id": "nc150-graphs-085_pacific_atlantic-2",
        "name": "Pacific Atlantic: BFS from Oceans",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 85: Pacific Atlantic Water Flow\n// ================================================\n// Given m x n matrix of heights, find cells where water can flow to both oceans.\n// Pacific touches left and top edges, Atlantic touches right and bottom edges.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nBFS Approach:\");\n        System.out.println(\"Start from ocean edges and BFS backwards\");\n        System.out.println(\"Water flows uphill from ocean perspective\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "graphs"
    },
    {
        "id": "nc150-graphs-086_surrounded_regions-1",
        "name": "Surrounded Regions: DFS from Border",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 86: Surrounded Regions\n// ================================================\n// Capture all 'O's not on the border or connected to border.\n\n\n\npublic class Main {\n    // Helper Methods\n    static void markBorder(char[][] board, int r, int c, int m, int n) {\n    if (r < 0 || r >= m || c < 0 || c >= n) return;\n    if (board[r][c] != 'O') return;\n    \n    board[r][c] = 'T';\n    \n    markBorder(board, r + 1, c, m, n);\n    markBorder(board, r - 1, c, m, n);\n    markBorder(board, r, c + 1, m, n);\n    markBorder(board, r, c - 1, m, n);\n}\n\n    public static void main(String[] args) {\n        char[][] board = {\n            {'X', 'X', 'X', 'X'},\n            {'X', 'O', 'O', 'X'},\n            {'X', 'X', 'O', 'X'},\n            {'X', 'O', 'X', 'X'}\n        };\n        \n        int m = board.length;\n        int n = board[0].length;\n        \n        // Mark border-connected 'O's as 'T' (temporary)\n        for (int i = 0; i < m; i++) {\n            markBorder(board, i, 0, m, n);\n            markBorder(board, i, n - 1, m, n);\n        }\n        for (int j = 0; j < n; j++) {\n            markBorder(board, 0, j, m, n);\n            markBorder(board, m - 1, j, m, n);\n        }\n        \n        // Convert: 'O' -> 'X' (captured), 'T' -> 'O' (restore)\n        for (int i = 0; i < m; i++) {\n            for (int j = 0; j < n; j++) {\n                if (board[i][j] == 'O') board[i][j] = 'X';\n                if (board[i][j] == 'T') board[i][j] = 'O';\n            }\n        }\n        \n        System.out.println(\"Captured Board:\");\n        for (char[] row : board) {\n            System.out.println(Arrays.toString(row));\n        }\n        \n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "graphs"
    },
    {
        "id": "nc150-graphs-086_surrounded_regions-2",
        "name": "Surrounded Regions: Union",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 86: Surrounded Regions\n// ================================================\n// Capture all 'O's not on the border or connected to border.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nUnion-Find Approach:\");\n        System.out.println(\"1. Connect all border 'O's to a virtual node\");\n        System.out.println(\"2. Connect adjacent 'O's\");\n        System.out.println(\"3. Capture 'O's not connected to virtual node\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "graphs"
    },
    {
        "id": "nc150-graphs-087_course_schedule-1",
        "name": "Course Schedule: DFS Cycle Detection",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 87: Course Schedule\n// ================================================\n// There are numCourses courses and prerequisites. Determine if you can \n// finish all courses. prerequisites[i] = [a, b] means take b before a.\n\n\n\npublic class Main {\n    // Helper Methods\n    static boolean dfs(List<List<Integer>> graph, int course, int[] state) {\n    state[course] = 1;  // Visiting\n    \n    for (int next : graph.get(course)) {\n        if (state[next] == 1) return false;  // Cycle detected\n        if (state[next] == 0) {\n            if (!dfs(graph, next, state)) return false;\n        }\n    }\n    \n    state[course] = 2;  // Visited\n    return true;\n}\n\n    public static void main(String[] args) {\n        int numCourses = 4;\n        int[][] prerequisites = {{1, 0}, {2, 1}, {3, 2}};\n        \n        // Build adjacency list\n        List<List<Integer>> graph = new ArrayList<>();\n        for (int i = 0; i < numCourses; i++) {\n            graph.add(new ArrayList<>());\n        }\n        for (int[] pre : prerequisites) {\n            graph.get(pre[1]).add(pre[0]);  // b -> a\n        }\n        \n        // 0 = unvisited, 1 = visiting, 2 = visited\n        int[] state = new int[numCourses];\n        boolean canFinish = true;\n        \n        for (int i = 0; i < numCourses && canFinish; i++) {\n            if (state[i] == 0) {\n                canFinish = dfs(graph, i, state);\n            }\n        }\n        \n        System.out.println(\"Can finish all courses: \" + canFinish);\n        \n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "graphs"
    },
    {
        "id": "nc150-graphs-087_course_schedule-2",
        "name": "Course Schedule: BFS Topological Sort (Kahn's)",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 87: Course Schedule\n// ================================================\n// There are numCourses courses and prerequisites. Determine if you can \n// finish all courses. prerequisites[i] = [a, b] means take b before a.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int numCourses2 = 4;\n        int[][] prerequisites2 = {{1, 0}, {2, 1}, {3, 2}};\n        \n        // Build graph and indegree array\n        List<List<Integer>> graph2 = new ArrayList<>();\n        int[] indegree = new int[numCourses2];\n        \n        for (int i = 0; i < numCourses2; i++) {\n            graph2.add(new ArrayList<>());\n        }\n        for (int[] pre : prerequisites2) {\n            graph2.get(pre[1]).add(pre[0]);\n            indegree[pre[0]]++;\n        }\n        \n        // Start with courses that have no prerequisites\n        Queue<Integer> queue = new LinkedList<>();\n        for (int i = 0; i < numCourses2; i++) {\n            if (indegree[i] == 0) queue.offer(i);\n        }\n        \n        int completed = 0;\n        while (!queue.isEmpty()) {\n            int course = queue.poll();\n            completed++;\n            \n            for (int next : graph2.get(course)) {\n                indegree[next]--;\n                if (indegree[next] == 0) {\n                    queue.offer(next);\n                }\n            }\n        }\n        \n        boolean canFinish2 = (completed == numCourses2);\n        System.out.println(\"Can finish (BFS): \" + canFinish2);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "graphs"
    },
    {
        "id": "nc150-graphs-088_course_schedule_ii-1",
        "name": "Course Schedule Ii: BFS Topological Sort (Kahn's)",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 88: Course Schedule II\n// ================================================\n// Return the order of courses to finish all courses. Return empty if impossible.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int numCourses = 4;\n        int[][] prerequisites = {{1, 0}, {2, 0}, {3, 1}, {3, 2}};\n        \n        // Build graph and indegree\n        List<List<Integer>> graph = new ArrayList<>();\n        int[] indegree = new int[numCourses];\n        \n        for (int i = 0; i < numCourses; i++) {\n            graph.add(new ArrayList<>());\n        }\n        for (int[] pre : prerequisites) {\n            graph.get(pre[1]).add(pre[0]);\n            indegree[pre[0]]++;\n        }\n        \n        // BFS with indegree 0 nodes\n        Queue<Integer> queue = new LinkedList<>();\n        for (int i = 0; i < numCourses; i++) {\n            if (indegree[i] == 0) queue.offer(i);\n        }\n        \n        int[] order = new int[numCourses];\n        int idx = 0;\n        \n        while (!queue.isEmpty()) {\n            int course = queue.poll();\n            order[idx++] = course;\n            \n            for (int next : graph.get(course)) {\n                indegree[next]--;\n                if (indegree[next] == 0) {\n                    queue.offer(next);\n                }\n            }\n        }\n        \n        if (idx == numCourses) {\n            System.out.println(\"Course Order: \" + Arrays.toString(order));\n        } else {\n            System.out.println(\"Impossible - cycle detected\");\n        }\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "graphs"
    },
    {
        "id": "nc150-graphs-088_course_schedule_ii-2",
        "name": "Course Schedule Ii: DFS Topological Sort",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 88: Course Schedule II\n// ================================================\n// Return the order of courses to finish all courses. Return empty if impossible.\n\n\n\npublic class Main {\n    // Helper Methods\n    static int[] findOrderDFS(int numCourses, int[][] prerequisites) {\n    // Build graph\n    List<List<Integer>> graph = buildGraph(numCourses, prerequisites);\n    \n    int[] state = new int[numCourses]; // 0=white, 1=gray, 2=black\n    List<Integer> order = new ArrayList<>();\n    \n    for (int i = 0; i < numCourses; i++) {\n        if (state[i] == 0) {\n            if (!dfs(graph, i, state, order)) {\n                return new int[0]; // Cycle detected\n            }\n        }\n    }\n    \n    Collections.reverse(order);\n    return order.stream().mapToInt(i -> i).toArray();\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"\\nDFS Approach:\");\n        System.out.println(\"1. Use 3-state coloring (white, gray, black)\");\n        System.out.println(\"2. Post-order traversal gives reverse topological order\");\n        System.out.println(\"3. Detect cycle if we visit a gray node\");\n        \n        /*\n        */\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "graphs"
    },
    {
        "id": "nc150-graphs-089_redundant_connection-1",
        "name": "Redundant Connection: Union",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 89: Redundant Connection\n// ================================================\n// In a graph that started as a tree, find the edge that was added last\n// that creates a cycle.\n\n\n\npublic class Main {\n    // Helper Methods\n    static int find(int[] parent, int x) {\n    if (parent[x] != x) {\n        parent[x] = find(parent, parent[x]);  // Path compression\n    }\n    return parent[x];\n}\n\n    public static void main(String[] args) {\n        int[][] edges = {{1, 2}, {1, 3}, {2, 3}};\n        int n = edges.length;\n        \n        int[] parent = new int[n + 1];\n        int[] rank = new int[n + 1];\n        \n        // Initialize: each node is its own parent\n        for (int i = 1; i <= n; i++) {\n            parent[i] = i;\n            rank[i] = 0;\n        }\n        \n        int[] redundant = null;\n        \n        for (int[] edge : edges) {\n            int u = edge[0], v = edge[1];\n            \n            int rootU = find(parent, u);\n            int rootV = find(parent, v);\n            \n            if (rootU == rootV) {\n                // Found cycle - this edge is redundant\n                redundant = edge;\n            } else {\n                // Union by rank\n                if (rank[rootU] < rank[rootV]) {\n                    parent[rootU] = rootV;\n                } else if (rank[rootU] > rank[rootV]) {\n                    parent[rootV] = rootU;\n                } else {\n                    parent[rootV] = rootU;\n                    rank[rootU]++;\n                }\n            }\n        }\n        \n        System.out.println(\"Redundant Connection: \" + Arrays.toString(redundant));\n        \n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "graphs"
    },
    {
        "id": "nc150-graphs-089_redundant_connection-2",
        "name": "Redundant Connection: DFS Cycle Detection",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 89: Redundant Connection\n// ================================================\n// In a graph that started as a tree, find the edge that was added last\n// that creates a cycle.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nDFS Approach:\");\n        System.out.println(\"For each edge, check if path already exists between nodes\");\n        System.out.println(\"If yes, this edge creates a cycle\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "graphs"
    },
    {
        "id": "nc150-graphs-090_connected_components-1",
        "name": "Connected Components: Union",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 90: Number of Connected Components in an Undirected Graph\n// ================================================\n// Given n nodes and list of edges, find number of connected components.\n\n\n\npublic class Main {\n    // Helper Methods\n    static int find(int[] parent, int x) {\n    if (parent[x] != x) {\n        parent[x] = find(parent, parent[x]);\n    }\n    return parent[x];\n}\n\n    public static void main(String[] args) {\n        int n = 5;\n        int[][] edges = {{0, 1}, {1, 2}, {3, 4}};\n        \n        int[] parent = new int[n];\n        for (int i = 0; i < n; i++) parent[i] = i;\n        \n        int components = n;\n        \n        for (int[] edge : edges) {\n            int root1 = find(parent, edge[0]);\n            int root2 = find(parent, edge[1]);\n            \n            if (root1 != root2) {\n                parent[root1] = root2;\n                components--;\n            }\n        }\n        \n        System.out.println(\"Connected Components: \" + components);\n        \n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "graphs"
    },
    {
        "id": "nc150-graphs-090_connected_components-2",
        "name": "Connected Components: DFS",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 90: Number of Connected Components in an Undirected Graph\n// ================================================\n// Given n nodes and list of edges, find number of connected components.\n\n\n\npublic class Main {\n    // Helper Methods\n    static void dfs(List<List<Integer>> graph, int node, boolean[] visited) {\n    visited[node] = true;\n    for (int neighbor : graph.get(node)) {\n        if (!visited[neighbor]) {\n            dfs(graph, neighbor, visited);\n        }\n    }\n}\n\n    public static void main(String[] args) {\n        int n2 = 5;\n        int[][] edges2 = {{0, 1}, {1, 2}, {3, 4}};\n        \n        // Build adjacency list\n        List<List<Integer>> graph = new ArrayList<>();\n        for (int i = 0; i < n2; i++) graph.add(new ArrayList<>());\n        for (int[] edge : edges2) {\n            graph.get(edge[0]).add(edge[1]);\n            graph.get(edge[1]).add(edge[0]);\n        }\n        \n        boolean[] visited = new boolean[n2];\n        int components2 = 0;\n        \n        for (int i = 0; i < n2; i++) {\n            if (!visited[i]) {\n                dfs(graph, i, visited);\n                components2++;\n            }\n        }\n        \n        System.out.println(\"Connected Components (DFS): \" + components2);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "graphs"
    },
    {
        "id": "nc150-graphs-091_graph_valid_tree-1",
        "name": "Graph Valid Tree: Union",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 91: Graph Valid Tree\n// ================================================\n// Given n nodes and undirected edges, check if these edges form a valid tree.\n// A valid tree has n-1 edges and is connected with no cycles.\n\n\n\npublic class Main {\n    // Helper Methods\n    static int find(int[] parent, int x) {\n    if (parent[x] != x) {\n        parent[x] = find(parent, parent[x]);\n    }\n    return parent[x];\n}\n\n    public static void main(String[] args) {\n        int n = 5;\n        int[][] edges = {{0, 1}, {0, 2}, {0, 3}, {1, 4}};\n        \n        // Tree conditions: n-1 edges + no cycle\n        if (edges.length != n - 1) {\n            System.out.println(\"Valid Tree: false (wrong edge count)\");\n        } else {\n            int[] parent = new int[n];\n            for (int i = 0; i < n; i++) parent[i] = i;\n            \n            boolean validTree = true;\n            \n            for (int[] edge : edges) {\n                int root1 = find(parent, edge[0]);\n                int root2 = find(parent, edge[1]);\n                \n                if (root1 == root2) {\n                    validTree = false;  // Cycle detected\n                    break;\n                }\n                parent[root1] = root2;\n            }\n            \n            System.out.println(\"Valid Tree: \" + validTree);\n        }\n        \n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "graphs"
    },
    {
        "id": "nc150-graphs-091_graph_valid_tree-2",
        "name": "Graph Valid Tree: DFS",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 91: Graph Valid Tree\n// ================================================\n// Given n nodes and undirected edges, check if these edges form a valid tree.\n// A valid tree has n-1 edges and is connected with no cycles.\n\n\n\npublic class Main {\n    // Helper Methods\n    static boolean validTreeDFS(int n, int[][] edges) {\n    if (edges.length != n - 1) return false;\n    \n    List<List<Integer>> graph = buildGraph(n, edges);\n    boolean[] visited = new boolean[n];\n    \n    dfs(graph, 0, -1, visited);\n    \n    // Check all nodes visited\n    for (boolean v : visited) {\n        if (!v) return false;\n    }\n    return true;\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"\\nDFS Approach:\");\n        System.out.println(\"1. Check edge count = n - 1\");\n        System.out.println(\"2. DFS from node 0\");\n        System.out.println(\"3. Check all nodes visited (connected)\");\n        System.out.println(\"4. No back edges (no cycles) - tracked by parent\");\n        \n        /*\n        */\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "graphs"
    },
    {
        "id": "nc150-advanced-graphs-092_min_cost_connect-1",
        "name": "Min Cost Connect: Prim's Algorithm",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 92: Min Cost to Connect All Points (Prim's/Kruskal's)\n// ================================================\n// Given n points, return min cost to connect all points.\n// Cost = Manhattan distance = |xi - xj| + |yi - yj|\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[][] points = {{0, 0}, {2, 2}, {3, 10}, {5, 2}, {7, 0}};\n        int n = points.length;\n        \n        // Min heap: [cost, pointIndex]\n        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);\n        boolean[] visited = new boolean[n];\n        int totalCost = 0;\n        int edges = 0;\n        \n        pq.offer(new int[]{0, 0});  // Start from point 0\n        \n        while (edges < n && !pq.isEmpty()) {\n            int[] curr = pq.poll();\n            int cost = curr[0];\n            int point = curr[1];\n            \n            if (visited[point]) continue;\n            \n            visited[point] = true;\n            totalCost += cost;\n            edges++;\n            \n            // Add edges to unvisited points\n            for (int i = 0; i < n; i++) {\n                if (!visited[i]) {\n                    int dist = Math.abs(points[point][0] - points[i][0]) + \n                               Math.abs(points[point][1] - points[i][1]);\n                    pq.offer(new int[]{dist, i});\n                }\n            }\n        }\n        \n        System.out.println(\"Min Cost (Prim's): \" + totalCost);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "advanced-graphs"
    },
    {
        "id": "nc150-advanced-graphs-092_min_cost_connect-2",
        "name": "Min Cost Connect: Kruskal's with Union",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 92: Min Cost to Connect All Points (Prim's/Kruskal's)\n// ================================================\n// Given n points, return min cost to connect all points.\n// Cost = Manhattan distance = |xi - xj| + |yi - yj|\n\n\n\npublic class Main {\n    // Helper Methods\n    static int minCostKruskal(int[][] points) {\n    int n = points.length;\n    List<int[]> edges = new ArrayList<>();  // [cost, i, j]\n    \n    for (int i = 0; i < n; i++) {\n        for (int j = i + 1; j < n; j++) {\n            int cost = Math.abs(points[i][0] - points[j][0]) + \n                       Math.abs(points[i][1] - points[j][1]);\n            edges.add(new int[]{cost, i, j});\n        }\n    }\n    \n    Collections.sort(edges, (a, b) -> a[0] - b[0]);\n    \n    int[] parent = new int[n];\n    for (int i = 0; i < n; i++) parent[i] = i;\n    \n    int totalCost = 0, edgeCount = 0;\n    for (int[] edge : edges) {\n        if (edgeCount == n - 1) break;\n        \n        int root1 = find(parent, edge[1]);\n        int root2 = find(parent, edge[2]);\n        \n        if (root1 != root2) {\n            parent[root1] = root2;\n            totalCost += edge[0];\n            edgeCount++;\n        }\n    }\n    \n    return totalCost;\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"\\nKruskal's Algorithm:\");\n        System.out.println(\"1. Generate all edges with costs\");\n        System.out.println(\"2. Sort edges by cost\");\n        System.out.println(\"3. Add edge if it doesn't form cycle (Union-Find)\");\n        System.out.println(\"4. Stop when n-1 edges added\");\n        \n        /*\n        */\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "advanced-graphs"
    },
    {
        "id": "nc150-advanced-graphs-093_network_delay-1",
        "name": "Network Delay: Dijkstra's Algorithm",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 93: Network Delay Time (Dijkstra's)\n// ================================================\n// n nodes, times[i] = [u, v, w] means signal from u to v takes w time.\n// Return time for all nodes to receive signal from source k. Return -1 if impossible.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[][] times = {{2, 1, 1}, {2, 3, 1}, {3, 4, 1}};\n        int n = 4, k = 2;\n        \n        // Build adjacency list\n        List<List<int[]>> graph = new ArrayList<>();\n        for (int i = 0; i <= n; i++) graph.add(new ArrayList<>());\n        for (int[] time : times) {\n            graph.get(time[0]).add(new int[]{time[1], time[2]});\n        }\n        \n        // Min heap: [time, node]\n        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);\n        int[] dist = new int[n + 1];\n        Arrays.fill(dist, Integer.MAX_VALUE);\n        \n        pq.offer(new int[]{0, k});\n        dist[k] = 0;\n        \n        while (!pq.isEmpty()) {\n            int[] curr = pq.poll();\n            int currTime = curr[0];\n            int node = curr[1];\n            \n            if (currTime > dist[node]) continue;\n            \n            for (int[] neighbor : graph.get(node)) {\n                int nextNode = neighbor[0];\n                int weight = neighbor[1];\n                int newDist = currTime + weight;\n                \n                if (newDist < dist[nextNode]) {\n                    dist[nextNode] = newDist;\n                    pq.offer(new int[]{newDist, nextNode});\n                }\n            }\n        }\n        \n        int maxTime = 0;\n        for (int i = 1; i <= n; i++) {\n            if (dist[i] == Integer.MAX_VALUE) {\n                maxTime = -1;\n                break;\n            }\n            maxTime = Math.max(maxTime, dist[i]);\n        }\n        \n        System.out.println(\"Network Delay Time: \" + maxTime);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "advanced-graphs"
    },
    {
        "id": "nc150-advanced-graphs-093_network_delay-2",
        "name": "Network Delay: Bellman",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 93: Network Delay Time (Dijkstra's)\n// ================================================\n// n nodes, times[i] = [u, v, w] means signal from u to v takes w time.\n// Return time for all nodes to receive signal from source k. Return -1 if impossible.\n\n\n\npublic class Main {\n    // Helper Methods\n    static int networkDelayBellmanFord(int[][] times, int n, int k) {\n    int[] dist = new int[n + 1];\n    Arrays.fill(dist, Integer.MAX_VALUE);\n    dist[k] = 0;\n    \n    for (int i = 0; i < n - 1; i++) {\n        for (int[] time : times) {\n            int u = time[0], v = time[1], w = time[2];\n            if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {\n                dist[v] = dist[u] + w;\n            }\n        }\n    }\n    \n    int maxTime = 0;\n    for (int i = 1; i <= n; i++) {\n        if (dist[i] == Integer.MAX_VALUE) return -1;\n        maxTime = Math.max(maxTime, dist[i]);\n    }\n    return maxTime;\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"\\nBellman-Ford (handles negative weights):\");\n        System.out.println(\"Relax all edges V-1 times\");\n        \n        /*\n        */\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "advanced-graphs"
    },
    {
        "id": "nc150-advanced-graphs-094_swim_rising_water-1",
        "name": "Swim Rising Water: Dijkstra's / Min Heap",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 94: Swim in Rising Water\n// ================================================\n// Given n x n grid where grid[i][j] = elevation at time t, water rises.\n// Find minimum time to swim from (0,0) to (n-1,n-1).\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[][] grid = {\n            {0, 2},\n            {1, 3}\n        };\n        \n        int n = grid.length;\n        // Min heap: [maxElevation, row, col]\n        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);\n        boolean[][] visited = new boolean[n][n];\n        int[][] dirs = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};\n        \n        pq.offer(new int[]{grid[0][0], 0, 0});\n        visited[0][0] = true;\n        \n        int result = 0;\n        while (!pq.isEmpty()) {\n            int[] curr = pq.poll();\n            int maxElev = curr[0], r = curr[1], c = curr[2];\n            result = Math.max(result, maxElev);\n            \n            if (r == n - 1 && c == n - 1) {\n                break;\n            }\n            \n            for (int[] dir : dirs) {\n                int nr = r + dir[0], nc = c + dir[1];\n                if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc]) {\n                    visited[nr][nc] = true;\n                    pq.offer(new int[]{grid[nr][nc], nr, nc});\n                }\n            }\n        }\n        \n        System.out.println(\"Swim in Rising Water: \" + result);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "advanced-graphs"
    },
    {
        "id": "nc150-advanced-graphs-094_swim_rising_water-2",
        "name": "Swim Rising Water: Binary Search + BFS/DFS",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 94: Swim in Rising Water\n// ================================================\n// Given n x n grid where grid[i][j] = elevation at time t, water rises.\n// Find minimum time to swim from (0,0) to (n-1,n-1).\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nBinary Search approach:\");\n        System.out.println(\"Binary search on time t\");\n        System.out.println(\"For each t, check if path exists using only cells <= t\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "advanced-graphs"
    },
    {
        "id": "nc150-advanced-graphs-095_alien_dictionary-1",
        "name": "Alien Dictionary",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 95: Alien Dictionary\n// ================================================\n// Given sorted list of words from alien language, derive letter ordering.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String[] words = {\"wrt\", \"wrf\", \"er\", \"ett\", \"rftt\"};\n        \n        // Build graph from adjacent word pairs\n        Map<Character, Set<Character>> graph = new HashMap<>();\n        Map<Character, Integer> indegree = new HashMap<>();\n        \n        // Initialize all characters\n        for (String word : words) {\n            for (char c : word.toCharArray()) {\n                graph.putIfAbsent(c, new HashSet<>());\n                indegree.putIfAbsent(c, 0);\n            }\n        }\n        \n        // Compare adjacent words to find ordering\n        boolean invalid = false;\n        for (int i = 0; i < words.length - 1 && !invalid; i++) {\n            String w1 = words[i], w2 = words[i + 1];\n            \n            // Check for invalid case: prefix is longer\n            if (w1.length() > w2.length() && w1.startsWith(w2)) {\n                invalid = true;\n                break;\n            }\n            \n            // Find first different character\n            for (int j = 0; j < Math.min(w1.length(), w2.length()); j++) {\n                char c1 = w1.charAt(j), c2 = w2.charAt(j);\n                if (c1 != c2) {\n                    if (!graph.get(c1).contains(c2)) {\n                        graph.get(c1).add(c2);\n                        indegree.put(c2, indegree.get(c2) + 1);\n                    }\n                    break;\n                }\n            }\n        }\n        \n        // Topological sort\n        StringBuilder order = new StringBuilder();\n        Queue<Character> queue = new LinkedList<>();\n        \n        for (char c : indegree.keySet()) {\n            if (indegree.get(c) == 0) queue.offer(c);\n        }\n        \n        while (!queue.isEmpty()) {\n            char c = queue.poll();\n            order.append(c);\n            \n            for (char next : graph.get(c)) {\n                indegree.put(next, indegree.get(next) - 1);\n                if (indegree.get(next) == 0) queue.offer(next);\n            }\n        }\n        \n        String result = order.length() == indegree.size() ? order.toString() : \"\";\n        System.out.println(\"Alien Dictionary: \" + result);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "advanced-graphs"
    },
    {
        "id": "nc150-advanced-graphs-096_cheapest_flights-1",
        "name": "Cheapest Flights: Bellman",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 96: Cheapest Flights Within K Stops\n// ================================================\n// Find cheapest price from src to dst with at most k stops.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int n = 4;\n        int[][] flights = {{0, 1, 100}, {1, 2, 100}, {2, 0, 100}, {1, 3, 600}, {2, 3, 200}};\n        int src = 0, dst = 3, k = 1;\n        \n        int[] prices = new int[n];\n        Arrays.fill(prices, Integer.MAX_VALUE);\n        prices[src] = 0;\n        \n        // Relax edges k+1 times (k stops = k+1 flights)\n        for (int i = 0; i <= k; i++) {\n            int[] temp = Arrays.copyOf(prices, n);\n            \n            for (int[] flight : flights) {\n                int from = flight[0], to = flight[1], price = flight[2];\n                if (prices[from] != Integer.MAX_VALUE) {\n                    temp[to] = Math.min(temp[to], prices[from] + price);\n                }\n            }\n            \n            prices = temp;\n        }\n        \n        int result = prices[dst] == Integer.MAX_VALUE ? -1 : prices[dst];\n        System.out.println(\"Cheapest Flight: \" + result);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "advanced-graphs"
    },
    {
        "id": "nc150-advanced-graphs-096_cheapest_flights-2",
        "name": "Cheapest Flights: BFS with Level Limit",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 96: Cheapest Flights Within K Stops\n// ================================================\n// Find cheapest price from src to dst with at most k stops.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nBFS approach:\");\n        System.out.println(\"Use queue with (node, cost, stops)\");\n        System.out.println(\"Stop when stops > k\");\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "advanced-graphs"
    },
    {
        "id": "nc150-advanced-graphs-096_cheapest_flights-3",
        "name": "Cheapest Flights: Dijkstra's Modified",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 96: Cheapest Flights Within K Stops\n// ================================================\n// Find cheapest price from src to dst with at most k stops.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nDijkstra's with stops tracking\");\n        System.out.println(\"Priority queue: (cost, node, stops)\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "advanced-graphs"
    },
    {
        "id": "nc150-advanced-graphs-097_reconstruct_itinerary-1",
        "name": "Reconstruct Itinerary",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 97: Reconstruct Itinerary\n// ================================================\n// Given airline tickets, reconstruct itinerary starting from \"JFK\".\n// Must use all tickets exactly once. Smallest lexical order if multiple.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        List<List<String>> tickets = Arrays.asList(\n            Arrays.asList(\"MUC\", \"LHR\"),\n            Arrays.asList(\"JFK\", \"MUC\"),\n            Arrays.asList(\"SFO\", \"SJC\"),\n            Arrays.asList(\"LHR\", \"SFO\")\n        );\n        \n        // Build adjacency list with sorted destinations\n        Map<String, PriorityQueue<String>> graph = new HashMap<>();\n        for (List<String> ticket : tickets) {\n            graph.computeIfAbsent(ticket.get(0), k -> new PriorityQueue<>()).offer(ticket.get(1));\n        }\n        \n        LinkedList<String> itinerary = new LinkedList<>();\n        dfsItinerary(\"JFK\", graph, itinerary);\n        \n        System.out.println(\"Itinerary: \" + itinerary);\n        \n        static void dfsItinerary(String airport, Map<String, PriorityQueue<String>> graph, \n                                  LinkedList<String> result) {\n            PriorityQueue<String> destinations = graph.get(airport);\n            \n            while (destinations != null && !destinations.isEmpty()) {\n                dfsItinerary(destinations.poll(), graph, result);\n            }\n            \n            result.addFirst(airport);  // Add in reverse order\n        }\n        \n        // ============================================\n        // Key Insight\n        // ============================================\n        System.out.println(\"\\nHierholzer's Algorithm:\");\n        System.out.println(\"1. Use DFS with post-order traversal\");\n        System.out.println(\"2. Add airport to result AFTER visiting all destinations\");\n        System.out.println(\"3. Reverse gives correct order\");\n        System.out.println(\"4. PriorityQueue ensures lexical order\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "advanced-graphs"
    },
    {
        "id": "nc150-1d-dp-098_climbing_stairs-1",
        "name": "Climbing Stairs: Recursion with Memoization",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 98: Climbing Stairs\n// ================================================\n// You are climbing a staircase. It takes n steps to reach the top.\n// Each time you can climb 1 or 2 steps. How many distinct ways to climb?\n\n\n\npublic class Main {\n    // Helper Methods\n    static int climbMemo(int n, int[] memo) {\n    if (n <= 2) return n;\n    if (memo[n] != -1) return memo[n];\n    \n    memo[n] = climbMemo(n - 1, memo) + climbMemo(n - 2, memo);\n    return memo[n];\n}\n\n    public static void main(String[] args) {\n        int n = 5;\n        int[] memo = new int[n + 1];\n        Arrays.fill(memo, -1);\n        \n        int ways1 = climbMemo(n, memo);\n        System.out.println(\"Climbing Stairs (Memoization): \" + ways1);\n        \n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-098_climbing_stairs-2",
        "name": "Climbing Stairs: DP Bottom",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 98: Climbing Stairs\n// ================================================\n// You are climbing a staircase. It takes n steps to reach the top.\n// Each time you can climb 1 or 2 steps. How many distinct ways to climb?\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int n2 = 5;\n        int[] dp = new int[n2 + 1];\n        dp[1] = 1;\n        dp[2] = 2;\n        \n        for (int i = 3; i <= n2; i++) {\n            dp[i] = dp[i - 1] + dp[i - 2];\n        }\n        \n        System.out.println(\"Climbing Stairs (DP): \" + dp[n2]);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-098_climbing_stairs-3",
        "name": "Climbing Stairs: Fibonacci (Space Optimized)",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 98: Climbing Stairs\n// ================================================\n// You are climbing a staircase. It takes n steps to reach the top.\n// Each time you can climb 1 or 2 steps. How many distinct ways to climb?\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int n3 = 5;\n        int prev2 = 1; // ways to reach step 1\n        int prev1 = 2; // ways to reach step 2\n        \n        if (n3 == 1) {\n            System.out.println(\"Climbing Stairs (Fib): 1\");\n        } else if (n3 == 2) {\n            System.out.println(\"Climbing Stairs (Fib): 2\");\n        } else {\n            int current = 0;\n            for (int i = 3; i <= n3; i++) {\n                current = prev1 + prev2;\n                prev2 = prev1;\n                prev1 = current;\n            }\n            System.out.println(\"Climbing Stairs (Fib): \" + current);\n        }\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-098_climbing_stairs-4",
        "name": "Climbing Stairs: Matrix Exponentiation",
        "updatedAt": 1700000000003,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 98: Climbing Stairs\n// ================================================\n// You are climbing a staircase. It takes n steps to reach the top.\n// Each time you can climb 1 or 2 steps. How many distinct ways to climb?\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nMatrix Exponentiation (Advanced):\");\n        System.out.println(\"Use [F(n+1), F(n)] = [[1,1],[1,0]]^n * [F(1), F(0)]\");\n        System.out.println(\"Time: O(log n) using fast matrix power\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-099_min_cost_stairs-1",
        "name": "Min Cost Stairs: DP",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 99: Min Cost Climbing Stairs\n// ================================================\n// Each step has a cost. Pay cost to climb 1 or 2 steps. Can start from 0 or 1.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] cost = {10, 15, 20};\n        \n        int n = cost.length;\n        int prev2 = cost[0];\n        int prev1 = cost[1];\n        \n        for (int i = 2; i < n; i++) {\n            int curr = cost[i] + Math.min(prev1, prev2);\n            prev2 = prev1;\n            prev1 = curr;\n        }\n        \n        int result = Math.min(prev1, prev2);\n        System.out.println(\"Min Cost Climbing Stairs: \" + result);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-099_min_cost_stairs-2",
        "name": "Min Cost Stairs: DP Array",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 99: Min Cost Climbing Stairs\n// ================================================\n// Each step has a cost. Pay cost to climb 1 or 2 steps. Can start from 0 or 1.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] cost2 = {10, 15, 20};\n        int[] dp = new int[cost2.length + 1];\n        \n        for (int i = 2; i <= cost2.length; i++) {\n            int oneStep = dp[i - 1] + cost2[i - 1];\n            int twoStep = dp[i - 2] + cost2[i - 2];\n            dp[i] = Math.min(oneStep, twoStep);\n        }\n        \n        System.out.println(\"Min Cost (Array): \" + dp[cost2.length]);\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nFor cost=[10, 15, 20]:\");\n        System.out.println(\"Start at step 1 (cost 15), jump to top\");\n        System.out.println(\"Total: 15\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-100_house_robber-1",
        "name": "House Robber: DP",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 100: House Robber\n// ================================================\n// Rob houses along a street without robbing two adjacent houses.\n// Return maximum amount you can rob.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3, 1};\n        \n        int n = nums.length;\n        if (n == 1) {\n            System.out.println(\"Max Rob: \" + nums[0]);\n        } else {\n            int[] dp = new int[n];\n            dp[0] = nums[0];\n            dp[1] = Math.max(nums[0], nums[1]);\n            \n            for (int i = 2; i < n; i++) {\n                // Either rob current (dp[i-2] + nums[i]) or skip (dp[i-1])\n                dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);\n            }\n            \n            System.out.println(\"Max Rob (DP): \" + dp[n - 1]);\n        }\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-100_house_robber-2",
        "name": "House Robber: Space Optimized",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 100: House Robber\n// ================================================\n// Rob houses along a street without robbing two adjacent houses.\n// Return maximum amount you can rob.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums2 = {1, 2, 3, 1};\n        int n2 = nums2.length;\n        \n        int prev2 = 0;  // dp[i-2]\n        int prev1 = 0;  // dp[i-1]\n        \n        for (int num : nums2) {\n            int current = Math.max(prev1, prev2 + num);\n            prev2 = prev1;\n            prev1 = current;\n        }\n        \n        System.out.println(\"Max Rob (Optimized): \" + prev1);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-100_house_robber-3",
        "name": "House Robber: Recursion with Memoization",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 100: House Robber\n// ================================================\n// Rob houses along a street without robbing two adjacent houses.\n// Return maximum amount you can rob.\n\n\n\npublic class Main {\n    // Helper Methods\n    static int robMemo(int[] nums, int i, int[] memo) {\n    if (i < 0) return 0;\n    if (memo[i] != -1) return memo[i];\n    \n    memo[i] = Math.max(robMemo(nums, i - 1, memo), robMemo(nums, i - 2, memo) + nums[i]);\n    return memo[i];\n}\n\n    public static void main(String[] args) {\n        int[] nums3 = {1, 2, 3, 1};\n        int[] memo = new int[nums3.length];\n        Arrays.fill(memo, -1);\n        \n        int result = robMemo(nums3, nums3.length - 1, memo);\n        System.out.println(\"Max Rob (Memo): \" + result);\n        \n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nDecision at each house:\");\n        System.out.println(\"House: [1, 2, 3, 1]\");\n        System.out.println(\"i=0: take 1, dp[0]=1\");\n        System.out.println(\"i=1: max(1, 2)=2, dp[1]=2\");\n        System.out.println(\"i=2: max(2, 1+3)=4, dp[2]=4\");\n        System.out.println(\"i=3: max(4, 2+1)=4, dp[3]=4\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-101_house_robber_ii-1",
        "name": "House Robber Ii",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 101: House Robber II\n// ================================================\n// Houses are arranged in a circle. First and last houses are adjacent.\n// Cannot rob two adjacent houses. Return maximum amount.\n\n\n\npublic class Main {\n    // Helper Methods\n    static int robRange(int[] nums, int start, int end) {\n    int prev2 = 0, prev1 = 0;\n    \n    for (int i = start; i <= end; i++) {\n        int current = Math.max(prev1, prev2 + nums[i]);\n        prev2 = prev1;\n        prev1 = current;\n    }\n    \n    return prev1;\n}\n\n    public static void main(String[] args) {\n        // Key insight: Cannot rob both first and last house\n        // So solve two cases: exclude first OR exclude last\n        \n        int[] nums = {2, 3, 2};\n        int n = nums.length;\n        \n        if (n == 1) {\n            System.out.println(\"Max Rob: \" + nums[0]);\n        } else {\n            // Case 1: Rob houses [0, n-2] (exclude last)\n            int rob1 = robRange(nums, 0, n - 2);\n            \n            // Case 2: Rob houses [1, n-1] (exclude first)\n            int rob2 = robRange(nums, 1, n - 1);\n            \n            int maxRob = Math.max(rob1, rob2);\n            System.out.println(\"House Robber II: \" + maxRob);\n        }\n        \n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nHouses in circle: [2, 3, 2]\");\n        System.out.println(\"Case 1: [2, 3] (exclude last) -> max = 3\");\n        System.out.println(\"Case 2: [3, 2] (exclude first) -> max = 3\");\n        System.out.println(\"Result: max(3, 3) = 3\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-102_longest_palindrome-1",
        "name": "Longest Palindrome: Expand Around Center",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 102: Longest Palindromic Substring\n// ================================================\n// Given a string s, return the longest palindromic substring.\n\n\n\npublic class Main {\n    // Helper Methods\n    static int expandAroundCenter(String s, int left, int right) {\n    while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {\n        left--;\n        right++;\n    }\n    return right - left - 1;\n}\n\n    public static void main(String[] args) {\n        String s = \"babad\";\n        \n        int start = 0, maxLen = 1;\n        \n        for (int i = 0; i < s.length(); i++) {\n            // Odd length palindrome (center = i)\n            int len1 = expandAroundCenter(s, i, i);\n            \n            // Even length palindrome (center = i, i+1)\n            int len2 = expandAroundCenter(s, i, i + 1);\n            \n            int len = Math.max(len1, len2);\n            if (len > maxLen) {\n                maxLen = len;\n                start = i - (len - 1) / 2;\n            }\n        }\n        \n        String result = s.substring(start, start + maxLen);\n        System.out.println(\"Longest Palindrome: \" + result);\n        \n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-102_longest_palindrome-2",
        "name": "Longest Palindrome: DP",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 102: Longest Palindromic Substring\n// ================================================\n// Given a string s, return the longest palindromic substring.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String s2 = \"babad\";\n        int n = s2.length();\n        boolean[][] dp = new boolean[n][n];\n        \n        String result2 = String.valueOf(s2.charAt(0));\n        \n        // All single characters are palindromes\n        for (int i = 0; i < n; i++) dp[i][i] = true;\n        \n        // Fill DP table\n        for (int len = 2; len <= n; len++) {\n            for (int i = 0; i <= n - len; i++) {\n                int j = i + len - 1;\n                \n                if (s2.charAt(i) == s2.charAt(j)) {\n                    if (len == 2 || dp[i + 1][j - 1]) {\n                        dp[i][j] = true;\n                        if (len > result2.length()) {\n                            result2 = s2.substring(i, j + 1);\n                        }\n                    }\n                }\n            }\n        }\n        \n        System.out.println(\"Longest Palindrome (DP): \" + result2);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-102_longest_palindrome-3",
        "name": "Longest Palindrome: Manacher's Algorithm",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 102: Longest Palindromic Substring\n// ================================================\n// Given a string s, return the longest palindromic substring.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nManacher's Algorithm: O(n) time complexity\");\n        System.out.println(\"Uses previously computed palindrome lengths\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-103_palindromic_substrings-1",
        "name": "Palindromic Substrings: Expand Around Center",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 103: Palindromic Substrings\n// ================================================\n// Given a string s, return the number of palindromic substrings in it.\n\n\n\npublic class Main {\n    // Helper Methods\n    static int countPalindromes(String s, int left, int right) {\n    int count = 0;\n    while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {\n        count++;\n        left--;\n        right++;\n    }\n    return count;\n}\n\n    public static void main(String[] args) {\n        String s = \"aaa\";\n        int count = 0;\n        \n        for (int i = 0; i < s.length(); i++) {\n            // Odd length palindromes\n            count += countPalindromes(s, i, i);\n            \n            // Even length palindromes\n            count += countPalindromes(s, i, i + 1);\n        }\n        \n        System.out.println(\"Palindromic Substrings: \" + count);\n        \n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-103_palindromic_substrings-2",
        "name": "Palindromic Substrings: DP",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 103: Palindromic Substrings\n// ================================================\n// Given a string s, return the number of palindromic substrings in it.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String s2 = \"aaa\";\n        int n = s2.length();\n        boolean[][] dp = new boolean[n][n];\n        int count2 = 0;\n        \n        for (int i = n - 1; i >= 0; i--) {\n            for (int j = i; j < n; j++) {\n                if (s2.charAt(i) == s2.charAt(j)) {\n                    if (j - i <= 2 || dp[i + 1][j - 1]) {\n                        dp[i][j] = true;\n                        count2++;\n                    }\n                }\n            }\n        }\n        \n        System.out.println(\"Palindromic Substrings (DP): \" + count2);\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nFor 'aaa':\");\n        System.out.println(\"Single chars: 'a', 'a', 'a' = 3\");\n        System.out.println(\"Length 2: 'aa', 'aa' = 2\");\n        System.out.println(\"Length 3: 'aaa' = 1\");\n        System.out.println(\"Total: 6 palindromic substrings\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-104_decode_ways-1",
        "name": "Decode Ways: DP",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 104: Decode Ways\n// ================================================\n// Given encoded message containing digits, count number of ways to decode it.\n// 'A' = 1, 'B' = 2, ..., 'Z' = 26\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String s = \"226\";\n        int n = s.length();\n        \n        if (s.isEmpty() || s.charAt(0) == '0') {\n            System.out.println(\"Decode Ways: 0\");\n        } else {\n            int[] dp = new int[n + 1];\n            dp[0] = 1;  // Empty string\n            dp[1] = 1;  // First character\n            \n            for (int i = 2; i <= n; i++) {\n                int oneDigit = Integer.parseInt(s.substring(i - 1, i));\n                int twoDigit = Integer.parseInt(s.substring(i - 2, i));\n                \n                if (oneDigit >= 1 && oneDigit <= 9) {\n                    dp[i] += dp[i - 1];\n                }\n                \n                if (twoDigit >= 10 && twoDigit <= 26) {\n                    dp[i] += dp[i - 2];\n                }\n            }\n            \n            System.out.println(\"Decode Ways: \" + dp[n]);\n        }\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-104_decode_ways-2",
        "name": "Decode Ways: Space Optimized",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 104: Decode Ways\n// ================================================\n// Given encoded message containing digits, count number of ways to decode it.\n// 'A' = 1, 'B' = 2, ..., 'Z' = 26\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String s2 = \"226\";\n        int n2 = s2.length();\n        \n        if (s2.isEmpty() || s2.charAt(0) == '0') {\n            System.out.println(\"Decode Ways (opt): 0\");\n        } else {\n            int prev2 = 1;  // dp[i-2]\n            int prev1 = 1;  // dp[i-1]\n            \n            for (int i = 2; i <= n2; i++) {\n                int curr = 0;\n                int oneDigit = s2.charAt(i - 1) - '0';\n                int twoDigit = Integer.parseInt(s2.substring(i - 2, i));\n                \n                if (oneDigit >= 1) curr += prev1;\n                if (twoDigit >= 10 && twoDigit <= 26) curr += prev2;\n                \n                prev2 = prev1;\n                prev1 = curr;\n            }\n            \n            System.out.println(\"Decode Ways (opt): \" + prev1);\n        }\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nFor '226':\");\n        System.out.println(\"'2' '2' '6' -> 'BBF'\");\n        System.out.println(\"'22' '6' -> 'VF'\");\n        System.out.println(\"'2' '26' -> 'BZ'\");\n        System.out.println(\"Total: 3 ways\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-105_coin_change-1",
        "name": "Coin Change: DP Bottom",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 105: Coin Change\n// ================================================\n// Given coins array and amount, return fewest coins to make up that amount.\n// If not possible, return -1.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] coins = {1, 2, 5};\n        int amount = 11;\n        \n        int[] dp = new int[amount + 1];\n        Arrays.fill(dp, amount + 1); // Initialize with impossible value\n        dp[0] = 0;\n        \n        for (int i = 1; i <= amount; i++) {\n            for (int coin : coins) {\n                if (coin <= i) {\n                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n                }\n            }\n        }\n        \n        int result1 = dp[amount] > amount ? -1 : dp[amount];\n        System.out.println(\"Coin Change (DP): \" + result1);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-105_coin_change-2",
        "name": "Coin Change: BFS",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 105: Coin Change\n// ================================================\n// Given coins array and amount, return fewest coins to make up that amount.\n// If not possible, return -1.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] coins2 = {1, 2, 5};\n        int amount2 = 11;\n        \n        Queue<Integer> queue = new LinkedList<>();\n        Set<Integer> visited = new HashSet<>();\n        queue.offer(amount2);\n        visited.add(amount2);\n        int level = 0;\n        int result2 = -1;\n        \n        while (!queue.isEmpty()) {\n            int size = queue.size();\n            \n            for (int i = 0; i < size; i++) {\n                int curr = queue.poll();\n                \n                if (curr == 0) {\n                    result2 = level;\n                    break;\n                }\n                \n                for (int coin : coins2) {\n                    int next = curr - coin;\n                    if (next >= 0 && !visited.contains(next)) {\n                        visited.add(next);\n                        queue.offer(next);\n                    }\n                }\n            }\n            \n            if (result2 != -1) break;\n            level++;\n        }\n        \n        System.out.println(\"Coin Change (BFS): \" + result2);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-105_coin_change-3",
        "name": "Coin Change: Recursion with Memoization",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 105: Coin Change\n// ================================================\n// Given coins array and amount, return fewest coins to make up that amount.\n// If not possible, return -1.\n\n\n\npublic class Main {\n    // Helper Methods\n    static int coinChangeMemo(int[] coins, int amount, int[] memo) {\n    if (amount == 0) return 0;\n    if (amount < 0) return -1;\n    if (memo[amount] != -2) return memo[amount];\n    \n    int minCoins = Integer.MAX_VALUE;\n    for (int coin : coins) {\n        int subResult = coinChangeMemo(coins, amount - coin, memo);\n        if (subResult >= 0) {\n            minCoins = Math.min(minCoins, subResult + 1);\n        }\n    }\n    \n    memo[amount] = (minCoins == Integer.MAX_VALUE) ? -1 : minCoins;\n    return memo[amount];\n}\n\n    public static void main(String[] args) {\n        int[] coins3 = {1, 2, 5};\n        int amount3 = 11;\n        int[] memo = new int[amount3 + 1];\n        Arrays.fill(memo, -2);\n        \n        int result3 = coinChangeMemo(coins3, amount3, memo);\n        System.out.println(\"Coin Change (Memo): \" + result3);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-106_max_product_subarray-1",
        "name": "Max Product Subarray: Track Max and Min",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 106: Maximum Product Subarray\n// ================================================\n// Given an integer array nums, find contiguous subarray with largest product.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Key: Negative num can flip min to max, so track both\n        \n        int[] nums = {2, 3, -2, 4};\n        \n        int maxProduct = nums[0];\n        int currMax = nums[0];\n        int currMin = nums[0];\n        \n        for (int i = 1; i < nums.length; i++) {\n            int num = nums[i];\n            \n            // Swap if current number is negative\n            if (num < 0) {\n                int temp = currMax;\n                currMax = currMin;\n                currMin = temp;\n            }\n            \n            currMax = Math.max(num, currMax * num);\n            currMin = Math.min(num, currMin * num);\n            \n            maxProduct = Math.max(maxProduct, currMax);\n        }\n        \n        System.out.println(\"Maximum Product Subarray: \" + maxProduct);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-106_max_product_subarray-2",
        "name": "Max Product Subarray: Two Passes",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 106: Maximum Product Subarray\n// ================================================\n// Given an integer array nums, find contiguous subarray with largest product.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Handle zeros by going left-to-right and right-to-left\n        int[] nums2 = {2, 3, -2, 4};\n        int n = nums2.length;\n        int maxProd = Integer.MIN_VALUE;\n        int product = 1;\n        \n        // Left to right\n        for (int num : nums2) {\n            product *= num;\n            maxProd = Math.max(maxProd, product);\n            if (product == 0) product = 1;\n        }\n        \n        product = 1;\n        // Right to left\n        for (int i = n - 1; i >= 0; i--) {\n            product *= nums2[i];\n            maxProd = Math.max(maxProd, product);\n            if (product == 0) product = 1;\n        }\n        \n        System.out.println(\"Max Product (Two Pass): \" + maxProd);\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nFor [2, 3, -2, 4]:\");\n        System.out.println(\"i=0: max=2, min=2, result=2\");\n        System.out.println(\"i=1: max=6, min=3, result=6\");\n        System.out.println(\"i=2: max=-2, min=-12, result=6\");\n        System.out.println(\"i=3: max=4, min=-48, result=6\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-107_word_break-1",
        "name": "Word Break: DP",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 107: Word Break\n// ================================================\n// Given string s and dictionary wordDict, return true if s can be segmented\n// into space-separated sequence of dictionary words.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String s = \"leetcode\";\n        List<String> wordDict = Arrays.asList(\"leet\", \"code\");\n        Set<String> dict = new HashSet<>(wordDict);\n        \n        int n = s.length();\n        boolean[] dp = new boolean[n + 1];\n        dp[0] = true;  // Empty string\n        \n        for (int i = 1; i <= n; i++) {\n            for (int j = 0; j < i; j++) {\n                if (dp[j] && dict.contains(s.substring(j, i))) {\n                    dp[i] = true;\n                    break;\n                }\n            }\n        }\n        \n        System.out.println(\"Word Break: \" + dp[n]);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-107_word_break-2",
        "name": "Word Break: BFS",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 107: Word Break\n// ================================================\n// Given string s and dictionary wordDict, return true if s can be segmented\n// into space-separated sequence of dictionary words.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String s2 = \"leetcode\";\n        Set<String> dict2 = new HashSet<>(Arrays.asList(\"leet\", \"code\"));\n        \n        Queue<Integer> queue = new LinkedList<>();\n        boolean[] visited = new boolean[s2.length() + 1];\n        queue.offer(0);\n        visited[0] = true;\n        boolean found = false;\n        \n        while (!queue.isEmpty() && !found) {\n            int start = queue.poll();\n            \n            for (int end = start + 1; end <= s2.length(); end++) {\n                if (!visited[end] && dict2.contains(s2.substring(start, end))) {\n                    if (end == s2.length()) {\n                        found = true;\n                        break;\n                    }\n                    visited[end] = true;\n                    queue.offer(end);\n                }\n            }\n        }\n        \n        System.out.println(\"Word Break (BFS): \" + found);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-107_word_break-3",
        "name": "Word Break: Memoization",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 107: Word Break\n// ================================================\n// Given string s and dictionary wordDict, return true if s can be segmented\n// into space-separated sequence of dictionary words.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nMemoization approach:\");\n        System.out.println(\"Recursive with memo to avoid recomputation\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-108_lis-1",
        "name": "Lis: DP",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 108: Longest Increasing Subsequence\n// ================================================\n// Given integer array nums, return length of longest strictly increasing subsequence.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums = {10, 9, 2, 5, 3, 7, 101, 18};\n        int n = nums.length;\n        \n        int[] dp = new int[n];\n        Arrays.fill(dp, 1);\n        \n        int maxLen = 1;\n        for (int i = 1; i < n; i++) {\n            for (int j = 0; j < i; j++) {\n                if (nums[j] < nums[i]) {\n                    dp[i] = Math.max(dp[i], dp[j] + 1);\n                }\n            }\n            maxLen = Math.max(maxLen, dp[i]);\n        }\n        \n        System.out.println(\"LIS (DP): \" + maxLen);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-108_lis-2",
        "name": "Lis: Binary Search",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 108: Longest Increasing Subsequence\n// ================================================\n// Given integer array nums, return length of longest strictly increasing subsequence.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums2 = {10, 9, 2, 5, 3, 7, 101, 18};\n        \n        // tails[i] = smallest tail element for LIS of length i+1\n        List<Integer> tails = new ArrayList<>();\n        \n        for (int num : nums2) {\n            int pos = Collections.binarySearch(tails, num);\n            if (pos < 0) pos = -(pos + 1);\n            \n            if (pos == tails.size()) {\n                tails.add(num);\n            } else {\n                tails.set(pos, num);\n            }\n        }\n        \n        System.out.println(\"LIS (Binary Search): \" + tails.size());\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nFor [10, 9, 2, 5, 3, 7, 101, 18]:\");\n        System.out.println(\"tails evolution:\");\n        System.out.println(\"10: [10]\");\n        System.out.println(\"9:  [9]\");\n        System.out.println(\"2:  [2]\");\n        System.out.println(\"5:  [2, 5]\");\n        System.out.println(\"3:  [2, 3]\");\n        System.out.println(\"7:  [2, 3, 7]\");\n        System.out.println(\"101: [2, 3, 7, 101]\");\n        System.out.println(\"18: [2, 3, 7, 18]\");\n        System.out.println(\"LIS length = 4\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-108_longest_increasing_subseq-1",
        "name": "Longest Increasing Subseq: DP",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 108: Longest Increasing Subsequence\n// ================================================\n// Given an integer array nums, return the length of the longest \n// strictly increasing subsequence.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums = {10, 9, 2, 5, 3, 7, 101, 18};\n        int n = nums.length;\n        int[] dp = new int[n];\n        Arrays.fill(dp, 1); // Each element is LIS of 1 by itself\n        \n        for (int i = 1; i < n; i++) {\n            for (int j = 0; j < i; j++) {\n                if (nums[j] < nums[i]) {\n                    dp[i] = Math.max(dp[i], dp[j] + 1);\n                }\n            }\n        }\n        \n        int lis1 = 0;\n        for (int len : dp) {\n            lis1 = Math.max(lis1, len);\n        }\n        \n        System.out.println(\"LIS (DP O(n\u00b2)): \" + lis1);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-108_longest_increasing_subseq-2",
        "name": "Longest Increasing Subseq: Binary Search",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 108: Longest Increasing Subsequence\n// ================================================\n// Given an integer array nums, return the length of the longest \n// strictly increasing subsequence.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Maintain array of smallest ending element for each length\n        int[] nums2 = {10, 9, 2, 5, 3, 7, 101, 18};\n        List<Integer> tails = new ArrayList<>();\n        \n        for (int num : nums2) {\n            // Binary search for position to insert/replace\n            int left = 0, right = tails.size();\n            \n            while (left < right) {\n                int mid = left + (right - left) / 2;\n                if (tails.get(mid) < num) {\n                    left = mid + 1;\n                } else {\n                    int right = mid;\n                }\n            }\n            \n            if (left == tails.size()) {\n                tails.add(num);\n            } else {\n                tails.set(left, num);\n            }\n        }\n        \n        int lis2 = tails.size();\n        System.out.println(\"LIS (Binary Search): \" + lis2);\n        System.out.println(\"Tails array: \" + tails);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-108_longest_increasing_subseq-3",
        "name": "Longest Increasing Subseq: Recursion with Memoization",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 108: Longest Increasing Subsequence\n// ================================================\n// Given an integer array nums, return the length of the longest \n// strictly increasing subsequence.\n\n\n\npublic class Main {\n    // Helper Methods\n    static int lisMemo(int[] nums, int idx, int prevIdx, int[][] memo) {\n    if (idx == nums.length) return 0;\n    \n    if (memo[idx][prevIdx + 1] != -1) return memo[idx][prevIdx + 1];\n    \n    // Don't include current element\n    int skip = lisMemo(nums, idx + 1, prevIdx, memo);\n    \n    // Include current element if valid\n    int take = 0;\n    if (prevIdx == -1 || nums[idx] > nums[prevIdx]) {\n        take = 1 + lisMemo(nums, idx + 1, idx, memo);\n    }\n    \n    memo[idx][prevIdx + 1] = Math.max(skip, take);\n    return memo[idx][prevIdx + 1];\n}\n\n    public static void main(String[] args) {\n        int[] nums3 = {10, 9, 2, 5, 3, 7, 101, 18};\n        int[][] memo = new int[nums3.length][nums3.length + 1];\n        for (int[] row : memo) Arrays.fill(row, -1);\n        \n        int lis3 = lisMemo(nums3, 0, -1, memo);\n        System.out.println(\"LIS (Memoization): \" + lis3);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-109_partition_subset-1",
        "name": "Partition Subset: DP",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 109: Partition Equal Subset Sum\n// ================================================\n// Can the array be partitioned into two subsets with equal sum?\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums = {1, 5, 11, 5};\n        \n        int totalSum = 0;\n        for (int num : nums) totalSum += num;\n        \n        // If sum is odd, can't partition equally\n        if (totalSum % 2 != 0) {\n            System.out.println(\"Can Partition: false\");\n        } else {\n            int target = totalSum / 2;\n            boolean[] dp = new boolean[target + 1];\n            dp[0] = true;\n            \n            for (int num : nums) {\n                // Iterate backwards to avoid using same element twice\n                for (int j = target; j >= num; j--) {\n                    dp[j] = dp[j] || dp[j - num];\n                }\n            }\n            \n            System.out.println(\"Can Partition: \" + dp[target]);\n        }\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-1d-dp-109_partition_subset-2",
        "name": "Partition Subset: 2D DP",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 109: Partition Equal Subset Sum\n// ================================================\n// Can the array be partitioned into two subsets with equal sum?\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums2 = {1, 5, 11, 5};\n        int sum2 = 0;\n        for (int num : nums2) sum2 += num;\n        \n        if (sum2 % 2 != 0) {\n            System.out.println(\"Can Partition (2D): false\");\n        } else {\n            int target2 = sum2 / 2;\n            int n = nums2.length;\n            boolean[][] dp2 = new boolean[n + 1][target2 + 1];\n            \n            // Base case: sum 0 is always achievable\n            for (int i = 0; i <= n; i++) dp2[i][0] = true;\n            \n            for (int i = 1; i <= n; i++) {\n                for (int j = 1; j <= target2; j++) {\n                    dp2[i][j] = dp2[i - 1][j];  // Don't include current\n                    if (j >= nums2[i - 1]) {\n                        dp2[i][j] = dp2[i][j] || dp2[i - 1][j - nums2[i - 1]];\n                    }\n                }\n            }\n            \n            System.out.println(\"Can Partition (2D): \" + dp2[n][target2]);\n        }\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nFor [1, 5, 11, 5]:\");\n        System.out.println(\"Total sum = 22, target = 11\");\n        System.out.println(\"Subset {1, 5, 5} = 11, Subset {11} = 11\");\n        System.out.println(\"Result: true\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "1d-dp"
    },
    {
        "id": "nc150-2d-dp-110_unique_paths-1",
        "name": "Unique Paths: DP 2D",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 110: Unique Paths\n// ================================================\n// Robot at top-left corner of m x n grid. Can only move right or down.\n// How many unique paths to reach bottom-right corner?\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int m = 3, n = 7;\n        \n        int[][] dp = new int[m][n];\n        \n        // First row and column have only 1 way\n        for (int i = 0; i < m; i++) dp[i][0] = 1;\n        for (int j = 0; j < n; j++) dp[0][j] = 1;\n        \n        // Fill remaining cells\n        for (int i = 1; i < m; i++) {\n            for (int j = 1; j < n; j++) {\n                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];\n            }\n        }\n        \n        System.out.println(\"Unique Paths (DP 2D): \" + dp[m - 1][n - 1]);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "2d-dp"
    },
    {
        "id": "nc150-2d-dp-110_unique_paths-2",
        "name": "Unique Paths: DP 1D",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 110: Unique Paths\n// ================================================\n// Robot at top-left corner of m x n grid. Can only move right or down.\n// How many unique paths to reach bottom-right corner?\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int m2 = 3, n2 = 7;\n        \n        int[] dp1d = new int[n2];\n        Arrays.fill(dp1d, 1);\n        \n        for (int i = 1; i < m2; i++) {\n            for (int j = 1; j < n2; j++) {\n                dp1d[j] += dp1d[j - 1];\n            }\n        }\n        \n        System.out.println(\"Unique Paths (DP 1D): \" + dp1d[n2 - 1]);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "2d-dp"
    },
    {
        "id": "nc150-2d-dp-110_unique_paths-3",
        "name": "Unique Paths: Math (Combinatorics)",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 110: Unique Paths\n// ================================================\n// Robot at top-left corner of m x n grid. Can only move right or down.\n// How many unique paths to reach bottom-right corner?\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Total moves = (m-1) + (n-1) = m+n-2\n        // Need to choose (m-1) down moves from (m+n-2) total\n        // C(m+n-2, m-1) = (m+n-2)! / ((m-1)! * (n-1)!)\n        \n        int m3 = 3, n3 = 7;\n        int total = m3 + n3 - 2;\n        int choose = Math.min(m3 - 1, n3 - 1);\n        \n        long result = 1;\n        for (int i = 0; i < choose; i++) {\n            result = result * (total - i) / (i + 1);\n        }\n        \n        System.out.println(\"Unique Paths (Math): \" + result);\n        \n        // ============================================\n        // Visualization: 3x3 grid\n        // ============================================\n        System.out.println(\"\\n3x3 Grid DP Table:\");\n        System.out.println(\"1  1  1\");\n        System.out.println(\"1  2  3\");\n        System.out.println(\"1  3  6  <- 6 unique paths\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "2d-dp"
    },
    {
        "id": "nc150-2d-dp-111_lcs-1",
        "name": "Lcs: DP 2D",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 111: Longest Common Subsequence\n// ================================================\n// Given two strings, return the length of their longest common subsequence.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String text1 = \"abcde\";\n        String text2 = \"ace\";\n        \n        int m = text1.length();\n        int n = text2.length();\n        \n        int[][] dp = new int[m + 1][n + 1];\n        \n        for (int i = 1; i <= m; i++) {\n            for (int j = 1; j <= n; j++) {\n                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {\n                    dp[i][j] = dp[i - 1][j - 1] + 1;\n                } else {\n                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n                }\n            }\n        }\n        \n        System.out.println(\"LCS of '\" + text1 + \"' and '\" + text2 + \"': \" + dp[m][n]);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "2d-dp"
    },
    {
        "id": "nc150-2d-dp-111_lcs-2",
        "name": "Lcs: DP 1D",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 111: Longest Common Subsequence\n// ================================================\n// Given two strings, return the length of their longest common subsequence.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String t1 = \"abcde\";\n        String t2 = \"ace\";\n        \n        int[] dp1d = new int[t2.length() + 1];\n        \n        for (int i = 1; i <= t1.length(); i++) {\n            int prev = 0;\n            for (int j = 1; j <= t2.length(); j++) {\n                int temp = dp1d[j];\n                if (t1.charAt(i - 1) == t2.charAt(j - 1)) {\n                    dp1d[j] = prev + 1;\n                } else {\n                    dp1d[j] = Math.max(dp1d[j], dp1d[j - 1]);\n                }\n                prev = temp;\n            }\n        }\n        \n        System.out.println(\"LCS (Space Optimized): \" + dp1d[t2.length()]);\n        \n        // ============================================\n        // Visualization: DP Table\n        // ============================================\n        System.out.println(\"\\nDP Table for 'abcde' and 'ace':\");\n        System.out.println(\"    ''  a  c  e\");\n        System.out.println(\"''   0  0  0  0\");\n        System.out.println(\"a    0  1  1  1\");\n        System.out.println(\"b    0  1  1  1\");\n        System.out.println(\"c    0  1  2  2\");\n        System.out.println(\"d    0  1  2  2\");\n        System.out.println(\"e    0  1  2  3 <- LCS = 3 ('ace')\");\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "2d-dp"
    },
    {
        "id": "nc150-2d-dp-111_lcs-3",
        "name": "Lcs: Recursion with Memoization",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 111: Longest Common Subsequence\n// ================================================\n// Given two strings, return the length of their longest common subsequence.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nMemoization: Top-down recursive with cache\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "2d-dp"
    },
    {
        "id": "nc150-2d-dp-112_stock_cooldown-1",
        "name": "Stock Cooldown: State Machine DP",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 112: Best Time to Buy and Sell Stock with Cooldown\n// ================================================\n// Can't buy again immediately after selling (must wait 1 day cooldown).\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // States: hold (holding stock), sold (just sold), rest (can buy)\n        int[] prices = {1, 2, 3, 0, 2};\n        \n        int hold = Integer.MIN_VALUE;  // Max profit while holding\n        int sold = 0;                   // Max profit just after selling\n        int rest = 0;                   // Max profit while resting\n        \n        for (int price : prices) {\n            int prevSold = sold;\n            \n            sold = hold + price;           // Sell: hold -> sold\n            hold = Math.max(hold, rest - price);  // Buy or keep holding\n            rest = Math.max(rest, prevSold);      // Rest or after cooldown\n        }\n        \n        int maxProfit = Math.max(sold, rest);\n        System.out.println(\"Max Profit with Cooldown: \" + maxProfit);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "2d-dp"
    },
    {
        "id": "nc150-2d-dp-112_stock_cooldown-2",
        "name": "Stock Cooldown: DP Array",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 112: Best Time to Buy and Sell Stock with Cooldown\n// ================================================\n// Can't buy again immediately after selling (must wait 1 day cooldown).\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] prices2 = {1, 2, 3, 0, 2};\n        int n = prices2.length;\n        \n        if (n == 0) {\n            System.out.println(\"Max Profit (Array): 0\");\n        } else {\n            int[] hold2 = new int[n];\n            int[] sold2 = new int[n];\n            int[] rest2 = new int[n];\n            \n            hold2[0] = -prices2[0];\n            sold2[0] = 0;\n            rest2[0] = 0;\n            \n            for (int i = 1; i < n; i++) {\n                hold2[i] = Math.max(hold2[i-1], rest2[i-1] - prices2[i]);\n                sold2[i] = hold2[i-1] + prices2[i];\n                rest2[i] = Math.max(rest2[i-1], sold2[i-1]);\n            }\n            \n            System.out.println(\"Max Profit (Array): \" + Math.max(sold2[n-1], rest2[n-1]));\n        }\n        \n        // ============================================\n        // State Diagram\n        // ============================================\n        System.out.println(\"\\nState Transitions:\");\n        System.out.println(\"REST --buy--> HOLD --sell--> SOLD --cooldown--> REST\");\n        System.out.println(\"HOLD --hold--> HOLD\");\n        System.out.println(\"REST --rest--> REST\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "2d-dp"
    },
    {
        "id": "nc150-2d-dp-113_coin_change_ii-1",
        "name": "Coin Change Ii: DP",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 113: Coin Change II\n// ================================================\n// Return the number of combinations that make up amount (unlimited coins).\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] coins = {1, 2, 5};\n        int amount = 5;\n        \n        int[] dp = new int[amount + 1];\n        dp[0] = 1;  // One way to make 0: use no coins\n        \n        // Key: Iterate coins FIRST to avoid counting permutations\n        for (int coin : coins) {\n            for (int i = coin; i <= amount; i++) {\n                dp[i] += dp[i - coin];\n            }\n        }\n        \n        System.out.println(\"Coin Change II (combinations): \" + dp[amount]);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "2d-dp"
    },
    {
        "id": "nc150-2d-dp-113_coin_change_ii-2",
        "name": "Coin Change Ii: 2D DP",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 113: Coin Change II\n// ================================================\n// Return the number of combinations that make up amount (unlimited coins).\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] coins2 = {1, 2, 5};\n        int amount2 = 5;\n        int n = coins2.length;\n        \n        int[][] dp2 = new int[n + 1][amount2 + 1];\n        \n        // Base: one way to make amount 0\n        for (int i = 0; i <= n; i++) dp2[i][0] = 1;\n        \n        for (int i = 1; i <= n; i++) {\n            for (int j = 0; j <= amount2; j++) {\n                dp2[i][j] = dp2[i - 1][j];  // Don't use coin i\n                if (j >= coins2[i - 1]) {\n                    dp2[i][j] += dp2[i][j - coins2[i - 1]];  // Use coin i\n                }\n            }\n        }\n        \n        System.out.println(\"Coin Change II (2D): \" + dp2[n][amount2]);\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nFor amount=5, coins=[1,2,5]:\");\n        System.out.println(\"Combinations:\");\n        System.out.println(\"  5 = 5\");\n        System.out.println(\"  5 = 2 + 2 + 1\");\n        System.out.println(\"  5 = 2 + 1 + 1 + 1\");\n        System.out.println(\"  5 = 1 + 1 + 1 + 1 + 1\");\n        System.out.println(\"Total: 4 ways\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "2d-dp"
    },
    {
        "id": "nc150-2d-dp-114_target_sum-1",
        "name": "Target Sum: DP (Subset Sum)",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 114: Target Sum\n// ================================================\n// Assign + or - to each number to reach target sum. Return number of ways.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Key: If P = sum of positives, N = sum of negatives\n        // P - N = target, P + N = total\n        // So: P = (target + total) / 2\n        // Problem becomes: find subsets that sum to P\n        \n        int[] nums = {1, 1, 1, 1, 1};\n        int target = 3;\n        \n        int total = 0;\n        for (int num : nums) total += num;\n        \n        // Check if solution is possible\n        if ((target + total) % 2 != 0 || Math.abs(target) > total) {\n            System.out.println(\"Target Sum: 0\");\n        } else {\n            int subsetSum = (target + total) / 2;\n            int[] dp = new int[subsetSum + 1];\n            dp[0] = 1;\n            \n            for (int num : nums) {\n                for (int j = subsetSum; j >= num; j--) {\n                    dp[j] += dp[j - num];\n                }\n            }\n            \n            System.out.println(\"Target Sum: \" + dp[subsetSum]);\n        }\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "2d-dp"
    },
    {
        "id": "nc150-2d-dp-114_target_sum-2",
        "name": "Target Sum: DFS with Memoization",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 114: Target Sum\n// ================================================\n// Assign + or - to each number to reach target sum. Return number of ways.\n\n\n\npublic class Main {\n    // Helper Methods\n    static int dfs(int[] nums, int idx, int currSum, int target) {\n    if (idx == nums.length) {\n        return currSum == target ? 1 : 0;\n    }\n    \n    String key = idx + \",\" + currSum;\n    if (memo.containsKey(key)) return memo.get(key);\n    \n    int result = dfs(nums, idx + 1, currSum + nums[idx], target) +\n                 dfs(nums, idx + 1, currSum - nums[idx], target);\n    \n    memo.put(key, result);\n    return result;\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"\\nDFS with Memoization:\");\n        System.out.println(\"State: (index, currentSum)\");\n        System.out.println(\"At each index, try + or -\");\n        \n        /*\n        Map<String, Integer> memo = new HashMap<>();\n        \n        */\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nFor nums=[1,1,1,1,1], target=3:\");\n        System.out.println(\"-1 + 1 + 1 + 1 + 1 = 3\");\n        System.out.println(\"+1 - 1 + 1 + 1 + 1 = 3\");\n        System.out.println(\"+1 + 1 - 1 + 1 + 1 = 3\");\n        System.out.println(\"+1 + 1 + 1 - 1 + 1 = 3\");\n        System.out.println(\"+1 + 1 + 1 + 1 - 1 = 3\");\n        System.out.println(\"Total: 5 ways\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "2d-dp"
    },
    {
        "id": "nc150-2d-dp-115_interleaving-1",
        "name": "Interleaving: 2D DP",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 115: Interleaving String\n// ================================================\n// Given s1, s2, s3, determine if s3 is formed by interleaving s1 and s2.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String s1 = \"aabcc\";\n        String s2 = \"dbbca\";\n        String s3 = \"aadbbcbcac\";\n        \n        int m = s1.length(), n = s2.length();\n        \n        if (s3.length() != m + n) {\n            System.out.println(\"Interleaving String: false\");\n        } else {\n            boolean[][] dp = new boolean[m + 1][n + 1];\n            dp[0][0] = true;\n            \n            // First column: use only s1\n            for (int i = 1; i <= m; i++) {\n                dp[i][0] = dp[i-1][0] && s1.charAt(i-1) == s3.charAt(i-1);\n            }\n            \n            // First row: use only s2\n            for (int j = 1; j <= n; j++) {\n                dp[0][j] = dp[0][j-1] && s2.charAt(j-1) == s3.charAt(j-1);\n            }\n            \n            // Fill rest\n            for (int i = 1; i <= m; i++) {\n                for (int j = 1; j <= n; j++) {\n                    dp[i][j] = (dp[i-1][j] && s1.charAt(i-1) == s3.charAt(i+j-1)) ||\n                               (dp[i][j-1] && s2.charAt(j-1) == s3.charAt(i+j-1));\n                }\n            }\n            \n            System.out.println(\"Interleaving String: \" + dp[m][n]);\n        }\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "2d-dp"
    },
    {
        "id": "nc150-2d-dp-115_interleaving-2",
        "name": "Interleaving: 1D DP",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 115: Interleaving String\n// ================================================\n// Given s1, s2, s3, determine if s3 is formed by interleaving s1 and s2.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\n1D Space Optimization:\");\n        System.out.println(\"Only need previous row, so use 1D array\");\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nFor s1='aabcc', s2='dbbca', s3='aadbbcbcac':\");\n        System.out.println(\"a a d b b c b c a c\");\n        System.out.println(\"1 1 2 2 2 1 2 1 2 1  (1=s1, 2=s2)\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "2d-dp"
    },
    {
        "id": "nc150-2d-dp-116_distinct_subsequences-1",
        "name": "Distinct Subsequences: 2D DP",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 116: Distinct Subsequences\n// ================================================\n// Given string s and t, count distinct subsequences of s which equals t.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String s = \"rabbbit\";\n        String t = \"rabbit\";\n        \n        int m = s.length(), n = t.length();\n        int[][] dp = new int[m + 1][n + 1];\n        \n        // Base case: empty t can be matched by empty subsequence\n        for (int i = 0; i <= m; i++) dp[i][0] = 1;\n        \n        for (int i = 1; i <= m; i++) {\n            for (int j = 1; j <= n; j++) {\n                // Don't use s[i-1]\n                dp[i][j] = dp[i - 1][j];\n                \n                // Use s[i-1] if it matches t[j-1]\n                if (s.charAt(i - 1) == t.charAt(j - 1)) {\n                    dp[i][j] += dp[i - 1][j - 1];\n                }\n            }\n        }\n        \n        System.out.println(\"Distinct Subsequences: \" + dp[m][n]);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "2d-dp"
    },
    {
        "id": "nc150-2d-dp-116_distinct_subsequences-2",
        "name": "Distinct Subsequences: 1D DP",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 116: Distinct Subsequences\n// ================================================\n// Given string s and t, count distinct subsequences of s which equals t.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String s2 = \"rabbbit\";\n        String t2 = \"rabbit\";\n        \n        int[] dp1d = new int[t2.length() + 1];\n        dp1d[0] = 1;\n        \n        for (int i = 1; i <= s2.length(); i++) {\n            // Iterate backwards to avoid using updated values\n            for (int j = t2.length(); j >= 1; j--) {\n                if (s2.charAt(i - 1) == t2.charAt(j - 1)) {\n                    dp1d[j] += dp1d[j - 1];\n                }\n            }\n        }\n        \n        System.out.println(\"Distinct Subsequences (1D): \" + dp1d[t2.length()]);\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nFor s='rabbbit', t='rabbit':\");\n        System.out.println(\"3 ways to choose 'b' out of 3 'b's\");\n        System.out.println(\"Result: 3\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "2d-dp"
    },
    {
        "id": "nc150-2d-dp-117_stock_with_fee-1",
        "name": "Stock With Fee: State Machine DP",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 117: Best Time to Buy and Sell Stock with Transaction Fee\n// ================================================\n// Can do as many transactions as you like, each transaction has a fee.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] prices = {1, 3, 2, 8, 4, 9};\n        int fee = 2;\n        \n        int hold = Integer.MIN_VALUE;  // Max profit while holding stock\n        int cash = 0;                   // Max profit without holding\n        \n        for (int price : prices) {\n            int prevCash = cash;\n            cash = Math.max(cash, hold + price - fee);  // Sell and pay fee\n            hold = Math.max(hold, prevCash - price);     // Buy\n        }\n        \n        System.out.println(\"Max Profit with Fee: \" + cash);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "2d-dp"
    },
    {
        "id": "nc150-2d-dp-117_stock_with_fee-2",
        "name": "Stock With Fee: DP Array",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 117: Best Time to Buy and Sell Stock with Transaction Fee\n// ================================================\n// Can do as many transactions as you like, each transaction has a fee.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] prices2 = {1, 3, 2, 8, 4, 9};\n        int fee2 = 2;\n        int n = prices2.length;\n        \n        int[] hold2 = new int[n];\n        int[] cash2 = new int[n];\n        \n        hold2[0] = -prices2[0];\n        cash2[0] = 0;\n        \n        for (int i = 1; i < n; i++) {\n            hold2[i] = Math.max(hold2[i-1], cash2[i-1] - prices2[i]);\n            cash2[i] = Math.max(cash2[i-1], hold2[i-1] + prices2[i] - fee2);\n        }\n        \n        System.out.println(\"Max Profit (Array): \" + cash2[n-1]);\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nFor prices=[1,3,2,8,4,9], fee=2:\");\n        System.out.println(\"Buy at 1, sell at 8: profit = 8-1-2 = 5\");\n        System.out.println(\"Buy at 4, sell at 9: profit = 9-4-2 = 3\");\n        System.out.println(\"Total: 8\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "2d-dp"
    },
    {
        "id": "nc150-2d-dp-118_edit_distance-1",
        "name": "Edit Distance: DP 2D",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 118: Edit Distance\n// ================================================\n// Given two strings word1 and word2, return the minimum number of \n// operations required to convert word1 to word2.\n// Operations: Insert, Delete, Replace\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String word1 = \"horse\";\n        String word2 = \"ros\";\n        \n        int m = word1.length();\n        int n = word2.length();\n        \n        int[][] dp = new int[m + 1][n + 1];\n        \n        // Base cases\n        for (int i = 0; i <= m; i++) dp[i][0] = i;  // Delete all\n        for (int j = 0; j <= n; j++) dp[0][j] = j;  // Insert all\n        \n        for (int i = 1; i <= m; i++) {\n            for (int j = 1; j <= n; j++) {\n                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {\n                    dp[i][j] = dp[i - 1][j - 1];  // No operation needed\n                } else {\n                    dp[i][j] = 1 + Math.min(\n                        dp[i - 1][j - 1],  // Replace\n                        Math.min(\n                            dp[i - 1][j],  // Delete\n                            dp[i][j - 1]   // Insert\n                        )\n                    );\n                }\n            }\n        }\n        \n        System.out.println(\"Edit Distance: \" + dp[m][n]);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "2d-dp"
    },
    {
        "id": "nc150-2d-dp-118_edit_distance-2",
        "name": "Edit Distance: DP 1D",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 118: Edit Distance\n// ================================================\n// Given two strings word1 and word2, return the minimum number of \n// operations required to convert word1 to word2.\n// Operations: Insert, Delete, Replace\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String w1 = \"horse\";\n        String w2 = \"ros\";\n        \n        int[] dp1d = new int[w2.length() + 1];\n        for (int j = 0; j <= w2.length(); j++) dp1d[j] = j;\n        \n        for (int i = 1; i <= w1.length(); i++) {\n            int prev = dp1d[0];\n            dp1d[0] = i;\n            \n            for (int j = 1; j <= w2.length(); j++) {\n                int temp = dp1d[j];\n                if (w1.charAt(i - 1) == w2.charAt(j - 1)) {\n                    dp1d[j] = prev;\n                } else {\n                    dp1d[j] = 1 + Math.min(prev, Math.min(dp1d[j], dp1d[j - 1]));\n                }\n                prev = temp;\n            }\n        }\n        \n        System.out.println(\"Edit Distance (1D): \" + dp1d[w2.length()]);\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nDP Table for 'horse' -> 'ros':\");\n        System.out.println(\"    ''  r  o  s\");\n        System.out.println(\"''   0  1  2  3\");\n        System.out.println(\"h    1  1  2  3\");\n        System.out.println(\"o    2  2  1  2\");\n        System.out.println(\"r    3  2  2  2\");\n        System.out.println(\"s    4  3  3  2\");\n        System.out.println(\"e    5  4  4  3 <- 3 operations\");\n        System.out.println(\"\\nOperations: horse -> rorse (replace h->r)\");\n        System.out.println(\"            rorse -> rose (delete r)\");\n        System.out.println(\"            rose -> ros (delete e)\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "2d-dp"
    },
    {
        "id": "nc150-2d-dp-119_burst_balloons-1",
        "name": "Burst Balloons",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 119: Burst Balloons\n// ================================================\n// You have n balloons. Burst all balloons to get maximum coins.\n// coins = nums[left] * nums[i] * nums[right] when bursting i.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums = {3, 1, 5, 8};\n        \n        int n = nums.length;\n        // Add virtual 1s at boundaries\n        int[] arr = new int[n + 2];\n        arr[0] = arr[n + 1] = 1;\n        for (int i = 0; i < n; i++) arr[i + 1] = nums[i];\n        \n        // dp[i][j] = max coins for bursting all balloons in (i, j)\n        int[][] dp = new int[n + 2][n + 2];\n        \n        // Fill for increasing interval lengths\n        for (int len = 1; len <= n; len++) {\n            for (int i = 1; i + len <= n + 1; i++) {\n                int j = i + len - 1;\n                \n                // Try each balloon k as the LAST one to burst in interval\n                for (int k = i; k <= j; k++) {\n                    int coins = arr[i - 1] * arr[k] * arr[j + 1];\n                    coins += dp[i][k - 1] + dp[k + 1][j];\n                    dp[i][j] = Math.max(dp[i][j], coins);\n                }\n            }\n        }\n        \n        System.out.println(\"Burst Balloons Max Coins: \" + dp[1][n]);\n        \n        // ============================================\n        // Key Insight\n        // ============================================\n        System.out.println(\"\\nKey Insight:\");\n        System.out.println(\"Think of k as the LAST balloon to burst in range [i,j]\");\n        System.out.println(\"After bursting others, k's neighbors are i-1 and j+1\");\n        System.out.println(\"coins = arr[i-1] * arr[k] * arr[j+1] + dp[i][k-1] + dp[k+1][j]\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "2d-dp"
    },
    {
        "id": "nc150-2d-dp-120_regex_matching-1",
        "name": "Regex Matching",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 120: Regular Expression Matching\n// ================================================\n// '.' matches any single character, '*' matches zero or more of preceding.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String s = \"aa\";\n        String p = \"a*\";\n        \n        int m = s.length(), n = p.length();\n        boolean[][] dp = new boolean[m + 1][n + 1];\n        \n        dp[0][0] = true;\n        \n        // Handle patterns like a*, a*b*, a*b*c* that match empty string\n        for (int j = 2; j <= n; j++) {\n            if (p.charAt(j - 1) == '*') {\n                dp[0][j] = dp[0][j - 2];\n            }\n        }\n        \n        for (int i = 1; i <= m; i++) {\n            for (int j = 1; j <= n; j++) {\n                char sc = s.charAt(i - 1);\n                char pc = p.charAt(j - 1);\n                \n                if (pc == '.' || pc == sc) {\n                    dp[i][j] = dp[i - 1][j - 1];\n                } else if (pc == '*') {\n                    char prevPc = p.charAt(j - 2);\n                    \n                    // Zero occurrences of prevPc\n                    dp[i][j] = dp[i][j - 2];\n                    \n                    // One or more occurrences\n                    if (prevPc == '.' || prevPc == sc) {\n                        dp[i][j] = dp[i][j] || dp[i - 1][j];\n                    }\n                }\n            }\n        }\n        \n        System.out.println(\"Regex Match: \" + dp[m][n]);\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nFor s='aa', p='a*':\");\n        System.out.println(\"a* can match 'aa' (two a's)\");\n        System.out.println(\"Result: true\");\n        \n        System.out.println(\"\\nFor s='ab', p='.*':\");\n        System.out.println(\".* = any char, zero or more times\");\n        System.out.println(\"Result: true\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "2d-dp"
    },
    {
        "id": "nc150-greedy-121_max_subarray-1",
        "name": "Max Subarray: Kadane's Algorithm",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 121: Maximum Subarray (Kadane's Algorithm)\n// ================================================\n// Given an integer array nums, find the subarray with the largest sum.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n        \n        int maxSum = nums[0];\n        int currentSum = nums[0];\n        \n        for (int i = 1; i < nums.length; i++) {\n            // Either extend previous subarray or start new one\n            currentSum = Math.max(nums[i], currentSum + nums[i]);\n            maxSum = Math.max(maxSum, currentSum);\n        }\n        \n        System.out.println(\"Maximum Subarray Sum (Kadane): \" + maxSum);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "greedy"
    },
    {
        "id": "nc150-greedy-121_max_subarray-2",
        "name": "Max Subarray: Brute Force",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 121: Maximum Subarray (Kadane's Algorithm)\n// ================================================\n// Given an integer array nums, find the subarray with the largest sum.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums2 = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n        int maxSum2 = Integer.MIN_VALUE;\n        \n        for (int i = 0; i < nums2.length; i++) {\n            int sum = 0;\n            for (int j = i; j < nums2.length; j++) {\n                sum += nums2[j];\n                maxSum2 = Math.max(maxSum2, sum);\n            }\n        }\n        \n        System.out.println(\"Maximum Subarray Sum (Brute): \" + maxSum2);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "greedy"
    },
    {
        "id": "nc150-greedy-121_max_subarray-3",
        "name": "Max Subarray: Divide and Conquer",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 121: Maximum Subarray (Kadane's Algorithm)\n// ================================================\n// Given an integer array nums, find the subarray with the largest sum.\n\n\n\npublic class Main {\n    // Helper Methods\n    static int maxSubarrayDC(int[] nums, int left, int right) {\n    if (left == right) return nums[left];\n    \n    int mid = left + (right - left) / 2;\n    \n    // Max in left half\n    int leftMax = maxSubarrayDC(nums, left, mid);\n    \n    // Max in right half\n    int rightMax = maxSubarrayDC(nums, mid + 1, right);\n    \n    // Max crossing the middle\n    int crossMax = maxCrossing(nums, left, mid, right);\n    \n    return Math.max(Math.max(leftMax, rightMax), crossMax);\n}\n    static int maxCrossing(int[] nums, int left, int mid, int right) {\n    int leftSum = Integer.MIN_VALUE;\n    int sum = 0;\n    for (int i = mid; i >= left; i--) {\n        sum += nums[i];\n        leftSum = Math.max(leftSum, sum);\n    }\n    \n    int rightSum = Integer.MIN_VALUE;\n    sum = 0;\n    for (int i = mid + 1; i <= right; i++) {\n        sum += nums[i];\n        rightSum = Math.max(rightSum, sum);\n    }\n    \n    return leftSum + rightSum;\n}\n\n    public static void main(String[] args) {\n        int[] nums3 = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n        int maxSum3 = maxSubarrayDC(nums3, 0, nums3.length - 1);\n        System.out.println(\"Maximum Subarray Sum (D&C): \" + maxSum3);\n        \n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "greedy"
    },
    {
        "id": "nc150-greedy-122_jump_game-1",
        "name": "Jump Game: Greedy",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 122: Jump Game\n// ================================================\n// Given an array where nums[i] is max jump length at position i.\n// Determine if you can reach the last index.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums = {2, 3, 1, 1, 4};\n        \n        int maxReach = 0;\n        \n        for (int i = 0; i < nums.length; i++) {\n            if (i > maxReach) {\n                System.out.println(\"Can Jump (Greedy): false\");\n                break;\n            }\n            maxReach = Math.max(maxReach, i + nums[i]);\n            \n            if (maxReach >= nums.length - 1) {\n                System.out.println(\"Can Jump (Greedy): true\");\n                break;\n            }\n        }\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "greedy"
    },
    {
        "id": "nc150-greedy-122_jump_game-2",
        "name": "Jump Game: DP Backward",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 122: Jump Game\n// ================================================\n// Given an array where nums[i] is max jump length at position i.\n// Determine if you can reach the last index.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums2 = {2, 3, 1, 1, 4};\n        int n = nums2.length;\n        boolean[] canReach = new boolean[n];\n        canReach[n - 1] = true;\n        \n        for (int i = n - 2; i >= 0; i--) {\n            int furthest = Math.min(i + nums2[i], n - 1);\n            for (int j = i + 1; j <= furthest; j++) {\n                if (canReach[j]) {\n                    canReach[i] = true;\n                    break;\n                }\n            }\n        }\n        \n        System.out.println(\"Can Jump (DP): \" + canReach[0]);\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nVisualization for [2, 3, 1, 1, 4]:\");\n        System.out.println(\"Index: 0  1  2  3  4\");\n        System.out.println(\"i=0: maxReach = max(0, 0+2) = 2\");\n        System.out.println(\"i=1: maxReach = max(2, 1+3) = 4 >= 4 \u2713 Can reach!\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "greedy"
    },
    {
        "id": "nc150-greedy-123_jump_game_ii-1",
        "name": "Jump Game Ii: Greedy",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 123: Jump Game II\n// ================================================\n// Given an array where nums[i] is max jump length at position i.\n// Return minimum number of jumps to reach last index.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums = {2, 3, 1, 1, 4};\n        \n        int jumps = 0;\n        int currentEnd = 0;   // End of current jump range\n        int farthest = 0;     // Farthest we can reach\n        \n        for (int i = 0; i < nums.length - 1; i++) {\n            farthest = Math.max(farthest, i + nums[i]);\n            \n            // Reached end of current jump range\n            if (i == currentEnd) {\n                jumps++;\n                currentEnd = farthest;\n                \n                if (currentEnd >= nums.length - 1) break;\n            }\n        }\n        \n        System.out.println(\"Min Jumps (Greedy): \" + jumps);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "greedy"
    },
    {
        "id": "nc150-greedy-123_jump_game_ii-2",
        "name": "Jump Game Ii: BFS",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 123: Jump Game II\n// ================================================\n// Given an array where nums[i] is max jump length at position i.\n// Return minimum number of jumps to reach last index.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Treat as BFS where each level is one jump\n        int[] nums2 = {2, 3, 1, 1, 4};\n        int n = nums2.length;\n        \n        if (n == 1) {\n            System.out.println(\"Min Jumps (BFS): 0\");\n        } else {\n            int jumps2 = 0;\n            int left = 0, right = 0;\n            \n            while (right < n - 1) {\n                int farthest2 = 0;\n                for (int i = left; i <= right; i++) {\n                    farthest2 = Math.max(farthest2, i + nums2[i]);\n                }\n                left = right + 1;\n                int right = farthest2;\n                jumps2++;\n            }\n            \n            System.out.println(\"Min Jumps (BFS): \" + jumps2);\n        }\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nVisualization for [2, 3, 1, 1, 4]:\");\n        System.out.println(\"Jump 1: From index 0, can reach indices [1, 2]\");\n        System.out.println(\"        Best: index 1 (can reach up to index 4)\");\n        System.out.println(\"Jump 2: From index 1, reach index 4 (end)\");\n        System.out.println(\"Result: 2 jumps\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "greedy"
    },
    {
        "id": "nc150-greedy-124_gas_station-1",
        "name": "Gas Station",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 124: Gas Station\n// ================================================\n// Circular gas stations, gas[i] = fuel gained, cost[i] = fuel to travel.\n// Find starting station to complete the circuit, or return -1.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] gas = {1, 2, 3, 4, 5};\n        int[] cost = {3, 4, 5, 1, 2};\n        \n        int totalTank = 0;\n        int currTank = 0;\n        int startStation = 0;\n        \n        for (int i = 0; i < gas.length; i++) {\n            int netGain = gas[i] - cost[i];\n            totalTank += netGain;\n            currTank += netGain;\n            \n            // Can't reach station i+1 from current start\n            if (currTank < 0) {\n                startStation = i + 1;\n                currTank = 0;\n            }\n        }\n        \n        int result = totalTank >= 0 ? startStation : -1;\n        System.out.println(\"Gas Station: \" + result);\n        \n        // ============================================\n        // Key Insights\n        // ============================================\n        System.out.println(\"\\nKey Insights:\");\n        System.out.println(\"1. If total gas >= total cost, solution exists\");\n        System.out.println(\"2. If we can't reach station i from start, start from i+1\");\n        System.out.println(\"3. There's at most one valid starting station\");\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nFor gas=[1,2,3,4,5], cost=[3,4,5,1,2]:\");\n        System.out.println(\"Station 0: net=-2, can't start here\");\n        System.out.println(\"Station 1: net=-2, can't start here\");\n        System.out.println(\"Station 2: net=-2, can't start here\");\n        System.out.println(\"Station 3: net=+3, good start!\");\n        System.out.println(\"Station 4: net=+3\");\n        System.out.println(\"Total net = 0, solution exists. Start at station 3.\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "greedy"
    },
    {
        "id": "nc150-greedy-125_hand_of_straights-1",
        "name": "Hand Of Straights: TreeMap Greedy",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 125: Hand of Straights\n// ================================================\n// Given hand of cards and groupSize, check if can rearrange into groups of \n// consecutive cards of size groupSize.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] hand = {1, 2, 3, 6, 2, 3, 4, 7, 8};\n        int groupSize = 3;\n        \n        if (hand.length % groupSize != 0) {\n            System.out.println(\"Hand of Straights: false\");\n        } else {\n            TreeMap<Integer, Integer> count = new TreeMap<>();\n            for (int card : hand) {\n                count.put(card, count.getOrDefault(card, 0) + 1);\n            }\n            \n            boolean possible = true;\n            while (!count.isEmpty() && possible) {\n                int first = count.firstKey();\n                \n                for (int i = first; i < first + groupSize; i++) {\n                    if (!count.containsKey(i)) {\n                        possible = false;\n                        break;\n                    }\n                    \n                    int c = count.get(i);\n                    if (c == 1) {\n                        count.remove(i);\n                    } else {\n                        count.put(i, c - 1);\n                    }\n                }\n            }\n            \n            System.out.println(\"Hand of Straights: \" + possible);\n        }\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "greedy"
    },
    {
        "id": "nc150-greedy-125_hand_of_straights-2",
        "name": "Hand Of Straights: HashMap + Sorting",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 125: Hand of Straights\n// ================================================\n// Given hand of cards and groupSize, check if can rearrange into groups of \n// consecutive cards of size groupSize.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nSorting approach:\");\n        System.out.println(\"1. Sort the array\");\n        System.out.println(\"2. For each remaining card, try to form group starting from it\");\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nFor hand=[1,2,3,6,2,3,4,7,8], groupSize=3:\");\n        System.out.println(\"Sort: [1,2,2,3,3,4,6,7,8]\");\n        System.out.println(\"Group 1: [1,2,3]\");\n        System.out.println(\"Group 2: [2,3,4]\");\n        System.out.println(\"Group 3: [6,7,8]\");\n        System.out.println(\"Result: true\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "greedy"
    },
    {
        "id": "nc150-greedy-126_merge_triplets-1",
        "name": "Merge Triplets",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 126: Merge Triplets to Form Target Triplet\n// ================================================\n// Given array of triplets, check if we can pick some triplets and max them\n// to form target triplet.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[][] triplets = {{2, 5, 3}, {1, 8, 4}, {1, 7, 5}};\n        int[] target = {2, 7, 5};\n        \n        boolean[] found = new boolean[3];\n        \n        for (int[] triplet : triplets) {\n            // Only consider triplets where all values <= target\n            if (triplet[0] <= target[0] && triplet[1] <= target[1] && triplet[2] <= target[2]) {\n                if (triplet[0] == target[0]) found[0] = true;\n                if (triplet[1] == target[1]) found[1] = true;\n                if (triplet[2] == target[2]) found[2] = true;\n            }\n        }\n        \n        boolean result = found[0] && found[1] && found[2];\n        System.out.println(\"Merge Triplets: \" + result);\n        \n        // ============================================\n        // Key Insight\n        // ============================================\n        System.out.println(\"\\nKey Insight:\");\n        System.out.println(\"1. Can only use triplets where all elements <= target\");\n        System.out.println(\"2. Need to find at least one triplet with target[i] for each i\");\n        System.out.println(\"3. max() operation ensures we can combine them\");\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nFor triplets=[[2,5,3],[1,8,4],[1,7,5]], target=[2,7,5]:\");\n        System.out.println(\"[2,5,3]: valid (all <= target), has target[0]=2\");\n        System.out.println(\"[1,8,4]: invalid (8 > target[1]=7)\");\n        System.out.println(\"[1,7,5]: valid, has target[1]=7 and target[2]=5\");\n        System.out.println(\"Combine: max([2,5,3], [1,7,5]) = [2,7,5] \u2713\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "greedy"
    },
    {
        "id": "nc150-greedy-127_partition_labels-1",
        "name": "Partition Labels",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 127: Partition Labels\n// ================================================\n// Partition string so that each letter appears in at most one part.\n// Return list of sizes of these parts.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String s = \"ababcbacadefegdehijhklij\";\n        \n        // Find last occurrence of each character\n        int[] lastIdx = new int[26];\n        for (int i = 0; i < s.length(); i++) {\n            lastIdx[s.charAt(i) - 'a'] = i;\n        }\n        \n        List<Integer> result = new ArrayList<>();\n        int partitionEnd = 0;\n        int partitionStart = 0;\n        \n        for (int i = 0; i < s.length(); i++) {\n            partitionEnd = Math.max(partitionEnd, lastIdx[s.charAt(i) - 'a']);\n            \n            // Found end of current partition\n            if (i == partitionEnd) {\n                result.add(partitionEnd - partitionStart + 1);\n                partitionStart = i + 1;\n            }\n        }\n        \n        System.out.println(\"Partition Labels: \" + result);\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nFor 'ababcbacadefegdehijhklij':\");\n        System.out.println(\"Partition 1: 'ababcbaca' (size 9)\");\n        System.out.println(\"  - 'a' last at index 8, so partition ends at 8\");\n        System.out.println(\"Partition 2: 'defegde' (size 7)\");\n        System.out.println(\"  - 'd','e' determine end at index 15\");\n        System.out.println(\"Partition 3: 'hijhklij' (size 8)\");\n        System.out.println(\"  - 'i','j' determine end at index 23\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "greedy"
    },
    {
        "id": "nc150-greedy-128_valid_parenthesis_string-1",
        "name": "Valid Parenthesis String: Two Counters",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 128: Valid Parenthesis String\n// ================================================\n// String with '(', ')' and '*' (* can be '(', ')' or empty).\n// Determine if string is valid.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String s = \"(*)\";\n        \n        int minOpen = 0;  // Min possible open parentheses\n        int maxOpen = 0;  // Max possible open parentheses\n        \n        for (char c : s.toCharArray()) {\n            if (c == '(') {\n                minOpen++;\n                maxOpen++;\n            } else if (c == ')') {\n                minOpen--;\n                maxOpen--;\n            } else {  // '*'\n                minOpen--;  // Treat as ')'\n                maxOpen++;  // Treat as '('\n            }\n            \n            // Can't have negative open count\n            if (maxOpen < 0) break;\n            \n            // Reset min to 0 if negative\n            minOpen = Math.max(minOpen, 0);\n        }\n        \n        boolean isValid = minOpen == 0;\n        System.out.println(\"Valid Parenthesis String: \" + isValid);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "greedy"
    },
    {
        "id": "nc150-greedy-128_valid_parenthesis_string-2",
        "name": "Valid Parenthesis String: Greedy with Two Passes",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 128: Valid Parenthesis String\n// ================================================\n// String with '(', ')' and '*' (* can be '(', ')' or empty).\n// Determine if string is valid.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nTwo Passes approach:\");\n        System.out.println(\"1. Left to right: ensure ')' always has matching '(' or '*'\");\n        System.out.println(\"2. Right to left: ensure '(' always has matching ')' or '*'\");\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "greedy"
    },
    {
        "id": "nc150-greedy-128_valid_parenthesis_string-3",
        "name": "Valid Parenthesis String: DP",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 128: Valid Parenthesis String\n// ================================================\n// String with '(', ')' and '*' (* can be '(', ')' or empty).\n// Determine if string is valid.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nDP approach:\");\n        System.out.println(\"dp[i][j] = true if s[i:] is valid with j open '('s\");\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nFor '(*)':\");\n        System.out.println(\"i=0 '(': minOpen=1, maxOpen=1\");\n        System.out.println(\"i=1 '*': minOpen=0, maxOpen=2\");\n        System.out.println(\"i=2 ')': minOpen=0, maxOpen=1\");\n        System.out.println(\"minOpen=0 at end -> Valid!\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "greedy"
    },
    {
        "id": "nc150-intervals-129_insert_interval-1",
        "name": "Insert Interval",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 129: Insert Interval\n// ================================================\n// Insert new interval into list of non-overlapping intervals, merging if needed.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[][] intervals = {{1, 3}, {6, 9}};\n        int[] newInterval = {2, 5};\n        \n        List<int[]> result = new ArrayList<>();\n        int i = 0;\n        int n = intervals.length;\n        \n        // Add all intervals that come before newInterval\n        while (i < n && intervals[i][1] < newInterval[0]) {\n            result.add(intervals[i]);\n            i++;\n        }\n        \n        // Merge overlapping intervals\n        while (i < n && intervals[i][0] <= newInterval[1]) {\n            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);\n            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);\n            i++;\n        }\n        result.add(newInterval);\n        \n        // Add remaining intervals\n        while (i < n) {\n            result.add(intervals[i]);\n            i++;\n        }\n        \n        int[][] resultArray = result.toArray(new int[result.size()][]);\n        System.out.println(\"Insert Interval:\");\n        for (int[] interval : resultArray) {\n            System.out.println(Arrays.toString(interval));\n        }\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nFor intervals=[[1,3],[6,9]], newInterval=[2,5]:\");\n        System.out.println(\"Step 1: No intervals before [2,5]\");\n        System.out.println(\"Step 2: Merge [1,3] with [2,5] -> [1,5]\");\n        System.out.println(\"Step 3: Add [6,9] after\");\n        System.out.println(\"Result: [[1,5], [6,9]]\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "intervals"
    },
    {
        "id": "nc150-intervals-130_merge_intervals-1",
        "name": "Merge Intervals: Sort and Merge",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 130: Merge Intervals\n// ================================================\n// Given an array of intervals, merge all overlapping intervals.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[][] intervals = {{1,3}, {2,6}, {8,10}, {15,18}};\n        \n        // Sort by start time\n        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);\n        \n        List<int[]> merged = new ArrayList<>();\n        int[] current = intervals[0];\n        \n        for (int i = 1; i < intervals.length; i++) {\n            if (intervals[i][0] <= current[1]) {\n                // Overlapping - extend the end\n                current[1] = Math.max(current[1], intervals[i][1]);\n            } else {\n                // Non-overlapping - add current and start new\n                merged.add(current);\n                current = intervals[i];\n            }\n        }\n        merged.add(current);\n        \n        System.out.println(\"Merged Intervals:\");\n        for (int[] interval : merged) {\n            System.out.println(\"  [\" + interval[0] + \", \" + interval[1] + \"]\");\n        }\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "intervals"
    },
    {
        "id": "nc150-intervals-130_merge_intervals-2",
        "name": "Merge Intervals: Connected Components (Graph)",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 130: Merge Intervals\n// ================================================\n// Given an array of intervals, merge all overlapping intervals.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Build graph where overlapping intervals are connected\n        // Find connected components\n        // Each component's merged interval is [min start, max end]\n        \n        System.out.println(\"\\nGraph Approach (Conceptual):\");\n        System.out.println(\"1. Build adjacency list for overlapping intervals\");\n        System.out.println(\"2. DFS/BFS to find connected components\");\n        System.out.println(\"3. For each component, find [min start, max end]\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "intervals"
    },
    {
        "id": "nc150-intervals-131_non_overlapping-1",
        "name": "Non Overlapping: Greedy (Sort by End)",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 131: Non-overlapping Intervals\n// ================================================\n// Given array of intervals, return minimum number to remove for non-overlapping.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[][] intervals = {{1, 2}, {2, 3}, {3, 4}, {1, 3}};\n        \n        // Sort by end time\n        Arrays.sort(intervals, (a, b) -> a[1] - b[1]);\n        \n        int count = 0;\n        int prevEnd = Integer.MIN_VALUE;\n        \n        for (int[] interval : intervals) {\n            if (interval[0] >= prevEnd) {\n                // No overlap, keep this interval\n                prevEnd = interval[1];\n            } else {\n                // Overlap, remove this interval\n                count++;\n            }\n        }\n        \n        System.out.println(\"Intervals to remove: \" + count);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "intervals"
    },
    {
        "id": "nc150-intervals-131_non_overlapping-2",
        "name": "Non Overlapping: Greedy (Sort by Start)",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 131: Non-overlapping Intervals\n// ================================================\n// Given array of intervals, return minimum number to remove for non-overlapping.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[][] intervals2 = {{1, 2}, {2, 3}, {3, 4}, {1, 3}};\n        \n        // Sort by start time\n        Arrays.sort(intervals2, (a, b) -> a[0] - b[0]);\n        \n        int count2 = 0;\n        int prevEnd2 = intervals2[0][1];\n        \n        for (int i = 1; i < intervals2.length; i++) {\n            if (intervals2[i][0] < prevEnd2) {\n                // Overlap - remove the one with larger end\n                count2++;\n                prevEnd2 = Math.min(prevEnd2, intervals2[i][1]);\n            } else {\n                prevEnd2 = intervals2[i][1];\n            }\n        }\n        \n        System.out.println(\"Intervals to remove (by start): \" + count2);\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nIntervals: [[1,2], [2,3], [3,4], [1,3]]\");\n        System.out.println(\"Sorted by end: [[1,2], [2,3], [1,3], [3,4]]\");\n        System.out.println(\"Keep [1,2]: prevEnd=2\");\n        System.out.println(\"Keep [2,3]: 2>=2, prevEnd=3\");\n        System.out.println(\"Remove [1,3]: 1<3, overlap!\");\n        System.out.println(\"Keep [3,4]: 3>=3, prevEnd=4\");\n        System.out.println(\"Result: Remove 1 interval\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "intervals"
    },
    {
        "id": "nc150-intervals-132_meeting_rooms-1",
        "name": "Meeting Rooms: Sorting",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 132: Meeting Rooms\n// ================================================\n// Given array of meeting time intervals, determine if one person can attend all.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[][] intervals = {{0, 30}, {5, 10}, {15, 20}};\n        \n        // Sort by start time\n        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);\n        \n        boolean canAttendAll = true;\n        for (int i = 1; i < intervals.length; i++) {\n            // Check if current meeting starts before previous ends\n            if (intervals[i][0] < intervals[i - 1][1]) {\n                canAttendAll = false;\n                break;\n            }\n        }\n        \n        System.out.println(\"Meeting Rooms: \" + canAttendAll);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "intervals"
    },
    {
        "id": "nc150-intervals-132_meeting_rooms-2",
        "name": "Meeting Rooms: Brute Force",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 132: Meeting Rooms\n// ================================================\n// Given array of meeting time intervals, determine if one person can attend all.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nBrute Force: Check all pairs for overlap\");\n        System.out.println(\"Two intervals [s1,e1] and [s2,e2] overlap if:\");\n        System.out.println(\"  NOT (e1 <= s2 OR e2 <= s1)\");\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nFor [[0,30], [5,10], [15,20]]:\");\n        System.out.println(\"Sorted: [[0,30], [5,10], [15,20]]\");\n        System.out.println(\"[0,30] ends at 30, [5,10] starts at 5 -> Overlap!\");\n        System.out.println(\"Result: false\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "intervals"
    },
    {
        "id": "nc150-intervals-133_meeting_rooms_ii-1",
        "name": "Meeting Rooms Ii: Two Pointers",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 133: Meeting Rooms II\n// ================================================\n// Find minimum number of conference rooms required for all meetings.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[][] intervals = {{0, 30}, {5, 10}, {15, 20}};\n        int n = intervals.length;\n        \n        int[] starts = new int[n];\n        int[] ends = new int[n];\n        \n        for (int i = 0; i < n; i++) {\n            starts[i] = intervals[i][0];\n            ends[i] = intervals[i][1];\n        }\n        \n        Arrays.sort(starts);\n        Arrays.sort(ends);\n        \n        int rooms = 0, endPtr = 0;\n        \n        for (int start : starts) {\n            if (start < ends[endPtr]) {\n                rooms++;  // Need new room\n            } else {\n                endPtr++;  // Reuse room that just freed up\n            }\n        }\n        \n        System.out.println(\"Meeting Rooms II: \" + rooms);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "intervals"
    },
    {
        "id": "nc150-intervals-133_meeting_rooms_ii-2",
        "name": "Meeting Rooms Ii: Min Heap",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 133: Meeting Rooms II\n// ================================================\n// Find minimum number of conference rooms required for all meetings.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[][] intervals2 = {{0, 30}, {5, 10}, {15, 20}};\n        Arrays.sort(intervals2, (a, b) -> a[0] - b[0]);\n        \n        PriorityQueue<Integer> minHeap = new PriorityQueue<>();\n        \n        for (int[] interval : intervals2) {\n            // If earliest ending room ends before current starts, reuse it\n            if (!minHeap.isEmpty() && minHeap.peek() <= interval[0]) {\n                minHeap.poll();\n            }\n            minHeap.offer(interval[1]);\n        }\n        \n        System.out.println(\"Meeting Rooms II (Heap): \" + minHeap.size());\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nFor [[0,30], [5,10], [15,20]]:\");\n        System.out.println(\"Time 0: [0,30] starts -> 1 room\");\n        System.out.println(\"Time 5: [5,10] starts, [0,30] ongoing -> 2 rooms\");\n        System.out.println(\"Time 10: [5,10] ends -> 1 room\");\n        System.out.println(\"Time 15: [15,20] starts, [0,30] ongoing -> 2 rooms\");\n        System.out.println(\"Result: 2 rooms needed\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "intervals"
    },
    {
        "id": "nc150-intervals-134_min_interval-1",
        "name": "Min Interval",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 134: Minimum Interval to Include Each Query\n// ================================================\n// Given intervals and queries, return smallest interval length containing each query.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[][] intervals = {{1, 4}, {2, 4}, {3, 6}, {4, 4}};\n        int[] queries = {2, 3, 4, 5};\n        \n        // Sort intervals by start\n        int[][] sortedIntervals = intervals.clone();\n        Arrays.sort(sortedIntervals, (a, b) -> a[0] - b[0]);\n        \n        // Sort queries with original indices\n        int[][] sortedQueries = new int[queries.length][2];\n        for (int i = 0; i < queries.length; i++) {\n            sortedQueries[i] = new int[]{queries[i], i};\n        }\n        Arrays.sort(sortedQueries, (a, b) -> a[0] - b[0]);\n        \n        // Min heap: [interval size, end]\n        PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> a[0] - b[0]);\n        int[] result = new int[queries.length];\n        Arrays.fill(result, -1);\n        \n        int i = 0;\n        for (int[] query : sortedQueries) {\n            int q = query[0];\n            int idx = query[1];\n            \n            // Add all intervals that start <= query\n            while (i < sortedIntervals.length && sortedIntervals[i][0] <= q) {\n                int size = sortedIntervals[i][1] - sortedIntervals[i][0] + 1;\n                minHeap.offer(new int[]{size, sortedIntervals[i][1]});\n                i++;\n            }\n            \n            // Remove intervals that ended before query\n            while (!minHeap.isEmpty() && minHeap.peek()[1] < q) {\n                minHeap.poll();\n            }\n            \n            if (!minHeap.isEmpty()) {\n                result[idx] = minHeap.peek()[0];\n            }\n        }\n        \n        System.out.println(\"Min Interval Sizes: \" + Arrays.toString(result));\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nFor intervals=[[1,4],[2,4],[3,6],[4,4]], queries=[2,3,4,5]:\");\n        System.out.println(\"Query 2: [1,4]=4, [2,4]=3 contain it. Min size = 3\");\n        System.out.println(\"Query 3: [1,4]=4, [2,4]=3, [3,6]=4 contain it. Min size = 3\");\n        System.out.println(\"Query 4: [1,4]=4, [2,4]=3, [3,6]=4, [4,4]=1. Min size = 1\");\n        System.out.println(\"Query 5: [3,6]=4 contains it. Min size = 4\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "intervals"
    },
    {
        "id": "nc150-math-136_detect_squares-1",
        "name": "Detect Squares",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 135: Detect Squares\n// ================================================\n// Design a data structure that supports adding points and counting\n// squares that can be formed with a given query point.\n\n\n\npublic class Main {\n    // Helper Methods\n    static     public DetectSquares() {\n        pointCount = new HashMap<>();\n        points = new ArrayList<>();\n    }\n    static     public void add(int[] point) {\n        String key = point[0] + \",\" + point[1];\n        pointCount.put(key, pointCount.getOrDefault(key, 0) + 1);\n        points.add(point);\n    }\n    static     public int count(int[] point) {\n        int px = point[0], py = point[1];\n        int result = 0;\n        \n        for (int[] p : points) {\n            int x = p[0], y = p[1];\n            \n            // Skip if not diagonal (same row or column won't form square)\n            if (Math.abs(px - x) != Math.abs(py - y) || px == x) {\n                continue;\n            }\n            \n            // Check if other two corners exist\n            // Corners are: (px, y) and (x, py)\n            int count1 = pointCount.getOrDefault(px + \",\" + y, 0);\n            int count2 = pointCount.getOrDefault(x + \",\" + py, 0);\n            \n            result += count1 * count2;\n        }\n        \n        return result;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Detect Squares:\");\n        \n        /*\n        class DetectSquares {\n            private Map<String, Integer> pointCount;\n            private List<int[]> points;\n            \n            \n            \n        }\n        */\n        \n        System.out.println(\"Data Structure:\");\n        System.out.println(\"- HashMap<String, Integer> for point counts\");\n        System.out.println(\"- ArrayList<int[]> for all added points\");\n        \n        System.out.println(\"\\nQuery Algorithm:\");\n        System.out.println(\"1. For each existing point P, treat (query, P) as diagonal\");\n        System.out.println(\"2. Check if other two corners exist\");\n        System.out.println(\"3. Multiply counts of the two corners\");\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nExample:\");\n        System.out.println(\"Add: [3,10], [11,2], [3,2]\");\n        System.out.println(\"Query [11,10]:\");\n        System.out.println(\"  Diagonal with [3,2]: check [3,10] and [11,2] -> 1*1 = 1\");\n        System.out.println(\"  Result: 1 square\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "math"
    },
    {
        "id": "nc150-math-137_rotate_image-1",
        "name": "Rotate Image: Transpose + Reverse",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 137: Rotate Image (Matrix)\n// ================================================\n// Rotate an n x n 2D matrix by 90 degrees clockwise. In-place.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[][] matrix = {\n            {1, 2, 3},\n            {4, 5, 6},\n            {7, 8, 9}\n        };\n        \n        int n = matrix.length;\n        \n        // Step 1: Transpose (swap matrix[i][j] with matrix[j][i])\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                int temp = matrix[i][j];\n                matrix[i][j] = matrix[j][i];\n                matrix[j][i] = temp;\n            }\n        }\n        \n        // Step 2: Reverse each row\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n / 2; j++) {\n                int temp = matrix[i][j];\n                matrix[i][j] = matrix[i][n - 1 - j];\n                matrix[i][n - 1 - j] = temp;\n            }\n        }\n        \n        System.out.println(\"Rotated Matrix:\");\n        for (int[] row : matrix) {\n            System.out.println(Arrays.toString(row));\n        }\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "math"
    },
    {
        "id": "nc150-math-137_rotate_image-2",
        "name": "Rotate Image: Rotate Four Cells at a Time",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 137: Rotate Image (Matrix)\n// ================================================\n// Rotate an n x n 2D matrix by 90 degrees clockwise. In-place.\n\n\n\npublic class Main {\n    // Helper Methods\n    static void rotateFour(int[][] matrix) {\n    int n = matrix.length;\n    \n    for (int layer = 0; layer < n / 2; layer++) {\n        int first = layer;\n        int last = n - 1 - layer;\n        \n        for (int i = first; i < last; i++) {\n            int offset = i - first;\n            \n            // Save top\n            int top = matrix[first][i];\n            \n            // Left -> Top\n            matrix[first][i] = matrix[last - offset][first];\n            \n            // Bottom -> Left\n            matrix[last - offset][first] = matrix[last][last - offset];\n            \n            // Right -> Bottom\n            matrix[last][last - offset] = matrix[i][last];\n            \n            // Top -> Right\n            matrix[i][last] = top;\n        }\n    }\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"\\nRotate Four Cells Approach:\");\n        System.out.println(\"For each layer, rotate 4 cells in a cycle\");\n        \n        /*\n        */\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\n90\u00b0 Clockwise:\");\n        System.out.println(\"[1,2,3]    [7,4,1]\");\n        System.out.println(\"[4,5,6] -> [8,5,2]\");\n        System.out.println(\"[7,8,9]    [9,6,3]\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "math"
    },
    {
        "id": "nc150-math-138_spiral_matrix-1",
        "name": "Spiral Matrix: Simulation with Boundaries",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 138: Spiral Matrix\n// ================================================\n// Given an m x n matrix, return all elements in spiral order.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[][] matrix = {\n            {1, 2, 3},\n            {4, 5, 6},\n            {7, 8, 9}\n        };\n        \n        List<Integer> result = new ArrayList<>();\n        int top = 0, bottom = matrix.length - 1;\n        int left = 0, right = matrix[0].length - 1;\n        \n        while (top <= bottom && left <= right) {\n            // Traverse right\n            for (int j = left; j <= right; j++) {\n                result.add(matrix[top][j]);\n            }\n            top++;\n            \n            // Traverse down\n            for (int i = top; i <= bottom; i++) {\n                result.add(matrix[i][right]);\n            }\n            right--;\n            \n            // Traverse left (if row exists)\n            if (top <= bottom) {\n                for (int j = right; j >= left; j--) {\n                    result.add(matrix[bottom][j]);\n                }\n                bottom--;\n            }\n            \n            // Traverse up (if column exists)\n            if (left <= right) {\n                for (int i = bottom; i >= top; i--) {\n                    result.add(matrix[i][left]);\n                }\n                left++;\n            }\n        }\n        \n        System.out.println(\"Spiral Order: \" + result);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "math"
    },
    {
        "id": "nc150-math-138_spiral_matrix-2",
        "name": "Spiral Matrix: Direction Array",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 138: Spiral Matrix\n// ================================================\n// Given an m x n matrix, return all elements in spiral order.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nDirection Array approach:\");\n        System.out.println(\"Use directions: right, down, left, up\");\n        System.out.println(\"Change direction when hitting boundary or visited cell\");\n        \n        /*\n        int[][] dirs = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};\n        int dir = 0;  // Start going right\n        int r = 0, c = 0;\n        boolean[][] visited = new boolean[m][n];\n        \n        for (int i = 0; i < m * n; i++) {\n            result.add(matrix[r][c]);\n            visited[r][c] = true;\n            \n            int nr = r + dirs[dir][0];\n            int nc = c + dirs[dir][1];\n            \n            // Change direction if needed\n            if (nr < 0 || nr >= m || nc < 0 || nc >= n || visited[nr][nc]) {\n                dir = (dir + 1) % 4;\n                nr = r + dirs[dir][0];\n                nc = c + dirs[dir][1];\n            }\n            \n            r = nr;\n            c = nc;\n        }\n        */\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nSpiral path:\");\n        System.out.println(\"1 \u2192 2 \u2192 3\");\n        System.out.println(\"        \u2193\");\n        System.out.println(\"4 \u2192 5   6\");\n        System.out.println(\"\u2191       \u2193\");\n        System.out.println(\"7 \u2190 8 \u2190 9\");\n        System.out.println(\"Result: [1,2,3,6,9,8,7,4,5]\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "math"
    },
    {
        "id": "nc150-math-139_set_matrix_zeroes-1",
        "name": "Set Matrix Zeroes: Use First Row/Column as Markers",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 139: Set Matrix Zeroes\n// ================================================\n// If element is 0, set its entire row and column to 0. In-place.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[][] matrix = {\n            {1, 1, 1},\n            {1, 0, 1},\n            {1, 1, 1}\n        };\n        \n        int m = matrix.length, n = matrix[0].length;\n        boolean firstRowZero = false, firstColZero = false;\n        \n        // Check if first row/column should be zeroed\n        for (int j = 0; j < n; j++) {\n            if (matrix[0][j] == 0) firstRowZero = true;\n        }\n        for (int i = 0; i < m; i++) {\n            if (matrix[i][0] == 0) firstColZero = true;\n        }\n        \n        // Mark zeros in first row/column\n        for (int i = 1; i < m; i++) {\n            for (int j = 1; j < n; j++) {\n                if (matrix[i][j] == 0) {\n                    matrix[i][0] = 0;\n                    matrix[0][j] = 0;\n                }\n            }\n        }\n        \n        // Set zeros based on markers\n        for (int i = 1; i < m; i++) {\n            for (int j = 1; j < n; j++) {\n                if (matrix[i][0] == 0 || matrix[0][j] == 0) {\n                    matrix[i][j] = 0;\n                }\n            }\n        }\n        \n        // Handle first row and column\n        if (firstRowZero) {\n            for (int j = 0; j < n; j++) matrix[0][j] = 0;\n        }\n        if (firstColZero) {\n            for (int i = 0; i < m; i++) matrix[i][0] = 0;\n        }\n        \n        System.out.println(\"Set Matrix Zeroes:\");\n        for (int[] row : matrix) {\n            System.out.println(Arrays.toString(row));\n        }\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "math"
    },
    {
        "id": "nc150-math-139_set_matrix_zeroes-2",
        "name": "Set Matrix Zeroes: Use Extra Arrays",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 139: Set Matrix Zeroes\n// ================================================\n// If element is 0, set its entire row and column to 0. In-place.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nO(m+n) Space approach:\");\n        System.out.println(\"Use boolean[] rows and boolean[] cols to mark\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "math"
    },
    {
        "id": "nc150-math-140_happy_number-1",
        "name": "Happy Number: Floyd's Cycle Detection",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 140: Happy Number\n// ================================================\n// A number is happy if repeatedly replacing it with sum of squares of digits\n// eventually reaches 1. Return true if n is happy.\n\n\n\npublic class Main {\n    // Helper Methods\n    static int sumOfSquares(int n) {\n    int sum = 0;\n    while (n > 0) {\n        int digit = n % 10;\n        sum += digit * digit;\n        n /= 10;\n    }\n    return sum;\n}\n\n    public static void main(String[] args) {\n        int n = 19;\n        \n        int slow = n, fast = n;\n        \n        do {\n            slow = sumOfSquares(slow);\n            fast = sumOfSquares(sumOfSquares(fast));\n        } while (slow != fast);\n        \n        boolean isHappy = slow == 1;\n        System.out.println(\"Happy Number \" + n + \": \" + isHappy);\n        \n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "math"
    },
    {
        "id": "nc150-math-140_happy_number-2",
        "name": "Happy Number: HashSet",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 140: Happy Number\n// ================================================\n// A number is happy if repeatedly replacing it with sum of squares of digits\n// eventually reaches 1. Return true if n is happy.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int n2 = 19;\n        Set<Integer> seen = new HashSet<>();\n        \n        while (n2 != 1 && !seen.contains(n2)) {\n            seen.add(n2);\n            n2 = sumOfSquares(n2);\n        }\n        \n        boolean isHappy2 = n2 == 1;\n        System.out.println(\"Happy Number (HashSet): \" + isHappy2);\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nFor n=19:\");\n        System.out.println(\"19 -> 1\u00b2 + 9\u00b2 = 82\");\n        System.out.println(\"82 -> 8\u00b2 + 2\u00b2 = 68\");\n        System.out.println(\"68 -> 6\u00b2 + 8\u00b2 = 100\");\n        System.out.println(\"100 -> 1\u00b2 + 0\u00b2 + 0\u00b2 = 1\");\n        System.out.println(\"Reached 1 -> Happy!\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "math"
    },
    {
        "id": "nc150-math-141_plus_one-1",
        "name": "Plus One",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 141: Plus One\n// ================================================\n// Given array representing a large integer, add one to it.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] digits = {1, 2, 9};\n        \n        for (int i = digits.length - 1; i >= 0; i--) {\n            if (digits[i] < 9) {\n                digits[i]++;\n                System.out.println(\"Plus One: \" + Arrays.toString(digits));\n                break;\n            }\n            digits[i] = 0;\n            \n            // If we've gone through all digits, need extra space\n            if (i == 0) {\n                int[] result = new int[digits.length + 1];\n                result[0] = 1;\n                System.out.println(\"Plus One: \" + Arrays.toString(result));\n            }\n        }\n        \n        // ============================================\n        // Approach Explanation\n        // ============================================\n        System.out.println(\"\\nAlgorithm:\");\n        System.out.println(\"1. Start from rightmost digit\");\n        System.out.println(\"2. If digit < 9, increment and return\");\n        System.out.println(\"3. If digit = 9, set to 0 and continue left\");\n        System.out.println(\"4. If all digits were 9, prepend 1\");\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nExamples:\");\n        System.out.println(\"[1,2,3] + 1 = [1,2,4]\");\n        System.out.println(\"[1,2,9] + 1 = [1,3,0]\");\n        System.out.println(\"[9,9,9] + 1 = [1,0,0,0]\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "math"
    },
    {
        "id": "nc150-math-142_pow-1",
        "name": "Pow: Binary Exponentiation",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 142: Pow(x, n)\n// ================================================\n// Implement pow(x, n), which calculates x raised to power n.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        double x = 2.0;\n        int n = 10;\n        \n        long power = n;\n        double result = 1.0;\n        \n        if (power < 0) {\n            x = 1 / x;\n            power = -power;\n        }\n        \n        while (power > 0) {\n            if ((power & 1) == 1) {  // Odd power\n                result *= x;\n            }\n            x *= x;\n            power >>= 1;\n        }\n        \n        System.out.println(\"Pow(\" + 2.0 + \", \" + 10 + \") = \" + result);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "math"
    },
    {
        "id": "nc150-math-142_pow-2",
        "name": "Pow: Recursive",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 142: Pow(x, n)\n// ================================================\n// Implement pow(x, n), which calculates x raised to power n.\n\n\n\npublic class Main {\n    // Helper Methods\n    static double myPow(double x, int n) {\n    if (n == 0) return 1;\n    if (n < 0) {\n        n = -n;\n        x = 1 / x;\n    }\n    double half = myPow(x, n / 2);\n    if (n % 2 == 0) {\n        return half * half;\n    } else {\n        return x * half * half;\n    }\n}\n\n    public static void main(String[] args) {\n        System.out.println(\"\\nRecursive approach:\");\n        System.out.println(\"pow(x, n) = pow(x, n/2)\u00b2 if n is even\");\n        System.out.println(\"pow(x, n) = x * pow(x, n/2)\u00b2 if n is odd\");\n        \n        /*\n        */\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nFor 2^10:\");\n        System.out.println(\"10 = 1010 in binary\");\n        System.out.println(\"2^10 = 2^8 * 2^2 = 256 * 4 = 1024\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "math"
    },
    {
        "id": "nc150-math-143_multiply_strings-1",
        "name": "Multiply Strings",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 143: Multiply Strings\n// ================================================\n// Multiply two non-negative integers represented as strings.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        String num1 = \"123\";\n        String num2 = \"456\";\n        \n        int m = num1.length(), n = num2.length();\n        int[] result = new int[m + n];\n        \n        // Multiply from right to left\n        for (int i = m - 1; i >= 0; i--) {\n            for (int j = n - 1; j >= 0; j--) {\n                int mul = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');\n                int p1 = i + j;     // Higher position\n                int p2 = i + j + 1; // Lower position\n                \n                int sum = mul + result[p2];\n                result[p2] = sum % 10;\n                result[p1] += sum / 10;\n            }\n        }\n        \n        // Build result string\n        StringBuilder sb = new StringBuilder();\n        for (int digit : result) {\n            if (!(sb.length() == 0 && digit == 0)) {  // Skip leading zeros\n                sb.append(digit);\n            }\n        }\n        \n        String product = sb.length() == 0 ? \"0\" : sb.toString();\n        System.out.println(\"Multiply Strings: \" + num1 + \" \u00d7 \" + num2 + \" = \" + product);\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nGrade school multiplication:\");\n        System.out.println(\"    1 2 3\");\n        System.out.println(\"  \u00d7   4 5 6\");\n        System.out.println(\"  -------\");\n        System.out.println(\"    7 3 8  (123 \u00d7 6)\");\n        System.out.println(\"  6 1 5    (123 \u00d7 5)\");\n        System.out.println(\"4 9 2      (123 \u00d7 4)\");\n        System.out.println(\"---------\");\n        System.out.println(\"5 6 0 8 8\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "math"
    },
    {
        "id": "nc150-bit-manipulation-143_single_number-1",
        "name": "Single Number: XOR",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 143: Single Number\n// ================================================\n// Given a non-empty array where every element appears twice except one.\n// Find that single one. Must be O(1) space.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // XOR properties: a ^ a = 0, a ^ 0 = a\n        int[] nums = {4, 1, 2, 1, 2};\n        \n        int single = 0;\n        for (int num : nums) {\n            single ^= num;\n        }\n        \n        System.out.println(\"Single Number (XOR): \" + single);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "bit-manipulation"
    },
    {
        "id": "nc150-bit-manipulation-143_single_number-2",
        "name": "Single Number: HashSet",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 143: Single Number\n// ================================================\n// Given a non-empty array where every element appears twice except one.\n// Find that single one. Must be O(1) space.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums2 = {4, 1, 2, 1, 2};\n        Set<Integer> seen = new HashSet<>();\n        \n        for (int num : nums2) {\n            if (seen.contains(num)) {\n                seen.remove(num);\n            } else {\n                seen.add(num);\n            }\n        }\n        \n        int single2 = seen.iterator().next();\n        System.out.println(\"Single Number (HashSet): \" + single2);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "bit-manipulation"
    },
    {
        "id": "nc150-bit-manipulation-143_single_number-3",
        "name": "Single Number: Math (2*sum",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 143: Single Number\n// ================================================\n// Given a non-empty array where every element appears twice except one.\n// Find that single one. Must be O(1) space.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // 2*(a+b+c) - (a+a+b+b+c) = c\n        int[] nums3 = {4, 1, 2, 1, 2};\n        Set<Integer> unique = new HashSet<>();\n        int totalSum = 0;\n        \n        for (int num : nums3) {\n            unique.add(num);\n            totalSum += num;\n        }\n        \n        int uniqueSum = 0;\n        for (int num : unique) {\n            uniqueSum += num;\n        }\n        \n        int single3 = 2 * uniqueSum - totalSum;\n        System.out.println(\"Single Number (Math): \" + single3);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "bit-manipulation"
    },
    {
        "id": "nc150-bit-manipulation-144_number_1_bits-1",
        "name": "Number 1 Bits: Brian Kernighan's",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 144: Number of 1 Bits\n// ================================================\n// Write a function that returns the number of '1' bits (Hamming weight).\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int n = 0b00001011;  // Binary: 11 = 1011\n        \n        int count = 0;\n        int num = n;\n        while (num != 0) {\n            num = num & (num - 1);  // Removes rightmost 1 bit\n            count++;\n        }\n        \n        System.out.println(\"Number of 1 bits (Kernighan): \" + count);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "bit-manipulation"
    },
    {
        "id": "nc150-bit-manipulation-144_number_1_bits-2",
        "name": "Number 1 Bits: Iterate Bits",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 144: Number of 1 Bits\n// ================================================\n// Write a function that returns the number of '1' bits (Hamming weight).\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int n2 = 0b00001011;\n        int count2 = 0;\n        \n        for (int i = 0; i < 32; i++) {\n            if ((n2 & (1 << i)) != 0) {\n                count2++;\n            }\n        }\n        \n        System.out.println(\"Number of 1 bits (Iterate): \" + count2);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "bit-manipulation"
    },
    {
        "id": "nc150-bit-manipulation-144_number_1_bits-3",
        "name": "Number 1 Bits: Right Shift",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 144: Number of 1 Bits\n// ================================================\n// Write a function that returns the number of '1' bits (Hamming weight).\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int n3 = 0b00001011;\n        int count3 = 0;\n        \n        while (n3 != 0) {\n            count3 += (n3 & 1);\n            n3 >>>= 1;  // Unsigned right shift\n        }\n        \n        System.out.println(\"Number of 1 bits (Shift): \" + count3);\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nBrian Kernighan's Algorithm:\");\n        System.out.println(\"n = 1011 (11)\");\n        System.out.println(\"n-1 = 1010 (10)\");\n        System.out.println(\"n & (n-1) = 1010 -> removes rightmost 1\");\n        System.out.println(\"Continue until n = 0\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "bit-manipulation"
    },
    {
        "id": "nc150-bit-manipulation-145_counting_bits-1",
        "name": "Counting Bits: DP with Last Set Bit",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 145: Counting Bits\n// ================================================\n// Given integer n, return array ans where ans[i] is number of 1s in binary of i.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int n = 5;\n        int[] ans = new int[n + 1];\n        \n        for (int i = 1; i <= n; i++) {\n            ans[i] = ans[i & (i - 1)] + 1;  // Remove last set bit, add 1\n        }\n        \n        System.out.println(\"Counting Bits (DP): \" + Arrays.toString(ans));\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "bit-manipulation"
    },
    {
        "id": "nc150-bit-manipulation-145_counting_bits-2",
        "name": "Counting Bits: DP with Right Shift",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 145: Counting Bits\n// ================================================\n// Given integer n, return array ans where ans[i] is number of 1s in binary of i.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int n2 = 5;\n        int[] ans2 = new int[n2 + 1];\n        \n        for (int i = 1; i <= n2; i++) {\n            ans2[i] = ans2[i >> 1] + (i & 1);  // i/2 bits + last bit\n        }\n        \n        System.out.println(\"Counting Bits (Shift): \" + Arrays.toString(ans2));\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "bit-manipulation"
    },
    {
        "id": "nc150-bit-manipulation-145_counting_bits-3",
        "name": "Counting Bits: Brute Force",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 145: Counting Bits\n// ================================================\n// Given integer n, return array ans where ans[i] is number of 1s in binary of i.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int n3 = 5;\n        int[] ans3 = new int[n3 + 1];\n        \n        for (int i = 0; i <= n3; i++) {\n            int count = 0;\n            int num = i;\n            while (num != 0) {\n                num &= (num - 1);\n                count++;\n            }\n            ans3[i] = count;\n        }\n        \n        System.out.println(\"Counting Bits (Brute): \" + Arrays.toString(ans3));\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nNumber:  Binary  1-bits\");\n        System.out.println(\"0:       0       0\");\n        System.out.println(\"1:       1       1\");\n        System.out.println(\"2:       10      1\");\n        System.out.println(\"3:       11      2\");\n        System.out.println(\"4:       100     1\");\n        System.out.println(\"5:       101     2\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "bit-manipulation"
    },
    {
        "id": "nc150-bit-manipulation-146_single_number-1",
        "name": "Single Number: XOR",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 146: Single Number\n// ================================================\n// Every element appears twice except one. Find that single one.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Key: XOR of a number with itself = 0, XOR with 0 = itself\n        \n        int[] nums = {4, 1, 2, 1, 2};\n        \n        int single = 0;\n        for (int num : nums) {\n            single ^= num;\n        }\n        \n        System.out.println(\"Single Number (XOR): \" + single);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "bit-manipulation"
    },
    {
        "id": "nc150-bit-manipulation-146_single_number-2",
        "name": "Single Number: HashMap",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 146: Single Number\n// ================================================\n// Every element appears twice except one. Find that single one.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums2 = {4, 1, 2, 1, 2};\n        \n        Map<Integer, Integer> count = new HashMap<>();\n        for (int num : nums2) {\n            count.put(num, count.getOrDefault(num, 0) + 1);\n        }\n        \n        int single2 = 0;\n        for (Map.Entry<Integer, Integer> entry : count.entrySet()) {\n            if (entry.getValue() == 1) {\n                single2 = entry.getKey();\n                break;\n            }\n        }\n        \n        System.out.println(\"Single Number (HashMap): \" + single2);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "bit-manipulation"
    },
    {
        "id": "nc150-bit-manipulation-146_single_number-3",
        "name": "Single Number: Math (Sum)",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 146: Single Number\n// ================================================\n// Every element appears twice except one. Find that single one.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        System.out.println(\"\\nMath approach:\");\n        System.out.println(\"2 * (sum of unique) - (sum of all) = single\");\n        \n        // ============================================\n        // XOR Properties\n        // ============================================\n        System.out.println(\"\\nXOR Properties:\");\n        System.out.println(\"a ^ a = 0\");\n        System.out.println(\"a ^ 0 = a\");\n        System.out.println(\"a ^ b ^ a = b (commutative)\");\n        System.out.println(\"[4,1,2,1,2]: 4^1^2^1^2 = 4^(1^1)^(2^2) = 4^0^0 = 4\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "bit-manipulation"
    },
    {
        "id": "nc150-bit-manipulation-147_reverse_bits-1",
        "name": "Reverse Bits: Bit Manipulation",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 147: Reverse Bits\n// ================================================\n// Reverse bits of a given 32 bits unsigned integer.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int n = 0b00000010100101000001111010011100;  // 43261596\n        \n        int result = 0;\n        int num = n;\n        \n        for (int i = 0; i < 32; i++) {\n            result <<= 1;          // Make room\n            result |= (num & 1);   // Add rightmost bit\n            num >>>= 1;            // Move to next bit\n        }\n        \n        System.out.println(\"Reversed bits: \" + result);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "bit-manipulation"
    },
    {
        "id": "nc150-bit-manipulation-147_reverse_bits-2",
        "name": "Reverse Bits: Divide and Conquer",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 147: Reverse Bits\n// ================================================\n// Reverse bits of a given 32 bits unsigned integer.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // Swap halves recursively\n        int n2 = 0b00000010100101000001111010011100;\n        \n        // Swap 16-bit halves\n        n2 = (n2 >>> 16) | (n2 << 16);\n        // Swap 8-bit halves\n        n2 = ((n2 & 0xFF00FF00) >>> 8) | ((n2 & 0x00FF00FF) << 8);\n        // Swap 4-bit halves\n        n2 = ((n2 & 0xF0F0F0F0) >>> 4) | ((n2 & 0x0F0F0F0F) << 4);\n        // Swap 2-bit halves\n        n2 = ((n2 & 0xCCCCCCCC) >>> 2) | ((n2 & 0x33333333) << 2);\n        // Swap 1-bit halves\n        n2 = ((n2 & 0xAAAAAAAA) >>> 1) | ((n2 & 0x55555555) << 1);\n        \n        System.out.println(\"Reversed (D&C): \" + n2);\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nReverse Bits Process:\");\n        System.out.println(\"Input:  00000010100101000001111010011100\");\n        System.out.println(\"Output: 00111001011110000010100101000000\");\n        System.out.println(\"(Read bits from right to left)\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "bit-manipulation"
    },
    {
        "id": "nc150-bit-manipulation-148_missing_number-1",
        "name": "Missing Number: XOR",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 148: Missing Number\n// ================================================\n// Given array containing n distinct numbers in range [0, n], return missing one.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // XOR all numbers and indices: missing number remains\n        int[] nums = {3, 0, 1};\n        int n = nums.length;\n        \n        int xor = n;  // Start with n (last index + 1)\n        for (int i = 0; i < n; i++) {\n            xor ^= i ^ nums[i];\n        }\n        \n        System.out.println(\"Missing Number (XOR): \" + xor);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "bit-manipulation"
    },
    {
        "id": "nc150-bit-manipulation-148_missing_number-2",
        "name": "Missing Number: Math (Sum)",
        "updatedAt": 1700000000001,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 148: Missing Number\n// ================================================\n// Given array containing n distinct numbers in range [0, n], return missing one.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums2 = {3, 0, 1};\n        int n2 = nums2.length;\n        \n        int expectedSum = n2 * (n2 + 1) / 2;\n        int actualSum = 0;\n        for (int num : nums2) {\n            actualSum += num;\n        }\n        \n        int missing = expectedSum - actualSum;\n        System.out.println(\"Missing Number (Sum): \" + missing);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "bit-manipulation"
    },
    {
        "id": "nc150-bit-manipulation-148_missing_number-3",
        "name": "Missing Number: HashSet",
        "updatedAt": 1700000000002,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 148: Missing Number\n// ================================================\n// Given array containing n distinct numbers in range [0, n], return missing one.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums3 = {3, 0, 1};\n        Set<Integer> set = new HashSet<>();\n        for (int num : nums3) {\n            set.add(num);\n        }\n        \n        int missing3 = -1;\n        for (int i = 0; i <= nums3.length; i++) {\n            if (!set.contains(i)) {\n                missing3 = i;\n                break;\n            }\n        }\n        \n        System.out.println(\"Missing Number (Set): \" + missing3);\n        \n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "bit-manipulation"
    },
    {
        "id": "nc150-bit-manipulation-148_missing_number-4",
        "name": "Missing Number: Sorting",
        "updatedAt": 1700000000003,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 148: Missing Number\n// ================================================\n// Given array containing n distinct numbers in range [0, n], return missing one.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int[] nums4 = {3, 0, 1};\n        Arrays.sort(nums4);\n        \n        int missing4 = nums4.length;\n        for (int i = 0; i < nums4.length; i++) {\n            if (nums4[i] != i) {\n                missing4 = i;\n                break;\n            }\n        }\n        \n        System.out.println(\"Missing Number (Sort): \" + missing4);\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "bit-manipulation"
    },
    {
        "id": "nc150-bit-manipulation-149_sum_two_integers-1",
        "name": "Sum Two Integers",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 149: Sum of Two Integers\n// ================================================\n// Calculate sum of two integers a and b without using + or -.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        // XOR gives sum without carry\n        // AND gives carry bits, shift left to add next iteration\n        \n        int a = 5, b = 3;\n        \n        while (b != 0) {\n            int carry = a & b;\n            a = a ^ b;      // Sum without carry\n            b = carry << 1; // Carry for next position\n        }\n        \n        System.out.println(\"Sum without + : \" + a);\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nFor a=5 (101), b=3 (011):\");\n        System.out.println(\"Step 1:\");\n        System.out.println(\"  carry = 101 & 011 = 001\");\n        System.out.println(\"  a = 101 ^ 011 = 110 (6)\");\n        System.out.println(\"  b = 001 << 1 = 010 (2)\");\n        System.out.println(\"Step 2:\");\n        System.out.println(\"  carry = 110 & 010 = 010\");\n        System.out.println(\"  a = 110 ^ 010 = 100 (4)\");\n        System.out.println(\"  b = 010 << 1 = 100 (4)\");\n        System.out.println(\"Step 3:\");\n        System.out.println(\"  carry = 100 & 100 = 100\");\n        System.out.println(\"  a = 100 ^ 100 = 000 (0)\");\n        System.out.println(\"  b = 100 << 1 = 1000 (8)\");\n        System.out.println(\"Step 4:\");\n        System.out.println(\"  carry = 0000 & 1000 = 0\");\n        System.out.println(\"  a = 0 ^ 8 = 8\");\n        System.out.println(\"  b = 0\");\n        System.out.println(\"Result: 8\");\n        \n        // ============================================\n        // Subtraction\n        // ============================================\n        System.out.println(\"\\nFor subtraction a - b:\");\n        System.out.println(\"Use getSum(a, getSum(~b, 1))\");\n        System.out.println(\"~b + 1 = -b (two's complement)\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "bit-manipulation"
    },
    {
        "id": "nc150-bit-manipulation-150_reverse_integer-1",
        "name": "Reverse Integer",
        "updatedAt": 1700000000000,
        "code": "import java.util.*;\nimport java.util.concurrent.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;\n\n// ================================================\n// Problem 150: Reverse Integer\n// ================================================\n// Given a 32-bit signed integer, return its reverse. Return 0 if overflow.\n\n\n\npublic class Main {\n    // Helper Methods\n    \n\n    public static void main(String[] args) {\n        int x = 123;\n        \n        int result = 0;\n        int num = x;\n        \n        while (num != 0) {\n            int digit = num % 10;\n            num /= 10;\n            \n            // Check overflow before adding\n            if (result > Integer.MAX_VALUE / 10 || \n                (result == Integer.MAX_VALUE / 10 && digit > 7)) {\n                result = 0;\n                break;\n            }\n            if (result < Integer.MIN_VALUE / 10 || \n                (result == Integer.MIN_VALUE / 10 && digit < -8)) {\n                result = 0;\n                break;\n            }\n            \n            result = result * 10 + digit;\n        }\n        \n        System.out.println(\"Reverse Integer: \" + result);\n        \n        // ============================================\n        // Approach using Long\n        // ============================================\n        int x2 = 123;\n        long rev = 0;\n        int num2 = x2;\n        \n        while (num2 != 0) {\n            rev = rev * 10 + num2 % 10;\n            num2 /= 10;\n        }\n        \n        int result2;\n        if (rev > Integer.MAX_VALUE || rev < Integer.MIN_VALUE) {\n            result2 = 0;\n        } else {\n            result2 = (int) rev;\n        }\n        \n        System.out.println(\"Reverse (Long): \" + result2);\n        \n        // ============================================\n        // Visualization\n        // ============================================\n        System.out.println(\"\\nFor x=123:\");\n        System.out.println(\"Step 1: digit=3, result=3\");\n        System.out.println(\"Step 2: digit=2, result=32\");\n        System.out.println(\"Step 3: digit=1, result=321\");\n        \n        System.out.println(\"\\nOverflow check:\");\n        System.out.println(\"INT_MAX = 2147483647\");\n        System.out.println(\"Before adding last digit, if result > 214748364, overflow\");\n        \n    }\n}\n",
        "language": "java",
        "visualizedVariables": [],
        "ignoredPointers": {},
        "folderId": "bit-manipulation"
    }
];
