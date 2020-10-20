const formComponent = (url, text, note) => {
  return `
  <section>
    <form id="usrform">
        <input type="text" value="${url}" id="url" form="usrform" placeholder="Enter a URL">
        <textarea rows="4" cols="50" id="text" form="usrform" placeholder="Try your own text...">${text}</textarea>
        <button  onclick="Client.changeName()">click</button>
    </form>
    <div id="note">${note}</div>
</section>`;
};

export { formComponent };
