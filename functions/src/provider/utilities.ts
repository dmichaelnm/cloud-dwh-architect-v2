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
