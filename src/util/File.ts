import * as path from 'path'
import * as fse from 'fs-extra'

export default class File {
  /**
   * Move file from one path to another with auto-creating dir structure.
   * @param fromPath
   * @param toPath
   */
  public static copy (fromPath: string, toPath: string, fileName: string, newFileName: string = '') {
    const fromFilePath = path.join(fromPath, fileName)
    const toFilePath = path.join(toPath, newFileName)

    return fse.copy(fromFilePath, toFilePath)
      .then(() => (true))
  }
}
