import moment from 'moment'

const BannerWrap = (props) => {

  const {
    endDate,
    show,
    startDate
  } = props.siteBanner

  if (show) {
    const dateRange = moment().isBetween(startDate, endDate)
    if (dateRange) {
      return props.children
    } else return null
  } return null
}

export default BannerWrap
