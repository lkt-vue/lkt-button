import { defineComponent as U, ref as m, openBlock as a, createBlock as h, useSlots as Y, computed as D, onBeforeUnmount as Z, watch as R, resolveComponent as P, createElementBlock as u, withCtx as x, normalizeClass as T, createCommentVNode as i, Fragment as E, createTextVNode as _, toDisplayString as M, unref as N, renderSlot as V, withModifiers as $, renderList as ee, reactive as oe } from "vue";
import { createLktEvent as b } from "lkt-events";
import { generateRandomString as F } from "lkt-string-tools";
import { httpCall as te } from "lkt-http-client";
import { openModal as le } from "lkt-modal";
import { openConfirm as ne } from "lkt-modal-confirm";
import { useRouter as ae, useRoute as ie } from "vue-router";
import { __ as re } from "lkt-i18n";
var S = /* @__PURE__ */ ((t) => (t.button = "button", t.submit = "submit", t.reset = "reset", t))(S || {});
const v = class v {
};
v.DEFAULT_PALETTE = "", v.debugEnabled = !1;
let p = v;
const we = (t) => {
  p.DEFAULT_PALETTE = t;
}, De = (t = !0) => {
  p.debugEnabled = t;
}, n = (...t) => {
  p.debugEnabled && console.info("[LktButton] ", ...t);
}, se = /* @__PURE__ */ U({
  __name: "SplitOption",
  props: {
    modelValue: { default: () => ({}) }
  },
  emits: ["click"],
  setup(t, { emit: s }) {
    const e = m(t.modelValue), r = s;
    return (g, k) => (a(), h(K, {
      text: e.value.text,
      onClick: k[0] || (k[0] = () => r("click", e.value))
    }, null, 8, ["text"]));
  }
}), ue = ["src", "alt"], ce = ["name", "type", "disabled"], fe = ["src", "alt"], de = {
  key: 5,
  class: "lkt-split-button-arrow"
}, K = /* @__PURE__ */ U({
  __name: "LktButton",
  props: {
    type: { default: S.button },
    name: { default: F(10) },
    onClickTo: { default: "" },
    onClickToExternal: { type: Boolean, default: !1 },
    class: { default: "" },
    palette: { default: p.DEFAULT_PALETTE },
    value: { default: "" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    wrapContent: { type: Boolean, default: !1 },
    split: { type: Boolean, default: !1 },
    splitOptions: { default: () => [] },
    closeSplitOnRouteChanged: { type: Boolean, default: !1 },
    isAnchor: { type: Boolean, default: !1 },
    resource: { default: "" },
    resourceData: { default: () => ({}) },
    modal: { default: "" },
    modalKey: { default: "_" },
    modalData: { default: () => ({}) },
    confirmModal: { default: "" },
    confirmModalKey: { default: "_" },
    confirmData: { default: () => ({}) },
    text: { default: "" },
    icon: { default: "" },
    img: { default: "" },
    newTab: { type: Boolean, default: !1 },
    download: { type: Boolean, default: !1 },
    downloadFileName: { default: "" }
  },
  emits: ["click", "loading", "loaded"],
  setup(t, { expose: s, emit: y }) {
    const e = t, r = y, g = Y(), k = ae(), H = "lkt-button-" + F(), c = m(e.loading), w = m(null), j = m(null), z = m(null), f = m(!1), I = D(() => {
      let o = [];
      return e.class && o.push(e.class), e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), c.value && o.push("is-loading"), e.split && o.push("lkt-split-button"), o.join(" ");
    }), d = D(() => e.text.startsWith("__:") ? re(e.text.substring(3)) : e.text), C = async (o) => (n("Resource Click", e.resource, e.resourceData), c.value = !0, r("loading"), te(e.resource, e.resourceData).then((l) => {
      c.value = !1, r("loaded"), n("Resource Click -> Received response", l), r("click", o, l);
    }).catch((l) => {
      c.value = !1, r("loaded"), n("Resource Click -> Received response error", l), r("click", o, l);
    })), B = (o) => {
      if (!o.target) {
        f.value = !1;
        return;
      }
      if (!w.value.contains(o.target) || w.value.id !== o.target.id) {
        f.value = !1;
        return;
      }
    }, W = (o) => {
      f.value = !f.value;
    }, q = (o) => {
      typeof o.onClick == "function" && o.onClick(), o.autoToggleParent && (f.value = !1);
    };
    window.addEventListener("click", B), Z(() => {
      window.removeEventListener("click", B);
    });
    const L = (o) => {
      if (n("Click"), o && W(), !e.split) {
        if (e.modal) {
          if (n("Click -> has modal", e.confirmModal, e.modalData), n("Click -> typeof beforeClose: ", typeof e.modalData.beforeClose), typeof e.modalData.beforeClose == "function") {
            let l = e.modalData.beforeClose.bind({});
            n("Click -> Has beforeClose function: ", l), e.modalData.beforeClose = () => {
              if (e.resource)
                return C(o).then(() => {
                  l();
                });
              l(), r("click", o, b(e.name, e.value));
            }, n("Click -> New beforeClose function: ", e.modalData.beforeClose);
          } else
            e.modalData.beforeClose = () => {
              if (e.resource)
                return C(o);
              r("click", o, b(e.name, e.value));
            }, n("Click -> New beforeClose function: ", e.modalData.beforeClose);
          return le(e.modal, e.modalKey, e.modalData);
        }
        if (e.confirmModal) {
          if (n("Click -> has confirm modal", e.confirmModal, e.confirmData), n("Click -> typeof onConfirm: ", typeof e.confirmData.onConfirm), typeof e.confirmData.onConfirm == "function") {
            let l = e.confirmData.onConfirm;
            n("Click -> Has onConfirm function: ", l), e.confirmData.onConfirm = () => {
              if (e.resource)
                return C(o).then(() => {
                  l();
                });
              l(), r("click", o, b(e.name, e.value));
            }, n("Click -> New onConfirm function: ", e.confirmData.onConfirm);
          } else
            e.confirmData.onConfirm = () => {
              if (e.resource)
                return C(o);
              if (e.onClickTo !== "") {
                o && (o.preventDefault(), o.stopPropagation()), e.onClickToExternal || k.push(e.onClickTo);
                return;
              }
              r("click", o, b(e.name, e.value));
            }, n("Click -> New onConfirm function: ", e.confirmData.onConfirm);
          return ne(e.confirmModal, e.confirmModalKey, e.confirmData);
        }
        if (e.resource)
          return n("Click -> has resource"), C(o);
        if (n("Click -> Emit"), e.onClickTo !== "") {
          o && (o.preventDefault(), o.stopPropagation()), e.onClickToExternal ? window.location.href = e.onClickTo : k.push(e.onClickTo);
          return;
        }
        r("click", o, b(e.name, e.value));
      }
    };
    R(() => e.loading, () => c.value = e.loading);
    const G = ie();
    return R(G, (o) => {
      e.split && e.closeSplitOnRouteChanged && (f.value = !1);
    }, { flush: "pre", immediate: !0, deep: !0 }), s({
      click: () => L(null)
    }), D(() => {
      let o = [];
      for (let l in g)
        l.indexOf("split-") !== -1 && o.push(l);
      return o;
    }), (o, l) => {
      const O = P("lkt-spinner"), J = P("lkt-anchor");
      return a(), u("div", {
        class: "lkt-button-container",
        ref_key: "container",
        ref: w,
        id: H
      }, [
        o.isAnchor ? (a(), h(J, {
          key: 0,
          class: "lkt-button",
          href: o.onClickToExternal ? o.onClickTo : "",
          to: o.onClickToExternal ? "" : o.onClickTo,
          download: o.download,
          target: o.newTab ? "_blank" : "",
          "download-file-name": o.downloadFileName,
          imposter: ""
        }, {
          default: x(() => [
            o.icon ? (a(), u("i", {
              key: 0,
              class: T(o.icon)
            }, null, 2)) : i("", !0),
            o.img ? (a(), u("img", {
              key: 1,
              src: o.img,
              alt: d.value
            }, null, 8, ue)) : i("", !0),
            d.value ? (a(), u(E, { key: 2 }, [
              _(M(d.value), 1)
            ], 64)) : i("", !0),
            N(g).default ? V(o.$slots, "default", { key: 3 }) : i("", !0),
            c.value ? (a(), h(O, { key: 4 })) : i("", !0)
          ]),
          _: 3
        }, 8, ["href", "to", "download", "target", "download-file-name"])) : (a(), u("button", {
          key: 1,
          class: T(["lkt-button", I.value]),
          ref_key: "button",
          ref: j,
          name: o.name,
          type: o.type,
          disabled: o.disabled,
          onClick: $(L, ["prevent", "stop"])
        }, [
          o.icon ? (a(), u("i", {
            key: 0,
            class: T(o.icon)
          }, null, 2)) : i("", !0),
          o.img ? (a(), u("img", {
            key: 1,
            src: o.img,
            alt: d.value
          }, null, 8, fe)) : i("", !0),
          d.value ? (a(), u(E, { key: 2 }, [
            _(M(d.value), 1)
          ], 64)) : i("", !0),
          N(g).default ? V(o.$slots, "default", { key: 3 }) : i("", !0),
          c.value ? (a(), h(O, { key: 4 })) : i("", !0),
          o.split ? (a(), u("div", de)) : i("", !0)
        ], 10, ce)),
        o.split && f.value ? (a(), u("div", {
          key: 2,
          ref_key: "dropdown",
          ref: z,
          class: "lkt-split-button-dropdown-content"
        }, [
          i("", !0),
          (a(!0), u(E, null, ee(o.splitOptions, (Q, A) => (a(), h(se, {
            modelValue: o.splitOptions[A],
            "onUpdate:modelValue": (X) => o.splitOptions[A] = X,
            onClick: () => q(Q)
          }, null, 8, ["modelValue", "onUpdate:modelValue", "onClick"]))), 256))
        ], 512)) : i("", !0)
      ], 512);
    };
  }
});
class me {
  constructor(s, y) {
    this.key = "", this.text = "", this.onClick = void 0, this.autoToggleParent = !1, this.key = s, this.text = y;
  }
  setOnClick(s) {
    return this.onClick = s, this;
  }
  setAutoToggleParentAfterClick(s = !0) {
    return this.autoToggleParent = s, this;
  }
}
const Te = {
  install: (t) => {
    t.component("lkt-button") === void 0 && t.component("lkt-button", K);
  }
}, Ee = (t, s) => oe(new me(t, s));
export {
  Ee as createButtonOption,
  De as debugLktButton,
  Te as default,
  we as setDefaultButtonPalette
};
