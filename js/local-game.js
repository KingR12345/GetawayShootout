"use strict";
// Offline compatibility for SDK calls embedded in the original game.
const noop = () => {};
window.PokiSDK = {
  init: () => Promise.resolve(),
  commercialBreak: () => Promise.resolve(),
  rewardedBreak: () => Promise.resolve(false),
  isAdBlocked: () => true,
  getLanguage: () => navigator.language.split("-")[0],
};
for (const name of ["gameLoadingStart", "gameLoadingProgress", "gameLoadingFinished", "gameInteractive", "gameplayStart", "gameplayStop", "happyTime", "customEvent", "setDebug", "captureError", "logError", "roundStart", "roundEnd", "sendHighscore"]) {
  window.PokiSDK[name] = noop;
}
window.pokiReady = true;
window.initPokiBridge = function (objectName) {
  window.unityGame.SendMessage(objectName, "ready");
  window.commercialBreak = () => Promise.resolve().then(() => {
    window.unityGame.SendMessage(objectName, "commercialBreakCompleted");
  });
  window.rewardedBreak = () => Promise.resolve().then(() => {
    window.unityGame.SendMessage(objectName, "rewardedBreakCompleted", "false");
  });
};
window.addEventListener("DOMContentLoaded", () => {
  const status = document.getElementById("status");
  try {
    window.unityGame = UnityLoader.instantiate("game", "Build/GetawayShootoutPoki.json", {
      onProgress: (_game, progress) => {
        status.textContent = progress < 1 ? `Loading game… ${Math.round(progress * 100)}%` : "";
        status.hidden = progress >= 1;
      },
      Module: { onAbort: () => { status.hidden = false; status.textContent = "Game failed to load. Reload the page to try again."; } }
    });
  } catch (error) {
    status.textContent = "Game failed to start: " + error.message;
  }
  document.getElementById("fullscreen").addEventListener("click", () => {
    if (window.unityGame) window.unityGame.SetFullscreen(1);
  });
});
