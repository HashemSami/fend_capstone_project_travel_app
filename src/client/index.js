import { checkForName } from "./js/nameChecker";
import { handleSubmit } from "./js/formHandler";
import "./styles/resets.scss";
import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/form.scss";
import "./styles/header.scss";

const store = {
  name: "hash"
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
            <form class="">
                <input id="name" type="text" name="input" value="" placeholder="Name">
                <button  onclick="changeName()">
                click</button>
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

const changeName = () => {
  console.log("chenged");
  updateStore(store, { name: "sami" });
};

window.addEventListener("load", () => {
  render(root, store);
});

export { checkForName, handleSubmit, changeName };
