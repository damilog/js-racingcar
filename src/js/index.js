import RacingInputView from "./views/RacingInputView.js";
import RacingGame from "./models/RacingGame.js";
import Validator from "./models/Validator.js";
import { splitCarName, generateNumberInRange } from "./utils/index.js";
import { SELECTOR, ERROR_MESSAGE } from "./constant/index.js";

const App = {
  carNames: null,
  tryCount: 0,

  init() {
    this.render();
    this.addEvent();
  },

  render() {
    const $app = document.querySelector("#app");
    /*html */
    $app.innerHTML = `<section class="d-flex justify-center mt-5" >
    <form id ="racing-form">
    </form>
  </section>
  <section class="d-flex justify-center mt-5">
    <div class="mt-4 d-flex" id="car-container">
    </div>
  </section>
 `;

    RacingInputView.renderNameInput();
  },

  addEvent() {
    const $racingInputContainer = document.querySelector("#racing-form");
    $racingInputContainer.addEventListener("click", ({ target }) => {
      if (target.closest(SELECTOR.NAME_SUBMIT_BUTTON)) {
        this.setCarNames();
        target.disabled = true;
      }

      if (target.closest(SELECTOR.TRY_SUBMIT_BUTTON)) {
        this.setTryCount();
        target.disabled = true;
      }
    });

    $racingInputContainer.addEventListener("submit", e => {
      e.preventDefault();
      this.setCarNames();
    });
  },

  setCarNames() {
    const { value } = document.querySelector(SELECTOR.NAME_INPUT);
    const splitCarNames = splitCarName(value);
    if (!Validator.validateCarNames(splitCarNames)) {
      alert(ERROR_MESSAGE.NAME_LENGTH);
      return;
    }
    this.carNames = splitCarNames;

    RacingInputView.renderTryCountInput();
  },

  setTryCount() {
    const { value } = document.querySelector(SELECTOR.TRY_INPUT);
    this.tryCount = Number(value);

    this.readyToStartGame();
  },

  readyToStartGame() {
    const randomMovementsByCar = this.carNames.map(_ =>
      Array.from({ length: this.tryCount }).map(_ =>
        generateNumberInRange({ min: 0, max: 9 })
      )
    );

    const carsInfo = this.carNames.map((carName, idx) =>
      Object.freeze({
        name: carName,
        movements: randomMovementsByCar[idx],
      })
    );
    RacingGame.start(carsInfo);
  },
};

App.init();
