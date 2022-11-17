import React from "react";

export type FileInfo = {
  name: string | null;
  type: string | null;
  size: string | null;
  base64: string | null;
  file: File | null;
};

interface UploadState {
  fileInfo: FileInfo;
}

interface UploadProps {
  onDone: (fileData: FileInfo) => void;
}

export default class Upload extends React.Component<UploadProps, UploadState> {
  constructor(props: UploadProps) {
    super(props);
    this.state = {
      fileInfo: {
        name: null,
        type: null,
        size: null,
        base64: null,
        file: null,
      },
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target as HTMLInputElement;
    // get the files
    let files = element.files;
    // Process each file
    if (files) {
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        // Make new FileReader
        let reader = new FileReader();
        // Convert the file to base64 text
        reader.readAsDataURL(file);
        // on reader load somthing...
        reader.onload = () => {
          // Make a fileInfo Object
          const fileInfo: FileInfo = {
            name: file.name,
            type: file.type,
            size: Math.round(file.size / 1000) + " kB",
            base64: reader.result ? reader.result.toString() : null,
            file: file,
          };
          // Push it to the state
          this.props.onDone(fileInfo);
        }; // reader.onload
      }
    }
  };

  render() {
    return (
      <input
        accept="image/png, image/gif, image/jpeg"
        type="file"
        onChange={this.handleChange}
      />
    );
  }
}
