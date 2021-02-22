import ReactGA from 'react-ga';
import { siteDetails } from './src/data/siteDetails';
import './src/styles/fonts/fonts.css';
import './src/styles/all.scss';

export const onRouteUpdate = ({ location }) => {
  ReactGA.pageview(location.pathname);
  ReactGA.ga('send', 'pageview', {
    Branch: '{{ process.env.BRANCH }}'
  });
};

export const onClientEntry = () => {
  ReactGA.initialize(siteDetails.ga);
};
