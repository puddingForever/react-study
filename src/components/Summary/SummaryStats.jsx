import React from 'react';
/**
 * 결과 통계
 */
const SummaryStats = ({ stats }) => {
  const skipped = stats.skipped / stats.total * 100;
  const correct = stats.correct / stats.total * 100;
  const wrong = stats.wrong / stats.total * 100;
  return (
    <div id="summary-stats">
      <p>
        <span className="number">{skipped}%</span>
        <span className="text">SKIPPED</span>
      </p>
      <p>
        <span className="number">{correct}%</span>
        <span className="text">ANSWERED CORRECTLY</span>
      </p>
      <p>
        <span className="number">{wrong}%</span>
        <span className="text">ANSWERED INCORRECTLY</span>
      </p>
    </div>
  );
};

export default SummaryStats;