const languages = {
  en: {names:['Sokoban','Food Match-3','Ski Adventure'], editions:['Play baseline','Play with Skill']},
  zh: {names:['推箱子','美食消消乐','滑雪大冒险'], editions:['试玩基础版','试玩 Skill 版']},
  ja: {names:['箱押しパズル','フードマッチ3','スキーアドベンチャー'], editions:['通常版を遊ぶ','Skill 版を遊ぶ']}
};
const slugs = ['sokoban','match','ski'];
const picker = document.querySelector('#language');
const preferred = new URL(location.href).searchParams.get('lang') || navigator.language.slice(0,2);
picker.value = Object.hasOwn(languages, preferred) ? preferred : 'en';
function render() {
  const lang = picker.value;
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
  const {names, editions} = languages[lang];
  const main = document.querySelector('#games');
  main.replaceChildren();
  for (const [i, slug] of slugs.entries()) {
    const section = document.createElement('section');
    const title = document.createElement('h2');
    title.textContent = names[i];
    const row = document.createElement('div');
    row.className = 'editions';
    for (const [j, version] of ['baseline','skill'].entries()) {
      const link = document.createElement('a');
      link.className = 'edition';
      link.href = './' + slug + '/' + version + '/';
      const picture = document.createElement('picture');
      const motion = document.createElement('source');
      motion.media = '(prefers-reduced-motion: no-preference)';
      motion.srcset = './previews/' + slug + '-' + version + '-play.webp';
      const image = document.createElement('img');
      image.src = './previews/' + slug + '-' + version + '.webp';
      image.alt = names[i] + ' · ' + editions[j];
      image.width = 390; image.height = 740;
      const label = document.createElement('span'); label.textContent = editions[j];
      picture.append(motion,image); link.append(picture,label); row.append(link);
    }
    section.append(title,row);main.append(section);
  }
}
picker.addEventListener('change',()=>{const url=new URL(location.href);url.searchParams.set('lang',picker.value);history.replaceState(null,'',url);render()});
render();
