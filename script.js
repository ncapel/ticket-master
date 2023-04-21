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
    let count = document.getElementsByTagName('li').length;
    render.innerHTML = (`Currently Waiting: ${count}`)
}

const drawTicket = () => {
    let timestamp = new Date(); 
    const list = document.getElementById('waiters');
    const newLi = document.createElement('li');
    newLi.setAttribute('onclick', 'this.remove(); updateCount()')
    newLi.innerHTML = (data.letter + data.num + ' @ ' + timestamp.getHours() + ':' + timestamp.getMinutes() + ':' + timestamp.getSeconds());
    list.appendChild(newLi);
}
// A1 @ 15:36:51   position 9 and 10

const delElem = (id) => {
    document.getElementById(id).remove();
}

const timer = document.querySelector('#wait-time');

const showWait = () => {
    timer.style.display = 'block';
}

const nextTicket = () => {
    if (data.num == 99 && data.letter == data.ticketLetters[9]) {
        drawTicket(data.num, data.letter);
        data.num = 0;
        data.letter = data.ticketLetters[0];
    } else if (data.num == 99) {
        drawTicket(data.num, data.letter);
        data.num = 0;
        data.letter = data.ticketLetters[data.ticketLetters.indexOf(data.letter) + 1];
    } else {
        drawTicket(data.num, data.letter);
        data.num++;
    }
    return data;
}
