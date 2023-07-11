const URL = "http://localhost:3030/jsonstore/advanced/table";

export async function getAllStudents() {
  const response = await fetch(URL);

  return response.json();
}
