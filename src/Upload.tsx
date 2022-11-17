import React from "react";
type UploadState = {
  files: {
    base64: string | null;
  };
};

interface UploadProps {
  onDone: (fileData: any[]) => void;
  multiple: boolean;
}

export default class Upload extends React.Component<UploadProps, UploadState> {
  static defaultProps: { multiple: boolean };
  constructor(props: UploadProps) {
    super(props);
    this.state = {
      files: {
        base64: null,
      },
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target as HTMLInputElement;
    // get the files
    let files = element.files;
    // Process each file
    const allFiles: any[] = [];
    if (files !== null) {
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        // Make new FileReader
        let reader = new FileReader();
        // Convert the file to base64 text
        reader.readAsDataURL(file);
        // on reader load somthing...
        reader.onload = () => {
          // Make a fileInfo Object
          let fileInfo = {
            name: file.name,
            type: file.type,
            size: Math.round(file.size / 1000) + " kB",
            base64: reader.result,
            file: file,
          };
          // Push it to the state
          allFiles.push(fileInfo);
          // If all files have been proceed
          if (files && allFiles.length === files.length) {
            // Apply Callback function
            if (this.props.multiple) this.props.onDone(allFiles);
            else this.props.onDone(allFiles[0]);
          }
        }; // reader.onload
      } // for
    }
  };

  render() {
    return (
      <input
        accept="image/png, image/gif, image/jpeg"
        type="file"
        onChange={this.handleChange}
        multiple={this.props.multiple}
      />
    );
  }
}
Upload.defaultProps = {
  multiple: false,
};
