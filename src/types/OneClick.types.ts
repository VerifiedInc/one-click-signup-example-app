export type OneClickCredentials = {
  fullName?: {
    firstName: string;
    lastName: string;
  };
  address?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }[];
  birthDate?: string;
  phone?: string;
  ssn?: string;
};

export type OneClickEntity = {
  identifiers: {
    phone: string;
  };
  credentials: OneClickCredentials;
};

type SuccessOneClickResponse = {
  identity?: OneClickEntity;
  uuid: string;
  code?: string;
  url?: string;
};

type ErrorOneClick = {
  name: string;
  message: string;
  code: number;
  className: string;
  data: {
    errorCode: string;
  };
};

export type OneClickPostResponse = SuccessOneClickResponse | ErrorOneClick;

export type OneClickGetResponse = OneClickEntity | ErrorOneClick;
export type OneClickPatchResponse = OneClickEntity | ErrorOneClick;

export type OneClickPostRequest = {
  phone: string;
  email?: string;
  birthDate?: string;
  content?: {
    title?: 'Signup' | 'Login' | 'Verify' | 'Apply';
    description?: string;
  };
  redirectUrl?: string;
};

export type OneClickPatchRequest = {
  birthDate: string;
};

export const OneClickErrorEnum = {
  ADDITIONAL_INFORMATION_REQUIRED: 'OCE011',
};
