import React from 'react'
import { Layer, Rect } from 'react-konva'

import PixelsMap from './PixelsMap'

class CanvasLayers extends React.Component {
  /**
   * On mouse hovering a pixel, highlight the pixel and show color popup
   * @param event
   */
  onMouseOver = (event) => {
    if (!this.props.currentColorHex) {
      return
    }

    console.log(event)
    this.layerHighlight.clear()
    this.pixelHighlight.x(event.target.x())
    this.pixelHighlight.y(event.target.y())
    this.pixelHighlight.show()

    this.updatePixelColorPopupPosition()
  }

  /**
   * When mouse moves out from the pixel, remove the highlight and color popup
   * @param event
   */
  onMouseOut = (event) => {
    console.log(event)
    this.pixelHighlight.hide()
    this.layerHighlight.draw()
  }

  /**
   * Update position of the color popup when moving the mouse
   * @param event
   */
  onMouseMove = (event) => {
    console.log(event)
    this.updatePixelColorPopupPosition()
  }

  /**
   * Keeps pixel color popup directly under the mouse pointer
   */
  updatePixelColorPopupPosition = () => {
    const mousePos = this.props.stage.getPointerPosition()
    this.pixelColorPopup.x((mousePos.x / this.props.stage.scaleX()) - (this.props.pixelSize - 2) / 2)
    this.pixelColorPopup.y((mousePos.y / this.props.stage.scaleY()) - (this.props.pixelSize - 2) / 2)
    this.pixelColorPopup.show()
    this.layerHighlight.draw()
  }

  render () {
    return [
      <Layer onMouseOver={this.onMouseOver} key="0">
        <PixelsMap pixels={this.props.pixels}
                   pixelSize={this.props.pixelSize}
                   gridColumns={this.props.gridColumns} />
      </Layer>,
      <Layer ref={layer => this.layerHighlight = layer}
             width={this.props.canvasSize}
             height={this.props.canvasSize}
             onMouseOut={this.onMouseOut}
      >
        <Rect
          ref={rect => this.pixelHighlight = rect}
          width={this.props.pixelSize}
          height={this.props.pixelSize}
          fill="#000"
          opacity="0.4"
          visible={false}
          onMouseMove={this.onMouseMove}
        />
        <Rect
          ref={rect => this.pixelColorPopup = rect}
          x="0"
          y="0"
          width={this.props.pixelSize - 2}
          height={this.props.pixelSize - 2}
          fill={this.props.currentColorHex}
          visible={false}
          cornerRadius={this.props.pixelSize / 4}
          listening={false}
          stroke="#fff"
          strokeWidth="1"
          shadowColor="#000"
          shadowOpacity="0.6"
          strokeScaleEnabled={false}
          shadowBlur={this.props.pixelSize * 2}
        />
      </Layer>
    ]
  }
}

CanvasLayers.propTypes = {}
CanvasLayers.defaultProps = {}

export default CanvasLayers