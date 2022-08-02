import { createLktEvent as m } from "lkt-events";
import { trim as p, generateRandomString as k, slotProvided as u, isObject as y, isString as S } from "lkt-tools";
import { openBlock as o, createElementBlock as s, withModifiers as _, renderSlot as r, createCommentVNode as c } from "vue";
const h = ["button", "submit", "reset"], v = (t) => h.indexOf(t) !== -1;
class l {
}
l.DEFAULT_STATE = "";
const T = (t) => {
  l.DEFAULT_STATE = p(t, void 0);
}, b = () => l.DEFAULT_STATE, g = {
  name: "LktButton",
  emits: ["click"],
  props: {
    type: { type: String, default: "button", validator: v },
    name: { type: String, default: () => k(10) },
    state: { type: String, default: () => b() },
    value: { type: String, default: "" },
    disabled: { type: Boolean, default: !1 },
    wrapContent: { type: Boolean, default: !1 }
  },
  computed: {
    hasPrev() {
      return u(this, "prev");
    },
    hasNext() {
      return u(this, "next");
    }
  },
  methods: {
    onClick(t) {
      this.$emit("click", t, m(this.name, this.value));
    }
  }
}, B = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [d, i] of e)
    n[d] = i;
  return n;
}, E = ["name", "type", "disabled", "data-state"], C = {
  key: 0,
  "data-role": "prev"
}, A = {
  key: 1,
  "data-role": "content"
}, L = {
  key: 3,
  "data-role": "next"
};
function x(t, e, n, d, i, a) {
  return o(), s("button", {
    "data-lkt": "button",
    name: n.name,
    type: n.type,
    disabled: n.disabled,
    "data-state": n.state,
    onClick: e[0] || (e[0] = _((...f) => a.onClick && a.onClick(...f), ["prevent", "stop"]))
  }, [
    a.hasPrev ? (o(), s("span", C, [
      r(t.$slots, "prev")
    ])) : c("", !0),
    n.wrapContent ? (o(), s("span", A, [
      r(t.$slots, "default")
    ])) : r(t.$slots, "default", { key: 2 }),
    a.hasNext ? (o(), s("span", L, [
      r(t.$slots, "next")
    ])) : c("", !0)
  ], 8, E);
}
const D = /* @__PURE__ */ B(g, [["render", x]]), U = {
  install: (t, e) => {
    t.component("lkt-button", D), y(e) && S(e.defaultState) && T(e.defaultState);
  }
};
export {
  U as default
};
