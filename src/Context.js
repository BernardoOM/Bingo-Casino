import React, { useState, useEffect, useCallback } from "react"
import {
   createCardNumbers,
   getCardNumbersSetup,
   resetRandomNumbers,
   createBingoNumbers,
   createBingoRandomResults,
   getBingoRandomResults,
   resetBingoRandomResults,
} from "./utils"

const TOTAL_BINGO_NUMBERS = 25
const Context = React.createContext()

function ContextProvider({ children }) {
   const [playBingo, setPlayBingo] = useState(false)
   const [cardNumbers, setCardNumbers] = useState([])
   const [bingoResults, setBingoResults] = useState([])
   const [counterResult, setCounterResult] = useState(0)
   const [bingoTexts, setBingoTexts] = useState("")
   const [linesVetify, setLinesVerify] = useState([false, false, false, false, false])

   const resetBingo = useCallback(() => {
      if (!playBingo) {
         ;(async () => {
            resetRandomNumbers()
            const numbers = createCardNumbers(TOTAL_BINGO_NUMBERS)
            await numbers
            setCardNumbers(getCardNumbersSetup())
         })()
      }
   }, [playBingo])

   useEffect(() => {
      if (!playBingo) {
         resetBingo()
      }
   }, [resetBingo, playBingo])

   useEffect(() => {
      if (playBingo && counterResult < 75) {
         setTimeout(() => {
            let results = getBingoRandomResults()
            let updatedNumber = results.find((number, index) => {
               return index === counterResult && number
            })
            setBingoResults((prevResults) => [...prevResults, updatedNumber])
            setCounterResult(counterResult + 1)
         }, 5000)
      } else if (playBingo && counterResult >= 75) {
         setTimeout(() => {
            resetRandomNumbers()
            setCounterResult(0)
            resetBingoRandomResults()
            setBingoResults([])
            setPlayBingo(false)
            setBingoTexts("")
            setLinesVerify([false, false, false, false, false])
         }, 5000)
      }
   }, [playBingo, counterResult])

   function handlePlayBingo() {
      createBingoNumbers()
      createBingoRandomResults()
      setPlayBingo(true)
   }

   const selectNumber = (id) => {
      const numbers = cardNumbers.map((number) => {
         if (number.id === id) {
            number.selected = !number.selected
         }
         return number
      })
      setCardNumbers(numbers)
   }

   const checkBingoCall = () => {
      const selectedNumbers = cardNumbers
         .map((number) => {
            return !isNaN(number.value) && number.selected && number.value
         })
         .filter((selectedNumber) => selectedNumber)

      if (selectedNumbers.length > 0) {
         bingoResults.forEach((winner) => {
            let selectedWinner = selectedNumbers.find((number) => number === winner)
            if (selectedWinner) {
               cardNumbers.map((number) => {
                  if (!isNaN(number.value) && number.selected && number.value === selectedWinner) {
                     number.selected = false
                     number.winner = true
                  }
                  return number
               })
            }
         })
      }
      checkBingoCard()
   }

   function checkBingoCard() {
      let lineB = 0
      let lineI = 0
      let lineN = 0
      let lineG = 0
      let lineO = 0
      let completed = 0

      cardNumbers.forEach((number, index) => {
         if (!isNaN(number.value) && number.winner) {
            completed += 1
         }

         if (index >= 1 && index <= 5) {
            lineB = !isNaN(number.value) && number.winner && lineB + 1
         } else if (index >= 7 && index <= 11) {
            lineI = !isNaN(number.value) && number.winner && lineI + 1
         } else if (index >= 13 && index <= 17) {
            lineN = !isNaN(number.value) && number.winner && lineN + 1
         } else if (index >= 19 && index <= 23) {
            lineG = !isNaN(number.value) && number.winner && lineG + 1
         } else if (index >= 25 && index <= 29) {
            lineO = !isNaN(number.value) && number.winner && lineO + 1
         }
      })

      if (completed === 25) {
         setBingoTexts("SAY B I N G O ... YOU HAVE WON, CONGRATS!")
      }

      if (lineB === 5 && !linesVetify[0]) {
         setLinesVerify(
            linesVetify.map((line, index) => {
               if (index === 0) {
                  line = !line
               }
               return line
            })
         )
         setBingoTexts((prevBingoTexts) =>
            prevBingoTexts.concat(bingoTexts.length > 0 ? ", Line B" : "You have won: Line B")
         )
      }

      if (lineI === 5 && !linesVetify[1]) {
         setLinesVerify(
            linesVetify.map((line, index) => {
               if (index === 1) {
                  line = !line
               }
               return line
            })
         )
         setBingoTexts((prevBingoTexts) =>
            prevBingoTexts.concat(bingoTexts.length > 0 ? ", Line I" : "You have won: Line I")
         )
      }

      if (lineN === 5 && !linesVetify[2]) {
         setLinesVerify(
            linesVetify.map((line, index) => {
               if (index === 2) {
                  line = !line
               }
               return line
            })
         )
         setBingoTexts((prevBingoTexts) =>
            prevBingoTexts.concat(bingoTexts.length > 0 ? ", Line N" : "You have won: Line N")
         )
      }

      if (lineG === 5 && !linesVetify[3]) {
         setLinesVerify(
            linesVetify.map((line, index) => {
               if (index === 3) {
                  line = !line
               }
               return line
            })
         )
         setBingoTexts((prevBingoTexts) =>
            prevBingoTexts.concat(bingoTexts.length > 0 ? ", Line G" : "You have won: Line G")
         )
      }

      if (lineO === 5 && !linesVetify[4]) {
         setLinesVerify(
            linesVetify.map((line, index) => {
               if (index === 4) {
                  line = !line
               }
               return line
            })
         )
         setBingoTexts((prevBingoTexts) =>
            prevBingoTexts.concat(bingoTexts.length > 0 ? ", Line O" : "You have won: Line O")
         )
      }
   }

   return (
      <Context.Provider
         value={{
            cardNumbers,
            playBingo,
            bingoResults,
            bingoTexts,
            selectNumber,
            handlePlayBingo,
            resetBingo,
            checkBingoCall,
         }}
      >
         {children}
      </Context.Provider>
   )
}

export { ContextProvider, Context }
