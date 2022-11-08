export interface PasswordConfig {
  symbol: boolean;
  number: boolean;
  uppercase: boolean;
  lowercase: boolean;
}

type HandleInput = (event: React.SyntheticEvent) => void

export interface InputProps {
  name: string;
  handleInput?: HandleInput;
}