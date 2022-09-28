import * as React from "react";
import Counter from "./Counter";

class ControlBar extends React.PureComponent {
  static MIN_ZOOM = 0;
  static MAX_ZOOM = 10;

  static defaultProps = {
    zoom: 0,
    onZoomChange: () => undefined
  };

  onZoomChange = (zoom) => {
    const { onZoomChange } = this.props;
    const { MIN_ZOOM, MAX_ZOOM } = ControlBar;
    const value = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom));

    if (onZoomChange.apply) {
      onZoomChange(value);
    }
  };

  render() {
    const { zoom } = this.props;

    return (
      <div>
          Zoom: <Counter value={zoom} onChange={this.onZoomChange} />
      </div>
    );
  }
}

export default ControlBar;
