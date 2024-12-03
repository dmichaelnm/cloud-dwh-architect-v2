import { EditorData } from 'src/scripts/ui/common';
import { IExternalAppData } from 'src/scripts/application/ExternalApp';
import { FirestoreDocument } from 'src/scripts/application/FirestoreDocument';
import {
  EExternalAppProvider,
  TProviderCredentials,
  TProviderCredentialsS3,
  TProviderCredentialsSnowflake,
} from 'src/scripts/utilities/provider';
import { TCustomAttribute } from 'src/scripts/utilities/common';

/**
 * The EditorExternalAppData class is responsible for managing and initializing
 * the data specific to an external application within the editor. It extends
 * the EditorData base class and specializes in handling IExternalAppData objects.
 */
export class EditorExternalAppData extends EditorData<IExternalAppData> {
  /** Provider */
  provider: EExternalAppProvider;

  /** Credentials */
  credentials: TProviderCredentials;

  /** Custom Attributes */
  attributes: TCustomAttribute[];

  /**
   * Default constructor.
   */
  constructor() {
    super();
    this.provider = EExternalAppProvider.S3;
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
    let credentials: TProviderCredentials = {};
    if (this.provider === EExternalAppProvider.S3) {
      // Amazon S3 credentials
      const s3 = this.credentials as TProviderCredentialsS3;
      credentials = {
        region: s3.region,
        bucket: s3.bucket,
        accessKeyId: s3.accessKeyId,
        secretAccessKey: s3.secretAccessKey,
      };
    } else if (this.provider == EExternalAppProvider.Snowflake) {
      // Snowflake credentials
      const snflk = this.credentials as TProviderCredentialsSnowflake;
      credentials = {
        account: snflk.account,
        username: snflk.username,
        password: snflk.password,
        database: snflk.database ? snflk.database : null,
        warehouse: snflk.warehouse ? snflk.warehouse : null,
        role: snflk.role ? snflk.role : null,
        schema: snflk.schema ? snflk.schema : null,
      };
    }
    // Return data object
    return {
      common: {
        name: this.name,
        description: this.description,
      },
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
