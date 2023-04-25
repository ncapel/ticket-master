const data = {
    num: null,
    booth: null,
    letter: '',
    ticketLetters: ['A', 'B', 'C', 'D', 'E', 'F', 'G',
    'H', 'I', 'J']
};

const formData = () => {
    data.num = document.getElementById('ticket_number').value;
    data.letter = document.getElementById('ticket_letter').value
    return data;
}

const updateCount = () => {
    const render = document.getElementById('header');
    let count = document.querySelectorAll('li').length;
    render.innerHTML = (`Currently Waiting: ${count}`)
}

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

const dispWait = document.querySelector('span');

var times = [];

const start = () => {
    var startTime = new Date();
    times.push(startTime);
};

const getElapsedWait = () => {
    var endTime = new Date();
    var timeDiff = ((endTime / 1000) / 60) - ((times[0] / 1000) / 60);
    var elapsed = Math.floor(timeDiff);

    if (waiters.length > 0) {
        dispWait.innerText = elapsed;
    } else {
        dispWait.innerText = '0';
    }
}

var liArr = [];

const delTime = (li) => {
    for (var i = 0; i < liArr.length; i++) {
        if (liArr[i].id == li.id) {
            times.splice(i, 1);
            liArr.splice(i, 1);
        }
    }
}

setInterval(getElapsedWait, 5000);

const drawTicket = () => {
    newTimeStamp();
    const list = document.getElementById('waiters');
    const newLi = document.createElement('li');
    newLi.setAttribute('onclick', 'this.remove(); updateCount(); delTime(this); getElapsedWait();');
    newLi.setAttribute('id', data.num);
    newLi.innerHTML = (data.letter + data.num + ' @ ' + timestamp);
    list.appendChild(newLi);
    liArr.push(newLi);
}

const delElem = (id) => {
    document.getElementById(id).remove();
}

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
