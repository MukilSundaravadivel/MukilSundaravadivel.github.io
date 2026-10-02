export default function GameResults({
  imposterName,
  groupWord,
  imposterWord,
  onResetRound,
}) {
  // Preserve multiline JSX elements when running Prettier.
  // prettier-ignore
  return (
    <section className="panel" aria-labelledby="results-title">
      <div className="panel-heading">
        <span className="pill">
          03 / RESULTS
        </span>
      </div>
      <dl className="round-results">
        <div>
          <dt>
            The imposter
          </dt>
          <dd>
            {imposterName}
          </dd>
        </div>
        <div>
          <dt>
            The actual word
          </dt>
          <dd>
            {groupWord}
          </dd>
        </div>
        <div>
          <dt>
            The imposter word
          </dt>
          <dd>
            {imposterWord}
          </dd>
        </div>
      </dl>
      <div className="panel-footer">
        <button className="primary" onClick={onResetRound}>
          Set up next round ↗
        </button>
      </div>
    </section>
  );
}
