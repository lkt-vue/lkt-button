import { defineComponent as me, useSlots as ke, ref as s, watch as w, computed as p, resolveComponent as A, openBlock as n, createElementBlock as c, normalizeClass as v, createBlock as C, withCtx as V, createCommentVNode as i, toDisplayString as F, Fragment as G, createTextVNode as J, unref as Q, renderSlot as N, resolveDynamicComponent as Z, withDirectives as ve, vShow as Ce, createSlots as $, nextTick as he } from "vue";
import { createLktEvent as b } from "lkt-events";
import { generateRandomString as _ } from "lkt-string-tools";
import { httpCall as ye } from "lkt-http-client";
import { openModal as we } from "lkt-modal";
import { openConfirm as be } from "lkt-modal-confirm";
import { useRouter as ge, useRoute as Te } from "vue-router";
import { __ as De } from "lkt-i18n";
var E = /* @__PURE__ */ ((l) => (l.button = "button", l.submit = "submit", l.reset = "reset", l.content = "content", l.switch = "switch", l.hiddenSwitch = "hidden-switch", l))(E || {});
const L = class L {
};
L.DEFAULT_PALETTE = "", L.debugEnabled = !1, L.defaultSplitIcon = void 0;
let m = L;
const Pe = (l) => {
  m.DEFAULT_PALETTE = l;
}, Ke = (l = !0) => {
  m.debugEnabled = l;
}, u = (...l) => {
  m.debugEnabled && console.info("[LktButton] ", ...l);
}, Re = {
  key: 1,
  class: "lkt-button--icon-dot"
}, Ee = ["src", "alt"], Se = {
  key: 1,
  class: "lkt-button--icon-dot"
}, Be = ["src", "alt"], Le = {
  key: 8,
  class: "lkt-split-button-arrow"
}, Me = /* @__PURE__ */ me({
  __name: "LktButton",
  props: {
    type: { default: E.button },
    name: { default: _(10) },
    onClickTo: { default: "" },
    onClickToExternal: { type: Boolean, default: !1 },
    class: { default: "" },
    containerClass: { default: "" },
    palette: { default: m.DEFAULT_PALETTE },
    value: { default: "" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    wrapContent: { type: Boolean, default: !1 },
    split: { type: [Boolean, String], default: !1 },
    splitIcon: { default: "" },
    isAnchor: { type: Boolean, default: !1 },
    resource: { default: "" },
    resourceData: { default: () => ({}) },
    modal: { type: [String, Function], default: "" },
    modalKey: { default: "_" },
    modalData: { default: () => ({}) },
    confirmModal: { default: "" },
    confirmModalKey: { default: "_" },
    confirmData: { default: () => ({}) },
    text: { default: "" },
    icon: { default: "" },
    iconDot: { type: [Boolean, String, Number], default: !1 },
    iconEnd: { default: "" },
    img: { default: "" },
    newTab: { type: Boolean, default: !1 },
    download: { type: Boolean, default: !1 },
    downloadFileName: { default: "" },
    showSwitch: { type: Boolean, default: !1 },
    hiddenSwitch: { type: Boolean },
    tooltip: { type: [Boolean, String], default: !1 },
    tooltipEngine: {},
    showTooltipOnHover: { type: Boolean },
    showTooltipOnHoverDelay: { default: 0 },
    hideTooltipOnLeave: { type: Boolean },
    tooltipWindowMargin: { default: 0 },
    tooltipReferrerMargin: { default: 0 },
    tooltipClass: {},
    tooltipLocationY: { default: "bottom" },
    tooltipLocationX: { default: "left-corner" },
    splitClass: {},
    checked: { type: Boolean, default: !1 },
    clickRef: { default: !1 },
    openTooltip: { type: Boolean, default: !1 },
    tabindex: { default: void 0 }
  },
  emits: ["click", "focus", "blur", "loading", "loaded", "update:checked", "update:openTooltip"],
  setup(l, { expose: x, emit: ee }) {
    const e = l, a = ee, K = ke(), S = ge(), oe = Te(), te = "lkt-button-" + _(), h = s(e.loading), y = s(null), O = s(null), g = s(!1), f = s(e.openTooltip), W = s(!1), T = s(!1), D = s(void 0), k = s(e.checked), H = s(!1);
    w(() => e.openTooltip, (o) => f.value = o), w(f, (o) => a("update:openTooltip", o));
    const z = () => {
      if (!e.onClickTo) return;
      let o = S == null ? void 0 : S.currentRoute;
      W.value = o.value.path === e.onClickTo;
    };
    w(oe, (o) => {
      z();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const le = p(() => {
      let o = [];
      return e.class && o.push(e.class), e.split && o.push("lkt-split-button"), e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), h.value && o.push("is-loading"), W.value && o.push("is-active-route"), f.value && o.push("show-tooltip"), g.value && o.push("show-split"), k.value && o.push("is-checked"), o.join(" ");
    }), ne = p(() => {
      let o = [];
      return e.containerClass && o.push(e.containerClass), o.join(" ");
    }), R = p(() => {
      let o = String(e.text);
      return o.startsWith("__:") ? De(o.substring(3)) : o;
    }), ie = p(() => typeof m.defaultSplitIcon < "u"), ae = p(() => m.defaultSplitIcon), j = p(() => typeof e.iconDot == "boolean" ? "" : e.iconDot), B = async (o) => {
      u("Resource Click", e.resource, e.resourceData), h.value = !0, a("loading");
      let r = { ...e.resourceData, isChecked: k.value };
      return ye(e.resource, r).then((t) => {
        h.value = !1, a("loaded"), u("Resource Click -> Received response", t), a("click", o, t);
      }).catch((t) => {
        h.value = !1, a("loaded"), u("Resource Click -> Received response error", t), a("click", o, t);
      });
    }, X = s(!1), re = p(() => y.value ? e.tooltip === "lazy" ? X.value : e.tooltip === "ever" ? f.value : e.tooltip === !0 : !1), ue = s(!1), se = p(() => y.value ? e.split === "lazy" ? ue.value : e.split === "ever" ? g.value : e.split === !0 : !1), ce = (o) => {
      if (H.value) {
        H.value = !1, a("focus");
        return;
      }
      a("focus", o);
    }, fe = (o) => a("blur", o), U = p(() => e.type === E.switch || e.type === E.hiddenSwitch || e.showSwitch || e.hiddenSwitch), de = p(() => e.type === E.switch || e.showSwitch), Y = (o) => {
      var r;
      if (u("Click"), o && (U.value ? (r = o.target) != null && r.closest(".lkt-field.is-switch") || (k.value = !k.value) : e.tooltip ? (f.value = !f.value, f.value && (X.value = !0)) : e.split && (g.value = !g.value)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), e.split || e.tooltip) {
        a("click", o, b(e.name, e.value));
        return;
      }
      if (e.modal) {
        let t = { ...e.modalData };
        u("Click -> has modal", e.confirmModal, t), u("Click -> typeof beforeClose: ", typeof t.beforeClose), typeof t.beforeClose == "function" ? (t.beforeClose = (I) => {
          if (e.resource)
            return B(o).then(() => {
              e.modalData.beforeClose(I);
            });
          e.modalData.beforeClose(I), a("click", o, b(e.name, e.value));
        }, u("Click -> New beforeClose function: ", t.beforeClose)) : (t.beforeClose = () => {
          if (e.resource)
            return B(o);
          a("click", o, b(e.name, e.value));
        }, u("Click -> New beforeClose function: ", t.beforeClose));
        let M = e.modal;
        return typeof e.modal == "function" && (M = e.modal()), we(M, e.modalKey, t);
      }
      if (e.confirmModal) {
        if (u("Click -> has confirm modal", e.confirmModal, e.confirmData), u("Click -> typeof onConfirm: ", typeof e.confirmData.onConfirm), typeof e.confirmData.onConfirm == "function") {
          let t = e.confirmData.onConfirm;
          u("Click -> Has onConfirm function: ", t), e.confirmData.onConfirm = () => {
            if (e.resource)
              return B(o).then(() => {
                t();
              });
            t(), a("click", o, b(e.name, e.value));
          }, u("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        } else
          e.confirmData.onConfirm = () => {
            if (e.resource)
              return B(o);
            if (e.onClickTo !== "") {
              o && (o.preventDefault(), o.stopPropagation()), e.onClickToExternal || S.push(e.onClickTo);
              return;
            }
            a("click", o, b(e.name, e.value));
          }, u("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        return be(e.confirmModal, e.confirmModalKey, e.confirmData);
      }
      if (e.resource)
        return u("Click -> has resource"), B(o);
      if (u("Click -> Emit"), e.onClickTo !== "") {
        e.onClickToExternal ? window.location.href = e.onClickTo : S.push(e.onClickTo);
        return;
      }
      if (U.value) {
        he(() => {
          a("click", o, b(e.name, e.value));
        });
        return;
      }
      a("click", o, b(e.name, e.value));
    };
    w(() => e.loading, () => h.value = e.loading), w(() => e.checked, () => k.value = e.checked), w(k, (o) => a("update:checked", o)), w(T, (o) => {
      T.value && e.showTooltipOnHover ? (D.value !== void 0 && clearTimeout(D.value), D.value = setTimeout(() => {
        f.value = !0, clearTimeout(D.value);
      }, e.showTooltipOnHoverDelay)) : !T.value && e.hideTooltipOnLeave ? (f.value = !1, clearTimeout(D.value)) : T.value || clearTimeout(D.value);
    }), z(), x({
      click: () => Y(null),
      focus: (o) => {
        O.value && (o && (H.value = !0), O.value.focus());
      }
    });
    const pe = p(() => e.type === E.content ? "div" : "button");
    return (o, r) => {
      const t = A("lkt-spinner"), M = A("lkt-anchor"), I = A("lkt-field"), q = A("lkt-tooltip");
      return n(), c("div", {
        class: v(["lkt-button-container", ne.value]),
        ref_key: "container",
        ref: y,
        id: te,
        onMousemove: r[3] || (r[3] = (d) => T.value = !0),
        onMouseleave: r[4] || (r[4] = (d) => T.value = !1)
      }, [
        o.isAnchor ? (n(), C(M, {
          key: 0,
          class: "lkt-button",
          href: o.onClickToExternal ? o.onClickTo : "",
          to: o.onClickToExternal ? "" : o.onClickTo,
          download: o.download,
          target: o.newTab ? "_blank" : "",
          "download-file-name": o.downloadFileName,
          imposter: ""
        }, {
          default: V(() => [
            o.icon ? (n(), c("i", {
              key: 0,
              class: v(o.icon)
            }, null, 2)) : i("", !0),
            o.icon && o.iconDot ? (n(), c("i", Re, F(j.value), 1)) : i("", !0),
            o.img ? (n(), c("img", {
              key: 2,
              src: o.img,
              alt: R.value
            }, null, 8, Ee)) : i("", !0),
            R.value ? (n(), c(G, { key: 3 }, [
              J(F(R.value), 1)
            ], 64)) : i("", !0),
            Q(K).default ? N(o.$slots, "default", { key: 4 }) : i("", !0),
            h.value ? (n(), C(t, { key: 5 })) : i("", !0)
          ]),
          _: 3
        }, 8, ["href", "to", "download", "target", "download-file-name"])) : (n(), C(Z(pe.value), {
          key: 1,
          class: v(["lkt-button", le.value]),
          ref_key: "button",
          ref: O,
          name: o.name,
          type: o.type,
          disabled: o.disabled,
          tabindex: o.tabindex,
          onClick: Y,
          onFocus: ce,
          onBlur: fe
        }, {
          default: V(() => [
            o.icon ? (n(), c("i", {
              key: 0,
              class: v(o.icon)
            }, null, 2)) : i("", !0),
            o.icon && o.iconDot ? (n(), c("i", Se, F(j.value), 1)) : i("", !0),
            o.img ? (n(), c("img", {
              key: 2,
              src: o.img,
              alt: R.value
            }, null, 8, Be)) : i("", !0),
            R.value ? (n(), c(G, { key: 3 }, [
              J(F(R.value), 1)
            ], 64)) : i("", !0),
            Q(K).default ? N(o.$slots, "default", { key: 4 }) : i("", !0),
            h.value ? (n(), C(t, { key: 5 })) : i("", !0),
            U.value ? ve((n(), C(I, {
              key: 6,
              type: "switch",
              modelValue: k.value,
              "onUpdate:modelValue": r[0] || (r[0] = (d) => k.value = d)
            }, null, 8, ["modelValue"])), [
              [Ce, de.value]
            ]) : i("", !0),
            o.iconEnd ? (n(), c("i", {
              key: 7,
              class: v([o.iconEnd, "lkt-button-icon-end"])
            }, null, 2)) : i("", !0),
            o.split ? (n(), c("div", Le, [
              o.splitIcon ? (n(), c("i", {
                key: 0,
                class: v(o.splitIcon)
              }, null, 2)) : ie.value ? (n(), C(Z(ae.value), { key: 1 })) : i("", !0)
            ])) : i("", !0)
          ]),
          _: 3
        }, 40, ["class", "name", "type", "disabled", "tabindex"])),
        o.split && y.value ? (n(), C(q, {
          key: 2,
          modelValue: g.value,
          "onUpdate:modelValue": r[1] || (r[1] = (d) => g.value = d),
          referrer: y.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: v(["lkt-split-button-dropdown-content", o.splitClass]),
          engine: o.tooltipEngine
        }, $({ _: 2 }, [
          se.value ? {
            name: "default",
            fn: V(({ doClose: d, doRootClick: P }) => [
              N(o.$slots, "split", {
                doClose: d,
                doRootClick: P
              })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "engine"])) : i("", !0),
        o.tooltip && y.value ? (n(), C(q, {
          key: 3,
          modelValue: f.value,
          "onUpdate:modelValue": r[2] || (r[2] = (d) => f.value = d),
          referrer: y.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: v(o.tooltipClass),
          "location-x": o.tooltipLocationX,
          "location-y": o.tooltipLocationY,
          engine: o.tooltipEngine
        }, $({ _: 2 }, [
          re.value ? {
            name: "default",
            fn: V(({ doClose: d, doRootClick: P }) => [
              N(o.$slots, "tooltip", {
                doClose: d,
                doRootClick: P
              })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "location-x", "location-y", "engine"])) : i("", !0)
      ], 34);
    };
  }
}), We = {
  install: (l) => {
    l.component("lkt-button") === void 0 && l.component("lkt-button", Me);
  }
}, ze = (l) => {
  m.defaultSplitIcon = l;
};
export {
  Ke as debugLktButton,
  We as default,
  Pe as setDefaultButtonPalette,
  ze as setDefaultButtonSplitSlot
};
