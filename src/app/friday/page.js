import { getDateRange } from "@/utils/getnearestFriday";

export default function Home() {
    const cutoffDate = new Date('2024-12-15'); // Example cutoff date
    const { start, end } = getDateRange(cutoffDate);
    const newEndDate = new Date(cutoffDate.getFullYear(), cutoffDate.getMonth() + 1, 0);
    console.log({"newEndDate" : newEndDate})

    return (
      <div>
        <h1>Nearest Fridays Date Range</h1>
        <p><strong>Start Date:</strong> {start.toDateString()}</p>
        <p><strong>End Date:</strong> {end.toDateString()}</p>
      </div>
    );
  }