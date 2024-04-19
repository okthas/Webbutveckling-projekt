let homeButton = document.getElementById("homeButton")
let storeButton = document.getElementById("storeButton")

let canvas = document.getElementById("pageCanvas")
const ctx = canvas.getContext("2d")

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
console.log(canvas)


let homePageImage = new Image()
homePageImage.src = "images/homePageImage.jpg"

console.log(homePageImage)

homePageImage.onload = function() {
    let height = canvas.width * homePageImage.height/homePageImage.width
    ctx.drawImage(homePageImage, 0, 0, homePageImage.width, homePageImage.height, 0, 0, canvas.width, height)
}

homeButton.addEventListener("click", (e) => {
    ctx.drawImage(homePageImage, 0, 0, homePageImage.width, homePageImage.height, 0, 0, canvas.width, height)
})

storeButton.addEventListener("click", (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})