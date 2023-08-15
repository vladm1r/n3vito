export function getErrorMessage (error: unknown): String {
  let message = 'Что-то пошло не так'
  if (error instanceof Error) {
    message = error.message
  }

  return message
}
