import { defineComponent as G, ref as k, computed as g, openBlock as s, createBlock as v, normalizeClass as w, useSlots as x, onBeforeUnmount as $, watch as P, resolveComponent as _, createElementBlock as u, withCtx as ee, createCommentVNode as i, Fragment as B, createTextVNode as M, toDisplayString as N, unref as V, renderSlot as F, withModifiers as te, renderList as oe, reactive as le } from "vue";
import { createLktEvent as y } from "lkt-events";
import { generateRandomString as U } from "lkt-string-tools";
import { httpCall as ae } from "lkt-http-client";
import { openModal as ne } from "lkt-modal";
import { openConfirm as se } from "lkt-modal-confirm";
import { useRouter as ie, useRoute as re } from "vue-router";
import { __ as ue } from "lkt-i18n";
var S = /* @__PURE__ */ ((o) => (o.button = "button", o.submit = "submit", o.reset = "reset", o))(S || {});
const T = class T {
};
T.DEFAULT_PALETTE = "", T.debugEnabled = !1;
let C = T;
const De = (o) => {
  C.DEFAULT_PALETTE = o;
}, Te = (o = !0) => {
  C.debugEnabled = o;
}, n = (...o) => {
  C.debugEnabled && console.info("[LktButton] ", ...o);
};
class K {
  constructor(l, D) {
    this.key = "", this.text = "", this.onClick = void 0, this.classes = "", this.containerClasses = "", this.classGenerator = void 0, this.autoToggleParent = !1, this.key = l, this.text = D;
  }
  setOnClick(l) {
    return this.onClick = l, this;
  }
  setAutoToggleParentAfterClick(l = !0) {
    return this.autoToggleParent = l, this;
  }
  setClassGenerator(l) {
    return this.classGenerator = l, this;
  }
  setClasses(l) {
    return this.classes = l, this;
  }
  setContainerClasses(l) {
    return this.containerClasses = l, this;
  }
}
const ce = /* @__PURE__ */ G({
  __name: "SplitOption",
  props: {
    modelValue: { default: () => new K("", "") }
  },
  emits: ["click"],
  setup(o, { emit: l }) {
    const e = k(o.modelValue), r = l, h = g(() => {
      let f = [];
      if (e.value.classes !== "" && f.push(e.value.classes), typeof e.value.classGenerator == "function") {
        let c = e.value.classGenerator({
          button: e.value
        });
        typeof c == "string" && c !== "" && f.push(c);
      }
      return f.join(" ");
    });
    return (f, c) => (s(), v(j, {
      class: w(h.value),
      "container-class": e.value.containerClasses,
      text: e.value.text,
      onClick: c[0] || (c[0] = () => r("click", e.value))
    }, null, 8, ["class", "container-class", "text"]));
  }
}), fe = ["src", "alt"], de = ["name", "type", "disabled"], me = ["src", "alt"], pe = {
  key: 5,
  class: "lkt-split-button-arrow"
}, j = /* @__PURE__ */ G({
  __name: "LktButton",
  props: {
    type: { default: S.button },
    name: { default: U(10) },
    onClickTo: { default: "" },
    onClickToExternal: { type: Boolean, default: !1 },
    class: { default: "" },
    containerClass: { default: "" },
    palette: { default: C.DEFAULT_PALETTE },
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
  setup(o, { expose: l, emit: D }) {
    const e = o, r = D, h = x(), f = ie(), c = "lkt-button-" + U(), d = k(e.loading), E = k(null), H = k(null), z = k(null), m = k(!1), I = g(() => {
      let t = [];
      return e.class && t.push(e.class), e.palette && t.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), d.value && t.push("is-loading"), e.split && t.push("lkt-split-button"), t.join(" ");
    }), W = g(() => {
      let t = [];
      return e.containerClass && t.push(e.containerClass), t.join(" ");
    }), p = g(() => e.text.startsWith("__:") ? ue(e.text.substring(3)) : e.text), b = async (t) => (n("Resource Click", e.resource, e.resourceData), d.value = !0, r("loading"), ae(e.resource, e.resourceData).then((a) => {
      d.value = !1, r("loaded"), n("Resource Click -> Received response", a), r("click", t, a);
    }).catch((a) => {
      d.value = !1, r("loaded"), n("Resource Click -> Received response error", a), r("click", t, a);
    })), L = (t) => {
      if (!t.target) {
        m.value = !1;
        return;
      }
      if (!E.value.contains(t.target) || E.value.id !== t.target.id) {
        m.value = !1;
        return;
      }
    }, q = (t) => {
      m.value = !m.value;
    }, J = (t) => {
      typeof t.onClick == "function" && t.onClick(), t.autoToggleParent && (m.value = !1);
    };
    window.addEventListener("click", L), $(() => {
      window.removeEventListener("click", L);
    });
    const O = (t) => {
      if (n("Click"), t && q(), !e.split) {
        if (e.modal) {
          if (n("Click -> has modal", e.confirmModal, e.modalData), n("Click -> typeof beforeClose: ", typeof e.modalData.beforeClose), typeof e.modalData.beforeClose == "function") {
            let a = e.modalData.beforeClose.bind({});
            n("Click -> Has beforeClose function: ", a), e.modalData.beforeClose = () => {
              if (e.resource)
                return b(t).then(() => {
                  a();
                });
              a(), r("click", t, y(e.name, e.value));
            }, n("Click -> New beforeClose function: ", e.modalData.beforeClose);
          } else
            e.modalData.beforeClose = () => {
              if (e.resource)
                return b(t);
              r("click", t, y(e.name, e.value));
            }, n("Click -> New beforeClose function: ", e.modalData.beforeClose);
          return ne(e.modal, e.modalKey, e.modalData);
        }
        if (e.confirmModal) {
          if (n("Click -> has confirm modal", e.confirmModal, e.confirmData), n("Click -> typeof onConfirm: ", typeof e.confirmData.onConfirm), typeof e.confirmData.onConfirm == "function") {
            let a = e.confirmData.onConfirm;
            n("Click -> Has onConfirm function: ", a), e.confirmData.onConfirm = () => {
              if (e.resource)
                return b(t).then(() => {
                  a();
                });
              a(), r("click", t, y(e.name, e.value));
            }, n("Click -> New onConfirm function: ", e.confirmData.onConfirm);
          } else
            e.confirmData.onConfirm = () => {
              if (e.resource)
                return b(t);
              if (e.onClickTo !== "") {
                t && (t.preventDefault(), t.stopPropagation()), e.onClickToExternal || f.push(e.onClickTo);
                return;
              }
              r("click", t, y(e.name, e.value));
            }, n("Click -> New onConfirm function: ", e.confirmData.onConfirm);
          return se(e.confirmModal, e.confirmModalKey, e.confirmData);
        }
        if (e.resource)
          return n("Click -> has resource"), b(t);
        if (n("Click -> Emit"), e.onClickTo !== "") {
          t && (t.preventDefault(), t.stopPropagation()), e.onClickToExternal ? window.location.href = e.onClickTo : f.push(e.onClickTo);
          return;
        }
        r("click", t, y(e.name, e.value));
      }
    };
    P(() => e.loading, () => d.value = e.loading);
    const Q = re();
    return P(Q, (t) => {
      e.split && e.closeSplitOnRouteChanged && (m.value = !1);
    }, { flush: "pre", immediate: !0, deep: !0 }), l({
      click: () => O(null)
    }), g(() => {
      let t = [];
      for (let a in h)
        a.indexOf("split-") !== -1 && t.push(a);
      return t;
    }), (t, a) => {
      const A = _("lkt-spinner"), X = _("lkt-anchor");
      return s(), u("div", {
        class: w(["lkt-button-container", W.value]),
        ref_key: "container",
        ref: E,
        id: c
      }, [
        t.isAnchor ? (s(), v(X, {
          key: 0,
          class: "lkt-button",
          href: t.onClickToExternal ? t.onClickTo : "",
          to: t.onClickToExternal ? "" : t.onClickTo,
          download: t.download,
          target: t.newTab ? "_blank" : "",
          "download-file-name": t.downloadFileName,
          imposter: ""
        }, {
          default: ee(() => [
            t.icon ? (s(), u("i", {
              key: 0,
              class: w(t.icon)
            }, null, 2)) : i("", !0),
            t.img ? (s(), u("img", {
              key: 1,
              src: t.img,
              alt: p.value
            }, null, 8, fe)) : i("", !0),
            p.value ? (s(), u(B, { key: 2 }, [
              M(N(p.value), 1)
            ], 64)) : i("", !0),
            V(h).default ? F(t.$slots, "default", { key: 3 }) : i("", !0),
            d.value ? (s(), v(A, { key: 4 })) : i("", !0)
          ]),
          _: 3
        }, 8, ["href", "to", "download", "target", "download-file-name"])) : (s(), u("button", {
          key: 1,
          class: w(["lkt-button", I.value]),
          ref_key: "button",
          ref: H,
          name: t.name,
          type: t.type,
          disabled: t.disabled,
          onClick: te(O, ["prevent", "stop"])
        }, [
          t.icon ? (s(), u("i", {
            key: 0,
            class: w(t.icon)
          }, null, 2)) : i("", !0),
          t.img ? (s(), u("img", {
            key: 1,
            src: t.img,
            alt: p.value
          }, null, 8, me)) : i("", !0),
          p.value ? (s(), u(B, { key: 2 }, [
            M(N(p.value), 1)
          ], 64)) : i("", !0),
          V(h).default ? F(t.$slots, "default", { key: 3 }) : i("", !0),
          d.value ? (s(), v(A, { key: 4 })) : i("", !0),
          t.split ? (s(), u("div", pe)) : i("", !0)
        ], 10, de)),
        t.split && m.value ? (s(), u("div", {
          key: 2,
          ref_key: "dropdown",
          ref: z,
          class: "lkt-split-button-dropdown-content"
        }, [
          i("", !0),
          (s(!0), u(B, null, oe(t.splitOptions, (Y, R) => (s(), v(ce, {
            modelValue: t.splitOptions[R],
            "onUpdate:modelValue": (Z) => t.splitOptions[R] = Z,
            onClick: () => J(Y)
          }, null, 8, ["modelValue", "onUpdate:modelValue", "onClick"]))), 256))
        ], 512)) : i("", !0)
      ], 2);
    };
  }
}), Ee = {
  install: (o) => {
    o.component("lkt-button") === void 0 && o.component("lkt-button", j);
  }
}, Be = (o, l) => le(new K(o, l));
export {
  Be as createButtonOption,
  Te as debugLktButton,
  Ee as default,
  De as setDefaultButtonPalette
};
