var _ = Object.defineProperty;
var A = (t, o, e) => o in t ? _(t, o, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[o] = e;
var h = (t, o, e) => (A(t, typeof o != "symbol" ? o + "" : o, e), e);
import { defineComponent as D, useSlots as E, ref as M, computed as p, watch as T, resolveComponent as B, openBlock as i, createElementBlock as u, normalizeClass as L, withModifiers as w, renderSlot as f, createCommentVNode as k, createBlock as N } from "vue";
import { createLktEvent as y } from "lkt-events";
import { assertNever as j } from "lkt-control-tools";
import { httpCall as O } from "lkt-http-client";
import { openConfirm as x } from "lkt-modal-confirm";
var c = /* @__PURE__ */ ((t) => (t.button = "button", t.submit = "submit", t.reset = "reset", t))(c || {});
const F = (t) => {
  switch (t) {
    case c.button:
    case c.reset:
    case c.submit:
      return !0;
    default:
      j(t);
  }
  return !1;
};
class b {
}
h(b, "DEFAULT_STATE", "");
function U(t = 10) {
  let o = "";
  const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = e.length;
  for (let s = 0; s < t; s++)
    o += e.charAt(Math.floor(Math.random() * n));
  return o;
}
const q = ["name", "type", "disabled"], J = {
  key: 0,
  class: "lkt-button-prev"
}, K = {
  key: 1,
  class: "lkt-button-content"
}, V = {
  key: 3,
  class: "lkt-button-next"
}, z = { name: "LktButton", inheritAttrs: !1 }, P = /* @__PURE__ */ D({
  ...z,
  props: {
    type: { type: String, default: c.button, validator: F },
    name: { type: String, default: () => U(10) },
    palette: { type: String, default: () => b.DEFAULT_STATE },
    value: { type: String, default: "" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    wrapContent: { type: Boolean, default: !1 },
    resource: { type: String, default: "" },
    resourceData: { type: Object, required: !1, default: () => ({}) },
    confirmModal: { type: String, default: "" },
    confirmModalKey: { type: String, default: "_" },
    confirmData: { type: Object, required: !1, default: () => ({}) }
  },
  emits: ["click", "loading", "loaded"],
  setup(t, { emit: o }) {
    const e = t, n = o, s = E(), r = M(e.loading), g = p(() => {
      let a = [];
      return e.palette && a.push(`lkt-button--${e.palette}`), r.value && a.push("is-loading"), a.join(" ");
    }), v = p(() => !!s.next), C = p(() => !!s.prev), d = async (a) => (r.value = !0, n("loading"), O(e.resource, e.resourceData).then((l) => {
      r.value = !1, n("loaded"), n("click", a, l);
    }).catch((l) => {
      r.value = !1, n("loaded"), n("click", a, l);
    })), S = (a) => {
      if (e.confirmModal) {
        let l = typeof e.confirmData == "object" ? JSON.parse(JSON.stringify(e.confirmData)) : {};
        if (typeof l.onConfirm == "function") {
          let m = l.onConfirm.bind({});
          l.onConfirm = () => {
            if (e.resource)
              return d(a).then(() => {
                m();
              });
            n("click", a, y(e.name, e.value));
          };
        } else
          l.onConfirm = () => {
            if (e.resource)
              return d(a);
            n("click", a, y(e.name, e.value));
          };
        return x(e.confirmModal, e.confirmModalKey, l);
      }
      if (e.resource)
        return d(a);
      n("click", a, y(e.name, e.value));
    };
    return T(() => e.loading, () => r.value = e.loading), (a, l) => {
      const m = B("lkt-spinner");
      return i(), u("button", {
        class: L(["lkt-button", g.value]),
        name: t.name,
        type: t.type,
        disabled: t.disabled,
        onClick: w(S, ["prevent", "stop"])
      }, [
        C.value ? (i(), u("span", J, [
          f(a.$slots, "prev")
        ])) : k("", !0),
        t.wrapContent ? (i(), u("span", K, [
          f(a.$slots, "default")
        ])) : f(a.$slots, "default", { key: 2 }),
        v.value ? (i(), u("span", V, [
          f(a.$slots, "next")
        ])) : k("", !0),
        r.value ? (i(), N(m, { key: 4 })) : k("", !0)
      ], 10, q);
    };
  }
}), X = {
  install: (t, o) => {
    t.component("lkt-button", P), o && o.defaultState && (b.DEFAULT_STATE = o.defaultState);
  }
};
export {
  X as default
};
