import RacingInputView from "./views/RacingInputView.js";
import RacingGame from "./models/RacingGame.js";
import { SELECTOR } from "./constant/index.js";

const App = {
  render: () => {
    const $app = document.querySelector("#app");
    /*html */
    $app.innerHTML = `<section class="d-flex justify-center mt-5" >
    <form id ="racing-form">
    </form>
  </section>
  <section class="d-flex justify-center mt-5">
    <div class="mt-4 d-flex">
    </div>
  </section>
  <section class="d-flex justify-center mt-5">
    <div>
      <h2>🏆 최종 우승자: EAST, WEST 🏆</h2>
      <div class="d-flex justify-center">
        <button type="button" class="btn btn-cyan">다시 시작하기</button>
      </div>
    </div>
  </section>`;

    RacingInputView.renderNameInput();
  },
  addEvent: function () {
    const $racingInputContainer = document.querySelector("#racing-form");
    $racingInputContainer.addEventListener("click", ({ target }) => {
      if (target.closest("#name-submit-button")) {
        this.readyToStartGame();
      }
    });

    $racingInputContainer.addEventListener("submit", e => {
      e.preventDefault();
      this.readyToStartGame();
    });
  },

  readyToStartGame() {
    const name = document.querySelector(SELECTOR.NAME_INPUT).value;
    RacingGame.start({ carName: name });
  },
};

App.render();
App.addEvent();
