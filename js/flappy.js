const body = document.querySelector('body')
const flappy = document.querySelector('[wm-flappy]')
const bird = document.querySelector('#bird')

bird.style.marginTop = '0%'

// Timers para setTimeout e setInterval
var timerInterval
var timerTimeout


// Descer algum elemento em margem percentual
function downPC(element, pc) {
    let marginTop = Number(element.style.marginTop.slice(0, -1))   
    
    if(marginTop > 35){
        // gameover()
        return
    }
    bird.style.transform = 'rotate(45deg)'
    
    element.style.marginTop = `${marginTop + pc}%`
    console.log(marginTop)
}

// Subir algum elemento em margem percentual
function upPC(element, pc) {
    let marginTop = Number(element.style.marginTop.slice(0, -1))
    console.log(timerInterval)
    
    if(marginTop <= 0){
        console.log(marginTop)
        return
    }
    
    bird.style.transform = 'rotate(-45deg)'
    element.style.marginTop = `${marginTop - pc}%`
}

// Primeiro loop de downPC
timerInterval = setInterval(downPC, 70, bird, 0.5);

// Captura seta pra cima e chama upPC
document.addEventListener('keydown', e => {
    if(e.keyCode == 38){
        e.preventDefault()
        clearTimeout(timerTimeout)
        clearInterval(timerInterval)
        timerInterval = setInterval(upPC, 70, bird, 0.5)
    }
})

// Captura soltar seta e chama downPC
document.addEventListener('keyup', e => {
    if(e.keyCode == 38){
        e.preventDefault()
        timerTimeout = setTimeout((timer) =>{
            clearInterval(timerInterval)
            timerInterval = setInterval(downPC, 70, bird, 0.6);
        }, 200, timerInterval)
    }
})




