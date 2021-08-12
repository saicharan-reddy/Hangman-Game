//Object definition for games and their associated properties
function game(gameName, gameConsole, gameSound, gameBackground, gameHistory){

	this.gName=gameName;
	this.gConsole=gameConsole;
	this.gHistory=gameHistory;
	this.gSound=gameSound;
	this.gBackground=gameBackground;
	//property of the constructor/object and not of the instance. Counts instances of the constructor/object.
	game.instances++;
}

//Initializing the counter
game.instances = 0;

//Object association for consoles will be related back to game object
function systems(systemsName, systemsBackground, systemsSound){
	this.sName=systemsName;
	this.sbackground=systemsBackground;
	this.sSound=systemsSound;
	//property of the constructor/object and not of the instance. Counts instances of the constructor/object.
	systems.instances++;
}

//Initializing the counter
systems.instances=0;

//Defining instances of games that will make up the word bank
var game1 = new game("Streets of Rage II", "SEGA");
var game2 = new game("Sonic the Hedgehog II", "SEGA");
var game3 = new game("Super Mario Bros", "NES");
var game4 = new game("Duck Hunt", "NES");
var game5 = new game("Donkey Kong Country", "SNES");
var game6 = new game("Street Fighter II", "SNES");
var game7 = new game("Contra", "NES");
var game8 = new game("Pokemon", "GBOY");
var game9 = new game("Tetris", "GBOY");


//Defining instances of systems that will relate back to games
var system1 = new systems("SEGA");
var system2 = new systems("NES");
var system3 = new systems("SNES");
var system4 = new systems("GBOY");

//Setting system backgrounds
system1.sbackground= [
	 "url(assets/Systems/Sega/Background/SEGA1.png)"
	,"url(assets/Systems/Sega/Background/SEGA2.png)"
	,"url(assets/Systems/Sega/Background/SEGA3.jpg)"
	,"url(assets/Systems/Sega/Background/SEGA4.jpg)"
	,"url(assets/Systems/Sega/Background/SEGA5.png)"
	,"url(assets/Systems/Sega/Background/SEGA6.gif)"
];

system2.sbackground= [
	 "url(assets/Systems/NES/Background/NES1.jpg)"
	,"url(assets/Systems/NES/Background/NES2.jpg)"
	,"url(assets/Systems/NES/Background/NES3.png)"
	,"url(assets/Systems/NES/Background/NES4.jpg)"
	,"url(assets/Systems/NES/Background/NES5.jpg)"	
];

system3.sbackground= [
	 "url(assets/Systems/SNES/Background/SNES1.jpeg)"
	,"url(assets/Systems/SNES/Background/SNES2.jpg)"
	,"url(assets/Systems/SNES/Background/SNES3.png)"
	,"url(assets/Systems/SNES/Background/SNES4.jpg)"
	,"url(assets/Systems/SNES/Background/SNES5.jpg)"
	,"url(assets/Systems/SNES/Background/SNES6.jpg)"
	,"url(assets/Systems/SNES/Background/SNES7.jpg)"
	,"url(assets/Systems/SNES/Background/SNES8.jpg)"
	,"url(assets/Systems/SNES/Background/SNES9.png)"
];

system4.sbackground=[
	 "url(assets/Systems/GameBoy/Background/GBOY1.jpg)"
	,"url(assets/Systems/GameBoy/Background/GBOY2.jpg)"
	,"url(assets/Systems/GameBoy/Background/GBOY3.jpg)"
	,"url(assets/Systems/GameBoy/Background/GBOY4.jpg)"
	,"url(assets/Systems/GameBoy/Background/GBOY5.jpg)"
	]

// Setting system audio
system1.sSound="assets/Systems/Sega/Sounds/SEGA1.mp3";
system2.sSound="assets/Systems/NES/Sounds/NES1.mp3";
system3.sSound="assets/Systems/SNES/Sounds/SNES1.mp3";
system4.sSound="assets/Systems/GameBoy/Sounds/GBOY1.mp3";


var wordArray = [];

var currentGame = " ";
var currentSystem = " ";

for (i=1; i<=game.instances; i++){
	var gameVar = "game" + i;
	// console.log(window[gameVar]);
	wordArray.push(window[gameVar].gName);
};

//Word choice index
var wordChoiceIndex = "";
function wordChoice(){
	wordChoiceIndex = Math.floor(Math.random()*wordArray.length); 
	return wordArray[wordChoiceIndex].toUpperCase();
	};
var	guessingWord = wordChoice();

//Setting 'current' variables to current game and system
function findCurrentPick() {
	var currentGameName = wordArray[wordChoiceIndex];
	//console.log("This is the variable ", currentGameName)
	for(i = 1; i<=game.instances; i++){
		var gameVar = "game" + i;
		if (window[gameVar].gName === currentGameName){
			//Assigning current game stored into global variable currentGame.
			currentGame = window[gameVar];

			for(i = 1; i<=systems.instances; i++){
				var systemVar = "system" + i;
				if (currentGame.gConsole === window[systemVar].sName){
					//console.log(currentGame.gConsole, window[systemVar].sName);
					
					//Assign current system into global variable current system;
					currentSystem = window[systemVar];
					
					return currentSystem.sbackground;
				}
				else {
					console.log("false");

				}
			}
		}
	}
};
// Global variable for system start up sound intialize with shortest audio file.
var systemStartUpSound = new Audio(system4.sSound);
//Setting the theme of the game
function setupTheme(){
	findCurrentPick();
	
	var cGameVar = currentGame;
	var cSystemVar = currentSystem;
	var sBackgroundVar = " ";

	//choosing random background of the game board to system of game
	sBackgroundVar = cSystemVar.sbackground[Math.floor(Math.random()*cSystemVar.sbackground.length)];
	//setting background to the chosen background
	document.body.style.backgroundImage = sBackgroundVar;

	//setting up Audio
	systemStartUpSound = new Audio(cSystemVar.sSound);
	systemStartUpSound.play(); 
};

var currentGameBoard = [];
function setGameBoard(){
	for (i=0; i<guessingWord.length; i++){
		if (guessingWord.charAt(i) !== " "){
			currentGameBoard.push("_");
			// document.getElementById("wordToGuess").innerHTML += "_ "
		}
		else{
			// document.getElementById("wordToGuess").innerHTML+= "&nbsp&nbsp";
			currentGameBoard.push("&nbsp");
		}
	}
	//outputs the game board with "_" for each letter and spaces for inbetween 
	document.getElementById("wordToGuess").innerHTML=currentGameBoard.join("");
};

var userGuess = " ";
//Capture Userinput from keyboard
document.onkeypress = function(keypress){
	userGuess = keypress.key;
	// console.log(userGuess);
	userGuess = userGuess.toUpperCase();
	console.log(userGuess);
	console.log(hpBar.value);
	var letters = /^[A-Za-z]+$/;
	if (!WinLose(hpBar)){
		if (userGuess.match(letters)){
			userInputCheck(userGuess);
			// console.log("Hello this is from inside the loop!")
		} 
		else{
			return;
		}
	}
	else{
		return;
	} 
};
var correctGuess = 0;
var incorrectGuess = 0;
var incorrectLetterArray = [];

function userInputCheck (x){
	if (incorrectLetterArray.indexOf(x) === -1){
		if (guessingWord.indexOf(x) === -1){
				incorrectGuess++;
				hpUpdate();
				incorrectLetterArray.push(x);
				document.getElementById("incorrectLetter").innerHTML = incorrectLetterArray.join(" ");
				WinLosePopUp(hpBar);
		}
		else{
			for (i=0; i<guessingWord.length; i++){
				if (guessingWord.charAt(i) === x){
					correctGuess++;
					currentGameBoard[i] = x;
				}
			}
			document.getElementById("wordToGuess").innerHTML=currentGameBoard.join("");
			WinLosePopUp(hpBar);
		}
	}
	else{
		return;
	}
};

function hpUpdate (){
	var hp = document.getElementById("hpBar")
	hp.value = (100 - (incorrectGuess*10));
};

function WinLose(hpts){
	if(currentGameBoard.indexOf("_") === -1 || hpts.value === 0){
		return true;
	}
	else {
		return false;
	}
};

function WinLosePopUp(hpts){
	if(currentGameBoard.indexOf("_")===-1){
		document.getElementsByClassName("flexBodyGame")[0].classList.toggle("invisible");
		document.getElementsByClassName("win")[0].classList.toggle("invisible");
		document.getElementById("winWord").innerHTML = guessingWord;
	}
	else if (hpts.value ===0){
		document.getElementsByClassName("flexBodyGame")[0].classList.toggle("invisible");
		document.getElementsByClassName("lose")[0].classList.toggle("invisible");
	};
};

function initialize (){
	//Pause any music currently playing.
	if (!systemStartUpSound.paused){
		systemStartUpSound.pause();
	}

	guessingWord = wordChoice();
	currentGameBoard=[];

	incorrectLetterArray=[];
	correctGuess = 0;
	incorrectGuess = 0;
	hpUpdate();

	document.getElementById("incorrectLetter").innerHTML = incorrectLetterArray.join("");

	setupTheme();
	setGameBoard();

	if (!document.getElementsByClassName("startUp")[0].classList.contains("invisible")){
		document.getElementsByClassName("startUp")[0].classList.toggle("invisible");
		document.getElementsByClassName("flexBodyGame")[0].classList.toggle("invisible");
	}
	else if(!document.getElementsByClassName("win")[0].classList.contains("invisible")){
		document.getElementsByClassName("flexBodyGame")[0].classList.toggle("invisible");
		document.getElementsByClassName("win")[0].classList.toggle("invisible");
	}
	else if(!document.getElementsByClassName("lose")[0].classList.contains("invisible")){
		document.getElementsByClassName("flexBodyGame")[0].classList.toggle("invisible");
		document.getElementsByClassName("lose")[0].classList.toggle("invisible");
	}
};
