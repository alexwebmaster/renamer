// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, dialog, nativeImage } = require('electron')
// const path = require('path')
// const http = require('http')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let main_window
let input_folder
let output_folder

function create_window () {
  // Create the browser window.
  main_window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  main_window.setMenuBarVisibility(false)

  // and load the index.html of the app.
  main_window.loadFile('index.html')

  // Open the DevTools.
  // main_window.webContents.openDevTools()

  // Emitted when the window is closed.
  main_window.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    main_window = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', create_window)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (main_window === null) {
    create_window()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('set_input_folder', (event) => {
  input_folder = dialog.showOpenDialog(main_window, { properties: ['openDirectory'] });
  event.sender.send('input_folder_selected', input_folder);
})

ipcMain.on('set_output_folder', (event) => {
  output_folder = dialog.showOpenDialog(main_window, { properties: ['openDirectory'] });
  event.sender.send('output_folder_selected', output_folder);
})