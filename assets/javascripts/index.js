try {
  require('babel-polyfill');
} catch(e) {
  console.log(e);
}

import '../stylesheets/index.scss';

import Exercises from './exercises';
import TableOfContents from './table-of-contents';
import LoginModal from './login-modal';
import Navigation from './navigation';

$(() => {
  (new Exercises()).mount();
  (new TableOfContents()).mount();
  (new LoginModal()).mount();
  (new Navigation()).mount();
});
