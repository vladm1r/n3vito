const DEFAULT_ERROR_MESSAGE:String = 'Что-то пошло не так'

export function getErrorMessage (error: unknown): String {
  if (error instanceof Error) {
    return error.message
  }

  return DEFAULT_ERROR_MESSAGE
}
