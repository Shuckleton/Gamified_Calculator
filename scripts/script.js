
let history = [];

//Global Counters
let historyLimit = 0;
let historyMaxLimit = 10;
//Achievement Trackers

const userInput = document.getElementById('inputField');
const taskDiv = document.getElementById('taskContainer');

//save to storage
const saveTask = ()=>{
    localStorage.setItem('history', JSON.stringify(history));
    console.log('Saved to Local Storage');
}

const loadTask = ()=>{
    const stored = localStorage.getItem('history');
    if (stored){
        history = JSON.parse(stored);
    }
}

const renderGlobalStats=()=>{
    limitLbl.innerHTML=historyLimit;

    //monitor global stats
    if (historyLimit > historyMaxLimit-1){
      createDialogBox('Memory full, please delete or buy more space','Warning!!!'); 
      playSound('error');
      equal.disabled=true;
    }
    else{
      equal.disabled=false;
    }
}

//backspace
backspace.addEventListener('click',()=>{
      userInput.value=userInput.value.slice(0,-1);
})

const createHistoryEntry=(item)=>{

    const div = document.createElement('div');
    div.className='entryContainer';
    div.id=`history-${item.id}`;

    const id = document.createElement('span');
    id.textContent=item.id;
   
  
    const expression = document.createElement('span');
    expression.textContent=item.expression;
    expression.className='expressionClass';
    div.appendChild(expression);


    const equal = document.createElement('span');
    equal.textContent = ' = ';
    equal.className='expressionClass';
    div.appendChild(equal);

    const answer = document.createElement('span');
    answer.textContent=item.answer;
    answer.className='expressionClass';
    div.appendChild(answer);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className='deleteButton';
    div.appendChild(deleteBtn);

    deleteBtn.addEventListener('click',()=>{

        deleteHistory(item.id);
    })

    return div;
}

const renderHistory = () =>{
  taskDiv.innerHTML='';
  history.forEach(item=>{
    const entry = createHistoryEntry(item);
    historyLimit++;
    taskDiv.appendChild(entry);
    renderGlobalStats();
  })
}

reset.addEventListener('click',()=>{
    playSound('reboot');
    reset.innerHTML='Resetting...'
    setTimeout(()=>{
       localStorage.clear();
       taskDiv.innerHTML='';
       achievementDiv.innerHTML='';
      reset.innerHTML='Reset'
    },6000);
 
})


loadTask();
renderHistory();