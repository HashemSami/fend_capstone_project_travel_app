const resultComponent = (analysis) => {
  if (analysis.err || !analysis) {
    return "no";
  }
  return `
    <section>
    test
      ${analysis}
  </section>`;
};

export { resultComponent };
