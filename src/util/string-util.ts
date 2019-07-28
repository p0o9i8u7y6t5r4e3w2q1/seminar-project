export class StringUtil {
  // 幫數字前面補0
  static prefixZero(num: number, size: number): string {
    return (new Array(size).join('0') + num).slice(-size);
  }
}
