//Some global variables
let A, B, C, 
    movesCounter = 0;

//Initialization
document.addEventListener("DOMContentLoaded", () => {
    A = new Peg('peg1');
    B = new Peg('peg2');
    C = new Peg('peg3');
    document.querySelector('.goButton').addEventListener("click", () =>{
        const num = document.getElementById('discNum').value;
        populate(num, A, B, C);
        visualizeDiscs(A);

        setTimeout(function(){
            move(num, A, B, C);

        }, 2000);
    });

    document.querySelector('.resetButton')
    .addEventListener("click", () =>{
        clearPegs(A,B,C);
        resetMovesCounter();
    })
});


// Data structures
const Disc = (() => {
    const colors = {
        "1": "#00796b",
        "2": "#512da8",
        "3": "#e91e63",
        "4": "#4dd0e1",
        "5": "#3d5afe",
        "6": "#2e7d32",
        "7": "#ffb74d",
        "8": "#c62828",
        "9": "#880e4f",
        "10": "#1565c0",
        "11": "#b2ff59",
        "12": "#18ffff",
        "13": "#546e7a",
    }

    return class Disc {
        constructor(size){
            this.size = size
            this.color = colors[size];
        }
    }
})()


const Peg = (() => {
    const arr = Symbol('arr');

    return class Stack {
        constructor(str){
            this[arr] = []; 
            this.peg = document.querySelector(`.${str}`)
        }
        push(val) {
            this[arr].push(val);
        }
        pop() {
            return this[arr].pop()
        }
        clear() {
            this[arr].length = 0;
            return `Just emptied the peg!`;
        }
        *[Symbol.iterator]() {
            yield * this[arr];
        }
    }
})();

//Core functions
const populate = (n, target) => 
    n == 0
    ? 'Peg has been populated!'
    : (target.push(new Disc(n)), populate(n-1, target));

const visualizeDiscs = (stack) => {
    for (let item of stack){
        let disc = document.createElement('div');
        disc.classList.add('disc');
        disc.style.backgroundColor = item.color;
        disc.style.width = `${item.size * 20}px`;
        stack.peg.appendChild(disc);
    }
}

const visualizeMove = (prevStack, newStack) => {
    newStack.peg.appendChild(prevStack.peg.lastChild)
}

const move = (n, source, target, spare) => {
    if (n > 0) {
        move(n-1, source, spare, target);
        setTimeout(() => {visualizeMove(source, target);},                   500*movesCounter++)
        target.push(source.pop());
        move(n-1, spare, target, source);
    }
};

const clearPegs = (...stacks) => {
    for (const stack of stacks) {
        stack.clear();
        while (stack.peg.childNodes.length > 0){
            stack.peg.childNodes[0].remove();
        }
    }
};

const resetMovesCounter = () => {movesCounter = 0;}