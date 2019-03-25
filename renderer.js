const {ipcRenderer} = require('electron')
const fs    = require('fs');
const path  = require('path');

const input = document.getElementById('select_input');
const input_btn = document.getElementById('select_input_btn');

input_btn.addEventListener('click', (event) => {
  ipcRenderer.send('set_input_folder');
})

ipcRenderer.on('input_folder_selected', (event, folder) => {
  input.value = folder;
  folder = folder.toString();

  var files = list_folder(folder, 0);
  console.log(files);
})

const output = document.getElementById('select_output');
const output_btn = document.getElementById('select_output_btn');

output_btn.addEventListener('click', (event) => {
  ipcRenderer.send('set_output_folder');
})

ipcRenderer.on('output_folder_selected', (event, folder) => {
  output.value = folder;
})



function list_folder(folder, recurseLevel = 0)
{
  var list  = [];  
  var files = fs.readdirSync(folder);

  for (var i = files.length - 1; i >= 0; i--)
  {
    var file        = files[i].toString();
    var pathToFile  = path.join(folder, file);
    var stat        = fs.statSync(pathToFile);
    var isDirectory = stat.isDirectory();

    if (isDirectory) {
      var sub = list_folder(pathToFile, recurseLevel-1);
    } else {
      sub = false;
    }

    list[i] = {
          rootDir: folder,
          fileName: file,
          isDir: isDirectory,
          subFolders: sub,
          stat: stat
        };
  }
  return list;
}