const { app, BrowserWindow, globalShortcut } = require('electron');
const electronStore = require('electron-store');

//remote module
const remoteMain = require("@electron/remote/main");
remoteMain.initialize();

//V8 JS engine code cache
require('v8-compile-cache');

//fullscreen variable
let fullscreen = false;

app.once('ready', () => {

  createWindow()
  //electron store
  electronStore.initRenderer()

})


function createWindow () {
    const win = new BrowserWindow({
      show: false,
      width: 1200,
      height: 900,
      title: 'Recette',
      hasShadow: true,
      icon: 'resources/icon.ico',
      /* Remove if debug */
      webgl: false,
      enableWebSQL: false,
      webPreferences: {
        spellcheck: false,
        contextIsolation: false,
        nodeIntegration: true,
        enableRemoteModule: true,
      },
    })
    
    //remote module
    remoteMain.enable(win.webContents);

    win.removeMenu();
    win.loadFile('index.html');

    win.once('ready-to-show', () => {
      win.show();
    })

    //keybinds
    globalShortcut.register('Ctrl+F', () => {
      fullscreen = !fullscreen;
      win.setFullScreen(fullscreen);
    });


    /*
    ONLY ENABLE IF DEVELOPER/DEBUGGING!!!
    */
    //win.webContents.openDevTools()
}