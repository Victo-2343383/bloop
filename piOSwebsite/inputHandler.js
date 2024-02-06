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
        inputDisplay.innerText = input + "<";
    }

}
UpdateText();