import{_ as G,p as l,v as H,c as e,o as n,t as i,j as a,F as h,B as b,e as v,a as f,n as w,G as R}from"./chunks/framework.Ds6Eueu6.js";const x={class:"github-integration"},D={key:0,class:"loading"},N={key:1,class:"error"},A={key:2},B={class:"repositories"},L={class:"repo-grid"},P=["href"],V={class:"description"},C={class:"repo-stats"},F={key:0,class:"language"},I={class:"stars"},O={class:"forks"},$={key:0,class:"topics"},m="cinoma",z={__name:"GitHubIntegration",setup(y){const u=l([]),o=l([]),d=l(!0),_=l(null);async function k(){try{const c=await(await fetch(`https://api.github.com/users/${m}/repos?sort=updated&per_page=6`)).json();u.value=await Promise.all(c.map(async s=>{let p=s.language;if(!p&&s.languages_url){const j=await(await fetch(s.languages_url)).json();p=Object.keys(j)[0]||null}return{name:s.name,description:s.description,stars:s.stargazers_count,forks:s.forks_count,url:s.html_url,language:p,topics:s.topics}}));const r=await(await fetch(`https://github-contributions-api.jogruber.de/v4/${m}`)).json();o.value=r.contributions,d.value=!1}catch(g){console.error("Error:",g),_.value="Failed to load GitHub data",d.value=!1}}return H(()=>{k()}),(g,c)=>(n(),e("div",x,[d.value?(n(),e("div",D," Loading GitHub data... ")):_.value?(n(),e("div",N,i(_.value),1)):(n(),e("div",A,[a("div",B,[c[0]||(c[0]=a("h2",null,"Latest Repositories",-1)),a("div",L,[(n(!0),e(h,null,b(u.value,t=>{var r;return n(),e("div",{key:t.name,class:"repo-card"},[a("h3",null,[a("a",{href:t.url,target:"_blank"},i(t.name),9,P)]),a("p",V,i(t.description),1),a("div",C,[t.language?(n(),e("span",F,[a("span",{class:w(["lang-dot",(r=t.language)==null?void 0:r.toLowerCase()])},null,2),f(" "+i(t.language),1)])):v("",!0),a("span",I,"⭐ "+i(t.stars),1),a("span",O,"🍴 "+i(t.forks),1)]),t.topics&&t.topics.length?(n(),e("div",$,[(n(!0),e(h,null,b(t.topics,s=>(n(),e("span",{key:s,class:"topic"},i(s),1))),128))])):v("",!0)])}),128))])])]))]))}},E=G(z,[["__scopeId","data-v-b4a77ed6"]]),T=JSON.parse('{"title":"GitHub Activity","description":"","frontmatter":{"title":"GitHub Activity"},"headers":[],"relativePath":"projects/github.md","filePath":"projects/github.md"}'),S={name:"projects/github.md"},q=Object.assign(S,{setup(y){return(u,o)=>(n(),e("div",null,[o[0]||(o[0]=a("h1",{id:"github-activity",tabindex:"-1"},[f("GitHub Activity "),a("a",{class:"header-anchor",href:"#github-activity","aria-label":'Permalink to "GitHub Activity"'},"​")],-1)),R(E)]))}});export{T as __pageData,q as default};
