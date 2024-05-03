let homeButton = document.getElementById("homeButton")
let storeButton = document.getElementById("storeButton")

let canvas = document.getElementById("pageCanvas")
const ctx = canvas.getContext("2d")

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
console.log(canvas)


let homePageImage = new Image()
homePageImage.src = "images/homePageImage.jpg"

let otherProducts = {
    jordan1: new Image(),
    necklace: new Image(),
    x: new Image(),
}
otherProducts.jordan1.src = "images/spiderverse-other-jordans.webp"
otherProducts.necklace.src = "images/spiderverse-other-necklace.jpg"

let shirtsProducts = {
    tshirt: new Image(),
}
shirtsProducts.tshirt.src = "images/spiderverse-shirts-spiderversetshirt0.jpeg"

let pantsProducts = {

}

console.log(homePageImage)

homePageImage.onload = function() {
    let height = canvas.width * homePageImage.height/homePageImage.width
    ctx.drawImage(homePageImage, 0, 0, homePageImage.width, homePageImage.height, 0, 0, canvas.width, height)
    homeButton.addEventListener("click", (e) => {
        ctx.drawImage(homePageImage, 0, 0, homePageImage.width, homePageImage.height, 0, 0, canvas.width, height)
    })
}

// store

function renderProducts(products) {
    if (Object.keys(products).length > 2) {
        canvas.height = window.innerHeight + canvas.height / 4 * Object.keys(products).length // makes it so if there are more than 2 products then the height of the canvas is increased to give them space to render
    }
    for (i=0;i<Object.keys(products).length;i++) {
        ctx.fillStyle="#666"
        ctx.fillRect(i*canvas.width/2+canvas.width/20, canvas.height/2*i%2+canvas.height/7, canvas.width/2-canvas.width/20, canvas.height/2-canvas.height/10)
    }
}

function all(variable) {
    variable = "All"
    // console.log(Object.keys(otherProducts).length)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawButton(0, 0, canvas.width/5, canvas.height/9, variable, itemType, true, "#000", "#fff", variable);
    drawButton(0, canvas.height - canvas.height/30, canvas.width/15, canvas.height/30, "Flappy Bird", flappyBird, true, "#000", "#fff", null);
    // renderProducts(allProducts) add "allProducts"
    return variable
}

function pants(variable) {
    variable = "Pants"
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawButton(0, 0, canvas.width/5, canvas.height/9, variable, itemType, true, "#000", "#fff", variable);
    drawButton(0, canvas.height - canvas.height/30, canvas.width/15, canvas.height/30, "Flappy Bird", flappyBird, true, "#000", "#fff", null);
    renderProducts(pantsProducts)
    return variable
}

function shirts(variable) {
    variable = "Shirts"
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawButton(0, 0, canvas.width/5, canvas.height/9, variable, itemType, true, "#000", "#fff", variable);
    drawButton(0, canvas.height - canvas.height/30, canvas.width/15, canvas.height/30, "Flappy Bird", flappyBird, true, "#000", "#fff", null);
    renderProducts(shirtsProducts)
    return variable
}

function other(variable) {
    variable = "Other"
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawButton(0, 0, canvas.width/5, canvas.height/9, variable, itemType, true, "#000", "#fff", variable);
    drawButton(0, canvas.height - canvas.height/30, canvas.width/15, canvas.height/30, "Flappy Bird", flappyBird, true, "#000", "#fff", null);
    renderProducts(otherProducts)
    return variable
}

function itemType(variable) {
    if (variable == "All") {
        drawButton(canvas.width/5, 0, canvas.width/9, canvas.height/20, "Pants", pants, true, "#00f", "#fff", "Pants");
        drawButton(canvas.width/5, canvas.height/20, canvas.width/9, canvas.height/20, "Shirts", shirts, true, "#0f0", "#fff", "Shirts");
        drawButton(canvas.width/5, 2*canvas.height/20, canvas.width/9, canvas.height/20, "Other", other, true, "#f00", "#fff", "Other");
    }

    if (variable == "Pants") {
        drawButton(canvas.width/5, 0, canvas.width/9, canvas.height/20, "All", all, true, "#00f", "#fff", "All");
        drawButton(canvas.width/5, canvas.height/20, canvas.width/9, canvas.height/20, "Shirts", shirts, true, "#0f0", "#fff", "Shirts");
        drawButton(canvas.width/5, 2*canvas.height/20, canvas.width/9, canvas.height/20, "Other", other, true, "#f00", "#fff", "Other");
    }

    if (variable == "Shirts") {
        drawButton(canvas.width/5, 0, canvas.width/9, canvas.height/20, "Pants", pants, true, "#00f", "#fff", "Pants");
        drawButton(canvas.width/5, canvas.height/20, canvas.width/9, canvas.height/20, "All", all, true, "#0f0", "#fff", "All");
        drawButton(canvas.width/5, 2*canvas.height/20, canvas.width/9, canvas.height/20, "Other", other, true, "#f00", "#fff", "Other");
    }

    if (variable == "Other") {
        drawButton(canvas.width/5, 0, canvas.width/9, canvas.height/20, "Pants", pants, true, "#00f", "#fff", "Pants");
        drawButton(canvas.width/5, canvas.height/20, canvas.width/9, canvas.height/20, "Shirts", shirts, true, "#0f0", "#fff", "Shirts");
        drawButton(canvas.width/5, 2*canvas.height/20, canvas.width/9, canvas.height/20, "All", all, true, "#f00", "#fff", "All");
    }
}

// !store

function drawButton(x, y, width, height, text, onClick, enabled, color, textColor, variable) {
    ctx.fillStyle = enabled ? color : "#000"; // different color for disabled button
    ctx.fillRect(x, y, width, height);

    ctx.font = `${height/1.3}px Arial`;
    ctx.fillStyle = textColor;
    ctx.fillText(text, x + width/8, y + height/1.3);

    const clickHandler = function (event) {
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        if (enabled && clickX > x && clickX < x + width && clickY > y && clickY < y + height) {
            onClick(variable);
            canvas.removeEventListener("click", clickHandler); // Remove the event listener after the button is clicked
        }
    };

    canvas.addEventListener("click", clickHandler);
}

let variable = "All"

storeButton.addEventListener("click", (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // canvas.height = x // when you add products, it should make the canvas as big as all the items.
    drawButton(0, 0, canvas.width/5, canvas.height/9, variable, itemType, true, "#000", "#fff", variable);
    drawButton(0, canvas.height - canvas.height/30, canvas.width/15, canvas.height/30, "Flappy Bird", flappyBird, true, "#000", "#fff", null);
})



















// flappy bird because why not / no i didn't copy this, i made it by hand and idk y tbh
let player = {
    x: 300,
    y: canvas.height/2,
    vel: 0,
    click: false,
    trigger: false,
    gameStarted: false,
    score: 0,
    gameSpeed: 400,
    scoreCounter: 0,
}

function game() {
    return player.gameStarted = true, player.y = canvas.height/2, player.vel = 0, 
    platform0 = createPlatform(canvas.width/2, 0.5 * canvas.height * Math.random() - canvas.height * 0.9, canvas.height/9, canvas.height),
    platform1 = createPlatform(canvas.width/2, platform0.y + canvas.height + canvas.height/4, canvas.height/9, canvas.height),
    player.score = 0, player.scoreCounter = 0, player.gameSpeed = 400
}

function endGame() {
    ctx.font = "70px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText("Game Over!", canvas.width/3 + canvas.width/70, canvas.height/4);
    ctx.font = "50px Arial";
    ctx.fillText(`Final Score: ${player.score}`, canvas.width/3 + canvas.width/70, canvas.height/4 + canvas.height/10);
    ctx.fillText(`Press LMB to jump!`, canvas.width/3 + canvas.width/70, canvas.height/4 + canvas.height/2);
}

function createPlatform(x, y, width, height) {
    let platform = {
        x: x,
        y: y,
        width: width,
        height: height,
    }
    return platform
}

function checkCollision(platform) {
    return (player.y + canvas.height/14 >= platform.y &&
    player.y <= platform.y + platform.height &&
    player.x + canvas.height/14 >= platform.x &&
    player.x <= platform.x + platform.width)
} 

function moveSurroundings(variable) {
    return platform0.x-=canvas.width/variable, platform1.x-=canvas.width/variable
}

function renderPlatform(platform) {
    ctx.fillStyle = "#404040";
    ctx.fillRect(platform.x,platform.y,platform.width,platform.height); 
} 

let platform0 = createPlatform(canvas.width/2, 0.5 * canvas.height * Math.random() - canvas.height * 0.9, canvas.height/9, canvas.height),
    platform1 = createPlatform(canvas.width/2, platform0.y + canvas.height + canvas.height/4, canvas.height/9, canvas.height);
    
function flappyBird() {
    canvas.height = window.innerHeight
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (player.gameStarted) {
        if (!player.click) {
            player.trigger = true
        }
        if (player.click && player.trigger) {
            player.trigger = false; player.vel = canvas.height/45
        }
        
        player.vel-=canvas.height/850

        player.y -= player.vel
        player.vel *= 0.93

        ctx.fillStyle = "#000"
        ctx.fillRect(player.x, player.y, canvas.height/14, canvas.height/14)

        renderPlatform(platform0)
        renderPlatform(platform1)

        if (player.scoreCounter % 5 == 1) {
            player.scoreCounter--
            player.gameSpeed-=player.gameSpeed/12
        }

        moveSurroundings(player.gameSpeed)
        
        if (player.x > platform0.x + canvas.height/9) {
            player.score++
            player.scoreCounter = player.score
            platform0 = createPlatform(canvas.width/2, 0.5 * canvas.height * Math.random() - canvas.height * 0.9, canvas.height/9, canvas.height)
            platform1 = createPlatform(canvas.width/2, platform0.y + canvas.height + canvas.height/4, canvas.height/9, canvas.height)
        }
        ctx.font = "70px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText(`${player.score}`, canvas.width/3 + canvas.width/70, canvas.height/4);    
        if (checkCollision(platform0) || checkCollision(platform1) || player.y < canvas.height/14 || player.y > canvas.height) {
            player.gameStarted = false
        } 
    } else {
        endGame()
        drawButton(canvas.width/3, canvas.height/2, canvas.width/3, canvas.height/7, "Start game", game, true, "#00f", "#fff", null);
    }

    requestAnimationFrame(flappyBird) 
}

document.body.addEventListener("mousedown", function (e) {
    player.click = true
});

document.body.addEventListener("mouseup", function (e) {
    player.click = false
});