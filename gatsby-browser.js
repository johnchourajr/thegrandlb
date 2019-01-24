import ReactGA from 'react-ga';
import { siteDetails } from './src/data/siteDetails'

exports.onRouteUpdate = ({ location }) => {
  ReactGA.pageview(location.pathname);
};

exports.onClientEntry = () => {
  ReactGA.initialize(siteDetails.ga);
}
