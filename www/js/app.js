$(document).ready(function () {

    go = timer;

    go.startTimer();

    $('.button').click(function () {
        $(this).toggleClass('complete');

        if (go.checkComplete()) go.showComplete();
    })
});

var timer = {
    timeStartHours: 7,
    timeStartMinutes: 0,
    timeEndHours: 8,
    timeEndMinutes: 45,
    timeTargetHours: 8,
    timeTargetMinutes: 0,
    //these bonus are the time to add after target is reached.
    // Example: Target to be ready by 8:00, bonusHour of 1 will mean 1 hour tablet time if ready for 8.00
    bonusHours: 1,
    bonusMinutes: 0,


    showComplete: function () {
        $('#time').css('color', 'red');
        clearInterval(this.countdown);
    },

    checkComplete: function () {
        var numItems = $('.complete').length;

        if (numItems == 4) {
            return true;
        } else {
            return false;
        }
    },

    startTimer: function () {
        //time at which the timer starts
        var startTime = new Date();
        startTime.setHours(this.timeStartHours);
        startTime.setMinutes(this.timeStartMinutes);

        //time at which the timer should be stops regardless
        var endTime = new Date();
        endTime.setHours(this.timeEndHours);
        endTime.setMinutes(this.timeEndMinutes);

        //time at which we are aiming for
        var targetTime = new Date();
        targetTime.setHours(this.timeTargetHours);
        targetTime.setMinutes(this.timeTargetMinutes);

        this.countdown = setInterval(function () {
            var currentTime = new Date();
            if (startTime > currentTime) {
                document.getElementById("time").innerHTML = 'Countdown starts at 7:30am';
            } else if (currentTime > endTime) {
                document.getElementById("time").innerHTML = 'You should be ready by now!';
            }
            else {
                diff = targetTime - currentTime;
                msec = diff;
                hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                mm = Math.floor(msec / 1000 / 60);
                if (mm < 10) mm = '0' + mm;
                msec -= mm * 1000 * 60;
                ss = Math.floor(msec / 1000);
                if (ss < 10) ss = '0' + ss;
                msec -= ss * 1000;
                $('#time').html('Tablet Time ' + (hh + this.bonusHours) + ':' + (mm + this.bonusMinutes) + ':' + ss);
            }
        }, 1000);
    }
}

