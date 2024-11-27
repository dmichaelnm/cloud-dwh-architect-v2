import { EditorData } from 'src/scripts/ui/common';
import { IExternalAppData } from 'src/scripts/application/ExternalApp';
import { FirestoreDocument } from 'src/scripts/application/FirestoreDocument';

export class EditorExternalAppData extends EditorData<IExternalAppData> {

  constructor() {
    super();
  }

  createData(): IExternalAppData {
    // Return data object
    return {
      common: {
        name: this.name,
        description: this.description,
      },
    };
  }

  initEditorData(
    document: FirestoreDocument<IExternalAppData>
  ): void | Promise<void> {
    // Apply common values
    this.name = document.data.common.name;
    this.description = document.data.common.description;
  }
}
