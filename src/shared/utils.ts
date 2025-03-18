export class Utils {
  static formatPhoneNumber(phoneNumber: string): string {
    const cleanNumber = phoneNumber.replace(/\s+/g, '');

    if (cleanNumber.startsWith('+')) {
      return cleanNumber;
    }

    if (cleanNumber.startsWith('92')) {
      return `+${cleanNumber}`;
    }

    return `+92${cleanNumber}`;
  }
}
