import { useState } from "react";
import { generateRandomInteger, validateBounds } from "./randomNumber.js";

export default function RandomNumberGenerator() {
  const [minimum, setMinimum] = useState("1");
  const [maximum, setMaximum] = useState("100");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function changeMinimum(event) {
    setMinimum(event.target.value);
    setResult(null);
    setError("");
  }

  function changeMaximum(event) {
    setMaximum(event.target.value);
    setResult(null);
    setError("");
  }

  function generateNumber(event) {
    event.preventDefault();
    const validationError = validateBounds(minimum, maximum);
    setError(validationError);
    if (validationError) {
      setResult(null);
      return;
    }
    const randomNumber = generateRandomInteger(
      Number(minimum),
      Number(maximum),
    );
    setResult(randomNumber);
  }

  // Preserve multiline JSX elements when running Prettier.
  // prettier-ignore
  return (
    <section className="panel" aria-labelledby="random-number-title">
      <h2 id="random-number-title">
        Pick a random number.
      </h2>
      <form onSubmit={generateNumber}>
        <div className="word-fields">
          <label>
            Minimum
            <input type="number" step="1" value={minimum} onChange={changeMinimum} required />
          </label>
          <label>
            Maximum
            <input type="number" step="1" value={maximum} onChange={changeMaximum} required />
          </label>
        </div>
        <p className="hint">
          Whole numbers only. Both bounds are included.
        </p>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <div className="number-result" role="status" aria-live="polite" aria-atomic="true">
          {result !== null && (
            <output aria-label="Random number">
              {result}
            </output>
          )}
        </div>
        <div className="panel-footer">
          <button className="primary" type="submit">
            Generate number ↗
          </button>
        </div>
      </form>
    </section>
  );
}
