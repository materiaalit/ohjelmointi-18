import TmcClient from 'tmc-client-js';

const client = new TmcClient();

function init() {
  const user = client.getUser();

  window.Quiznator.setUser({
    id: user.username,
    accessToken: user.accessToken
  });
}

function initQuiznator() {
  if(!window._QUIZNATOR_ENABLED) {
    return;
  }

  if(window.Quiznator) {
    init();
  } else {
    document.addEventListener('quiznatorLoaded', init);
  }
}

export default initQuiznator;
