
const body = document.querySelector('body')
const flappy = document.querySelector('[wm-flappy]')
const bird = document.querySelector('#bird')

// >>>>>>>>>>> Movimento do pássaro
bird.style.marginTop = '0%'

// Timers para setTimeout e setInterval
var timerInterval
var timerTimeout

function gameover(params) {
    alert('gameover')
}

// Descer algum elemento em margem percentual
function downPC(element, percentage) {
    let marginTop = Number(element.style.marginTop.slice(0, -1))   
    
    if(marginTop > 35){
        // gameover()
        return
    }
    bird.style.transform = 'rotate(45deg)'
    
    element.style.marginTop = `${marginTop + percentage}%`
    console.log(marginTop)
}

// Subir algum elemento em margem percentual
function upPC(element, percentage) {
    let marginTop = Number(element.style.marginTop.slice(0, -1))
    
    if(marginTop <= 0){
        return
    }
    
    bird.style.transform = 'rotate(-45deg)'
    element.style.marginTop = `${marginTop - percentage}%`
}

// function upAndDown(element, percentage) {
//     clearTimeout(timerTimeout)

//     let marginTop = Number(element.style.marginTop.slice(0, -1))
//     let timer = setInterval(downPC, 70, element, percentage)
    
//     timerTimeout = setTimeout(() => {
//         clearInterval(timer)
//         timer = setInterval(upPC, 70, element, percentage)
//     }, 200)
// }
// Primeiro loop de downPC
// timerInterval = setInterval(upAndDown, 70, bird, 0.2);

// Captura seta pra cima e chama upPC
document.addEventListener('keydown', e => {
    if(e.keyCode == 38){
        e.preventDefault()
        clearTimeout(timerTimeout)
        clearInterval(timerInterval)
        timerInterval = setInterval(upPC, 70, bird, 1.4)
    }
})

// Captura soltar seta e chama downPC
document.addEventListener('keyup', e => {
    if(e.keyCode == 38){
        e.preventDefault()
        timerTimeout = setTimeout(() =>{
            clearInterval(timerInterval)
            timerInterval = setInterval(downPC, 70, bird, 1);
        }, 200, timerInterval)
    }
})







// >>>>>>>>>>> Movimento dos canos
const flappyChildren = flappy.children
const event = new Event('nextObstacle');

function obstacleMove(element, percentage){
    marginLeft = Number(element.style.marginLeft.slice(0, -1))
    console.log(marginLeft)
    if(marginLeft == 10){
        document.dispatchEvent(event)
    }
    if(marginLeft <= -22){
        // Rever criação de elementos
        // element.insertAdjacentElement('afterbegin', document.cloneNode(element))
        element.remove()
        clearInterval(this.timer)
        return
    }

    element.style.marginLeft = `${marginLeft - percentage}%`
}

// function obstaclesMove(percentage){
//     document.quer
//     obstacles.forEach(element => {
        
//     });
// }

function loopInterval(element, interval, percentage){
    let timer = setInterval(obstacleMove, interval, element, percentage)
}

document.addEventListener('nextObstacle', (e) => {
    let newObstacle = flappyChildren[0].cloneNode(true)
    flappyChildren[0].parentNode.appendChild(newObstacle);
    newObstacle.style.marginLeft = '50%'
    loopInterval(newObstacle, 40, 0.5)
});

flappyChildren[0].style.marginLeft = '20%';
loopInterval(flappyChildren[0], 40, 0.5)

// flappy.appendChild(flappyChildren[0].cloneNode(true))
// flappyChildren[2].style.marginLeft = '90%'
