document.addEventListener('DOMContentLoaded', () => {
    console.log(browser.theme.getCurrent());
    

    const classes = ["icons", "btn-small", "btn-floating", "waves-effect", "white", "z-depth-3", "tooltipped"]

    const add = document.getElementById('add')
    const addForm = document.getElementById('add-shortcut')
    const list = document.getElementById('icons')
    const url = document.getElementById('url')
    const urlName = document.getElementById('url-name')
    const close = document.getElementById('close')
    const submit = document.getElementById('submit')
    const reset = document.getElementById('reset')

    list.innerHTML = localStorage.getItem('icons')

    M.AutoInit()

    add.addEventListener('mouseover', (e) => {
        e.path[1].classList.add('pulse')
    })

    add.addEventListener('mouseout', (e) => {
        e.path[1].classList.remove('pulse')
    })

    close.addEventListener('click', (e) => {
        submit.submit()
    })

    addForm.addEventListener('submit', (e) => {
        e.preventDefault()
        if (url.value == null || url.value === "") {
            M.toast({ html: 'Please Enter a Valid URL', classes: 'indigo lighten-2 rounded' })
            return
        }
        if (urlName.value == null || urlName.value === "") {
            M.toast({ html: 'Please Enter a Valid Name', classes: 'indigo lighten-2 rounded' })
            return
        }

        const icon = `http://${getHostName(url.value)}/favicon.ico`
        const shortcut = document.createElement('a')
        shortcut.classList.add(...classes)
        shortcut.setAttribute('data-position', 'bottom')
        shortcut.setAttribute('data-tooltip', urlName.value)
        shortcut.href = url.value
        shortcut.target = '_blank'
        shortcut.style.backgroundImage = `url(${icon})`

        list.appendChild(shortcut)
        reset.click()
        M.AutoInit()
        localStorage.setItem('icons', list.innerHTML)
    })

    function getHostName(url) {
        var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
        if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
            return match[2];
        }
        else {
            return null;
        }
    }

})