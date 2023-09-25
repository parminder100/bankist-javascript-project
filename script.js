const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
    movementsDates: [
        '2019-01-28T09:15:04.904Z',
        '2019-04-01T10:17:24.185Z',
        '2019-05-27T17:01:17.194Z',
        '2019-07-11T23:36:17.929Z',
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-03-08T14:11:59.604Z',
        '2020-03-12T10:51:36.790Z',
    ],
};
  
const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    movementsDates: [
        '2019-01-25T14:18:46.235Z',
        '2019-02-05T16:33:06.386Z',
        '2019-03-10T14:43:26.374Z',
        '2019-04-25T18:49:59.371Z',
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-02-26T12:01:20.894Z',
    ],
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
    movementsDates: [
        '2019-01-25T14:18:46.235Z',
        '2019-02-05T16:33:06.386Z',
        '2019-03-10T14:43:26.374Z',
        '2019-04-25T18:49:59.371Z',
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-02-26T12:01:20.894Z',
    ],
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
    movementsDates: [
        '2019-01-25T14:18:46.235Z',
        '2019-02-05T16:33:06.386Z',
        '2019-03-10T14:43:26.374Z',
        '2019-04-25T18:49:59.371Z',
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-02-26T12:01:20.894Z',
    ],
};

const accounts = [account1, account2, account3, account4];


const movementsValue = document.querySelectorAll(".movements-value");
const containerMovements = document.querySelector(".movements");
const totalBalance = document.querySelector(".balance_value");
const summaryValueIn = document.querySelector(".summary-value-in");
const summaryValueOut = document.querySelector(".summary-value-out");
const summaryValueInterest = document.querySelector(".summary-value-interest");
const loginBtn = document.querySelector(".login-btn");
const usernameInput = document.querySelector(".username-input");
const passwordInput = document.querySelector(".password-input");
const containerApp = document.querySelector(".app");
const welcomeMessage = document.querySelector(".welcome");
const sortBtn = document.querySelector(".btn-sort");
const dateLabel = document.querySelector(".date");
const inputTransfer = document.querySelector(".form-input-to");
const inputAmount = document.querySelector(".form-input-amount");
const transferBtn = document.querySelector(".form-btn-transfer");
const inputLoan = document.querySelector(".form-input-loan-amount");
const loanBtn = document.querySelector(".form-btn-loan");
const inputConfirmUser = document.querySelector(".form-input-username");
const inputConfirmPassword = document.querySelector(".form-input-password");
const closeBtn = document.querySelector(".form-btn-close");
const logoutTimer = document.querySelector(".timer");


const displayMovements = (mov, sort = false) =>{
    containerMovements.innerHTML = "";
    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    }

    const labelDate = new Date();
    const dateLabelFormate = new Intl.DateTimeFormat('en-IN', options).format(labelDate);
    dateLabel.textContent = dateLabelFormate;

    // let currentBalance = 0;
    const moves = sort ? mov.movements.slice().sort((a,b) => a - b) : mov.movements;
    moves.map((move,i)=>{
        console.log(move);
        const movement = move > 0 ? 'deposit' : 'withdrawal';
        const date = new Date(mov.movementsDates[i]);
        const formateDate = new Intl.DateTimeFormat('en-IN').format(date);
        const html = `
            <div class="movements-row">
                <div class="movements-type-row">
                    <p class="movements-type movements-type-${movement}">${i+1} ${movement}</p>
                    <p class="movements-date">${formateDate}</p>
                </div>
                <div>
                    <p class="movements-value">${move} €</p>
                </div>
            </div>`
        // console.log(html);
        // currentBalance+=move;
        // totalBalance.textContent = `${currentBalance} €`;
        // console.log(currentBalance);
        containerMovements.insertAdjacentHTML("afterbegin", html);
    })
}

const displayCurrentBalance = (mov) =>{
    mov.balance = mov.movements.reduce((acc, curr) => acc + curr, 0);
    console.log(mov);
    totalBalance.textContent = `${mov.balance} €`;
}


const updateUI = (account)=>{
    displayMovements(account);
    displaySummary(account);
    displayCurrentBalance(account);
}

const displaySummary = (mov) =>{

    // 1st Method
    // let summaryValueInAmount = 0;
    // let summaryValueOutAmount = 0;
    // let summaryValueInterestAmount = 0;
    // mov.movements.forEach((move)=>{
    //     move > 0 ? summaryValueInAmount+=move : summaryValueOutAmount+=move;
    // })
    // mov.movements.forEach((move)=>{
    //     move > 0 ? (summaryValueInterestAmount+=move)*move.interestRate : 0;
    // })
    // summaryValueIn.textContent = `${summaryValueInAmount} €`;
    // summaryValueOut.textContent = `${Math.abs(summaryValueOutAmount)} €`;
    // summaryValueInterest.textContent = `${summaryValueInterestAmount} €`;


    // 2nd Method
    const incomes = mov.movements.filter((mov)=> mov > 0).reduce((mov, curr)=> mov + curr);
    summaryValueIn.textContent = `${incomes} €`;

    const out = mov.movements.filter((mov)=>mov < 0).reduce((mov,curr)=>mov+curr,0);
    summaryValueOut.textContent = `${Math.abs(out)} €`;

    const interest = mov.movements.filter((move) => move > 0).map((move) => move * (mov.interestRate / 100)).filter((int)=> int > 1).reduce((acc,curr)=> acc + curr, 0);
    summaryValueInterest.textContent = `${interest.toFixed(2)} €`;
}


const displayUsername = (acc) =>{
    acc.forEach((own)=>{
        own.username = own.owner.toLowerCase().split(" ").map((user)=>user[0]).join("");
        // console.log(acc);
    });
}
displayUsername(accounts);


const startLogoutTimer = () =>{
    let time = 120;

    const tick = () =>{
        const min = String(Math.trunc(time / 60)).padStart(2, 0);
        const sec = String(Math.trunc(time % 60)).padStart(2,0);

        logoutTimer.textContent = `${min}:${sec}`;
        
        if(time === 0){
            clearInterval(startTime);
            welcomeMessage.textContent = "Login to get started";
            containerApp.style.display = "none";
        }

        time--;
    }

    tick();
    const startTime = setInterval(tick, 1000);
    return startTime;

}


let currentAccount, timer;
loginBtn.addEventListener('click', function(){
    // console.log("login");

    currentAccount = accounts.find((acc)=>acc.username === usernameInput.value);
    if(currentAccount && currentAccount.pin === Number(passwordInput.value)){
        console.log(currentAccount);
        containerApp.style.display = "block";
        welcomeMessage.textContent = `Welcome, ${currentAccount.owner.split(" ")[0]}`;

        if(timer){
            clearInterval(timer);
        }
        timer = startLogoutTimer();

        updateUI(currentAccount);
    }
    usernameInput.value = "";
    passwordInput.value = "";
    
});



transferBtn.addEventListener('click', function(){
    console.log("transfer");
    const receiverAccount = accounts.find((acc)=>acc.username === inputTransfer.value);
    const transferAmount = Number(inputAmount.value);

    if(transferAmount > 0 && currentAccount.balance > 500 && receiverAccount.username !== currentAccount.username){
        console.log("match");
        const transferDate = new Date();
        currentAccount.movements.push(-transferAmount);
        receiverAccount.movements.push(transferAmount);

        currentAccount.movementsDates.push(transferDate);
        receiverAccount.movementsDates.push(transferDate);

        updateUI(currentAccount);

        clearInterval(timer);
        timer = startLogoutTimer();
    }
    inputTransfer.value = "";
    inputAmount.value = "";

});



loanBtn.addEventListener('click', function(){
    console.log("loan");
    const loanAmount = Number(inputLoan.value);
    if(loanAmount > 0 && currentAccount.movements.some((mov)=> mov >= loanAmount * 0.1)){
        setTimeout(()=>{
            currentAccount.movements.push(loanAmount);

            const transferDate = new Date();
            currentAccount.movementsDates.push(transferDate);
            console.log(currentAccount.movements);

            updateUI(currentAccount);

            clearInterval(timer);
            timer = startLogoutTimer();
        },3000)
    }
    inputLoan.value = "";
});



closeBtn.addEventListener("click", function(){
    
    currentAccount = accounts.find((acc)=> acc.username === inputConfirmUser.value);
    
    if(currentAccount && currentAccount.pin === Number(inputConfirmPassword.value)){
        console.log("closed");
        containerApp.style.display = "none";
        welcomeMessage.textContent = "Login to get started";

        clearInterval(timer);
        logoutTimer.textContent = `00:00`;

        updateUI(currentAccount);
    }
    inputConfirmUser.value = "";
    inputConfirmPassword.value = "";
});


let sorted = false;
sortBtn.addEventListener('click', function(){
    console.log("sort");
    displayMovements(currentAccount, !sorted);
    sorted = !sorted;
});