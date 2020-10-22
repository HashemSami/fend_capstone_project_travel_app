const formComponent = (url, text, note) => {
  return `
  <section id="usrform">
    <form>
        <input type="text" value="${url}" id="url" form="usrform" placeholder="Enter a page URL to analyze it's text">
        <textarea rows="6" cols="40" id="text" form="usrform" placeholder="Try your own text...">${text}</textarea>
        <button type="button" onclick="Client.handleForm()">Analyze</button>
    </form>
    <div id="note">${note}</div>
</section>`;
};

export { formComponent };
