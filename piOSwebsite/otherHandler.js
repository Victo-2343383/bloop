function InitScreen(){
    let even = true;
    let step = 3;

    let parent = document.getElementById("tv-effect")
    for (let i = 0; i < window.screen.height; i = i+step){

        let newElement = document.createElement("div")
        newElement.className = "tv-line";
        newElement.style.height = step+"px";
        newElement.style.width = "100vw";

        if (even){
            newElement.style.backgroundColor = "rgba(0,0,0,0.2)";
            even = false;
        }
        else {
            newElement.style.backgroundColor = "rgba(255,255,255,0.1)";
            even = true;
        }

        parent.appendChild(newElement);
    }
}
InitScreen();
function DeleteSelf(){
    event.target.remove();
}