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

type SuccessOneClickResponse = {
  identity: {
    identifiers: {
      phone: string;
    };
    credentials: OneClickCredentials;
    birthDate: string;
    ssn: string;
  };
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

export type OneClickResponse = SuccessOneClickResponse | ErrorOneClick;

export type OneClickRequest = {
  phone: string;
  email?: string;
  birthDate?: string;
};

export const OneClickErrorEnum = {
  ADDITIONAL_INFORMATION_REQUIRED: 'OCE011',
};
