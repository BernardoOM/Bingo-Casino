import { v4 as uuidv4 } from "uuid"
let cardNumbers = []
let cardNumbersSetup = []
/*Bingo Winner lines and diagonals*/
export const lines = () => {
   return [
      [1, 2, 3, 4, 5], // B
      [7, 8, 9, 10, 11], // I
      [13, 14, 15, 16, 17], // N
      [19, 20, 21, 22, 23], // G
      [25, 26, 27, 28, 29], // O
   ]
}
export const diagonals = () => {
   return [[1, 5], [8, 10], 15, [22, 20], [29, 25]]
}

function getRandomNumber(min, max) {
   min = Math.ceil(min)
   max = Math.floor(max)
   return Math.floor(Math.random() * (max - min) + min)
}

async function addRandomNumber(min, max) {
   let randomNumber = getRandomNumber(min, max)
   const promise = new Promise((resolve) => {
      if (cardNumbers.length > 0) {
         let found = cardNumbers.find((number) => number === randomNumber)
         while (found) {
            randomNumber = getRandomNumber(min, max)
            found = cardNumbers.find((number) => number === randomNumber)
         }
         cardNumbers.push(randomNumber)
      } else {
         let randomNumber = getRandomNumber(min, max)
         cardNumbers.push(randomNumber)
      }
      resolve()
   })
   return promise
}

function createCardNumbersSetup() {
   cardNumbers.forEach((value, index) => {
      if (index === 0) {
         cardNumbersSetup.push({
            id: uuidv4(),
            value: "B",
         })
      } else if (index === 5) {
         cardNumbersSetup.push({
            id: uuidv4(),
            value: "I",
         })
      } else if (index === 10) {
         cardNumbersSetup.push({
            id: uuidv4(),
            value: "N",
         })
      } else if (index === 15) {
         cardNumbersSetup.push({
            id: uuidv4(),
            value: "G",
         })
      } else if (index === 20) {
         cardNumbersSetup.push({
            id: uuidv4(),
            value: "O",
         })
      }
      cardNumbersSetup.push({
         id: uuidv4(),
         value: value,
         selected: false,
         winner: false,
      })
   })
}

export async function createCardNumbers(totalNumbers) {
   let count = 0
   let currentStep = 0
   let min = 1
   let max = min + 15
   while (currentStep < totalNumbers) {
      if (count === 5) {
         min = max
         max = min + 15
         count = 0
      } else {
         await addRandomNumber(min, max)
         currentStep += 1
         count += 1
      }
   }
   cardNumbers.sort((a, b) => a - b)
   createCardNumbersSetup()
}

export function getCardNumbersSetup() {
   return cardNumbersSetup
}

export function resetRandomNumbers() {
   cardNumbers = []
   cardNumbersSetup = []
}

/*Bingo System*/
let bingoNumbers = []
let bingoRandomResults = []

export function createBingoNumbers() {
   for (let index = 0; index < 75; index++) {
      bingoNumbers.push(index + 1)
   }
}

export function createBingoRandomResults() {
   while (bingoNumbers.length > 0) {
      if (bingoNumbers.length > 0) {
         const randomIndex = getRandomNumber(0, bingoNumbers.length - 1)
         const random = bingoNumbers[randomIndex]
         bingoNumbers = bingoNumbers.filter((number) => number !== random)
         bingoRandomResults.push(random)
      }
   }
}

export function getBingoRandomResults() {
   return bingoRandomResults
}

export function resetBingoRandomResults() {
   bingoRandomResults = []
}

// function addUserWinningNumber() {
//    userCardBingoNumbers.forEach((userNumber) => {
//        if (hasWinnerNumber(userNumber)) {
//            userWinningNumbers.push(userNumber)
//        }
//    })
// }

// function hasWinnerNumber(number) {
//    return resultCardBingoNumbers[resultCardBingoNumbers.length - 1] === number
// }

// function checkUserWon(winningNumbers) {
//    //Complete Bingo Card
//    if (winningNumbers.length === 25) {
//        console.log("CONGRATS! YOU HAVE COMPLETED YOUR CARD BINGO!")
//        userWon = true
//    } else if (winningNumbers.length >= 5) {
//        //const lineH = ()
//        const lineV = userHasVerticalLine(
//            userLetterBNumbers,
//            userLetterINumbers,
//            userLetterNNumbers,
//            userLetterGNumbers,
//            userLetterONumbers,
//            winningNumbers
//        )
//        if (lineV) {
//            console.log(lineV)
//        }
//        //const lineD = ()
//    }
// }
// const HORIZONTAL_LINES = [
//    { letter: "B", indexes: [1, 7, 13, 19, 25] },
//    { letter: "I", indexes: [2, 8, 14, 20, 26] },
//    { letter: "N", indexes: [3, 9, 15, 21, 27] },
//    { letter: "G", indexes: [4, 10, 16, 22, 28] },
//    { letter: "O", indexes: [5, 11, 17, 23, 29] },
// ]
// export const lines = () => {
//    return [
//       { letter: "B", indexes: [1, 2, 3, 4, 5] },
//       { letter: "I", indexes: [7, 8, 9, 10, 11] },
//       { letter: "N", indexes: [13, 14, 15, 16, 17] },
//       { letter: "G", indexes: [19, 20, 21, 22, 23] },
//       { letter: "O", indexes: [25, 26, 27, 28, 29] },
//    ]
// }
// export const diagonals = () => {
//    return [
//       { letter: "B", indexes: [1, 5] },
//       { letter: "I", indexes: [8, 10] },
//       { letter: "N", indexes: [15] },
//       { letter: "G", indexes: [22, 20] },
//       { letter: "O", indexes: [29, 25] },
//    ]
// }
