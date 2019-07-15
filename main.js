window.onload = function () {

    const handm = document.getElementById('handm'),
        secSpan = document.getElementById('sec'),
        amPm = document.getElementById('amPm'),
        greeting = document.getElementById('greeting'),
        name = document.getElementById('name'),
        focus = document.getElementById('focus'),
        bg = document.body.style,
        content = document.getElementById('content')

    if (localStorage.getItem('name') == "" || localStorage.getItem('name') == null) {
        name.textContent = "Name"
    } else {
        name.textContent = localStorage.getItem('name')
    }
    focus.innerHTML = localStorage.getItem('focus')

    name.addEventListener('input', () => {
        const nameValue = name.textContent
        localStorage.setItem('name', nameValue)
    })

    focus.addEventListener('input', () => {
        const focusValue = focus.innerHTML

        localStorage.setItem('focus', focusValue)
    })


    function startTime() {
        let time = new Date(),
            hour = time.getHours(),
            min = time.getMinutes(),
            sec = time.getSeconds()

        const period = hour >= 12 ? 'PM' : 'AM'

        hour = hour % 12 || 12

        const twoDigit = (n) => {
            return (n < 10 ? '0' : '') + n
        }

        hour = twoDigit(hour)
        min = twoDigit(min)
        sec = twoDigit(sec)

        handm.textContent = `${hour}:${min}`
        secSpan.textContent = `:${sec} `
        amPm.textContent = period

        setTimeout(() => {
            startTime()
            setContext()
        }, 1000)
    }

    function setContext() {
        const time = new Date(),
            hour = time.getHours()

        let context = ""

        if (hour > 5 && hour < 12) {
            context = "morning"

            greeting.textContent = "Good Morning , "
            bg.backgroundImage = "url('https://source.unsplash.com/1920x1080/?morning,sun')"
            content.style.backgroundColor = "rgba(255,255,255,.50)"

        } else if (hour > 12 && hour < 17) {
            context = "afternoon"

            greeting.textContent = "Good Afternoon , "
            bg.backgroundImage = "url('https://source.unsplash.com/1920x1080/?sunny,scenery')"
            content.style.backgroundColor = "rgba(255,255,255,.70)"

        } else if (hour > 17 && hour < 20) {
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

    startTime()
    setContext()
}