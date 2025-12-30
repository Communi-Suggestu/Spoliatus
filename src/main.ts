import * as core from '@actions/core'

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const version = core.getInput('version')
    if (isObfuscated(version)) {
      runObfuscated(version)
      return
    }

    runUnobfuscated(version)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}

function runObfuscated(version: string) {
  const parts = version.split('.')
  if (parts.length < 1) {
    core.setFailed(`Invalid version format: ${version}`)
    return
  }

  const minor = parts[1]
  const patch = parts.length > 1 ? parts[2] : 0

  core.setOutput('minor', minor)
  core.setOutput('patch', patch)
  core.setOutput('joined', `${minor}.${patch}`)
}

function runUnobfuscated(version: string) {
  const parts = version.split('.')
  if (parts.length < 1) {
    core.setFailed(`Invalid version format: ${version}`)
    return
  }

  const major = parts[0]
  const minor = parts[1]

  let patch = '0'
  if (parts.length > 2) {
    patch = parts[2]
  }

  core.setOutput('major', major)
  core.setOutput('minor', minor)
  core.setOutput('patch', patch)
  core.setOutput('joined', `${major}.${minor}.${patch}`)
}

function isObfuscated(version: string): boolean {
  if (version.length < 3) {
    return true
  }

  if (version.substring(2, 3) != '.') {
    return true
  }

  const parts = version.split('.')
  const majorPart = parts[0]
  const major = Number.parseInt(majorPart)
  return major < 26
}
