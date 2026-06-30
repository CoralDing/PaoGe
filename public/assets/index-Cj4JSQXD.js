var pe=Object.defineProperty;var ue=(a,e,t)=>e in a?pe(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var R=(a,e,t)=>ue(a,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const H=globalThis,G=H.ShadowRoot&&(H.ShadyCSS===void 0||H.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,V=Symbol(),K=new WeakMap;let ne=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==V)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(G&&e===void 0){const r=t!==void 0&&t.length===1;r&&(e=K.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&K.set(t,e))}return e}toString(){return this.cssText}};const ge=a=>new ne(typeof a=="string"?a:a+"",void 0,V),fe=(a,...e)=>{const t=a.length===1?a[0]:e.reduce((r,i,s)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+a[s+1],a[0]);return new ne(t,a,V)},me=(a,e)=>{if(G)a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const r=document.createElement("style"),i=H.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=t.cssText,a.appendChild(r)}},Y=G?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return ge(t)})(a):a;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:be,defineProperty:ve,getOwnPropertyDescriptor:$e,getOwnPropertyNames:xe,getOwnPropertySymbols:ye,getPrototypeOf:_e}=Object,b=globalThis,Z=b.trustedTypes,we=Z?Z.emptyScript:"",I=b.reactiveElementPolyfillSupport,S=(a,e)=>a,W={toAttribute(a,e){switch(e){case Boolean:a=a?we:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},oe=(a,e)=>!be(a,e),J={attribute:!0,type:String,converter:W,reflect:!1,useDefault:!1,hasChanged:oe};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),b.litPropertyMetadata??(b.litPropertyMetadata=new WeakMap);let _=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=J){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const r=Symbol(),i=this.getPropertyDescriptor(e,r,t);i!==void 0&&ve(this.prototype,e,i)}}static getPropertyDescriptor(e,t,r){const{get:i,set:s}=$e(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:i,set(n){const c=i==null?void 0:i.call(this);s==null||s.call(this,n),this.requestUpdate(e,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??J}static _$Ei(){if(this.hasOwnProperty(S("elementProperties")))return;const e=_e(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(S("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(S("properties"))){const t=this.properties,r=[...xe(t),...ye(t)];for(const i of r)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[r,i]of t)this.elementProperties.set(r,i)}this._$Eh=new Map;for(const[t,r]of this.elementProperties){const i=this._$Eu(t,r);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const i of r)t.unshift(Y(i))}else e!==void 0&&t.push(Y(e));return t}static _$Eu(e,t){const r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return me(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var r;return(r=t.hostConnected)==null?void 0:r.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var r;return(r=t.hostDisconnected)==null?void 0:r.call(t)})}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){var s;const r=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,r);if(i!==void 0&&r.reflect===!0){const n=(((s=r.converter)==null?void 0:s.toAttribute)!==void 0?r.converter:W).toAttribute(t,r.type);this._$Em=e,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(e,t){var s,n;const r=this.constructor,i=r._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const c=r.getPropertyOptions(i),o=typeof c.converter=="function"?{fromAttribute:c.converter}:((s=c.converter)==null?void 0:s.fromAttribute)!==void 0?c.converter:W;this._$Em=i;const l=o.fromAttribute(t,c.type);this[i]=l??((n=this._$Ej)==null?void 0:n.get(i))??l,this._$Em=null}}requestUpdate(e,t,r,i=!1,s){var n;if(e!==void 0){const c=this.constructor;if(i===!1&&(s=this[e]),r??(r=c.getPropertyOptions(e)),!((r.hasChanged??oe)(s,t)||r.useDefault&&r.reflect&&s===((n=this._$Ej)==null?void 0:n.get(e))&&!this.hasAttribute(c._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:i,wrapped:s},n){r&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),s!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[s,n]of i){const{wrapped:c}=n,o=this[s];c!==!0||this._$AL.has(s)||o===void 0||this.C(s,void 0,n,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(r=this._$EO)==null||r.forEach(i=>{var s;return(s=i.hostUpdate)==null?void 0:s.call(i)}),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(r=>{var i;return(i=r.hostUpdated)==null?void 0:i.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[S("elementProperties")]=new Map,_[S("finalized")]=new Map,I==null||I({ReactiveElement:_}),(b.reactiveElementVersions??(b.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const E=globalThis,Q=a=>a,M=E.trustedTypes,X=M?M.createPolicy("lit-html",{createHTML:a=>a}):void 0,ce="$lit$",m=`lit$${Math.random().toFixed(9).slice(2)}$`,de="?"+m,Ae=`<${de}>`,y=document,P=()=>y.createComment(""),O=a=>a===null||typeof a!="object"&&typeof a!="function",F=Array.isArray,ke=a=>F(a)||typeof(a==null?void 0:a[Symbol.iterator])=="function",j=`[ 	
\f\r]`,k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ee=/-->/g,te=/>/g,v=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),re=/'/g,ie=/"/g,le=/^(?:script|style|textarea|title)$/i,Se=a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),u=Se(1),w=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),se=new WeakMap,$=y.createTreeWalker(y,129);function he(a,e){if(!F(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return X!==void 0?X.createHTML(e):e}const Ee=(a,e)=>{const t=a.length-1,r=[];let i,s=e===2?"<svg>":e===3?"<math>":"",n=k;for(let c=0;c<t;c++){const o=a[c];let l,p,d=-1,g=0;for(;g<o.length&&(n.lastIndex=g,p=n.exec(o),p!==null);)g=n.lastIndex,n===k?p[1]==="!--"?n=ee:p[1]!==void 0?n=te:p[2]!==void 0?(le.test(p[2])&&(i=RegExp("</"+p[2],"g")),n=v):p[3]!==void 0&&(n=v):n===v?p[0]===">"?(n=i??k,d=-1):p[1]===void 0?d=-2:(d=n.lastIndex-p[2].length,l=p[1],n=p[3]===void 0?v:p[3]==='"'?ie:re):n===ie||n===re?n=v:n===ee||n===te?n=k:(n=v,i=void 0);const f=n===v&&a[c+1].startsWith("/>")?" ":"";s+=n===k?o+Ae:d>=0?(r.push(l),o.slice(0,d)+ce+o.slice(d)+m+f):o+m+(d===-2?c:f)}return[he(a,s+(a[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]};class U{constructor({strings:e,_$litType$:t},r){let i;this.parts=[];let s=0,n=0;const c=e.length-1,o=this.parts,[l,p]=Ee(e,t);if(this.el=U.createElement(l,r),$.currentNode=this.el.content,t===2||t===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=$.nextNode())!==null&&o.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(const d of i.getAttributeNames())if(d.endsWith(ce)){const g=p[n++],f=i.getAttribute(d).split(m),T=/([.?@])?(.*)/.exec(g);o.push({type:1,index:s,name:T[2],strings:f,ctor:T[1]==="."?Pe:T[1]==="?"?Oe:T[1]==="@"?Ue:z}),i.removeAttribute(d)}else d.startsWith(m)&&(o.push({type:6,index:s}),i.removeAttribute(d));if(le.test(i.tagName)){const d=i.textContent.split(m),g=d.length-1;if(g>0){i.textContent=M?M.emptyScript:"";for(let f=0;f<g;f++)i.append(d[f],P()),$.nextNode(),o.push({type:2,index:++s});i.append(d[g],P())}}}else if(i.nodeType===8)if(i.data===de)o.push({type:2,index:s});else{let d=-1;for(;(d=i.data.indexOf(m,d+1))!==-1;)o.push({type:7,index:s}),d+=m.length-1}s++}}static createElement(e,t){const r=y.createElement("template");return r.innerHTML=e,r}}function A(a,e,t=a,r){var n,c;if(e===w)return e;let i=r!==void 0?(n=t._$Co)==null?void 0:n[r]:t._$Cl;const s=O(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==s&&((c=i==null?void 0:i._$AO)==null||c.call(i,!1),s===void 0?i=void 0:(i=new s(a),i._$AT(a,t,r)),r!==void 0?(t._$Co??(t._$Co=[]))[r]=i:t._$Cl=i),i!==void 0&&(e=A(a,i._$AS(a,e.values),i,r)),e}class Ce{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:r}=this._$AD,i=((e==null?void 0:e.creationScope)??y).importNode(t,!0);$.currentNode=i;let s=$.nextNode(),n=0,c=0,o=r[0];for(;o!==void 0;){if(n===o.index){let l;o.type===2?l=new N(s,s.nextSibling,this,e):o.type===1?l=new o.ctor(s,o.name,o.strings,this,e):o.type===6&&(l=new Ne(s,this,e)),this._$AV.push(l),o=r[++c]}n!==(o==null?void 0:o.index)&&(s=$.nextNode(),n++)}return $.currentNode=y,i}p(e){let t=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class N{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,r,i){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=A(this,e,t),O(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==w&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ke(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==h&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(y.createTextNode(e)),this._$AH=e}$(e){var s;const{values:t,_$litType$:r}=e,i=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=U.createElement(he(r.h,r.h[0]),this.options)),r);if(((s=this._$AH)==null?void 0:s._$AD)===i)this._$AH.p(t);else{const n=new Ce(i,this),c=n.u(this.options);n.p(t),this.T(c),this._$AH=n}}_$AC(e){let t=se.get(e.strings);return t===void 0&&se.set(e.strings,t=new U(e)),t}k(e){F(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,i=0;for(const s of e)i===t.length?t.push(r=new N(this.O(P()),this.O(P()),this,this.options)):r=t[i],r._$AI(s),i++;i<t.length&&(this._$AR(r&&r._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,t);e!==this._$AB;){const i=Q(e).nextSibling;Q(e).remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class z{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,i,s){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=h}_$AI(e,t=this,r,i){const s=this.strings;let n=!1;if(s===void 0)e=A(this,e,t,0),n=!O(e)||e!==this._$AH&&e!==w,n&&(this._$AH=e);else{const c=e;let o,l;for(e=s[0],o=0;o<s.length-1;o++)l=A(this,c[r+o],t,o),l===w&&(l=this._$AH[o]),n||(n=!O(l)||l!==this._$AH[o]),l===h?e=h:e!==h&&(e+=(l??"")+s[o+1]),this._$AH[o]=l}n&&!i&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Pe extends z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}}class Oe extends z{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}}class Ue extends z{constructor(e,t,r,i,s){super(e,t,r,i,s),this.type=5}_$AI(e,t=this){if((e=A(this,e,t,0)??h)===w)return;const r=this._$AH,i=e===h&&r!==h||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,s=e!==h&&(r===h||i);i&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Ne{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){A(this,e)}}const L=E.litHtmlPolyfillSupport;L==null||L(U,N),(E.litHtmlVersions??(E.litHtmlVersions=[])).push("3.3.3");const Te=(a,e,t)=>{const r=(t==null?void 0:t.renderBefore)??e;let i=r._$litPart$;if(i===void 0){const s=(t==null?void 0:t.renderBefore)??null;r._$litPart$=i=new N(e.insertBefore(P(),s),s,void 0,t??{})}return i._$AI(a),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const x=globalThis;class C extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Te(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return w}}var ae;C._$litElement$=!0,C.finalized=!0,(ae=x.litElementHydrateSupport)==null||ae.call(x,{LitElement:C});const D=x.litElementPolyfillSupport;D==null||D({LitElement:C});(x.litElementVersions??(x.litElementVersions=[])).push("4.2.2");const He=[{id:"featured",name:"精选",icon:"✨",is_active:1},{id:"ai",name:"AI",icon:"🤖",is_active:1},{id:"dev",name:"开发",icon:"⌨️",is_active:1},{id:"design",name:"设计",icon:"🎨",is_active:1},{id:"tools",name:"效率",icon:"⚡",is_active:1},{id:"media",name:"内容",icon:"🎬",is_active:1}],Me=[{id:1,name:"OpenAI",url:"https://openai.com",description:"AI 产品与研究入口",icon:"AI",category:"ai",is_featured:1,status:"active"},{id:2,name:"ChatGPT",url:"https://chatgpt.com",description:"智能对话与创作助手",icon:"💬",category:"ai",is_featured:1,status:"active"},{id:3,name:"GitHub",url:"https://github.com",description:"代码托管与开源协作平台",icon:"⌘",category:"dev",is_featured:1,status:"active"},{id:4,name:"MDN",url:"https://developer.mozilla.org",description:"Web 标准与前端技术文档",icon:"📚",category:"dev",status:"active"},{id:5,name:"Figma",url:"https://figma.com",description:"协作式界面设计工具",icon:"F",category:"design",status:"active"},{id:6,name:"Notion",url:"https://notion.so",description:"文档、知识库与项目管理工具",icon:"N",category:"tools",status:"active"}],B=[{id:"bing",name:"Bing",url:"https://www.bing.com/search?q="},{id:"google",name:"Google",url:"https://www.google.com/search?q="},{id:"baidu",name:"百度",url:"https://www.baidu.com/s?wd="},{id:"duck",name:"DuckDuckGo",url:"https://duckduckgo.com/?q="}];class q extends C{constructor(){super(),this.categories=[...He],this.sites=[...Me],this.activeCategory="all",this.keyword="",this.activeEngine=localStorage.getItem("paoge-engine")||"bing",this.theme=localStorage.getItem("paoge-theme")||"dark",this.weather=null,this.loading=!0,this.setAttribute("data-theme",this.theme)}connectedCallback(){super.connectedCallback(),this.loadCmsData(),this.loadWeather()}updated(e){e.has("theme")&&this.setAttribute("data-theme",this.theme)}activeSites(){return this.sites.filter(e=>e.status!=="inactive")}visibleSites(){const e=this.keyword.trim().toLowerCase();return this.activeSites().filter(t=>{const r=this.categories.find(n=>n.id===t.category),i=this.activeCategory==="all"||t.category===this.activeCategory,s=!e||[t.name,t.description,t.url,r==null?void 0:r.name].filter(Boolean).some(n=>String(n).toLowerCase().includes(e));return i&&s})}featuredSites(){const e=this.activeSites().filter(t=>Number(t.is_featured)===1||t.category==="featured");return(e.length?e:this.activeSites()).slice(0,4)}visibleCategories(){return this.categories.filter(e=>e.is_active!==0)}countByCategory(e){return this.activeSites().filter(t=>e==="all"||t.category===e).length}groupedSites(){const e=this.visibleSites();return this.activeCategory!=="all"?[{category:this.visibleCategories().find(r=>r.id===this.activeCategory)||{id:this.activeCategory,name:"当前分类",icon:"📁"},sites:e}]:this.visibleCategories().map(t=>({category:t,sites:e.filter(r=>r.category===t.id)})).filter(t=>t.sites.length)}renderIcon(e){var r;const t=e.icon||e.ico||((r=e.name)==null?void 0:r[0])||"↗";return/^https?:\/\//.test(t)||t.startsWith("/")?u`<img src=${t} alt=${e.name} loading="lazy" @error=${i=>{var s;i.currentTarget.replaceWith(document.createTextNode(((s=e.name)==null?void 0:s[0])||"↗"))}}>`:t}setCategory(e){this.activeCategory=e}setEngine(e){this.activeEngine=e,localStorage.setItem("paoge-engine",e)}updateKeyword(e){this.keyword=e.target.value}toggleTheme(){this.theme=this.theme==="dark"?"light":"dark",localStorage.setItem("paoge-theme",this.theme)}submitSearch(e){e.preventDefault();const t=this.keyword.trim();if(!t)return;if(/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}/i.test(t)){window.open(t.startsWith("http")?t:`https://${t}`,"_blank","noopener");return}const i=B.find(s=>s.id===this.activeEngine)||B[0];window.open(i.url+encodeURIComponent(t),"_blank","noopener")}trackClick(e){e&&fetch(`/api/sites/${e}/click`,{method:"POST"}).catch(()=>{})}async loadCmsData(){try{const[e,t,r]=await Promise.all([fetch("/api/sites").catch(()=>null),fetch("/api/categories").catch(()=>null),fetch("/api/settings").catch(()=>null)]);if(e!=null&&e.ok){const i=await e.json();Array.isArray(i)&&i.length&&(this.sites=i)}if(t!=null&&t.ok){const i=await t.json();Array.isArray(i)&&i.length&&(this.categories=i)}if(r!=null&&r.ok){const i=await r.json();if(i.site_icon){const s=document.querySelector('link[rel="icon"]');s&&(s.href=i.site_icon)}}}finally{this.loading=!1}}async loadWeather(){try{const e=await fetch("/api/weather").catch(()=>null);if(!(e!=null&&e.ok))return;const t=await e.json();if(!t.enabled||!t.now)return;this.weather=t}catch{this.weather=null}}renderEngines(){return u`
      <div class="engine-row" aria-label="搜索引擎">
        ${B.map(e=>u`
          <button class="engine-button ${e.id===this.activeEngine?"active":""}" type="button" @click=${()=>this.setEngine(e.id)}>${e.name}</button>
        `)}
      </div>
    `}renderWeatherCard(){var r;if(!((r=this.weather)!=null&&r.now))return u`<div class="status-card weather-card"><strong>--</strong><span>天气未启用</span></div>`;const e=this.weather.now,t=this.weather.city||this.weather.region||this.weather.country||"当前位置";return u`<div class="status-card weather-card"><strong>${e.text||"天气"} · ${e.temp||"--"}℃</strong><span>${t} · IP 自动定位</span></div>`}renderCategoryBar(){const e=[{id:"all",name:"全部",icon:"🌐"},...this.visibleCategories()];return u`
      <div class="category-bar">
        ${e.map(t=>u`
          <button class="category-button ${t.id===this.activeCategory?"active":""}" type="button" @click=${()=>this.setCategory(t.id)}>
            <span>${t.icon||"📁"}</span>
            <span>${t.name}</span>
            <span class="category-count">${this.countByCategory(t.id)}</span>
          </button>
        `)}
      </div>
    `}renderFeatured(){return u`
      <section class="featured-section">
        <div class="section-head">
          <div>
            <h2>精选入口</h2>
            <p>个人导航站最常用的一组快捷访问。</p>
          </div>
        </div>
        <div class="featured-grid">
          ${this.featuredSites().map(e=>u`
            <a class="featured-card" href=${e.url} target="_blank" rel=${`noopener${e.nofollow?" nofollow":""}`} @click=${()=>this.trackClick(e.id)}>
              <div class="featured-icon">${this.renderIcon(e)}</div>
              <h3>${e.name}</h3>
              <p>${e.description||e.desc||"值得收藏的网络入口"}</p>
            </a>
          `)}
        </div>
      </section>
    `}renderSiteCard(e){var r;const t=((r=this.categories.find(i=>i.id===e.category))==null?void 0:r.name)||"未分类";return u`
      <a class="site-card" href=${e.url} target="_blank" rel=${`noopener${e.nofollow?" nofollow":""}`} @click=${()=>this.trackClick(e.id)}>
        <div class="site-icon">${this.renderIcon(e)}</div>
        <div>
          <h3>${e.name}</h3>
          <p>${e.description||e.desc||"值得收藏的网络入口"}</p>
          <div class="site-meta">${t} · 打开资源</div>
        </div>
      </a>
    `}renderGroups(){return this.loading?u`<div class="empty-state">正在加载资源...</div>`:this.visibleSites().length?u`
      ${this.groupedSites().map(t=>u`
        <section class="group-card">
          <div class="group-head">
            <div class="group-title">
              <span>${t.category.icon||"📁"}</span>
              <h2>${t.category.name}</h2>
            </div>
            <div class="group-count">${t.sites.length} 个资源</div>
          </div>
          <div class="site-grid">${t.sites.map(r=>this.renderSiteCard(r))}</div>
        </section>
      `)}
    `:u`<div class="empty-state">没有找到匹配资源。可以换个关键词，或到后台补充站点。</div>`}render(){const e=this.activeSites().length,t=this.visibleSites().length;return u`
      <div class="page">
        <div class="shell">
          <header class="topbar">
            <a class="brand" href="/" aria-label="PaoGe 首页">
              <div class="brand-mark">PG</div>
              <div>
                <div class="brand-name">PaoGe</div>
                <div class="brand-desc">personal navigation</div>
              </div>
            </a>
            <div class="nav-actions">
              <a href="about.html">关于</a>
              <a href="links.html">友链</a>
              <a href="contribute.html">提交</a>
              <button type="button" @click=${this.toggleTheme}>主题</button>
              <a href="/admin">后台</a>
            </div>
          </header>

          <section class="hero">
            <div class="eyebrow">PAOGE NAVIGATION</div>
            <h1>更清爽的<br><span>个人导航</span></h1>
            <p>把常用网站、AI 工具、开发资源和效率入口放在一个高级、直观、可维护的页面里。</p>
          </section>

          <section class="search-card">
            <form class="search-form" @submit=${this.submitSearch}>
              <div class="search-wrap">
                <input type="search" .value=${this.keyword} placeholder="搜索站内资源，或输入网址 / 关键词" autocomplete="off" @input=${this.updateKeyword}>
              </div>
              <button class="search-button" type="submit">搜索</button>
            </form>
            ${this.renderEngines()}
          </section>

          <section class="status-row" aria-label="站点概览">
            <div class="status-card"><strong>${e}</strong><span>收录资源</span></div>
            <div class="status-card"><strong>${this.visibleCategories().length}</strong><span>资源分类</span></div>
            <div class="status-card"><strong>${t}</strong><span>当前显示</span></div>
            ${this.renderWeatherCard()}
          </section>

          ${this.renderCategoryBar()}
          ${this.activeCategory==="all"&&!this.keyword?this.renderFeatured():h}

          <section class="resource-section">
            <div class="section-head">
              <div>
                <h2>资源列表</h2>
                <p>按分类整理，一眼找到并打开。</p>
              </div>
            </div>
            ${this.renderGroups()}
          </section>
        </div>
      </div>
    `}}R(q,"properties",{categories:{state:!0},sites:{state:!0},activeCategory:{state:!0},keyword:{state:!0},activeEngine:{state:!0},theme:{state:!0},weather:{state:!0},loading:{state:!0}}),R(q,"styles",fe`
    :host {
      --font: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
      display: block;
      min-height: 100vh;
      font-family: var(--font);
    }

    :host([data-theme="dark"]) {
      --bg: #07080d;
      --bg-soft: #0d1018;
      --panel: rgba(15, 18, 27, .78);
      --panel-solid: #111522;
      --card: rgba(255, 255, 255, .065);
      --card-strong: rgba(255, 255, 255, .105);
      --line: rgba(255, 255, 255, .105);
      --line-strong: rgba(255, 255, 255, .18);
      --text: #f8fafc;
      --muted: rgba(248, 250, 252, .68);
      --weak: rgba(248, 250, 252, .42);
      --brand: #6effc9;
      --brand-2: #8e7dff;
      --accent: #ffd27d;
      --shadow: 0 26px 90px rgba(0, 0, 0, .36);
    }

    :host([data-theme="light"]) {
      --bg: #f4f6fb;
      --bg-soft: #edf2f7;
      --panel: rgba(255, 255, 255, .82);
      --panel-solid: #ffffff;
      --card: rgba(255, 255, 255, .72);
      --card-strong: #ffffff;
      --line: rgba(15, 23, 42, .1);
      --line-strong: rgba(15, 23, 42, .16);
      --text: #111827;
      --muted: rgba(17, 24, 39, .68);
      --weak: rgba(17, 24, 39, .42);
      --brand: #00a878;
      --brand-2: #5b5ff6;
      --accent: #b7791f;
      --shadow: 0 24px 70px rgba(15, 23, 42, .11);
    }

    * { box-sizing: border-box; }
    a { color: inherit; text-decoration: none; }
    button, input { font: inherit; }

    .page {
      position: relative;
      min-height: 100vh;
      color: var(--text);
      background:
        radial-gradient(circle at 16% 0%, color-mix(in srgb, var(--brand), transparent 78%), transparent 30rem),
        radial-gradient(circle at 86% 4%, color-mix(in srgb, var(--brand-2), transparent 82%), transparent 34rem),
        linear-gradient(180deg, var(--bg), var(--bg-soft));
      overflow: hidden;
    }

    .page::before {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      opacity: .13;
      background-image:
        linear-gradient(var(--line) 1px, transparent 1px),
        linear-gradient(90deg, var(--line) 1px, transparent 1px);
      background-size: 64px 64px;
      mask-image: linear-gradient(to bottom, #000, transparent 76%);
    }

    .shell {
      position: relative;
      z-index: 1;
      width: min(1180px, calc(100% - 32px));
      margin: 0 auto;
      padding: 22px 0 34px;
    }

    .topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 34px;
    }

    .brand {
      display: inline-flex;
      align-items: center;
      gap: 12px;
    }

    .brand-mark {
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      border-radius: 15px;
      color: #06110d;
      font-weight: 950;
      letter-spacing: -.04em;
      background: linear-gradient(135deg, var(--brand), #e8fff5 68%, var(--accent));
      box-shadow: 0 14px 36px color-mix(in srgb, var(--brand), transparent 74%);
    }

    .brand-name { font-size: 1.08rem; font-weight: 900; letter-spacing: -.04em; }
    .brand-desc { margin-top: 1px; color: var(--weak); font-size: .76rem; }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .nav-actions a,
    .nav-actions button {
      display: inline-grid;
      place-items: center;
      min-height: 38px;
      padding: 0 13px;
      border: 1px solid var(--line);
      border-radius: 999px;
      color: var(--muted);
      background: var(--card);
      cursor: pointer;
      transition: .18s ease;
    }

    .nav-actions a:hover,
    .nav-actions button:hover {
      color: var(--text);
      border-color: var(--line-strong);
      background: var(--card-strong);
    }

    .hero {
      display: grid;
      gap: 22px;
      max-width: 900px;
      margin: 0 auto 26px;
      text-align: center;
    }

    .eyebrow {
      justify-self: center;
      padding: 7px 12px;
      border: 1px solid color-mix(in srgb, var(--brand), transparent 68%);
      border-radius: 999px;
      color: color-mix(in srgb, var(--brand), var(--text) 24%);
      background: color-mix(in srgb, var(--brand), transparent 91%);
      font-size: .72rem;
      font-weight: 900;
      letter-spacing: .16em;
    }

    .hero h1 {
      margin: 0;
      font-size: clamp(2.8rem, 7vw, 6.2rem);
      line-height: .92;
      letter-spacing: -.09em;
    }

    .hero h1 span {
      color: transparent;
      background: linear-gradient(135deg, var(--brand), var(--brand-2));
      -webkit-background-clip: text;
      background-clip: text;
    }

    .hero p {
      max-width: 640px;
      margin: 0 auto;
      color: var(--muted);
      font-size: 1.02rem;
      line-height: 1.8;
    }

    .search-card {
      max-width: 880px;
      margin: 0 auto 18px;
      padding: 12px;
      border: 1px solid var(--line);
      border-radius: 28px;
      background: var(--panel);
      box-shadow: var(--shadow);
      backdrop-filter: blur(24px);
    }

    .search-form {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 10px;
      margin: 0;
    }

    .search-wrap { position: relative; }
    .search-wrap::before {
      content: "⌘";
      position: absolute;
      left: 18px;
      top: 50%;
      color: var(--weak);
      transform: translateY(-50%);
    }

    input[type="search"] {
      width: 100%;
      min-height: 62px;
      margin: 0;
      padding: 0 18px 0 48px;
      border: 1px solid var(--line);
      border-radius: 20px;
      outline: 0;
      color: var(--text);
      background: color-mix(in srgb, var(--panel-solid), transparent 8%);
      box-shadow: none;
      transition: .18s ease;
    }

    input[type="search"]:focus {
      border-color: color-mix(in srgb, var(--brand), transparent 45%);
      box-shadow: 0 0 0 4px color-mix(in srgb, var(--brand), transparent 88%);
    }

    .search-button {
      min-width: 118px;
      min-height: 62px;
      border: 0;
      border-radius: 20px;
      color: #06110d;
      font-weight: 950;
      background: linear-gradient(135deg, var(--brand), #e8fff5 68%, var(--accent));
      cursor: pointer;
      box-shadow: 0 14px 34px color-mix(in srgb, var(--brand), transparent 78%);
    }

    .engine-row {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
      margin-top: 12px;
    }

    .engine-button {
      padding: 7px 11px;
      border: 1px solid transparent;
      border-radius: 999px;
      color: var(--weak);
      background: transparent;
      cursor: pointer;
    }

    .engine-button.active {
      color: var(--text);
      border-color: var(--line);
      background: var(--card);
    }

    .status-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin: 18px 0 22px;
    }

    .status-card {
      min-height: 82px;
      padding: 15px;
      border: 1px solid var(--line);
      border-radius: 24px;
      background: var(--panel);
      box-shadow: 0 16px 44px rgba(0, 0, 0, .12);
      backdrop-filter: blur(18px);
    }

    .status-card strong {
      display: block;
      font-size: 1.35rem;
      letter-spacing: -.04em;
    }

    .status-card span {
      color: var(--weak);
      font-size: .78rem;
    }

    .weather-card {
      grid-column: span 2;
    }

    .category-bar {
      position: sticky;
      top: 12px;
      z-index: 20;
      display: flex;
      gap: 9px;
      overflow-x: auto;
      margin: 0 0 16px;
      padding: 10px;
      border: 1px solid var(--line);
      border-radius: 24px;
      background: color-mix(in srgb, var(--panel-solid), transparent 12%);
      box-shadow: var(--shadow);
      backdrop-filter: blur(22px);
      scrollbar-width: none;
    }

    .category-bar::-webkit-scrollbar { display: none; }

    .category-button {
      flex: 0 0 auto;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-height: 42px;
      padding: 0 14px;
      border: 1px solid var(--line);
      border-radius: 999px;
      color: var(--muted);
      background: var(--card);
      cursor: pointer;
      transition: .18s ease;
    }

    .category-button:hover {
      color: var(--text);
      border-color: var(--line-strong);
      background: var(--card-strong);
    }

    .category-button.active {
      color: #06110d;
      border-color: transparent;
      font-weight: 900;
      background: linear-gradient(135deg, var(--brand), #e8fff5);
    }

    .category-count {
      padding: 2px 7px;
      border-radius: 999px;
      background: color-mix(in srgb, currentColor, transparent 88%);
      font-size: .74rem;
    }

    .featured-section,
    .resource-section {
      margin-top: 16px;
    }

    .section-head {
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: 14px;
      margin: 0 0 12px;
    }

    .section-head h2 {
      margin: 0;
      font-size: 1.35rem;
      letter-spacing: -.05em;
    }

    .section-head p {
      margin: 5px 0 0;
      color: var(--weak);
      font-size: .9rem;
    }

    .featured-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 12px;
    }

    .featured-card {
      position: relative;
      min-height: 142px;
      padding: 16px;
      border: 1px solid var(--line);
      border-radius: 26px;
      background:
        radial-gradient(circle at top right, color-mix(in srgb, var(--brand), transparent 76%), transparent 42%),
        var(--panel);
      box-shadow: var(--shadow);
      overflow: hidden;
      transition: .18s ease;
    }

    .featured-card:hover {
      transform: translateY(-3px);
      border-color: color-mix(in srgb, var(--brand), transparent 48%);
    }

    .featured-icon {
      width: 44px;
      height: 44px;
      display: grid;
      place-items: center;
      margin-bottom: 18px;
      border-radius: 16px;
      color: #06110d;
      font-weight: 950;
      background: linear-gradient(135deg, var(--brand), var(--brand-2));
      overflow: hidden;
    }

    .featured-card h3,
    .site-card h3 {
      margin: 0 0 6px;
      letter-spacing: -.03em;
    }

    .featured-card p,
    .site-card p {
      display: -webkit-box;
      margin: 0;
      overflow: hidden;
      color: var(--muted);
      font-size: .88rem;
      line-height: 1.55;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .group-card {
      margin-bottom: 14px;
      padding: 16px;
      border: 1px solid var(--line);
      border-radius: 28px;
      background: var(--panel);
      box-shadow: 0 18px 54px rgba(0, 0, 0, .14);
      backdrop-filter: blur(18px);
    }

    .group-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 13px;
    }

    .group-title {
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }

    .group-title h2 {
      margin: 0;
      font-size: 1.18rem;
      letter-spacing: -.04em;
    }

    .group-count {
      color: var(--weak);
      font-size: .84rem;
    }

    .site-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 10px;
    }

    .site-card {
      display: grid;
      grid-template-columns: 40px 1fr;
      gap: 11px;
      min-height: 104px;
      padding: 13px;
      border: 1px solid var(--line);
      border-radius: 18px;
      background: color-mix(in srgb, var(--panel-solid), transparent 24%);
      transition: .18s ease;
    }

    .site-card:hover {
      transform: translateY(-2px);
      border-color: color-mix(in srgb, var(--brand), transparent 55%);
      background: var(--card-strong);
    }

    .site-icon {
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      border-radius: 14px;
      color: #06110d;
      font-weight: 950;
      background: linear-gradient(135deg, var(--brand), var(--brand-2));
      overflow: hidden;
      box-shadow: inset 0 0 0 1px rgba(255,255,255,.24);
    }

    .site-icon img,
    .featured-icon img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .site-meta {
      margin-top: 8px;
      color: var(--weak);
      font-size: .74rem;
    }

    .empty-state {
      padding: 56px 20px;
      border: 1px dashed var(--line-strong);
      border-radius: 24px;
      color: var(--muted);
      text-align: center;
      background: var(--card);
    }

    @media (max-width: 860px) {
      .shell { width: min(100% - 20px, 1180px); padding-top: 14px; }
      .topbar { align-items: flex-start; flex-direction: column; margin-bottom: 24px; }
      .nav-actions { width: 100%; overflow-x: auto; }
      .hero { text-align: left; }
      .eyebrow { justify-self: start; }
      .search-form { grid-template-columns: 1fr; }
      .search-button { min-height: 52px; }
      .status-row { grid-template-columns: repeat(2, 1fr); }
      .weather-card { grid-column: span 2; }
      .site-grid, .featured-grid { grid-template-columns: 1fr; }
    }
  `);customElements.define("paoge-app",q);
