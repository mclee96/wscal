(this.webpackJsonpwscal=this.webpackJsonpwscal||[]).push([[0],{53:function(e,t,n){},54:function(e,t,n){},60:function(e,t,n){"use strict";n.r(t);var r,i=n(1),a=n.n(i),s=n(20),c=n.n(s),l=(n(53),n(6)),o=n(18),u=n(19),d=n(8),h=n(36),f=n(33),j=(n(54),n(25)),v=n(46),b=n(16),p=n(30),m=n(39),g=n(11),O=n(45),y=n(44),x=n(12),k=n(47),S=n(7),C=n(21),F=n.p+"static/media/morphs.77bb1744.tsv",w=n.p+"static/media/net.eaad620a.tsv",z=n.p+"static/media/na28.13d3a11b.tsv",R=n.p+"static/media/vocab.88e2c3c1.tsv",P="Case",A="Gender",H="Number",N="Mood",T="participle",D="Part",I="Person",E="Tense",M="Voice",L="Chapter",G="Gloss",W="Lemma",_="Result",V="Sense",B="English",q="Greek",J="Reference",U=(r={},Object(l.a)(r,E,["present","imperfect","future","aorist","perfect"]),Object(l.a)(r,M,["active","middle","passive"]),Object(l.a)(r,N,["indicative","imperative","infinitive","subjunctive",T]),r),X=n(55),K=function(){function e(){Object(o.a)(this,e)}return Object(u.a)(e,null,[{key:"loadData",value:function(){return new Promise((function(t,n){Object.keys(localStorage).some((function(e){return e.includes("esv_filepath")||e.includes("na28_filepath")}))&&localStorage.clear(),0===e.vocab.length?e.loadFile("vocab",R,(function(n){var r=[];X.parse(n,{delimiter:"\t",header:!0}).data.forEach((function(e){return r.push(e)})),e.vocab=r,t(e.vocab)})):t(e.vocab),0===e.morphs.length&&e.loadFile("morphs",F,(function(t){var n=[];X.parse(t,{delimiter:"\t",header:!0}).data.forEach((function(e){return n.push(e)})),e.morphs=n})),0===Object.keys(e.english).length&&e.loadFile("english",w,(function(t){X.parse(t,{delimiter:"\t",header:!0,quoteChar:"`"}).data.forEach((function(t){return e.english[t.Abbr]=t.Text}))})),0===Object.keys(e.greek).length&&e.loadFile("greek",z,(function(t){X.parse(t,{delimiter:"\t",header:!0}).data.forEach((function(t){return e.greek[t.Abbr]=t.Text}))}))}))}},{key:"loadFile",value:function(e,t,n){if(null!=localStorage.getItem(e)&&localStorage.getItem(e+"_filepath")===t)n&&n(localStorage.getItem(e));else{localStorage.setItem(e+"_filepath",t);var r=new XMLHttpRequest;r.addEventListener("load",(function(t){localStorage.setItem(e,r.responseText.trim()),n&&n(r.responseText.trim())})),r.open("GET",t),r.send()}}}]),e}();K.vocab=[],K.morphs=[],K.english={},K.greek={};var Q=K,Y=function(){function e(){Object(o.a)(this,e)}return Object(u.a)(e,null,[{key:"getRecords",value:function(e){return Q.morphs.filter((function(t){return"-"!==t.Chapter&&Object.keys(e).every((function(n){return"-"===t[n]||e[n].includes(t[n])}))})).map((function(e){var t,n=e.Reference.split(","),r=n[Math.floor(Math.random()*n.length)];return Object.assign({},e,(t={},Object(l.a)(t,J,r),Object(l.a)(t,B,Q.english[r]),Object(l.a)(t,q,Q.greek[r]),t))}))}},{key:"getFlashcards",value:function(t,n){return Object.values(e.getRecords(t).map((function(e){var t;switch(e.Part){case"noun":t=[_,W,G,A,P,H,B];break;case"verb":t=e.Mood===T?[_,W,G,E,M,N,A,P,H,B]:[_,W,G,E,M,N,I,H,B];break;case"adjective":t=[_,W,G,A,P,H,B];break;case"conjunction":case"preposition, adverb":case"preposition":t=[_,W,G,B];break;case"pronoun":case"pronoun, adjective":case"adjective, pronoun":t=[_,W,G,I,A,P,H,B];break;default:t=[_]}return[e,t.filter((function(e){return n.includes(e)}))]})).reduce((function(e,t){var n=t[1].filter((function(e){return e!==B})).map((function(e){return t[0][e]})).join();return e[n]=e[n]||t,e}),{})).map((function(e){var t=e[0],n=e[1];return[t.Result,n.map((function(e){return e===G?'("'+t.Gloss+'")':e===B?"<> "+t.Reference+" "+t.English:t[e]})).join(" ")]}))}},{key:"getTranslations",value:function(t){var n=/[\xb7,\.;\[\]\u27e7\u2014]/g,r=["\u1f41","\u03a0\u03b1\u1fe6\u03bb\u03bf\u03c2","\u03a4\u03b9\u03bc\u03cc\u03b8\u03b5\u03bf\u03c2","\u1f38\u03c3\u03b1\u03ac\u03ba","\u03a3\u03c9\u03c3\u03b8\u03ad\u03bd\u03b7\u03c2","\u0394\u03b1\u03c5\u03af\u03b4","\u03a3\u03ac\u03c1\u03c1\u03b1","\u1f0d\u03bd\u03bd\u03b1","\u039a\u03b1\u03ca\u03ac\u03c6\u03b1\u03c2","\u0396\u03b1\u03c7\u03b1\u03c1\u03af\u03b1\u03c2","\u03a4\u03af\u03c4\u03bf\u03c2","\u03a3\u03b9\u03bb\u03bf\u03c5\u03b1\u03bd\u03cc\u03c2","\u1f08\u03b2\u03c1\u03b1\u03ac\u03bc","\u1f38\u03c9\u03ac\u03bd\u03bd\u03b7\u03c2","\u03a3\u03b1\u03bf\u03cd\u03bb","\u1f28\u03bb\u03af\u03b1\u03c2","\u1f09\u03bd\u03b1\u03bd\u03af\u03b1\u03c2","\u1f08\u03bd\u03c4\u03b9\u03c0\u1fb6\u03c2","\u1f38\u03b7\u03c3\u03bf\u1fe6\u03c2","\u039c\u03c9\u03cb\u03c3\u1fc6\u03c2","\u03a3\u03af\u03bc\u03c9\u03bd","\u03a0\u03b9\u03bb\u1fb6\u03c4\u03bf\u03c2","\u039c\u03b1\u03c1\u03af\u03b1","\u1f38\u03b1\u03ba\u03ce\u03b2","\u1f38\u03bf\u03cd\u03b4\u03b1\u03c2","\u03a0\u03ad\u03c4\u03c1\u03bf\u03c2","\u1f38\u03c9\u03c3\u03ae\u03c6","\u039c\u03b1\u03c1\u03b9\u03ac\u03bc","\u039c\u03b5\u03bb\u03c7\u03b9\u03c3\u03ad\u03b4\u03b5\u03ba","\u03a6\u03af\u03bb\u03b9\u03c0\u03c0\u03bf\u03c2","\u039c\u03b1\u03b3\u03b4\u03b1\u03bb\u03b7\u03bd\u03ae","\u1f29\u03c1\u1ff4\u03b4\u03b7\u03c2","\u039a\u03bb\u03ae\u03bc\u03b7\u03c2","\u1f38\u03ac\u03ba\u03c9\u03b2\u03bf\u03c2","\u0392\u03b1\u03c1\u03bd\u03b1\u03b2\u1fb6\u03c2","\u0396\u03b5\u03b2\u03b5\u03b4\u03b1\u1fd6\u03bf\u03c2","\u1f28\u03c3\u03b1\u0390\u03b1\u03c2","\u0392\u03b1\u03c1\u03b1\u03b2\u03b2\u1fb6\u03c2","\u039c\u03ac\u03c1\u03b8\u03b1","\u1f18\u03bb\u03b9\u03c3\u03ac\u03b2\u03b5\u03c4","\u03a3\u03c4\u03ad\u03c6\u03b1\u03bd\u03bf\u03c2","\u1f08\u03b4\u03ac\u03bc","\u039b\u03ac\u03b6\u03b1\u03c1\u03bf\u03c2","\u03a3\u03b1\u1fe6\u03bb\u03bf\u03c2","\u0398\u03c9\u03bc\u1fb6\u03c2","\u039d\u1ff6\u03b5","\u03a6\u1fc6\u03c3\u03c4\u03bf\u03c2","\u1f38\u03c9\u03bd\u1fb6\u03c2","\u03a3\u03c5\u03bc\u03b5\u03ce\u03bd","\u1f08\u03bd\u03b4\u03c1\u03ad\u03b1\u03c2","\u03a3\u03af\u03bb\u03b1\u03c2","\u1f08\u03b3\u03c1\u03af\u03c0\u03c0\u03b1","\u03a6\u1fc6\u03bb\u03b9\u03be","\u039b\u03b5\u03c5\u03af","\u039a\u03b9\u03bb\u03b9\u03ba\u03af\u03b1","\u1f38\u03bf\u03c5\u03b4\u03b1\u1fd6\u03bf\u03c2","\u1f1c\u03c6\u03b5\u03c3\u03bf\u03c2","\u1f38\u03b5\u03c1\u03bf\u03c5\u03c3\u03b1\u03bb\u03ae\u03bc","\u1f38\u03c3\u03c1\u03b1\u03ae\u03bb","\u1f38\u03bf\u03c1\u03b4\u03ac\u03bd\u03b7\u03c2","\u1f38\u03bf\u03c5\u03b4\u03b1\u03af\u03b1","\u03a3\u03ac\u03c1\u03b4\u03b5\u03b9\u03c2","\u0393\u03b1\u03bb\u03b9\u03bb\u03b1\u03af\u03b1","\u039d\u03b1\u03b6\u03b1\u03c1\u03ad\u03b8","\u0392\u03b1\u03b2\u03c5\u03bb\u03ce\u03bd","\u1f39\u03b5\u03c1\u03bf\u03c3\u03cc\u03bb\u03c5\u03bc\u03b1","\u0391\u1f34\u03b3\u03c5\u03c0\u03c4\u03bf\u03c2","\u039c\u03b1\u03ba\u03b5\u03b4\u03bf\u03bd\u03af\u03b1","\u03a3\u03b1\u03bc\u03ac\u03c1\u03b5\u03b9\u03b1","\u039a\u03b1\u03c6\u03b1\u03c1\u03bd\u03b1\u03bf\u03cd\u03bc","\u1f08\u03bd\u03c4\u03b9\u03cc\u03c7\u03b5\u03b9\u03b1","\u039a\u03b1\u03b9\u03c3\u03ac\u03c1\u03b5\u03b9\u03b1","\u0392\u03b7\u03b8\u03bb\u03ad\u03b5\u03bc","\u0394\u03b1\u03bc\u03b1\u03c3\u03ba\u03cc\u03c2","\u1f08\u03c3\u03af\u03b1","\u0392\u03b7\u03b8\u03b1\u03bd\u03af\u03b1","\u03a3\u03c5\u03c1\u03af\u03b1","\u0392\u03b5\u03b5\u03bb\u03b6\u03b5\u03b2\u03bf\u03cd\u03bb","\u03a7\u03c1\u03b9\u03c3\u03c4\u03cc\u03c2","\u03a3\u03b1\u03b4\u03b4\u03bf\u03c5\u03ba\u03b1\u1fd6\u03bf\u03c2","\u1f38\u03c3\u03c1\u03b1\u03b7\u03bb\u03af\u03c4\u03b7\u03c2","\u03a3\u03b9\u03ce\u03bd","\u03ba\u03b1\u03af","\u03b3\u03ac\u03c1","\u1f45\u03c4\u03b9","\u03b4\u03ad"];0===Object.keys(e.verseRecords).length&&Q.morphs.flatMap((function(e){return e.Reference.split(",").map((function(t){return Object.assign({},e,Object(l.a)({},J,t))}))})).forEach((function(t){e.verseRecords[t.Reference]||(e.verseRecords[t.Reference]=[]),e.verseRecords[t.Reference].push(t)})),0===Object.keys(e.verseWords).length&&Object.keys(e.verseRecords).map((function(t){return e.verseWords[t]=Q.greek[t].replaceAll(n,"").split(" ").filter((function(e){return e}))}));var i=[];Object.values(e.verseRecords).filter((function(t){var n=t.map((function(e){return e.Result}));return e.verseWords[t[0].Reference].every((function(e){return n.includes(e)}))})).filter((function(e){return e.filter((function(e){return!r.includes(e.Lemma)})).filter((function(e){return"-"!==e.Chapter})).filter((function(e){return Object.keys(t).filter((function(e){return 0!==t[e].length})).every((function(n){return"-"===e[n]||t[n].includes(e[n])}))})).length>=3})).filter((function(e){var n=e.filter((function(e){return!r.includes(e.Lemma)})).filter((function(e){return"-"===e.Chapter||!Object.keys(t).filter((function(e){return 0!==t[e].length})).every((function(n){return"-"===e[n]||t[n].includes(e[n])}))}));return n.length<=1&&n.every((function(e){return"-"!==e.Sense||"-"!==e.Gloss}))})).map((function(e){return i.push(e[0].Reference)}));var a=[];i.map((function(n){var i=e.verseRecords[n].filter((function(e){return!r.includes(e.Lemma)})).filter((function(e){return"-"===e.Chapter||!Object.keys(t).filter((function(e){return 0!==t[e].length})).every((function(n){return"-"===e[n]||t[n].includes(e[n])}))})).map((function(t){return"<"+t.Lemma+", "+e.abbrvPOS(t.Part)+": "+t[t.Sense.includes("-")?G:V]+">"})),a=e.verseWords[n].map((function(t){return e.verseRecords[n].filter((function(e){return t===e.Result}))[0]})).filter((function(e){return!r.includes(e.Lemma)})).map((function(t){var n=[];switch(t.Part){case"noun":n=[W,A,P,H];break;case"verb":n=[W,E,M,N,I,H];break;case"adjective":n=[W,A,P,H];break;case"conjunction":case"preposition, adverb":case"preposition":n=[W];break;case"pronoun":case"pronoun, adjective":case"adjective, pronoun":n=[W,I,A,P,H];break;default:n=[W]}return"<"+t.Result+": "+n.map((function(n){return e.abbrv(t[n])})).join(" ")+">"})).join(" ");Q.greek[n],Q.english[n];return{ref:n,defs:i,key:a}})).forEach((function(e){return a.push(e)})),a.slice(5).forEach((function(e){return console.log(e)}))}},{key:"abbrv",value:function(e){switch(e){case"masculine":return"m";case"feminine":return"f";case"neuter":return"n";case"first person":return"1p";case"second person":return"2p";case"third person":return"3p";case"singular":return"sg";case"plural":return"pl";case"nominative":return"n";case"genitive":return"g";case"dative":return"d";case"accusative":return"a";case"vocative":return"v";case"present":return"P";case"imperfect":return"I";case"future":return"F";case"aorist":return"A";case"perfect":return"Pf";case"active":return"A";case"passive":return"P";case"middle":return"M";case"middle or passive":case"either middle or passive":case"passive, middle":return"M/P";case"indicative":return"I";case"participle":return"Ptc";case"subjunctive":return"S";case"imperative":return"Imp";case"infinitive":return"Inf";default:return e}}},{key:"abbrvPOS",value:function(e){switch(e){case"noun":return"noun";case"indeclinable, adjective":case"adjective":return"adj.";case"adverb, particle":case"adverb":return"adv.";case"preposition":return"prep.";case"conjunction":return"conj.";case"verb":return"verb";case"pronoun":return"pron.";default:return e}}},{key:"getVocab",value:function(e){return e?Q.vocab.filter((function(t){return e.includes(t.Chapter)})):Q.vocab}}]),e}();Y.verseRecords={},Y.verseWords={};var Z=Y,$=n(32),ee=n(40),te=n(37),ne=n(48),re=(n(41),n(0)),ie=function(e){Object(h.a)(n,e);var t=Object(f.a)(n);function n(e){var r;return Object(o.a)(this,n),(r=t.call(this,e)).state={display:[],selected:e.selected,parts:[]},r.criteria="",r.searchTimeout=0,r.vocab=[],r.onSelect=e.onSelect.bind(Object(d.a)(r)),r.search=r.search.bind(Object(d.a)(r)),r.addAll=r.addAll.bind(Object(d.a)(r)),r.togglePart=r.togglePart.bind(Object(d.a)(r)),r}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var e=this;Q.loadData().then((function(t){e.vocab=t,e.setState({display:t})}))}},{key:"componentDidUpdate",value:function(e){e.selected!==this.props.selected&&this.setState({selected:this.props.selected})}},{key:"togglePart",value:function(e){var t=this;this.setState((function(n,r){var i=n.parts.indexOf(e),a=i>-1?n.parts.slice(0,i).concat(n.parts.slice(i+1)):Object($.a)(n.parts).concat([e]);return{parts:a,display:t.filter(t.criteria,a)}}))}},{key:"search",value:function(e,t){var n=this;this.criteria=e,t.preventDefault(),this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout((function(){return n.setState({display:n.filter(e,n.state.parts)})}),100)}},{key:"addAll",value:function(e,t){t.preventDefault(),e=e||"all";var n=this.state.parts?e+" "+this.state.parts.map((function(e){return e+"s"})).join():e;this.onSelect(n,this.filter(e,this.state.parts),"add")}},{key:"filter",value:function(e,t){var n=this,r=[];return e.trim().split(",").map((function(e){var r=e.trim();if(!r)return n.vocab;var i=e.replaceAll("ch","").split("-");if(i.every((function(e){return!isNaN(e)}))){i.length<2&&i.push(parseInt(i[0]));for(var a=[],s=parseInt(i[0]);s<parseInt(i[1])+1;s++)a=a.concat(n.vocab.filter((function(e){var n=Object.values(e).join().normalize("NFD").replace(/[\u0300-\u036f]/g,"");return n.endsWith(","+s.toString())&&(0===t.length||t.some((function(e){return n.includes(","+e+",")})))})));return a}switch(r){case"nouns":case"nns":case"nn":r="noun";break;case"verbs":case"vbs":case"vb":r="verb";break;case"adjectives":case"adjs":case"adj":r="adjective";break;case"prepositions":case"preps":case"prep":r="preposition";break;case"conjunctions":case"conjs":case"conj":r="conjunction";break;case"adverbs":case"advbs":case"advb":case"adv":r="adverb"}return["noun","verb","adjective","preposition","conjunction","adverb"].includes(r)?n.vocab.filter((function(e){return Object.values(e).join().normalize("NFD").replace(/[\u0300-\u036f]/g,"").includes(","+r.normalize("NFD")+",")})):n.vocab.filter((function(e){var n=Object.values(e).join().normalize("NFD").replace(/[\u0300-\u036f]/g,"");return n.includes(r.normalize("NFD"))&&(0===t.length||t.some((function(e){return n.includes(","+e+",")})))}))})).forEach((function(e){return r=r.concat(e)})),r}},{key:"render",value:function(){var e=this,t=[W,L,D,G],n=[50,120,30,100,500];return Object(re.jsx)("div",{children:Object(re.jsxs)(j.a,{variant:"light",style:{textAlign:"left",borderColor:"lightgrey"},children:[Object(re.jsx)("h5",{children:"(1) vocab"}),Object(re.jsx)(x.a,{className:"me-1",children:Object(re.jsx)(g.a,{children:Object(re.jsx)(ee.a,{onSubmit:function(t){return e.addAll(t.target[0].value,t)},children:Object(re.jsxs)(te.a,{size:"sm",children:[Object(re.jsx)(ee.a.Control,{type:"text",id:"wat","aria-label":"chapter restrictions (e.g. 2 or 2,3 or 2-4)","aria-describedby":"basic-addon1",placeholder:'try "ch7-9" or "\u03c0\u03b1\u03c2"',onChange:function(t){return e.search(t.target.value,t)}}),Object(re.jsxs)(b.a,{disabled:this.state.display.length<=0,size:"sm",type:"submit",children:["Add All (",this.state.display.length,")"]})]})})})}),Object(re.jsx)(x.a,{children:Object(re.jsx)(g.a,{children:Object(re.jsx)(te.a,{size:"sm",children:Object(re.jsxs)(C.a,{type:"checkbox",size:"sm",children:[Object(re.jsx)(S.a,{variant:"outline-secondary",value:"nouns",id:"nouns-filter",style:{lineHeight:1,fontSize:".75em",width:"4em"},onClick:function(t){return e.togglePart("noun",t)},children:"noun"}),Object(re.jsx)(S.a,{variant:"outline-secondary",value:"verbs",id:"verbs-filter",style:{lineHeight:1,fontSize:".75em",width:"4em"},onClick:function(t){return e.togglePart("verb",t)},children:"verb"}),Object(re.jsx)(S.a,{variant:"outline-secondary",value:"adjectives",id:"adjectives-filter",style:{lineHeight:1,fontSize:".75em",width:"4em"},onClick:function(t){return e.togglePart("adjective",t)},children:"adj."}),Object(re.jsx)(S.a,{variant:"outline-secondary",value:"prepositions",id:"prepositions-filter",style:{lineHeight:1,fontSize:".75em",width:"4em"},onClick:function(t){return e.togglePart("preposition",t)},children:"prep."}),Object(re.jsx)(S.a,{variant:"outline-secondary",value:"pronouns",id:"pronouns-filter",style:{lineHeight:1,fontSize:".75em",width:"4em"},onClick:function(t){return e.togglePart("pronoun",t)},children:"pron."}),Object(re.jsx)(S.a,{variant:"outline-secondary",value:"adverb",id:"adverbs-filter",style:{lineHeight:1,fontSize:".75em",width:"4em"},onClick:function(t){return e.togglePart("adverb",t)},children:"adv."}),Object(re.jsx)(S.a,{variant:"outline-secondary",value:"conjunctions",id:"conjunctions-filter",style:{lineHeight:1,fontSize:".75em",width:"4em"},onClick:function(t){return e.togglePart("conjunction",t)},children:"conj."})]})})})}),Object(re.jsx)(x.a,{className:"mt-3",children:Object(re.jsx)(g.a,{children:Object(re.jsx)(ne.a,{height:480,width:480,columnCount:5,columnWidth:function(e){return n[e]},rowCount:this.state.display.length,rowHeight:function(e){return 30},children:function(n){var r=n.columnIndex,i=n.rowIndex,a=n.style;return Object(re.jsx)("div",{style:Object.assign({},a,{textAlign:"left"}),children:0===r?Object(re.jsx)(S.a,{className:"ms-2",id:i,type:"checkbox",value:i,variant:"outline-primary",checked:e.state.selected.includes(e.state.display[i]),onClick:function(){return e.onSelect(e.state.display[i].Lemma,[e.state.display[i]],"toggle")},style:{lineHeight:1,fontSize:".75em",padding:".35em .65em",fontWeight:700},children:"+"}):e.state.display[i][t[r-1]]})}})})})]})})}}]),n}(a.a.Component),ae=n(43),se=function(e){Object(h.a)(n,e);var t=Object(f.a)(n);function n(e){var r;return Object(o.a)(this,n),(r=t.call(this,e)).state={records:[],display:[],filters:{},fields:[_,W,A,P,E,M,N,I,H,G,D,L],limit:10,flashcardFields:[_,W,A,P,H,G,E,M,N,I,B],flashcards:[],flashcardsPreview:[],showVocab:!0,selected:{}},r.vocab=[],r.toggleFilter=r.toggleFilter.bind(Object(d.a)(r)),r.updateFields=r.updateFields.bind(Object(d.a)(r)),r.updateFlashcardFields=r.updateFlashcardFields.bind(Object(d.a)(r)),r.updateRecords=r.updateRecords.bind(Object(d.a)(r)),r.toggleSelect=r.toggleSelect.bind(Object(d.a)(r)),r.downloadRecords=r.downloadRecords.bind(Object(d.a)(r)),r.getSelected=r.getSelected.bind(Object(d.a)(r)),r}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var e=this;Q.loadData().then((function(t){e.vocab=t}))}},{key:"toggleFilter",value:function(e,t){this.setState((function(n,r){var i=n.filters[e]||[],a=i.slice();return i.includes(t)?a.splice(a.indexOf(t),1):a.push(t),{filters:Object.assign({},n.filters,Object(l.a)({},e,a))}}))}},{key:"toggleSelect",value:function(e,t,n){if("toggle"===n&&(n=Object.keys(this.state.selected).some((function(t){return t===e}))?"remove":"add"),"add"===n&&this.setState((function(n,r){return{selected:Object.assign({},n.selected,Object(l.a)({},e,t))}})),"remove"===n){var r=Object.assign({},this.state.selected);delete r[e],this.setState((function(e,t){return{selected:r}}))}}},{key:"updateFields",value:function(e){this.setState((function(t,n){var r=(t.fields||[]).slice();return r.includes(e)?r.splice(r.indexOf(e),1):r.push(e),{fields:r}}))}},{key:"updateFlashcardFields",value:function(e){this.setState((function(t,n){var r=(t.flashcardFields||[]).slice();return r.includes(e)?r.splice(r.indexOf(e),1):r.push(e),{flashcardFields:r}}))}},{key:"updateRecords",value:function(){var e=Object.assign({},this.state.filters),t=[];Object.values(this.state.selected).forEach((function(e){return t=t.concat(e)})),e.Lemma=t.map((function(e){return e.Lemma})),Z.getTranslations(e);var n=Z.getRecords(e),r=Z.getFlashcards(e,this.state.flashcardFields),i=Math.floor(Math.random()*n.length-this.state.limit),a=r.length>this.state.limit?Math.floor(Math.random()*(r.length-this.state.limit)):0;this.setState({records:n,display:n.slice(i,i+this.state.limit),flashcards:r,flashcardsPreview:r.slice(a,a+this.state.limit)})}},{key:"downloadRecords",value:function(){var e=this.state.flashcards.map((function(e){return e[0]+"\t"+e[1]})).join("\n"),t=new Blob([e],{type:"text/plain;charset=utf-8"}),n=(new Date).toLocaleString("en-US",{hour12:!1}).replaceAll("/",".").replaceAll(":","\u2236").replace(", ","_")+"_flashcards_";null!==this.state.selected&&(n+=Object.keys(this.state.selected).join()),Object.values(this.state.filters).some((function(e){return e.length>0}))&&(n+="_",n+=Object.values(this.state.filters).map((function(e){return e.join(",")})).join("_")),n.length>100&&(n=n.substr(0,100)+"...(full name cut off)"),n+=".tsv",Object(ae.saveAs)(t,n)}},{key:"getSelected",value:function(){var e=[];return Object.values(this.state.selected).forEach((function(t){return e=e.concat(t)})),e}},{key:"render",value:function(){var e=this;return Object(re.jsxs)("div",{className:"App",children:[Object(re.jsx)("header",{className:"App-header",children:Object(re.jsx)("p",{})}),Object(re.jsx)(y.a,{fluid:!0,children:Object(re.jsxs)(x.a,{className:"mt-3",children:[Object(re.jsx)(g.a,{sm:"6",md:"6",lg:"6",xl:"6",xxl:"6",className:"pe-0",children:Object(re.jsx)(O.a,{in:this.state.showVocab,dimension:"width",children:Object(re.jsx)("div",{children:Object(re.jsx)(ie,{selected:this.getSelected(),onSelect:this.toggleSelect})})})}),Object(re.jsxs)(g.a,{className:"ps-0",sm:"9",md:"9",lg:"9",xl:"9",xxl:"9",children:[Object(re.jsxs)(j.a,{variant:"success",style:{textAlign:"left"},children:[Object(re.jsxs)(x.a,{children:[Object(re.jsx)("h5",{children:"(1) I want to study..."}),Object(re.jsx)(x.a,{children:Object(re.jsx)(g.a,{children:Object.keys(this.state.selected).map((function(t){return Object(re.jsx)(v.a,{pill:!0,className:"me-1",bg:"primary",as:"button",style:{borderWidth:"thin"},onClick:function(){return e.toggleSelect(t,[],"remove")},children:t},t)}))})})]}),Object(re.jsxs)(x.a,{style:{marginTop:"1rem"},children:[Object(re.jsx)("h5",{children:"(2) ...with filters..."}),Object(re.jsxs)(m.a,{style:{justifyContent:"space-between"},children:[Object(re.jsxs)(C.a,{id:"Gender",type:"checkbox",size:"sm",children:[Object(re.jsx)(S.a,{id:"feminine",style:{lineHeight:1,fontSize:".75em"},value:"feminine",variant:"outline-success",onClick:function(t){return e.toggleFilter("Gender","feminine",t)},children:"fem."},"feminine"),Object(re.jsx)(S.a,{id:"masculine",style:{lineHeight:1,fontSize:".75em"},value:"masculine",variant:"outline-success",onClick:function(t){return e.toggleFilter("Gender","masculine",t)},children:"mas."},"masculine"),Object(re.jsx)(S.a,{id:"neuter",style:{lineHeight:1,fontSize:".75em"},value:"neuter",variant:"outline-success",onClick:function(t){return e.toggleFilter("Gender","neuter",t)},children:"neu."},"neuter")]},"Gender"),Object(re.jsxs)(C.a,{id:"Case",type:"checkbox",size:"sm",children:[Object(re.jsx)(S.a,{id:"nominative",style:{lineHeight:1,fontSize:".75em"},value:"nominative",variant:"outline-success",onClick:function(t){return e.toggleFilter("Case","nominative",t)},children:"nom."},"nominative"),Object(re.jsx)(S.a,{id:"genitive",style:{lineHeight:1,fontSize:".75em"},value:"genitive",variant:"outline-success",onClick:function(t){return e.toggleFilter("Case","genitive",t)},children:"gen."},"genitive"),Object(re.jsx)(S.a,{id:"dative",style:{lineHeight:1,fontSize:".75em"},value:"dative",variant:"outline-success",onClick:function(t){return e.toggleFilter("Case","dative",t)},children:"dat."},"dative"),Object(re.jsx)(S.a,{id:"accusative",style:{lineHeight:1,fontSize:".75em"},value:"accusative",variant:"outline-success",onClick:function(t){return e.toggleFilter("Case","accusative",t)},children:"acc."},"accusative"),Object(re.jsx)(S.a,{id:"vocative",style:{lineHeight:1,fontSize:".75em"},value:"vocative",variant:"outline-success",onClick:function(t){return e.toggleFilter("Case","vocative",t)},children:"voc."},"vocative")]},"Case"),Object(re.jsxs)(C.a,{id:"Person",type:"checkbox",size:"sm",children:[Object(re.jsx)(S.a,{id:"first person",style:{lineHeight:1,fontSize:".75em"},value:"first person",variant:"outline-success",onClick:function(t){return e.toggleFilter("Person","first person",t)},children:"1p"},"first person"),Object(re.jsx)(S.a,{id:"second person",style:{lineHeight:1,fontSize:".75em"},value:"second person",variant:"outline-success",onClick:function(t){return e.toggleFilter("Person","second person",t)},children:"2p"},"second person"),Object(re.jsx)(S.a,{id:"third person",style:{lineHeight:1,fontSize:".75em"},value:"third person",variant:"outline-success",onClick:function(t){return e.toggleFilter("Person","third person",t)},children:"3p"},"third person")]},"Person"),Object(re.jsxs)(C.a,{id:"Number",type:"checkbox",size:"sm",children:[Object(re.jsx)(S.a,{id:"singular",style:{lineHeight:1,fontSize:".75em"},value:"singular",variant:"outline-success",onClick:function(t){return e.toggleFilter("Number","singular",t)},children:"sg."},"singular"),Object(re.jsx)(S.a,{id:"pl.",style:{lineHeight:1,fontSize:".75em"},value:"pl.",variant:"outline-success",onClick:function(t){return e.toggleFilter("Number","pl.",t)},children:"pl."},"pl.")]},"Number")]}),Object(re.jsx)(m.a,{style:{justifyContent:"space-between"},children:Object.keys(U).filter((function(e){return e!==D})).map((function(t){return Object(re.jsx)(C.a,{id:t,type:"checkbox",size:"sm",children:U[t].map((function(n){return Object(re.jsx)(S.a,{id:n,style:{lineHeight:1,fontSize:".75em"},value:n,variant:"outline-success",onClick:function(r){return e.toggleFilter(t,n,r)},children:n},n)}))},t)}))})]})]}),Object(re.jsxs)(j.a,{variant:"danger",style:{textAlign:"left"},children:[Object(re.jsx)("h5",{children:"(3) ...adjust flashcard fields..."}),Object(re.jsx)(x.a,{children:Object(re.jsx)(p.a,{defaultValue:this.state.flashcardFields,size:"sm",children:n.flashcardFields.map((function(t){return Object(re.jsx)(b.a,{id:t,value:t,active:e.state.flashcardFields.includes(t),variant:"outline-secondary",onClick:function(n){return e.updateFlashcardFields(t,n)},children:t},t)}))})})]}),Object(re.jsxs)(j.a,{variant:"info",style:{textAlign:"left"},children:[Object(re.jsxs)(x.a,{children:[Object(re.jsx)(g.a,{children:Object(re.jsx)("h5",{children:"(4) ...preview!"})}),Object(re.jsxs)(g.a,{style:{textAlign:"right"},children:[Object(re.jsx)(b.a,{onClick:this.updateRecords,variant:"primary",children:"Refresh!"}),Object(re.jsx)(b.a,{onClick:this.updateRecords,variant:"primary",children:"Generate Translation Exercises"}),Object(re.jsx)(b.a,{onClick:this.updateRecords,variant:"primary",children:"Flip"})]})]}),Object(re.jsx)(x.a,{children:Object(re.jsxs)(k.a,{responsive:!0,striped:!0,bordered:!0,hover:!0,size:"sm",children:[Object(re.jsx)("thead",{children:Object(re.jsxs)("tr",{children:[Object(re.jsx)("th",{style:{whiteSpace:"nowrap"},children:"Front"},"front"),Object(re.jsx)("th",{style:{whiteSpace:"nowrap"},children:"Back"},"back")]})}),Object(re.jsx)("tbody",{children:this.state.flashcardsPreview.map((function(e){return Object(re.jsxs)("tr",{children:[Object(re.jsx)("td",{style:{whiteSpace:"nowrap"},children:e[0]},"front"),Object(re.jsx)("td",{style:{whiteSpace:"nowrap"},children:e[1]},"back")]},"tr-"+e[0]+e[1])}))})]})})]}),Object(re.jsxs)(j.a,{variant:"secondary",style:{textAlign:"left"},children:[Object(re.jsx)("h5",{children:"(5) Download flashcards"}),Object(re.jsx)(x.a,{children:Object(re.jsx)(g.a,{children:Object(re.jsxs)(b.a,{onClick:this.downloadRecords,children:["Download Set (",this.state.flashcards.length," flashcards)"]})})})]})]})]})})]})}}]),n}(a.a.Component);se.fields=[_,W,A,P,E,M,N,I,H,G,D,L,"Adverb/particle Type",J,B,q],se.flashcardFields=[_,W,A,P,H,G,E,M,N,I,B];var ce=se,le=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,62)).then((function(t){var n=t.getCLS,r=t.getFID,i=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),r(e),i(e),a(e),s(e)}))};c.a.render(Object(re.jsx)(a.a.StrictMode,{children:Object(re.jsx)(ce,{})}),document.getElementById("root")),le()}},[[60,1,2]]]);
//# sourceMappingURL=main.754e1d58.chunk.js.map