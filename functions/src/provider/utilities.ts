import { Readable } from 'node:stream';
import { createUnzip } from 'node:zlib';

/**
 * Checks if the given file path corresponds to the specified directory path and extracts the file name.
 * Returns the file name if the paths match and a valid file name is found, otherwise returns null.
 *
 * @param {string | undefined} filePath - The full file path to be checked and parsed.
 * @param {string} path - The expected directory path to validate against.
 * @return {string | null} The extracted file name if the file path matches the expected directory path, otherwise null.
 */
export function checkAndGetFilename(
  filePath: string | undefined,
  path: string
): string | null {
  // Check for folder
  if (!filePath || filePath.endsWith('/')) {
    return null;
  }
  // Get file name by last path separator
  const fileName = filePath.split('/').pop();
  if (fileName) {
    // Get path of file name
    const fileDir = filePath.replace(fileName, '');
    // Check if file path ís the expected path
    return fileDir === path ? fileName : null;
  }
  // Unexpected behaviour
  return null;
}

/**
 * Reads the content of a file from the provided readable stream, optionally decompressing if the file is GZIP compressed,
 * and ensures the size does not exceed the specified limit.
 *
 * @param {string} filePath - The path of the file to read, used to determine if GZIP decompression is needed.
 * @param {Readable} stream - The readable stream from which the file content is read.
 * @param {number} [maxSize] - An optional maximum size (in bytes) for the content to read. If exceeded, the stream is destroyed.
 * @return {Promise<string>} A promise that resolves with the file content as a UTF-8 string or rejects with an error if the operation fails.
 */
export function readContent(
  filePath: string,
  stream: Readable,
  maxSize?: number
): Promise<string> {
  // Return new promise
  return new Promise((resolve, reject) => {
    try {
      // Check for a GZIP compressed stream
      if (filePath.endsWith('.gz')) {
        // Add a pipe to the stream
        stream = stream.pipe(createUnzip());
      }
      // Create buffer
      const buffer: Buffer[] = [];
      // Read bytes
      let read = 0;
      // Read listener
      stream.on('data', (chunk) => {
        // Add chunk to buffer
        buffer.push(chunk);
        // Add to read bytes
        read += chunk.length;
        // Check buffer size
        if (maxSize && read >= maxSize) {
          // Close stream
          stream.destroy();
        }
      });
      // Close listener
      stream.on('close', () => {
        // Create string from buffer
        const content = Buffer.concat(buffer).toString('utf-8');
        // Return result
        resolve(content);
      });
    } catch (error: any) {
      // Reject the promise
      reject(error);
    }
  });
}
