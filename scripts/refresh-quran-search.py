"""Refresh complete QuranEnc search corpus. Run before building/deploying."""
import concurrent.futures,datetime,gzip,io,json,time,urllib.request,zipfile,sqlite3,tempfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def get(url):
 for attempt in range(3):
  try:
   with urllib.request.urlopen(url,timeout=40) as r:return r.read()
  except Exception:
   if attempt==2:raise
   time.sleep(attempt+1)
meta=json.loads(get('https://quranenc.com/api/v1/translations/list/'))['translations']
counts=json.loads((ROOT/'scripts/quran-verse-counts.json').read_text())
def chapter(n):
 rows=json.loads(get(f'https://quranenc.com/api/v1/translation/sura/english_rwwad/{n}'))['result']
 assert len(rows)==counts[n-1]
 for i,v in enumerate(rows):assert int(v['sura'])==n and int(v['aya'])==i+1 and v['arabic_text'] and v['translation']
 return n,rows
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:chapters=dict(pool.map(chapter,range(1,115)))
for lang,key in [('en','english_rwwad'),('ta','tamil_baqavi')]:
 info=next(t for t in meta if t['key']==key)
 if lang=='ta':
  with tempfile.TemporaryDirectory() as tmp:
   z=zipfile.ZipFile(io.BytesIO(get(f'https://quranenc.com/downloads/sqlite/{key}.zip')))
   db=Path(tmp)/'source.sqlite';db.write_bytes(z.read(f'{key}.sqlite'))
   c=sqlite3.connect(db);translations={(s,a):(t,f or '') for s,a,t,f in c.execute('select sura,aya,translation,footnotes from translations')};c.close()
 rows=[]
 for n in range(1,115):
  for v in chapters[n]:
   a=int(v['aya']);t,f=(v['translation'],v.get('footnotes') or '') if lang=='en' else translations[(n,a)]
   assert t
   rows.append({'surah':n,'verse':a,'arabic':v['arabic_text'],'translation':t,'footnotes':f})
 assert len(rows)==6236
 result={'source':{k:info.get(k) for k in ['key','title','version','description','last_update']},'updated':datetime.datetime.now(datetime.timezone.utc).isoformat(),'verses':rows}
 output=ROOT/f'public/search/quran-{lang}.json';output.write_text(json.dumps(result,ensure_ascii=False,separators=(',',':')))
 output.with_suffix('.json.gz').write_bytes(gzip.compress(output.read_bytes(),mtime=0))
 print(f'{lang}: {len(rows)} verses; edition {info["version"]}; {output.stat().st_size} bytes',flush=True)
