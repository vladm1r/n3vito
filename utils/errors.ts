const DEFAULT_ERROR_MESSAGE = 'Что-то пошло не так'

export function getErrorMessage (error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }

  return DEFAULT_ERROR_MESSAGE
}
