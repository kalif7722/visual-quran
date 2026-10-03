// Surah Al-Baqarah source-deck map, reviewed against the 12 uploaded PPT sections.
// Counts are the actual slide counts in each source deck.
export const baqarahSections = [
  {part:1, slides:15, verses:'1–20', title:'A Guide for Believers'},
  {part:2, slides:27, verses:'21–60', title:'Allah’s Call, Adam & Bani Isra’il'},
  {part:3, slides:17, verses:'61–80', title:'Choices, Gratitude & the Heart'},
  {part:4, slides:17, verses:'81–100', title:'The Story of Choices'},
  {part:5, slides:18, verses:'101–120', title:'Truth, Tests & Guidance'},
  {part:6, slides:18, verses:'121–140', title:'The Story of the Builders'},
  {part:7, slides:18, verses:'141–160', title:'Direction, Patience & Mercy'},
  {part:8, slides:15, verses:'161–180', title:'Truth, Reflection & Justice'},
  {part:9, slides:18, verses:'181–200', title:'Obedience, Fasting & Hajj'},
  {part:10, slides:19, verses:'201–220', title:'Dua, Effort & Family Values'},
  {part:11, slides:18, verses:'221–240', title:'Growing a Happy Family'},
  {part:12, slides:34, verses:'241–286', title:'Trust, Courage & Strong Faith'}
];

export const baqarahSlideCount = baqarahSections.reduce((sum,s)=>sum+s.slides,0);

export function baqarahSlideMeta(globalSlide){
  let cursor=0;
  for(const section of baqarahSections){
    const start=cursor+1;
    const end=cursor+section.slides;
    if(globalSlide>=start && globalSlide<=end){
      const local=globalSlide-cursor;
      return {
        part:section.part,
        localSlide:local,
        verses:section.verses,
        sectionTitle:section.title,
        sectionStart:local===1
      };
    }
    cursor=end;
  }
  return {part:1,localSlide:globalSlide,verses:'1–286',sectionTitle:'Al-Baqarah',sectionStart:false};
}
