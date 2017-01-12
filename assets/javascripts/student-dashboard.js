import TmcClient from 'tmc-client-js';
import * as store from 'store';

const client = new TmcClient();

function getCourseName() {
  return store.get('tmc.course');
}

function getMoocConfig() {
  return {
    courseId: 'todo',
    courseName: 'Ohjelmoinnin MOOC 2017',
    exerciseGroups: {
      'Osa 1': ['16.01.2017 01:00', '26.02.2017 21:59', 'Osa01_'],
      'Osa 2': ['13.01.2017 01:00', '26.02.2017 21:59', 'Osa02_'],
      'Osa 3': ['30.01.2017 01:00', '26.02.2017 21:59', 'Osa03_'],
      'Osa 4': ['06.02.2017 01:00', '26.02.2017 21:59', 'Osa04_'],
      'Osa 5': ['13.02.2017 01:00', '05.03.2017 21:59', 'Osa05_'],
      'Osa 6': ['20.02.2017 01:00', '12.03.2017 21:59', 'Osa01_'],
      'Osa 7': ['27.02.20117 01:00', '19.03.2017 21:59', 'Osa02_'],
      'Osa 8': ['06.03.2017 01:00', '26.03.2017 21:59', 'Osa03_'],
      'Osa 9': ['13.03.2017 01:00', '02.04.2017 21:59', 'Osa04_'],
      'Osa 10': ['20.03.2017 01:00', '09.04.2017 21:59', 'Osa01_'],
      'Osa 11': ['27.03.2017 01:00', '16.04.2017 21:59', 'Osa02_'],
      'Osa 12': ['03.04.2017 01:00', '23.04.2017 21:59', 'Osa03_'],
      'Osa 13': ['10.04.2017 01:00', '30.04.2017 21:59', 'Osa04_'],
      'Osa 14': ['17.04.2017 01:00', '07.05.2017 21:59', 'Osa01_']
    }
  };
}

function getConfig() {
  const courseName = getCourseName();

  switch(courseName) {
    case 'k2017-ohpe':
      return getMoocConfig();
      break;
    case '2017-ohjelmointi':
      return getMoocConfig();
      break;
    default:
      return getMoocConfig();
  }
}

function init() {
  const courseName = getCourseName();

  if(courseName === '2017-ohjelmointi-nodl') {
    return;
  }

  const user = client.getUser();

  const config = Object.assign({}, getConfig(), { accessToken: user.accessToken, userId: user.username });

  //window.StudentDashboard.initialize(config);
}

function initStudentDashboard() {
  if(!window._STUDENT_DASHBOARD_ENABLED) {
    return;
  }

  if(window.StudentDashboard) {
    init();
  } else {
    document.addEventListener('studentDashboardLoaded', init);
  }
}

export default initStudentDashboard;
