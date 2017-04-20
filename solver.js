class Disc {
    constructor(){
        this.size = (++new.target.count || (new.target.count = 1));
        this.color = this.size % 2 == 0 ? "red" : "blue";
    }
}

class Stack {
    constructor(){
        this.arr = [];
    }
    push(val){
        this.arr.push(val)
        return val;
    }
    pop(){
        return this.arr.pop();
    }
    swap(){
        this.arr = this.arr.reverse();
    }
    size(){
        return this.arr.length
    }
    print(){
        let str = "";
        for(const item of this){
            str += item.size + " ";
        }
        return str;
    }
    clear(){
        this.arr.length = 0;
    }
    *[Symbol.iterator](){
        yield * this.arr
    }
}

let A = new Stack(),
    B = new Stack(),
    C = new Stack(),
    moves = 0;

const populate = (n, target) => 
    n == 0
    ? 'Peg has been populated!'
    : (target.push(new Disc()), populate(n-1, target))

const clearPegs = (...pegs) => {
    for(const peg of pegs){
        peg.clear();
    }
    Disc.count = 0;
    moves = 0;
}

const move = (n, source, target, spare) => {
    if(n > 0){
        moves += 1;
        move(n-1, source, spare, target);
        target.push(source.pop());
        console.log(A.print());
        console.log(B.print());
        console.log(C.print());
        console.log('-----------------------------------------------');
        move(n-1, spare, target, source);
    }
}

const play = (pegsNum) => {
populate(pegsNum, A);
A.swap();
move(pegsNum, A, B, C);
console.log(moves);
clearPegs(A,B,C);
}

