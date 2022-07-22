import { generateRandomString as i } from "lkt-tools";
import { openBlock as u, createElementBlock as d, withModifiers as c, renderSlot as f } from "vue";
const p = ["button", "submit", "reset"], k = (t) => p.indexOf(t) !== -1;
class l {
}
l.DEFAULT_STATE = "";
const m = () => l.DEFAULT_STATE, _ = {
  name: "LktButton",
  props: {
    type: { type: String, default: "button", validator: k },
    name: { type: String, default: () => i(10) },
    state: { type: String, default: () => m() },
    value: { type: String, default: "" },
    disabled: { type: Boolean, default: !1 }
  },
  methods: {
    onClick(t) {
      t.lkt = { id: this.name, value: this.value }, this.$emit("click", t);
    }
  }
}, y = (t, n) => {
  const e = t.__vccOpts || t;
  for (const [o, a] of n)
    e[o] = a;
  return e;
}, S = ["type", "disabled", "data-state"];
function b(t, n, e, o, a, s) {
  return u(), d("button", {
    "data-lkt": "button",
    type: e.type,
    disabled: e.disabled,
    "data-state": e.state,
    onClick: n[0] || (n[0] = c((...r) => s.onClick && s.onClick(...r), ["stop"]))
  }, [
    f(t.$slots, "default")
  ], 8, S);
}
const B = /* @__PURE__ */ y(_, [["render", b]]), E = {
  install: (t, n) => {
    t.component("LktButton", B);
  }
};
export {
  E as default
};
