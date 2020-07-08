const { remote, ipcRenderer } = require("electron");
const mainProcess = remote.require("./index.js");

const labels = document.getElementsByClassName("label");
const panels = document.getElementsByClassName("panel");
const reloadAllButton = document.querySelector("#reloadAllButton");

const initButtons = () => {
  for (let panel of panels) {
    let but = panel.querySelector(".reloadButton");
    but.addEventListener("click", () => {
      mainProcess.getRandomLine("./src/sources");
      ipcRenderer.once("line-got", (event, line) => {
        panel.querySelector(".label").innerHTML = line;
      });
    });
  }
};

const initReloadAllButton = () => {
  console.log(reloadAllButton);
  reloadAllButton.addEventListener("click", () => labelsInitialise());
};

function labelsInitialise() {
  let i = 0;
  for (let label of labels) {
    mainProcess.getRandomLine("./src/sources", (init = true));
    ipcRenderer.once(`line${i}-got`, (event, line) => {
      label.innerHTML = line;
    });
    i += 1;
  }
}

initButtons();
labelsInitialise();
initReloadAllButton();
