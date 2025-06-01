let achievements = [
  { id: 1, name: "First Calculation", desc: "You made your very first calculation!", unlocked: false },
  { id: 2, name: "Calculator Marathon", desc: "Completed 10 calculations.", unlocked: false },
  { id: 3, name: "Big Brain", desc: "Used the power operator ** once.", unlocked: false },
  { id: 4, name: "Master of Zero", desc: "Got result zero 3 times.", unlocked: false },
  { id: 5, name: "Operator Overload", desc: "Used +, -, *, /, and % at least once each.", unlocked: false },
  { id: 6, name: "Lucky Seven", desc: "Got result 7 two times.", unlocked: false }
];

const achievementCounters = {
  totalCalculations: 0,
  bigBrainOps: 0,
  zeroResults: 0,
  operatorUsage: { '+': false, '-': false, '*': false, '/': false, '%': false },
  luckySeven: 0,
};

// Save achievements and counters to localStorage
const saveMilestones = () => {
  localStorage.setItem('achievements', JSON.stringify(achievements));
  localStorage.setItem('achievementCounters', JSON.stringify(achievementCounters));
  console.log('Saved to Local Storage');
}

// Load achievements from localStorage
const loadMilestones = () => {
  const stored = localStorage.getItem('achievements');
  if (stored) {
    achievements = JSON.parse(stored);
  }
}

// Load counters from localStorage
const loadCounters = () => {
  const storedCounters = localStorage.getItem('achievementCounters');
  if (storedCounters) {
    Object.assign(achievementCounters, JSON.parse(storedCounters));
  }
}

const achievementDiv = document.getElementById('achievementContainer');
achievementDiv.innerHTML = '';

const renderAchievements = () => {
  achievements.forEach(item => {
    if (item.unlocked) {
      const entry = createAchievementsUI(item);
      achievementDiv.appendChild(entry);
    }
  });
}

const createAchievementsUI = (item) => {
  const div = document.createElement('div');
  div.className = 'achievementEntry';

  const name = document.createElement('span');
  name.textContent = item.name + ' :  ';
  name.className = 'commonText';
  div.appendChild(name);

  const desc = document.createElement('span');
  desc.textContent = ' '+ item.desc;
  desc.className = 'commonText';
  div.appendChild(desc);

  return div;
}

const unlockAchievement = (id) => {
  const updatedAchievement = achievements.map(item => {
    if (!item.unlocked && item.id === id) {
      // Use your dialog box here:
      createDialogBox(item.desc, item.name);

      const entry = createAchievementsUI(item);
      achievementDiv.appendChild(entry);
      playSound('yey');
      return { ...item, unlocked: true };
    }
    return item;
  });
  achievements = updatedAchievement;
  saveMilestones();
};

const isUnlocked = (id) => achievements.find(a => a.id === id)?.unlocked;

const updateCounters = (expression, result) => {
  achievementCounters.totalCalculations++;

  if (expression.includes('**')) achievementCounters.bigBrainOps++;
  if (parseFloat(result) === 0) achievementCounters.zeroResults++;

  ['+', '-', '*', '/', '%'].forEach(op => {
    if (expression.includes(op)) achievementCounters.operatorUsage[op] = true;
  });

  if (parseFloat(result) === 7) achievementCounters.luckySeven++;
};

const checkAchievements = () => {
  // Check all conditions against counters and unlock if necessary

  if (!isUnlocked(1) && achievementCounters.totalCalculations >= 1) unlockAchievement(1);
  if (!isUnlocked(2) && achievementCounters.totalCalculations >= 10) unlockAchievement(2);
  if (!isUnlocked(3) && achievementCounters.bigBrainOps >= 1) unlockAchievement(3);
  if (!isUnlocked(4) && achievementCounters.zeroResults >= 3) unlockAchievement(4);
  if (!isUnlocked(5) && Object.values(achievementCounters.operatorUsage).every(v => v)) unlockAchievement(5);
  if (!isUnlocked(6) && achievementCounters.luckySeven >= 2) unlockAchievement(6);

  saveMilestones();
};

const unlockCondition = (expression, result) => {
  updateCounters(expression, result);
  checkAchievements();
};



// Load from storage on page load
loadMilestones();
loadCounters();
renderAchievements();
