import React from "react";
import ControlBar from "./ControlBar";
import KochSnowflake from "./KochSnowflake";

export default class Draw extends React.PureComponent {
  state = {
    zoom: 1,
    width: 800,
    height: 600,
  };

  onZoomChange = zoom => {
    this.setState({ zoom });
  };

  render() {
    const { onZoomChange } = this;
    const { zoom, width, height } = this.state;

    return (
      <div>
          <div className="fractal-panel">
            <KochSnowflake className='snowflake-position' {...{ zoom, width, height }} />
          </div>
          <ControlBar {...{ zoom, onZoomChange }} />
      </div>
    );
  }
}
