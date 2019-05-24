const moment = require('moment')
const notifier = require('node-notifier')
const path = require('path')
const remote = require('electron').remote

//const elNow = document.querySelector('.now-time')
//const elAlarm = document.querySelector('.alarm-time')
//elAlarm.addEventListener('change', onAlarmTextChange)
const profile = document.querySelector('img')
const dialogue = document.querySelector('span#dialogue-text')
const button = document.querySelector('a#setTimerBtn')
button.addEventListener('click', startTimer)

var stopFlag = false
var pre = -1
let time = moment()

let nowTime
let alarmTime

// set clock
const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {
  const seconds = moment().second();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const mins = moment().minute();
  const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;

  const hour = moment().hour();
  const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  
  randomDialogue(hour)
}

function randomDialogue(x) {
  if (x == pre) return
  pre = x
  switch(x) {
    case 1: // 
      profile.src = "img/icon9.png"
      dialogue.innerText = "Oh, you are still here. Let's chat. I am fine. How about you?"
      break
    case 2:
      dialogue.innerText = "They say, those who remain awaken at 2 are either night-shifters, graduates or programmers"
      profile.src = "img/icon6.png"
      break
    case 3:
      profile.src = "img/icon7.png"
      dialogue.innerText = "Are you shuffling Youtube videos now? Because I always do it in the absolute midnight!"
      break
    case 4:
      profile.src = "img/icon11.png"
      dialogue.innerText = "You might fall into either sleep-too-late or wake-up-too-early syndromes."
      break
    case 5:
      profile.src = "img/icon10.png"
      dialogue.innerText = "How wonderful it is to have the first glimpse at the spectacular dawn, where two hues of tint mingle in the canvas of sky and the glorious sun reveals itself from the silent night!"
      break
    case 6:
      profile.src = "img/icon3.png"
      dialogue.innerText = "Time to work and study! Yes indeed I am a stickler for self-discipline"
      break
    case 7:
      profile.src = "img/icon4.png"
      dialogue.innerText = "In our country, seven in the morning is when we deliver eulogy to the mighty ol catepillar about taxation, humanitarian crisis and the problem of evil. I am talking about daydreaming."
      break
    case 8:
      profile.src = "img/icon12.png"
      dialogue.innerText = "Today I would like to read a book from my piles of reading list. Too bad my reading speed never catch up the growth of desideratum."
      break
    case 9:
      profile.src = "img/icon1.png"
      dialogue.innerText = "What do you expect from me? You may be dissapointed but I can only offer you this harrowing paradox: Happier the whole, sadder the individual"
      break
    case 10:
      profile.src = "img/icon2.png"
      dialogue.innerText = "It would be salubrious to have some exercises. Stretch your arms, legs and muscles to keep your soul in a healthy container!"
      break
    case 11:
      profile.src = "img/icon10.png"
      dialogue.innerText = "I believe that technically, we should use the nth anniversary of birthday instead of birthday to refer to the day n years after our day of birth. Um... Do you think I'm weird? "
      break
    case 12:
      profile.src = "img/icon7.png"
      dialogue.innerText = "I have Beef Lasagna with loads of besciamella and parmesan cheese for lunch! I must be the most blissful guy in the world!"
      break
    case 13:
      profile.src = "img/icon1.png"
      dialogue.innerText = "I am utterly sorry that you have to listen to my faulty, partial lunch break grumble: DLC ruins the game industry."
      break
    case 14:
      profile.src = "img/icon9.png"
      dialogue.innerText = "It's playtime! I am playing Zenmora, a self-invented card game that the objective is to tear the opponent's card apart. You are saying I am mistaken? I don't care."
      break
    case 15:
      profile.src = "img/icon4.png"
      dialogue.innerText = "If hate is horse, then flaw is fuel. If love is lunar, then crater is challenge. Welcome to my nonsensical poem time."
      break
    case 16:
      profile.src = "img/icon8.png"
      dialogue.innerText = "Hello. You won't see me often. Goodbye."
      break
    case 17:
      profile.src = "img/icon5.png"
      dialogue.innerText = "Time to have a nib of Ceylon teas and a Charlotte cake as refreshment."
      break
    case 18:
      profile.src = "img/icon5.png"
      dialogue.innerText = "I would like to take this opportunity to talk about the meaning of life: full stop. I am done. Thank you."
      break
    case 19:
      profile.src = "img/icon3.png"
      dialogue.innerText = "It feels good to be at home! Do you love your little personal space?"
      break
    case 20:
      profile.src = "img/icon11.png"
      dialogue.innerText = "I have a very meaningful day. I feel self-improved, horizon-broaden and mind-enlighten!"
      break
    case 21:
      profile.src = "img/icon8.png"
      dialogue.innerText = "'A little sexual frustration, combined with lack of motivation...' WAIT! Forget all about it! I'm just being nostalgia!"
      break
    case 22:
      profile.src = "img/icon6.png"
      dialogue.innerText = "If fatigue worths a penny, then I am now a billion- nah a trillionaire."
      break
    case 23:
      profile.src = "img/icon12.png"
      dialogue.innerText = "I wish today is Friday! This wish grows stronger when it comes to eleven. Good night by the way."
      break
    default:
      profile.src = "img/icon2.png"
      dialogue.innerText = "Welcome to the brand new day! Strangely everyone loves to witness twelve right before the New Year while sleeping through them in the rest of the year. Except maybe for Halloween."
  }
}

setInterval(setDate, 1000);

setDate();

// timer related
const thour = document.querySelector('span#hours');
const tmin = document.querySelector('span#minutes');
const tsec = document.querySelector('span#seconds');

/* Set time */
function startTimer() {
  console.log("start timer")
  button.removeEventListener('click', startTimer)
  button.addEventListener('click', stopTimer)
  button.innerText = "Stop Timer"
  const now = moment().format('HH:mm:ss')
  nowTime = now
  //elNow.innerText = now

  const alarm = moment().add(1, 'hours').format('HH:mm:ss')
  alarmTime = alarm
  //elAlarm.value = alarm
  console.log(alarm)
  timer()
}
/* Now time */
function timer() {
    console.log("timer")
	time = moment().format('HH:mm:ss')
	
	/* Set now time */
	nowTime = time
	//elNow.innerText = time
	
	check()
	
	if (!stopFlag) {
      setTimeout(() => {
          timer()
      }, 1000)
    } else {
      console.log("reset timer")
      thour.innerText = '01'
      tmin.innerText = '00'
      tsec.innerText = '00'
      stopFlag = false
      button.innerText = "Start Timer"
      button.removeEventListener('click', stopTimer)
      button.addEventListener('click', startTimer)
    }
}

function stopTimer() {
  console.log("stop timer")
  stopFlag = true
}

/* check time */
function check() {
	const diff = moment(alarmTime, 'HH:mm:ss').diff(moment(nowTime, 'HH:mm:ss'), 'seconds')
    if (Math.abs(diff) >= 0) {
      let abs_diff = diff < 0 ? 86400 + diff : diff
      console.log(abs_diff)
      //thour.innerText = ( Math.floor(diff/3600) == 0 ? '00' : (Math.floor(diff/3600)).toString());
      thour.innerText = '00';
      tmin.innerText = ( Math.floor(abs_diff/60) == 0 ? '00' : (Math.floor(abs_diff/60)).toString());
      tsec.innerText = ( abs_diff%60 == 0 ? '00' : (abs_diff%60).toString());
    }

	if (diff === 0) {
		const msg = "It's" + alarmTime + ". Hope you enjoyed the moment!"
		notice(msg)
        console.log("stop timer")
        stopFlag = true
	}
}

/* Update alarm time variable */
function onAlarmTextChange(event) {
	alarmTime = event.target.value
}

function notice(msg) {
	const window = remote.getCurrentWindow()
	window.restore()
	window.show()
	window.focus()
	
	notifier.notify({
		title: 'As time ',
		message: msg,
		icon: path.join(__dirname, 'clock.ico'),
		sound: true,
	})
}