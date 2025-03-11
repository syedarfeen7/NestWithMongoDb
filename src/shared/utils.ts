export class Utils {
  static formatPhoneNumber(phoneNumber: string): string {
    const cleanNumber = phoneNumber.replace(/\s+/g, ''); // Remove spaces
    return cleanNumber.startsWith('+') ? cleanNumber : `+${cleanNumber}`;
  }
}
