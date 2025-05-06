import  { useEffect, useRef } from 'react';

interface PricePoint {
  date: string;
  price: number;
}

interface PriceHistoryChartProps {
  priceHistory: PricePoint[];
  currentPrice: number;
  width?: number;
  height?: number;
}

const PriceHistoryChart = ({ 
  priceHistory, 
  currentPrice,
  width = 580, 
  height = 180 
}: PriceHistoryChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || !priceHistory || priceHistory.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set canvas size with device pixel ratio for sharpness
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);
    
    // Prepare data
    const prices = priceHistory.map(point => point.price);
    const dates = priceHistory.map(point => new Date(point.date));
    
    // Find max and min prices (add 5% padding)
    const maxPrice = Math.max(...prices) * 1.05;
    const minPrice = Math.min(...prices) * 0.95;
    
    // Chart margins
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    // Scaling functions
    const xScale = (date: Date) => {
      const minDate = dates[0];
      const maxDate = dates[dates.length - 1];
      return margin.left + (chartWidth * (date.getTime() - minDate.getTime())) / (maxDate.getTime() - minDate.getTime());
    };
    
    const yScale = (price: number) => {
      return margin.top + chartHeight - (chartHeight * (price - minPrice)) / (maxPrice - minPrice);
    };
    
    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = '#e5e7eb'; // gray-200
    ctx.lineWidth = 1;
    
    // X-axis
    ctx.moveTo(margin.left, margin.top + chartHeight);
    ctx.lineTo(margin.left + chartWidth, margin.top + chartHeight);
    
    // Y-axis
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, margin.top + chartHeight);
    ctx.stroke();
    
    // Draw price line
    ctx.beginPath();
    ctx.strokeStyle = '#FF8800'; // primary color
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    
    // Move to first point
    ctx.moveTo(xScale(dates[0]), yScale(prices[0]));
    
    // Draw line to other points
    for (let i = 1; i < prices.length; i++) {
      ctx.lineTo(xScale(dates[i]), yScale(prices[i]));
    }
    ctx.stroke();
    
    // Draw points
    for (let i = 0; i < prices.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = '#FF8800';
      ctx.arc(xScale(dates[i]), yScale(prices[i]), 4, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw price labels (first, last, and lowest)
    ctx.font = '10px Arial';
    ctx.fillStyle = '#6b7280'; // gray-500
    ctx.textAlign = 'center';
    
    // First price
    ctx.fillText(
      `₹${prices[0].toLocaleString()}`, 
      xScale(dates[0]), 
      yScale(prices[0]) - 10
    );
    
    // Last price (current)
    ctx.fillStyle = '#FF8800';
    ctx.font = 'bold 12px Arial';
    ctx.fillText(
      `₹${currentPrice.toLocaleString()}`, 
      xScale(dates[dates.length - 1]), 
      yScale(prices[prices.length - 1]) - 10
    );
    
    // Find lowest price
    const lowestPrice = Math.min(...prices);
    const lowestIndex = prices.indexOf(lowestPrice);
    
    // Only show lowest price label if it's not the last price
    if (lowestIndex !== prices.length - 1) {
      ctx.fillStyle = '#10B981'; // green-500
      ctx.font = '10px Arial';
      ctx.fillText(
        `₹${lowestPrice.toLocaleString()} (Lowest)`, 
        xScale(dates[lowestIndex]), 
        yScale(prices[lowestIndex]) - 10
      );
    }
    
    // Date labels
    ctx.fillStyle = '#6b7280'; // gray-500
    ctx.textAlign = 'center';
    ctx.font = '10px Arial';
    
    // First date
    const firstDateStr = dates[0].toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
    ctx.fillText(firstDateStr, xScale(dates[0]), margin.top + chartHeight + 15);
    
    // Last date
    const lastDateStr = dates[dates.length - 1].toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
    ctx.fillText(lastDateStr, xScale(dates[dates.length - 1]), margin.top + chartHeight + 15);
    
  }, [priceHistory, currentPrice, width, height]);

  if (!priceHistory || priceHistory.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg p-4">
        <p className="text-gray-500">No price history available</p>
      </div>
    );
  }
  
  return (
    <div className="relative">
      <canvas 
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full h-auto"
      ></canvas>
    </div>
  );
};

export default PriceHistoryChart;
 