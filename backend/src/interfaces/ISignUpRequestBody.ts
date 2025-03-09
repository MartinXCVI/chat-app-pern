export interface ISignUpRequestBody {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: "male" | "female"
}