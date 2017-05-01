//some globals
let A, B, C,
    movesCounter = 0,
    timeouts = [];



//initialization
document.addEventListener('DOMContentLoaded', () => {
    A = new Peg('peg1'),
    B = new Peg('peg2'),
    C = new Peg('peg3');

    const goBtn = document.querySelector('.goButton'),
          resetBtn = document.querySelector('.resetButton');

    goBtn.addEventListener("click", () => {
        const num = document.getElementById('discNum').value;
        solve(num);
    });
    resetBtn.addEventListener('click', () => {
        reset();
    });
});

//Data structures
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
    }

    return class Disc {
        constructor(size){
            this.size = size
            this.color = colors[size];
        }
    }
})()


const Peg = (() => {
    const arr = []

    return class Stack {
        constructor(str){
            this.peg = document.querySelector(`.${str}`)
        }
        push(val) {
            arr.push(val);
        }
        pop() {
            return arr.pop()
        }
        clear() {
            arr.length = 0;
            return `Just emptied the peg!`;
        }
        *[Symbol.iterator]() {
            yield * arr;
        }
    }
})();

//core functions

const populate = (n, target) => 
    n == 0
    ? 'Peg has been populated!'
    : (target.push(new Disc(n)), populate(n-1, target));

const visualizeDiscs = (stack) => {
    for (let item of stack){
        let disc = document.createElement('div');
        disc.classList.add('disc');
        disc.style.backgroundColor = item.color;
        disc.style.width = `${item.size * 10}%`
        stack.peg.appendChild(disc);
    }
};

const visualizeMove = (prevStack, newStack) => {
      newStack.peg.appendChild(prevStack.peg.lastChild);  
}

const move = (n, source, target, spare) => {
    if (n > 0) {
        move(n-1, source, spare, target);
        timeouts.push(setTimeout(
            () => {visualizeMove(source, target);},
            500*movesCounter++)
        );
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

const resetVisualization = () => {
    movesCounter = 0;
    timeouts.map((timer)=> {
        clearTimeout(timer);
    });
    timeouts = [];
}

//button functionalities

const reset = () => {
    clearPegs(A, B, C);
    resetVisualization();
}

const solve = (n) => {
    reset();
    populate(n, A);
    visualizeDiscs(A);
    setTimeout(() => {
        move(n, A, B, C);
    }, 1000);
}