export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public name: string,
    public message: string,
    public stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
    if (stack) this.stack = stack;
    else Error.captureStackTrace(this, this.constructor);
  }
}
