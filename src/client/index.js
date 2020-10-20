import { checkForName } from "./js/nameChecker";
import { handleSubmit } from "./js/formHandler";
import "./styles/resets.scss";
import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/form.scss";
import "./styles/header.scss";

const store = {
  name: "hash",
  values: {
    text: "",
    url: ""
  }
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

const App = state => {
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
        <section>
            <form id="usrform">
                <input type="text" id="url" form="usrform" placeholder="Enter a URL">
                <textarea rows="4" cols="50" id="text" form="usrform" placeholder="Try your own text..."></textarea>
                <button  onclick="Client.changeName()">click</button>
            </form>
        </section>

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

const changeName = async () => {
  console.log("chenged");
  let values = {};
  const formElement = document.getElementById("usrform");
  const text = document.getElementById("text").value;
  const url = document.getElementById("url").value;
  updateStore(store, {
    text: text,
    url: url
  });
  console.log(store);
};

window.addEventListener("load", () => {
  render(root, store);
});

export { checkForName, handleSubmit, changeName };
