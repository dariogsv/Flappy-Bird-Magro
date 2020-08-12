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

setInterval(pipesAnimation, 20)


// >>>>>>>>>> Bird stuffs

const bird = document.querySelector('#bird')
const gridBird = document.querySelector('.grid-bird')
var rows = gridBird.style.gridTemplateRows = '237,5px 24px auto'
gridBird.style.left = '100px'

var interval = 0
var timeout = 0

// flappy, obstacles and obstaclesArray are declared at top of this document

function goUp(){
    let birdTop = parseInt(rows.split('px')[0])
    rows = gridBird.style.gridTemplateRows = `${birdTop-5}px 24px auto`
    return birdTop
}

function goDown(){
    let birdTop = parseInt(rows.split('px')[0])
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


