const formComponent = (url, text, note) => {
  return `
  <section id="usrform">
    <form>
      <div id="travel-location">
        <label for="location">Traveling to:</label>
        <input type="text" value="${url}" id="location" form="usrform" placeholder="Enter location"/>
      </div>
      <div id="travel-date">
        <label for="date">Traveling date:</label>
        <input type="date" value="" id="date" form="usrform" placeholder="date"/>
      </div>
        <button type="button" onclick="Client.handleForm()">Check weather</button>
    </form>
    <div id="note">${note}</div>
</section>`;
};

export { formComponent };
