import { EditorData } from 'src/scripts/ui/common';
import { IExternalAppData } from 'src/scripts/application/ExternalApp';
import { FirestoreDocument } from 'src/scripts/application/FirestoreDocument';
import { TCustomAttribute } from 'src/scripts/utilities/common';
import * as pc from 'src/scripts/provider/common';
import * as s3 from 'src/scripts/provider/s3';
import * as snflk from 'src/scripts/provider/snowflake';

/**
 * The EditorExternalAppData class is responsible for managing and initializing
 * the data specific to an external application within the editor. It extends
 * the EditorData base class and specializes in handling IExternalAppData objects.
 */
export class EditorExternalAppData extends EditorData<IExternalAppData> {
  /** Provider */
  provider: pc.EExternalAppProvider;

  /** Credentials */
  credentials: pc.TProviderCredentials;

  /** Custom Attributes */
  attributes: TCustomAttribute[];

  /**
   * Default constructor.
   */
  constructor() {
    super();
    this.provider = pc.EExternalAppProvider.S3;
    this.credentials = {
      region: 'us-east-1',
      bucket: '',
      accessKeyId: '',
      secretAccessKey: '',
    };
    this.attributes = [];
  }

  /**
   * Creates a data object containing the common properties of the external
   * application.
   *
   * @return {IExternalAppData} The data object with common properties including `name` and `description`.
   */
  createData(): IExternalAppData {
    // Create credentials object
    let credentials:pc. TProviderCredentials = {};
    let locationType: pc.ELocationType = pc.ELocationType.file;
    if (this.provider === pc.EExternalAppProvider.S3) {
      // Amazon S3 credentials
      credentials = s3.createCredentials(this.credentials);
      locationType = pc.ELocationType.file;
    } else if (this.provider == pc.EExternalAppProvider.Snowflake) {
      // Snowflake credentials
      credentials = snflk.createCredentials(this.credentials);
      locationType = pc.ELocationType.relational;
    }
    // Return data object
    return {
      common: {
        name: this.name,
        description: this.description,
      },
      locationType: locationType,
      provider: this.provider,
      credentials: credentials,
      attributes: this.attributes,
    };
  }

  /**
   * Initializes the editor data with the provided Firestore document.
   *
   * @param {FirestoreDocument<IExternalAppData>} document - The Firestore document containing the external app data.
   * @return {void | Promise<void>} Returns void or a promise that resolves to void.
   */
  initEditorData(
    document: FirestoreDocument<IExternalAppData>
  ): void | Promise<void> {
    // Attach document
    this.document = document;
    // Apply common values
    this.name = document.data.common.name;
    this.description = document.data.common.description;
    // Apply provider
    this.provider = document.data.provider;
    this.credentials = { ...document.data.credentials };
    // Apply custom attributes
    const attr = document.data.attributes;
    for (const i in attr) {
      this.attributes.push({ ...attr[i] });
    }
  }
}
