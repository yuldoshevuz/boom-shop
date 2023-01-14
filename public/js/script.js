function select(el) {
    return document.querySelector(el)
}
function selectAll(el) {
    return document.querySelectorAll(el)
}
window.addEventListener('load', (e) => {
    select('body').classList.remove('overflow-hidden')
    select('.overlay').classList.add('d-none')
    select('.loader').classList.add('d-none')
})


if (select('.logout-yes')) {
    select('.logout-yes').addEventListener('click', () => {
        window.location.href = '/logout'
    })
}
const passShowHide = () => {
    const formPass = document.querySelector('.form-password')
    const passIcon = document.querySelector('.passShowHideIcon')

    if (formPass.getAttribute('type') === 'password') {
        formPass.setAttribute('type', 'text')
        passIcon.classList.remove('fa-eye')
        passIcon.classList.add('fa-eye-slash')
    } else {
        formPass.setAttribute('type', 'password')
        passIcon.classList.add('fa-eye')
        passIcon.classList.remove('fa-eye-slash')
    }
}

