import { useContext } from "react"
import Letter from "./Letter"
import Number from "./Number"
import { Context } from "../Context"
import "../style-sheets/Bingo.css"

export default function Bingo() {
   const { cardNumbers, selectNumber, playBingo, handlePlayBingo, resetBingo, checkBingoCall } =
      useContext(Context)

   return (
      <div className="Bingo-container">
         <div className="Bingo-buttons-container">
            {playBingo ? (
               <button onClick={() => checkBingoCall()}>Call Bingo</button>
            ) : (
               <button onClick={() => handlePlayBingo()}>Play Bingo</button>
            )}
            {!playBingo && <button onClick={() => resetBingo()}>Reset Bingo</button>}
         </div>
         <div className="BingoCard-main-container">
            {cardNumbers.map((number) => {
               if (
                  number.value === "B" ||
                  number.value === "I" ||
                  number.value === "N" ||
                  number.value === "G" ||
                  number.value === "O"
               ) {
                  return <Letter key={number.id} value={number.value} />
               } else {
                  return (
                     <Number
                        key={number.id}
                        id={number.id}
                        value={number.value}
                        isSelected={number.selected}
                        isWinner={number.winner}
                        selectedNumber={selectNumber}
                     />
                  )
               }
            })}
         </div>
      </div>
   )
}
