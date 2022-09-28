import "./App.css"
import Bingo from "./components/Bingo"
import ContentResult from "./components/ContentResult"
import { useContext } from "react"
import { Context } from "./Context"

export default function App() {
   const { bingoResults, bingoTexts, playBingo } = useContext(Context)

   const numbersB =
      bingoResults.length > 0 &&
      bingoResults.filter((number) => number >= 1 && number <= 15).sort((a, b) => a - b)
   const numbersI =
      bingoResults.length > 0 &&
      bingoResults.filter((number) => number >= 16 && number <= 30).sort((a, b) => a - b)
   const numbersN =
      bingoResults.length > 0 &&
      bingoResults.filter((number) => number >= 31 && number <= 45).sort((a, b) => a - b)
   const numbersG =
      bingoResults.length > 0 &&
      bingoResults.filter((number) => number >= 46 && number <= 60).sort((a, b) => a - b)
   const numbersO =
      bingoResults.length > 0 &&
      bingoResults.filter((number) => number >= 61 && number <= 75).sort((a, b) => a - b)

   return (
      <>
         <div className="App-container">
            <header>
               <h1 className="App-title">Bingo Casino</h1>
            </header>
            <div className="App-content">
               <div className="App-letters-container">
                  <div className="App-letter-container">
                     <ContentResult isLetter={true} value="B" />
                     {numbersB.length > 0
                        ? numbersB.map((number) => {
                             return <ContentResult key={number} value={number} />
                          })
                        : ""}
                  </div>
                  <div className="App-letter-container">
                     <ContentResult isLetter={true} value="I" />
                     {numbersI.length > 0
                        ? numbersI.map((number) => {
                             return <ContentResult key={number} value={number} />
                          })
                        : ""}
                  </div>
                  <div className="App-letter-container">
                     <ContentResult isLetter={true} value="N" />
                     {numbersN.length > 0
                        ? numbersN.map((number) => {
                             return <ContentResult key={number} value={number} />
                          })
                        : ""}
                  </div>
                  <div className="App-letter-container">
                     <ContentResult isLetter={true} value="G" />
                     {numbersG.length > 0
                        ? numbersG.map((number) => {
                             return <ContentResult key={number} value={number} />
                          })
                        : ""}
                  </div>
                  <div className="App-letter-container">
                     <ContentResult isLetter={true} value="O" />
                     {numbersO.length > 0
                        ? numbersO.map((number) => {
                             return <ContentResult key={number} value={number} />
                          })
                        : ""}
                  </div>
               </div>
               <div className="App-bingo-container">
                  <h2 className="App-message">{playBingo ? bingoTexts : ""}</h2>
                  <Bingo />
               </div>
            </div>
         </div>
      </>
   )
}
