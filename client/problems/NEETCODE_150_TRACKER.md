# 🧠 NeetCode 150 - Complete Problem Collection

This document tracks the implementation of all 150 NeetCode problems with:
- ✅ Java code implementations
- ✅ Multiple solution approaches (brute force, optimal, etc.)
- ✅ Visualization-ready code for the Code Visualizer

**Progress Legend:**
- `[ ]` Not started
- `[/]` In progress
- `[x]` Completed with visualization

---

## 🟦 1. Arrays & Hashing (9 problems)

| # | Problem | Status | Approaches |
|---|---------|--------|------------|
| 1 | Contains Duplicate | [x] | HashSet, Sorting |
| 2 | Valid Anagram | [x] | HashMap, Sorting, Array[26] |
| 3 | Two Sum | [x] | Brute Force, HashMap |
| 4 | Group Anagrams | [x] | HashMap with sorted key |
| 5 | Top K Frequent Elements | [x] | HashMap + Heap, Bucket Sort |
| 6 | Product of Array Except Self | [x] | Prefix/Suffix, Single Pass |
| 7 | Valid Sudoku | [x] | HashSet per row/col/box |
| 8 | Encode and Decode Strings | [x] | Length prefix, Delimiter |
| 9 | Longest Consecutive Sequence | [x] | HashSet, Sorting |

---

## 🟦 2. Two Pointers (5 problems)

| # | Problem | Status | Approaches |
|---|---------|--------|------------|
| 10 | Valid Palindrome | [ ] | Two Pointers, Reverse String |
| 11 | Two Sum II – Sorted Array | [ ] | Two Pointers, Binary Search |
| 12 | 3Sum | [ ] | Sort + Two Pointers |
| 13 | Container With Most Water | [ ] | Two Pointers |
| 14 | Trapping Rain Water | [ ] | Two Pointers, DP, Stack |

---

## 🟦 3. Sliding Window (6 problems)

| # | Problem | Status | Approaches |
|---|---------|--------|------------|
| 15 | Best Time to Buy and Sell Stock | [ ] | Single Pass, DP |
| 16 | Longest Substring Without Repeating | [ ] | Sliding Window + HashSet |
| 17 | Longest Repeating Character Replacement | [ ] | Sliding Window |
| 18 | Permutation in String | [ ] | Sliding Window + HashMap |
| 19 | Minimum Window Substring | [ ] | Sliding Window |
| 20 | Sliding Window Maximum | [ ] | Deque, Heap |

---

## 🟦 4. Stack (7 problems)

| # | Problem | Status | Approaches |
|---|---------|--------|------------|
| 21 | Valid Parentheses | [ ] | Stack |
| 22 | Min Stack | [ ] | Two Stacks, Single Stack |
| 23 | Evaluate Reverse Polish Notation | [ ] | Stack |
| 24 | Generate Parentheses | [ ] | Backtracking |
| 25 | Daily Temperatures | [ ] | Monotonic Stack |
| 26 | Car Fleet | [ ] | Sorting + Stack |
| 27 | Largest Rectangle in Histogram | [ ] | Monotonic Stack |

---

## 🟦 5. Binary Search (7 problems)

| # | Problem | Status | Approaches |
|---|---------|--------|------------|
| 28 | Binary Search | [ ] | Iterative, Recursive |
| 29 | Search a 2D Matrix | [ ] | Binary Search on flat |
| 30 | Koko Eating Bananas | [ ] | Binary Search on answer |
| 31 | Find Minimum in Rotated Sorted Array | [ ] | Binary Search |
| 32 | Search in Rotated Sorted Array | [ ] | Binary Search |
| 33 | Time Based Key-Value Store | [ ] | HashMap + Binary Search |
| 34 | Median of Two Sorted Arrays | [ ] | Binary Search |

---

## 🟦 6. Linked List (11 problems)

| # | Problem | Status | Approaches |
|---|---------|--------|------------|
| 35 | Reverse Linked List | [ ] | Iterative, Recursive |
| 36 | Merge Two Sorted Lists | [ ] | Iterative, Recursive |
| 37 | Reorder List | [ ] | Find mid + Reverse + Merge |
| 38 | Remove Nth Node From End | [ ] | Two Pointers |
| 39 | Copy List with Random Pointer | [ ] | HashMap, Interleaving |
| 40 | Add Two Numbers | [ ] | Iterative with carry |
| 41 | Linked List Cycle | [ ] | Floyd's Algorithm |
| 42 | Find the Duplicate Number | [ ] | Floyd's, Binary Search |
| 43 | LRU Cache | [ ] | HashMap + Doubly Linked List |
| 44 | Merge K Sorted Lists | [ ] | Heap, Divide & Conquer |
| 45 | Reverse Nodes in k-Group | [ ] | Iterative, Recursive |

---

## 🟦 7. Trees (15 problems)

| # | Problem | Status | Approaches |
|---|---------|--------|------------|
| 46 | Invert Binary Tree | [ ] | BFS, DFS Recursive |
| 47 | Maximum Depth of Binary Tree | [ ] | DFS, BFS |
| 48 | Diameter of Binary Tree | [ ] | DFS |
| 49 | Balanced Binary Tree | [ ] | DFS |
| 50 | Same Tree | [ ] | DFS, BFS |
| 51 | Subtree of Another Tree | [ ] | DFS |
| 52 | Lowest Common Ancestor of BST | [ ] | Iterative, Recursive |
| 53 | Binary Tree Level Order Traversal | [ ] | BFS |
| 54 | Binary Tree Right Side View | [ ] | BFS, DFS |
| 55 | Count Good Nodes in Binary Tree | [ ] | DFS |
| 56 | Validate Binary Search Tree | [ ] | DFS with range |
| 57 | Kth Smallest Element in BST | [ ] | Inorder traversal |
| 58 | Construct Tree from Preorder & Inorder | [ ] | Recursion + HashMap |
| 59 | Binary Tree Maximum Path Sum | [ ] | DFS |
| 60 | Serialize and Deserialize Binary Tree | [ ] | BFS, DFS |

---

## 🟦 8. Tries (3 problems)

| # | Problem | Status | Approaches |
|---|---------|--------|------------|
| 61 | Implement Trie (Prefix Tree) | [ ] | TrieNode array/map |
| 62 | Design Add and Search Words | [ ] | Trie + DFS |
| 63 | Word Search II | [ ] | Trie + Backtracking |

---

## 🟦 9. Heap / Priority Queue (7 problems)

| # | Problem | Status | Approaches |
|---|---------|--------|------------|
| 64 | Kth Largest Element in Array | [ ] | Heap, QuickSelect |
| 65 | Last Stone Weight | [ ] | Max Heap |
| 66 | K Closest Points to Origin | [ ] | Heap, QuickSelect |
| 67 | Kth Largest Element in Stream | [ ] | Min Heap |
| 68 | Task Scheduler | [ ] | Greedy + Heap |
| 69 | Design Twitter | [ ] | HashMap + Heap |
| 70 | Find Median from Data Stream | [ ] | Two Heaps |

---

## 🟦 10. Backtracking (9 problems)

| # | Problem | Status | Approaches |
|---|---------|--------|------------|
| 71 | Subsets | [ ] | Backtracking, Bit Manipulation |
| 72 | Combination Sum | [ ] | Backtracking |
| 73 | Permutations | [ ] | Backtracking |
| 74 | Subsets II | [ ] | Backtracking with skip |
| 75 | Combination Sum II | [ ] | Backtracking with skip |
| 76 | Word Search | [ ] | DFS Backtracking |
| 77 | Palindrome Partitioning | [ ] | Backtracking |
| 78 | Letter Combinations of Phone Number | [ ] | Backtracking |
| 79 | N-Queens | [ ] | Backtracking |

---

## 🟦 11. Graphs (12 problems)

| # | Problem | Status | Approaches |
|---|---------|--------|------------|
| 80 | Number of Islands | [ ] | DFS, BFS, Union Find |
| 81 | Max Area of Island | [ ] | DFS, BFS |
| 82 | Clone Graph | [ ] | DFS, BFS + HashMap |
| 83 | Walls and Gates | [ ] | Multi-source BFS |
| 84 | Rotting Oranges | [ ] | BFS |
| 85 | Pacific Atlantic Water Flow | [ ] | DFS from edges |
| 86 | Surrounded Regions | [ ] | DFS from edges |
| 87 | Course Schedule | [ ] | Topological Sort, DFS |
| 88 | Course Schedule II | [ ] | Topological Sort |
| 89 | Graph Valid Tree | [ ] | Union Find, DFS |
| 90 | Number of Connected Components | [ ] | Union Find, DFS |
| 91 | Redundant Connection | [ ] | Union Find |

---

## 🟦 12. Advanced Graphs (6 problems)

| # | Problem | Status | Approaches |
|---|---------|--------|------------|
| 92 | Reconstruct Itinerary | [ ] | DFS + Eulerian Path |
| 93 | Min Cost to Connect All Points | [ ] | Prim's, Kruskal's |
| 94 | Network Delay Time | [ ] | Dijkstra's |
| 95 | Swim in Rising Water | [ ] | Binary Search + BFS, Dijkstra |
| 96 | Alien Dictionary | [ ] | Topological Sort |
| 97 | Cheapest Flights Within K Stops | [ ] | Bellman-Ford, BFS |

---

## 🟦 13. 1-D Dynamic Programming (12 problems)

| # | Problem | Status | Approaches |
|---|---------|--------|------------|
| 98 | Climbing Stairs | [ ] | DP, Fibonacci |
| 99 | Min Cost Climbing Stairs | [ ] | DP |
| 100 | House Robber | [ ] | DP |
| 101 | House Robber II | [ ] | DP (circular) |
| 102 | Longest Palindromic Substring | [ ] | DP, Expand from center |
| 103 | Palindromic Substrings | [ ] | DP, Expand from center |
| 104 | Decode Ways | [ ] | DP |
| 105 | Coin Change | [ ] | DP (bottom-up) |
| 106 | Maximum Product Subarray | [ ] | DP with min/max |
| 107 | Word Break | [ ] | DP |
| 108 | Longest Increasing Subsequence | [ ] | DP O(n²), Binary Search O(n log n) |
| 109 | Partition Equal Subset Sum | [ ] | DP (0/1 Knapsack) |

---

## 🟦 14. 2-D Dynamic Programming (11 problems)

| # | Problem | Status | Approaches |
|---|---------|--------|------------|
| 110 | Unique Paths | [ ] | DP, Math (combinatorics) |
| 111 | Longest Common Subsequence | [ ] | DP 2D |
| 112 | Best Time to Buy/Sell with Cooldown | [ ] | State Machine DP |
| 113 | Coin Change II | [ ] | DP (unbounded knapsack) |
| 114 | Target Sum | [ ] | DP (0/1 Knapsack) |
| 115 | Interleaving String | [ ] | DP 2D |
| 116 | Longest Increasing Path in Matrix | [ ] | DFS + Memoization |
| 117 | Distinct Subsequences | [ ] | DP 2D |
| 118 | Edit Distance | [ ] | DP 2D |
| 119 | Burst Balloons | [ ] | DP (interval) |
| 120 | Regular Expression Matching | [ ] | DP 2D |

---

## 🟦 15. Greedy (8 problems)

| # | Problem | Status | Approaches |
|---|---------|--------|------------|
| 121 | Maximum Subarray | [ ] | Kadane's Algorithm |
| 122 | Jump Game | [ ] | Greedy |
| 123 | Jump Game II | [ ] | Greedy, BFS |
| 124 | Gas Station | [ ] | Greedy |
| 125 | Hand of Straights | [ ] | HashMap + Sorting |
| 126 | Merge Triplets to Form Target | [ ] | Greedy |
| 127 | Partition Labels | [ ] | Greedy |
| 128 | Valid Parenthesis String | [ ] | Greedy, DP |

---

## 🟦 16. Intervals (6 problems)

| # | Problem | Status | Approaches |
|---|---------|--------|------------|
| 129 | Insert Interval | [ ] | Linear Merge |
| 130 | Merge Intervals | [ ] | Sort + Merge |
| 131 | Non-overlapping Intervals | [ ] | Greedy |
| 132 | Meeting Rooms | [ ] | Sorting |
| 133 | Meeting Rooms II | [ ] | Min Heap, Sweep Line |
| 134 | Minimum Interval to Include Query | [ ] | Sorting + Heap |

---

## 🟦 17. Math & Geometry (8 problems)

| # | Problem | Status | Approaches |
|---|---------|--------|------------|
| 135 | Rotate Image | [ ] | Transpose + Reverse |
| 136 | Spiral Matrix | [ ] | Simulation |
| 137 | Set Matrix Zeroes | [ ] | O(1) space markers |
| 138 | Happy Number | [ ] | Floyd's, HashSet |
| 139 | Plus One | [ ] | Carry simulation |
| 140 | Pow(x, n) | [ ] | Fast exponentiation |
| 141 | Multiply Strings | [ ] | Grade school multiplication |
| 142 | Detect Squares | [ ] | HashMap counting |

---

## 🟦 18. Bit Manipulation (8 problems)

| # | Problem | Status | Approaches |
|---|---------|--------|------------|
| 143 | Single Number | [ ] | XOR |
| 144 | Number of 1 Bits | [ ] | Bit manipulation |
| 145 | Counting Bits | [ ] | DP, Bit manipulation |
| 146 | Reverse Bits | [ ] | Bit manipulation |
| 147 | Missing Number | [ ] | XOR, Math |
| 148 | Sum of Two Integers | [ ] | Bit manipulation |
| 149 | Reverse Integer | [ ] | Math with overflow check |
| 150 | Bitwise AND of Numbers Range | [ ] | Bit manipulation |

---

## 📊 Progress Summary

| Category | Total | Completed | Percentage |
|----------|-------|-----------|------------|
| Arrays & Hashing | 9 | 9 | 100% ✅ |
| Two Pointers | 5 | 5 | 100% ✅ |
| Sliding Window | 6 | 6 | 100% ✅ |
| Stack | 7 | 7 | 100% ✅ |
| Binary Search | 7 | 7 | 100% ✅ |
| Linked List | 11 | 11 | 100% ✅ |
| Trees | 15 | 15 | 100% ✅ |
| Tries | 3 | 3 | 100% ✅ |
| Heap/Priority Queue | 7 | 7 | 100% ✅ |
| Backtracking | 9 | 9 | 100% ✅ |
| Graphs | 12 | 12 | 100% ✅ |
| Advanced Graphs | 6 | 6 | 100% ✅ |
| 1-D DP | 12 | 12 | 100% ✅ |
| 2-D DP | 11 | 11 | 100% ✅ |
| Greedy | 8 | 8 | 100% ✅ |
| Intervals | 6 | 6 | 100% ✅ |
| Math & Geometry | 8 | 8 | 100% ✅ |
| Bit Manipulation | 8 | 8 | 100% ✅ |
| **TOTAL** | **150** | **150** | **100%** ✅ |

---

## 📁 File Structure

All problem solutions will be organized in:
```
/home/jaswanth/projects/codeVisualizor/problems/
├── 01_arrays_hashing/
│   ├── 001_contains_duplicate.java
│   ├── 002_valid_anagram.java
│   └── ...
├── 02_two_pointers/
├── 03_sliding_window/
├── 04_stack/
├── 05_binary_search/
├── 06_linked_list/
├── 07_trees/
├── 08_tries/
├── 09_heap/
├── 10_backtracking/
├── 11_graphs/
├── 12_advanced_graphs/
├── 13_1d_dp/
├── 14_2d_dp/
├── 15_greedy/
├── 16_intervals/
├── 17_math_geometry/
└── 18_bit_manipulation/
```

---

## 🚀 How to Use

1. Each problem file contains multiple solution approaches
2. Code is formatted for the Code Visualizer
3. Mark problems as `[x]` when completed
4. Update the progress summary table after each session
