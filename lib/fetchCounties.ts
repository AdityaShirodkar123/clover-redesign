export interface County {
  id: number;
  attributes: {
    County: string;
    State: string;
    Winners: number;
    TotalAmount: number;
    Latitude: number;
    Longitude: number;
  };
}

export async function fetchCounties(): Promise<County[]> {
  const response = await fetch("http://127.0.0.1:5000/api/top_counties");
  if (!response.ok) {
    throw new Error("Failed to fetch counties");
  }
  const data = await response.json();
  // Transform flat data to County interface
  return data.map((item: any) => ({
    id: item.id,
    attributes: {
      County: item.County,
      State: "NJ",
      Winners: item.NumWinners,
      TotalAmount: item.TotalJackpot,
      Latitude: 0, // Set to 0 or use item.Latitude if available
      Longitude: 0 // Set to 0 or use item.Longitude if available
    }
  }));
}
