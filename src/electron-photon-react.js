(function() {
  const path = require('path');

  const componentSymbol = Symbol("component");

  const Photon = {
    set style(styleName) {
      const styleHandlers = {
        auto() {
          // Fill style with platform related style name automatically
          const platformStyles = {
            MacIntel: "cocoa"
          };
          // If a platform specific style entry exists
          if (window.navigator.platform in platformStyles) {
            Photon.style = platformStyles[window.navigator.platform];
          }
          // No platform specific style entry
          else {
            // Get the alternativeStyle by the first entry of the platform entries
            const alternativeStyle = platformStyles[Object.keys(platformStyles)[0]];;
            console.warn("Your OS's default style is not supported. Using the default style '" + alternativeStyle  + "'");
            Photon.style = alternativeStyle;
          }
        },
        cocoa() {
          Photon.__setStyle("cocoa");
        },
        /*metro() {
          Photon.__setStyle("metro");
        }*/
      };
      if (styleName in styleHandlers) {
        styleHandlers[styleName]();
      }
      else {
        console.error("Style '" + styleName + "' is not supported.");
      }
    },
    __setStyle(styleName) {

      // console.log("Removing styles");
      // while (photonStyle.childNodes.length > 0) {
      //   photonStyle.removeChild(photonStyle.childNodes[0]);
      // }

      for (let key in Photon) {
        if (Photon.hasOwnProperty(key)) {
          const property = Photon[key];
          // If the property contains a valid component
          if (property && property[componentSymbol]) {
            // Get the compontents full path
            let componentBaseDir = path.join(this.__baseDir, components[key]);
            // Get the stylesheet's full path
            let styleSheetPath = "../node_modules/electron-photon/" + componentBaseDir + "/styles/" + styleName + ".css";
            // Make posix path working on non-unix systems
            styleSheetPath = styleSheetPath.replace(/\\/g, "/");

            console.log("STYLESHEET PATH: " + styleSheetPath);
            require(styleSheetPath);
//            // Append an @import statement to the styleheet of photon that refers to the components stylesheet
//            photonStyle.append('@import "' + styleSheetPath.replace(/\\/g, "/") + '";');
          }
        }
      }

    },
    set __baseDir(dir) {
      console.log("Setting base dir: " + dir);
      Photon.__baseDirectory = dir;
      Photon.style = "auto";
    },
    get __baseDir() {
      return Photon.__baseDirectory;
    }
  };



  const components = {
    "Original": "dist/PhotonOriginal",
    "Button" : "dist/PhotonButton",
    "Custom": "dist/PhotonCustom",
    "Window": "dist/PhotonWindow",
    "WindowContent": "dist/PhotonWindowContent",
    "Toolbar": "dist/PhotonToolbar",
    "ButtonGroup": "dist/PhotonBtnGroup",
    "Tab": "dist/PhotonTab",
    "List": "dist/PhotonSwipe",
    "Content": "dist/PhotonContent",
    "Input": "dist/PhotonInput",
    "ProgressCircle": "dist/PhotonProgressCircle",
    "CircularSlider": "dist/PhotonCircularSlider",
    "Slider": "dist/PhotonSlider",
    "Panes": "dist/PhotonPanes",
    "Messages": "dist/PhotonMessages",
    "NumberInput": "dist/PhotonNumberInput",
    "Dialog": "dist/PhotonDialog",
    "DropDown": "dist/PhotonMenu",
    "Navigation": "dist/PhotonNavigation"
  };

  // const photonStyle = document.createElement("style");
  // document.head.append(photonStyle);

  // Photon.Original = require("../node_modules/electron-photon/./dist/PhotonOriginal");
  // Photon.Button = require("../node_modules/electron-photon/./dist/PhotonButton");
  // Photon.Custom = require("../node_modules/electron-photon/./dist/PhotonCustom");
  // Photon.Window = require("../node_modules/electron-photon/./dist/PhotonWindow");
  // Photon.WindowContent = require("../node_modules/electron-photon/./dist/PhotonWindowContent");
  // Photon.Toolbar = require("../node_modules/electron-photon/./dist/PhotonToolbar");
  // Photon.ButtonGroup = require("../node_modules/electron-photon/./dist/PhotonBtnGroup");
  // Photon.Tab = require("../node_modules/electron-photon/./dist/PhotonTab");
  // Photon.List = require("../node_modules/electron-photon/./dist/PhotonSwipe");
  // Photon.Content = require("../node_modules/electron-photon/./dist/PhotonContent");
  // Photon.Input = require("../node_modules/electron-photon/./dist/PhotonInput");
  // Photon.ProgressCircle = require("../node_modules/electron-photon/./dist/PhotonProgressCircle");
  // Photon.CircularSlider = require("../node_modules/electron-photon/./dist/PhotonCircularSlider");
  // Photon.Slider = require("../node_modules/electron-photon/./dist/PhotonSlider");
  // Photon.Panes = require("../node_modules/electron-photon/./dist/PhotonPanes");
  // Photon.Messages = require("../node_modules/electron-photon/./dist/PhotonMessages");
  // Photon.NumberInput = require("../node_modules/electron-photon/./dist/PhotonNumberInput");
  // Photon.Dialog = require("../node_modules/electron-photon/./dist/PhotonDialog");
  // Photon.DropDown = require("../node_modules/electron-photon/./dist/PhotonMenu");
  // Photon.Navigation = require("../node_modules/electron-photon/./dist/PhotonNavigation");
  //
  // // Set components back refernece to Photon (__self) and a symbol that indicates it as a component
  // for (let componentName in Photon) {
  //   // Check wether the key is listed a property officially
  //   if (componentName in components) {
  //     Photon[componentName][componentSymbol] = true;
  //     Photon[componentName].__self = Photon;
  //   }
  // }


  Photon.__baseDir = __dirname;


  if (window) {
    window.Photon = Photon;
  }
  module.exports = Photon;

})();
