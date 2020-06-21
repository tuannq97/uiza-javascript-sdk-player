import events from '../events';
import { getElement } from '../utils/elements';

const UzTest = {
  setup() {
    UzTest.ready.call(this);
  },

  ready() {
    const player = this;
    var timeTracker = 0;
    var timer;
    var disableFlag = false;

    player.on(events.PLAY, event => {
      const el = document.getElementById('continue-playing');
      if (el) {
        el.style.visibility = 'hidden';
      }
    });

    player.on(events.PLAYING, event => {
      if (!disableFlag) {
        timer = setInterval(() => {
          timeTracker += 1;
          console.log(`${timeTracker}s`);

          if (timeTracker === 60) {
            player.pause();
            disableFlag = true;
          }
        }, 1000);
      }
    });

    player.on(events.PAUSE, event => {
      clearInterval(timer);

      const el = document.getElementById('continue-playing');
      if (el) {
        el.style.visibility = 'visible';
      } else {
        const playBtn = getElement.call(this, '.uiza__control--overlaid');
        let continuePlayingEl = document.createElement('span');
        continuePlayingEl.innerHTML = 'CONTINUE PLAYING';
        continuePlayingEl.setAttribute('id', 'continue-playing');
        continuePlayingEl.style.color = 'white';
        continuePlayingEl.style.fontFamily = 'Arial';
        continuePlayingEl.style.fontWeight = 'bold';
        continuePlayingEl.style.position = 'absolute';
        continuePlayingEl.style.top = `${playBtn.offsetTop + 60}px`;
        continuePlayingEl.style.left = '50%';
        continuePlayingEl.style.transform = 'translate(-50%,-50%)';

        const container = getElement.call(this, '.uiza__video-wrapper');
        container.appendChild(continuePlayingEl);
      }
    });
  },
};

export default UzTest;
