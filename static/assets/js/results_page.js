function createResult(){
    var parent = document.getElementById("results");
    var item = document.createElement("div");
    item.id = "result";

    var img = document.createElement("img");
    img.src = "../static/assets/img/food1.jpg"; //change source of img
    img.className = "result_img";

    var name = document.createElement("div");
    name.textContent = "result";

    item.appendChild(img);
    item.appendChild(name);
    parent.appendChild(item);
}

window.onload = () =>{
    for(i = 0; i < 10; i++){
        createResult();
    }
}