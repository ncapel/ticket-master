// PRIMARY DATA OBJECT
const data = {
    num: null,
    booth: null,
    letter: '',
    ticketLetters: ['A', 'B', 'C', 'D', 'E', 'F', 'G',
    'H', 'I', 'J']
};

// HTML FORM SUBMISSION FUNCTION
const formData = () => {
    data.num = document.getElementById('ticket_number').value;
    data.letter = document.getElementById('ticket_letter').value;
    document.getElementById('next-pt-btn').style.display = 'block';
    return data;
}

// UPDATES THE "CURRENTLY WAITING" AT THE TOP OF THE PAGE
const updateCount = () => {
    const render = document.getElementById('header');
    let count = document.querySelectorAll('li').length;
    render.innerHTML = (`Currently Waiting: ${count}`)
}

// CREATES A TIMESTAMP AT THE TIME A TICKET IS PULLED
let timestamp;
const newTimeStamp = () => {
    var d = new Date();
    var hours = d.getHours();
    var AmOrPm = hours >= 12 ? 'pm' : 'am';
    hours = (hours % 12) || 12;
    var mins = d.getMinutes();
    if (mins < 10) {
        mins = '0'+mins
    }
    return timestamp = `${hours}:${mins}${AmOrPm}`
}

// VARIABLE FOR WAIT TIME DATA
const dispWait = document.querySelector('span');

// STORES OLDEST DATE
var times = [];
const start = () => {
    var startTime = new Date();
    times.push(startTime);
};

// TRACKS OLDEST <li> ELEMENT TO DETERMINE CURRENT WAIT TIME IN MINUTES
const getElapsedWait = () => {
    var endTime = new Date();
    // MS -> SEC -> MIN CALCULATION
    var timeDiff = ((endTime / 1000) / 60) - ((times[0] / 1000) / 60);
    var elapsed = Math.floor(timeDiff);

    var waiters = document.querySelectorAll('li')
    if (waiters.length > 0) { // CHECKS TO SEE IF THERE ARE ANY WAITERS
        dispWait.innerText = elapsed; // CHANGES WAIT TIME DATA ACCORDINGLY
    } else {
        dispWait.innerText = '0'; // OTHERWISE CHANGES WAIT TIME DATA TO ZERO
    }
}

// DELETES THE TIME THAT CORRESPONDS WITH THE TICKET THAT WAS DELETED
var liArr = [];
const delTime = (li) => {
    for (var i = 0; i < liArr.length; i++) {
        if (liArr[i].id == li.id) {
            times.splice(i, 1);
            liArr.splice(i, 1);
        }
    }
}

// CREATES NEW <li> ELEMENT, AND CALLS newTimeStamp() FOR RESPECTIVE <li>
const drawTicket = () => {
    newTimeStamp();
    const list = document.getElementById('waiters');
    const newLi = document.createElement('li');
    newLi.setAttribute('onclick', 'this.remove(); updateCount(); delTime(this); getElapsedWait();'); newLi.setAttribute('id', data.num);
    newLi.setAttribute('class', 'list-group-item list-group-item-success');
    newLi.setAttribute('onmouseover', 'hoverOverLi(this);'); newLi.setAttribute('onmouseout','hoverOffLi(this);');
    newLi.innerHTML = (data.letter + data.num + ' @ ' + timestamp);
    list.appendChild(newLi);
    liArr.push(newLi);
}

// TEMPORARILY CHANGE STYLING OF <li> ELEMENTS ON HOVER
const hoverOverLi = (elem) => {
    elem.setAttribute('class', 'list-group-item list-group-item-danger');
}
const hoverOffLi = (elem) => {
    elem.setAttribute('class', 'list-group-item list-group-item-success');
}

// Deletes HTML Element from the DOM
const delElem = (id) => {
    document.getElementById(id).remove();
}

// CONDITIONAL TO DETERMINE NEXT TICKET AND OR NUMBER TO ASSIGN
const nextTicket = () => {
    if (data.num == 99 && data.letter == data.ticketLetters[9]) {
        drawTicket();
        data.num = 0;
        data.letter = data.ticketLetters[0];
    } else if (data.num == 99) {
        drawTicket();
        data.num = 0;
        data.letter = data.ticketLetters[data.ticketLetters.indexOf(data.letter) + 1];
    } else {
        drawTicket();
        data.num++;
    }
    return data;
}

// CALLED EVERY SECOND TO GET LIVE UPDATES ON WAIT TIME
setInterval(getElapsedWait, 1000);
