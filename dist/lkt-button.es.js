var A = Object.defineProperty;
var D = (e, a, l) => a in e ? A(e, a, { enumerable: !0, configurable: !0, writable: !0, value: l }) : e[a] = l;
var v = (e, a, l) => (D(e, typeof a != "symbol" ? a + "" : a, l), l);
import { defineComponent as E, useSlots as M, ref as T, computed as p, watch as B, resolveComponent as L, openBlock as i, createElementBlock as u, normalizeClass as w, withModifiers as N, renderSlot as f, createCommentVNode as k, createBlock as j } from "vue";
import { createLktEvent as y } from "lkt-events";
import { assertNever as x } from "lkt-control-tools";
import { httpCall as O } from "lkt-http-client";
import { openConfirm as F } from "lkt-modal-confirm";
var c = /* @__PURE__ */ ((e) => (e.button = "button", e.submit = "submit", e.reset = "reset", e))(c || {});
const U = (e) => {
  switch (e) {
    case c.button:
    case c.reset:
    case c.submit:
      return !0;
    default:
      x(e);
  }
  return !1;
};
class b {
}
v(b, "DEFAULT_STATE", "");
function q(e = 10) {
  let a = "";
  const l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", t = l.length;
  for (let n = 0; n < e; n++)
    a += l.charAt(Math.floor(Math.random() * t));
  return a;
}
const J = ["name", "type", "disabled"], K = {
  key: 0,
  class: "lkt-button-prev"
}, V = {
  key: 1,
  class: "lkt-button-content"
}, z = {
  key: 3,
  class: "lkt-button-next"
}, P = { name: "LktButton", inheritAttrs: !1 }, R = /* @__PURE__ */ E({
  ...P,
  props: {
    type: { type: String, default: c.button, validator: U },
    name: { type: String, default: () => q(10) },
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
  setup(e, { expose: a, emit: l }) {
    const t = e, n = l, h = M(), s = T(t.loading), C = p(() => {
      let o = [];
      return t.palette && o.push(`lkt-button--${t.palette}`), s.value && o.push("is-loading"), o.join(" ");
    }), S = p(() => !!h.next), _ = p(() => !!h.prev), d = async (o) => (s.value = !0, n("loading"), O(t.resource, t.resourceData).then((r) => {
      s.value = !1, n("loaded"), n("click", o, r);
    }).catch((r) => {
      s.value = !1, n("loaded"), n("click", o, r);
    })), g = (o) => {
      if (t.confirmModal) {
        let r = typeof t.confirmData == "object" ? JSON.parse(JSON.stringify(t.confirmData)) : {};
        if (typeof r.onConfirm == "function") {
          let m = r.onConfirm.bind({});
          r.onConfirm = () => {
            if (t.resource)
              return d(o).then(() => {
                m();
              });
            n("click", o, y(t.name, t.value));
          };
        } else
          r.onConfirm = () => {
            if (t.resource)
              return d(o);
            n("click", o, y(t.name, t.value));
          };
        return F(t.confirmModal, t.confirmModalKey, r);
      }
      if (t.resource)
        return d(o);
      n("click", o, y(t.name, t.value));
    };
    return B(() => t.loading, () => s.value = t.loading), a({
      click: () => g(null)
    }), (o, r) => {
      const m = L("lkt-spinner");
      return i(), u("button", {
        class: w(["lkt-button", C.value]),
        name: e.name,
        type: e.type,
        disabled: e.disabled,
        onClick: N(g, ["prevent", "stop"])
      }, [
        _.value ? (i(), u("span", K, [
          f(o.$slots, "prev")
        ])) : k("", !0),
        e.wrapContent ? (i(), u("span", V, [
          f(o.$slots, "default")
        ])) : f(o.$slots, "default", { key: 2 }),
        S.value ? (i(), u("span", z, [
          f(o.$slots, "next")
        ])) : k("", !0),
        s.value ? (i(), j(m, { key: 4 })) : k("", !0)
      ], 10, J);
    };
  }
}), Y = {
  install: (e, a) => {
    e.component("lkt-button", R), a && a.defaultState && (b.DEFAULT_STATE = a.defaultState);
  }
};
export {
  Y as default
};
