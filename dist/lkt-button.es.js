import { openBlock as d, createElementBlock as i, renderSlot as u } from "vue";
const r = ["button", "submit", "reset"], c = (t) => r.indexOf(t) !== -1, f = {
  name: "LktButton",
  props: {
    type: { type: String, default: "button", validator: c },
    name: { type: String, default: "" },
    value: { type: String, default: "" },
    state: { type: String, default: "" },
    disabled: { type: Boolean, default: !1 }
  },
  methods: {
    onClick(t) {
      this.$emit("click", { id: this.name, value: this.value, event: t });
    }
  }
}, p = (t, n) => {
  const e = t.__vccOpts || t;
  for (const [o, a] of n)
    e[o] = a;
  return e;
}, k = ["type", "disabled", "data-state"];
function m(t, n, e, o, a, s) {
  return d(), i("button", {
    "data-lkt": "button",
    type: e.type,
    disabled: e.disabled,
    "data-state": e.state,
    onClick: n[0] || (n[0] = (...l) => s.onClick && s.onClick(...l))
  }, [
    u(t.$slots, "default")
  ], 8, k);
}
const y = /* @__PURE__ */ p(f, [["render", m]]), _ = {
  install: (t, n) => {
    t.component("LktButton", y);
  }
};
export {
  _ as default
};
