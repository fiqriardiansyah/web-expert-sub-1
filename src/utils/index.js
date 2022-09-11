import qstring from 'query-string';

class Utils {
  static cutText(length, string) {
    if (!string) return '-';
    return string?.length > length ? `${string.slice(0, length)}...` : string;
  }

  static imageSafety(image) {
    return image ?? '/images/placeholder.png';
  }

  static watchUrl() {
    const { location } = window;
    const parse = qstring.parse(location.hash);
    const page = Object.keys(parse).map((key) => key)[0];
    return page || '';
  }
}

export default Utils;
