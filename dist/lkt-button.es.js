import { generateRandomString as i } from "lkt-tools";
import { openBlock as r, createElementBlock as d, renderSlot as u } from "vue";
const c = ["button", "submit", "reset"], f = (t) => c.indexOf(t) !== -1, p = {
  name: "LktButton",
  props: {
    type: { type: String, default: "button", validator: f },
    name: { type: String, default: () => i(10) },
    value: { type: String, default: "" },
    state: { type: String, default: "" },
    disabled: { type: Boolean, default: !1 }
  },
  methods: {
    onClick(t) {
      this.$emit("click", { id: this.name, value: this.value, event: t });
    }
  }
}, m = (t, n) => {
  const e = t.__vccOpts || t;
  for (const [o, a] of n)
    e[o] = a;
  return e;
}, k = ["type", "disabled", "data-state"];
function y(t, n, e, o, a, s) {
  return r(), d("button", {
    "data-lkt": "button",
    type: e.type,
    disabled: e.disabled,
    "data-state": e.state,
    onClick: n[0] || (n[0] = (...l) => s.onClick && s.onClick(...l))
  }, [
    u(t.$slots, "default")
  ], 8, k);
}
const b = /* @__PURE__ */ m(p, [["render", y]]), g = {
  install: (t, n) => {
    t.component("LktButton", b);
  }
};
export {
  g as default
};
