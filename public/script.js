// STOPWATCH JS ------------------------------
//Followed coding tutorial: Plantpot. (2022). StopWatch with HTML, CSS & JavaScript [Video]. Retrieved 2 June 2022, from https://www.youtube.com/watch?v=MF5HZ8058CM.

let hr = min = sec = ms = 0;
let t;
let startBtn = document.querySelector(".start");

// counting function
function countUp() {
  ms++;

  if (ms == 100) {
    sec++;
    ms = 0;
  }
  if (sec == 60) {
    min++;
    sec = 0;
  }
  if (min == 60) {
    hr++;
    min = 0;
  }
  displayTimer();
}

// timer function 
function displayTimer() {
  document.querySelector(".hours").innerHTML = ("0" + hr).slice(-2);
  document.querySelector(".minutes").innerHTML = ("0" + min).slice(-2);
  document.querySelector(".seconds").innerHTML = ("0" + sec).slice(-2);
}

// start function
function startTimer() {
  startBtn.disabled = true;
  t = setInterval(countUp, 10);
}

// stop function
function stopTimer() {
  clearInterval(t);
  startBtn.disabled = false;
}

// reset function
function resetTimer() {
  clearInterval(t);
  hr = min = sec = ms = 0;
  displayTimer();
  startBtn.disabled = false;
}



// TASKLIST JS --------------------------
// Followed Rob's Interactive Tasklist and Tasklist Improvements tutorials https://sydney.instructuremedia.com/lti-app/embed/perspective/6jZLUBigFRNkoH_BZUAR-Q https://sydney.instructuremedia.com/lti-app/embed/perspective/r-Q0ZpyggfbdqCN53ruvwg 

// Basic form DOM elements
const form = document.getElementById("taskform");
const button = document.querySelector("#taskform > button")

// Selector for the tasklist output
var tasklist = document.querySelector("#tasklist > ul");

// DOM elements for the task input fields
var taskInput = document.getElementById("taskInput");
var dueDateInput = document.getElementById("dueDateInput");
var completionTimeInput = document.getElementById("completionTimeInput");
var estimatedTimeInput = document.getElementById("estimatedTimeInput");
var priorityInput = document.getElementById("priorityInput");

// Form submission event listener
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let task = taskInput.value;
    let dueDate = dueDateInput.value;
    let completionTime = completionTimeInput.value;
    let estimatedTime = estimatedTimeInput.value;
    let priorityRating = priorityInput.options[priorityInput.selectedIndex].value;
    if (task) {
        addTask(task, dueDate, estimatedTime, priorityRating, completionTime, false);
    }
})

// Create global array to track tasks
var taskListArray = [];

// Function to add task with user inputs as parameters
function addTask(taskDescription, dueDate, estimatedTime, priorityRating, completionTime, completionStatus) {
    let d = new Date();
    let dateCreated = d.getFullYear();
    let task = {
        id: Date.now(),
        taskDescription,
        dueDate,
        dateCreated,
        estimatedTime,
        completionTime,
        priorityRating,
        estimatedTime,
        completionStatus
    };
    taskListArray.push(task);
    console.log(taskListArray);
    renderTask(task);
}


// Function to display task on screen
function renderTask(task) {

    // Call function - checks if a task has been added
    updateEmpty();

    // Create HTML elements
    let item = document.createElement("li");
    item.setAttribute('data-id', task.id);
    item.innerHTML = "<p>" + task.taskDescription + "</p>";
   
    tasklist.appendChild(item); 

    // Extra Task DOM elements
    let delButton = document.createElement("button");
    let delButtonText = document.createTextNode("Delete Task");
    delButton.appendChild(delButtonText);
    item.appendChild(delButton);


    // Event Listeners for DOM elements
    delButton.addEventListener("click", function(event) {
        event.preventDefault();
        let id = event.target.parentElement.getAttribute('data-id');
        let index = taskListArray.findIndex(task => task.id === Number(id));
        removeItemFromArray(taskListArray, index)
        console.log(taskListArray);
        updateEmpty();
        item.remove();
    })

    // Clear the input form
    form.reset();
}

function renderTask(task) {

    // Call function - checks if a task has been added
    updateEmpty();

    // Create HTML elements
    let item = document.createElement("li");
    item.setAttribute('data-id', task.id); 
    item.innerHTML = "<p>" + "<span style='color:#900E0E'>Task: </span>" + task.taskDescription + "<br>" + "<span style='color:#900E0E'>Due Date: </span>" + task.dueDate + "<br>" + "<span style='color:#900E0E'>Completion Time: </span>" + task.completionTime + "<br>" + "<span style='color:#900E0E'>Estimated Completion Time: </span>" + task.estimatedTime + "<br>" + "<span style='color:#900E0E'>Priority Rating: </span>" + task.priorityRating + "</p>";

   
    tasklist.appendChild(item); 

    // Extra Task DOM elements
    let delButton = document.createElement("button");
    let delButtonText = document.createTextNode("Delete Task");
    delButton.appendChild(delButtonText);
    item.appendChild(delButton);


    // Event Listeners for DOM elements
    delButton.addEventListener("click", function(event) {
        event.preventDefault();
        let id = event.target.parentElement.getAttribute('data-id');
        let index = taskListArray.findIndex(task => task.id === Number(id));
        removeItemFromArray(taskListArray, index)
        console.log(taskListArray);
        updateEmpty();
        item.remove();
    })

    // Clear the input form
    form.reset();
}

// Function to remove item from array
function removeItemFromArray(arr, index) {
    if (index > -1) {
        arr.splice(index, 1)
    }
    return arr;
}


// Function to hide the 'you haven't added any tasks' text
function updateEmpty() {
    if (taskListArray.length > 0) {
        document.getElementById('emptyList').style.display = 'none';
    } else {
        document.getElementById('emptyList').style.display = 'block';
    }
}


// DICTIONARY JS ---------------------------------- followed coding tutorial: CodingNepal. (2021). Build A Dictionary App in HTML CSS & JavaScript [Video]. Retrieved 2 June 2022, from https://www.youtube.com/watch?v=uqgCF3JIHkA.

const wrapper = document.querySelector(".wrapper"),
searchInput = wrapper.querySelector("input"),
volume = wrapper.querySelector(".word i"),
infoText = wrapper.querySelector(".info-text"),
synonyms = wrapper.querySelector(".synonyms .list"),
removeIcon = wrapper.querySelector(".search span");
let audio;

// data function
function data(result, word){
    if(result.title){ // if api returns the message of can't find word - help users understand what the error is in more detail 
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
    }else{
        // if word is found
        wrapper.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0],
        phontetics = `${result[0].meanings[0].partOfSpeech}  /${result[0].phonetics[0].text}/`;

        // pass the particular response data to a particular html element
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phontetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        document.querySelector(".example span").innerText = definitions.example;
        // audio feature to help the user hear how the word is pronounced - good for presentations and preparing for voice overs
        audio = new Audio("https:" + result[0].phonetics[0].audio);

        // if there are no synonyms for this word - this feature won't show up - better for the user than having an empty box/ undefined 
        if(definitions.synonyms[0] == undefined){
            synonyms.parentElement.style.display = "none";
        }else{
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";
            for (let i = 0; i < 5; i++) { // getting only 5 synonyms out of many
                let tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[i]},</span>`;
                tag = i == 4 ? tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[4]}</span>` : tag;
                synonyms.insertAdjacentHTML("beforeend", tag); // passing all 5 synonyms inside synonym 
                // NOTE: due to the use of free dictionary api, some words do not have synonyms in this dictionary - please input the word 'pleasure' to view the synonyms function
            }
        }
    }
}

// user searches for a word 
function search(word){
    fetchApi(word);
    searchInput.value = word;
}

// fetch api function - free dictionary api https://dictionaryapi.dev/
function fetchApi(word){
    wrapper.classList.remove("active");
    infoText.style.color = "#000";
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    // fetching api response and returning it with parsing into js object and then in another
    // method calling data function with passing api response and searched word as an argument
    fetch(url).then(response => response.json()).then(result => data(result, word)).catch(() =>{
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
    });
}

// When the user types in a word
searchInput.addEventListener("keyup", e =>{
    let word = e.target.value.replace(/\s+/g, ' ');
    if(e.key == "Enter" && word){
        fetchApi(word);
    }
});


volume.addEventListener("click", ()=>{
    volume.style.color = "#4D59FB";
    audio.play();
    setTimeout(() =>{
        volume.style.color = "#999";
    }, 800);
});

removeIcon.addEventListener("click", ()=>{
    searchInput.value = "";
    searchInput.focus();
    wrapper.classList.remove("active");
    infoText.style.color = "#9A9A9A";
    infoText.innerHTML = "Type any existing word and press enter to get meaning, example, synonyms, etc.";
});




// POMODORO JS -------------------------- followed coding tutorial: Hassan, F. (2021). Build a Pomodoro timer using JavaScript. DEV Community. Retrieved 2 June 2022, from https://dev.to/fahadhassan1213/build-a-pomodoro-timer-using-javascript-3d13 and https://github.com/fahadhassan1213/Pomodoro-Timer 

const descForm = document.querySelector('.desc-form')
const myBtns = document.querySelector('.my-btns');
const errorMessage = document.querySelector('.error')
const remTime = document.querySelector('.remTime');
const notice = document.querySelector('.noticeBoard')

const completed = document.querySelector('.completed-list')

let workDuration = descForm.workTime.value;
let breakDuration = descForm.breakTime.value;
let shortDesc = descForm.shortDesc.value;
let timeRatio_of_progress = ((workDuration * 60)/100) * 1000;

descForm.workTime.addEventListener('keyup',e=>{
    errorMessage.classList.add('d-none')
    workDuration = e.target.value;
    workMinutes = workDuration - 1;
    timeRatio_of_progress = ((workDuration * 60)/100) * 1000;
   
})
descForm.breakTime.addEventListener('keyup',e=>{  
    errorMessage.classList.add('d-none')
    breakDuration = e.target.value;
    breakMinutes = breakDuration - 1;

})
descForm.shortDesc.addEventListener('keyup',e=>{
    errorMessage.classList.add('d-none')
    shortDesc = e.target.value;    
})



//Variables
let workMinutes  = workDuration -1;
let breakMinutes = breakDuration -1;
let timer1 = undefined
let timer2 = undefined
let breakcount = 0;
let seconds = 60;
let currentTime = undefined;
let EndTime = undefined;
let width = 0;



// buttons and their actions
myBtns.addEventListener('click',(e)=>{
    if(e.target.classList.contains('start')){
        if(workDuration !== '0' && workDuration !==''){
            if(breakDuration !== '0' && breakDuration !== ''){
                if(shortDesc !== ''){
                    myIntervals();
                    disabling();
                    console.log(1)
                    myBtns.children[1].classList.remove('d-none')
                    myBtns.children[2].classList.add('d-none')
                    const checkCurrtime = new Date();
                    currentTime = checkCurrtime.toLocaleTimeString();
                }
                else{
                errorMessage.classList.remove('d-none')
                }
            }
            else{
            errorMessage.classList.remove('d-none')
            }
        }
        else{
            errorMessage.classList.remove('d-none')
        }
            
        }
    else if(e.target.classList.contains('pause')){
        clearInterval(timer1);
        clearInterval(timer2)
        myBtns.children[1].classList.add('d-none')
        myBtns.children[0].classList.remove('d-none')
    }
    else if(e.target.classList.contains('resume')){
        myIntervals();
        myBtns.children[0].classList.add('d-none')
        myBtns.children[1].classList.remove('d-none')
    }
    else if(e.target.classList.contains('stop')){
        myBtns.children[0].classList.add('d-none')
        myBtns.children[1].classList.add('d-none')
        myBtns.children[2].classList.remove('d-none')

        const checkEndtime = new Date();
        EndTime = checkEndtime.toLocaleTimeString();

        let html = `
        <div class="item my-4">
            <h5 class="px-4 mb-2 pt-3" style="color: green;">${shortDesc}</h5>
            <p class="px-4 fw-normal">${sessionTime()}</p>
        </div>     `
        completed.innerHTML += html
        clearAll();
    }

})




//function that shows the remaining time to user
let timeReamaining = () =>{
    seconds = seconds - 1;
    if(seconds === 0){
        workMinutes = workMinutes - 1;
        if(workMinutes === -1){
            if(breakcount % 2 === 0){
                workMinutes = breakMinutes;
                breakcount = breakcount + 1;
                notice.innerText = `(Break Time)` 
    
            }else{
                width = 1;
                workMinutes = workDuration - 1;
                breakcount = breakcount + 1;
                notice.innerText = ' ';

        } 
    }
        seconds = 59;
    }

//Here we are rendering the change in time on the timer screen       
let html = `${workMinutes<10? `0${workMinutes}`:workMinutes}:${seconds<10? `0${seconds}`:seconds}`
remTime.innerText = html;  
}


const progressBar1 = document.querySelector('.p1')
const progressBar2 = document.querySelector('.p2')
let increaseProgress = () =>{
    if(width === 100){
        progressBar1.style.width = 1 + '%'
        progressBar2.style.width = 1 + '%'
    }else{
        width ++;
        progressBar1.style.width = width + '%';
        progressBar2.style.width = width + '%';
    
    }
    
}

//function to start time intervals
let myIntervals = () =>{
    timer1 = setInterval(timeReamaining,1000);
    timer2 = setInterval(increaseProgress,timeRatio_of_progress)
}

let disabling = () =>{
   descForm.workTime.disabled = true
   descForm.breakTime.disabled = true
   descForm.shortDesc.disabled = true
}
let enabling = () =>{
    descForm.workTime.disabled = false;
    descForm.breakTime.disabled = false;
    descForm.shortDesc.disabled = false;
    descForm.reset();
}

//function to reset all values
let clearAll = () =>{
    enabling();
    clearInterval(timer1)
    clearInterval(timer2)
    workMinutes = workDuration - 1;
    seconds = 60;
    breakMinutes = breakDuration - 1;
    shortDesc = ''
    progressBar1.style.width = 1 + '%'
    progressBar2.style.width = 1 + '%'
    remTime.textContent = `00:00`
    notice.textContent = '';
    width = 1

}

//function to show the starting and ending time 
let sessionTime = () =>{
    return `Session was started at ${currentTime} and ended at ${EndTime}`
}







