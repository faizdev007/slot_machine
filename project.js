// deposit some amount by user

// bet on number of line by user

// bet on amount by user

// spine the random number

// calculate the winning bet

// ask for resume or quite the game


const prompt = require("prompt-sync")();

const SPINGLETTER = {
    A:2,
    B:4,
    C:5,
    D:7,
};

const LETTERVALUE ={
    A:5,
    B:4,
    C:3,
    D:2,
}

const COLS = 3;

const depost = ()=>{ // function for get Depost amount from user
    while(true){
        const depostMoney = parseFloat(prompt("Add Some Money to Start: "));
        if(isNaN(depostMoney) || depostMoney <= 0){
            console.log("Pleas Enter Valide Amount!");
        }else{
            return depostMoney;
        }
    }
}

const bettingLines = ()=>{
    while(true){
        const betline = parseFloat(prompt("How many line do you wanna bet on (1-3): "));
        if(isNaN(betline) || betline <= 0 || betline > 3){
            console.log("Please Select betting on line from 1 to 3!");
        }else{
            return betline;
        }
    }
}

const bettingAmount = (depost)=>{
    while(true){
        const betamount = parseFloat(prompt("How much money do you bet on: "));
        if(isNaN(betamount) || betamount <= 0 || betamount > depost){
            console.log("Please enter valid betting amount!");
        }else{
            return betamount;
        }
    }
}


const spin = ()=>{
    const symbols = [];
    for(const [symbol,cont] of Object.entries(SPINGLETTER)){
        for(let i=0; i<cont; i++){
            symbols.push(symbol);
        }
    }

    const reels = [];
    for(let i=0; i< COLS; i++){
        reels.push([]);
        const reelsymbols = [...symbols];
        for(let j=0; j< ROWS; j++){
            const randomindex = Math.floor(Math.random() * reelsymbols.length);
            const selectsymbol = reelsymbols[randomindex];
            reels[i].push(selectsymbol);
            reelsymbols.slice(randomindex,1);
        }
    }

    return reels;
}

const transpose = (reels)=>{
    const rows = [];
    for(let i=0; i < ROWS; i++){
        rows.push([]);
        for(let j=0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    } 
    return rows;
}

const printrows = (reels)=>{
    for(const row of reels){
        let rowprint = "";
        for(const [i,symbol] of row.entries()){
            rowprint += symbol;
            if(i != row.length -1){
                rowprint += ' | ';
            }
        }
        console.log(rowprint);
    }
}

const winningamount = (rows,bet,line)=>{
    let winning = 0;
    for(let row=0;row<line;row++){
        const symbols = rows[row];
        let allsymbol = true;
        
        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allsymbol = false;
                break;
            }
        }

        if(allsymbol){
            winning += bet * LETTERVALUE[symbols[0]];
        }
    }

    return winning;
}

const betline = bettingLines();
const ROWS = betline ?? 1;

const start = ()=>{

    let balance = depost();
    while(true){
        const bet = bettingAmount(balance);
        balance -= (betline * bet); 
        const reel = spin();
        const rows = transpose(reel);
        printrows(rows);
        const winning = winningamount(rows,bet,betline);
        balance += winning;
        console.log("You Won $" +winning.toString());
        console.log("Your Balance is $" +balance.toString());
        if(balance <= 0){
            return "You run out of money!";
        }
    }
}

start();
// const deposit = depost();
// const betline = bettingLines();
// console.log(bettingAmount(deposit));