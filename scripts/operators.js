//operators
let currentInput;
 
const appendValue=(buttonValue)=>{
    currentInput = userInput.value;
    userInput.value= currentInput + buttonValue;
}

//SOLVER

equal.addEventListener('click',()=>{
      const finalInput = userInput.value;

      if (finalInput !=''){
          solveExpression(finalInput);
      }
    }
)

const solveExpression = (input) => {
  const result = eval(input);
  answerLbl.innerHTML = result;
  addHistory(result, input);
  unlockCondition(input, result); 
  userInput.value = '';
};


const addHistory=(answer,expression)=>{

  const newHistory = {
    id:Date.now(),   
    expression:expression,
    answer:answer
  }

  history = [...history,newHistory];

  const entry = createHistoryEntry(newHistory);
  taskDiv.appendChild(entry);
  historyLimit = historyLimit+1;
  renderGlobalStats();
  saveTask();
}

const deleteHistory=(id)=>{
  history = history.filter(item=>item.id !== id)
  const entry = document.getElementById(`history-${id}`)
  if (entry){
     entry.remove();
  }
  historyLimit = historyLimit-1;

  renderGlobalStats();
  playSound('hallway')
  saveTask();
}