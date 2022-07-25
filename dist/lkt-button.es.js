import { createLktEvent as l } from "lkt-events";
import { trim as u, generateRandomString as d, isObject as c, isString as f } from "lkt-tools";
import { openBlock as m, createElementBlock as S, withModifiers as k, renderSlot as p } from "vue";
const T = ["button", "submit", "reset"], _ = (t) => T.indexOf(t) !== -1;
class a {
}
a.DEFAULT_STATE = "";
const b = (t) => {
  a.DEFAULT_STATE = u(t, void 0);
}, y = () => a.DEFAULT_STATE, g = {
  name: "LktButton",
  emits: ["click"],
  props: {
    type: { type: String, default: "button", validator: _ },
    name: { type: String, default: () => d(10) },
    state: { type: String, default: () => y() },
    value: { type: String, default: "" },
    disabled: { type: Boolean, default: !1 }
  },
  methods: {
    onClick(t) {
      this.$emit("click", t, l(this.name, this.value));
    }
  }
}, B = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [o, r] of e)
    n[o] = r;
  return n;
}, E = ["name", "type", "disabled", "data-state"];
function v(t, e, n, o, r, s) {
  return m(), S("button", {
    "data-lkt": "button",
    name: n.name,
    type: n.type,
    disabled: n.disabled,
    "data-state": n.state,
    onClick: e[0] || (e[0] = k((...i) => s.onClick && s.onClick(...i), ["prevent", "stop"]))
  }, [
    p(t.$slots, "default")
  ], 8, E);
}
const L = /* @__PURE__ */ B(g, [["render", v]]), C = {
  install: (t, e) => {
    t.component("lktButton", L), c(e) && f(e.defaultState) && b(e.defaultState);
  }
};
export {
  C as default
};
