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

const taMessages=[
  "வழிகாட்டுதலை நாடி அல்லாஹ்வை வணங்குங்கள்",
  "ஈமான், பொறுப்பு மற்றும் ஒரு சமூகத்திற்கு வழிகாட்டுதல்",
  "உறுதியான ஈமான், ஒற்றுமை மற்றும் அல்லாஹ்வின் மீது நம்பிக்கை",
  "நீதி, குடும்பப் பொறுப்புகள் மற்றும் பலவீனமானவர்களின் பாதுகாப்பு",
  "வாக்குறுதிகளை காத்தல், நியாயம் மற்றும் அல்லாஹ்வுக்குக் கீழ்ப்படிதல்",
  "அல்லாஹ்வின் ஒருமையும் ஈமானை அழைக்கும் அவனது அடையாளங்களும்",
  "முந்தைய மக்களிடமிருந்து கற்றுக்கொண்டு வழிகாட்டுதலுக்குப் பதிலளித்தல்",
  "மோதலின்போதும் ஈமான், ஒற்றுமை மற்றும் பொறுப்பு",
  "மனந்திரும்புதல், உண்மைத்தன்மை மற்றும் வாக்குறுதிகளை மதித்தல்",
  "வெளிப்பாடு, அல்லாஹ்வின் அடையாளங்கள் மற்றும் ஈமானுக்கான அழைப்பு",
  "முந்தைய தூதர்களிடமிருந்து பொறுமையும் பாடங்களும்",
  "யூசுஃபின் பயணத்தின் மூலம் பொறுமை, விதி மற்றும் மன்னிப்பு",
  "அல்லாஹ்வின் அடையாளங்கள், உண்மை மற்றும் இறைநினைவு",
  "நன்றியுணர்வு, வெளிப்பாடு மற்றும் தூதர்களின் பணி",
  "வெளிப்பாடு, படைப்பு மற்றும் கடந்த கால எச்சரிக்கைகள்",
  "அல்லாஹ்வின் அருட்கொடைகள், நன்றியுணர்வு மற்றும் நீதி",
  "வழிபாடு, ஒழுக்கப் பொறுப்பு மற்றும் மனித கண்ணியம்",
  "ஈமானின் சோதனைகள், செல்வம், அறிவு மற்றும் அதிகாரத்துடன் வாழ்தல்",
  "அல்லாஹ்வின் அருளும் அவன் தேர்ந்தெடுத்த அடியார்களின் நிகழ்வுகளும்",
  "வெளிப்பாடு வழிகாட்டுதலாகவும் மூஸாவின் பணியாகவும் அமைதல்",
  "நபிமார்களின் ஒரே அழைப்பும் பொறுப்புணர்வும்",
  "வழிபாடு, தியாகம் மற்றும் அல்லாஹ்வின் மீதான பயபக்தி",
  "முஃமின்களின் பண்புகளும் உயிர்த்தெழுதலின் உண்மையும்",
  "அடக்கம், நேர்மை மற்றும் சமூகப் பொறுப்புகள்",
  "உண்மையான வழிகாட்டுதலும் அல்லாஹ்வின் அடியார்களின் நற்குணமும்",
  "தூதர்களின் அழைப்பும் அதை நிராகரிப்பதன் விளைவுகளும்",
  "அடையாளங்கள், ஞானம் மற்றும் அல்லாஹ்வின் வழிகாட்டுதலுக்குப் பதிலளித்தல்",
  "அல்லாஹ்வின் பராமரிப்பு, மூஸாவின் நிகழ்வு மற்றும் அகந்தையின் ஆபத்து",
  "சோதனைகளில் ஈமானை காத்து பொறுமையுடன் நிலைத்திருத்தல்",
  "அல்லாஹ்வின் அடையாளங்கள், உயிர்த்தெழுதல் மற்றும் மாறும் உலகம்",
  "ஞானம், நன்றியுணர்வு மற்றும் ஈமானுக்கான அறிவுரை",
  "படைப்பு, வெளிப்பாடு மற்றும் அல்லாஹ்விடம் திரும்பும் நிச்சயம்",
  "நம்பிக்கைத்தன்மை, நபிமார்களின் முன்மாதிரி மற்றும் சமூகப் பொறுப்புகள்",
  "அருட்கொடைகளுக்கு நன்றி செலுத்தி விலகிச் செல்லும் ஆபத்தைத் தவிர்த்தல்",
  "படைப்பாளியான அல்லாஹ்வையும் அவனது வழிகாட்டுதலுக்கான நமது தேவையையும் உணர்தல்",
  "வெளிப்பாடு, உயிரின் அடையாளங்கள் மற்றும் உயிர்த்தெழுதலின் நிச்சயம்",
  "அல்லாஹ்வின் ஒருமையும் அவனது தூதர்களின் உறுதியும்",
  "நீதி, மனந்திரும்புதல் மற்றும் நபிமார்களின் வாழ்க்கைப் பாடங்கள்",
  "உண்மையான வழிபாடு, மனந்திரும்புதல் மற்றும் அல்லாஹ்வின் அருளில் நம்பிக்கை",
  "ஈமான், மன்னிப்பு மற்றும் அகந்தைக்கு எதிரான போராட்டம்",
  "படைப்பிலுள்ள அடையாளங்களும் உறுதியான ஈமானும்",
  "வெளிப்பாடு, ஆலோசனை, நீதி மற்றும் மன்னிப்பு",
  "செல்வத்தையும் உலக அந்தஸ்தையும் தாண்டிய உண்மையான வழிகாட்டுதல்",
  "வெளிப்பாடும் உண்மையை நிராகரிப்பதற்கான எச்சரிக்கையும்",
  "அல்லாஹ்வின் அடையாளங்களும் நமது தேர்வுகளுக்கான பொறுப்பும்",
  "வெளிப்பாடு, பெற்றோரிடம் நன்மை மற்றும் முந்தைய மக்களிடமிருந்து கற்றல்",
  "உண்மைத்தன்மை, கீழ்ப்படிதல் மற்றும் போராட்டத்தில் பொறுப்பு",
  "நம்பிக்கையூட்டல், அர்ப்பணிப்பு மற்றும் வெற்றியின் வாக்குறுதி",
  "மரியாதையான பேச்சு, சமரசம் மற்றும் மனித கண்ணியம்",
  "உயிர்த்தெழுதல், அல்லாஹ்வின் அறிவு மற்றும் மனிதப் பொறுப்பு",
  "அல்லாஹ்வின் அடையாளங்களையும் வழிபாட்டின் நோக்கத்தையும் கவனித்தல்",
  "பொறுப்புணர்வும் அல்லாஹ்விடம் கணக்கு கொடுப்பதன் உண்மையும்",
  "முயற்சி செய்து அல்லாஹ்விடம் திரும்பும் வாழ்க்கை",
  "முந்தைய மக்களின் எச்சரிக்கைகளும் நெருங்கிவரும் இறுதி நாளும்",
  "அல்லாஹ்வின் பேரருட்கொடைகளும் நன்றிக்கான அழைப்பும்",
  "மறுமையும் மனிதர்களின் மாறுபட்ட முடிவுகளும்",
  "ஈமான், தர்மம் மற்றும் உலக வாழ்க்கையின் நிலையின்மை",
  "அல்லாஹ் ஒடுக்கப்பட்டவர்களின் அழைப்பைக் கேட்கிறான்; நீதியை நடைமுறைப்படுத்துங்கள்",
  "சிந்தனை, கொடை மற்றும் அல்லாஹ்வின் அழகிய பெயர்கள்",
  "ஈமானில் விசுவாசமும் அமைதியான அயலார்களிடம் நியாயமும்",
  "சொற்களுக்கும் செயல்களுக்கும் இடையே நேர்மை",
  "வெள்ளிக்கிழமை தொழுகைக்கான அழைப்புக்கு பதிலளித்தல்",
  "நயவஞ்சகத்தின் ஆபத்தும் இறைநினைவைப் புறக்கணிப்பதும்",
  "சோதனைகளிலும் ஈமான், பொறுப்பு மற்றும் கொடை",
  "விவாகரத்தின்போது பொறுப்பும் நியாயமும்",
  "மனந்திரும்புதல், குடும்பப் பொறுப்பு மற்றும் ஈமானின் முன்மாதிரிகள்",
  "அல்லாஹ்வின் ஆட்சி, படைப்பு மற்றும் வாழ்க்கை ஒரு சோதனை",
  "நற்குணமும் அகந்தையின் ஆபத்தும்",
  "தீர்ப்பின் நிச்சயமும் வெளிப்பாட்டின் உண்மையும்",
  "பொறுமை, தொழுகை மற்றும் அல்லாஹ்வின் முன் கணக்குக்கான தயாரிப்பு",
  "நூஹின் தொடர்ந்து நிலைத்த அழைப்பும் அல்லாஹ்வை மட்டுமே வணங்குதலும்",
  "ஜின்களின் வெளிப்பாட்டிற்கான பதிலும் அல்லாஹ்வின் ஒருமையும்",
  "இரவுத் தொழுகை, ஓதுதல் மற்றும் பொறுப்பிற்கான தயாரிப்பு",
  "எச்சரிக்க எழுந்து, உங்களைத் தூய்மைப்படுத்தி பொறுப்பை நிறைவேற்றுங்கள்",
  "உயிர்த்தெழுதல் மற்றும் மனிதன் தனது செயல்களை ஆராயும் உண்மை",
  "மனிதப் பொறுப்பு, நன்றியுணர்வு மற்றும் பிறருக்காக தன்னலமின்றி கொடுத்தல்",
  "தீர்ப்புநாளின் எச்சரிக்கைகள்",
  "படைப்பும் வரவிருக்கும் தீர்ப்புநாளும்",
  "உயிர்த்தெழுதல், கணக்கு மற்றும் கொடுமையின் ஆபத்து",
  "உண்மையைத் தேடுபவர்களின் மதிப்பும் வழிகாட்டுதலின் தேவையும்",
  "வானியல் மாற்றங்களும் வெளிப்பாட்டின் உண்மையும்",
  "மனித செயல்கள் பதிவு செய்யப்படுவதும் அவற்றுக்கான பொறுப்பும்",
  "வியாபார நேர்மையும் மனித செயல்களின் பதிவும்",
  "அல்லாஹ்வை நோக்கிய பயணமும் இறுதி கணக்கெடுப்பும்",
  "துன்புறுத்தலிலும் உறுதியான ஈமானும் அல்லாஹ்வின் நீதியும்",
  "படைப்பையும் அல்லாஹ்விடம் திரும்புதலின் நிச்சயத்தையும் சிந்தித்தல்",
  "அல்லாஹ்வைப் போற்றி நிலையான நன்மையைத் தேர்ந்தெடுத்தல்",
  "மறுமையை நினைவுகூர்ந்து படைப்பைப் பற்றி சிந்தித்தல்",
  "முந்தைய மக்களின் பாடங்களும் பாதுகாப்பு தேவைப்படுவோரைக் கவனித்தலும்",
  "இரக்கத்தின் கடினமான பாதையும் பிறருக்கு உதவுதலும்",
  "உள்ளத்தைத் தூய்மைப்படுத்தி சீரழிவை எதிர்த்தல்",
  "கொடையுணர்வுக்கும் சுயநலத்துக்கும் இடையிலான வேறுபட்ட பாதைகள்",
  "அல்லாஹ்வின் பரிவு, நன்றியுணர்வு மற்றும் தேவையுள்ளோரைக் கவனித்தல்",
  "கஷ்டத்துடன் இலகுவும் மீண்டும் அர்ப்பணிப்பும்",
  "மனித கண்ணியம், ஈமான் மற்றும் நற்செயல்கள்",
  "வாசித்தல், கற்றல் மற்றும் தன்னைப் போதுமானவன் என எண்ணும் அகந்தையின் ஆபத்து",
  "லைலத்துல் கத்ரின் முக்கியத்துவம்",
  "தெளிவான வழிகாட்டுதல், உண்மைத்தன்மை மற்றும் நேரான வழிபாடு",
  "மிகச் சிறிய நற்செயல்கள்கூட கணக்கில் கொள்ளப்படும்",
  "மனித நன்றியின்மையும் மறைந்த நோக்கங்கள் வெளிப்படுவதும்",
  "தீர்ப்புநாளில் செயல்களின் எடை",
  "உலகப் பொருட்களைப் பெருக்குவதற்கான போட்டியால் திசைதிருப்பப்படுதல்",
  "காலத்தின் மதிப்பு, ஈமான், நற்செயல் மற்றும் ஒருவருக்கொருவர் ஊக்கம்",
  "கேலி செய்தலும் செல்வத்தைச் சேர்ப்பதில் மூழ்குவதும் ஏற்படுத்தும் தீங்கு",
  "யானைப் படையிலிருந்து அல்லாஹ்வின் பாதுகாப்பு",
  "வாழ்வாதாரத்திற்கும் பாதுகாப்பிற்கும் நன்றி செலுத்தி அல்லாஹ்வை வணங்குதல்",
  "அன்றாட அக்கறை மற்றும் சிறிய நன்மைகளால் வெளிப்படும் உண்மையான வழிபாடு",
  "நன்றி, தொழுகை மற்றும் தியாகம்",
  "வழிபாட்டில் தெளிவும் உறுதியும்",
  "உதவி வந்தபோது அல்லாஹ்வைப் புகழ்ந்து மன்னிப்பு நாடுதல்",
  "செல்வமும் பகையும் உண்மையைத் தோற்கடிக்க முடியாதது",
  "அல்லாஹ்வின் முழுமையான ஒருமையும் தனித்தன்மையும்",
  "வெளிப்புற தீங்குகளிலிருந்து அல்லாஹ்விடம் பாதுகாப்பு நாடுதல்",
  "உள்ளிருந்து வரும் தீய கிசுகிசுப்பிலிருந்து அல்லாஹ்விடம் பாதுகாப்பு நாடுதல்"
];
export const taMeanings=[
  "தொடக்கம்",
  "பசு",
  "இம்ரானின் குடும்பம்",
  "பெண்கள்",
  "விரிக்கப்பட்ட மேசை",
  "கால்நடைகள்",
  "உயர்ந்த இடங்கள்",
  "போரில் கிடைத்த பொருட்கள்",
  "மனந்திரும்புதல்",
  "யூனுஸ்",
  "ஹூத்",
  "யூசுஃப்",
  "இடி",
  "இப்ராஹீம்",
  "பாறைப் பகுதி",
  "தேனீ",
  "இரவுப் பயணம்",
  "குகை",
  "மர்யம்",
  "தா-ஹா",
  "நபிமார்கள்",
  "யாத்திரை",
  "முஃமின்கள்",
  "ஒளி",
  "அளவுகோல்",
  "கவிஞர்கள்",
  "எறும்பு",
  "கதைகள்",
  "சிலந்தி",
  "ரோமானியர்கள்",
  "லுக்மான்",
  "சஜ்தா",
  "கூட்டமைப்பினர்",
  "சபா",
  "படைப்பின் தொடக்குவிப்பவர்",
  "யா-ஸீன்",
  "வரிசைகளை அமைப்பவர்கள்",
  "ஸாத்",
  "குழுக்கள்",
  "மன்னிப்பவர்",
  "விரிவாக விளக்கப்பட்டது",
  "ஆலோசனை",
  "பொன் அலங்காரங்கள்",
  "புகை",
  "மண்டியிடுபவை",
  "காற்றால் வளைந்த மணற்குன்றுகள்",
  "முஹம்மது",
  "வெற்றி",
  "அறைகள்",
  "காஃப்",
  "பறக்கும் காற்றுகள்",
  "மலை",
  "நட்சத்திரம்",
  "சந்திரன்",
  "மிகவும் அருளாளன்",
  "தவிர்க்க முடியாதது",
  "இரும்பு",
  "முறையிட்ட பெண்",
  "வெளியேற்றம்",
  "சோதிக்கப்படும் பெண்",
  "அணிகள்",
  "வெள்ளிக்கிழமை",
  "நயவஞ்சகர்கள்",
  "பரஸ்பர இழப்பு",
  "விவாகரத்து",
  "தடை",
  "ஆட்சி அதிகாரம்",
  "எழுத்துக்கோல்",
  "நிச்சய உண்மை",
  "உயரேறும் படிகள்",
  "நூஹ்",
  "ஜின்கள்",
  "போர்த்திக்கொண்டவர்",
  "மூடிக்கொண்டவர்",
  "உயிர்த்தெழுதல்",
  "மனிதன்",
  "அனுப்பப்பட்டவர்கள்",
  "செய்தி",
  "இழுத்தெடுப்பவர்கள்",
  "அவர் முகம் சுளித்தார்",
  "கவிழ்த்தல்",
  "பிளத்தல்",
  "அளவில் மோசடி",
  "பிளந்து திறக்கப்படுதல்",
  "நட்சத்திர மாளிகைகள்",
  "இரவில் வருபவர்",
  "மிக உயர்ந்தவர்",
  "ஆட்கொள்ளும் நிகழ்வு",
  "விடியல்",
  "நகரம்",
  "சூரியன்",
  "இரவு",
  "காலை நேரம்",
  "நிம்மதி",
  "அத்திப்பழம்",
  "உறைந்த துளி",
  "கத்ரின் இரவு",
  "தெளிவான சான்று",
  "நிலநடுக்கம்",
  "வேகமாக ஓடும் குதிரைகள்",
  "பேரிடர்",
  "உலகப் பெருக்கில் போட்டி",
  "காலத்தின் மாலை",
  "இகழ்பவர்",
  "யானை",
  "குறைஷ்",
  "சிறிய உதவிகள்",
  "மிகுதி",
  "நிராகரிப்பவர்கள்",
  "தெய்வீக உதவி",
  "பனைநார்",
  "தூய்மையான அர்ப்பணிப்பு",
  "விடியல்",
  "மனிதர்கள்"
];
const taAccountNames={
  "Adam": "ஆதம்",
  "Musa & the Children of Israel": "மூஸா மற்றும் இஸ்ராயீல் மக்கள்",
  "Ibrahim": "இப்ராஹீம்",
  "Zakariya & Yahya": "ஸகரியா மற்றும் யஹ்யா",
  "Maryam & Isa": "மர்யம் மற்றும் ஈசா",
  "Messengers mentioned": "குறிப்பிடப்பட்ட தூதர்கள்",
  "Musa": "மூஸா",
  "Adam’s two sons": "ஆதமின் இரு மகன்கள்",
  "Isa": "ஈசா",
  "Nuh, Hud, Salih, Lut & Shuayb": "நூஹ், ஹூத், ஸாலிஹ், லூத் மற்றும் ஷுஐப்",
  "The Prophet & his companion in the cave": "நபியும் அவரது குகைத் தோழரும்",
  "Nuh": "நூஹ்",
  "People of Yunus": "யூனுஸ் மக்கள்",
  "Nuh, Hud, Salih, Ibrahim, Lut & Shuayb": "நூஹ், ஹூத், ஸாலிஹ், இப்ராஹீம், லூத் மற்றும் ஷுஐப்",
  "Yusuf": "யூசுஃப்",
  "Ibrahim’s prayer": "இப்ராஹீமின் துஆ",
  "Ibrahim & Lut": "இப்ராஹீம் மற்றும் லூத்",
  "People of the cave": "குகை வாசிகள்",
  "Musa and a servant of Allah": "மூஸா மற்றும் அல்லாஹ்வின் ஒரு அடியார்",
  "Dhul-Qarnayn": "துல்கர்னைன்",
  "Dawud & Sulayman": "தாவூத் மற்றும் சுலைமான்",
  "Ayyub": "அய்யூப்",
  "Yunus": "யூனுஸ்",
  "Zakariya": "ஸகரியா",
  "Musa, Harun, Maryam & Isa": "மூஸா, ஹாரூன், மர்யம் மற்றும் ஈசா",
  "Musa, Ibrahim, Nuh, Hud, Salih, Lut & Shuayb": "மூஸா, இப்ராஹீம், நூஹ், ஹூத், ஸாலிஹ், லூத் மற்றும் ஷுஐப்",
  "Sulayman & the Queen of Sheba": "சுலைமான் மற்றும் சபாவின் அரசி",
  "Salih & Lut": "ஸாலிஹ் மற்றும் லூத்",
  "Qarun": "காரூன்",
  "Nuh, Ibrahim, Lut & Shuayb": "நூஹ், இப்ராஹீம், லூத் மற்றும் ஷுஐப்",
  "Luqman’s advice": "லுக்மானின் அறிவுரை",
  "The Confederates": "கூட்டமைப்பினர்",
  "People of Saba": "சபா மக்கள்",
  "Messengers to a town": "ஒரு நகரத்திற்கு அனுப்பப்பட்ட தூதர்கள்",
  "Nuh, Ibrahim, Musa, Harun, Ilyas, Lut & Yunus": "நூஹ், இப்ராஹீம், மூஸா, ஹாரூன், இல்யாஸ், லூத் மற்றும் யூனுஸ்",
  "Dawud": "தாவூத்",
  "Sulayman": "சுலைமான்",
  "Musa & the believing man": "மூஸா மற்றும் நம்பிக்கையுள்ள மனிதர்",
  "Musa & Pharaoh’s people": "மூஸா மற்றும் ஃபிர்அவ்னின் மக்கள்",
  "Hud & his people": "ஹூத் மற்றும் அவரது மக்கள்",
  "Jinn hearing the Quran": "குர்ஆனை கேட்ட ஜின்கள்",
  "Ibrahim’s guests": "இப்ராஹீமின் விருந்தினர்கள்",
  "Earlier peoples": "முந்தைய மக்கள்",
  "Nuh, Hud, Salih, Lut & Pharaoh’s people": "நூஹ், ஹூத், ஸாலிஹ், லூத் மற்றும் ஃபிர்அவ்னின் மக்கள்",
  "Ibrahim’s example": "இப்ராஹீமின் முன்மாதிரி",
  "Musa & Isa": "மூஸா மற்றும் ஈசா",
  "Wives of Nuh & Lut, Pharaoh’s wife & Maryam": "நூஹ் மற்றும் லூத்தின் மனைவிகள், ஃபிர்அவ்னின் மனைவி மற்றும் மர்யம்",
  "Owners of the garden": "தோட்டத்தின் உரிமையாளர்கள்",
  "Musa & Pharaoh": "மூஸா மற்றும் ஃபிர்அவ்ன்",
  "People of the trench": "பள்ளத்தின் மக்கள்",
  "Pharaoh & Thamud": "ஃபிர்அவ்ன் மற்றும் ஸமூத்",
  "Ad, Thamud & Pharaoh": "ஆத், ஸமூத் மற்றும் ஃபிர்அவ்ன்",
  "Thamud and their messenger": "ஸமூதும் அவர்களின் தூதரும்",
  "Army of the elephant": "யானைப் படை",
  "Abu Lahab": "அபூ லஹப்"
};
const localizeAccounts=source=>Object.fromEntries(Object.entries(source).map(([n,items])=>[n,items.map(item=>{const [label,range]=item.split(' · ');return taAccountNames[label]?`${taAccountNames[label]} · ${range}`:item})]));
export const taSurahGuide=surahGuide.map((row,i)=>({...row,message:taMessages[i],accounts:localizeAccounts(accounts)[row.number]||[]}));
