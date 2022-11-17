import React, { Component } from "react";
import "./styles.css";
import * as markerjs2 from "markerjs2";
import { TriangleMarker } from "./TriangleMarker";
import Upload from "./Upload";
type AppState = {
  files: {
    base64: string | null;
  };
};
class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      files: {
        base64: null,
      },
    };
  }

  getFiles(files: any) {
    this.setState({ files: files });
  }

  imgRef = React.createRef<HTMLImageElement>();

  showMarkerArea() {
    if (this.imgRef.current !== null) {
      // create a marker.js MarkerArea
      const markerArea = new markerjs2.MarkerArea(this.imgRef.current);
      markerArea.availableMarkerTypes = [
        TriangleMarker,
        ...markerArea.ALL_MARKER_TYPES,
      ];
      // attach an event handler to assign annotated image back to our image element
      markerArea.addEventListener("render", (event) => {
        if (this.imgRef.current) {
          this.imgRef.current.src = event.dataUrl;
        }
      });
      // launch marker.js
      markerArea.show();
    }
  }

  render() {
    return (
      <div className="App">
        <div className="text-center mt-25">
          <p className="text-center">Test Movel AI </p>
          <p className="text-center mb-2">Agung Satrio Wibowo Markup Tool </p>
          <Upload onDone={(fileData: any[]) => this.getFiles(fileData)} />
        </div>
        <div className="text-center">
          {this.state.files.base64 && (
            <img
              ref={this.imgRef}
              src={this.state.files.base64}
              alt="sample"
              crossOrigin="anonymous"
              style={{ maxWidth: "30%" }}
              onClick={() => this.showMarkerArea()}
            />
          )}
        </div>
      </div>
    );
  }
}
export default App;
