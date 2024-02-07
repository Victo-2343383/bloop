let cursor = 0;
let history = [];
let structure = {
    "globals":[
        "help",
        "cd",
        "ls",
        "clear",
        "open",
    ],
    "root":{
        "system"    : {
            "toggle-cursor.exec": {
                "ext": "exec",
                "help" : [
                    "This toggles on or off the pointer.",
                    "Use with no argument to toggle on or off.",
                    "Use 'status' argument to get status.",
                ],
                "value": true,
            }
        },
        "website"   : {
            "url.data"  : "https://i-bite-stand-back.com/",
            "assets"    : {
                "url.data" : "https://i-bite-stand-back.com/AssetsList.html",
                "regex.exec" : {
                    "ext":"exec",
                    "help" : [
                        "Use this just like an 'ls' command.",
                        "Use 'regex match (arg)' to show all files or folder containing the argument",
                        "Use 'regex preset (preset)' to use a RegEx preset to search with",
                        "Use 'regex custom' to pop-up a window and input your own RegEx",
                        "-----RegEx presets-----",
                        "'file' - returns all files (searches for anything with a '.'",
                        "'folder' - returns all folders (searches for anything that doesn't have a '.'"
                    ]
                },
                "get-price.exec" :{
                    "ext":"exec",
                    "help" : [
                        "Just enter the name of the asset you wanna lookup the price for (ex: >get-price astral-texture.html)"
                    ]
                },
                "astral-texture.html" : {
                    "ext":"html",
                    "url.data" : "https://u731.gumroad.com/l/Astral-Regulus-Texture",
                    "price" : 0,
                },
                "choco-texture.html" : {
                    "ext":"html",
                    "url.data" : "https://u731.gumroad.com/l/Choco-Texture",
                    "price" : 6,
                },
                "cloak.html" : {
                    "ext":"html",
                    "url.data" : "https://u731.gumroad.com/l/Cloak",
                    "price" : 10,
                },
                "elemental-skins.html" : {
                    "ext":"html",
                    "url.data" : "https://u731.gumroad.com/l/Elemental-Skins",
                    "price" : 8,
                },
                "finnicki.html" : {
                    "ext":"html",
                    "url.data" : "https://u731.gumroad.com/l/Finnicki",
                    "price" : 5,
                },
                "gana-texture.html" : {
                    "ext":"html",
                    "url.data" : "https://u731.gumroad.com/l/Gana-Texture",
                    "price" : 6,
                },
                "horn-pack.html" : {
                    "ext":"html",
                    "url.data" : "https://u731.gumroad.com/l/Horn-Pack",
                    "price" : 3,
                },
                "laser-tag-vest.html" : {
                    "ext":"html",
                    "url.data" : "https://u731.gumroad.com/l/Laser-Tag-Vest",
                    "price" : 20,
                },
                "minecraft-armor.html" : {
                    "ext":"html",
                    "url.data" : "https://u731.gumroad.com/l/Minecraft-Armor",
                    "price" : 10,
                },
                "overalls.html" : {
                    "ext":"html",
                    "url.data" : "https://u731.gumroad.com/l/Overalls",
                    "price" : 15,
                },
                "js-particle-system.html" : {
                    "ext":"html",
                    "url.data" : "https://u731.gumroad.com/l/Particle-System",
                    "price" : 0,
                },
                "projector-companion.html" : {
                    "ext":"html",
                    "url.data" : "https://i-bite-stand-back.com/HTML%20Specifics/Assets/Projector%20Companion.html",
                    "price" : 0,
                },
                "public-avatar-textures.html" : {
                    "ext":"html",
                    "url.data" : "https://u731.gumroad.com/l/Public-Avatars-Textures",
                    "price" : 8,
                },
                "regulus-harness.html" : {
                    "ext":"html",
                    "url.data" : "https://u731.gumroad.com/l/Regulus-Harness",
                    "price" : 10,
                },
                "regulus-plush.html" : {
                    "ext":"html",
                    "url.data" : "https://u731.gumroad.com/l/Regulus-Plush",
                    "price" : 6,
                },
                "regulus-latex-suit.html" : {
                    "ext":"html",
                    "url.data" : "https://u731.gumroad.com/l/Regulus-Latex-Suit",
                    "price" : 3,
                },
                "sunset-fit.html" : {
                    "ext":"html",
                    "url.data" : "https://u731.gumroad.com/l/Sunset-Fit",
                    "price" : 10,
                },
            },
            "other"     : {
                "url.data" : "https://i-bite-stand-back.com/Other.html",
                "jstestingpage.html": {
                    "url.data": "https://i-bite-stand-back.com/js%20test/Js%20test.html",
                },
                "licensekeyvalidator.html":{
                    "url.data": "https://i-bite-stand-back.com/HTML%20Specifics/key%20validator.html",
                },
                "psexample.html":{
                    "url.data": "https://i-bite-stand-back.com/particle%20system/PS.html"
                },
                "ttt.html":{
                    "url.data": "https://i-bite-stand-back.com/Examen/ttt.html"
                },
                "nothing.html":{
                    "url.data": "https://i-bite-stand-back.com/nothing/ModeSelect.html"
                },
                "sodarchivetool.html":{
                    "url.data": "https://i-bite-stand-back.com/SoD%20tool/SoD_main.html"
                }
            },
        },

    }
}
let directory = structure.root;
let directoryString= "/";
let pointer = document.getElementById("pointer")

let regex = {
    "file"  : /^.+\..{3,4}$/i, //abc.abc(d) /(file)/
    "folder": /^[^.]+$/i,
}

//----------------------------------Utils---------------------------------
function Log(message, type){
    let newElement = document.createElement("p");
    let parent = document.getElementById("logs");
    if (type == 0){
        newElement.innerText = message;
        newElement.className = "log white";
    }
    else if (type == 1){
        newElement.innerText = message;
        newElement.className = "log red";
    }
    else if (type == 2){
        newElement.innerText = directoryString + " $ "+message;
        newElement.className = "log gray";
    }
    parent.appendChild(newElement);
}

/**
 * Check if directory is valid and return a string of the end path
 * @param path path as a string (doesn't need to be from root)
 * @param currentPosition current position as a string
 * @returns {string} path from root
 * @constructor
 */
function GetDir(path){

    let tempDirString = "/";
    let pathArray = Deconcat(path, "/");
    let checkingJson = structure.root;

    let dirExists = true;

    //if from root
    if (path[0] == "/")
    {
        for (let i = 1; i < pathArray.length; i++)
        {

            if(checkingJson[pathArray[i]] != undefined){
                tempDirString += pathArray[i]+"/";
                checkingJson = checkingJson[pathArray[i]];
                // console.log("found: " + pathArray[i])
            }
            else{
                dirExists = false;
            }
        }
    }

    //if not from root
    else
    {
        tempDirString = directoryString;
        checkingJson = directory;
        for (let i = 0; i < pathArray.length; i++)
        {
            if (pathArray[i] == "..")
            {
                console.log("../")
                let pathTemp = directoryString.substring(0, directoryString.length - pathArray[i].length+1);

                index = 0;
                for (let j = 0; j < pathTemp.length; j++){
                    if (pathTemp[j] == "/"){index = j;}
                }

                console.log("path temp:" + pathTemp);
                pathTemp = pathTemp.substring(0, index);
                pathTemp += "/";
                console.log("path temp : " + pathTemp);

                checkingJson = GetPathJSON(pathTemp);
                tempDirString = pathTemp;
            }
            else if (pathArray[i] == "."){}
            else if (checkingJson[pathArray[i]] != undefined){
                tempDirString += pathArray[i]+"/";
                checkingJson = checkingJson[pathArray[i]];
            }
            else{
                dirExists = false;
            }
        }
    }

    if (dirExists){
        console.log("directory found: " + tempDirString)
        return tempDirString;
    }
    else{
        console.log("directory error in GetDir()")
        return "error";
    }

}

/**
 * receives a path and changes the directory to the path sent. DO NOT SEND INVALID PATHS
 * @param path must be a valid path as a string
 * @constructor
 */
function GetPathJSON(path){
    let pathArray = Deconcat(path, "/");

    let jsonObserver = structure.root;
    for (let i = 1; i < pathArray.length; i++){
        jsonObserver = jsonObserver[pathArray[i]];
    }

    return jsonObserver;
}
function UpdatePointer(){
    pointer.innerText = directoryString+" $ ";
}
/**
 * deconcatenates string with separator
 * if nothing found, put a " " string
 * @param {string} string
 * @param {string} char
 * @returns
 */
function Deconcat(string, char){
    let output = [];
    let instance = 0;
    while (string.length != 0){
        let index = -1;
        for (let i = string.length-1; i >= 0; i--){ //find first ';'
            if (string[i] == char){
                index = i;
            }
        }

        if (index == -1){   //if didn't find any, put everything in the output's last slot and delete the string
            output[instance] = string;
            string = "";
        }
        else if (index == 0){   //if first character is a ';'
            if (string.length == 1){    //if it'S the only character, delete the string
                string = "";
            }
            else{       //if not, make counter increment once, put one space in the output slot of this instance and delete one character from the string
                output[instance] = " ";
                string = string.substring(1);
                instance++;
            }
        }
        else{
            output[instance] = string.substring(0, index);
            string = string.substring(index+1);
            instance++;
        }

    }

    // console.log("---");
    // for (let i = 0; i < output.length; i++){
    //     console.log("["+i+"]" + " " + output[i])
    // }
    return output;
}
//----------------------------------FIND WHERE TO GO----------------------


function CommandStep0(input){
    let successful = false;
    let array = Deconcat(input, " ");

    //check if it's a global
    for (let i = 0; i < structure.globals.length; i++){
        if (structure.globals[i] == array[0]){
            successful = true;
        }
    }

    //run command if successful
    if (successful)
    {
        if (array[0] == "help") //help
        {
            Help();
        }
        else if (array[0] == "cd") //cd
        {
            try {
                ChangeDirectory(array[1]);
            }
            catch{
                // let dirArray = Deconcat(array[1], "/")
                //
                // //if empty
                // if (array[1] == "/"){
                //     directoryString = "/"
                //     directory = structure.root;
                //     Log(input, 2)
                //     UpdatePointer();
                // }
                //
                // //if from root
                // if (dirArray[0] == " ")
                // {
                //     let tempString = directoryString;
                //     let tempDir = directory;
                //
                //     directoryString = "/"
                //     directory = structure.root;
                //     let success = true;
                //
                //     for (let i = 1; i < dirArray.length; i++) {
                //         if (directory[dirArray[i]] != undefined){
                //             console.log("trying " + i)
                //             directory = directory[dirArray[i]];
                //             directoryString += dirArray[i]+"/";
                //             console.log("cd: success!")
                //         }
                //         else{
                //             Log("Incorrect directory : " + i + " " + dirArray[i] + " " + directory[dirArray[i]], 1)
                //             console.log("failed! "+i)
                //             success = false;
                //         }
                //     }
                //
                //     if (success){
                //         Log(input, 2)
                //         UpdatePointer();
                //     }
                //     else{
                //         directoryString = tempString;
                //         directory = tempDir;
                //         Log("Invalid Path : " + input, 1)
                //     }
                //
                // }
                //
                // //if not from root
                // else if (array[1] != "/"){
                //     let tempString = directoryString;
                //     let tempDir = directory;
                //
                //     let success = true;
                //
                //     for (let i = 0; i < dirArray.length; i++) {
                //         if (directory[dirArray[i]] != undefined && dirArray[i].search(regex.file) == -1){
                //             console.log("trying " + i)
                //             directory = directory[dirArray[i]];
                //             directoryString += dirArray[i]+"/";
                //             console.log("cd: success!")
                //         }
                //         else{
                //             console.log("failed! "+i)
                //             success = false;
                //         }
                //     }
                //
                //     if (success){
                //         Log(input, 2)
                //         UpdatePointer();
                //     }
                //     else{
                //         directoryString = tempString;
                //         directory = tempDir;
                //         Log("Invalid Path : " + input, 1)
                //     }
                // }
            }
        }
        else if (array[0] == "ls") //ls
        {
            if (array.length == 1){
                Log("ls", 2)
                Log("Contents of " + directoryString, 0)
                for(let key in directory){
                    Log("/"+key, 0);
                }
            }
            else{
                let path = GetDir(array[1]);
                if (path != "error")
                {
                    Log(input, 2);
                    Log("Contents of " + path, 0);

                    let jsonObserver = GetPathJSON(path);
                    for(let key in jsonObserver)
                    {
                        Log("/"+key, 0);
                    }
                }
                else{
                    Log("Invalid path : " + array[1], 1);
                }
            }

        }
        else if (array[0] == "clear") //clear
        {
            let logs = document.getElementById("logs")
            logs.innerHTML = "";
        }
        else if (array[0] == "open") //open
        {
            OpenPage(array);
        }
    }
    else
    {
        if (directory[array[0]+".exec"].ext == "exec") //handle .exec files
        {
            try
            {
                if (array[0] == "get-price"){
                    GetPrice(array[1]);
                }
                else if (array[0] == "regex"){
                    RegexSearch(array[1], array[2]);
                }
                else if (array[0] == "toggle-cursor"){
                    ToggleCursor(array[1]);
                }
                else{
                    Log("File " + array[0] + ".exec may be corrupted or contain invalid data. Execution failed.", 1);
                }
            }
            catch
            {
                Log("Invalid command arguments in : " + input, 1);
            }
        }
        else //if nothing found
        {
            Log("Invalid Command : " + input, 1)
        }

    }
}
function Help(){
    Log("help", 2);
    Log("help - Shows this list", 0);
    Log("cd - Change directory", 0);
    Log("ls - List directories", 0);
    Log("clear - Clear console", 0);
    Log("open - Open file as HTML equivalent", 0)
    Log("-----file extensions-----", 0)
    Log(".html : Openable page", 0)
    Log(".data : Data for the parent folder (often URLs)", 0)
    Log(".exec : Folder-specific command", 0)
}
function ChangeDirectory(path){
    path = GetDir(path);

    if (path != "error"){
        let pathArray = Deconcat(path, "/");

        directory = structure.root;
        for (let i = 1; i < pathArray.length; i++){
            directory = directory[pathArray[i]];
        }
        directoryString = path;
        Log("cd end path:(" + path + ")", 2);
        UpdatePointer();
    }
    else{
        Log("Error, invalid path: " + path, 1);
    }
}
function OpenPage(array){
    try {
        if (array.length != 1){
            let path = GetDir(array[1]);
            let jsonObserver = GetPathJSON(path)
            if (array[1] == "url.data"){
                window.open(jsonObserver);
            }
            else{
                window.open(jsonObserver["url.data"]);
            }
            Log(input, 2);
        }
        else{
            window.open(directory["url.data"]);
            Log(input, 2);
        }
    }
    catch (error){
        Log("Could not find a URL in : " + input, 1)
    }
}
function RegexSearch(input, param){
    if (input == "help"){
        Log("regex help", 2);
        for(let i = 0; i < directory["regex.exec"]["help"].length; i++){
            Log(directory["regex.exec"]["help"][i], 0);
        }
    }
    else if (input == "match"){
        Log("regex match " + param, 2);
        Log("Matches of '" + param + "' in " + directoryString, 0);
        for (let key in directory ){
            if (key.search(param) != -1){
                Log("/"+key, 0);
            }
        }
    }
    else if (input == "preset"){
        if (regex[param] != undefined){
            Log("regex preset " + param, 2);
            Log(param + "s in " + directoryString, 0);
            for (let key in directory ){
                if (key.search(regex[param]) != -1){
                    Log("/"+key, 0);
                }
            }
        }
        else{
            Log("Invalid preset : " + param, 1)
        }
    }
    else if (input == "custom"){
        Log("regex custom", 2);
        let customRegex = prompt("Enter your regex here (you don't need to surround it with //i):", "your regex")
        customRegex = new RegExp(customRegex);

        Log("Matches of '" + customRegex.toString() + "' in " + directoryString, 0);
        for (let key in directory ){
            if (key.search(customRegex) != -1){
                Log("/"+key, 0);
            }
        }
    }
    else {
        Log("Invalid regex parameter : " + input, 1);
        Log("Try 'regex help'", 1);
    }
}
function GetPrice(input) {
    try {
        if (input == "help"){
            Log("get-price help", 2);
            Log(directory["get-price.exec"]["help"][0], 0)
        }
        else if(directory[input].ext == "html")
        {

            Log("get-price " + input, 2)
            Log("Price : " + directory[input].price + "$CAD", 0);
        }
        else{
            Log("Invalid file name or type : " + input, 1);
        }
    }
    catch{
        Log("Invalid input : " + input, 1);
    }
}
//--------------------------------SYSTEM COMMANDS-------------------------
function ToggleCursor(input){
    if (input == "help"){
        Log("toggle-cursor help", 2)
        for (let i = 0; i < directory["toggle-cursor.exec"].help.length; i++){
            Log(directory["toggle-cursor.exec"].help[i], 0)
        }
    }
    else if (input == "status"){
        Log("toggle-cursor status", 2);
        Log("value : " + directory["toggle-cursor.exec"].value, 0)
    }
    else if (input == undefined){
        Log("toggle-cursor", 2)
        if (directory["toggle-cursor.exec"].value){
            directory["toggle-cursor.exec"].value = false;
        }
        else{
            directory["toggle-cursor.exec"].value = true;
        }
    }
    else {
        Log("Error, invalid argument : " + input, 1)
    }

}
