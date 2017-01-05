import TmcClient from 'tmc-client-js';

const client = new TmcClient();

function init() {
  const user = client.getUser();
  const config = Object.assign({}, window._STUDENT_DASHBOARD_CONFIG, { accessToken: user.accessToken, userId: user.username });

  window.StudentDashboard.initialize(config);
}

function initStudentDashboard() {
  if(!window._STUDENT_DASHBOARD_ENABLED || !window._STUDENT_DASHBOARD_CONFIG) {
    return;
  }

  if(window.StudentDashboard) {
    init();
  } else {
    document.addEventListener('studentDashboardLoaded', init);
  }
}

export default initStudentDashboard;
