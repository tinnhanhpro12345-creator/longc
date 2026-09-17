const questions=[
['Where does your everyday bag go most often?','Choose the setting that best reflects your routine.',['Work & commuting','University & study','Travel & weekends','Errands & everyday life']],
['What size feels just right?','Think about what you genuinely carry.',['Mini — essentials only','Small — phone, wallet, keys','Medium — room for the day','Large — laptop and more']],
['Which colour family do you reach for?','Choose the shade you would happily carry for years.',['Classic black','Deep burgundy','Warm neutrals','Seasonal colour']],
['What matters most when choosing a bag?','Pick the single quality that usually decides it.',['Lightweight comfort','Timeless design','Durability','Brand heritage']],
['How often do you buy a new handbag?','There is no right answer—choose your real habit.',['Several times a year','About once a year','Every 2–3 years','Only when one wears out']],
['Which current price point feels closest to your ideal new Le Pliage?','USD reference prices for this product study.',['Energy XS — $195 USD','Energy L — $220 USD','Xtra XS — $400 USD','I would prefer another price']],
['Which handle style do you prefer?','Imagine the way you carry your bag most often.',['Short top handles','Long shoulder straps','Crossbody strap','Convertible options']],
['How important is a secure closure?','Think about your daily environment.',['Essential','Very important','Nice to have','Not important']],
['What do you carry most days?','Choose the closest match.',['Phone and cardholder','Daily essentials and makeup','Tablet or small laptop','Laptop, bottle and extras']],
['Which finish feels most like you?','Pick the texture you naturally notice first.',['Smooth and minimal','Soft and relaxed','Textured and tactile','Quilted and structured']],
['How do you feel about visible logos?','Choose your preferred level of branding.',['No visible logo','Small and discreet','Recognisable but refined','Bold statement branding']],
['Which season influences your bag choices most?','Pick the wardrobe season you enjoy styling.',['Spring','Summer','Autumn','Winter']],
['What is your ideal bag weight when empty?','Comfort can be as important as capacity.',['Ultra-light','Light','Moderate','Weight is not a concern']],
['How useful is a foldable design?','Think about storage and travel.',['Extremely useful','Often useful','Occasionally useful','Not useful to me']],
['Which interior feature matters most?','Choose the detail you would miss first.',['Zipped pocket','Multiple compartments','Light-coloured lining','Open flexible space']],
['What usually inspires a handbag purchase?','Pick your most common trigger.',['A practical need','A seasonal refresh','A special occasion','A recommendation or trend']],
['Where do you prefer to shop for bags?','Choose your usual shopping channel.',['Brand boutique','Department store','Official website','Trusted online retailer']],
['How long should an everyday bag last?','Choose your expectation for regular use.',['1–2 years','3–5 years','More than 5 years','As long as possible']],
['Would personalisation make a bag more special?','Consider initials, charms or colour details.',['Definitely','Probably','Maybe','Not for me']],
['Which phrase best describes your style?','Your final answer completes the profile.',['Quietly classic','Modern and minimal','Colourful and expressive','Practical and effortless']]
];
const collectionHeroVideo=document.getElementById('collectionHeroVideo');
function playCollectionHero(){
  if(!collectionHeroVideo)return;
  collectionHeroVideo.muted=true;
  collectionHeroVideo.defaultMuted=true;
  collectionHeroVideo.playsInline=true;
  const playback=collectionHeroVideo.play();
  if(playback&&typeof playback.catch==='function')playback.catch(function(){});
}
playCollectionHero();
collectionHeroVideo?.addEventListener('canplay',playCollectionHero,{once:true});
window.addEventListener('pageshow',playCollectionHero);
document.addEventListener('visibilitychange',function(){if(!document.hidden)playCollectionHero();});
const answers=[];
const welcome=document.getElementById('welcome');
const question=document.getElementById('question');
const entry=document.getElementById('entry');
const spin=document.getElementById('spin');
const surveyTop=document.getElementById('surveyTop');
const winner=document.getElementById('winner');
let current=0;
function updateTop(label,percent){document.getElementById('counter').textContent=label;document.getElementById('bar').style.width=percent+'%';window.scrollTo({top:0,behavior:'smooth'});}
function render(){if(document.activeElement&&typeof document.activeElement.blur==='function')document.activeElement.blur();document.body.classList.add('survey-active');welcome.classList.add('hidden');entry.classList.add('hidden');question.classList.remove('hidden');const q=questions[current];document.getElementById('qKicker').textContent='Question '+(current+1)+' of 20';document.getElementById('qTitle').textContent=q[0];document.getElementById('qLead').textContent=q[1];const box=document.getElementById('options');box.innerHTML='';box.style.pointerEvents='auto';q[2].forEach(function(value){const button=document.createElement('button');button.type='button';button.className='option';button.textContent=value;button.addEventListener('click',function(){answers[current]=value;box.style.pointerEvents='none';button.classList.add('selected');setTimeout(function(){if(current<19){current+=1;render();}else{button.blur();question.classList.add('hidden');entry.classList.remove('hidden');updateTop('Participant details',96);}},140);});box.appendChild(button);});updateTop('Question '+(current+1)+' / 20',(current+1)/22*100);}
document.getElementById('start').addEventListener('click',render);
document.getElementById('entryBack').addEventListener('click',function(){entry.classList.add('hidden');current=19;render();});
document.getElementById('entryForm').addEventListener('submit',function(event){event.preventDefault();if(!event.currentTarget.reportValidity())return;entry.classList.add('hidden');prepareWheel();spin.classList.remove('hidden');updateTop('Prize wheel',98);});
const guaranteedBagPrize={name:'Complimentary handbag reward'};
function randomIndex(max){const values=new Uint32Array(1);crypto.getRandomValues(values);return values[0]%max;}
const wheelLabels=['HANDBAG','$1<br>VOUCHER','$5<br>VOUCHER','WALLET','TRAVEL<br>BAG','$10<br>VOUCHER','SCARF<br>SET','CROSSBODY','$50<br>VOUCHER','TRAVEL<br>SET','10%<br>OFF','20%<br>OFF','50%<br>OFF'];
const wheelColours=['#d43d63','#168f88','#ef7b45','#5068bd','#c58a27','#7d55b5','#24945f','#dd5574','#3486b7','#c85b28','#6767ad','#1b9e91','#bd3555'];
let handbagPosition=0;
let rewardTimer;
function prepareWheel(){surveyTop.hidden=true;const wheel=document.getElementById('wheel');const shuffled=wheelLabels.slice();for(let i=shuffled.length-1;i>0;i--){const j=randomIndex(i+1);const value=shuffled[i];shuffled[i]=shuffled[j];shuffled[j]=value;}const stops=[];for(let i=0;i<shuffled.length;i++){const start=i*360/shuffled.length,end=(i+1)*360/shuffled.length;stops.push(wheelColours[i%wheelColours.length]+' '+start+'deg '+end+'deg')}wheel.style.background='conic-gradient(from -'+(180/shuffled.length)+'deg,'+stops.join(',')+')';handbagPosition=shuffled.indexOf('HANDBAG');wheel.querySelectorAll('span').forEach(function(label,index){const angle=index*360/shuffled.length-90,radius=36,x=50+radius*Math.cos(angle*Math.PI/180),y=50+radius*Math.sin(angle*Math.PI/180);let textAngle=index*360/shuffled.length;if(textAngle>90&&textAngle<270)textAngle+=180;label.innerHTML=shuffled[index];label.style.left=x+'%';label.style.top=y+'%';label.style.transform='translate(-50%,-50%) rotate('+textAngle+'deg)';label.classList.remove('bagLabel');});wheel.style.transition='none';wheel.style.transform='rotate(0deg)';void wheel.offsetWidth;wheel.style.transitionProperty='transform';wheel.style.transitionTimingFunction='cubic-bezier(.12,.68,.08,1)';}
function createCouponCode(discount){const bytes=new Uint8Array(3);crypto.getRandomValues(bytes);return 'BAG'+discount+'-'+Array.from(bytes,value=>value.toString(16).padStart(2,'0')).join('').toUpperCase();}
function startRewardTimer(expiresAt){clearInterval(rewardTimer);function renderTime(){const remaining=Math.max(0,expiresAt-Date.now()),minutes=Math.floor(remaining/60000),seconds=Math.floor((remaining%60000)/1000);document.getElementById('couponTimer').textContent=remaining?'Valid for '+String(minutes).padStart(2,'0')+':'+String(seconds).padStart(2,'0'):'Code expired';if(!remaining)clearInterval(rewardTimer);}renderTime();rewardTimer=setInterval(renderTime,1000);}
function celebrateResult(){const colours=['#c6a15b','#8b1734','#168f88','#ef7b45'];for(let i=0;i<24;i++){const piece=document.createElement('i');piece.className='confetti';piece.style.left=randomIndex(100)+'vw';piece.style.background=colours[randomIndex(colours.length)];piece.style.setProperty('--drift',(randomIndex(121)-60)+'px');piece.style.animationDelay=randomIndex(450)+'ms';piece.style.animationDuration=(1700+randomIndex(700))+'ms';document.body.appendChild(piece);setTimeout(function(){piece.remove();},2900)}}
document.getElementById('spinButton').addEventListener('click',function(){const button=this;if(button.disabled)return;const duration=6000+randomIndex(3001);const wheel=document.getElementById('wheel');const segmentAngle=360/wheelLabels.length,landingOffset=(360-handbagPosition*segmentAngle)%360;const finalRotation=1800+landingOffset;button.disabled=true;button.textContent='...';wheel.style.transitionDuration=duration+'ms';wheel.style.transform='rotate('+finalRotation+'deg)';spin.classList.add('spinning');setTimeout(function(){const coupon={code:createCouponCode(100),discount:100,type:'handbag',expiresAt:Date.now()+10*60*1000};sessionStorage.setItem('longchampReward',JSON.stringify(coupon));spin.classList.add('hidden');winner.classList.remove('hidden');winner.classList.remove('winner-enter');void winner.offsetWidth;winner.classList.add('winner-enter');document.getElementById('globalNoticeText').textContent='Your launch reward is unlocked — choose a preferred style and colour for fulfilment when the new collection launches.';document.getElementById('winnerName').textContent=document.getElementById('name').value.trim()||'style lover';document.getElementById('prizeName').textContent=guaranteedBagPrize.name;document.getElementById('discountWon').textContent='Complimentary handbag reward unlocked';document.getElementById('couponCode').textContent=coupon.code;startRewardTimer(coupon.expiresAt);celebrateResult();updateTop('Your reward',100);},duration);});
window.addEventListener('pageshow',function(event){if(event.persisted&&window.matchMedia('(max-width:800px)').matches){answers.length=0;current=0;surveyTop.hidden=false;document.querySelectorAll('.step').forEach(function(step){step.classList.add('hidden');});welcome.classList.remove('hidden');document.body.classList.remove('survey-active');document.getElementById('globalNoticeText').textContent='Complete the survey to unlock your launch reward for the upcoming collection.';updateTop('Welcome',3);}});
