document.onkeydown = function(key){
    if (key.keyCode >= 65 && key.keyCode <= 90){
        let char = String.fromCharCode(key.keyCode);
        AddInput(char.toLowerCase());
    }
    else if(key.keyCode == 8){
        RmInput();
    }
    else if (key.keyCode == 13){

        history[history.length-1] = input;
        history[history.length] = "";
        cursor = history.length-1;
        CommandStep0(input);
        input = "";
        UpdateText();
        let logs = document.getElementById("logs");
        logs.scrollTop = logs.scrollHeight;
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
        if (GetDir(array[i]) != "error"){
            let index = text.search(array[i])
            if (index != -1){
                text = text.substring(0, index) + '<span class="directory">' + array[i]+"</span>" + text.substring(index + array[i].length);
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