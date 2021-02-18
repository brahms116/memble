export default function Sleep(millisecond: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, millisecond);
  }) as Promise<void>;
}
