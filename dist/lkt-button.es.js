import { createLktEvent as m } from "lkt-events";
import { assertNever as c, generateRandomString as k, slotProvided as u } from "lkt-tools";
import { defineComponent as b, openBlock as a, createElementBlock as s, withModifiers as h, renderSlot as o, createCommentVNode as p } from "vue";
var n = /* @__PURE__ */ ((t) => (t.button = "button", t.submit = "submit", t.reset = "reset", t))(n || {});
const v = (t) => {
  switch (t) {
    case n.button:
    case n.reset:
    case n.submit:
      return !0;
    default:
      c(t);
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
      this.$emit("click", t, m(this.name, this.value));
    }
  }
}), S = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [i, d] of e)
    r[i] = d;
  return r;
}, $ = ["name", "type", "disabled", "data-state"], g = {
  key: 0,
  "data-role": "prev"
}, C = {
  key: 1,
  "data-role": "content"
}, E = {
  key: 3,
  "data-role": "next"
};
function T(t, e, r, i, d, L) {
  return a(), s("button", {
    "data-lkt": "button",
    name: t.name,
    type: t.type,
    disabled: t.disabled,
    "data-state": t.state,
    onClick: e[0] || (e[0] = h((...f) => t.onClick && t.onClick(...f), ["prevent", "stop"]))
  }, [
    t.hasPrev ? (a(), s("span", g, [
      o(t.$slots, "prev")
    ])) : p("", !0),
    t.wrapContent ? (a(), s("span", C, [
      o(t.$slots, "default")
    ])) : o(t.$slots, "default", { key: 2 }),
    t.hasNext ? (a(), s("span", E, [
      o(t.$slots, "next")
    ])) : p("", !0)
  ], 8, $);
}
const A = /* @__PURE__ */ S(y, [["render", T]]), N = {
  install: (t, e) => {
    t.component("lkt-button", A), e && e.defaultState && (l.DEFAULT_STATE = e.defaultState);
  }
};
export {
  N as default
};
