import { PasswordConfig } from './types';

export class Password {
  static config: PasswordConfig;

  static getPasswordConfig(config: PasswordConfig) {
    this.config = { ...config };
  }

  static getRandomSymbol(): string {
    let symbols = '!"§$%&/°()=?`´+*#-_.:,;¢€«@[]|{}≠¿±‘æ•–…∞„';
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  static getRandomNumber(): string {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }
  static getRandomLowercase(): string {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }
  static getRandomUppercase(): string {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  static createPassword(): string {
    let newPassword: string = '';
    while (newPassword.length < this.config.passwordLength) {
      if (this.config.lowerCase) newPassword += this.getRandomLowercase();
      if (this.config.symbol) newPassword += this.getRandomSymbol();
      if (this.config.number) newPassword += this.getRandomNumber();
      if (this.config.upperCase) newPassword += this.getRandomUppercase();
    }
    return newPassword.slice(0, this.config.passwordLength);
  }
}

// export const createPassword = (passwordConfig: PasswordConfig) => {};
