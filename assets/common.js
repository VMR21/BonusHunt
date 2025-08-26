<script type="text/plain" data-filename="assets/common.js">export function fmt(n){
return new Intl.NumberFormat(undefined,{maximumFractionDigits:2}).format(Number(n||0));
}
export function sum(arr,sel=(x)=>x){return arr.reduce((a,b)=>a+sel(b),0)}
export function totalWin(hunt){
if(!hunt?.bonuses) return 0;return Object.values(hunt.bonuses).reduce((a,b)=>a+(Number(b.win)||0),0)
}
export function toMulti(win,bet){if(!bet) return 0;return +(Number(win)/Number(bet)).toFixed(2)}
export function currentBonus(h){
if(!h?.order?.length) return null; const i = h.currentIndex||0; const id = h.order[i];
return h.bonuses?.[id]||null;
}
</script>
