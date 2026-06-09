// ================================================
// Problem 69: Design Twitter
// ================================================
// Design a simplified version of Twitter with post, follow, getNewsFeed.

// ============================================
// APPROACH 1: HashMap + Set + PriorityQueue - O(n log k) getNewsFeed ⭐ OPTIMAL
// ============================================
System.out.println("Design Twitter:");

/*
class Twitter {
    private Map<Integer, Set<Integer>> follows;    // userId -> set of followees
    private Map<Integer, List<int[]>> tweets;      // userId -> list of [time, tweetId]
    private int timestamp;
    
    public Twitter() {
        follows = new HashMap<>();
        tweets = new HashMap<>();
        timestamp = 0;
    }
    
    // O(1)
    public void postTweet(int userId, int tweetId) {
        tweets.computeIfAbsent(userId, k -> new ArrayList<>()).add(new int[]{timestamp++, tweetId});
    }
    
    // O(n log 10) where n = total tweets from followees
    public List<Integer> getNewsFeed(int userId) {
        // Max heap: [time, tweetId, userId, tweetIndex]
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> b[0] - a[0]);
        
        // Add user's own tweets
        Set<Integer> followees = follows.getOrDefault(userId, new HashSet<>());
        followees.add(userId);  // Include self
        
        for (int followeeId : followees) {
            List<int[]> userTweets = tweets.get(followeeId);
            if (userTweets != null && !userTweets.isEmpty()) {
                int idx = userTweets.size() - 1;
                int[] tweet = userTweets.get(idx);
                heap.offer(new int[]{tweet[0], tweet[1], followeeId, idx});
            }
        }
        
        List<Integer> feed = new ArrayList<>();
        while (!heap.isEmpty() && feed.size() < 10) {
            int[] top = heap.poll();
            feed.add(top[1]);
            
            int idx = top[3] - 1;
            if (idx >= 0) {
                int[] prevTweet = tweets.get(top[2]).get(idx);
                heap.offer(new int[]{prevTweet[0], prevTweet[1], top[2], idx});
            }
        }
        
        return feed;
    }
    
    // O(1)
    public void follow(int followerId, int followeeId) {
        follows.computeIfAbsent(followerId, k -> new HashSet<>()).add(followeeId);
    }
    
    // O(1)
    public void unfollow(int followerId, int followeeId) {
        if (follows.containsKey(followerId)) {
            follows.get(followerId).remove(followeeId);
        }
    }
}
*/

System.out.println("Data Structures:");
System.out.println("- HashMap<userId, Set<followeeId>> for follows");
System.out.println("- HashMap<userId, List<[time, tweetId]>> for tweets");
System.out.println("- PriorityQueue for merging k sorted lists (news feed)");
