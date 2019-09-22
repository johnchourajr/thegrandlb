import ReactGA from 'react-ga';
import { siteDetails } from './src/data/siteDetails'
import './src/styles/all.scss'

export const onRouteUpdate = ({ location }) => {
  ReactGA.pageview(location.pathname);
};

export const onClientEntry = () => {
  ReactGA.initialize(siteDetails.ga);
}
