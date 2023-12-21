var g = Object.defineProperty;
var S = (t, a, e) => a in t ? g(t, a, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[a] = e;
var k = (t, a, e) => (S(t, typeof a != "symbol" ? a + "" : a, e), e);
import { defineComponent as C, useSlots as A, ref as E, computed as f, watch as T, resolveComponent as B, openBlock as r, createElementBlock as i, normalizeClass as L, withModifiers as w, renderSlot as d, createCommentVNode as p, createBlock as D } from "vue";
import { createLktEvent as x } from "lkt-events";
import { assertNever as F } from "lkt-control-tools";
import { httpCall as M } from "lkt-http-client";
var u = /* @__PURE__ */ ((t) => (t.button = "button", t.submit = "submit", t.reset = "reset", t))(u || {});
const N = (t) => {
  switch (t) {
    case u.button:
    case u.reset:
    case u.submit:
      return !0;
    default:
      F(t);
  }
  return !1;
};
class m {
}
k(m, "DEFAULT_STATE", "");
function U(t = 10) {
  let a = "";
  const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = e.length;
  for (let s = 0; s < t; s++)
    a += e.charAt(Math.floor(Math.random() * n));
  return a;
}
const j = ["name", "type", "disabled"], V = {
  key: 0,
  class: "lkt-button__prev",
  "data-role": "prev"
}, $ = {
  key: 1,
  class: "lkt-button__content",
  "data-role": "content"
}, q = {
  key: 3,
  class: "lkt-button__next",
  "data-role": "next"
}, z = { name: "LktButton", inheritAttrs: !1 }, O = /* @__PURE__ */ C({
  ...z,
  props: {
    type: { type: String, default: u.button, validator: N },
    name: { type: String, default: () => U(10) },
    palette: { type: String, default: () => m.DEFAULT_STATE },
    value: { type: String, default: "" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    wrapContent: { type: Boolean, default: !1 },
    resource: { type: String, default: "" },
    resourceData: { type: Object, required: !1, default: () => ({}) }
  },
  emits: ["click", "loading", "loaded"],
  setup(t, { emit: a }) {
    const e = t, n = a, s = A(), o = E(e.loading), h = f(() => {
      let l = [];
      return e.palette && l.push(`lkt-button--${e.palette}`), o.value && l.push("is-loading"), l.join(" ");
    }), b = f(() => !!s.next), v = f(() => !!s.prev), y = (l) => {
      if (e.resource)
        return o.value = !0, n("loading"), M(e.resource, e.resourceData).then((c) => {
          o.value = !1, n("loaded"), n("click", l, c);
        }).catch((c) => {
          o.value = !1, n("loaded"), n("click", l, c);
        });
      n("click", l, x(e.name, e.value));
    };
    return T(() => e.loading, () => o.value = e.loading), (l, c) => {
      const _ = B("lkt-spinner");
      return r(), i("button", {
        class: L(["lkt-button", h.value]),
        name: t.name,
        type: t.type,
        disabled: t.disabled,
        onClick: w(y, ["prevent", "stop"])
      }, [
        v.value ? (r(), i("span", V, [
          d(l.$slots, "prev")
        ])) : p("", !0),
        t.wrapContent ? (r(), i("span", $, [
          d(l.$slots, "default")
        ])) : d(l.$slots, "default", { key: 2 }),
        b.value ? (r(), i("span", q, [
          d(l.$slots, "next")
        ])) : p("", !0),
        o.value ? (r(), D(_, { key: 4 })) : p("", !0)
      ], 10, j);
    };
  }
}), K = {
  install: (t, a) => {
    t.component("lkt-button", O), a && a.defaultState && (m.DEFAULT_STATE = a.defaultState);
  }
};
export {
  K as default
};
