import "../style-sheets/Number.css"

export default function Number({ id, value, isSelected, isWinner, selectedNumber }) {
   return (
      <div
         className={`${isSelected ? "Number-container selected" : "Number-container "}${
            isWinner ? "winner" : ""
         }`.trimEnd()}
         onClick={() => !isWinner && selectedNumber(id)}
      >
         {value}
      </div>
   )
}
