interface SuccessOneClickResponse {
  identity: {
    identifiers: {
      phone: string;
    };
    credentials: {
      email: string[];
      fullName: {
        firstName: string;
        lastName: string;
      };
      address: {
        line1: string;
        line2?: string;
        city: string;
        state: string;
        zip: string;
        country: string;
      }[];
      birthDate: string; // format: YYYY-MM-DD
      ssn: string;
    };
  };
}

interface ErrorOneClick {
  name: string;
  message: string;
  code: number;
  className: string;
  data: {
    errorCode: string;
  };
}

export type OneClickResponse = SuccessOneClickResponse | ErrorOneClick;

export type OneClickRequest = {
  phone: string;
  email?: string;
  birthDate?: string;
};
