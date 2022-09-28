import "../style-sheets/ContentResult.css"

export default function ContentResult({ isLetter = false, value }) {
   return (
      <div className={`${isLetter ? "Content-letter" : "ContentResult-container"}`}>{value}</div>
   )
}
