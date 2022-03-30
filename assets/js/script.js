// Global
const key = "699cf8a377d203af678c55c4d5a9a9cf";
// selects five day forcast section for cards
const fiveDay = document.querySelector("#future");

const searchVal = (event) => {
  event.preventDefault();

  const seachEl = document.querySelector("#city-search").value;
};
document.querySelector("#seach-btn").addEventListener("submit", searchVal);
