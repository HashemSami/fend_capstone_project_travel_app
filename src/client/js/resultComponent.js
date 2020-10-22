const resultComponent = (analysis) => {
  if (analysis.err || Object.keys(analysis).length === 0) {
    return "<p></p>";
  }
  const {
    confidence,
    irony,
    score_tag,
    agreement,
    sentence_list,
    subjectivity,
  } = analysis;

  const polarity = (score) => {
    switch (score) {
      case "P+":
        return "Strong positive";
      case "P":
        return "Positive";
      case "NEU":
        return "Neutral";
      case "N":
        return "Negative";
      case "N+":
        return "Strong Negative";
      default:
        return "not found";
    }
  };
  return `
    <section id="result">
    <div id="overall">
    <h4>Overall analysis</h4>
    <p>Confidence: <span>${confidence}%</span></p>
    <p>Irony: <span>${irony}</span></p>
    <p>Overall polarity of the text : <span>${polarity(score_tag)}</span> </P>
    <p>Dose the content has an agreement between the sentiments detected in the text? : <span> ${
      agreement === "AGREEMENT" ? "Yes" : "No"
    }</span></p>
    <p>Does the content has any subjectivity? : <span>${
      subjectivity === "OBJECTIVE" ? "No" : "Yes"
    }</span></p>
    </div>
    <table>
    <tr id="table-head">
    <th>Sentence / Word detected</th>
    <th>Beginning of the paragraph</th>
    <th>Confidence</th>
    <th>Polarity</th>
    </tr>
    ${sentence_list
      .map((sentence) => {
        const { text, bop, confidence, score_tag } = sentence;
        return `
      <tr>
      <td>${text}</td>
      <td>${bop}</td>
      <td>${confidence}</td>
      <td>${polarity(score_tag)}</td>
      </tr>
      `;
      })
      .join(" ")}
    </table>
  </section>`;
};

export { resultComponent };
