const butInstall = document.getElementById("buttonInstall");

window.addEventListener("beforeinstallprompt", (event) => {
  console.log("👍", "beforeinstallprompt", event);
  // Store the event so it can be used later.
  window.deferredPrompt = event;
  // Remove the 'hidden' class from the install anchor tag.
  butInstall.classList.toggle("hidden", false);
});

butInstall.addEventListener("click", async () => {
  console.log("👍", "installBtn-clicked");
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;
  }
  // Show the install prompt.
  promptEvent.prompt();
  // Show the result
  const result = await promptEvent.userChoice;
  console.log("👍", "userChoice", result);
  // Reset the deferred prompt variable, prompt() can only be used once.
  window.deferredPrompt = null;
  butInstall.classList.toggle("hidden", true);
});

window.addEventListener("appinstalled", (event) => {
  console.log("👍", "appinstalled", event);
  // Clear the prompt
  window.deferredPrompt = null;
});
