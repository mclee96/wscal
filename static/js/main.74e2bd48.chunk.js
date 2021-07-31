(this.webpackJsonpwscal=this.webpackJsonpwscal||[]).push([[0],{32:function(e,t,n){},33:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a,s=n(1),c=n.n(s),r=n(21),i=n.n(r),l=(n(32),n(6)),o=n(13),d=n(14),u=n(7),h=n(27),f=n(26),j=(n(33),n.p+"static/media/vocab.56686cfc.tsv"),b=n.p+"static/media/morphs.2386e766.tsv",p=n.p+"static/media/esv.f6ea5fd3.tsv",m=n.p+"static/media/na28.2e06aedb.tsv",O="Case",v="Gender",g="Number",y="Mood",x="Part of Speech",k="Person",w="Tense",R="Voice",F="Chapter",C="Gloss",S="Lemma",L="Reference",A="Result",E="Esv",M="Na28",T=(a={},Object(l.a)(a,v,["fem","mas","neu"]),Object(l.a)(a,O,["nom","gen","dat","acc","voc"]),Object(l.a)(a,x,["adjective","noun","verb"]),Object(l.a)(a,w,["pres","impft","futr","aor"]),Object(l.a)(a,R,["actv","mid","pass"]),Object(l.a)(a,g,["sg","pl"]),a),D=n(34),N=function(){function e(){Object(o.a)(this,e)}return Object(d.a)(e,null,[{key:"loadFull",value:function(){var t={};e.vocab.forEach((function(e){return t[e.Lemma]=e}));var n=[];e.morphs.filter((function(e){return t[e.Lemma]||console.log("no vocab corresponding to morph for "+e.Lemma),t[e.Lemma]})).forEach((function(e){return n.push(Object.assign({},e,t[e.Lemma],Object(l.a)({},F,parseInt(t[e.Lemma].Chapter,10))))})),e.full=n}},{key:"loadData",value:function(t){console.log("loadData"),0===e.vocab.length&&D.parse(j,{delimiter:"\t",download:!0,header:!0,complete:function(n){var a=[];n.data.filter((function(e){return e.Lemma})).forEach((function(e){return a.push(e)})),e.vocab=a,e.vocab.length>0&&e.morphs.length>0&&e.loadFull(),e.vocab.length>0&&e.morphs.length>0&&Object.keys(e.esv).length>0&&Object.keys(e.na28).length>0&&t(e.getRecords({}))}}),0===e.morphs.length&&D.parse(b,{delimiter:"\t",download:!0,header:!0,complete:function(n){var a=[];n.data.filter((function(e){return e.Lemma})).forEach((function(e){return a.push(e)})),e.morphs=a,e.vocab.length>0&&e.morphs.length>0&&e.loadFull(),e.vocab.length>0&&e.morphs.length>0&&Object.keys(e.esv).length>0&&Object.keys(e.na28).length>0&&t(e.getRecords({}))}}),0===Object.keys(e.esv).length&&D.parse(p,{delimiter:"\t",download:!0,header:!0,complete:function(n){n.data.forEach((function(t){return e.esv[t.Reference]=t.Text})),e.vocab.length>0&&e.morphs.length>0&&Object.keys(e.esv).length>0&&Object.keys(e.na28).length>0&&t(e.getRecords({}))}}),0===Object.keys(e.na28).length&&D.parse(m,{delimiter:"\t",download:!0,header:!0,complete:function(n){n.data.forEach((function(t){return e.na28[t.Reference]=t.Text})),e.vocab.length>0&&e.morphs.length>0&&Object.keys(e.esv).length>0&&Object.keys(e.na28).length>0&&t(e.getRecords({}))}})}},{key:"getRecords",value:function(t){return e.full.filter((function(e){return Object.keys(t).every((function(n){return Array.isArray(t[n])?0===t[n].length||t[n].includes(e[n]):e[n]===t[n]}))})).map((function(t){var n,a=t.Reference.split(","),s=a[Math.floor(Math.random()*a.length)];return Object.assign({},t,(n={},Object(l.a)(n,L,s),Object(l.a)(n,E,e.esv[s]),Object(l.a)(n,M,e.na28[s]),n))}))}}]),e}();N.vocab=[],N.morphs=[],N.esv={},N.na28={},N.full=[];var P=N,B=n(8),z=n(15),G=n(23),I=n(12),J=n(20),V=n(10),q=n(24),H=n(17),K=n(25),Q=(n(35),n(22)),U=n(0),W=function(e){Object(h.a)(n,e);var t=Object(f.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).state={records:[],display:[],filters:{},fields:[A,S,v,O,w,R,y,k,g,C,x,F,L,E,M],showOffcanvas:!1,limit:20},console.log("constructor"),a.updateFilters=a.updateFilters.bind(Object(u.a)(a)),a.updateFields=a.updateFields.bind(Object(u.a)(a)),a.updateRecords=a.updateRecords.bind(Object(u.a)(a)),a.setOffcanvas=a.setOffcanvas.bind(Object(u.a)(a)),a.downloadRecords=a.downloadRecords.bind(Object(u.a)(a)),a}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=this;P.loadData((function(t){return e.setState({records:t})}))}},{key:"updateFilters",value:function(e,t){this.setState((function(n,a){var s=n.filters[e]||[],c=s.slice();return s.includes(t)?c.splice(c.indexOf(t),1):c.push(t),{filters:Object.assign({},n.filters,Object(l.a)({},e,c))}}))}},{key:"updateFields",value:function(e){this.setState((function(t,n){var a=(t.fields||[]).slice();return a.includes(e)?a.splice(a.indexOf(e),1):a.push(e),{fields:a}}))}},{key:"updateRecords",value:function(){var e=P.getRecords(this.state.filters),t=Math.floor(Math.random()*e.length-this.state.limit);this.setState({records:e,display:e.slice(t,t+this.state.limit)})}},{key:"downloadRecords",value:function(){var e=this,t=n.fields.filter((function(t){return e.state.fields.includes(t)})).join("\t")+"\n"+this.state.records.map((function(t){return n.fields.filter((function(t){return e.state.fields.includes(t)})).map((function(e){return t[e]})).join("\t")})).join("\n"),a=new Blob([t],{type:"text/plain;charset=utf-8"});Object(Q.saveAs)(a,"hello.txt")}},{key:"setOffcanvas",value:function(e){this.setState({showOffcanvas:e})}},{key:"render",value:function(){var e=this;return Object(U.jsxs)("div",{className:"App",children:[Object(U.jsx)("header",{className:"App-header",children:Object(U.jsx)("p",{children:'"SM Baugh A Greek Primer"'})}),Object(U.jsxs)(J.a,{children:[Object(U.jsx)(G.a,{style:{justifyContent:"space-between"},children:Object.keys(T).map((function(t){return Object(U.jsx)(K.a,{id:t,type:"checkbox",size:"sm",children:T[t].map((function(n){return Object(U.jsx)(H.a,{id:n,value:n,variant:"outline-success",onClick:function(a){return e.updateFilters(t,n,a)},children:n},n)}))},t)}))}),Object(U.jsxs)(V.a,{children:[Object(U.jsx)(I.a,{children:Object(U.jsx)(B.a,{variant:"primary",onClick:function(t){return e.setOffcanvas(!0,t)},className:"me-2",children:"Adjust filters"})}),Object(U.jsx)(I.a,{children:Object(U.jsx)(B.a,{onClick:this.updateRecords,children:"Refresh!"})}),Object(U.jsx)(I.a,{children:Object(U.jsxs)(B.a,{onClick:this.downloadRecords,children:["Download Set (",this.state.records.length," rows)"]})})]}),Object(U.jsx)(V.a,{style:{marginTop:"1rem"},children:Object(U.jsxs)(I.a,{children:[Object(U.jsx)(V.a,{children:Object(U.jsx)(J.a,{})}),Object(U.jsx)(V.a,{children:Object(U.jsx)(z.a,{defaultValue:this.state.fields,size:"sm",children:n.fields.map((function(t){return Object(U.jsx)(B.a,{id:t,value:t,active:e.state.fields.includes(t),variant:"outline-secondary",onClick:function(n){return e.updateFields(t,n)},children:t},t)}))})}),Object(U.jsx)(V.a,{children:Object(U.jsxs)(q.a,{responsive:!0,striped:!0,bordered:!0,hover:!0,size:"sm",children:[Object(U.jsx)("thead",{children:Object(U.jsx)("tr",{children:n.fields.filter((function(t){return e.state.fields.includes(t)})).map((function(e){return Object(U.jsx)("th",{style:{whiteSpace:"nowrap"},children:e},e)}))})}),Object(U.jsx)("tbody",{children:this.state.display.map((function(t){return Object(U.jsx)("tr",{children:n.fields.filter((function(t){return e.state.fields.includes(t)})).map((function(e){return Object(U.jsx)("td",{style:{whiteSpace:"nowrap"},children:t[e]},e)}))},"tr-"+t.Result)}))})]})})]})})]})]})}}]),n}(c.a.Component);W.fields=[A,S,v,O,w,R,y,k,g,C,x,F,"Adverb/particle Type",L,E,M];var X=W,Y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,40)).then((function(t){var n=t.getCLS,a=t.getFID,s=t.getFCP,c=t.getLCP,r=t.getTTFB;n(e),a(e),s(e),c(e),r(e)}))};i.a.render(Object(U.jsx)(c.a.StrictMode,{children:Object(U.jsx)(X,{})}),document.getElementById("root")),Y()}},[[38,1,2]]]);
//# sourceMappingURL=main.74e2bd48.chunk.js.map