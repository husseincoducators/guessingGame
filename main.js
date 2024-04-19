//Choosing level : 
const buttonLvl1 = document.querySelector('#babyMode');
const buttonLvl2 = document.querySelector('#normalMode');
const buttonLvl3 = document.querySelector('#hardMode');
//Main Components :
const selection = document.querySelector('.selection');
const gameInt = document.querySelector('.gameInt');
const submit = document.querySelector('#submit');
const answer = document.querySelector('#answer');
//Phases of game :
const loading = document.querySelector('.dice-cont');
const standby = document.querySelector('.standby');
const result = document.querySelector('.result');
//Stats components :
const lifeBar = document.querySelector('#life');
const scoreLabel = document.querySelector('#score');
//result components : 
const resultText = document.querySelector('#result-text');
const resultEmoji = document.querySelector('#result-emoji');
const resultExpected = document.querySelector('#result-expected');
const resultGuess = document.querySelector('#result-guess');

//Main Variables :
let level;
let lives = 0;
let score = 0;
let guess;

//we can do health where we can check if lives > 0, then we run the setlives, if not we end the game with said lives.

const checkLife = () => {
    if(lives > 0){

        lifeBar.innerHTML = "Lives : ";

        for(let i = 0; i < lives; i++){
            lifeBar.innerHTML += "❤";
        }

    } else {
        resultText.innerHTML = "You have died !";
        resultEmoji.innerHTML = '😓';
        resultExpected.innerHTML = `result expected : Not to die.`;
        resultGuess.innerHTML = `result gotten : you died.`;

        standby.style.display = 'none';
        result.style.display = 'flex';
    }
}

const checkScore = () => {
    if(score === 15){
        resultText.innerHTML = "You have won !!";
        resultEmoji.innerHTML = '😎';
        resultExpected.innerHTML = `result expected : you to win`;
        resultGuess.innerHTML = `result gotten : you won UwU`;

        standby.style.display = 'none';
        result.style.display = 'flex';
    } else {
        scoreLabel.innerHTML = `Score : ${score}`; //changing score label
    }
}

const load = async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
}

const newGuess = async ()=>{

    //disabling button
    submit.setAttribute('disabled','');
    //showing the loading bit
    loading.style.display = 'flex';
    standby.style.display = 'none';
    result.style.display = 'none';

    guess = Math.floor((Math.random() * 10) + 1);
    //check the guess problem with checkguess function adn event listener below
    console.log(guess)

    await load();

    //hiding the loading bit
    loading.style.display = 'none';
    standby.style.display = 'flex';
    //enabling button again
    submit.removeAttribute('disabled','');

}

const checkGuess = async (pGuess) => {

    submit.setAttribute('disabled','');
    
    if(parseInt(pGuess) === guess){

        resultText.innerHTML = "You got it right !";
        resultEmoji.innerHTML = '🤩';
        resultExpected.innerHTML = `The result expected is : ${guess}`;
        resultGuess.innerHTML = `Your guess was : ${pGuess}`;

        standby.style.display = 'none';
        result.style.display = 'flex';

        answer.value = ""; //emptying textbar

        score = score + 1; //incrementing score

        checkScore();

        await load();

        if(lives === 0 || score === 15){
            location.reload();
        } else {
            newGuess();
        }

    } else {

        resultText.innerHTML = "You got it wrong !";
        resultEmoji.innerHTML = '😥';
        resultExpected.innerHTML = `The result expected is : ${guess}`;
        resultGuess.innerHTML = `Your guess was : ${pGuess}`;

        standby.style.display = 'none';
        result.style.display = 'flex';

        answer.value = ""; //emptying textbar

        lives = lives - 1; //decrementing life

        checkLife(); //running checkLifes to update lives

        await load();

        if(lives === 0 || score === 15){
            location.reload();
        } else {
            newGuess();
        }   
    }

}

const gameStart = async (lvl)=>{

    level = lvl;

    console.log(level);

    if(level === 1){
        lives = 5;
    } else if( level === 2){
        lives = 3;
    } else {
        lives = 1;
    }

    checkLife();
    selection.classList.add('active'); //active class for selection makes it invisible
    gameInt.classList.add('active');   // active class for gameInt makes it visibile checkk css

    newGuess();

}

submit.addEventListener('click',()=>{
    
    if(answer.value !== ""){
        let x = answer.value;
        checkGuess(x);
    } else {
        alert('please enter a guess !')
    }

})

//setting the level of the game

buttonLvl1.addEventListener('click',()=>{
    gameStart(1);
});

buttonLvl2.addEventListener('click',()=>{
    gameStart(2);
});

buttonLvl3.addEventListener('click',()=>{
    gameStart(3);
});


//to create lives we can create a function that appends children taht are tiny images heart, and it can create them according to a value. so basically a function that takes a parameter of number which is the lives and we can call it everytime we want to decreaaaaaaase
