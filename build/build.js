import { defineComponent as j, ref as p, computed as D, openBlock as n, createBlock as C, normalizeClass as T, useSlots as te, onBeforeUnmount as oe, watch as N, resolveComponent as O, createElementBlock as u, withCtx as U, createCommentVNode as i, Fragment as A, createTextVNode as F, toDisplayString as G, unref as S, renderSlot as R, renderList as le, reactive as ae } from "vue";
import { createLktEvent as w } from "lkt-events";
import { generateRandomString as K } from "lkt-string-tools";
import { httpCall as ne } from "lkt-http-client";
import { openModal as se } from "lkt-modal";
import { openConfirm as ie } from "lkt-modal-confirm";
import { useRouter as re, useRoute as ue } from "vue-router";
import { __ as ce } from "lkt-i18n";
var H = /* @__PURE__ */ ((o) => (o.button = "button", o.submit = "submit", o.reset = "reset", o))(H || {});
const L = class L {
};
L.DEFAULT_PALETTE = "", L.debugEnabled = !1;
let h = L;
const Te = (o) => {
  h.DEFAULT_PALETTE = o;
}, Ee = (o = !0) => {
  h.debugEnabled = o;
}, s = (...o) => {
  h.debugEnabled && console.info("[LktButton] ", ...o);
};
class z {
  constructor(a, E) {
    this.key = "", this.text = "", this.onClick = void 0, this.classes = "", this.containerClasses = "", this.classGenerator = void 0, this.autoToggleParent = !1, this.key = a, this.text = E;
  }
  setOnClick(a) {
    return this.onClick = a, this;
  }
  setAutoToggleParentAfterClick(a = !0) {
    return this.autoToggleParent = a, this;
  }
  setClassGenerator(a) {
    return this.classGenerator = a, this;
  }
  setClasses(a) {
    return this.classes = a, this;
  }
  setContainerClasses(a) {
    return this.containerClasses = a, this;
  }
}
const fe = /* @__PURE__ */ j({
  __name: "SplitOption",
  props: {
    modelValue: { default: () => new z("", "") }
  },
  emits: ["click"],
  setup(o, { emit: a }) {
    const e = p(o.modelValue), r = a, b = D(() => {
      let f = [];
      if (e.value.classes !== "" && f.push(e.value.classes), typeof e.value.classGenerator == "function") {
        let c = e.value.classGenerator({
          button: e.value
        });
        typeof c == "string" && c !== "" && f.push(c);
      }
      return f.join(" ");
    });
    return (f, c) => (n(), C(I, {
      class: T(b.value),
      "container-class": e.value.containerClasses,
      text: e.value.text,
      onClick: c[0] || (c[0] = () => r("click", e.value))
    }, null, 8, ["class", "container-class", "text"]));
  }
}), de = ["src", "alt"], me = ["name", "type", "disabled"], pe = ["src", "alt"], ke = {
  key: 5,
  class: "lkt-split-button-arrow"
}, I = /* @__PURE__ */ j({
  __name: "LktButton",
  props: {
    type: { default: H.button },
    name: { default: K(10) },
    onClickTo: { default: "" },
    onClickToExternal: { type: Boolean, default: !1 },
    class: { default: "" },
    containerClass: { default: "" },
    palette: { default: h.DEFAULT_PALETTE },
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
    downloadFileName: { default: "" },
    tooltip: { type: Boolean }
  },
  emits: ["click", "loading", "loaded"],
  setup(o, { expose: a, emit: E }) {
    const e = o, r = E, b = te(), f = re(), c = "lkt-button-" + K(), d = p(e.loading), v = p(null), W = p(null), q = p(null), m = p(!1), B = p(!1), J = D(() => {
      let t = [];
      return e.class && t.push(e.class), e.palette && t.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), d.value && t.push("is-loading"), e.split && t.push("lkt-split-button"), t.join(" ");
    }), Q = D(() => {
      let t = [];
      return e.containerClass && t.push(e.containerClass), t.join(" ");
    }), k = D(() => e.text.startsWith("__:") ? ce(e.text.substring(3)) : e.text), y = async (t) => (s("Resource Click", e.resource, e.resourceData), d.value = !0, r("loading"), ne(e.resource, e.resourceData).then((l) => {
      d.value = !1, r("loaded"), s("Resource Click -> Received response", l), r("click", t, l);
    }).catch((l) => {
      d.value = !1, r("loaded"), s("Resource Click -> Received response error", l), r("click", t, l);
    })), V = (t) => {
      if (!t.target) {
        m.value = !1;
        return;
      }
      if (!v.value.contains(t.target) || v.value.id !== t.target.id) {
        m.value = !1;
        return;
      }
    }, X = (t) => {
      m.value = !m.value;
    }, Y = (t) => {
      typeof t.onClick == "function" && t.onClick(), t.autoToggleParent && (m.value = !1);
    };
    window.addEventListener("click", V), oe(() => {
      window.removeEventListener("click", V);
    });
    const _ = (t) => {
      if (s("Click"), t && (e.tooltip ? B.value = !B.value : X()), !e.split) {
        if (e.modal) {
          if (s("Click -> has modal", e.confirmModal, e.modalData), s("Click -> typeof beforeClose: ", typeof e.modalData.beforeClose), typeof e.modalData.beforeClose == "function") {
            let l = e.modalData.beforeClose.bind({});
            s("Click -> Has beforeClose function: ", l), e.modalData.beforeClose = () => {
              if (e.resource)
                return y(t).then(() => {
                  l();
                });
              l(), r("click", t, w(e.name, e.value));
            }, s("Click -> New beforeClose function: ", e.modalData.beforeClose);
          } else
            e.modalData.beforeClose = () => {
              if (e.resource)
                return y(t);
              r("click", t, w(e.name, e.value));
            }, s("Click -> New beforeClose function: ", e.modalData.beforeClose);
          return se(e.modal, e.modalKey, e.modalData);
        }
        if (e.confirmModal) {
          if (s("Click -> has confirm modal", e.confirmModal, e.confirmData), s("Click -> typeof onConfirm: ", typeof e.confirmData.onConfirm), typeof e.confirmData.onConfirm == "function") {
            let l = e.confirmData.onConfirm;
            s("Click -> Has onConfirm function: ", l), e.confirmData.onConfirm = () => {
              if (e.resource)
                return y(t).then(() => {
                  l();
                });
              l(), r("click", t, w(e.name, e.value));
            }, s("Click -> New onConfirm function: ", e.confirmData.onConfirm);
          } else
            e.confirmData.onConfirm = () => {
              if (e.resource)
                return y(t);
              if (e.onClickTo !== "") {
                t && (t.preventDefault(), t.stopPropagation()), e.onClickToExternal || f.push(e.onClickTo);
                return;
              }
              r("click", t, w(e.name, e.value));
            }, s("Click -> New onConfirm function: ", e.confirmData.onConfirm);
          return ie(e.confirmModal, e.confirmModalKey, e.confirmData);
        }
        if (e.resource)
          return s("Click -> has resource"), y(t);
        if (s("Click -> Emit"), e.onClickTo !== "") {
          e.onClickToExternal ? window.location.href = e.onClickTo : f.push(e.onClickTo);
          return;
        }
        r("click", t, w(e.name, e.value));
      }
    };
    N(() => e.loading, () => d.value = e.loading);
    const Z = ue();
    return N(Z, (t) => {
      e.split && e.closeSplitOnRouteChanged && (m.value = !1);
    }, { flush: "pre", immediate: !0, deep: !0 }), a({
      click: () => _(null)
    }), D(() => {
      let t = [];
      for (let l in b)
        l.indexOf("split-") !== -1 && t.push(l);
      return t;
    }), (t, l) => {
      const P = O("lkt-spinner"), x = O("lkt-anchor"), $ = O("lkt-tooltip");
      return n(), u("div", {
        class: T(["lkt-button-container", Q.value]),
        ref_key: "container",
        ref: v,
        id: c
      }, [
        t.isAnchor ? (n(), C(x, {
          key: 0,
          class: "lkt-button",
          href: t.onClickToExternal ? t.onClickTo : "",
          to: t.onClickToExternal ? "" : t.onClickTo,
          download: t.download,
          target: t.newTab ? "_blank" : "",
          "download-file-name": t.downloadFileName,
          imposter: ""
        }, {
          default: U(() => [
            t.icon ? (n(), u("i", {
              key: 0,
              class: T(t.icon)
            }, null, 2)) : i("", !0),
            t.img ? (n(), u("img", {
              key: 1,
              src: t.img,
              alt: k.value
            }, null, 8, de)) : i("", !0),
            k.value ? (n(), u(A, { key: 2 }, [
              F(G(k.value), 1)
            ], 64)) : i("", !0),
            S(b).default ? R(t.$slots, "default", { key: 3 }) : i("", !0),
            d.value ? (n(), C(P, { key: 4 })) : i("", !0)
          ]),
          _: 3
        }, 8, ["href", "to", "download", "target", "download-file-name"])) : (n(), u("button", {
          key: 1,
          class: T(["lkt-button", J.value]),
          ref_key: "button",
          ref: W,
          name: t.name,
          type: t.type,
          disabled: t.disabled,
          onClick: _
        }, [
          t.icon ? (n(), u("i", {
            key: 0,
            class: T(t.icon)
          }, null, 2)) : i("", !0),
          t.img ? (n(), u("img", {
            key: 1,
            src: t.img,
            alt: k.value
          }, null, 8, pe)) : i("", !0),
          k.value ? (n(), u(A, { key: 2 }, [
            F(G(k.value), 1)
          ], 64)) : i("", !0),
          S(b).default ? R(t.$slots, "default", { key: 3 }) : i("", !0),
          d.value ? (n(), C(P, { key: 4 })) : i("", !0),
          t.split ? (n(), u("div", ke)) : i("", !0)
        ], 10, me)),
        t.split && m.value ? (n(), u("div", {
          key: 2,
          ref_key: "dropdown",
          ref: q,
          class: "lkt-split-button-dropdown-content"
        }, [
          i("", !0),
          (n(!0), u(A, null, le(t.splitOptions, (g, M) => (n(), C(fe, {
            modelValue: t.splitOptions[M],
            "onUpdate:modelValue": (ee) => t.splitOptions[M] = ee,
            onClick: () => Y(g)
          }, null, 8, ["modelValue", "onUpdate:modelValue", "onClick"]))), 256))
        ], 512)) : i("", !0),
        t.tooltip && v.value ? (n(), C($, {
          key: 3,
          modelValue: B.value,
          "onUpdate:modelValue": l[0] || (l[0] = (g) => B.value = g),
          referrer: v.value
        }, {
          default: U(({ doClose: g }) => [
            R(t.$slots, "tooltip", { doClose: g })
          ]),
          _: 3
        }, 8, ["modelValue", "referrer"])) : i("", !0)
      ], 2);
    };
  }
}), Be = {
  install: (o) => {
    o.component("lkt-button") === void 0 && o.component("lkt-button", I);
  }
}, Le = (o, a) => ae(new z(o, a));
export {
  Le as createButtonOption,
  Ee as debugLktButton,
  Be as default,
  Te as setDefaultButtonPalette
};
