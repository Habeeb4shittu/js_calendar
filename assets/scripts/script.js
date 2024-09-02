let dater = new Date()
let mainDate = new Date(dater.getFullYear(), dater.getMonth(), dater.getDate());
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function calendar(date) {
    let currentMonthYear = {
        year: date.getFullYear(),
        month: date.getMonth()
    }

    function getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate()
    }
    $("#month-year").text(`${months[date.getMonth()]} - ${date.getFullYear()} `)
    $(".days").empty()
    days.forEach((day) => {
        $(".days").append(`
        <span>${day}</span>
    `)
    });
    let initialNumberOfdays = getDaysInMonth(date.getFullYear(), date.getMonth() + 1)
    let setColumnDay = 1
    $(".calendar").empty()
    for (let i = 1; i <= 42; i++) {
        $(".calendar").append(`
        <span class="${days[setColumnDay - 1]} day"></span>  
    `)
        if (setColumnDay >= 7) {
            setColumnDay = 0
        }
        setColumnDay++
    }
    let firstDayOfTheMonth = new Date(currentMonthYear.year, currentMonthYear.month, 1)
    let columnDay = 1
    let startingBox = $(`.day.${firstDayOfTheMonth.toDateString().slice(0, 3)}`)[0]
    let nextSibling = startingBox.nextElementSibling
    $(startingBox).text(columnDay)
    for (let i = 1; i <= initialNumberOfdays; i++) {
        if (columnDay >= initialNumberOfdays) {
            break;
        }
        columnDay++
        $(nextSibling).text(columnDay)
        nextSibling = nextSibling.nextElementSibling
    }
    $(".day").each(function (i, el) {
        if ($(el).text() == "") {
            $(this).addClass('empty')
        }
        if (
            $(el).text() == mainDate.getDate() &&
            currentMonthYear.month == new Date().getMonth() &&
            currentMonthYear.year == new Date().getFullYear()
        ) {
            $(this).addClass('bordered')
        }
    })
}
$(document).ready(function () {
    calendar(mainDate)
    let newMonth = dater.getMonth()
    $("#prev").click(function () {
        mainDate = new Date(dater.getFullYear(), --newMonth, dater.getDate());
        calendar(mainDate)
    })
    $("#next").click(function () {
        mainDate = new Date(dater.getFullYear(), ++newMonth, dater.getDate());
        calendar(mainDate)
    })
    $("#month-year").click(function () {
        $(".pop-wrapper").toggleClass("show")
    })
    $("#closePop").click(function () {
        $(".pop-wrapper").toggleClass("show")
    })
    $(".pop-wrapper").click(function (e) {
        if (e.target === $(".pop-wrapper")[0]) {
            $(".pop-wrapper").toggleClass("show")
        }
    })
    $("#yearInp").val(dater.getFullYear())
    $("#monthInp").val(dater.getMonth() + 1)
    $("#goToDate").click(function () {
        let year = $("#yearInp").val()
        let month = $("#monthInp").val() - 1
        if (isNaN(year) || !document.querySelector('#monthInp').validity.valid) {
            $('.error').text("Your inputs contain letters")
            $(".error").addClass("show");
            setTimeout(() => {
                $(".error").removeClass("show");
            }, 2000);
            return
        }
        mainDate = new Date(year, month, dater.getDate());
        dater = new Date(year, month, dater.getDate());
        calendar(mainDate)
        $(".pop-wrapper").toggleClass("show")
    })
});