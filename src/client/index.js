import { checkForName } from "./js/nameChecker";
import { handleSubmit } from "./js/formHandler";
import { formComponent } from "./js/formComponent";
import { resultComponent } from "./js/resultComponent";
import "./styles/resets.scss";
import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/form.scss";
import "./styles/header.scss";

const store = {
  name: "hash",
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
    <header>
        <div class="">
            Logo
        </div>
        <div class="">
            navigation
        </div>
    </header>
    <main>
      ${formComponent(url, text, note)}
      ${resultComponent(analysis)}

        <section>
        <button  onclick='Client.changeName()'>
                click</button>
            <strong>Form Results:</strong>
            <div id="results"></div>
        </section>
    </main>

    <footer>
    <p>This is a footer</p>
    the name is ${state.name}
    </footer>
  `;
};

// componenets

const changeName = async () => {
  console.log("chenged");
  const text = document.getElementById("text").value;
  const url = document.getElementById("url").value;
  const note = document.getElementById("note");

  if ((text && url) || (!text && !url)) {
    updateStore(store, {
      text: text,
      url: url,
      note: "Please fill only <stronge>ONE</stronge> of the inputs provided...",
    });
    console.log(store);
    return;
  }

  updateStore(store, {
    text: text,
    url: url,
    note: "Done..",
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
  updateStore(store, { analysis: analysis });
  return analysis;
};

window.addEventListener("load", () => {
  render(root, store);
});

export { checkForName, handleSubmit, changeName };
