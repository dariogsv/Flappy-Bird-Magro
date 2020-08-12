const obstacles = document.querySelectorAll('.obstacle')
const flappy = document.querySelector('[wm-flappy]')
const obstaclesArray = []

function obstacleNode(){
    const element = obstacles[0].cloneNode(true)
    flappy.appendChild(element)
    const children = element.children
    
    this.setX = (percentage) => element.style.left = `${percentage}%`
    this.getX = () => Number(element.style.left.slice(0, -1))
    this.remove = () => element.remove()
    
    //Random height pipes
    this.tube0 = Math.random()*225+40

    element.style.gridTemplateRows = `${this.tube0}px 40px 125px 40px auto`

    //Setting some style stuffs to be ready
    element.style.display = 'grid'
    if(obstaclesArray.length > 0)
        this.setX(obstaclesArray[obstaclesArray.length-1].getX()+50)
    else this.setX(101)
}

function pipesAnimation(){
    obstaclesArray.forEach(element => {
        element.setX((element.getX() - 0.5))

        if(element.getX() == 20){
            obstaclesArray.push(new obstacleNode())
        }

        if(element.getX() == -20){
            element.remove()
        }
    })
}


obstaclesArray.push(new obstacleNode())
obstaclesArray.push(new obstacleNode())
obstaclesArray.push(new obstacleNode())

var obstaclesInterval = setInterval(pipesAnimation, 50)


// >>>>>>>>>> Bird stuffs

const bird = document.querySelector('#bird')
const gridBird = document.querySelector('.grid-bird')
var rows = gridBird.style.gridTemplateRows = '237,5px 24px auto'
var birdTop = 0
gridBird.style.left = '100px'

var interval = 0
var timeout = 0

// flappy, obstacles and obstaclesArray are declared at top of this document

function goUp(){
    birdTop = parseInt(rows.split('px')[0])
    rows = gridBird.style.gridTemplateRows = `${birdTop-5}px 24px auto`
    return birdTop
}

function goDown(){
    birdTop = parseInt(rows.split('px')[0])
    rows = gridBird.style.gridTemplateRows = `${birdTop+5}px 24px auto`
    return birdTop
}

document.addEventListener('keydown', e => {
    if(e.keyCode == 38){
        e.preventDefault()
        
        bird.style.transform = 'rotate(-45deg)'

        clearTimeout(timeout)
        clearInterval(interval)
        interval = setInterval(goUp, 20)
    }
})

document.addEventListener('keyup', e => {
    if(e.keyCode == 38){
        e.preventDefault()
        
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            bird.style.transform = 'rotate(45deg)'

            clearInterval(interval)
            interval = setInterval(goDown, 35)
        }, 200);
    }
})

// >>>>>>>>>> Colision and pontuation

var nextObstacle = obstaclesArray[0]
const birdLeft = Number(gridBird.style.left.slice(0, -2))

var obstacleLeft = nextObstacle.getX()*400/100
var pathTop = nextObstacle.tube0 + 40

const pontuation = document.querySelector('.pontuation')

const isBirdBefore = () => {
    obstacleLeft = nextObstacle.getX()*400/100
    
    return (obstacleLeft > birdLeft+30)
}

const isBirdIn = () => {
    obstacleLeft = nextObstacle.getX()*400/100
    pathTop = nextObstacle.tube0 + 40
    console.log(obstacleLeft+72 > birdLeft+30)

    return (obstacleLeft+72 > birdLeft+30)
}

const isBirdFlying = () => {
    birdTop = parseInt(rows.split('px')[0])
    return birdTop <= 420
}

const increasePontuation = () => pontuation.textContent = `${Number(pontuation.textContent)+1}`

function colision(){
    birdTop = parseInt(rows.split('px')[0])
    if(!isBirdFlying()){
        gameover()
    }
    else if(isBirdBefore());
    else if(isBirdIn()){
        if(pathTop >= birdTop || pathTop + 125 <= birdTop){
            gameover()
        }
    }
    else{
        increasePontuation()
        nextObstacle = obstaclesArray[obstaclesArray.indexOf(nextObstacle)+1]
    }
}

function gameover() {
    clearInterval(obstaclesInterval)
    clearTimeout(timeout)
    clearInterval(interval)
    clearInterval()
    alert('GAMEOVER!!!')
}


const colisionInterval = setInterval(colision, 10)