(this.webpackJsonpwscal=this.webpackJsonpwscal||[]).push([[0],{57:function(e,t,a){},58:function(e,t,a){},65:function(e,t,a){"use strict";a.r(t);var n,r=a(0),s=a.n(r),c=a(13),i=a.n(c),l=(a(57),a(7)),o=a(21),d=a(22),u=a(15),h=a(42),j=a(39),f=(a(58),a(29)),p=a(19),b=a(37),v=a(50),O=a(25),m=a(45),x=a(51),g=a(52),y=a(30),w=a(20),k=a(46),F=a(12),S=a(47),C=a.p+"static/media/morphs.6539b917.tsv",R=a.p+"static/media/esv.fe2ed14b.tsv",A=a.p+"static/media/na28.19940234.tsv",L=a.p+"static/media/vocab.238ff455.tsv",M="Case",P="Gender",T="Number",E="Mood",I="participle",B="Part",V="adjective",D="noun",G="pronoun",N="verb",_="Person",z="Tense",H="Voice",J="Chapter",q="Gloss",U="Lemma",X="Result",K="Esv",Q="Na28",W="Reference",Y=(n={},Object(l.a)(n,B,[V,D,N,G]),Object(l.a)(n,P,["feminine","masculine","neuter"]),Object(l.a)(n,M,["nominative","genitive","dative","accusative","vocative"]),Object(l.a)(n,z,["present","imperfect","future","aorist","perfect"]),Object(l.a)(n,H,["active","middle","passive"]),Object(l.a)(n,T,["singular","plural"]),Object(l.a)(n,E,["indicative","imperative","infinitive","subjunctive",I]),n),Z=a(59),$=function(){function e(){Object(o.a)(this,e)}return Object(d.a)(e,null,[{key:"loadData",value:function(t){Object.keys(localStorage).some((function(e){return e.includes("/wscal/static/media")}))&&localStorage.clear(),0===e.vocab.length&&e.loadFile("vocab",L,(function(t){var a=[];Z.parse(t,{delimiter:"\t",header:!0}).data.forEach((function(e){return a.push(e)})),e.vocab=a})),0===e.morphs.length&&e.loadFile("morphs",C,(function(t){var a=[];Z.parse(t,{delimiter:"\t",header:!0}).data.forEach((function(e){return a.push(e)})),e.morphs=a})),0===Object.keys(e.esv).length&&e.loadFile("esv",R,(function(t){Z.parse(t,{delimiter:"\t",header:!0}).data.forEach((function(t){return e.esv[t.Abbr]=t.Text}))})),0===Object.keys(e.na28).length&&e.loadFile("na28",A,(function(t){Z.parse(t,{delimiter:"\t",header:!0}).data.forEach((function(t){return e.na28[t.Abbr]=t.Text}))}))}},{key:"loadFile",value:function(e,t,a){if(null!=localStorage.getItem(e)&&localStorage.getItem(e+"_filepath")===t)a&&a(localStorage.getItem(e));else{localStorage.setItem(e+"_filepath",t);var n=new XMLHttpRequest;n.addEventListener("load",(function(t){localStorage.setItem(e,n.responseText.trim()),a&&a(n.responseText.trim())})),n.open("GET",t),n.send()}}},{key:"getRecords",value:function(t){return e.morphs.filter((function(e){return Object.keys(t).filter((function(e){return 0!==t[e].length})).every((function(a){return"-"===e[a]||t[a].includes(e[a])}))})).filter((function(e){return"-"!==e.Chapter})).map((function(t){var a,n=t.Reference.split(","),r=n[Math.floor(Math.random()*n.length)];return Object.assign({},t,(a={},Object(l.a)(a,W,r),Object(l.a)(a,K,e.esv[r]),Object(l.a)(a,Q,e.na28[r]),a))}))}},{key:"getFlashcards",value:function(t,a){return Object.values(e.getRecords(t).map((function(e){var t;switch(e.Part){case"noun":t=[X,U,q,P,M,T,K];break;case"verb":t=e.Mood===I?[X,U,q,z,H,E,P,M,T,K]:[X,U,q,z,H,E,_,T,K];break;case"adjective":t=[X,U,q,P,M,T,K];break;case"conjunction":case"preposition, adverb":case"preposition":t=[X,U,q,K];break;case"pronoun":case"pronoun, adjective":case"adjective, pronoun":t=[X,U,q,P,M,_,T,K];break;default:t=[X]}return[e,t.filter((function(e){return a.includes(e)}))]})).reduce((function(e,t){var a=t[1].filter((function(e){return e!==K})).map((function(e){return t[0][e]})).join();return e[a]=e[a]||t,e}),{})).map((function(e){var t=e[0],a=e[1];return[t.Result,a.map((function(e){return e===q?'("'+t.Gloss+'")':e===K?"<> "+t.Reference+" "+t.Esv:t[e]})).join(" ")]}))}},{key:"getVocab",value:function(t){return t?e.vocab.filter((function(e){return t.includes(e.Chapter)})):e.vocab}}]),e}();$.vocab=[],$.morphs=[],$.esv={},$.na28={};var ee=$,te=(a(60),a(49)),ae=a(1),ne=function(e){Object(h.a)(a,e);var t=Object(j.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={records:[],display:[],filters:{},fields:[X,U,P,M,z,H,E,_,T,q,B,J],showOffcanvas:!1,limit:10,chapters:"",flashcardFields:[X,U,P,M,T,q,z,H,E,_,K],flashcards:[],flashcardsPreview:[],vocab:ee.getVocab()},n.toggleFilter=n.toggleFilter.bind(Object(u.a)(n)),n.updateFields=n.updateFields.bind(Object(u.a)(n)),n.updateFlashcardFields=n.updateFlashcardFields.bind(Object(u.a)(n)),n.updateRecords=n.updateRecords.bind(Object(u.a)(n)),n.updateChapter=n.updateChapter.bind(Object(u.a)(n)),n.setOffcanvas=n.setOffcanvas.bind(Object(u.a)(n)),n.downloadRecords=n.downloadRecords.bind(Object(u.a)(n)),n}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=this;ee.loadData((function(t){return e.setState({records:t})}))}},{key:"toggleFilter",value:function(e,t){this.setState((function(a,n){var r=a.filters[e]||[],s=r.slice();return r.includes(t)?s.splice(s.indexOf(t),1):s.push(t),{filters:Object.assign({},a.filters,Object(l.a)({},e,s))}}))}},{key:"updateChapter",value:function(e){this.setState({chapters:e.target.value})}},{key:"updateFields",value:function(e){this.setState((function(t,a){var n=(t.fields||[]).slice();return n.includes(e)?n.splice(n.indexOf(e),1):n.push(e),{fields:n}}))}},{key:"updateFlashcardFields",value:function(e){this.setState((function(t,a){var n=(t.flashcardFields||[]).slice();return n.includes(e)?n.splice(n.indexOf(e),1):n.push(e),{flashcardFields:n}}))}},{key:"updateRecords",value:function(){var e=Object.assign({},this.state.filters),t=[],a=[],n=!0;this.state.chapters.replaceAll("ch","").split(",").map((function(e){return e.trim()})).forEach((function(e){if(e.includes("-"))for(var r=e.split("-"),s=parseInt(r[0]);s<parseInt(r[1])+1;s++)t.push(s.toString());else""===e||(isNaN(e)?(n=!1,a.push(e)):t.push(e))})),n?(e.Chapter=t,e.Lemma=[]):(a.push.apply(a,ee.getVocab(t).map((function(e){return e.Lemma}))),e.Chapter=[],e.Lemma=a);var r=ee.getRecords(e),s=ee.getFlashcards(e,this.state.flashcardFields),c=Math.floor(Math.random()*r.length-this.state.limit),i=s.length>this.state.limit?Math.floor(Math.random()*(s.length-this.state.limit)):0;this.setState({records:r,display:r.slice(c,c+this.state.limit),flashcards:s,flashcardsPreview:s.slice(i,i+this.state.limit)})}},{key:"downloadRecords",value:function(){var e=this.state.flashcards.map((function(e){return e[0]+"\t"+e[1]})).join("\n"),t=new Blob([e],{type:"text/plain;charset=utf-8"}),a=(new Date).toLocaleString("en-US",{hour12:!1}).replaceAll("/",".").replaceAll(":","\u2236").replace(", ","_")+"_flashcards_";null!==this.state.chapters&&(a+=this.state.chapters),Object.values(this.state.filters).some((function(e){return e.length>0}))&&(a+="_",a+=Object.values(this.state.filters).map((function(e){return e.join(",")})).join("_")),a.length>100&&(a=a.substr(0,100)+"...(full name cut off)"),a+=".tsv",Object(te.saveAs)(t,a)}},{key:"setOffcanvas",value:function(e){this.state.vocab.length>0?this.setState({showOffcanvas:e}):this.setState({showOffcanvas:e,vocab:ee.getVocab()})}},{key:"render",value:function(){var e=this;return Object(ae.jsxs)("div",{className:"App",children:[Object(ae.jsx)("header",{className:"App-header",children:Object(ae.jsx)("p",{children:'"SM Baugh A Greek Primer"'})}),Object(ae.jsxs)(m.a,{children:[Object(ae.jsxs)(f.a,{variant:"success",style:{textAlign:"left"},children:[Object(ae.jsxs)(w.a,{children:[Object(ae.jsx)("h5",{children:"(1) I want to study..."}),Object(ae.jsxs)(g.a,{size:"sm",children:[Object(ae.jsx)(p.a,{variant:"primary",onClick:function(t){return e.setOffcanvas(!0,t)},className:"me-2",children:"Browse Vocab"}),Object(ae.jsx)(x.a.Control,{"aria-label":"chapter restrictions (e.g. 2 or 2,3 or 2-4)","aria-describedby":"basic-addon1",placeholder:'e.g. "ch2,10-11,\u03c0\u1fb6\u03c2,\u03b5\u1f30\u03bc\u03af". Leave blank for any chapter/word.',onChange:this.updateChapter}),Object(ae.jsxs)(S.a,{type:"checkbox",size:"sm",children:[Object(ae.jsx)(F.a,{variant:"outline-secondary",value:"nouns",id:"nouns-filter",onClick:function(t){return e.toggleFilter(B,D,t)},children:"nouns"}),Object(ae.jsx)(F.a,{variant:"outline-secondary",value:"verbs",id:"verbs-filter",onClick:function(t){return e.toggleFilter(B,N,t)},children:"verbs"}),Object(ae.jsx)(F.a,{variant:"outline-secondary",value:"adjectives",id:"adjectives-filter",onClick:function(t){return e.toggleFilter(B,V,t)},children:"adjectives"}),Object(ae.jsx)(F.a,{variant:"outline-secondary",value:"prepositions",id:"prepositions-filter",onClick:function(t){return e.toggleFilter(B,"preposition",t)},children:"preps"}),Object(ae.jsx)(F.a,{variant:"outline-secondary",value:"pronouns",id:"pronouns-filter",onClick:function(t){return e.toggleFilter(B,G,t)},children:"pronouns"}),Object(ae.jsx)(F.a,{variant:"outline-secondary",value:"adverb",id:"adverbs-filter",onClick:function(t){return e.toggleFilter(B,"adverb",t)},children:"adverbs"}),Object(ae.jsx)(F.a,{variant:"outline-secondary",value:"conjunctions",id:"conjunctions-filter",onClick:function(t){return e.toggleFilter(B,"conjunction",t)},children:"conjunctions"})]})]})]}),Object(ae.jsxs)(w.a,{style:{marginTop:"1rem"},children:[Object(ae.jsx)("h5",{children:"(2) ...with filters..."}),Object(ae.jsx)(v.a,{style:{justifyContent:"space-between"},children:Object.keys(Y).filter((function(e){return e!==B})).map((function(t){return Object(ae.jsx)(S.a,{id:t,type:"checkbox",size:"sm",children:Y[t].map((function(a){return Object(ae.jsx)(F.a,{id:a,value:a,variant:"outline-success",onClick:function(n){return e.toggleFilter(t,a,n)},children:a},a)}))},t)}))})]})]}),Object(ae.jsxs)(f.a,{variant:"danger",style:{textAlign:"left"},children:[Object(ae.jsx)("h5",{children:"(3) ...adjust flashcard fields..."}),Object(ae.jsx)(w.a,{children:Object(ae.jsx)(b.a,{defaultValue:this.state.flashcardFields,size:"sm",children:a.flashcardFields.map((function(t){return Object(ae.jsx)(p.a,{id:t,value:t,active:e.state.flashcardFields.includes(t),variant:"outline-secondary",onClick:function(a){return e.updateFlashcardFields(t,a)},children:t},t)}))})})]}),Object(ae.jsxs)(f.a,{variant:"info",style:{textAlign:"left"},children:[Object(ae.jsxs)(w.a,{children:[Object(ae.jsx)(O.a,{children:Object(ae.jsx)("h5",{children:"(4) ...preview!"})}),Object(ae.jsx)(O.a,{style:{textAlign:"right"},children:Object(ae.jsx)(p.a,{onClick:this.updateRecords,variant:"primary",children:"Refresh!"})})]}),Object(ae.jsx)(w.a,{children:Object(ae.jsxs)(k.a,{responsive:!0,striped:!0,bordered:!0,hover:!0,size:"sm",children:[Object(ae.jsx)("thead",{children:Object(ae.jsxs)("tr",{children:[Object(ae.jsx)("th",{style:{whiteSpace:"nowrap"},children:"Front"},"front"),Object(ae.jsx)("th",{style:{whiteSpace:"nowrap"},children:"Back"},"back")]})}),Object(ae.jsx)("tbody",{children:this.state.flashcardsPreview.map((function(e){return Object(ae.jsxs)("tr",{children:[Object(ae.jsx)("td",{style:{whiteSpace:"nowrap"},children:e[0]},"front"),Object(ae.jsx)("td",{style:{whiteSpace:"nowrap"},children:e[1]},"back")]},"tr-"+e[0]+e[1])}))})]})})]}),Object(ae.jsxs)(f.a,{variant:"secondary",style:{textAlign:"left"},children:[Object(ae.jsx)("h5",{children:"(5) Download flashcards"}),Object(ae.jsx)(w.a,{children:Object(ae.jsx)(O.a,{children:Object(ae.jsxs)(p.a,{onClick:this.downloadRecords,children:["Download Set (",this.state.flashcards.length," flashcards)"]})})})]}),Object(ae.jsxs)(y.a,{show:this.state.showOffcanvas,onHide:function(t){return e.setOffcanvas(!1,t)},placement:"start",scoll:"true",children:[Object(ae.jsx)(y.a.Header,{closeButton:!0,children:Object(ae.jsx)(y.a.Title,{children:"Vocab"})}),Object(ae.jsx)(y.a.Body,{children:Object(ae.jsx)(m.a,{children:Object(ae.jsxs)(k.a,{responsive:!0,striped:!0,bordered:!0,hover:!0,size:"sm",children:[Object(ae.jsx)("thead",{children:Object(ae.jsxs)("tr",{children:[Object(ae.jsx)("th",{style:{whiteSpace:"nowrap"},children:"Lemma"},"lemma"),Object(ae.jsx)("th",{style:{whiteSpace:"nowrap"},children:"Part"},"part"),Object(ae.jsx)("th",{style:{whiteSpace:"nowrap"},children:"Ch"},"chapter"),Object(ae.jsx)("th",{style:{whiteSpace:"nowrap"},children:"Gloss"},"gloss")]})}),Object(ae.jsx)("tbody",{children:this.state.vocab.map((function(e){return Object(ae.jsxs)("tr",{children:[Object(ae.jsx)("td",{style:{whiteSpace:"nowrap"},children:e.Lemma},"lemma"),Object(ae.jsx)("td",{style:{whiteSpace:"nowrap"},children:e.Part},"part"),Object(ae.jsx)("td",{style:{whiteSpace:"nowrap"},children:e.Chapter},"chapter"),Object(ae.jsx)("td",{style:{whiteSpace:"nowrap"},children:e.Gloss},"gloss")]},"tr-"+e[0]+e[1])}))})]})})})]})]})]})}}]),a}(s.a.Component);ne.fields=[X,U,P,M,z,H,E,_,T,q,B,J,"Adverb/particle Type",W,K,Q],ne.flashcardFields=[X,U,P,M,T,q,z,H,E,_,K];var re=ne,se=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,67)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,s=t.getLCP,c=t.getTTFB;a(e),n(e),r(e),s(e),c(e)}))};i.a.render(Object(ae.jsx)(s.a.StrictMode,{children:Object(ae.jsx)(re,{})}),document.getElementById("root")),se()}},[[65,1,2]]]);
//# sourceMappingURL=main.4cc512d8.chunk.js.map