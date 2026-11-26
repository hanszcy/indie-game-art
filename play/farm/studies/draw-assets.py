"""Editable vector masters. Run from this directory or any working directory."""
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]

# Each object occupies 128 units. The cut forms share blunt masses, off-center
# attachments and a small number of unclosed marks; no generated illustration.
CUT = [
'''<path fill="#ec773e" d="M44 34 Q54 27 68 35 L96 53 Q97 59 88 68 L39 110 31 112 34 101 40 50Z"/>
<path fill="#258061" d="M57 36 Q30 35 28 16 Q51 10 61 31 L64 12 78 13 69 35 Q88 17 101 25 Q93 43 73 42Z"/>
<path d="m43 53 12 7m-15 9 8 4m4 16 8-8" stroke="#ad452e" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="m70 51 8 5-9 9" stroke="#ffb15b" stroke-width="5" fill="none"/>''',
'''<path fill="#de5144" d="M26 49 Q36 35 58 42 Q77 32 96 47 L107 63 103 91 Q86 109 59 105 Q33 109 20 88 L18 66Z"/>
<path fill="#277653" d="m62 48-25-9 18-3-1-17 10-2 1 19 22-3-14 12 12 12-22-6-12 13Z"/>
<path d="M32 62q-5 10-1 18m56 8-7 4" stroke="#f59872" stroke-width="4" fill="none" stroke-linecap="round"/>''',
'''<path fill="#e8ad31" d="M65 17 78 20 87 34 85 77 68 99 46 81 45 42 53 24Z"/>
<path d="m57 38 17-3m-18 17 20-3m-18 18 17-3m-11-38 3 47" stroke="#f9dc74" stroke-width="5" fill="none"/>
<path fill="#28775b" d="M62 109 47 100 27 63 26 36 44 48 55 70 60 92 73 63 100 47 95 71 82 95Z"/>
<path d="m35 53 21 40m12 3 20-31" stroke="#66a367" stroke-width="3" fill="none"/>''',
'''<path fill="#77629b" d="M64 35 Q91 37 95 59 L87 85 Q73 107 43 110 L22 101 20 89 Q59 92 59 61Z"/>
<path fill="#8fa861" d="m63 42-14-4 14-13 3-14 12 3-5 14 20 10-9 5-2 13-12-11-14 9Z"/>
<path d="M77 62q-2 22-29 33" fill="none" stroke="#b0a6c7" stroke-width="5" stroke-linecap="round"/>''',
'''<path fill="#318060" d="M23 90 Q13 60 50 34 Q76 19 102 24 L108 17 111 22 104 33 Q104 71 76 94 L42 110 23 104Z"/>
<path fill="#c1d47e" d="M30 90Q35 64 65 46L94 34Q87 68 65 83L36 99Z"/>
<path fill="#739f56" d="M37 80q2-12 12-11t9 11q-1 10-11 10t-10-10m20-18q1-12 11-11t10 11q0 10-10 10t-11-10m18-16q0-10 10-10t9 9q-1 10-10 10t-9-9"/>
<path d="m29 101 5 1" stroke="#b7d078" stroke-width="3" fill="none"/>''',
'''<path d="M37 54Q35 21 64 21q28 0 28 33" fill="none" stroke="#b36c3f" stroke-width="7"/>
<path fill="#cd8a4b" d="m17 52 95-2-11 53-75 2Z"/>
<path fill="#e2ac67" d="m20 60 88-1-3 10-82 2m3 13 77-2-2 11-73 3"/>
<path d="m40 58 3 42m23-43 0 43m23-43-4 41" fill="none" stroke="#a45e37" stroke-width="3"/>
<path fill="#fff8e8" d="m51 74 28-1 1 18-29 1Z"/><path d="m60 81 11 3m-8-6-2 10" stroke="#ba5341" stroke-width="2"/>'''
]
# A credible alternative: long bent stems, pinched tapering bodies, open line
# contours. Same subjects, palette, initial state and footprint as the cut forms.
LINE = [
'''<path fill="#ec773e" d="M54 43Q70 39 77 54L52 111Q47 116 46 108L43 61Z"/><path d="M60 44Q31 37 33 16q24 0 27 28m1 0q-2-27 20-30 6 18-18 30m-6 16 10 4m-13 11 8 3" fill="none" stroke="#277653" stroke-width="3" stroke-linecap="round"/>''',
'''<path fill="#de5144" d="M59 48Q38 34 27 54q-20 34 7 45 15 8 30 1 28 9 38-17 11-34-16-39-14-2-27 4"/><path d="M60 52q16-24 5-37m-4 33-18 8m19-8 17 10m-16-9-1 14M34 63q-7 15 0 24" stroke="#277653" stroke-width="3" fill="none" stroke-linecap="round"/>''',
'''<path fill="#e8ad31" d="M63 17Q83 29 79 74L59 105Q41 87 45 54q3-27 18-37"/><path d="M57 105Q22 66 30 39q33 14 27 66 36-19 42-63-27 9-42 63m5-75-6 47m16-37-19 5m18 10-20 5m18 11-17 3" stroke="#277653" stroke-width="3" fill="none"/>''',
'''<path fill="#77629b" d="M65 41q31 19 18 44-15 28-48 24-25-15-10-27 40 12 40-41"/><path d="M68 44q23-26 8-31m-6 27-15 4 12 7m4-11 14 11-11 0M71 62q7 26-28 33" fill="none" stroke="#277653" stroke-width="3" stroke-linecap="round"/>''',
'''<path fill="#739f56" d="M22 103Q28 54 89 30L103 20Q112 72 64 99L22 108Z"/><path d="M30 100q29-44 69-68m-5-9q11-14 15-6t-6 12" stroke="#277653" stroke-width="3" fill="none"/><g fill="#c1d47e"><ellipse cx="47" cy="85" rx="8" ry="10"/><ellipse cx="67" cy="67" rx="8" ry="10"/><ellipse cx="85" cy="48" rx="7" ry="9"/></g>''',
'''<path d="M24 59Q12 91 37 106h50q28-22 15-49M33 57q9-56 34-40t21 42" fill="none" stroke="#b36c3f" stroke-width="4"/><path fill="#e2ac67" d="M23 59q39 14 80-2l-13 45q-28 16-56 0Z"/><path d="m31 74 66 0m-59 17 53 0M43 65l1 38m21-36v39m20-40-4 38" stroke="#b36c3f" stroke-width="2" fill="none"/>'''
]

def atlas(objects):
    return '<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024" viewBox="0 0 384 256">'+''.join(f'<g transform="translate({i%3*128} {i//3*128})">{s}</g>' for i,s in enumerate(objects))+'</svg>'

(ROOT/'assets/crops-cut.svg').write_text(atlas(CUT))
(ROOT/'assets/crops-line.svg').write_text(atlas(LINE))
(ROOT/'assets/basket.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">'+CUT[5]+'</svg>')
# All basket layers use the same square coordinates; the front starts at the
# drawn rim, rather than an unrelated percentage crop of a centered image.
basket_parts=CUT[5].split('<path fill="#cd8a4b"',1)
back=basket_parts[0]+'<path fill="#a4653b" d="M17 52 112 50 101 63 26 64Z"/>'
front='<path fill="#cd8a4b"'+basket_parts[1]
for name,content in [('basket-back',back),('basket-front',front)]:
    (ROOT/f'assets/{name}.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">'+content+'</svg>')

board=[(i*3+i//7*2)%5 for i in range(49)]
sections=[]
for variant,title,desc in [('cut','A · 扁阔切形','重心偏低，短折角与不对称叶簇；粗实的收获。'),('line','B · 弯枝细线','细长身体，开放轮廓与向上弯的柄；轻巧的采摘。')]:
    samples=''.join(f'<i style="--n:{i%3};--r:{i//3}"></i>' for i in [0,1,3,5])
    grid=''.join(f'<i style="--n:{i%3};--r:{i//3}"></i>' for i in board)
    sections.append(f'<section class="{variant}"><h2>{title}</h2><p>{desc}</p><div class="samples">{samples}</div><div class="grid">{grid}</div><p>同色、同尺寸、同排列 · 每格 48px</p></section>')
(ROOT/'studies/style-comparison.html').write_text('''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>造型试样</title><style>*{box-sizing:border-box}body{margin:0;background:#eee9dc;color:#294f3e;font-family:sans-serif;padding:28px}h1{font-size:22px;margin:0 0 10px}h2{font-size:18px}p{font-size:12px;line-height:1.8}main{display:flex;gap:28px}section{width:360px;background:#fff9e9;padding:12px}.samples{display:flex;height:94px;border-bottom:1px solid #dbcdb6;margin-bottom:20px;align-items:center;justify-content:space-around}i{display:block;background-image:url('../assets/crops-cut.svg');background-size:300% 200%;background-position:calc(var(--n)*50%) calc(var(--r)*100%)}.samples i{width:72px;height:72px}.grid{display:grid;grid-template-columns:repeat(7,48px);background:#f3e8d1}.grid i{width:48px;height:48px}.line i{background-image:url('../assets/crops-line.svg')}</style><h1>同一片菜地，两种造型规则</h1><p>先判断作物、相邻形状和普通收获篮，再展开整屏。</p><main>'''+''.join(sections)+'''</main><script type="module">import {Match3} from '../shared/core.js';const b=new Match3(43).board;document.querySelectorAll('.grid').forEach(grid=>{[...grid.children].forEach((el,i)=>{el.style.setProperty('--n',b[i]%3);el.style.setProperty('--r',Math.floor(b[i]/3))})});</script></html>''')
