import { createLktEvent as c } from "lkt-events";
import { defineComponent as h, openBlock as r, createElementBlock as i, normalizeClass as m, withModifiers as k, renderSlot as s, createCommentVNode as p } from "vue";
function b(t) {
  throw new Error(
    `Unhandled discrimination union member: ${JSON.stringify(t)}`
  );
}
var a = /* @__PURE__ */ ((t) => (t.button = "button", t.submit = "submit", t.reset = "reset", t))(a || {});
const y = (t) => {
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
class d {
}
d.DEFAULT_STATE = "";
function g(t = 10) {
  let e = "";
  const n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", l = n.length;
  for (let o = 0; o < t; o++)
    e += n.charAt(Math.floor(Math.random() * l));
  return e;
}
function u(t, e) {
  return !!t.$slots[e];
}
const v = h({
  name: "LktButton",
  emits: ["click"],
  props: {
    type: { type: String, default: a.button, validator: y },
    name: {
      type: String,
      default: () => g(10)
    },
    palette: { type: String, default: () => d.DEFAULT_STATE },
    value: { type: String, default: "" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    wrapContent: { type: Boolean, default: !1 }
  },
  computed: {
    hasPrev() {
      return u(this, "prev") || u(this, "prev-loading");
    },
    hasNext() {
      return u(this, "next") || u(this, "next-loading");
    },
    classes() {
      let t = [];
      return this.palette && t.push(`lkt-button--${this.palette}`), this.loading && t.push("is-loading"), t.join(" ");
    }
  },
  methods: {
    onClick(t) {
      this.$emit("click", t, c(this.name, this.value));
    }
  }
}), $ = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [l, o] of e)
    n[l] = o;
  return n;
}, S = ["name", "type", "disabled"], C = {
  key: 0,
  class: "lkt-button__prev",
  "data-role": "prev"
}, E = {
  key: 1,
  class: "lkt-button__content",
  "data-role": "content"
}, T = {
  key: 3,
  class: "lkt-button__next",
  "data-role": "next"
};
function A(t, e, n, l, o, w) {
  return r(), i("button", {
    class: m(["lkt-button", t.classes]),
    name: t.name,
    type: t.type,
    disabled: t.disabled,
    onClick: e[0] || (e[0] = k((...f) => t.onClick && t.onClick(...f), ["prevent", "stop"]))
  }, [
    t.hasPrev ? (r(), i("span", C, [
      t.loading ? s(t.$slots, "prev-loading", { key: 0 }) : s(t.$slots, "prev", { key: 1 })
    ])) : p("", !0),
    t.wrapContent ? (r(), i("span", E, [
      s(t.$slots, "default")
    ])) : s(t.$slots, "default", { key: 2 }),
    t.hasNext ? (r(), i("span", T, [
      t.loading ? s(t.$slots, "next-loading", { key: 0 }) : s(t.$slots, "next", { key: 1 })
    ])) : p("", !0)
  ], 10, S);
}
const _ = /* @__PURE__ */ $(v, [["render", A]]), N = {
  install: (t, e) => {
    t.component("lkt-button", _), e && e.defaultState && (d.DEFAULT_STATE = e.defaultState);
  }
};
export {
  N as default
};
