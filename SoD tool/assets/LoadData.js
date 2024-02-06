let save = ";";
let cityLoading;

function LoadSave(){
    save = document.getElementById("load-data").value;

    if (save != ""){
        cityLoading = {
            "name"  :   Deconcat(Deconcat(save, "\\")[0], ";")[0],
            "id"    :   Deconcat(Deconcat(save, "\\")[0], ";")[1],
            "size"  :   Deconcat(Deconcat(save, "\\")[0], ";")[2],
            "population":Deconcat(Deconcat(save, "\\")[0], ";")[3],
            "profiles": [],
            "people":[],
            "saveCode": Deconcat(Deconcat(save, "\\")[0], ";")[1]
        }
        InitProfiles();
        DebugCity();
        LoadPeople();

        console.log("done!" + cityLoading.people.length)
     for (let i = 1; i < cityLoading.people.length; i++){
        console.log("loaded ID : " + cityLoading.people[i].id)
     }
    
        cities[cities.length] = cityLoading;
        InitArchives();
    }
    

}
function InitProfiles(){
    let attributes = Deconcat(Deconcat(save, "\\")[0], ";");

    for (let i = 0; i < attributes.length - 4; i++){
        cityLoading.profiles[i] = attributes[i+4];
    }
}
function DebugCity(){
    for (let key in cityLoading){
        if (key == "profiles"){
            for (let i = 0; i < cityLoading.profiles.length; i++){
                console.log("profile " + i + " : " + cityLoading.profiles[i])
            }
        }
        else{
            console.log(key + cityLoading[key])
        }
        
    }
}
function LoadPeople(){
        let people = Deconcat(save, "\\");
        //console.log("loading people... " + (Deconcat(save, "\\").length-1))
        for (let i = 1; i < people.length; i++){
    
            let person = new Person(i);
            let data = Deconcat(people[i], ";");
            console.log("person attributes length : " + data.length);
            console.log("person string : " + people[i])
            console.log("data[0] and [1]" + data[0] + " ; " + data[1])
    
            let index = 0;
            for (let key in person){
    
                if (key == "id"){
                    person[key] = i;
                    index++;
                }
                else{
                    person[key] = data[index];
                    if ( person[key] == undefined ){ person[key] = ""; }
                    index++;
                }
                
                console.log("result : " + person.id + " " + index + " " + key + " " + person[key])
                
            }
    
            person.id = i;
            cityLoading.people[i] = person;
        }
    
}

/**
 * deconcatenates string with separator
 * @param {string} string 
 * @param {char} char 
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
    return output;
}