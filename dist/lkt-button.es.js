var m = Object.defineProperty;
var h = (t, e, n) => e in t ? m(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var p = (t, e, n) => (h(t, typeof e != "symbol" ? e + "" : e, n), n);
import { createLktEvent as k } from "lkt-events";
import { assertNever as b } from "lkt-control-tools";
import { defineComponent as y, openBlock as r, createElementBlock as i, normalizeClass as v, withModifiers as g, renderSlot as s, createCommentVNode as f } from "vue";
import { slotProvided as d } from "lkt-vue-tools";
var a = /* @__PURE__ */ ((t) => (t.button = "button", t.submit = "submit", t.reset = "reset", t))(a || {});
const $ = (t) => {
  switch (t) {
    case a.button:
    case a.reset:
    case a.submit:
      return !0;
    default:
      b(t);
  }
  return !1;
};
class u {
}
p(u, "DEFAULT_STATE", "");
function S(t = 10) {
  let e = "";
  const n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", l = n.length;
  for (let o = 0; o < t; o++)
    e += n.charAt(Math.floor(Math.random() * l));
  return e;
}
const C = y({
  name: "LktButton",
  emits: ["click"],
  props: {
    type: { type: String, default: a.button, validator: $ },
    name: {
      type: String,
      default: () => S(10)
    },
    palette: { type: String, default: () => u.DEFAULT_STATE },
    value: { type: String, default: "" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    wrapContent: { type: Boolean, default: !1 }
  },
  computed: {
    hasPrev() {
      return d(this, "prev") || d(this, "prev-loading");
    },
    hasNext() {
      return d(this, "next") || d(this, "next-loading");
    },
    classes() {
      let t = [];
      return this.palette && t.push(`lkt-button--${this.palette}`), this.loading && t.push("is-loading"), t.join(" ");
    }
  },
  methods: {
    onClick(t) {
      this.$emit("click", t, k(this.name, this.value));
    }
  }
}), E = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [l, o] of e)
    n[l] = o;
  return n;
}, T = ["name", "type", "disabled"], A = {
  key: 0,
  class: "lkt-button__prev",
  "data-role": "prev"
}, _ = {
  key: 1,
  class: "lkt-button__content",
  "data-role": "content"
}, B = {
  key: 3,
  class: "lkt-button__next",
  "data-role": "next"
};
function L(t, e, n, l, o, N) {
  return r(), i("button", {
    class: v(["lkt-button", t.classes]),
    name: t.name,
    type: t.type,
    disabled: t.disabled,
    onClick: e[0] || (e[0] = g((...c) => t.onClick && t.onClick(...c), ["prevent", "stop"]))
  }, [
    t.hasPrev ? (r(), i("span", A, [
      t.loading ? s(t.$slots, "prev-loading", { key: 0 }) : s(t.$slots, "prev", { key: 1 })
    ])) : f("", !0),
    t.wrapContent ? (r(), i("span", _, [
      s(t.$slots, "default")
    ])) : s(t.$slots, "default", { key: 2 }),
    t.hasNext ? (r(), i("span", B, [
      t.loading ? s(t.$slots, "next-loading", { key: 0 }) : s(t.$slots, "next", { key: 1 })
    ])) : f("", !0)
  ], 10, T);
}
const w = /* @__PURE__ */ E(C, [["render", L]]), V = {
  install: (t, e) => {
    t.component("lkt-button", w), e && e.defaultState && (u.DEFAULT_STATE = e.defaultState);
  }
};
export {
  V as default
};
