// STOPWATCH JS --------------------------

let hr = min = sec = ms = 0;
let t;
let startBtn = document.querySelector(".start");

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

function displayTimer() {
  document.querySelector(".hours").innerHTML = ("0" + hr).slice(-2);
  document.querySelector(".minutes").innerHTML = ("0" + min).slice(-2);
  document.querySelector(".seconds").innerHTML = ("0" + sec).slice(-2);
//   document.querySelector(".milliseconds").innerHTML = ("0" + ms).slice(-2);
}

function startTimer() {
  startBtn.disabled = true;
  t = setInterval(countUp, 10);
}
function stopTimer() {
  clearInterval(t);
  startBtn.disabled = false;
}
function resetTimer() {
  clearInterval(t);
  hr = min = sec = ms = 0;
  displayTimer();
  startBtn.disabled = false;
}



// TASKLIST JS --------------------------

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

// add rest of information here so that it shows up
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


// POMODORO JS --------------------------

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




//function, which is for showing the remaining time to user
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
//Here we are rendring the change in time on the timer screen       
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

//fucntion to start time intervals
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

//fuction to show the starting and ending time 
let sessionTime = () =>{
    return `Session was started at ${currentTime} and ended at ${EndTime}`
}



// DICTIONARY JS ----------------------------------

const wrapper = document.querySelector(".wrapper"),
searchInput = wrapper.querySelector("input"),
volume = wrapper.querySelector(".word i"),
infoText = wrapper.querySelector(".info-text"),
synonyms = wrapper.querySelector(".synonyms .list"),
removeIcon = wrapper.querySelector(".search span");
let audio;

function data(result, word){
    if(result.title){
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
    }else{
        wrapper.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0],
        phontetics = `${result[0].meanings[0].partOfSpeech}  /${result[0].phonetics[0].text}/`;
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phontetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        document.querySelector(".example span").innerText = definitions.example;
        audio = new Audio("https:" + result[0].phonetics[0].audio);

        if(definitions.synonyms[0] == undefined){
            synonyms.parentElement.style.display = "none";
        }else{
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";
            for (let i = 0; i < 5; i++) {
                let tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[i]},</span>`;
                tag = i == 4 ? tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[4]}</span>` : tag;
                synonyms.insertAdjacentHTML("beforeend", tag);
            }
        }
    }
}

function search(word){
    fetchApi(word);
    searchInput.value = word;
}

function fetchApi(word){
    wrapper.classList.remove("active");
    infoText.style.color = "#000";
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(response => response.json()).then(result => data(result, word)).catch(() =>{
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
    });
}

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





