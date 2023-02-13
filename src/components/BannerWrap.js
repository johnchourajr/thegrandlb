const BannerWrap = (props) => {
  const { endDate, show, startDate } = props.siteBanner;

  if (show) {
    let startDateFormatted = new Date(startDate);
    let endDateFormatted = new Date(endDate);
    // console.log({
    //   "Start Date": startDateFormatted,
    //   "End Date": endDateFormatted
    // });
    const dateRange =
      new Date() > startDateFormatted && new Date() < endDateFormatted;
    if (dateRange) {
      return props.children;
    } else return null;
  }
  return null;
};

export default BannerWrap;
