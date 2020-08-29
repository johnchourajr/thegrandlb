import moment from "moment";

const BannerWrap = props => {
  const { endDate, show, startDate } = props.siteBanner;

  if (show) {
    let startDateFormatted = moment.utc().toISOString();
    let endDateFormatted = moment.utc().toISOString();
    const dateRange = moment
      .utc()
      .isBetween(startDateFormatted, endDateFormatted);
    if (dateRange) {
      return props.children;
    } else return null;
  }
  return null;
};

export default BannerWrap;
