import "./style.css";

import { Manager } from "./scenes/Manager";
import { LoaderScene } from "./scenes/LoaderScene";

const screenWidth = Math.max(
  document.documentElement.clientWidth,
  window.innerWidth || 0
);
console.log("screenWidth: ", screenWidth);

const screenHeight = Math.max(
  document.documentElement.clientHeight,
  window.innerHeight || 0
);
console.log("screenHeight: ", screenHeight);

Manager.initialize(512, 512, "#000000");

// We no longer need to tell the scene the size because we can ask Manager!
const loady: LoaderScene = new LoaderScene();
Manager.changeScene(loady);
