import * as path from 'path'
import * as fse from 'fs-extra'

import File from '~/util/File'

const mocksPath = process.env.PWD

const cleanUploadsToDir = () => {
  const uploadsToPath = path.join(mocksPath, 'mocks/wp-content/uploads-to')

  return fse.emptyDir(uploadsToPath)
}

// Clean up `@mocks/uploads-to` path
beforeEach(async () => await cleanUploadsToDir())
afterAll(async () => await cleanUploadsToDir())

describe('File.ts', () => {
  it('should move existing file to existing directory', async () => {
    const fromPath = path.join(mocksPath, 'mocks/wp-content/uploads-from/01')
    const toPath = path.join(mocksPath, 'mocks/wp-content/uploads-to')
    const fileName = 'angular.png'
    const newFileName = 'shmangular.png'

    const result = await File.copy(fromPath, toPath, fileName, newFileName)

    expect(result).toBe(true)
  })

  it('should move existing file to non-existing directory', async () => {
    const fromPath = path.join(mocksPath, 'mocks/wp-content/uploads-from/01')
    const toPath = path.join(mocksPath, 'mocks/wp-content/uploads-to/01')
    const fileName = 'angular.png'
    const newFileName = 'shmangular.png'

    const result = await File.copy(fromPath, toPath, fileName, newFileName)

    expect(result).toBe(true)
    // @todo: need to figure out how to check resolved promise
    // expect(await fse.ensureFile(path.join(toPath, newFileName))).resolves(undefined)
  })

  it('shouldn\'t move non-existing file', () => {
    const fromPath = path.join(mocksPath, 'mocks/wp-content/uploads-from')
    const toPath = path.join(mocksPath, 'mocks/wp-content/uploads-to')
    const fileName = 'non-existing-file.jpg'
    const newFileName = 'non-existing-file.jpg'

    return expect(File.copy(fromPath, toPath, fileName, newFileName)).rejects.toThrowError()
  })

  it('shouldn\'t replace existing file', () => {
    // @todo
  })
})