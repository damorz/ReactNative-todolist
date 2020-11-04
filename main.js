const {app,BrowserWindow,ipcMain,Menu} = require('electron');
const rootPath = require('electron-root-path').rootPath;
const url = require('url');
const path = require('path');
const fs = require('fs');
var Nulldata1 ={};
Nulldata1.table = [];
let mainwindow;
let addwindow;


function createWindow(){
    
    if(fs.existsSync('./list.json')){
        console.log("Detected list.json.");
        
    }
    else{
        fs.writeFile("list.json", JSON.stringify(Nulldata1), function(err) {
            if (err) throw err;
            console.log('Generate list.json complete.');
        });
    }
    if(fs.existsSync('./finished.json')){
        console.log("Detected finished.json.");
        
    }
    else{
        fs.writeFile("finished.json", JSON.stringify(Nulldata1), function(err) {
            if (err) throw err;
            console.log('Generate finished.json complete.');
        });
    }
    //Create window
    mainwindow = new BrowserWindow({width:1280,heigth:720});
    
    // Load html page
    mainwindow.loadURL(url.format({
        pathname:path.join(__dirname,'index.html'),
        protocal:'file',
        slashes:true
    }));

    mainwindow.on('closed',function(){
        app.quit();
    });

    // mainwindow.webContents.openDevTools();
    //Build Menu from template
    // const mainMenu = Menu.buildFromTemplate();
    const mainMenu = null;
   
    //Insert Menu
    // Menu.setApplicationMenu(mainMenu);
}

function createAddwindow(){
    addwindow = new BrowserWindow({
        title:"Add new Todolist"
    });
    // Load html page
    addwindow.loadURL(url.format({
        pathname:path.join(__dirname,'add.html'),
        protocal:'file',
        slashes:true
    }));
    addwindow.setMenu(null);

    //Garbage collection handle
    addwindow.on('closed',function(){
        addwindow = null;
    });

    
}

// const mainMenuTemplate = [

// ]


app.on('ready',createWindow);

//Add item
ipcMain.on('item:add',function(e,input){
    mainwindow.webContents.send('item:add',input);
    addwindow.close();
});

//Call add item page
ipcMain.on('call:addpage',function(e){
    createAddwindow();
});


 