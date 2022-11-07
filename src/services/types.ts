export interface PasswordConfig {
  generatedPassword?: string;
  passwordLength: number;
  symbol: boolean;
  number: boolean;
  upperCase: boolean;
  lowerCase: boolean;
  showPassword?: boolean;
  conditions?: number;
}
