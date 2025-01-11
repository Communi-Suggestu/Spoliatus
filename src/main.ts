import * as core from '@actions/core'

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const version = core.getInput('version')
    const parts = version.split('\\.')

    if (parts.length < 1) {
      core.setFailed(`Invalid version format: ${version}`)
      return
    }

    const minor = version[1]
    const patch = version.length > 1 ? version[2] : 0

    core.setOutput('minor', minor)
    core.setOutput('patch', patch)
    core.setOutput('joined', `${minor}.${patch}`)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
