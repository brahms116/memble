export default function pruneClassString(str: string) {
  return str.replaceAll("false", "").replaceAll("undefined", "");
}
