import { checkForName } from "./js/nameChecker";
import { handleSubmit } from "./js/formHandler";
import { formComponent } from "./js/formComponent";
import { resultComponent } from "./js/resultComponent";
import { headerComponent } from "./js/headerComponent";
// import "./styles/index.scss";
import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/header.scss";
import "./styles/result.scss";
import "./styles/form.scss";

const store = {
  text: "",
  url: "",
  note: "",
  analysis: {},
};

// add our markup to the page
const root = document.getElementById("root");

const updateStore = (store, newState) => {
  const newStore = Object.assign(store, newState);
  render(root, newStore);
};

const render = async (root, state) => {
  root.innerHTML = App(state);
};

const App = (state) => {
  const { url, text, note, analysis } = state;
  //   changeName();
  return `
  <div id="container">
    <header id="head">
      ${headerComponent()}
    </header>
    <main>
      ${formComponent(url, text, note)}
      ${resultComponent(analysis)}
    </main>

    <footer id="footer">
    <p>This is a footer</p>
    </footer>
  </div>
  `;
};

// componenets

const changeName = async () => {
  console.log("chenged");
  const text = document.getElementById("text").value;
  const url = document.getElementById("url").value;

  if ((text && url) || (!text && !url)) {
    updateStore(store, {
      text: text,
      url: url,
      note: "Please fill only <strong>ONE</strong> of the inputs provided...",
    });
    console.log(store);
    return;
  }

  updateStore(store, {
    text: text,
    url: url,
    note: "Analyzing...",
  });

  const analysis = await fetchAnalysis();

  if (analysis.err) {
    updateStore(store, {
      note: `${analysis.err}`,
    });
  }
  console.log(store);
};

const fetchAnalysis = async () => {
  const res = await fetch("http://localhost:8081/analysis", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: store.text,
      url: store.url,
    }),
  });
  const analysis = await res.json();
  console.log(analysis);
  updateStore(store, {
    note: "Done. Please check the results below.",
    analysis: analysis,
  });
  return analysis;
};

window.addEventListener("load", () => {
  render(root, store);
});

export { checkForName, handleSubmit, changeName };
