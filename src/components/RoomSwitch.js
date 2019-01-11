import React from 'react'
import Link, { withPrefix } from 'gatsby-link'

import Buttons from './Buttons'
import PageSection from './PageSection'
import NumberItem from './NumberItem'

const RoomSwitchImage = props => {
  const isActive = props.index === props.activeItem ? "active" : "inactive"
  return (
    <div className={`room-switch--image-item ${isActive}`} style={{backgroundImage: `url(${withPrefix(props.img)})`}}></div>
  )
}

const ButtonGroup = props => {
  return(
    <div className={`room-switch--button-group wrapper clearfix`}>
      <div className="button-group">
        {props.array.map((item, i) => {
          return (
            <ButtonGroupItem
              key={i}
              index={i}
              activeItem={props.activeItem}
              caption={item.caption}
              onClick={props.handleRadio}
            />
          )
        })}
      </div>
    </div>
  )
}

const ButtonGroupItem = props => {
  const isActive = props.index === props.activeItem
  const activeChecked = isActive ? "checked" : ""
  const activeStyles = isActive ? "" : "button--secondary"
  return(
    <React.Fragment>
      <input className="button-group__radio" type="radio" id={props.caption} value={props.caption} name={props.caption} defaultChecked={activeChecked} />
      <label className={`button ${activeStyles} button-group__item`} htmlFor={props.caption} onClick={(e) => props.handleRadio(e, props.index)}>{props.caption}</label>
    </React.Fragment>
  )
}

class RoomSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 0,
      array: this.props.array,
    }

    this._handleRadio = this._handleRadio.bind(this);
  }

  _handleRadio(event, index) {
    this.setState({activeItem: index})
  }

  render() {
    return (
      <React.Fragment>
        <section className={`section ${this.props.sectionClassName}`}>
          <div className="room-switch--wrap">
            <div className="room-switch--image-group">
              {this.state.array.map((item, i) => {
                return (
                  <RoomSwitchImage
                    key={i}
                    index={i}
                    activeItem={this.state.activeItem}
                    img={item.img}
                  />
                )
              })}
            </div>
            <ButtonGroup
              array={this.state.array}
              activeItem={this.state.activeItem}
              onClick={this._handleRadio}
            />
          </div>
        </section>
      </React.Fragment>
    )
  }
}

export default RoomSwitch
