//Accesing required componet ids and Other Constants
const startCon = document.querySelector(`.strCon`);
const startbtn = document.querySelector(`.strBtn`);
const introCon = document.querySelector(`.introCon`);
const introbtn = document.querySelector(`.introBtn`);
const quizCon = document.querySelector(`.quizBox`);
const nextBtn = document.querySelector(`.nxtBtn`);
const quitBtn = document.querySelector(`.quit`);
const restartBtn = document.querySelector(`.restart`);
const queText = document.querySelector(`.ques`)
const optionsCon = document.querySelector(`.options`)
const footQues = document.querySelector(`.totQues`)
const resultCon = document.querySelector(`.resCon`)
const timeCount = document.querySelector(`.time`)
const timeLine = document.querySelector(`.timeLine`)
const score = document.querySelector(`.score`)
const tickIcon = `<div class="icon tick"><i class="fas fa-check"></i></div>`;
const crossIcon = `<div class="icon cross"><i class="fas fa-times"></i></div>`;

//all global scope varibales declare
let queCount = 0;
let counter;
let counterLine;
let timeVal = 10;
let userScore = 0;
let maxScore = questions.length + 1;
// quiz Start Button
startbtn.addEventListener("click", () => {
    // introCon.classList.add("active")
    startCon.style.display = "none"
})
//Contiue button
introbtn.addEventListener("click", () => {
    // quizCon.classList.add("active")
    introCon.style.display = "none"
    quizCon.style.display = "block"
    displayQues(0)
    footQuesCount(0)
    startTimer(10)
    startTimerLine(0)
})


//next Button
nextBtn.addEventListener("click", () => {
    if (queCount >= questions.length) {
        console.log("Mugithu")
        showRes()
    }
    queCount++;
    displayQues(queCount);
    footQuesCount(queCount);
    clearInterval(counter)
    startTimer(timeVal)
    startTimerLine(0)
    nextBtn.style.display = "none"
})

//getting Data From Arry
const displayQues = (ind) => {
    let quesTag = questions[ind].num + `.` + questions[ind].question;
    queText.innerHTML = quesTag;
    let optionTag = `<div class="option" onclick="gotSel(this)"><span>${questions[ind].option[0]}</span></div>`
        + `<div class="option" onclick="gotSel(this)"><span>${questions[ind].option[1]}</span></div>`
        + `<div class="option" onclick="gotSel(this)"><span>${questions[ind].option[2]}</span></div>`
        + `<div class="option" onclick="gotSel(this)"><span>${questions[ind].option[3]}</span></div>`;
    optionsCon.innerHTML = optionTag;
}
//listing To Click
const gotSel = (ans) => {
    let userAns = ans.textContent;
    clearInterval(counter)
    clearInterval(counterLine)
    let correctAns = questions[queCount].ans;
    let allOptions = optionsCon.children.length;

    nextBtn.style.display = "block"
    if (userAns == correctAns) {
        userScore += 1;
        ans.classList.add("correct")
        ans.insertAdjacentHTML("beforeend", tickIcon)
    }
    else {
        ans.classList.add("incorrect")
        ans.insertAdjacentHTML("beforeend", crossIcon)
        // automatically display correct Answer
        for (let index = 0; index < allOptions; index++) {
            if (optionsCon.children[index].textContent == correctAns) {
                optionsCon.children[index].classList.add("correct")
                optionsCon.children[index].insertAdjacentHTML("beforeend", tickIcon)
            }
        }
    }

    //disabling All Others
    for (let index = 0; index < allOptions; index++) {
        optionsCon.children[index].classList.add("disabled")

    }
}
//updating Question counts
const footQuesCount = (ind) => {
    let footTag = `<span>
    <p>${questions[ind].num}</p>of<p>${questions.length}</p>Questions<span>`
    footQues.innerHTML = footTag;
}
//timer Part
const startTimer = (time) => {
    counter = setInterval(() => {
        timeCount.textContent = time
        time--;
        if (time < 0) {
            clearInterval(counter)
            timeCount.textContent = `0`
            
            let correctAns = questions[queCount].ans;
            let allOptions = optionsCon.children.length;
            for (let index = 0; index < allOptions; index++) {
                if (optionsCon.children[index].textContent == correctAns) {
                    optionsCon.children[index].classList.add("correct")
                    optionsCon.children[index].insertAdjacentHTML("beforeend", tickIcon)
                }
            }
            
            nextBtn.style.display = "block"
            //disabling All Others
            for (let index = 0; index < allOptions; index++) {
                optionsCon.children[index].classList.add("disabled")
            
            }
        }
        if (time < 9) {
            let addZ = timeCount.textContent;
            timeCount.textContent = `0` + addZ
        }
    }, 1000)
}
//timeLine
const startTimerLine = (time) => {
    counterLine = setInterval(() => {
        time += 1;
        timeLine.style.width = time + "%"
        if (time >= 99) {
            clearInterval(counterLine)
        }
    }, 110)
}
const showRes = () => {
    quizCon.style.display = "none"
    resultCon.classList.add("active");
    score.innerHTML = ` You Got ${userScore} Out of ${maxScore} Questions Correct`
}
//closing Window
quitBtn.addEventListener("click",()=>{
    window.close();
})
//reloading The Page
restartBtn.addEventListener(`click`,()=>{
    window.location.reload()
})
//------------------------------------------end Of Code----------------------------------------------------------------------//