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
      'Osa 1': ['15.01.2018 16:00', '22.01.2018 23:59', 'osa01-'],
      'Osa 2': ['12.09.2017 16:00', '18.09.2017 23:59', 'osa02-'],
      'Osa 3': ['18.09.2017 12:00', '25.09.2017 23:59', 'osa03-'],
      'Osa 4': ['25.09.2017 18:00', '04.10.2017 23:59', 'osa04-'],
      'Osa 5': ['03.10.2017 08:00', '09.10.2017 23:59', 'osa05-'],
      'Osa 6': ['09.10.2017 18:00', '16.10.2017 23:59', 'osa06-'],
      'Osa 7': ['16.10.2017 12:00', '23.10.2017 23:59', 'osa07-']
    },
  }
}

function getMoocConfig() {
  return {
    courseId: '288',
    courseName: 'Ohjelmoinnin MOOC',
    exerciseGroups: {
      'Osa 1': ['15.01.2018 01:00', '26.02.2017 23:59', 'osa01-'],
      'Osa 2': ['23.01.2017 01:00', '26.02.2017 21:59', 'osa02-'],
      'Osa 3': ['30.01.2017 01:00', '26.02.2017 21:59', 'osa03-'],
      'Osa 4': ['06.02.2017 01:00', '26.02.2017 21:59', 'osa04-'],
      'Osa 5': ['10.02.2017 07:00', '05.03.2017 21:59', 'osa05-'],
      'Osa 6': ['17.02.2017 07:00', '12.03.2017 21:59', 'osa06-'],
      'Osa 7': ['23.02.2017 16:00', '19.03.2017 21:59', 'osa07-'],
      'Osa 8': ['06.03.2017 22:00', '26.03.2017 21:59', 'osa08-'],
      'Osa 9': ['13.03.2017 18:00', '02.04.2017 21:59', 'osa09-'],
      'Osa 10': ['20.03.2017 18:00', '09.04.2017 21:59', 'osa10-'],
      'Osa 11': ['27.03.2017 20:00', '16.04.2017 21:59', 'osa11-'],
      'Osa 12': ['03.04.2017 22:00', '23.04.2017 21:59', 'osa12-'],
      'Osa 13': ['11.04.2017 10:00', '30.04.2017 21:59', 'osa13-'],
      'Osa 14': ['18.04.2017 10:00', '07.05.2017 21:59', 'osa14-']
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
