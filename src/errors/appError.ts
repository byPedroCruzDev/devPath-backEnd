class AppError extends Error {
  statusCode: number;

  constructor(public message: string, public status: number = 400) {
    super(message);
  }
}

export default AppError;
