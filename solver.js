class Disc {
    constructor(size){
        this.size = size
        this.color = this.size % 2 == 0 ? "red" : "blue";
    }
}

const Peg = (() => {
    const arr = Symbol('arr');

    return class Stack {
        constructor(){
            this[arr] = []; 
        }
        push(val) {
            this[arr].push(val);
            return `Pushed ${val} on ${this}`;
        }
        pop() {
            return this[arr].pop()
        }
        clear() {
            this[arr].length = 0;
            return `Just emptied the peg!`;
        }
        print() {
            let str = "";
            for (const item of this){
                str += item.size + " ";
            }
            return str;
        }
        *[Symbol.iterator]() {
            yield * this[arr];
        }
    }
})();

const A = new Peg(),
      B = new Peg(),
      C = new Peg();

let movesCount = 0;

const populate = (n, target) => 
    n == 0
    ? 'Peg has been populated!'
    : (target.push(new Disc(n)), populate(n-1, target));

const clearPegs = (...pegs) => {
    for(const peg of pegs){
        peg.clear();
    }
};

const resetMovesCount = () => {movesCount = 0};

const move = (n, source, target, spare) => {
    if(n > 0){
        movesCount += 1;
        move(n-1, source, spare, target);
        target.push(source.pop());
        console.log(A.print());
        console.log(B.print());
        console.log(C.print());
        console.log('-----------------------------------------------');
        move(n-1, spare, target, source);
    }
};

const play = (pegsNum) => {
populate(pegsNum, A);
move(pegsNum, A, B, C);
console.log(movesCount);
clearPegs(A,B,C);
resetMovesCount();
};



