import  './styles/index.css';
import moment from 'moment';
import imgGift from './assets/gift.jpeg'

const notes = document.querySelector('.notes');
 

const imgEl= document.getElementById('giftImg')
imgEl.src= imgGift

let map = new Map();
map.set(1, 'Monday');
map.set(2, 'Tuesday');
map.set(3, 'Wednesday');
map.set(4, 'Thursday');
map.set(5, 'Friday');
map.set(6, 'Saturday');
map.set(7, 'Sunday');

const futureDate = moment().add(10, 'days');
const createGiveawayNotes = (date) => {
  const weekday = date.isoWeekday();
  const res = `Giveaway ends on ${map.get(weekday)}, ${date.format(
    'MMMM Do YYYY, h:mm:ss a'
  )}`;
  return res;
};

notes.textContent = createGiveawayNotes(futureDate);

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('mins');
const secondsEl = document.getElementById('secs');

const format = (number) => {
  if (number > 10) return number.toString();
  return `0${number}`;
};
const displayRemainTime = () => {
  console.log('display Remain Time')
  let diff = futureDate.unix() - moment().unix();

  if (diff < 0) {
    clearInterval(countDown);
  }
  const secondsPerDay = 24 * 60 * 60;
  const secondsPerHour = 60 * 60;

  let days = Math.floor(diff / secondsPerDay);
  let hours = Math.floor((diff - days * secondsPerDay) / secondsPerHour);

  let minutes = Math.floor(
    (diff - days * secondsPerDay - hours * secondsPerHour) / 60
  );
  let seconds =
    (diff - days * secondsPerDay - hours * secondsPerHour - minutes * 60) % 60;

  daysEl.textContent = format(days);
  hoursEl.textContent = format(hours);
  minutesEl.textContent = format(minutes);
  secondsEl.textContent = format(seconds);
};

displayRemainTime();
const countDown = setInterval(displayRemainTime, 1000);
