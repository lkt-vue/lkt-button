import { createLktEvent as f } from "lkt-events";
import { assertNever as m, generateRandomString as k, slotProvided as u } from "lkt-tools";
import { defineComponent as b, openBlock as s, createElementBlock as a, withModifiers as h, renderSlot as o, createCommentVNode as p } from "vue";
var n = /* @__PURE__ */ ((t) => (t.button = "button", t.submit = "submit", t.reset = "reset", t))(n || {});
const v = (t) => {
  switch (t) {
    case n.button:
    case n.reset:
    case n.submit:
      return !0;
    default:
      m(t);
  }
  return !1;
};
class l {
}
l.DEFAULT_STATE = "";
const y = b({
  name: "LktButton",
  emits: ["click"],
  props: {
    type: { type: String, default: n.button, validator: v },
    name: {
      type: String,
      default: () => k(10)
    },
    state: { type: String, default: () => l.DEFAULT_STATE },
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
      this.$emit("click", t, f(this.name, this.value));
    }
  }
}), S = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [i, d] of e)
    r[i] = d;
  return r;
}, _ = ["name", "type", "disabled", "data-state"], $ = {
  key: 0,
  class: "lkt-button__prev",
  "data-role": "prev"
}, g = {
  key: 1,
  class: "lkt-button__content",
  "data-role": "content"
}, C = {
  key: 3,
  class: "lkt-button__next",
  "data-role": "next"
};
function E(t, e, r, i, d, A) {
  return s(), a("button", {
    class: "lkt-button",
    "data-lkt": "button",
    name: t.name,
    type: t.type,
    disabled: t.disabled,
    "data-state": t.state,
    onClick: e[0] || (e[0] = h((...c) => t.onClick && t.onClick(...c), ["prevent", "stop"]))
  }, [
    t.hasPrev ? (s(), a("span", $, [
      o(t.$slots, "prev")
    ])) : p("", !0),
    t.wrapContent ? (s(), a("span", g, [
      o(t.$slots, "default")
    ])) : o(t.$slots, "default", { key: 2 }),
    t.hasNext ? (s(), a("span", C, [
      o(t.$slots, "next")
    ])) : p("", !0)
  ], 8, _);
}
const T = /* @__PURE__ */ S(y, [["render", E]]), N = {
  install: (t, e) => {
    t.component("lkt-button", T), e && e.defaultState && (l.DEFAULT_STATE = e.defaultState);
  }
};
export {
  N as default
};
