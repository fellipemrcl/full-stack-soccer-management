export type ServiceMessage = { message: string };

type ServiceResponseErrorType =
  | 'INVALID_DATA'
  | 'UNPROCESSABLE_ENTITY'
  | 'UNAUTHORIZED'
  | 'NOT_FOUND';

export type ServiceResponseError = {
  status: ServiceResponseErrorType;
  data: ServiceMessage;
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL' | 'CREATED';
  data: T;
};

export type ServiceResponse<T> =
  | ServiceResponseError
  | ServiceResponseSuccess<T>;
