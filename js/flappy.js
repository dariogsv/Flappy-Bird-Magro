const obstacles = document.querySelectorAll('.obstacle')
const flappy = document.querySelector('[wm-flappy]')
const obstaclesArray = []

function obstacleNode(){
    const element = obstacles[0].cloneNode(true)
    flappy.appendChild(element)
    
    
    this.remove = () => element.remove()
    this.setX = (percentage) => element.style.left = `${percentage}%`
    this.getX = () => Number(element.style.left.slice(0, -1))

    
    element.style.display = 'grid';
    this.setX(101)
}

function animation(){
    obstaclesArray.forEach(element => {
        element.setX((element.getX() - 0.5))

        if(element.getX() == 20){
            obstaclesArray.push(new obstacleNode(obstacles, flappy))
        }

        if(element.getX() == -20){
            element.remove()
        }
    })
}


obstaclesArray.push(new obstacleNode())
console.log(obstaclesArray[0])

setInterval(animation, 70)