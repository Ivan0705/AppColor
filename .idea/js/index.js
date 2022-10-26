const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (e) => {
    console.log('Code:', e.code);
    if (e.code.toLowerCase() === 'space') {
        setRandomColors()
    }
})

document.addEventListener('click', (e) => {
    const type = e.target.dataset.type
    console.log('Type:', type);

    if (type === 'lock') {
        const node = e.target.tagName.toLowerCase() === 'i' ? e.target : e.target.children[0];
        console.log('Perform lock: ', node);
        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
    } else if (type === 'copy') {
        copyToClickBoard(e.target.textContext)
    }

})

function setRandomColors(isInit) {
    const colors = isInit ? getColorsFromHash() : [];
    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock');
        const text = col.querySelector('h2');
        const button = col.querySelector('button');
        const color = isInit ? colors[index] : chroma.random();

        if (isLocked) {
            colors.push(text.textContent);
            return;
        }

        colors.push(color);
        text.textContent = 'Color: ' + color;
        col.style.background = generateRandomColor();

        console.log('Col:', col)
        console.log(generateRandomColor())

        setTextColor(text, color);
        setTextColor(button, color);
    });

    updateColorHash(colors)
}

function generateRandomColor() {
    let hexCodes = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
    }
    return '#' + color
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function copyToClickBoard(text) {
    return navigator.clipboard.writeText(text);
}

function updateColorHash(colors = []) {
    document.location.hash = colors.map((col) => {
        return col.toString().substring(1)
    }).join('__');
}

function getColorsFromHash() {
    if (document.location.length > 1) {
        return document.location.hash.substring(1).split("__").map((color) => {
            '#' + color
        })
    }
    return [];
}

setRandomColors();
