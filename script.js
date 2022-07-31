const icons = document.querySelectorAll(".card");
let trial = 0;
let iconOne, iconTwo;
let disableIcon = false;

function wrongIcon({target: touchedIcon}) {
    if(iconOne !== touchedIcon && !disableIcon) {
        touchedIcon.classList.add("flip");
        if(!iconOne) {
            return iconOne = touchedIcon;
        }
        iconTwo = touchedIcon;
        disableIcon = true;
        let iconOneImg = iconOne.querySelector(".back-view img").src,
        iconTwoImg = iconTwo.querySelector(".back-view img").src;
        compareIcons(iconOneImg, iconTwoImg);
    }
}

function compareIcons(icon1, icon2) {
    if(icon1 === icon2) {
        trial++;
        if(trial == 8) {
            setTimeout(() => {
                document.getElementById('dvCongrats').setAttribute("style", "visibility: visible;");
                setTimeout(() => {
                    document.getElementById('dvCongrats').setAttribute("style", "visibility: hidden;");
                }, 800);
                return zigzagIcon();
            }, 1000);
        }
        iconOne.removeEventListener("click", wrongIcon);
        iconTwo.removeEventListener("click", wrongIcon);
        iconOne = iconTwo = "";
        return disableIcon = false;
    }
    setTimeout(() => {
        iconOne.classList.add("shake");
        iconTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        iconOne.classList.remove("shake", "flip");
        iconTwo.classList.remove("shake", "flip");
        iconOne = iconTwo = "";
        disableIcon = false;
    }, 1200);
}

function zigzagIcon() {
    trial = 0;
    disableIcon = false;
    iconOne = iconTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    icons.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `images/img-${arr[i]}.jpg`;
        card.addEventListener("click", wrongIcon);
    });
}

zigzagIcon();
    
icons.forEach(card => {
    card.addEventListener("click", wrongIcon);
});