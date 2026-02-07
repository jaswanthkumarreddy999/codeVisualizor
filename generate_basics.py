
import os

BASE_DIR = "problems/00_basics"

CATEGORIES = {
    "01_input_output": [
        ("01_hello_world", "Print Hello World", 'class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}'),
        ("02_input_integer", "Take Integer Input", 'import java.util.Scanner;\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print("Enter an integer: ");\n        if (sc.hasNextInt()) {\n            int num = sc.nextInt();\n            System.out.println("You entered: " + num);\n        }\n    }\n}'),
        ("03_sum_two_numbers", "Sum of Two Numbers", 'import java.util.Scanner;\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = 10;\n        int b = 20;\n        System.out.println("Sum: " + (a + b));\n    }\n}'),
        ("04_arithmetic_ops", "Arithmetic Operations", 'class Main {\n    public static void main(String[] args) {\n        int a = 20, b = 5;\n        System.out.println("Sum: " + (a + b));\n        System.out.println("Difference: " + (a - b));\n        System.out.println("Product: " + (a * b));\n        System.out.println("Quotient: " + (a / b));\n    }\n}'),
        ("05_name_age", "Name and Age Format", 'class Main {\n    public static void main(String[] args) {\n        String name = "Alice";\n        int age = 25;\n        System.out.println("My name is " + name + " and I am " + age + " years old.");\n    }\n}')
    ],
    "02_data_types": [
        ("01_declare_print", "Declare and Print Variables", 'class Main {\n    public static void main(String[] args) {\n        int i = 10;\n        float f = 20.5f;\n        char c = \'A\';\n        String s = "Hello";\n        System.out.println(i + "\\n" + f + "\\n" + c + "\\n" + s);\n    }\n}'),
        ("02_size_of", "Size of Data Types", 'class Main {\n    public static void main(String[] args) {\n        System.out.println("Size of int: " + (Integer.SIZE / 8) + " bytes");\n        System.out.println("Size of float: " + (Float.SIZE / 8) + " bytes");\n        System.out.println("Size of char: " + (Character.SIZE / 8) + " bytes");\n    }\n}'),
        ("03_int_to_float", "Convert Int to Float", 'class Main {\n    public static void main(String[] args) {\n        int i = 100;\n        float f = i;\n        System.out.println("Int: " + i + ", Float: " + f);\n    }\n}'),
        ("04_char_to_int", "Convert Char to Int (ASCII)", 'class Main {\n    public static void main(String[] args) {\n        char c = \'A\';\n        int ascii = (int) c;\n        System.out.println("Char: " + c + ", ASCII: " + ascii);\n    }\n}'),
        ("05_swap_vars", "Swap Two Numbers", 'class Main {\n    public static void main(String[] args) {\n        int a = 5, b = 10;\n        System.out.println("Before: a=" + a + ", b=" + b);\n        int temp = a;\n        a = b;\n        b = temp;\n        System.out.println("After: a=" + a + ", b=" + b);\n    }\n}')
    ],
    "03_conditionals": [
        ("01_even_odd", "Check Even or Odd", 'class Main {\n    public static void main(String[] args) {\n        int num = 7;\n        if (num % 2 == 0) System.out.println(num + " is Even");\n        else System.out.println(num + " is Odd");\n    }\n}'),
        ("02_pos_neg", "Positive Negative Zero", 'class Main {\n    public static void main(String[] args) {\n        int num = -5;\n        if (num > 0) System.out.println("Positive");\n        else if (num < 0) System.out.println("Negative");\n        else System.out.println("Zero");\n    }\n}'),
        ("03_largest_two", "Largest of Two", 'class Main {\n    public static void main(String[] args) {\n        int a = 10, b = 25;\n        if (a > b) System.out.println(a + " is larger");\n        else System.out.println(b + " is larger");\n    }\n}'),
        ("04_largest_three", "Largest of Three", 'class Main {\n    public static void main(String[] args) {\n        int a = 10, b = 25, c = 15;\n        int max = a;\n        if (b > max) max = b;\n        if (c > max) max = c;\n        System.out.println("Largest: " + max);\n    }\n}'),
        ("05_leap_year", "Check Leap Year", 'class Main {\n    public static void main(String[] args) {\n        int year = 2024;\n        boolean isLeap = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);\n        System.out.println(year + " is leap year? " + isLeap);\n    }\n}')
    ],
    "04_loops": [
        ("01_1_to_n", "Print 1 to N", 'class Main {\n    public static void main(String[] args) {\n        int n = 5;\n        for(int i=1; i<=n; i++) System.out.print(i + " ");\n        System.out.println();\n    }\n}'),
        ("02_n_to_1", "Print N to 1", 'class Main {\n    public static void main(String[] args) {\n        int n = 5;\n        for(int i=n; i>=1; i--) System.out.print(i + " ");\n        System.out.println();\n    }\n}'),
        ("03_even_upto_n", "Print Even Numbers", 'class Main {\n    public static void main(String[] args) {\n        int n = 10;\n        for(int i=1; i<=n; i++) {\n            if(i % 2 == 0) System.out.print(i + " ");\n        }\n        System.out.println();\n    }\n}'),
        ("04_sum_upto_n", "Sum of First N Numbers", 'class Main {\n    public static void main(String[] args) {\n        int n = 5;\n        int sum = 0;\n        for(int i=1; i<=n; i++) sum += i;\n        System.out.println("Sum: " + sum);\n    }\n}'),
        ("05_multiplication_table", "Multiplication Table", 'class Main {\n    public static void main(String[] args) {\n        int num = 5;\n        for(int i=1; i<=10; i++) System.out.println(num + " x " + i + " = " + (num*i));\n    }\n}')
    ],
    "05_basic_math": [
        ("01_factorial", "Find Factorial", 'class Main {\n    public static void main(String[] args) {\n        int n = 5;\n        long fact = 1;\n        for(int i=1; i<=n; i++) fact *= i;\n        System.out.println("Factorial of " + n + ": " + fact);\n    }\n}'),
        ("02_check_prime", "Check Prime Number", 'class Main {\n    public static void main(String[] args) {\n        int n = 17;\n        boolean isPrime = true;\n        if (n <= 1) isPrime = false;\n        for (int i=2; i*i<=n; i++) {\n            if (n % i == 0) {\n                isPrime = false;\n                break;\n            }\n        }\n        System.out.println(n + " is Prime? " + isPrime);\n    }\n}'),
        ("03_primes_upto_n", "Primes up to N", 'class Main {\n    public static void main(String[] args) {\n        int n = 20;\n        System.out.print("Primes: ");\n        for (int i=2; i<=n; i++) {\n            boolean p = true;\n            for (int j=2; j*j<=i; j++) if (i%j==0) { p=false; break; }\n            if (p) System.out.print(i + " ");\n        }\n        System.out.println();\n    }\n}'),
        ("04_count_digits", "Count Digits", 'class Main {\n    public static void main(String[] args) {\n        int n = 12345;\n        int count = 0;\n        int temp = n;\n        while(temp != 0) {\n            temp /= 10;\n            count++;\n        }\n        System.out.println("Digits in " + n + ": " + count);\n    }\n}'),
        ("05_reverse_number", "Reverse Number", 'class Main {\n    public static void main(String[] args) {\n        int n = 1234;\n        int rev = 0;\n        while(n != 0) {\n            rev = rev * 10 + n % 10;\n            n /= 10;\n        }\n        System.out.println("Reversed: " + rev);\n    }\n}')
    ],
    "06_ascii_chars": [
        ("01_ascii_val", "Print ASCII Value", 'class Main {\n    public static void main(String[] args) {\n        char c = \'a\';\n        System.out.println("ASCII of " + c + ": " + (int)c);\n    }\n}'),
        ("02_a_to_z", "Print A to Z", 'class Main {\n    public static void main(String[] args) {\n        for(char c=\'A\'; c<=\'Z\'; c++) System.out.print(c + " ");\n        System.out.println();\n    }\n}'),
        ("03_vowel_consonant", "Check Vowel or Consonant", 'class Main {\n    public static void main(String[] args) {\n        char c = \'e\';\n        String vowels = "aeiouAEIOU";\n        if (vowels.indexOf(c) != -1) System.out.println(c + " is Vowel");\n        else System.out.println(c + " is Consonant");\n    }\n}'),
        ("04_digit_alpha", "Digit or Alphabet", 'class Main {\n    public static void main(String[] args) {\n        char c = \'5\';\n        if (Character.isDigit(c)) System.out.println("Digit");\n        else if (Character.isLetter(c)) System.out.println("Alphabet");\n        else System.out.println("Other");\n    }\n}'),
        ("05_lower_upper", "Lowercase to Uppercase", 'class Main {\n    public static void main(String[] args) {\n        char c = \'b\';\n        System.out.println("Upper: " + Character.toUpperCase(c));\n    }\n}')
    ],
    "07_functions": [
        ("01_add_func", "Function Add Two Numbers", 'class Main {\n    static int add(int a, int b) { return a + b; }\n    public static void main(String[] args) {\n        System.out.println("Sum: " + add(5, 7));\n    }\n}'),
        ("02_even_odd_func", "Function Check Even/Odd", 'class Main {\n    static boolean isEven(int n) { return n % 2 == 0; }\n    public static void main(String[] args) {\n        System.out.println("Is 4 even? " + isEven(4));\n    }\n}'),
        ("03_fact_func", "Function Factorial", 'class Main {\n    static long factorial(int n) {\n        if (n <= 1) return 1;\n        return n * factorial(n - 1);\n    }\n    public static void main(String[] args) {\n        System.out.println("5! = " + factorial(5));\n    }\n}'),
        ("04_prime_func", "Function Check Prime", 'class Main {\n    static boolean isPrime(int n) {\n        if(n<=1) return false;\n        for(int i=2;i*i<=n;i++) if(n%i==0) return false;\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println("Is 7 prime? " + isPrime(7));\n    }\n}'),
        ("05_max_func", "Function Max of Three", 'class Main {\n    static int max(int a, int b, int c) {\n        return Math.max(a, Math.max(b, c));\n    }\n    public static void main(String[] args) {\n        System.out.println("Max: " + max(10, 5, 20));\n    }\n}')
    ],
    "08_arrays": [
        ("01_print_array", "Print Array Elements", 'class Main {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5};\n        for(int x : arr) System.out.print(x + " ");\n        System.out.println();\n    }\n}'),
        ("02_sum_array", "Sum of Array", 'class Main {\n    public static void main(String[] args) {\n        int[] arr = {10, 20, 30};\n        int sum = 0;\n        for(int x : arr) sum += x;\n        System.out.println("Sum: " + sum);\n    }\n}'),
        ("03_largest_element", "Largest Element", 'class Main {\n    public static void main(String[] args) {\n        int[] arr = {5, 12, 3, 9, 2};\n        int max = arr[0];\n        for(int x : arr) if(x > max) max = x;\n        System.out.println("Max: " + max);\n    }\n}'),
        ("04_smallest_element", "Smallest Element", 'class Main {\n    public static void main(String[] args) {\n        int[] arr = {5, 12, 3, 9, 2};\n        int min = arr[0];\n        for(int x : arr) if(x < min) min = x;\n        System.out.println("Min: " + min);\n    }\n}'),
        ("05_count_even_odd", "Count Even Odd", 'class Main {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5, 6};\n        int even = 0, odd = 0;\n        for(int x : arr) {\n            if(x % 2 == 0) even++; else odd++;\n        }\n        System.out.println("Evens: " + even + ", Odds: " + odd);\n    }\n}')
    ],
    "09_strings": [
        ("01_print_string", "Read and Print String", 'class Main {\n    public static void main(String[] args) {\n        String s = "Hello World";\n        System.out.println(s);\n    }\n}'),
        ("02_string_len", "Length of String", 'class Main {\n    public static void main(String[] args) {\n        String s = "CodeVisualizor";\n        System.out.println("Length: " + s.length());\n    }\n}'),
        ("03_count_vowels", "Count Vowels", 'class Main {\n    public static void main(String[] args) {\n        String s = "Programming";\n        int count = 0;\n        String vowels = "aeiouAEIOU";\n        for(char c : s.toCharArray()) {\n            if(vowels.indexOf(c) != -1) count++;\n        }\n        System.out.println("Vowels: " + count);\n    }\n}'),
        ("04_reverse_string", "Reverse String", 'class Main {\n    public static void main(String[] args) {\n        String s = "Java";\n        String rev = new StringBuilder(s).reverse().toString();\n        System.out.println("Reversed: " + rev);\n    }\n}'),
        ("05_palindrome", "Check Palindrome", 'class Main {\n    public static void main(String[] args) {\n        String s = "madam";\n        String rev = new StringBuilder(s).reverse().toString();\n        System.out.println("Palindrome? " + s.equals(rev));\n    }\n}')
    ],
    "10_mixed": [
        ("01_star_pattern", "Star Triangle", 'class Main {\n    public static void main(String[] args) {\n        int n = 5;\n        for(int i=1; i<=n; i++) {\n            for(int j=1; j<=i; j++) System.out.print("* ");\n            System.out.println();\n        }\n    }\n}'),
        ("02_simple_interest", "Calculate Simple Interest", 'class Main {\n    public static void main(String[] args) {\n        double p = 1000, r = 5, t = 2;\n        double si = (p * r * t) / 100;\n        System.out.println("Simple Interest: " + si);\n    }\n}'),
        ("03_area_circle", "Area of Circle", 'class Main {\n    public static void main(String[] args) {\n        double r = 7;\n        double area = Math.PI * r * r;\n        System.out.println("Area: " + area);\n    }\n}'),
        ("04_armstrong", "Check Armstrong Number", 'class Main {\n    public static void main(String[] args) {\n        int n = 153;\n        int sum = 0, temp = n;\n        while(temp > 0) {\n            int d = temp % 10;\n            sum += d * d * d;\n            temp /= 10;\n        }\n        if(sum == n) System.out.println(n + " is Armstrong");\n        else System.out.println(n + " is not Armstrong");\n    }\n}'),
        ("05_fibonacci", "Fibonacci Series", 'class Main {\n    public static void main(String[] args) {\n        int n = 10;\n        int a = 0, b = 1;\n        System.out.print(a + " " + b + " ");\n        for(int i=2; i<n; i++) {\n            int next = a + b;\n            System.out.print(next + " ");\n            a = b;\n            b = next;\n        }\n        System.out.println();\n    }\n}')
    ]
}

def generate():
    for cat_folder, problems in CATEGORIES.items():
        cat_path = os.path.join(BASE_DIR, cat_folder)
        os.makedirs(cat_path, exist_ok=True)
        
        for p_name, p_title, p_code in problems:
            
            # Format as full problem file
            full_content = f"""
// ================================================
// {p_title}
// ================================================

{p_code}
"""
            file_path = os.path.join(cat_path, f"{p_name}.java")
            with open(file_path, "w") as f:
                f.write(full_content)
    
    print(f"Generated {sum(len(p) for p in CATEGORIES.values())} basic problems.")

if __name__ == "__main__":
    generate()
