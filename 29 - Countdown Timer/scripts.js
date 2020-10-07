let myInterval;
const leftTime = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const elemArr = document.querySelectorAll('[data-time]');

function myTimer(seconds) {
    const now = Date.now();
    const then = Date.now() + seconds * 1000;
    // console.log({ now, then });
    display(seconds, then);
    clearInterval(myInterval);
    myInterval = setInterval(() => {
        if (seconds <= 0) {
            clearInterval(myInterval);
        }
        seconds--;
        display(seconds, then);
    }, 1000);
}

function display(sec, end) {
    // Code for setting left time
    let minsLeft = Math.floor(sec / 60);
    let remainingSecs = sec % 60;
    let displayTime = `${minsLeft}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
    leftTime.innerHTML = displayTime;
    document.title = displayTime;

    // Code for setting then time
    let endDate = new Date(end);
    let hrs = endDate.getHours();
    let mins = endDate.getMinutes();
    endTime.innerHTML = `${hrs > 12 ? hrs - 12 : hrs}:${mins < 10 ? '0' : ''}${mins}`;
}


elemArr.forEach((elem) => {
    elem.addEventListener('click', (e) => {
        myTimer(e.target.dataset.time);
    })
});

document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let customTime = this.minutes.value * 60;
    this.reset();
    myTimer(customTime);
})