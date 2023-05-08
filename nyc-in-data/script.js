let localData = [];
let dataEl = document.querySelector("main");

let currentYear = 2008;
let currentAssignedGender = "Male";

// Credits to
// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array/6274381#6274381
function shuffleArray(arr) {
    var j, x, index;
    for (index = arr.length - 1; index > 0; index--) {
        j = Math.floor(Math.random() * (index + 1));
        x = arr[index];
        arr[index] = arr[j];
        arr[j] = x;
    }
    return arr;
}

function parseData(data, year, assignedGender) {
    let currentWrapper = document.getElementById("data-wrapper");
    if (currentWrapper) {
        currentWrapper.remove();
    }

    let dataWrapper = document.createElement("div");
    dataWrapper.id = "data-wrapper";

    let noDataText = document.getElementById("no-data-text");
    noDataText.classList.add("hidden");

    let array = [];
    data.forEach(function (group) {
        if (group.year === Number(year) && group.sex[0] === assignedGender[0]) {
            for (let i = 0; i < group.deaths; i++) {
                let groupPixel = document.createElement("div");
                groupPixel.classList.add("pixel");
                if (group.sex[0] === "F") {
                    groupPixel.dataset.genderAssigned = "Female";
                } else if (group.sex[0] === "M") {
                    groupPixel.dataset.genderAssigned = "Male";
                }
                groupPixel.dataset.year = group.year;

                if (
                    group.raceEthnicity === "Black Non-Hispanic" ||
                    group.raceEthnicity === "Non-Hispanic Black"
                ) {
                    groupPixel.style.backgroundColor = "#818181";
                    groupPixel.dataset.race = "Black, Non-Hispanic";
                } else if (
                    group.raceEthnicity === "Non-Hispanic White" ||
                    group.raceEthnicity === "White Non-Hispanic"
                ) {
                    groupPixel.style.backgroundColor = "#656565";
                    groupPixel.dataset.race = "White, Non-Hispanic";
                } else if (group.raceEthnicity === "Hispanic") {
                    groupPixel.style.backgroundColor = "#3E3E3E";
                    groupPixel.dataset.race = "Hispanic";
                } else if (group.raceEthnicity === "Other Race/ Ethnicity") {
                    groupPixel.style.backgroundColor = "#2E2E2E";
                    groupPixel.dataset.race = "Other Race/Ethnicity";
                } else if (group.raceEthnicity === "Not Stated/Unknown") {
                    groupPixel.style.backgroundColor = "#222222";
                    groupPixel.dataset.race = "Not Stated/Unknown";
                }
                array.push(groupPixel);
            }
        }
    });

    let blankPixels = [];
    for (let i = 0; i < array.length * 2; i++) {
        let blank = document.createElement("div");
        blank.dataset.blank = "blank";
        blank.style.backgroundColor = "black";
        blank.classList.add("pixel");
        blankPixels.push(blank);
    }

    if (array.length === 0) {
        noDataText.classList.remove("hidden");
    }

    array = array.concat(blankPixels);
    shuffleArray(array);
    array.forEach(function (pixel) {
        pixel.addEventListener("mouseover", function (event) {
            if (pixel.dataset.blank) {
                let pixels = document.querySelectorAll(".pixel");
                pixels.forEach(function (p) {
                    p.classList.remove("hovered-pixel");
                });
                let pixelInfo = document.getElementById("pixel-info");
                pixelInfo.classList.add("hidden");
            } else {
                let pixelInfo = document.getElementById("pixel-info");
                pixelInfo.classList.add("hidden");

                let pixels = document.querySelectorAll(".pixel");
                pixels.forEach(function (p) {
                    p.classList.remove("hovered-pixel");
                });

                let hoveredPixel = event.target;
                hoveredPixel.classList.add("hovered-pixel");

                pixelInfo.innerHTML = `${hoveredPixel.dataset.year}. ${hoveredPixel.dataset.genderAssigned}.<br>${hoveredPixel.dataset.race}.`;

                pixelInfo.style.top = event.pageY + "px";
                if (event.clientX > window.innerWidth / 2) {
                    pixelInfo.style.left = "unset";
                    pixelInfo.style.textAlign = "right";
                    pixelInfo.style.left = `calc(${event.pageX}px - 15vw - 30px)`;
                } else {
                    pixelInfo.style.right = "unset";
                    pixelInfo.style.textAlign = "left";
                    pixelInfo.style.left = event.pageX + 30 + "px";
                }
                pixelInfo.classList.remove("hidden");
            }
        });

        dataWrapper.appendChild(pixel);
    });

    dataEl.addEventListener("mouseleave", function (event) {
        let pixels = document.querySelectorAll(".pixel");
        pixels.forEach(function (p) {
            p.classList.remove("hovered-pixel");
        });
        let pixelInfo = document.getElementById("pixel-info");
        pixelInfo.classList.add("hidden");
    });

    dataEl.appendChild(dataWrapper);
}

let yearButtons = document
    .querySelector(".year-box")
    .querySelectorAll("button");
function yearOnClick(event) {
    yearButtons.forEach(function (button) {
        button.classList.remove("selected-year");
    });
    let button = event.target;
    let year = button.textContent;
    currentYear = Number(year);
    button.classList.add("selected-year");
    parseData(localData, currentYear, currentAssignedGender);
}

let genderAssignedButtons = document
    .querySelector(".gender-assigned-box")
    .querySelectorAll("button");
function genderAssignedOnClick(event) {
    genderAssignedButtons.forEach(function (button) {
        button.classList.remove("selected-gender-assigned");
    });
    let button = event.target;
    let generAssigned = button.textContent;
    currentAssignedGender = generAssigned;
    button.classList.add("selected-gender-assigned");
    parseData(localData, currentYear, currentAssignedGender);
}

fetch("./assets/data.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        localData = data;
        document.getElementById("default-year").click();
        document.getElementById("default-gender-assigned").click();
        parseData(localData, currentYear, currentAssignedGender);
    });
