import {
  ColorPickerPanel,
  RectangularBoxMarkerBase,
  SvgHelper,
} from "markerjs2";

export class TriangleMarker extends RectangularBoxMarkerBase {
  strokeColor = "transparent";
  strokeWidth = 0;
  strokePanel: any;

  constructor(container: any, overlayContainer: any, settings: any) {
    super(container, overlayContainer, settings);
    this.strokeColor = settings.defaultColor;
    this.strokeWidth = settings.defaultStrokeWidth;
    this.createVisual = this.createVisual.bind(this);
    this.setStrokeColor = this.setStrokeColor.bind(this);
    this.strokePanel = new ColorPickerPanel(
      "Line color",
      settings.defaultColorSet,
      settings.defaultColor
    );
    this.strokePanel.onColorChanged = this.setStrokeColor;
  }

  getPoints() {
    return `0,${this.height} ${this.width / 2},0 ${this.width},${this.height}`;
  }

  createVisual() {
    this.visual = SvgHelper.createPolygon(this.getPoints(), [
      ["stroke", this.strokeColor],
      ["fill", "transparent"],
      ["stroke-width", this.strokeWidth.toString()],
    ]);
    this.addMarkerVisualToContainer(this.visual);
  }

  setPoints() {
    super.setSize();
    SvgHelper.setAttributes(this.visual, [["points", this.getPoints()]]);
  }

  pointerDown(point: any, target: any) {
    super.pointerDown(point, target);
    if (this.state === "new") {
      this.createVisual();
      this.moveVisual(point);
      this._state = "creating";
    }
  }

  resize(point: any) {
    super.resize(point);
    this.setPoints();
  }

  pointerUp(point: any) {
    super.pointerUp(point);
    this.setPoints();
  }

  ownsTarget(el: any) {
    if (super.ownsTarget(el) || el === this.visual) {
      return true;
    } else {
      return false;
    }
  }

  setStrokeColor(color: any) {
    this.strokeColor = color;
    if (this.visual) {
      SvgHelper.setAttributes(this.visual, [["stroke", this.strokeColor]]);
    }
  }

  get toolboxPanels() {
    return [this.strokePanel];
  }

  getState() {
    const result = Object.assign(
      {
        strokeColor: this.strokeColor,
      },
      super.getState()
    );
    result.typeName = TriangleMarker.typeName;
    return result;
  }

  restoreState(state: any) {
    const rectState = state;
    this.strokeColor = rectState.strokeColor;
    this.createVisual();
    super.restoreState(state);
    this.setPoints();
  }

  scale(scaleX: any, scaleY: any) {
    super.scale(scaleX, scaleY);
    this.setPoints();
  }
}

TriangleMarker.typeName = "TriangleMarker";
TriangleMarker.title = "Triangle marker";
TriangleMarker.icon = `<svg viewBox="0 0 24 24"><path d="M12,2L1,21H23M12,6L19.53,19H4.47" /></svg>`;
