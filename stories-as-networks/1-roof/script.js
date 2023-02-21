// done with the help of https://codepen.io/jamestodd/pen/JjbxJqy

document.addEventListener("mousemove", (e) => {
    const circle = document.getElementById("circle");
    const halfCircleSize = circle.offsetHeight / 2;
    const mouse_x = e.clientX;
    const mouse_y = e.clientY;
    circle.style.left = `${mouse_x - halfCircleSize}px`;
    circle.style.top = `${mouse_y - halfCircleSize}px`;
});
