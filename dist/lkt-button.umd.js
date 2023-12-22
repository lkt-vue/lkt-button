(function(t,l){typeof exports=="object"&&typeof module<"u"?module.exports=l(require("vue"),require("lkt-events"),require("lkt-control-tools"),require("lkt-http-client"),require("lkt-modal-confirm")):typeof define=="function"&&define.amd?define(["vue","lkt-events","lkt-control-tools","lkt-http-client","lkt-modal-confirm"],l):(t=typeof globalThis<"u"?globalThis:t||self,t.LktButton=l(t.Vue,t.LktEvents,t.LktControlTools,t.LktHttpClient,t.LktModalConfirm))})(this,function(t,l,i,y,h){"use strict";var q=Object.defineProperty;var N=(t,l,i)=>l in t?q(t,l,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[l]=i;var k=(t,l,i)=>(N(t,typeof l!="symbol"?l+"":l,i),i);var d=(n=>(n.button="button",n.submit="submit",n.reset="reset",n))(d||{});const C=n=>{switch(n){case d.button:case d.reset:case d.submit:return!0;default:i.assertNever(n)}return!1};class u{}k(u,"DEFAULT_STATE","");function S(n=10){let s="";const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=e.length;for(let f=0;f<n;f++)s+=e.charAt(Math.floor(Math.random()*r));return s}const b=["name","type","disabled"],B={key:0,class:"lkt-button-prev"},L={key:1,class:"lkt-button-content"},g={key:3,class:"lkt-button-next"},E={name:"LktButton",inheritAttrs:!1},T=t.defineComponent({...E,props:{type:{type:String,default:d.button,validator:C},name:{type:String,default:()=>S(10)},palette:{type:String,default:()=>u.DEFAULT_STATE},value:{type:String,default:""},disabled:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},wrapContent:{type:Boolean,default:!1},resource:{type:String,default:""},resourceData:{type:Object,required:!1,default:()=>({})},confirmModal:{type:String,default:""},confirmModalKey:{type:String,default:"_"},confirmData:{type:Object,required:!1,default:()=>({})}},emits:["click","loading","loaded"],setup(n,{emit:s}){const e=n,r=s,f=t.useSlots(),c=t.ref(e.loading),_=t.computed(()=>{let o=[];return e.palette&&o.push(`lkt-button--${e.palette}`),c.value&&o.push("is-loading"),o.join(" ")}),A=t.computed(()=>!!f.next),M=t.computed(()=>!!f.prev),m=async o=>(c.value=!0,r("loading"),y.httpCall(e.resource,e.resourceData).then(a=>{c.value=!1,r("loaded"),r("click",o,a)}).catch(a=>{c.value=!1,r("loaded"),r("click",o,a)})),D=o=>{if(e.confirmModal){let a=typeof e.confirmData=="object"?JSON.parse(JSON.stringify(e.confirmData)):{};if(typeof a.onConfirm=="function"){let p=a.onConfirm.bind({});a.onConfirm=()=>{if(e.resource)return m(o).then(()=>{p()});r("click",o,l.createLktEvent(e.name,e.value))}}else a.onConfirm=()=>{if(e.resource)return m(o);r("click",o,l.createLktEvent(e.name,e.value))};return h.openConfirm(e.confirmModal,e.confirmModalKey,a)}if(e.resource)return m(o);r("click",o,l.createLktEvent(e.name,e.value))};return t.watch(()=>e.loading,()=>c.value=e.loading),(o,a)=>{const p=t.resolveComponent("lkt-spinner");return t.openBlock(),t.createElementBlock("button",{class:t.normalizeClass(["lkt-button",_.value]),name:n.name,type:n.type,disabled:n.disabled,onClick:t.withModifiers(D,["prevent","stop"])},[M.value?(t.openBlock(),t.createElementBlock("span",B,[t.renderSlot(o.$slots,"prev")])):t.createCommentVNode("",!0),n.wrapContent?(t.openBlock(),t.createElementBlock("span",L,[t.renderSlot(o.$slots,"default")])):t.renderSlot(o.$slots,"default",{key:2}),A.value?(t.openBlock(),t.createElementBlock("span",g,[t.renderSlot(o.$slots,"next")])):t.createCommentVNode("",!0),c.value?(t.openBlock(),t.createBlock(p,{key:4})):t.createCommentVNode("",!0)],10,b)}}});return{install:(n,s)=>{n.component("lkt-button",T),s&&s.defaultState&&(u.DEFAULT_STATE=s.defaultState)}}});
