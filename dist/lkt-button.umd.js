(function(t,n){typeof exports=="object"&&typeof module<"u"?module.exports=n(require("vue"),require("lkt-events"),require("lkt-control-tools"),require("lkt-http-client")):typeof define=="function"&&define.amd?define(["vue","lkt-events","lkt-control-tools","lkt-http-client"],n):(t=typeof globalThis<"u"?globalThis:t||self,t.LktButton=n(t.Vue,t.LktEvents,t.LktControlTools,t.LktHttpClient))})(this,function(t,n,r,k){"use strict";var q=Object.defineProperty;var w=(t,n,r)=>n in t?q(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r;var f=(t,n,r)=>(w(t,typeof n!="symbol"?n+"":n,r),r);var i=(e=>(e.button="button",e.submit="submit",e.reset="reset",e))(i||{});const m=e=>{switch(e){case i.button:case i.reset:case i.submit:return!0;default:r.assertNever(e)}return!1};class p{}f(p,"DEFAULT_STATE","");function h(e=10){let a="";const o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",s=o.length;for(let d=0;d<e;d++)a+=o.charAt(Math.floor(Math.random()*s));return a}const y=["name","type","disabled"],b={key:0,class:"lkt-button__prev","data-role":"prev"},B={key:1,class:"lkt-button__content","data-role":"content"},S={key:3,class:"lkt-button__next","data-role":"next"},_={name:"LktButton",inheritAttrs:!1},C=t.defineComponent({..._,props:{type:{type:String,default:i.button,validator:m},name:{type:String,default:()=>h(10)},palette:{type:String,default:()=>p.DEFAULT_STATE},value:{type:String,default:""},disabled:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},wrapContent:{type:Boolean,default:!1},resource:{type:String,default:""},resourceData:{type:Object,required:!1,default:()=>({})}},emits:["click","loading","loaded"],setup(e,{emit:a}){const o=e,s=a,d=t.useSlots(),c=t.ref(o.loading),E=t.computed(()=>{let l=[];return o.palette&&l.push(`lkt-button--${o.palette}`),c.value&&l.push("is-loading"),l.join(" ")}),L=t.computed(()=>!!d.next),T=t.computed(()=>!!d.prev),g=l=>{if(o.resource)return c.value=!0,s("loading"),k.httpCall(o.resource,o.resourceData).then(u=>{c.value=!1,s("loaded"),s("click",l,u)}).catch(u=>{c.value=!1,s("loaded"),s("click",l,u)});s("click",l,n.createLktEvent(o.name,o.value))};return t.watch(()=>o.loading,()=>c.value=o.loading),(l,u)=>{const A=t.resolveComponent("lkt-spinner");return t.openBlock(),t.createElementBlock("button",{class:t.normalizeClass(["lkt-button",E.value]),name:e.name,type:e.type,disabled:e.disabled,onClick:t.withModifiers(g,["prevent","stop"])},[T.value?(t.openBlock(),t.createElementBlock("span",b,[t.renderSlot(l.$slots,"prev")])):t.createCommentVNode("",!0),e.wrapContent?(t.openBlock(),t.createElementBlock("span",B,[t.renderSlot(l.$slots,"default")])):t.renderSlot(l.$slots,"default",{key:2}),L.value?(t.openBlock(),t.createElementBlock("span",S,[t.renderSlot(l.$slots,"next")])):t.createCommentVNode("",!0),c.value?(t.openBlock(),t.createBlock(A,{key:4})):t.createCommentVNode("",!0)],10,y)}}});return{install:(e,a)=>{e.component("lkt-button",C),a&&a.defaultState&&(p.DEFAULT_STATE=a.defaultState)}}});
