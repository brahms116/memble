import IWord from "../models/IWord";

interface IFormattedVerse {
  verseNumber: string;
  verse: string;
}
export default function convertToSegments(passage: string) {
  const resultArr: IWord[][] = [];
  const unformattedVerses = passage.match(/\[\d+\][^]+?(?=(\[)|$)/g);
  if (unformattedVerses) {
    const formattedVerses: IFormattedVerse[] = [];
    for (const verse of unformattedVerses) {
      let formattedVerse = verse
        .replace(/\n\n\n[^]*$/, "")
        .replace(/\n\n*/, " ")
        .replace(/\s+$/, "");
      const verseNumber = verse.match(/\[\d+\]/g)![0].match(/\d+/g)![0];
      formattedVerses.push({
        verseNumber: verseNumber,
        verse: formattedVerse.replace(/\[\d+\]/g, "").replace(/^\s+/g, ""),
      });
    }
    // console.log(formattedVerses);
    for (const verse of formattedVerses) {
      const segments = verse.verse.match(/.+?([,.;—]|$)/g)!;
      for (const segment of segments) {
        const segmentArr: IWord[][] = [];
        const noSpace = segment.replace(/^\s+/g, "");
        const words = noSpace.split(" ");
        let count = 0;
        let tempArr: IWord[] = [];
        for (const word of words) {
          if (count > 8) {
            segmentArr.push(tempArr);
            tempArr = [];
            count = 0;
          }
          tempArr.push({ value: word, verseNumber: +verse.verseNumber });
          count++;
        }
        segmentArr.push(tempArr);
        resultArr.push(...segmentArr);
      }
    }
  }
  return resultArr;
}
