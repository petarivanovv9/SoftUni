const input = document.getElementById("searchField");

export function onSearch() {
  console.log("onSearch");

  const searchTerm = input.value.toLowerCase();

  input.value = "";

  const tableRows = document.querySelector(".container tbody").children;

  for (const row of tableRows) {
    const rowContent = row.textContent.toLowerCase();

    row.classList.remove("select");

    if (rowContent.includes(searchTerm)) {
      row.classList.add("select");
    }
  }
}
