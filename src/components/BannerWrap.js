import moment from "moment";

const BannerWrap = props => {
  const { endDate, show, startDate } = props.siteBanner;

  if (show) {
    let startDateFormatted = moment(startDate)
      .utc()
      .format();
    let endDateFormatted = moment(endDate)
      .utc()
      .format();
    console.log({
      "Start Date": startDateFormatted,
      "End Date": endDateFormatted
    });
    const dateRange = moment().isBetween(
      moment(startDateFormatted),
      moment(endDateFormatted)
    );
    if (dateRange) {
      return props.children;
    } else return null;
  }
  return null;
};

export default BannerWrap;
