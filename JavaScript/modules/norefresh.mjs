// addEventListener Two Functions (2024) . [Online] available at Stack Overflow https://stackoverflow.com/questions/25028853/addeventlistener-two-functions (Accessed: 12 February 2024).
// how-to-stop-refreshing-the-page-on-submit-in-javascript (2024) [Online] available at Tutorials Point https://www.tutorialspoint.com/how-to-stop-refreshing-the-page-on-submit-in-javascript (Accessed: 12 February 2024).
export function preventFormRefresh(event) {
  event.preventDefault();
}

export function delayRefreshPage() {
  setTimeout(() => {
    location.reload(true);
  }, 500);
}
