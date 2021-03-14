interface IFormattedVerse {
  verseNumber: string;
  verse: string;
}
export default function convertToSegments(passage: string) {
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
    console.log(formattedVerses);
  }
  return;
}
