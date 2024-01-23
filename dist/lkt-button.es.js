var A = Object.defineProperty;
var D = (o, n, s) => n in o ? A(o, n, { enumerable: !0, configurable: !0, writable: !0, value: s }) : o[n] = s;
var h = (o, n, s) => (D(o, typeof n != "symbol" ? n + "" : n, s), s);
import { defineComponent as E, useSlots as L, ref as B, computed as m, watch as M, resolveComponent as T, openBlock as i, createElementBlock as u, normalizeClass as w, withModifiers as N, renderSlot as c, createCommentVNode as p, createBlock as F } from "vue";
import { createLktEvent as k } from "lkt-events";
import { generateRandomString as U } from "lkt-string-tools";
import { httpCall as j } from "lkt-http-client";
import J, { openConfirm as K } from "lkt-modal-confirm";
var y = /* @__PURE__ */ ((o) => (o.button = "button", o.submit = "submit", o.reset = "reset", o))(y || {});
class b {
}
h(b, "DEFAULT_STATE", "");
const O = ["name", "type", "disabled"], R = {
  key: 0,
  class: "lkt-button-prev"
}, z = {
  key: 1,
  class: "lkt-button-content"
}, P = {
  key: 3,
  class: "lkt-button-next"
}, V = { name: "LktButton", inheritAttrs: !1 }, q = /* @__PURE__ */ E({
  ...V,
  props: {
    type: { default: y.button },
    name: { default: U(10) },
    palette: { default: b.DEFAULT_STATE },
    value: { default: "" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    wrapContent: { type: Boolean, default: !1 },
    resource: { default: "" },
    resourceData: { default: () => ({}) },
    confirmModal: { default: "" },
    confirmModalKey: { default: "_" },
    confirmData: { default: () => ({}) }
  },
  emits: ["click", "loading", "loaded"],
  setup(o, { expose: n, emit: s }) {
    const t = o, a = s, v = L(), r = B(t.loading), _ = m(() => {
      let e = [];
      return t.palette && e.push(`lkt-button--${t.palette}`), r.value && e.push("is-loading"), e.join(" ");
    }), g = m(() => !!v.next), S = m(() => !!v.prev), f = async (e) => (r.value = !0, a("loading"), j(t.resource, t.resourceData).then((l) => {
      r.value = !1, a("loaded"), a("click", e, l);
    }).catch((l) => {
      r.value = !1, a("loaded"), a("click", e, l);
    })), C = (e) => {
      if (t.confirmModal) {
        let l = typeof t.confirmData == "object" ? JSON.parse(JSON.stringify(t.confirmData)) : {};
        if (typeof l.onConfirm == "function") {
          let d = l.onConfirm.bind({});
          l.onConfirm = () => {
            if (t.resource)
              return f(e).then(() => {
                d();
              });
            a("click", e, k(t.name, t.value));
          };
        } else
          l.onConfirm = () => {
            if (t.resource)
              return f(e);
            a("click", e, k(t.name, t.value));
          };
        return K(t.confirmModal, t.confirmModalKey, l);
      }
      if (t.resource)
        return f(e);
      a("click", e, k(t.name, t.value));
    };
    return M(() => t.loading, () => r.value = t.loading), n({
      click: () => C(null)
    }), (e, l) => {
      const d = T("lkt-spinner");
      return i(), u("button", {
        class: w(["lkt-button", _.value]),
        name: e.name,
        type: e.type,
        disabled: e.disabled,
        onClick: N(C, ["prevent", "stop"])
      }, [
        S.value ? (i(), u("span", R, [
          c(e.$slots, "prev")
        ])) : p("", !0),
        e.wrapContent ? (i(), u("span", z, [
          c(e.$slots, "default")
        ])) : c(e.$slots, "default", { key: 2 }),
        g.value ? (i(), u("span", P, [
          c(e.$slots, "next")
        ])) : p("", !0),
        r.value ? (i(), F(d, { key: 4 })) : p("", !0)
      ], 10, O);
    };
  }
}), X = {
  install: (o, n) => {
    o.component("lkt-button") === void 0 && o.component("lkt-button", q), n && n.defaultState && (b.DEFAULT_STATE = n.defaultState), o.component("lkt-modal-confirm") === void 0 && o.use(J);
  }
};
export {
  X as default
};
