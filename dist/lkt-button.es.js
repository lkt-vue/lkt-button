import { createLktEvent as m } from "lkt-events";
import { assertNever as c, generateRandomString as k, slotProvided as o } from "lkt-tools";
import { defineComponent as h, openBlock as a, createElementBlock as l, normalizeClass as b, withModifiers as y, renderSlot as s, createCommentVNode as p } from "vue";
var n = /* @__PURE__ */ ((t) => (t.button = "button", t.submit = "submit", t.reset = "reset", t))(n || {});
const g = (t) => {
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
class i {
}
i.DEFAULT_STATE = "";
const v = h({
  name: "LktButton",
  emits: ["click"],
  props: {
    type: { type: String, default: n.button, validator: g },
    name: {
      type: String,
      default: () => k(10)
    },
    state: { type: String, default: () => i.DEFAULT_STATE },
    value: { type: String, default: "" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    wrapContent: { type: Boolean, default: !1 }
  },
  computed: {
    hasPrev() {
      return o(this, "prev") || o(this, "prev-loading");
    },
    hasNext() {
      return o(this, "next") || o(this, "next-loading");
    },
    classes() {
      let t = [];
      return this.state && t.push(`lkt-button--${this.state}`), this.loading && t.push("is-loading"), t.join(" ");
    }
  },
  methods: {
    onClick(t) {
      this.$emit("click", t, m(this.name, this.value));
    }
  }
}), S = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [d, u] of e)
    r[d] = u;
  return r;
}, $ = ["name", "type", "disabled"], C = {
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
function _(t, e, r, d, u, B) {
  return a(), l("button", {
    class: b(["lkt-button", t.classes]),
    name: t.name,
    type: t.type,
    disabled: t.disabled,
    onClick: e[0] || (e[0] = y((...f) => t.onClick && t.onClick(...f), ["prevent", "stop"]))
  }, [
    t.hasPrev ? (a(), l("span", C, [
      t.loading ? s(t.$slots, "prev-loading", { key: 0 }) : s(t.$slots, "prev", { key: 1 })
    ])) : p("", !0),
    t.wrapContent ? (a(), l("span", E, [
      s(t.$slots, "default")
    ])) : s(t.$slots, "default", { key: 2 }),
    t.hasNext ? (a(), l("span", T, [
      t.loading ? s(t.$slots, "next-loading", { key: 0 }) : s(t.$slots, "next", { key: 1 })
    ])) : p("", !0)
  ], 10, $);
}
const A = /* @__PURE__ */ S(v, [["render", _]]), D = {
  install: (t, e) => {
    t.component("lkt-button", A), e && e.defaultState && (i.DEFAULT_STATE = e.defaultState);
  }
};
export {
  D as default
};
