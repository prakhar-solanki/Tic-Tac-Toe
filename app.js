let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let newgameBtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");
let turnO = true; // true for player X, false for player O
let count = 0; // Count of moves made

const winPatterns = [
    [0, 1, 2], // Row 1
    [0, 3, 6], // Column 1
    [0, 4, 8], // Diagonal 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [2, 4, 6], // Diagonal 2
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
];
const resetGame = () => {
    turnO = true; // Reset turn to player X
    count = 0; // Reset move count
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let iswinner = checkWinner();
        if (count === 9 && !iswinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
};
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = ""; // Clear the box text
    }
};
const showwinner = (winner) => {
    msg.innerText = `Winner is: ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};
const checkWinner = () => {
    for(let Pattern of winPatterns) {
        let pos1value = boxes[Pattern[0]].innerText;
        let pos2value = boxes[Pattern[1]].innerText;
        let pos3value = boxes[Pattern[2]].innerText;

        if (pos1value != "" && pos2value != "" && pos3value != "") {
            if (pos1value === pos2value && pos2value === pos3value) {
                showwinner(pos1value);
                return true; // Winner found
            }
        }
    }
};
newgameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);