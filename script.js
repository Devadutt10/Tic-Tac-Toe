//Variables...

const restartBtn = document.querySelector(".resetBtn");
const cells = Array.from(document.querySelectorAll(".cube")); //Converting the cells into an array format
const currentTurn = document.querySelector("span");
const winnerText = document.querySelector(".winnerText");
console.log(cells);
let winnerFound = false;

let gameActive = true;
let currentPlayer = "X";
let winningLogic = [
  [0,1,2],
  [3,4,5],
  [6,7,8],  //Winning conditions based on the indices of the array
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];


//Event listener for adding X's and O's to the cells...
cells.forEach(cell => {
  cell.addEventListener('click',function(){
    
    if(gameActive && cell.innerHTML == ""){
      if(currentPlayer == "X"){
        cell.innerHTML = currentPlayer;
        currentPlayer = "O";
        currentTurn.innerHTML = "O's";
        cell.style.color = "red";
      }
      else{
        cell.innerHTML = currentPlayer;
        currentPlayer = "X";
        currentTurn.innerHTML = "X's";
        cell.style.color = "green";
      }
    }
    checkForWinner();
    checkForDraw();
  })
});

//Event listener for restarting the game
restartBtn.addEventListener('click',function(){
  restartFunction();
});

//Checking for winner by checking if each of the winning combination cells are equal
const checkForWinner = () => {
  for(let combo of winningLogic){
    let [a,b,c] = combo;
    if (cells[a].innerHTML == cells[b].innerHTML && cells[b].innerHTML == cells[c].innerHTML && cells[a].innerHTML != ""){
      console.log("Winner is found");
      winnerFound = true;
      displayWinner(cells[a].innerHTML);
    }
  }
  return; 
}


//Function for displaying the winner
const displayWinner = (winner) =>{
  winnerText.innerHTML = `${winner} is the winner!`;
  gameActive = false;
  return;
}

//Function for restartin the game by setting everthing to their default values...
const restartFunction = () =>{
  cells.forEach(cell => {
    cell.innerHTML = "";
    cell.style.color = "";
  });
  currentPlayer = "X";
  gameActive = true;
  winnerText.innerHTML = "";
  currentTurn.innerHTML = "X's";
}
 
//Checking for a draw..

const checkForDraw = () =>{
  let count = 0;
  cells.forEach(cell => {
    if(cell.innerHTML != ""){ //Checks each cell for an empty value, and if found, it increments the count
      count++;
    }
  });
  if(count == 9 && winnerFound==false){
    winnerText.innerHTML = "The game is a tie!"
  }
}







