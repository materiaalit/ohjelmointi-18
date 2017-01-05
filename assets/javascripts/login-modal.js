import TmcClient from 'tmc-client-js';

import initQuiznator from './quiznator';
import initStudentDashboard from './student-dashboard';

const client = new TmcClient();

class LoginModal {
  mount() {
    this.loginErrorNode = $('#tmc-login-error');
    this.loginFormNode = $('#tmc-login-form');
    this.loginModalToggleNode = $('#tmc-login-toggle');
    this.loginModalNode = $('#tmc-login-modal');
    this.loginUsernameNode = $('#tmc-login-username');
    this.loginPasswordNode = $('#tmc-login-password');

    this.updateLoginButtonText();

    if(client.getUser()) {
      initQuiznator();
      initStudentDashboard();
    }

    this.loginModalToggleNode.on('click', this.onToggleLoginModal.bind(this));
    this.loginFormNode.on('submit', this.onSubmitLoginForm.bind(this));
  }

  getLoginText() {
    return 'Kirjaudu sisään';
  }

  getLogOutText({ username }) {
    return `Kirjaa ulos ${username}`;
  }

  showError(message) {
    this.loginErrorNode.text(message);
    this.loginErrorNode.show();
  }

  hideError() {
    this.loginErrorNode.hide();
  }

  updateLoginButtonText() {
    if(client.getUser()) {
      this.loginModalToggleNode.text(this.getLogOutText({ username: client.getUser().username }));
    } else {
      this.loginModalToggleNode.text(this.getLoginText());
    }
  }

  onToggleLoginModal(e) {
    e.preventDefault();

    if(client.getUser()) {
      client.unauthenticate();

      window.StudentDashboard.destroy();
      window.Quiznator.removeUser();
    } else {
      this.loginModalNode.modal('show');
    }

    this.updateLoginButtonText();
  }

  onSubmitLoginForm(e) {
    e.preventDefault();

    this.hideError();

    var username = this.loginUsernameNode.val();
    var password = this.loginPasswordNode.val();

    if(!username || !password) {
      this.showError('Käyttäjätunnus tai salasana puuttuu');
    } else {
      client.authenticate({ username: username, password: password })
        .then(response => {
          this.loginModalNode.modal('hide');
          this.loginUsernameNode.val('');
          this.loginPasswordNode.val('');

          this.updateLoginButtonText();

          initQuiznator();
          initStudentDashboard();
        })
        .catch(() => {
          if(username.indexOf('@') > 0) {
            this.showError('Käyttäjätunnus tai salasana on virheellinen. Huomaathan, että sinun tulee kirjautua sisään käyttäjätunnuksellasi, eikä sähköpostiosoitteellasi')
          } else {
            this.showError('Käyttäjätunnus tai salasana on virheellinen');
          }
        });
    }
  }
}

export default LoginModal;
