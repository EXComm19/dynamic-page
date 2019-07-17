window.onload = function () {
    const handm = document.getElementById('handm'),
        secSpan = document.getElementById('sec'),
        amPm = document.getElementById('amPm'),
        greeting = document.getElementById('greeting'),
        name = document.getElementById('name'),
        focus = document.getElementById('focus'),
        bg = document.body.style,
        content = document.getElementById('content'),
        quote = document.getElementById('quote')

    //Add existing name and focus to the field, and add "Name" to empty field
    if (localStorage.getItem('name') == "" || localStorage.getItem('name') == null) {
        name.textContent = "Name"
    } else {
        name.textContent = localStorage.getItem('name')
    }
    focus.innerHTML = localStorage.getItem('focus')

    //Get quote of the day
    $.getJSON("http://quotes.rest/qod.json",(data) => {
        quote.textContent = `${data.contents.quotes[0].quote} —— ${data.contents.quotes[0].author}`
        console.log(data.contents.quotes[0].quote);
    })

    //listen for changes in fields and change the localstorage value
    name.addEventListener('input', () => {
        const nameValue = name.textContent
        localStorage.setItem('name', nameValue)
    })

    focus.addEventListener('input', () => {
        const focusValue = focus.innerHTML

        localStorage.setItem('focus', focusValue)
    })

    //Start to display and calculate time

    function startTime() {
        let time = new Date(),
            hour = time.getHours(),
            min = time.getMinutes(),
            sec = time.getSeconds()

        //Set the period to AM or PM depending on the time
        const period = hour >= 12 ? 'PM' : 'AM'

        //Change the time to 12 hours format
        hour = hour % 12 || 12

        //Add zero before single digit number
        const twoDigit = (n) => {
            return (n < 10 ? '0' : '') + n
        }

        hour = twoDigit(hour)
        min = twoDigit(min)
        sec = twoDigit(sec)

        //Display the Time
        handm.textContent = `${hour}:${min}`
        secSpan.textContent = `:${sec} `
        amPm.textContent = period

        //Loop
        setTimeout(() => {
            startTime()
            setContext()
        }, 1000)
    }

    function setContext() {
        const time = new Date(),
            hour = time.getHours()

        let context = ""

        //Set the time period (context) depending on the time
        //Set the greeting 
        //Set the background to relatable images
        //Change overlay and text colour

        if (hour >= 5 && hour < 12) {
            context = "morning"

            greeting.textContent = "Good Morning , "
            bg.backgroundImage = "url('https://source.unsplash.com/1920x1080/?morning,sun')"
            content.style.backgroundColor = "rgba(255,255,255,.50)"           

        } else if (hour >= 12 && hour < 17) {
            context = "afternoon"

            greeting.textContent = "Good Afternoon , "
            bg.backgroundImage = "url('https://source.unsplash.com/1920x1080/?sunny,scenery')"
            content.style.backgroundColor = "rgba(255,255,255,.70)"

        } else if (hour >= 17 && hour < 20) {
            context = "evening"

            greeting.textContent = "Good Evening , "
            bg.backgroundImage = "url('https://source.unsplash.com/1920x1080/?evening,orange,sunset')"
            content.style.backgroundColor = "rgba(0,0,0,.30)"
            bg.color = "white"
        } else {
            context = "night"

            greeting.textContent = "Good Night , "
            bg.backgroundImage = "url('https://source.unsplash.com/1920x1080/?galaxy,sky')"
            content.style.backgroundColor = "rgba(0,0,0,.30)"
            bg.color = "white"
        }
    }

    //Activate initial function and start clock
    startTime()
    setContext()
}