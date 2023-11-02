let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
navbar.onclick = () => {
    navbar.classList.toggle("active");
};
menu.onclick = () => {
    navbar.classList.toggle("active");
};
const carouselItems = document.querySelectorAll(".carousel-item");
let currentItem = 0;
const intervalTime = 2000;

function nextItem() {
    carouselItems[currentItem].classList.remove("active");
    currentItem = (currentItem + 1) % carouselItems.length;
    carouselItems[currentItem].classList.add("active");
}

setInterval(nextItem, intervalTime);
var goToTopBtn = document.getElementById("tp");

goToTopBtn.addEventListener("click", function() {
    window.scrollTo(0, 0);
});

const THRESHOLD = 15;

function addHoverEffectToCard(cardSelector) {
    const card = document.querySelector(cardSelector);

    const motionMatchMedia = window.matchMedia("(prefers-reduced-motion)");

    function handleHover(e) {
        const { clientX, clientY, currentTarget } = e;
        const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget;

        const horizontal = (clientX - offsetLeft) / clientWidth;
        const vertical = (clientY - offsetTop) / clientHeight;
        const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
        const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);

        card.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`;
    }

    function resetStyles(e) {
        card.style.transform = `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
    }

    if (!motionMatchMedia.matches) {
        card.addEventListener("mousemove", handleHover);
        card.addEventListener("mouseleave", resetStyles);
    }
}

addHoverEffectToCard(".home");

function fancyCursor() {
    const TRAIL_SPEED = 7; // Higher number = slower follow speed (default: 6)
    const SCALE_FACTOR = 400; // Higher number = smaller scale variation when moving (default: 500)
    const SCALE_ON_CLICK = 0.5; // Higher number = larger size when click (default: 0.4)
    let cursorInit = false;

    let cursor = {
        el: document.createElement("span"),
        pos: { x: 0, y: 0 },
        target: { x: 0, y: 0 },
        scale: 1,
        scaleMultiply: 0,
    };
    cursor.el.className = "fancyCursor";
    document.body.appendChild(cursor.el);
    document.addEventListener("mousemove", function(e) {
        cursor.target.x = e.clientX;
        cursor.target.y = e.clientY;
        if (!cursorInit) {
            cursor.pos.x = cursor.target.x;
            cursor.pos.y = cursor.target.y;
            cursorInit = true;
            window.requestAnimationFrame(draw);
        }
    });

    document.addEventListener("mousedown", function(e) {
        cursor.scaleMultiply = SCALE_ON_CLICK;
    });

    function draw() {
        let diffX = cursor.target.x - cursor.pos.x;
        cursor.pos.x += diffX / TRAIL_SPEED;

        let diffY = cursor.target.y - cursor.pos.y;
        cursor.pos.y += diffY / TRAIL_SPEED;

        if (diffX < 0) diffX *= -1;
        if (diffY < 0) diffY *= -1;
        let diffTotal = diffX + diffY;
        cursor.scale = diffTotal / SCALE_FACTOR + 1 + cursor.scaleMultiply;

        if (cursor.scaleMultiply > 0) cursor.scaleMultiply -= 0.1;

        cursor.el.style.transform = `translate3d(${cursor.pos.x}px, ${cursor.pos.y}px, 0) scale(${cursor.scale})`;
        window.requestAnimationFrame(draw);
    }
}

const icon = document.querySelector('.icon');
const toggleButton = document.getElementById('toggleButton');
const body = document.body;

icon.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    icon.classList.toggle('icon-dark-mode');
});

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    icon.classList.toggle('icon-dark-mode');

    const icondaynight = document.querySelector('.icon-day-night i');
    if (body.classList.contains('dark-mode')) {
        icondaynight.style.color = 'black';
    } else {
        icondaynight.style.color = 'white';
    }
});




fancyCursor();