(function(){var p=new URLSearchParams(location.search),t=p.get('theme'),h=document.documentElement;
if(t){h.classList.add('shot');}else{try{t=localStorage.getItem('pb-theme');}catch(e){}if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}
if(t==='dark')h.classList.add('dark');window.PB_STATE=p.get('state');})();
function pbTheme(){var d=document.documentElement.classList.toggle('dark');try{localStorage.setItem('pb-theme',d?'dark':'light');}catch(e){}pbLabel();}
function pbLabel(){var d=document.documentElement.classList.contains('dark');document.querySelectorAll('[data-theme-label]').forEach(function(e){e.textContent=d?'Dark':'Light';});}
window.addEventListener('load',function(){pbLabel();setTimeout(function(){document.documentElement.setAttribute('data-h',Math.ceil(document.documentElement.scrollHeight));},600);});
