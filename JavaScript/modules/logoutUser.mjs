// Logs out the user

export function logOut(event) {
  localStorage.clear();
  var getUniqueUrl = event.target.getAttribute("data-url");
  window.location.href = getUniqueUrl;
}
