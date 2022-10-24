// global variables
var currentDayEl = document.getElementById('currentDay');
var containerEl = document.querySelector('.container');
var testEl = document.getElementById('test');
var buttonClearEl = document.getElementById('buttonClear');

var hoursArr = ['9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm'];
var display = [];
var activityArr = [];
var displaySavedInput = [];
var currentHour = moment().format('h a');
var hoursMilitaryArr = [];
var currentHourMilitaryArr = [];
var colorArr = [];
var hoursArrMilitary;
var currentHourMilitary;
var militaryArr = [];

// saves input from user to local storage
function saveInput(e) {
    activityArr[e] = document.getElementById(e).value;
    localStorage.setItem(e, activityArr[e]);
    location.reload();
}

// Time Functions:

function trackCurrentHour() {
    setInterval(function updateCurrentHour() {
        let colorDisplay = determineColor();
        currentHour = moment().format('h a');
        currentHour = currentHour.toUpperCase();

        for (let i = 0; i < hoursArr.length; i++) {
            hoursMilitaryArr[i] = convertToMilitaryTime(currentHour, hoursArr[i]);
            updateBackgroundColor('uniqueID'+i, colorDisplay[i]);
        }
    }), 1000;
}

function convertToMilitaryTime(hour) {
    hour = hour.toUpperCase();
    let militaryTime;
    if (hour == '12 PM') { //this is midnight
        militaryTime = +'12';
    } else if (hour[2] == 'P' || hour[3] == 'P') {
        let militaryTimeArr = hour.split(" ");
        militaryTime = +militaryTimeArr[0] + 12;
    } else {
        let militaryTimeArr = hour.split(" ");
        militaryTime = +militaryTimeArr[0];
    }
    return militaryTime;
}

function compareStrings(s1, s2) {
    if (s1 == s2) {
        return true;
    } else {
        return false;
    }
}

// Local Storage Functions

function clearLocalStorage() {
    localStorage.clear();
    location.reload();
}

function checkIfLocalIsNull(e) {
    if (localStorage.getItem(e, activityArr[e]) === null) {
        localStorage.setItem(e, ' ');
    }
}

// Display/Graphic Functions
var dynamicColor = '';
var timeEl = document.getElementById(dynamicColor);

// determines the proper color
function determineColor() {
    colorArr = [];
    for (let i = 0; i < hoursArr.length; i++) {
        hoursArrMilitary = convertToMilitaryTime(hoursArr[i]);
        militaryArr.push(hoursArrMilitary);
        currentHourMilitary = convertToMilitaryTime(currentHour);
    
        if (hoursArrMilitary > currentHourMilitary) {
            colorArr.push('green');

        } else if (hoursArrMilitary < currentHourMilitary) {
            colorArr.push('grey');
        } else {
            colorArr.push('red');
        }
    }
    return colorArr;
}

// updates background color to someColor parameter
function updateBackgroundColor(elementID, someColor, i) {
    let element = document.getElementById(elementID);
    element.style.backgroundColor = someColor;
}

// creates timeblocks
function createWorkDayScheduler() {
    for (let i = 0; i < hoursArr.length; i++) {

        hoursArr[i] = hoursArr[i].toUpperCase();

        hoursMilitaryArr.push(hoursArr[i]);
        currentHourMilitaryArr[i] = ' ';

        hoursMilitaryArr[i] = convertToMilitaryTime(currentHour, hoursArr[i]);

        checkIfLocalIsNull(i);
        activityArr.push(' ');

        display.push(
            //creates hours column
            '<div class="hour">' + hoursArr[i] + '</div>'
            //creates description column
            + '<div id="uniqueID'+i+'">' + '<input class="description" type="text" id="'+i+'" placeholder="'+localStorage.getItem(i)+'">'
            //creates save button column
            + '<input type="submit" onclick="saveInput('+i+');"></div><br>'
        );
    };
    containerEl.innerHTML = display.join(' ') + '<br><input type="button" value="clear" id="buttonClear" onclick="clearLocalStorage()"><br><br>';

    trackCurrentHour();
}

currentDayEl.innerHTML = moment().format('dddd, MMMM Do');
createWorkDayScheduler();
