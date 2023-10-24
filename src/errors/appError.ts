class AppError extends Error {
  statusCode: number;

  constructor(public message: string, status: number = 400) {
    super(message);
  }
}

export default AppError;
