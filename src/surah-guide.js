// Concise editorial overviews: each Surah contains more than this selected focus.
const messages=`Seeking guidance and worshipping Allah
Faith, responsibility and guidance for a community
Steadfast faith, unity and trust in Allah
Justice, family responsibilities and protection of the vulnerable
Keeping commitments, fairness and obedience to Allah
Allah’s oneness and signs that invite belief
Learning from earlier peoples and responding to guidance
Faith, unity and responsibility during conflict
Repentance, sincerity and honouring commitments
Revelation, Allah’s signs and the call to faith
Steadfastness and lessons from earlier messengers
Patience, providence and forgiveness through Yusuf’s journey
Allah’s signs, truth and remembrance
Gratitude, revelation and the mission of messengers
Revelation, creation and warnings from the past
Allah’s blessings, gratitude and justice
Worship, moral responsibility and human dignity
Faith through trials of belief, wealth, knowledge and power
Allah’s mercy and accounts of His chosen servants
Revelation as guidance and the mission of Musa
The shared call of the prophets and accountability
Worship, sacrifice and reverence for Allah
Qualities of believers and the reality of resurrection
Modesty, integrity and responsibilities in community life
True guidance and the character of Allah’s servants
The messengers’ call and the consequences of rejection
Signs, wisdom and responding to Allah’s guidance
Allah’s care, the story of Musa and the danger of arrogance
Faith tested through trials and perseverance
Signs of Allah, resurrection and the changing world
Wisdom, gratitude and advice for a life of faith
Creation, revelation and the certainty of return
Faithfulness, prophetic example and community responsibilities
Gratitude for blessings and the danger of turning away
Allah as Creator and our need for His guidance
Revelation, signs of life and the certainty of resurrection
Allah’s oneness and the steadfastness of His messengers
Justice, repentance and lessons from prophetic lives
Sincere worship, repentance and hope in Allah’s mercy
Faith, forgiveness and the struggle against arrogance
Revelation, signs in creation and steadfast faith
Revelation, consultation, justice and forgiveness
True guidance beyond wealth and worldly status
Revelation and warnings about rejecting the truth
Allah’s signs and accountability for our choices
Revelation, kindness to parents and learning from past peoples
Sincerity, obedience and responsibility in struggle
Reassurance, commitment and the promise of victory
Respectful speech, reconciliation and human dignity
Resurrection, Allah’s knowledge and human responsibility
Signs of Allah and the purpose of worship
Accountability and the truth of revelation
Revelation, human effort and returning to Allah
Warnings from earlier peoples and the approach of the Hour
Allah’s abundant gifts and the call to gratitude
The Hereafter and contrasting human destinies
Faith, charity and the fleeting nature of worldly life
Allah hears the oppressed; practise justice and proper conduct
Reflection, generosity and the beautiful names of Allah
Loyalty in faith and fairness toward peaceful neighbours
Integrity between words and actions
Responding to the call to Friday prayer
The danger of hypocrisy and neglecting remembrance
Faith, accountability and generosity despite trials
Responsibility and fairness during divorce
Repentance, household responsibility and examples of faith
Allah’s sovereignty, creation and life as a test
Moral character and the danger of arrogance
The certainty of judgement and the truth of revelation
Patience, prayer and accountability before Allah
Nuh’s persistent call to worship Allah
The jinn’s response to revelation and Allah’s oneness
Night prayer, recitation and preparation for responsibility
Rise to warn, purify and fulfil responsibility
Resurrection and the self that examines its deeds
Human responsibility, gratitude and selfless giving
Warnings about the Day of Decision
Creation and the coming Day of Decision
Resurrection, accountability and the danger of tyranny
The value of sincere seekers and the need for guidance
Cosmic upheaval and the truth of revelation
Accountability and the recording of human deeds
Honesty in trade and the record of our deeds
The journey toward Allah and final accountability
Persecution, steadfast faith and Allah’s justice
Creation and the certainty of return
Glorifying Allah and choosing lasting good
The Hereafter and reflection on creation
Lessons from past peoples and the care of the vulnerable
The demanding path of compassion and helping others
Purifying the soul and resisting corruption
Contrasting paths of generosity and selfishness
Reassurance, gratitude and care for people in need
Ease with hardship and renewed devotion
Human dignity, faith and good deeds
Reading, learning and the danger of self-sufficient pride
The significance of the Night of Decree
Clear guidance, sincerity and upright worship
Even the smallest deeds will be accounted for
Human ingratitude and the exposure of hidden motives
The weight of deeds on the Day of Judgement
The distraction of rivalry for more worldly possessions
Time, faith, good deeds and mutual encouragement
The harm of mockery and obsessive accumulation
Allah’s protection against the army of the elephant
Gratitude for provision and security through worship
Sincere worship shown through care and everyday kindness
Gratitude, prayer and sacrifice
Clarity and firmness in worship
Praise and seeking forgiveness when help arrives
The failure of wealth and hostility to defeat truth
Allah’s absolute oneness and uniqueness
Seeking Allah’s protection from external harms
Seeking Allah’s protection from whispering evil`.split('\n');
// Selected narrative passages; brief mentions are explicitly labelled.
const accounts={
 2:['Adam · 30–39','Musa & the Children of Israel · 49–61','Ibrahim · 124–132'],
 3:['Zakariya & Yahya · 38–41','Maryam & Isa · 42–55'],
 4:['Messengers mentioned · 163–165'],5:['Musa · 20–26','Adam’s two sons · 27–31','Isa · 110–120'],
 6:['Ibrahim · 74–83'],7:['Adam · 11–27','Nuh, Hud, Salih, Lut & Shuayb · 59–93','Musa · 103–155'],
 9:['The Prophet & his companion in the cave · 40'],10:['Nuh · 71–73','Musa · 75–93','People of Yunus · 98 (brief)'],
 11:['Nuh, Hud, Salih, Ibrahim, Lut & Shuayb · 25–95','Musa · 96–99 (brief)'],12:['Yusuf · 4–101'],
 14:['Musa · 5–8 (brief)','Ibrahim’s prayer · 35–41'],15:['Adam · 26–44','Ibrahim & Lut · 51–77'],
 17:['Musa · 101–104 (brief)'],18:['People of the cave · 9–26','Musa and a servant of Allah · 60–82','Dhul-Qarnayn · 83–98'],
 19:['Zakariya & Yahya · 2–15','Maryam & Isa · 16–36','Ibrahim · 41–50'],20:['Musa · 9–98','Adam · 115–123'],
 21:['Ibrahim · 51–73','Dawud & Sulayman · 78–82','Ayyub · 83–84','Yunus · 87–88','Zakariya · 89–90'],
 23:['Nuh · 23–30','Musa, Harun, Maryam & Isa · 45–50 (brief)'],
 26:['Musa, Ibrahim, Nuh, Hud, Salih, Lut & Shuayb · 10–191'],
 27:['Musa · 7–14','Sulayman & the Queen of Sheba · 15–44','Salih & Lut · 45–58'],
 28:['Musa · 3–46','Qarun · 76–82'],29:['Nuh, Ibrahim, Lut & Shuayb · 14–37','Musa · 39 (brief)'],
 31:['Luqman’s advice · 12–19'],33:['The Confederates · 9–27'],34:['Dawud & Sulayman · 10–14','People of Saba · 15–19'],
 36:['Messengers to a town · 13–29'],37:['Nuh, Ibrahim, Musa, Harun, Ilyas, Lut & Yunus · 75–148'],
 38:['Dawud · 17–26','Sulayman · 30–40','Ayyub · 41–44','Adam · 71–85'],
 40:['Musa & the believing man · 23–46'],43:['Ibrahim · 26–28 (brief)','Musa · 46–56','Isa · 57–65'],
 44:['Musa & Pharaoh’s people · 17–33'],46:['Hud & his people · 21–26','Jinn hearing the Quran · 29–32'],
 51:['Ibrahim’s guests · 24–37','Musa · 38–40 (brief)'],53:['Earlier peoples · 50–54 (brief)'],
 54:['Nuh, Hud, Salih, Lut & Pharaoh’s people · 9–42'],60:['Ibrahim’s example · 4–6'],61:['Musa & Isa · 5–6 (brief)'],
 66:['Wives of Nuh & Lut, Pharaoh’s wife & Maryam · 10–12'],68:['Owners of the garden · 17–33','Yunus · 48–50 (brief)'],
 69:['Earlier peoples · 4–12 (brief)'],71:['Nuh · 1–28'],79:['Musa & Pharaoh · 15–26'],
 85:['People of the trench · 4–10','Pharaoh & Thamud · 17–18 (brief)'],89:['Ad, Thamud & Pharaoh · 6–14 (brief)'],
 91:['Thamud and their messenger · 11–15'],105:['Army of the elephant · 1–5'],111:['Abu Lahab · 1–5']
};
export const surahGuide=messages.map((message,i)=>({number:i+1,message,accounts:accounts[i+1]||[]}));
