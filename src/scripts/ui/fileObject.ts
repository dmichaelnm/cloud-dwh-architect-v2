import { EditorData } from 'src/scripts/ui/common';
import { IFileObjectData } from 'src/scripts/application/FileObject';
import { FirestoreDocument } from 'src/scripts/application/FirestoreDocument';

export class EditorFileObjectData extends EditorData<IFileObjectData> {

  constructor() {
    super();
  }

  createData(): IFileObjectData {
    return {
      common: {
        name: this.name,
        description: this.description,
      },
    };
  }

  initEditorData(
    document: FirestoreDocument<IFileObjectData>
  ): void | Promise<void> {
    // Attach document
    this.document = document;
  }
}
