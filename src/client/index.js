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
  changeName();
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
            <form class="" onsubmit="return Client.handleSubmit(event)">
                <input id="name" type="text" name="input" value="" placeholder="Name">
                <input type="submit" name="" value="submit" onclick="return Client.handleSubmit(event)"
                    onsubmit="return Client.handleSubmit(event)">
            </form>
        </section>

        <section>
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
  updateStore(store, { name: "sami" });
};

window.addEventListener("load", () => {
  render(root, store);
});

export { checkForName, handleSubmit };
