import {
  remainingTime,
  startTimerBtn,
  pauseTimerBtn,
  breakBtn,
  longBreakBtn,
  learningDiv,
  defaultModeDiv,
  timerBtn,
  learningBtn,
  leaveLearningBtn,
} from './selectors';

let learningTime = 1800;
let learningTimeInterval: any;
let audio = document.getElementById('alarm') as HTMLAudioElement;

export function initLearningMode(): void {
  learningBtn.addEventListener('click', () => {
    toggleMode();
  });

  leaveLearningBtn.addEventListener('click', () => {
    toggleMode();
    clearLearningInterval();
  });

  startTimerBtn.addEventListener('click', () => {
    startTimerBtn.classList.toggle('hidden');
    pauseTimerBtn.classList.toggle('hidden');
    remainingTime.textContent = formatTime(learningTime);
    learningTimeInterval = setInterval(() => {
      learningTime--;
      remainingTime.textContent = formatTime(learningTime);
      if (learningTime === 0) {
        timesUp();
      }
    }, 1000);
  });

  pauseTimerBtn.addEventListener('click', () => {
    startTimerBtn.classList.toggle('hidden');
    pauseTimerBtn.classList.toggle('hidden');
    clearLearningInterval();
  });

  breakBtn.addEventListener('click', () => {
    resetButtons();
    clearLearningInterval();
    learningTime = 300;
    remainingTime.textContent = formatTime(learningTime);
  });

  longBreakBtn.addEventListener('click', () => {
    resetButtons();
    clearLearningInterval();
    learningTime = 900;
    remainingTime.textContent = formatTime(learningTime);
  });

  timerBtn.addEventListener('click', () => {
    resetButtons();
    clearLearningInterval();
    learningTime = 1800;
    remainingTime.textContent = formatTime(learningTime);
  });
}
//learningmode
function toggleMode(): void {
  learningDiv.classList.toggle('hidden');
  defaultModeDiv.classList.toggle('hidden');
  learningBtn.classList.toggle('hidden');
  leaveLearningBtn.classList.toggle('hidden');
}

function clearLearningInterval(): void {
  clearInterval(learningTimeInterval);
}

function formatTime(timeInSeconds: number): string {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = String(timeInSeconds % 60);
  return `${minutes}:${seconds.length > 1 ? seconds : '0' + seconds}`;
}

function timesUp(): void {
  clearLearningInterval();
  audio.play();
  remainingTime.textContent = "Time's up";
  learningTime = 1800;
}

//to reset all buttons
function resetButtons() {
  startTimerBtn.classList.value = 'start-timer-btn';
  pauseTimerBtn.classList.value = 'pause-timer-btn hidden';
}
