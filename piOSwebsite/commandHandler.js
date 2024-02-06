let cursor = 0;
let history = [];
const structure = {
    "globals":[
        "help",
        "cd",
        "ls",
        "clear",
        "open"
    ],
    "root":{
        "url.data" : "https://i-bite-stand-back.com/",
        "assets"    : {
            "regex.exec" : {
                "ext":"exec",
                "help" : [
                    "command not implemented yet."
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
    }
}
let directory = structure.root;
let directoryString= "/";
let pointer = document.getElementById("pointer")
//----------------------------------Logs---------------------------------
function Log(message, type){
    let newElement = document.createElement("p");
    if (type == 0){
        newElement.innerText = message;
        newElement.className = "log white";
    }
    else if (type == 1){
        newElement.innerText = message;
        newElement.className = "log red";
    }
    else if (type == 2){
        newElement.innerText = "# "+message;
        newElement.className = "log gray";
    }
    document.getElementById("logs").appendChild(newElement);
}
//----------------------------------FIND WHERE TO GO----------------------
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
function CommandStep0(input){
    let successful = false;
    let array = Deconcat(input, " ");

    //check if its a global
    for (let i = 0; i < structure.globals.length; i++){
        if (structure.globals[i] == array[0]){
            successful = true;
        }
    }

    //run command if successful
    if (successful){
        if (array[0] == "help") //help
        {
            Log("help", 2);
            Log("help - Shows this list", 0);
            Log("cd - Change directory", 0);
            Log("ls - List directories", 0);
            Log("clear - Clear console", 0);
            Log("open - Open directory as HTML equivalent", 0)
            Log("-----file extensions-----", 0)
            Log(".html : Openable page", 0)
            Log(".data : Data for the parent folder (often URLs)", 0)
            Log(".exec : Folder-specific command", 0)
        }
        else if (array[0] == "cd") //cd
        {
            let dirArray = Deconcat(array[1], "/")

            //if empty
            if (array[1] == "/"){
                directoryString = "/"
                directory = structure.root;
                Log(input, 2)
                UpdatePointer();
            }

            //if from root
            if (dirArray[0] == " ")
            {
                let tempString = directoryString;
                let tempDir = directory;

                directoryString = "/"
                directory = structure.root;
                let success = true;

                    for (let i = 1; i < dirArray.length; i++) {
                        if (directory[dirArray[i]] != undefined){
                            console.log("trying " + i)
                            directory = directory[dirArray[i]];
                            directoryString += dirArray[i]+"/";
                            console.log("cd: success!")
                        }
                        else{
                            Log("Incorrect directory : " + i + " " + dirArray[i] + " " + directory[dirArray[i]], 1)
                            console.log("failed! "+i)
                            success = false;
                        }
                    }

                    if (success){
                        Log(input, 2)
                        UpdatePointer();
                    }
                    else{
                        directoryString = tempString;
                        directory = tempDir;
                        Log("Invalid Path : " + input, 1)
                    }

            }

            //if not from root
            else if (array[1] != "/"){
                let tempString = directoryString;
                let tempDir = directory;

                let success = true;

                for (let i = 0; i < dirArray.length; i++) {
                    if (directory[dirArray[i]] != undefined && dirArray[i].substring(dirArray[i].length-5, dirArray[i].length-4) != "."){
                        console.log("trying " + i)
                        directory = directory[dirArray[i]];
                        directoryString += dirArray[i]+"/";
                        console.log("cd: success!")
                    }
                    else{
                        console.log("failed! "+i)
                        success = false;
                    }
                }

                if (success){
                    Log(input, 2)
                    UpdatePointer();
                }
                else{
                    directoryString = tempString;
                    directory = tempDir;
                    Log("Invalid Path : " + input, 1)
                }
            }
        }
        else if (array[0] == "ls") //ls
        {
            Log("ls", 2)
            Log("Contents of " + directoryString, 0)
            for(let key in directory){
                Log("/"+key, 0)
            }
        }
        else if (array[0] == "clear") //clear
        {
            let logs = document.getElementById("logs")
            logs.innerHTML = "";
        }
        else if (array[0] == "open") //open
        {
            try {
                if (array.length != 1){
                    window.open(directory[array[1]]["url.data"]);
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
    }
    else{
        if (directory[array[0]+".exec"].ext == "exec"){
            if (array[0] == "get-price"){
                GetPrice(array[1])
            }
            if (array[0] == "regex"){
                RegexSearch(array[1]);
            }
        }
        else{
            Log("Invalid Command : " + input, 1)
        }

    }
}
function RegexSearch(input){
    if (input == "help"){
        Log("regex help", 2);
        for(let i = 0; i < directory["regex.exec"]["help"].length; i++){
            Log(directory["regex.exec"]["help"][i], 0);
        }
    }
}
function GetPrice(input){
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
function UpdatePointer(){
    pointer.innerText = directoryString+">";
}