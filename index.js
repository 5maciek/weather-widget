/////////////// GLOBAL VARIABLES \\\\\\\\\\\\\\\
let time = 11;
let wasTomorrow = false;
const days = [
  'Niedziela',
  'Poniedziałek',
  'Wtorek',
  'Środa',
  'Czwartek',
  'Piątek',
  'Niedziela',
];
const ul = document.querySelector('ul.rows__value__list');
const rains = document.querySelectorAll('.rainfall');


/////////////// ROWS ADDITIONAL FUNCTIONS \\\\\\\\\\\\\\\
function getNameDay(wasTomorrow) {
  if (!wasTomorrow) {
    return 'Jutro';
  } else {
    const today = new Date().getDay();
    if (today === 5) {
      return days[0];
    }
    else if (today === 6) {
      return days[1];
    }
    return days[today + 2];
  }
}

function getHour() {
  time++;
  if (time === 24) {
    wasTomorrow = true;
    time = 0;
  }
  return time < 10 ? `0${time}:00` : `${time}:00`;
}

function randomWind() {
  return Math.floor(Math.random() * (30 - 1)) + 1;
}

function getWindStrengthText(wind) {
  if (wind > 20) {
    return 'Silny';
  } else if (wind > 10) {
    return 'Umiar.';
  }
  return 'Słaby';
}

function randomRotateArrowWind() {
  return Math.floor(Math.random() * (360 - 1)) + 1;
}

function getWindDirectionName(rotate) {
  if (rotate > 300 && rotate < 346) {
    return 'Południowy';
  } else if (rotate > 255 && rotate < 301) {
    return 'Pł.-Zach.';
  } else if (rotate > 210 && rotate < 256) {
    return 'Zachodni';
  } else if (rotate > 165 && rotate < 211) {
    return 'Pn.-Zach.';
  } else if (rotate > 120 && rotate < 166) {
    return 'Północny';
  } else if (rotate > 75 && rotate < 121) {
    return 'Pn.-Wsch.';
  } else if (rotate > 30 && rotate < 76) {
    return 'Wschodni';
  } else {
    return 'Pł.-Wsch.';
  }
}

function randomRainfall() {
  const isRain = Math.floor(Math.random() * (100 - 1)) + 1;
  if (isRain > 90) {
    return Math.floor(Math.random() * (30 - 1)) + 1;
  }
  return 0;
}

function getImage(time, rain) {
  if (rain > 15) {
    return ['icons/cloud_heavy_rain.svg', 'clound heavy rain'];
  } else if (rain < 15 && rain > 0) {
    return ['icons/cloud_rain.svg', 'cloud rain'];
  } else if (time > 21 || time < 7) {
    return ['icons/cloud_with_moon.svg', 'cloud moon'];
  } else {
    const randomImage = Math.random();
    if (randomImage > 0.5) {
      return ['icons/cloud.svg', 'cloud'];
    } else {
      return ['icons/sun.svg', 'sun'];
    }
  }
}

/////////////// CREATE DIVs FUNCTIONS \\\\\\\\\\\\\\\
function createDivDay() {
  let divDay = document.createElement('div');
  if (time === 23) {
    divDay.textContent = getNameDay(wasTomorrow);
  }
  else {
    divDay.textContent = '';
  }
  divDay.classList.add('day');
  return divDay;
}

function createDivHour() {
  const divHour = document.createElement('div');
  divHour.classList.add('hour');
  const spanHour = document.createElement('span');
  spanHour.textContent = getHour();
  divHour.appendChild(spanHour);
  return divHour;
}

function createDivRain(rain) {  
  const divForecast = document.createElement('div');
  divForecast.classList.add('forecast');
  const imgForecast = document.createElement('img');
  imgForecast.setAttribute('src', getImage(time, rain)[0]);
  imgForecast.setAttribute('alt', getImage(time, rain)[1]);
  divForecast.appendChild(imgForecast);
  return divForecast;
}

function createDivWeatherImage(rain) {  
  const divForecast = document.createElement('div');
  divForecast.classList.add('forecast');
  const imgForecast = document.createElement('img');
  imgForecast.setAttribute('src', getImage(time, rain)[0]);
  imgForecast.setAttribute('alt', getImage(time, rain)[1]);
  divForecast.appendChild(imgForecast);
  return divForecast;
}

function createDivTemperature() {  
  const divTemperature = document.createElement('div');
  divTemperature.classList.add('temperature');
  return divTemperature;
}

function createDivRainfall(rain) {  
  const divRainfall = document.createElement('div');
  divRainfall.classList.add('rainfall');
  if (rain) {
    const pRainfallText = document.createElement('p');
    pRainfallText.textContent = (rain / 10).toFixed(1) + ' mm';
    const divWater = document.createElement('div');
    divWater.classList.add('water');
    divWater.style.height = `${rain}px`;
    divRainfall.appendChild(pRainfallText);
    divRainfall.appendChild(divWater);
  }
  return divRainfall;
}

function createDivWindDirection() {  
  const divWindDirection = document.createElement('div');
  divWindDirection.classList.add('windDirection');
  const imgArrowWind = document.createElement('img');
  imgArrowWind.setAttribute('src', 'icons/wind_arrow.svg');
  imgArrowWind.setAttribute('alt', 'icons/wind_arrow.wind arrow');
  const windDirection = randomRotateArrowWind();
  imgArrowWind.style.transform = `rotate(${windDirection}deg)`;
  const pWindDirection = document.createElement('p');
  pWindDirection.textContent = getWindDirectionName(windDirection);
  divWindDirection.appendChild(imgArrowWind);
  divWindDirection.appendChild(pWindDirection);
  return divWindDirection;
}

function createDivWindSpeed() {  
  const divWindSpeed = document.createElement('div');
  divWindSpeed.classList.add('windSpeed');
  const pWindSpeedText = document.createElement('p');
  pWindSpeedText.classList.add('wind_strength_text');
  const wind = randomWind();
  pWindSpeedText.textContent = getWindStrengthText(wind);
  divWindSpeed.appendChild(pWindSpeedText);
  const pWindSpeedValue = document.createElement('p');
  pWindSpeedValue.classList.add('wind_strength_speed');
  pWindSpeedValue.textContent = `${wind} km/h`;
  divWindSpeed.appendChild(pWindSpeedValue);
  return divWindSpeed;
}

function createDivPressure() {  
  const divPressure = document.createElement('div');
  divPressure.classList.add('pressure');
  return divPressure;
}

/////////////// GENERATE LI HTML \\\\\\\\\\\\\\\
function createLiElement() {
  const li = document.createElement('li');
  li.classList.add('rows__value__item');  
  li.appendChild(createDivDay());
  li.appendChild(createDivHour());  
  const rain = randomRainfall();
  li.appendChild(createDivWeatherImage(rain));  
  li.appendChild(createDivTemperature());
  li.appendChild(createDivRainfall(rain));
  li.appendChild(createDivWindDirection());
  li.appendChild(createDivWindSpeed());
  li.appendChild(createDivPressure());  
  ul.appendChild(li);
}

/////////////// GENERATE LI ITEMS \\\\\\\\\\\\\\\
for (let i = 0; i < 47; i++) {
  createLiElement();
}

/////////////// HANDLE ANIMATION GRAB and CLICK \\\\\\\\\\\\\\\
const slider = document.querySelector('ul.rows__value__list');
const buttonPrev = document.querySelector('div.btn__prev');
const buttonNext = document.querySelector('div.btn__next');

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  displayButton(slider.scrollLeft);
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
  displayButton(slider.scrollLeft);
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX);
  slider.scrollLeft = scrollLeft - walk;
  displayButton(slider.scrollLeft);
});

buttonPrev.addEventListener('click', () => {  
  let id = setInterval(frame, 5);
  let pos = 0;
  function frame() {
    if (pos == 60) {
      clearInterval(id);
    } else {
      pos++;
      slider.scrollLeft = slider.scrollLeft - 1;
    }
  }  
  displayButton(slider.scrollLeft);
});

buttonNext.addEventListener('click', () => {
  let id = setInterval(frame, 5);
  let pos = 0;
  function frame() {
    if (pos == 60) {
      clearInterval(id);
    } else {
      pos++;
      slider.scrollLeft = slider.scrollLeft + 1;
    }
  }
  displayButton(slider.scrollLeft);
});

function displayButton(offset) {
  if (offset < 60) {
    buttonPrev.style.visibility = 'hidden';
  } else {
    buttonPrev.style.visibility = 'visible';
  }
  if (offset > 2100) {
    buttonNext.style.visibility = 'hidden';
  } else {
    buttonNext.style.visibility = 'visible';
  }
}






