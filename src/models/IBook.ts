import data from "./myData.json";

export interface Book {
  id: number;
  name: string;
  abr: string;
  verseCounts: number[];
  chapterCount: number;
}
const bible: Book[] = [];
for (const i in data) {
  bible.push({
    id: +i,
    ...data[i],
  });
}
export default bible;
