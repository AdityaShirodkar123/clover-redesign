export async function fetchScratchers() {
  const res = await fetch("http://127.0.0.1:5000/api/top_games_odds?n=4");
  if (!res.ok) throw new Error("Failed to fetch scratchers");
  return await res.json();
}
