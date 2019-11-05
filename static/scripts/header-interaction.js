var isheaderFadedout = false;

function headerNormal() {
    document.querySelector(".image-cover").style.opacity = "1";
    document.querySelector(".post-header").style.top = "0";
    document.querySelector(".post-header").style.opacity = "1";
    document.querySelector(".mini").style.opacity = "0.5";
    document.querySelector("nav").style.opacity = "1";
    isheaderFadedout = false;
}

function headerFaded() {
    document.querySelector(".image-cover").style.opacity = "0";
    document.querySelector(".post-header").style.top = "-20rem";
    document.querySelector(".post-header").style.opacity = "0.8";
    document.querySelector(".mini").style.opacity = "0";
    document.querySelector("nav").style.opacity = "0.8";
    isheaderFadedout = true;
}

function adjustHeader() {
    if (window.matchMedia("(min-width: 1920px)").matches) {
        if (window.pageYOffset < (window.innerHeight * 0.1)) {
            headerNormal();
        } else {
            headerFaded();
        }
    } else if (isheaderFadedout === true) {
        headerNormal();
    }
}

if (document.getElementsByClassName("image-cover")) {
    window.onresize = adjustHeader;
    window.onscroll = adjustHeader;
}