import IWord from "./models/IWord";

const dummyWords = [
  [
    { value: "in", verseNumber: 1 },
    { value: "the", verseNumber: 1 },
    { value: "beginning,", verseNumber: 1 },
  ],
  [
    { value: "god", verseNumber: 2 },
    { value: "created", verseNumber: 2 },
    { value: "the", verseNumber: 2 },
    { value: "heavens", verseNumber: 2 },
    { value: "and", verseNumber: 2 },
    { value: "the", verseNumber: 2 },
    { value: "earth", verseNumber: 2 },
  ],
] as IWord[][];

export default dummyWords;
