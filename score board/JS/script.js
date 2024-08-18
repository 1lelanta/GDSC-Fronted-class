let homeCount = 0;
let guestCount = 0;

const changeCount = document.getElementById("home--btn");
const guestCountChange = document.getElementById("guest--btn");

function plusOne() {
    homeCount += 1;
    changeCount.textContent = homeCount;
}

function plusTwo() {
    homeCount += 2;
    changeCount.textContent = homeCount;
}

function plusThree() {
    homeCount += 3;
    changeCount.textContent = homeCount;
}

function guestPlusOne() {
    guestCount += 1;
    guestCountChange.textContent = guestCount;
}

function guestPlusTwo() {
    guestCount += 2;
    guestCountChange.textContent = guestCount;
}

function guestPlusThree() {
    guestCount += 3;
    guestCountChange.textContent = guestCount;
}
