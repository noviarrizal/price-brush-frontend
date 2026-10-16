import sys
def lum(h):
    h=h.lstrip('#'); r,g,b=[int(h[i:i+2],16)/255 for i in (0,2,4)]
    f=lambda c: c/12.92 if c<=0.03928 else ((c+0.055)/1.055)**2.4
    return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)
def cr(a,b):
    la,lb=lum(a),lum(b); hi,lo=max(la,lb),min(la,lb); return (hi+0.05)/(lo+0.05)
L=dict(bg='#F6F3EC',surface='#FFFFFF',surface2='#ECE7DC',ink='#14201A',ink2='#46524B',ink3='#59645D',line='#DCD5C6',linestrong='#78807A',
 brand='#1E3D2E',onbrand='#F7F1DE',accent='#F4C430',accentp='#E0AE14',onaccent='#14201A',
 checkfg='#1D4BAF',checkbg='#EAF0FC',checkline='#3D6BD6',dangerfg='#B42318',dangerbg='#FDECEA',okfg='#17643A',okbg='#DDF0E3',
 sentfg='#24456E',sentbg='#E4EBF4',draftfg='#46524B',draftbg='#E9E4D9',focus='#1D4BAF',coach='#B8892B')
D=dict(bg='#0D1411',surface='#151E19',surface2='#1E2923',ink='#F3EFE4',ink2='#B8C2BB',ink3='#9CA79F',line='#29352F',linestrong='#74817A',
 brand='#1E3D2E',onbrand='#F7F1DE',accent='#F4C430',accentp='#E0AE14',onaccent='#14201A',
 checkfg='#9DBBFF',checkbg='#16213A',checkline='#6690F0',dangerfg='#FF9A90',dangerbg='#2E1716',okfg='#86D9A0',okbg='#12271A',
 sentfg='#AFC6EA',sentbg='#1A2638',draftfg='#B8C2BB',draftbg='#222C27',focus='#9DBBFF',coach='#D9B25A')
pairs=[('ink','bg'),('ink','surface'),('ink','surface2'),('ink2','bg'),('ink2','surface'),('ink2','surface2'),('ink3','bg'),('ink3','surface'),
('linestrong','surface'),('linestrong','bg'),('onbrand','brand'),('onaccent','accent'),('onaccent','accentp'),('accent','bg'),('accent','surface'),('accent','brand'),
('checkfg','checkbg'),('checkfg','surface'),('checkline','surface'),('checkline','checkbg'),('dangerfg','dangerbg'),('dangerfg','surface'),('dangerfg','bg'),
('okfg','okbg'),('sentfg','sentbg'),('draftfg','draftbg'),('bg','ink'),('focus','bg'),('focus','surface'),('coach','brand'),('coach','bg'),('ink','accent')]
for a,b in pairs:
    print(f"{a:>11} on {b:<9} light {cr(L[a],L[b]):5.2f}   dark {cr(D[a],D[b]):5.2f}")
