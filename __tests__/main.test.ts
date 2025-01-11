/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * To mock dependencies in ESM, you can create fixtures that export mock
 * functions and objects. For example, the core module is mocked in this test,
 * so that the actual '@actions/core' module is not imported.
 */
import { jest } from '@jest/globals'
import * as core from '../__fixtures__/core.js'

// Mocks should be declared before the module being tested is imported.
jest.unstable_mockModule('@actions/core', () => core)

// The module being tested should be imported dynamically. This ensures that the
// mocks are used in place of any actual dependencies.
const { run } = await import('../src/main.js')

describe('main.ts', () => {
  beforeEach(() => {
    // Set the action's inputs as return values from core.getInput().
    core.getInput.mockImplementation(() => '1.2.3')
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Returns the correct minor', async () => {
    await run()

    // Verify the time output was set.
    expect(core.setOutput).toHaveBeenNthCalledWith(
      1,
      'minor',
      // Simple regex to match a time string in the format HH:MM:SS.
      expect.stringMatching('2')
    )
  })

  it('Returns the correct patch', async () => {
    await run()

    // Verify the time output was set.
    expect(core.setOutput).toHaveBeenNthCalledWith(
      2,
      'patch',
      // Simple regex to match a time string in the format HH:MM:SS.
      expect.stringMatching('3')
    )
  })

  it('Returns the correct joined', async () => {
    await run()

    // Verify the time output was set.
    expect(core.setOutput).toHaveBeenNthCalledWith(
      3,
      'joined',
      // Simple regex to match a time string in the format HH:MM:SS.
      expect.stringMatching('2.3')
    )
  })
})
