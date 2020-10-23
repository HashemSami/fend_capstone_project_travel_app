import { formComponent } from "formComponent";

describe("formComponent", () => {
  it("should be able to output form UI", () => {
    const url = "url";
    const text = "text";
    const note = "note";

    const result = `
  <section id="usrform">
    <form>
        <input type="text" value="${url}" id="url" form="usrform" placeholder="Enter a page URL to analyze it's text">
        <textarea rows="6" cols="40" id="text" form="usrform" placeholder="Try your own text...">${text}</textarea>
        <button type="button" onclick="Client.handleForm()">Analyze</button>
    </form>
    <div id="note">${note}</div>
</section>`;
    expect(formComponent(url, text, note)).toBe(result);
  });
});
