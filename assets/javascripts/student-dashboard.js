import TmcClient from 'tmc-client-js';
import * as store from 'store';

const client = new TmcClient();

function getCourseName() {
  return store.get('tmc.course');
}


function getOhpeKevat18Config() {
  return {
    courseId: '287',
    courseName: 'Ohjelmoinnin perusteet',
    exerciseGroups: {
      'Osa 1': ['15.01.2018 12:00', '22.01.2018 23:59', 'osa01-'],
      'Osa 2': ['18.01.2018 18:00', '29.01.2018 23:59', 'osa02-'],
      'Osa 3': ['26.01.2018 14:00', '05.02.2018 23:59', 'osa03-'],
      'Osa 4': ['02.02.2018 22:00', '12.02.2018 23:59', 'osa04-']
    },
  }
}

function getMoocConfig() {
  return {
    courseId: '288',
    courseName: 'Ohjelmoinnin MOOC',
    exerciseGroups: {
      'Osa 1': ['13.01.2018 12:00', '26.02.2018 23:59', 'osa01-'],
      'Osa 2': ['18.01.2018 18:00', '26.02.2018 23:59', 'osa02-'],
      'Osa 3': ['26.01.2018 14:00', '26.02.2018 23:59', 'osa03-'],
      'Osa 4': ['02.02.2018 22:00', '26.02.2018 23:59', 'osa04-']
    }
  };
}

function getConfig() {
  const courseName = getCourseName();

  switch(courseName) {
    case 'hy-ohpe-k18':
      return getOhpeKevat18Config();
      break;
    case 'mooc-ohjelmointi-2018':
      return getMoocConfig();
      break;
    default:
      return getMoocConfig();
  }
}

function init() {
  const courseName = getCourseName();

  if(courseName === '2018-ohjelmointi-nodl') {
    return;
  }

  const user = client.getUser();

  const config = Object.assign({}, getConfig(), { accessToken: user.accessToken, userId: user.username });

  window.StudentDashboard.initialize(config);
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
