import React from "react";

const App = () => {

  const MAX_LENGTH = 60;
  const MIN_LENGTH = 1;

  let status = "reset";
  let minutes = 25;
  let seconds = 0;
  let timeLeft = "25:00";
  let breakLength = 5;
  let sessionLength = 25;
  let timerLabel = "Session"; 
  let currInterval = null;

  const updateElement = (element, str) => {
    document.getElementById(element).innerHTML = str;
  };

  const updateElementTimeLeft = () => {
    timeLeft = `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
    updateElement("time-left", timeLeft);
  };

  const playAudio = (id) => {
    document.getElementById(id).play();
  };

  const stopAudio = (id) => {
    let audio = document.getElementById(id);
    audio.pause();
    audio.currentTime = 0;
  };

  const incrementBreakLength = () => {
    if (breakLength === MAX_LENGTH) {
      return;
    }
    breakLength++;
    if (timerLabel === "Break") {
      minutes = breakLength;
      seconds = 0;
    }
    updateElement("break-length", breakLength);
  };

  const decrementBreakLength = () => {
    if (breakLength === MIN_LENGTH) {
      return;
    }
    breakLength--;
    if (timerLabel === "Break") {
      minutes = breakLength;
      seconds = 0;
    }
    updateElement("break-length", breakLength);
  };

  const incrementSessionLength = () => {
    if (sessionLength === MAX_LENGTH) {
      return;
    }
    sessionLength++;
    if (timerLabel === "Session") {
      minutes = sessionLength;
      seconds = 0;
    }
    updateElement("session-length", sessionLength);
  };

  const decrementSessionLength = () => {
    if (sessionLength === MIN_LENGTH) {
      return;
    }
    sessionLength--;
    if (timerLabel === "Session") {
      minutes = sessionLength;
      seconds = 0;
    }
    updateElement("session-length", sessionLength);
  };

  const timer = () => {
    return setInterval(() => {
      if (timeLeft === "00:00") {
        playAudio("beep");
        if (timerLabel === "Session") {
          minutes = breakLength;
          timerLabel = "Break";
        } else if (timerLabel === "Break") {
          minutes = sessionLength;
          timerLabel = "Session";
        }
        seconds = 0;
        updateElement("timer-label", timerLabel);
      } else if (seconds === 0) {
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }
      updateElementTimeLeft();
    }, 1000);
  };

  const handleChange = (e) => {
    const id = e.target.id;

    if (id === "start_stop") {
      status = status === "start" ? "pause" : "start";
      if (status === "start") {
        currInterval = timer();
        updateElement("start_stop", 'PAUSE');
      } else if (status === "pause") {
        clearInterval(currInterval);
        updateElement("start_stop", 'PLAY');
      }
    } else if (id === "reset") {
      clearInterval(currInterval);
      status = "reset";
      timerLabel = "Session";
      breakLength = 5;
      sessionLength = 25;
      minutes = sessionLength;
      seconds = 0;
      updateElementTimeLeft();
      updateElement("break-length", breakLength);
      updateElement("session-length", sessionLength);
      updateElement("timer-label", timerLabel);
      stopAudio("beep");
    }

    if (status === "start") {
      return;
    }

    if (id === "break-increment") {
      incrementBreakLength();
    } else if (id === "break-decrement") {
      decrementBreakLength();
    } else if (id === "session-increment") {
      incrementSessionLength();
    } else if (id === "session-decrement") {
      decrementSessionLength();
    }

    updateElementTimeLeft();
  };

  return (
    <div className="app">
      <div className="container">
        <div id="title">25 + 5 Clock</div>
        <audio
          className="clip"
          id="beep"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
        <div id="timer-label" className="timer-label">{timerLabel}</div>

        <div className="counters">
          <div className="break-container">
            <div id="break-label">
              Break Length: <p id="break-length">{breakLength}</p>
            </div>

            <div className="buttons">
              <button
                className="btn default"
                id={"break-increment"}
                onClick={(e) => {
                  handleChange(e);
                }}
              >
                UP
              </button>

              <button
                className="btn default"
                id={"break-decrement"}
                onClick={(e) => {
                  handleChange(e);
                }}
              >
                DOWN
              </button>
            </div>
          </div>

          <div className="session-container">
            <div id="session-label">
              Session Length: <p id="session-length">{sessionLength}</p>
            </div>

            <div className="buttons">
              <button
                className="btn default"
                id={"session-increment"}
                onClick={(e) => {
                  handleChange(e);
                }}
              >
                UP
              </button>

              <button
                className="btn default"
                id={"session-decrement"}
                onClick={(e) => {
                  handleChange(e);
                }}
              >
                DOWN
              </button>
            </div>
          </div>
        </div>

        <div>
          <h1 id="time-left">{timeLeft}</h1>

          <button
            className="btn default"
            id={"start_stop"}
            onClick={(e) => {
              handleChange(e);
            }}
          >
            PLAY
          </button>

          <button
            className="btn default"
            id={"reset"}
            onClick={(e) => {
              handleChange(e);
            }}
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
