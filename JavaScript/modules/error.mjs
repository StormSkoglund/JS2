export function tryCatchError(message) {
  const displayError = document.getElementById("errorContainer");
  displayError.innerHTML = `An error has occurred: ${message}`;
}
