export default async function fetchData() {
  const response = await fetch("http://localhost:3000/api/data", {
    method: "GET",
    next: {
      revalidate: 0,
    },
  });
  if (!response.ok) {
    throw new Error("fetch failed!");
  }

  return await response.json();
}
//  pigroup2 / temperature;
