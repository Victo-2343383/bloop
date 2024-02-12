
document.onkeydown = function(key){
    if (key.keyCode >= 65 && key.keyCode <= 90){
        let char = String.fromCharCode(key.keyCode);
        AddInput(char.toLowerCase());
    }
    else if(key.keyCode == 8){
        RmInput();
    }
    else if (key.keyCode == 13){

        EnterPress();
    }
    else if (key.keyCode == 32){
        AddInput(" ");
    }
    else if (key.keyCode == 111){
        AddInput("/");
    }
    else if (key.keyCode == 190){
        AddInput(".");
    }
    else if (key.keyCode == 189){
        AddInput("-");
    }
    else if (key.keyCode == 9){
        event.preventDefault();
        SmartText();
    }
    else if (key.keyCode == 38){

        if (cursor >= 0){
            cursor--;
            input = history[cursor];
            UpdateText();
            console.log("cursor: " + cursor);
            console.log(history[cursor]);
        }
        else {
            if (history.length != 0){
                input = history[cursor];
                UpdateText();
            }
        }
    }
    else if (key.keyCode == 40){
        if (cursor < history.length-1){
            cursor++;
            input = history[cursor];
            UpdateText();
        }
    }
    // else{
    //     alert(key.keyCode)
    // }
}
//------------------------------------------------------------------

let input = "";
let inputDisplay = document.getElementById("input");

function AddInput(char){
    input += char;
    UpdateText();
}
function RmInput(){
    input = input.substring(0, input.length-1)
    UpdateText();
}
function UpdateText(){

    //color
    if (input == ""){ inputDisplay.style.color = "gray";}
    else{inputDisplay.style.color = "white"}

    //display
    if (input == ""){
        inputDisplay.innerText = "type 'help' for help...";
    }
    else{
        let processedText = ProcessText(input);
        inputDisplay.innerHTML = processedText;
        if (structure.root.system["toggle-cursor.exec"].value){
            inputDisplay.innerText += "<";
        }

    }
}
UpdateText();
function EnterPress() {
    history[history.length - 1] = input;
    history[history.length] = "";
    cursor = history.length - 1;
    CommandStep0(input);
    input = "";
    UpdateText();
    let logs = document.getElementById("logs");
    logs.scrollTop = logs.scrollHeight;
}

/**
 * Handles text markup
 * @param text unmarked string
 * @returns {string} the marked up HTML string
 * @constructor
 */
function ProcessText(text){
    let array = Deconcat(text, " ");

    //check for globals
    for (let i = 0; i < structure.globals.length; i++){
        let index = text.search(structure.globals[i])
        if (index != -1){
            text = text.substring(0, index) + '<span class="global">' + structure.globals[i]+"</span>" + text.substring(index + structure.globals[i].length);
        }
    }

    //check for folder-specific commands
    for (let key in directory){
        if (key.match(regex.file) && directory[key].ext == "exec"){
            let lookFor = key.substring(0,key.length-5);
            let index = text.search(lookFor);
            if (index != -1){
                text = text.substring(0, index) + '<span class="specific-command">' + lookFor +"</span>" + text.substring(index + lookFor.length);
            }
        }
    }

    //check for directory
    for (let i = 0; i < array.length; i++){
        if (GetDir(array[i]) !== "error" &&
            i > 0 &&
            GetDir(array[i]).match(new RegExp("[a-zA-Z]"))
        ){
            let index = text.search(array[i])
            if (index !== -1){
                let temp = text;
                text = "";
                for (let j = 0; j < i; j++){
                    text += array[j] + " ";
                }
                text += '<span class="directory">' + array[i]+"</span>";
            }
        }
    }

    //check for files
    for (let key in directory){
        let index = text.search(key)
        if (index != -1 && !(key.match(regex.folder))){
            text = text.substring(0, index) + '<span class="file">' + key +"</span>" + text.substring(index + key.length);
        }
    }

    return text;
}
function SmartText(){
    let array = Deconcat(input, " ");
    let text = array[array.length-1]

    //look for globals
    let regex = new RegExp("^"+text);
    for (let i = 0; i < structure.globals.length; i++){
        if (structure.globals[i].match(regex) && array.length === 1){
            console.log("found regex");
            if (i !== structure.globals.length-1 && text === structure.globals[i]){
                input = structure.globals[i+1]
            }
            else if (text === structure.globals[i]){
                input = structure.globals[0]
            }
            else{
                input = structure.globals[i]
            }
            UpdateText();
            break;
        }
        else if (input.length === 0) {
            input = structure.globals[0];
            UpdateText();
        }

    }

    //look for specifics
    for(let key in directory){
        if (directory[key].ext === "exec"){
            if (key.match(regex)){
                input = key.substring(0,key.length-5);
                UpdateText();
            }
        }
    }

    //look for directory
    //get index of last '/'
    let sIndex =0;
    for (let i = 0; i < text.length; i++){
        if (text[i] == "/"){ sIndex = i;}
    }
    console.log("last / in " + text + " : " + sIndex)
    //find if there is a valid directory and get the json object
    let cleanPath = text.substring(0,sIndex);
    console.log("clean path: "+cleanPath);
    if (GetDir(cleanPath) !== "error" && array.length > 1){
        let json = GetPathJSON(GetDir(cleanPath));
        if (text[0] === "/"){ text = text.substring(1)}
        let pathArray = Deconcat(text, "/");

        text = pathArray[pathArray.length-1];
        console.log("text: " + text)

        regex = new RegExp("^" + text );
        console.log(pathArray[0]);
        console.log(pathArray[1])

        for (let key in json){
            if (key.match(regex)){
                console.log("match: " + key)
                input = "";
                for (let i = 0; i < array.length-1; i++){
                    input+= array[i] + " ";
                }

                input += GetDir(cleanPath)+key+"/";
                UpdateText();
            }
        }

    }
}