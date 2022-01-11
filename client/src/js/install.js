const butInstall = document.getElementById("buttonInstall");

window.addEventListener("beforeinstallprompt", (event) => {
  console.log("👍", "beforeinstallprompt", event);
  // Store the event so it can be used later.
  window.deferredPrompt = event;
  // Remove the 'hidden' class from the install anchor tag.
  butInstall.style.display = "block";
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
  butInstall.style.display = "none";
});

window.addEventListener("appinstalled", (event) => {
  console.log("👍", "appinstalled", event);
  // Clear the prompt
  window.deferredPrompt = null;
  butInstall.style.display = "none";
});
