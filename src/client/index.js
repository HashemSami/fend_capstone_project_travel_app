import { formComponent, selectCountry } from "./js/formComponent";
import { resultComponent } from "./js/resultComponent";
import { headerComponent } from "./js/headerComponent";
import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/header.scss";
import "./styles/result.scss";
import "./styles/form.scss";
import "./styles/main.scss";

const store = {
  text: "",
  url: "",
  note: "",
  analysis: {}
};

// add our markup to the page
const root = document.getElementById("root");

// pass this function to other components
const updateStore = (store, newState) => {
  const newStore = Object.assign(store, newState);
  render(root, newStore);
};

const render = async (root, state) => {
  root.innerHTML = App(state);
};

const App = state => {
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

const handleForm = async () => {
  const text = document.getElementById("text").value;
  const url = document.getElementById("url").value;

  if ((text && url) || (!text && !url)) {
    updateStore(store, {
      text: text,
      url: url,
      note: "Please fill only <strong>ONE</strong> of the inputs provided..."
    });
    return;
  }

  updateStore(store, {
    text: text,
    url: url,
    note: "Analyzing..."
  });

  const analysis = await fetchAnalysis();

  if (analysis.err) {
    updateStore(store, {
      note: `${analysis.err}`
    });
  }
};

const fetchAnalysis = async () => {
  const res = await fetch("http://localhost:8081/analysis", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: store.text,
      url: store.url
    })
  });
  const analysis = await res.json();
  updateStore(store, {
    note: "Done. Please check the results below.",
    analysis: analysis
  });
  return analysis;
};

window.addEventListener("load", () => {
  render(root, store);
});

export { handleForm, selectCountry };
