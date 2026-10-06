// Editorial study prompts, anchored to passages rather than exclusive Surah labels.
export const themes = [
 ['faith','Faith & worship','Foundations','◌','Know Allah’s oneness and turn to Him in worship.',[[112,'1-4','Allah’s oneness'],[1,'1-7','Worship and seeking guidance']], 'How can your daily choices express your faith?'],
 ['hope','Mercy & hope','Heart','♡','Return to Allah and find hope when life feels heavy.',[[39,'53-54','Hope and returning to Allah'],[93,'1-11','Reassurance and care for others']], 'What would returning to Allah look like today?'],
 ['patience','Patience & resilience','Heart','⌛','Meet difficulty with prayer, patience and perseverance.',[[2,'153','Seek help through patience and prayer'],[94,'5-8','Ease with hardship'],[12,'90','Patience and consciousness of Allah']], 'What is one patient, constructive step you can take?'],
 ['gratitude','Gratitude & blessings','Heart','✦','Notice blessings and respond with thankful action.',[[14,'7','The call to gratitude'],[55,'1-13','Recognising Allah’s gifts']], 'Which blessing can you acknowledge through action?'],
 ['remembrance','Prayer & remembrance','Foundations','☾','Make space for prayer, remembrance and connection.',[[13,'28','Hearts and the remembrance of Allah'],[20,'14','Prayer and remembrance']], 'When could you pause to remember Allah today?'],
 ['character','Character & community','Daily life','◇','Speak with care, respect others and build better relationships.',[[49,'11-13','Dignity, speech and human diversity'],[31,'18-19','Humility and measured speech']], 'How can your words protect someone’s dignity?'],
 ['family','Family & kindness','Daily life','⌂','Explore compassion toward parents and wisdom within families.',[[17,'23-24','Kindness and prayer for parents'],[31,'13-19','Luqman’s advice to his son']], 'What act of kindness could strengthen a family relationship?'],
 ['justice','Justice & honesty','Daily life','⚖','Stand for fairness, even when it challenges your own interests.',[[4,'135','Upholding justice'],[5,'8','Fairness despite hostility'],[83,'1-6','Honesty in trade']], 'Where do you need to practise greater fairness?'],
 ['giving','Giving & service','Daily life','❧','Care for people in need and put compassion into practice.',[[107,'1-7','Care for orphans and people in need'],[76,'8-9','Giving without seeking repayment'],[90,'12-17','Helping others and encouraging mercy']], 'Who could benefit from a small act of service?'],
 ['creation','Creation & reflection','Big questions','☼','Observe the world and reflect on the signs around you.',[[67,'3-4','Looking carefully at creation'],[3,'190-191','Reflection on the heavens and earth']], 'What in the natural world invites you to reflect?'],
 ['accountability','Purpose & accountability','Big questions','◎','Consider your responsibility and the weight of everyday deeds.',[[99,'7-8','Even the smallest deeds matter'],[103,'1-3','Time, faith and good deeds'],[67,'2','Life as a test of deeds']], 'What small good deed will you make time for?'],
 ['knowledge','Knowledge & wisdom','Foundations','↗','Read, learn and ask Allah for growth in knowledge.',[[96,'1-5','Reading and learning'],[20,'114','Asking for more knowledge']], 'What question would you like to explore more deeply?'],
].map(([id,title,group,icon,description,passages,reflection])=>({id,title,group,icon,description,passages:passages.map(([surah,verses,lesson])=>({surah,verses,lesson})),reflection}));
export const paths=[
 {title:'Begin with the essentials',label:'FIRST STEPS',description:'Explore guidance, Allah’s oneness and how faith shapes daily life.',surahs:[1,112,103]},
 {title:'Find strength in difficulty',label:'FOR THE HEART',description:'Read reassurance, reflect on ease with hardship, then explore patience in Yusuf’s story.',surahs:[93,94,12]},
 {title:'Bring learning into daily life',label:'LIVE WHAT YOU LEARN',description:'Connect respectful speech, wise advice and care for others.',surahs:[49,31,107]},
];
export const stories=[
 {surah:12,verses:'4-101',title:'Yusuf: patience & forgiveness',description:'Follow a story of separation, trials, reunion and forgiveness.'},
 {surah:18,verses:'60-82',title:'Musa: learning with humility',description:'Reflect on the limits of what we know and the patience needed to learn.'},
 {surah:19,verses:'16-36',title:'Maryam: trust through trials',description:'Explore Maryam’s account, her trial and the birth of Isa.'},
];
