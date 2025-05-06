import  { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, ThumbsUp, Share } from 'lucide-react';

// Mock tips data
const tipsData = [
  {
    id: '1',
    title: 'When is the Best Time to Buy a New Smartphone?',
    content: `
      <p>Buying a new smartphone is a significant investment, and timing your purchase right can save you a substantial amount of money. Here's our comprehensive guide on when to buy to get the best deals.</p>
      
      <h3>The Release Cycle</h3>
      <p>Most major smartphone manufacturers follow a predictable annual release cycle. Apple typically releases new iPhones in September, Samsung launches its Galaxy S series in February/March and its Note series in August, and Google releases its Pixel phones in October.</p>
      
      <p>Understanding these cycles is crucial because prices of previous models typically drop by 15-20% soon after a new model is announced. For example, when the iPhone 15 was released, the iPhone 14 saw immediate price drops across retailers.</p>
      
      <h3>Best Times of Year</h3>
      <ul>
        <li><strong>Festival Season (October-November)</strong>: Diwali sales offer some of the best smartphone deals in India, with discounts ranging from 10-30% on even relatively new models.</li>
        <li><strong>January</strong>: Republic Day sales often feature excellent smartphone deals.</li>
        <li><strong>May/June</strong>: Pre-GST sales sometimes offer good value.</li>
        <li><strong>Amazon/Flipkart Sale Events</strong>: Big Billion Days, Great Indian Festival, and similar events often feature smartphone flash sales with significant discounts.</li>
      </ul>
      
      <h3>Day of the Week Matters</h3>
      <p>Research shows that many online retailers refresh their deals on Mondays and Thursdays. Setting price alerts for smartphones you're interested in and checking prices on these days can sometimes yield surprising savings.</p>
      
      <h3>Wait for the Right Moment</h3>
      <p>Using SmartPriceCompare's price history tools can help you determine if the current price is actually a good deal or just marketing hype. Our data shows that smartphone prices fluctuate by an average of 12% throughout the year, so timing is everything.</p>
      
      <h3>Bottom Line</h3>
      <p>The best time to buy a smartphone is generally:</p>
      <ol>
        <li>2-3 months after a new model release (for the previous generation)</li>
        <li>During major festival sales</li>
        <li>When our price history shows the model is at a historical low price</li>
      </ol>
      
      <p>Set up price alerts on SmartPriceCompare to be notified when the smartphone you want hits your target price!</p>
    `,
    date: 'Nov 5, 2023',
    readTime: '6 min',
    author: 'Priya Sharma',
    helpful: 94,
    image: 'https://images.unsplash.com/photo-1571867424488-4565932edb41?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwZWxlY3Ryb25pY3MlMjBzaG9wcGluZ3xlbnwwfHx8fDE3NDYxMDM4ODJ8MA&ixlib=rb-4.0.3'
  },
  {
    id: '2',
    title: 'How to Use Price History Tools to Save Money',
    content: `
      <p>Have you ever purchased a product only to discover it was available at a much lower price just a few weeks earlier? Price history tools can help you avoid this frustrating experience and ensure you're getting the best deal possible.</p>
      
      <h3>What are Price History Tools?</h3>
      <p>Price history tools track the price changes of products over time across multiple retailers. By examining this historical data, you can determine whether the current "deal" is actually a good price or just clever marketing.</p>
      
      <h3>How to Use Price History Data Effectively</h3>
      
      <h4>1. Identify Price Patterns</h4>
      <p>Many products follow predictable pricing patterns. For example, TVs often see their lowest prices just before and after major sporting events, while laptops frequently go on sale during back-to-school periods. By examining price history charts, you can identify these patterns and time your purchases accordingly.</p>
      
      <h4>2. Set Realistic Price Targets</h4>
      <p>Price history data helps you set realistic expectations. If you see that a product has never dropped below ₹50,000 in the past year, waiting for it to hit ₹40,000 might be unrealistic. Conversely, if you see it regularly drops to ₹45,000 during sales, you know to wait for that price point.</p>
      
      <h4>3. Evaluate "Sale" Claims</h4>
      <p>Retailers often advertise discounts based on inflated "list prices" that the product rarely actually sells for. Price history tools let you see the actual typical selling price, helping you determine if a "50% off" sale is truly a good deal.</p>
      
      <h4>4. Track Multiple Retailers</h4>
      <p>The best price history tools (like SmartPriceCompare) track prices across multiple retailers, not just one. This comprehensive view ensures you're seeing the true best price available.</p>
      
      <h3>Using SmartPriceCompare's Price History Features</h3>
      
      <p>SmartPriceCompare offers several powerful price history features:</p>
      
      <ul>
        <li><strong>Price History Charts</strong>: View detailed price trends over time for any product across multiple retailers.</li>
        <li><strong>Price Drop Alerts</strong>: Set your desired price and receive notifications when a product drops to that level.</li>
        <li><strong>Historical Low Indicators</strong>: Easily see if the current price is at, near, or far from the historical lowest price.</li>
        <li><strong>Sale Analysis</strong>: Our algorithms determine if a current "sale" is actually a good deal based on historical pricing.</li>
      </ul>
      
      <h3>Bottom Line</h3>
      <p>Price history tools are one of the most powerful weapons in a smart shopper's arsenal. By understanding how prices have fluctuated in the past, you can make more informed purchasing decisions and avoid falling for deceptive marketing tactics.</p>
      
      <p>Next time you're considering a major purchase, take a few moments to check its price history on SmartPriceCompare. You might discover that waiting just a few weeks could save you thousands of rupees!</p>
    `,
    date: 'Oct 22, 2023',
    readTime: '8 min',
    author: 'Rajesh Kumar',
    helpful: 88,
    image: 'https://images.unsplash.com/photo-1592826719120-5676cd23c1cb?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxzbWFydHBob25lJTIwZWxlY3Ryb25pY3MlMjBzaG9wcGluZ3xlbnwwfHx8fDE3NDYxMDM4ODJ8MA&ixlib=rb-4.0.3'
  },
  {
    id: '3',
    title: 'How to Spot Fake Reviews and Ratings Online',
    content: `
      <p>In today's online shopping environment, customer reviews play a crucial role in purchase decisions. However, not all reviews are genuine. Learning to identify fake reviews can help you make better informed purchasing decisions.</p>
      
      <h3>Why Fake Reviews Are a Problem</h3>
      <p>Studies suggest that up to 30% of online reviews may be fake. These deceptive reviews can lead consumers to purchase inferior products or pay premium prices for items that don't deliver as promised.</p>
      
      <h3>Red Flags That Indicate Fake Reviews</h3>
      
      <h4>1. Unnatural Language Patterns</h4>
      <p>Fake reviews often contain awkward phrasing, unusual word choices, or repetitive language. Genuine reviews typically use natural, conversational language with specific details about the product experience.</p>
      
      <h4>2. Extreme Sentiment</h4>
      <p>Be wary of reviews that are overly enthusiastic without providing specific details. Phrases like "best product ever" or "changed my life" without explaining how or why should raise suspicion, especially if there are multiple reviews with similar language.</p>
      
      <h4>3. Suspicious Timing Patterns</h4>
      <p>A sudden influx of positive reviews in a short timeframe (especially after a period of negative reviews) often indicates a coordinated effort to improve a product's rating. Authentic reviews typically appear at a more steady, natural pace.</p>
      
      <h4>4. Reviewer Profile Clues</h4>
      <p>Check the reviewer's profile. Suspicious signs include:</p>
      <ul>
        <li>New accounts with only a few reviews</li>
        <li>Accounts that have reviewed multiple products from the same brand</li>
        <li>Reviewers who have only given 5-star or 1-star ratings</li>
        <li>Multiple reviews posted on the same day</li>
      </ul>
      
      <h4>5. Vague Content</h4>
      <p>Genuine reviews typically include specific details about the product and the customer's experience. Fake reviews often remain vague and focus on general features rather than actual usage experience.</p>
      
      <h3>Tools and Strategies to Identify Authentic Reviews</h3>
      
      <h4>1. Use Review Analysis Tools</h4>
      <p>SmartPriceCompare's review aggregation feature collects reviews from multiple platforms and uses AI algorithms to flag potentially fake reviews, giving you a more reliable overview of product quality.</p>
      
      <h4>2. Focus on Mid-Range Reviews</h4>
      <p>3-star and 4-star reviews often provide the most balanced and honest assessment of products, highlighting both pros and cons. These reviews are also less likely to be fake since they don't serve the purpose of artificially inflating or deflating ratings.</p>
      
      <h4>3. Look for Verified Purchase Labels</h4>
      <p>Reviews marked as "Verified Purchase" are more likely to be genuine since they come from customers who actually bought the product through that platform.</p>
      
      <h4>4. Check Multiple Sources</h4>
      <p>Don't rely on reviews from a single platform. Check multiple retailers, expert review sites, and social media to get a comprehensive picture of product performance.</p>
      
      <h3>Bottom Line</h3>
      <p>By taking the time to critically evaluate online reviews, you can make more informed purchasing decisions. Remember that the goal isn't to find perfect products with only positive reviews (these likely don't exist), but rather to get an accurate understanding of a product's strengths and weaknesses.</p>
      
      <p>SmartPriceCompare helps by aggregating reviews from multiple sources and highlighting the most helpful and authentic feedback, saving you time while ensuring you get reliable information before making a purchase.</p>
    `,
    date: 'Sep 15, 2023',
    readTime: '5 min',
    author: 'Ananya Desai',
    helpful: 91,
    image: 'https://images.unsplash.com/photo-1737617687161-39a848fc0231?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw2fHxzbWFydHBob25lJTIwZWxlY3Ryb25pY3MlMjBzaG9wcGluZ3xlbnwwfHx8fDE3NDYxMDM4ODJ8MA&ixlib=rb-4.0.3'
  }
];

const TipDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the tip by id
  const tip = tipsData.find(tip => tip.id === id);
  
  if (!tip) {
    return (
      <div className="container-custom py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Tip Not Found</h2>
        <p className="text-gray-600 mb-6">The shopping tip you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/shopping-tips"
          className="text-primary font-medium hover:text-primary-dark"
        >
          View All Shopping Tips
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-8">
      <Link to="/shopping-tips" className="flex items-center text-primary mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Shopping Tips
      </Link>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="h-[300px] overflow-hidden">
          <img 
            src={tip.image}
            alt={tip.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6 md:p-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Clock className="h-4 w-4 mr-1" />
            <span>{tip.date}</span>
            <span className="mx-2">•</span>
            <span>{tip.readTime} read</span>
            <span className="mx-2">•</span>
            <span>By {tip.author}</span>
          </div>
          
          <h1 className="text-3xl font-bold mb-6">{tip.title}</h1>
          
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: tip.content }}
          />
          
          <div className="border-t mt-8 pt-6 flex justify-between items-center">
            <div className="flex items-center">
              <button className="flex items-center text-gray-600 hover:text-primary mr-6">
                <ThumbsUp className="h-5 w-5 mr-2" />
                <span>Helpful ({tip.helpful}%)</span>
              </button>
              
              <button 
                className="flex items-center text-gray-600 hover:text-primary"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: tip.title,
                      text: `Check out this shopping tip: ${tip.title}`,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }}
              >
                <Share className="h-5 w-5 mr-2" />
                <span>Share</span>
              </button>
            </div>
            
            <div>
              <Link 
                to="/shopping-tips"
                className="text-primary font-medium hover:text-primary-dark"
              >
                More Shopping Tips
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">More Shopping Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tipsData
            .filter(t => t.id !== id)
            .slice(0, 3)
            .map(relatedTip => (
              <Link 
                key={relatedTip.id}
                to={`/shopping-tips/${relatedTip.id}`}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={relatedTip.image}
                    alt={relatedTip.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{relatedTip.date}</span>
                    <span className="mx-2">•</span>
                    <span>{relatedTip.readTime} read</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{relatedTip.title}</h3>
                  <div className="text-primary font-medium">Read more →</div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TipDetail;
 