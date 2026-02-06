const googleTrends = require('google-trends-api');

const keyword = 'Claude Cowork';

console.log(`[TrendProbe] Searching for: "${keyword}" on YouTube (Last 7 days, Category: Tech)`);

// User's embed parameters:
// cat=5 (Computers & Electronics)
// date=now 7-d
// gprop=youtube
// q=Claude Cowork

googleTrends.relatedQueries({
  keyword: keyword,
  startTime: new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)), // Last 7 days
  property: 'youtube',
  category: 5, 
})
.then(results => {
  try {
    const data = JSON.parse(results);
    const ranked = data.default.rankedList;
    
    console.log("\n--- Top Related Queries ---\n");
    ranked.forEach(list => {
      console.log(`[${list.headline}]`);
      list.rankedKeyword.forEach((item, index) => {
        console.log(`${index + 1}. ${item.query} (Value: ${item.value})`);
      });
      console.log("");
    });

  } catch (e) {
    console.error("Error parsing JSON:", e);
    console.log("Raw output:", results);
  }
})
.catch(err => {
  console.error('API Error:', err);
});
