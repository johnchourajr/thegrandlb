import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

const RoomSwitchImage = (props) => {
  const isActive = props.index === props.activeItem ? 'active' : 'inactive';
  return (
    <div className={`room-switch--image-item ${isActive}`}>
      <GatsbyImage image={props.img.childImageSharp?.gatsbyImageData} />
    </div>
  );
};

const RoomSwitchButton = (props) => {
  const isActive = props.index === props.activeItem;
  const activeChecked = isActive ? 'checked' : '';
  const activeStyles = isActive ? '' : 'button--secondary';
  return (
    <React.Fragment>
      <input
        className="button-group__radio"
        aria-hidden="true"
        type="radio"
        id={props.caption}
        value={props.caption}
        name={props.caption}
        defaultChecked={activeChecked}
      />
      <button
        className={`button ${activeStyles} button-group__item`}
        htmlFor={props.caption}
        onClick={(e) => props.handleRadio(e, props.index)}
        onKeyPress={(e) => props.handleRadio(e, props.index)}
      >
        {props.caption}
      </button>
    </React.Fragment>
  );
};

class RoomSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 0,
      array: this.props.array
    };

    this._handleRadio = this._handleRadio.bind(this);
  }

  _handleRadio(event, index) {
    this.setState({ activeItem: index });
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
                );
              })}
            </div>
            <div className={`room-switch--button-group wrapper clearfix`}>
              <div className="button-group">
                {this.state.array.map((item, i) => {
                  return (
                    <RoomSwitchButton
                      key={i}
                      index={i}
                      activeItem={this.state.activeItem}
                      caption={item.caption}
                      handleRadio={this._handleRadio}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default RoomSwitch;
