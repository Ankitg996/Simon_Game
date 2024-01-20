let arrMaster = [];
let clickCount;
let information = document.getElementById('information');
let button = document.getElementById('btn');


$('.card').each(function (ele) { // 0, 1 , 2, 3 .
	element = $('.card')[ele];
	// console.log('element',element);
	colorEle = element.dataset.backgroundcolor;
	$(`.${colorEle}`).css('backgroundColor', colorEle);
})
$('body').keypress(function (event) {
	// console.log('you have hit', event.key);
	if (arrMaster.length === 0) {
		if (event.key === 's') {
			startGame();
		}
		else {
			information.innerHTML = "Press 's' key or 'button' start the game!";
		}
	}
	else if (event.key === 'r') {
		readValue('red')
	}
	else if (event.key === 'y') {
		readValue('yellow')
	}
	else if (event.key === 'b') {
		readValue('blue')
	}
	else if (event.key === 'g') {
		readValue('green')
	}
	else {
		buttonSound('error');
		information.innerHTML = "you've pressed wrong Key";
	}
})

$('.card').on('click', function hitted(ele) {
	let color = ele.target.getAttribute('data-backgroundcolor')
	if (arrMaster.length === 0) {
		return information.innerHTML = "Press 's' key or 'button' start the game!"
	}
	readValue(color)
});

function randomValue() {
	let randomValue = Math.floor((Math.random() * 4) + 1);
	let obj = {
		1: "green",
		2: "red",
		3: "yellow",
		4: "blue"
	};
	randomColor = obj[randomValue];
	return randomColor
}

function writeValue() {
	let randomColor = randomValue();
	let selectedElement = document.getElementsByClassName(randomColor)[0];
	selectedElement.classList.add('clicked');
	buttonSound(randomColor)
	arrMaster.push(randomColor);
	setTimeout(() => {
		selectedElement.classList.remove('clicked');
	}, 1500);
	clickCount = 0;
}

function readValue(clickedColor) {
	let clickedElement = document.getElementsByClassName(clickedColor)[0];
	clickedElement.classList.add('clicked');
	setTimeout(() => {
		clickedElement.classList.remove('clicked');
	}, 500);
	if (clickedColor == arrMaster[clickCount]) {
		buttonSound(clickedColor)
		if (arrMaster.length === (clickCount + 1)) {
			information.innerHTML = `you've cleared the level ${clickCount + 1}`;
			setTimeout(() => {information.innerHTML = `Level ${clickCount + 2}`
			}, 1000);
			setTimeout(() => { writeValue() }, 2000)
			return;
		}
		clickCount += 1;
	} else {
		buttonSound('error')
		information.innerHTML = "You Lose! Better luck next time."
		arrMaster = [];
		clickCount = 0;
		setTimeout(()=>{information.innerHTML = "Press 's' key or 'button' start the game!"; buttonSound('start')}, 2000)
		button.style.display = "block"
	}
}

function startGame() {
	information.innerHTML = "Play..."
	writeValue()
	console.log(arrMaster);
	clickCount = 0;
	button.style.display = "none"
}

function buttonSound(color){
	let audio = new Audio(`assets/${color}.mp3`)
	audio.play()
}