//codes for the mobile platform

(() => {
    let toggle = 0;
    let menuButton = document.getElementsByClassName("dropdown");
    menuButton[0].addEventListener("click", () => {
        if (toggle == 0) {
            document.getElementById("dropmenu").style.display = "block";
            toggle++;
        } else {
            document.getElementById("dropmenu").style.display = "none";
            toggle--;
        }

    })

})();