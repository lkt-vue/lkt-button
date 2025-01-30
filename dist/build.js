import { defineComponent as de, useSlots as pe, ref as s, watch as b, computed as p, resolveComponent as I, openBlock as l, createElementBlock as f, normalizeClass as v, createBlock as C, withCtx as A, createCommentVNode as a, toDisplayString as V, Fragment as q, createTextVNode as G, unref as J, renderSlot as F, resolveDynamicComponent as Q, withDirectives as me, vShow as ke, createSlots as Z } from "vue";
import { createLktEvent as R } from "lkt-events";
import { generateRandomString as $ } from "lkt-string-tools";
import { httpCall as ve } from "lkt-http-client";
import { openModal as Ce } from "lkt-modal";
import { openConfirm as he } from "lkt-modal-confirm";
import { useRouter as ye, useRoute as be } from "vue-router";
import { __ as we } from "lkt-i18n";
var U = /* @__PURE__ */ ((n) => (n.button = "button", n.submit = "submit", n.reset = "reset", n.content = "content", n))(U || {});
const B = class B {
};
B.DEFAULT_PALETTE = "", B.debugEnabled = !1, B.defaultSplitIcon = void 0;
let m = B;
const Oe = (n) => {
  m.DEFAULT_PALETTE = n;
}, He = (n = !0) => {
  m.debugEnabled = n;
}, u = (...n) => {
  m.debugEnabled && console.info("[LktButton] ", ...n);
}, ge = {
  key: 1,
  class: "lkt-button--icon-dot"
}, Te = ["src", "alt"], De = {
  key: 1,
  class: "lkt-button--icon-dot"
}, Re = ["src", "alt"], Ee = {
  key: 8,
  class: "lkt-split-button-arrow"
}, Se = /* @__PURE__ */ de({
  __name: "LktButton",
  props: {
    type: { default: U.button },
    name: { default: $(10) },
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
  setup(n, { expose: _, emit: x }) {
    const o = n, i = x, P = pe(), E = ye(), ee = be(), oe = "lkt-button-" + $(), h = s(o.loading), y = s(null), N = s(null), w = s(!1), c = s(o.openTooltip), K = s(!1), g = s(!1), T = s(void 0), k = s(o.checked), O = s(!1);
    b(() => o.openTooltip, (e) => c.value = e), b(c, (e) => i("update:openTooltip", e));
    const W = () => {
      if (!o.onClickTo) return;
      let e = E == null ? void 0 : E.currentRoute;
      K.value = e.value.path === o.onClickTo;
    };
    b(ee, (e) => {
      W();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const te = p(() => {
      let e = [];
      return o.class && e.push(o.class), o.split && e.push("lkt-split-button"), o.palette && e.push(`lkt-button--${o.palette}`, `palette--${o.palette}`), h.value && e.push("is-loading"), K.value && e.push("is-active-route"), c.value && e.push("show-tooltip"), w.value && e.push("show-split"), k.value && e.push("is-checked"), e.join(" ");
    }), le = p(() => {
      let e = [];
      return o.containerClass && e.push(o.containerClass), e.join(" ");
    }), D = p(() => {
      let e = String(o.text);
      return e.startsWith("__:") ? we(e.substring(3)) : e;
    }), ne = p(() => typeof m.defaultSplitIcon < "u"), ae = p(() => m.defaultSplitIcon), z = p(() => typeof o.iconDot == "boolean" ? "" : o.iconDot), S = async (e) => {
      u("Resource Click", o.resource, o.resourceData), h.value = !0, i("loading");
      let r = { ...o.resourceData, isChecked: k.value };
      return ve(o.resource, r).then((t) => {
        h.value = !1, i("loaded"), u("Resource Click -> Received response", t), i("click", e, t);
      }).catch((t) => {
        h.value = !1, i("loaded"), u("Resource Click -> Received response error", t), i("click", e, t);
      });
    }, j = s(!1), ie = p(() => y.value ? o.tooltip === "lazy" ? j.value : o.tooltip === "ever" ? c.value : o.tooltip === !0 : !1), re = s(!1), ue = p(() => y.value ? o.split === "lazy" ? re.value : o.split === "ever" ? w.value : o.split === !0 : !1), se = (e) => {
      if (O.value) {
        O.value = !1, i("focus");
        return;
      }
      i("focus", e);
    }, fe = (e) => i("blur", e), X = (e) => {
      var r;
      if (u("Click"), e && (o.showSwitch || o.hiddenSwitch ? (r = e.target) != null && r.closest(".lkt-field.is-switch") || (k.value = !k.value) : o.tooltip ? (c.value = !c.value, c.value && (j.value = !0)) : o.split && (w.value = !w.value)), typeof o.clickRef < "u" && (o.clickRef instanceof Element || o.clickRef && o.clickRef && typeof o.clickRef == "function") && o.clickRef.click(), o.split || o.tooltip) {
        i("click", e, R(o.name, o.value));
        return;
      }
      if (o.modal) {
        let t = { ...o.modalData };
        u("Click -> has modal", o.confirmModal, t), u("Click -> typeof beforeClose: ", typeof t.beforeClose), typeof t.beforeClose == "function" ? (t.beforeClose = (M) => {
          if (o.resource)
            return S(e).then(() => {
              o.modalData.beforeClose(M);
            });
          o.modalData.beforeClose(M), i("click", e, R(o.name, o.value));
        }, u("Click -> New beforeClose function: ", t.beforeClose)) : (t.beforeClose = () => {
          if (o.resource)
            return S(e);
          i("click", e, R(o.name, o.value));
        }, u("Click -> New beforeClose function: ", t.beforeClose));
        let L = o.modal;
        return typeof o.modal == "function" && (L = o.modal()), Ce(L, o.modalKey, t);
      }
      if (o.confirmModal) {
        if (u("Click -> has confirm modal", o.confirmModal, o.confirmData), u("Click -> typeof onConfirm: ", typeof o.confirmData.onConfirm), typeof o.confirmData.onConfirm == "function") {
          let t = o.confirmData.onConfirm;
          u("Click -> Has onConfirm function: ", t), o.confirmData.onConfirm = () => {
            if (o.resource)
              return S(e).then(() => {
                t();
              });
            t(), i("click", e, R(o.name, o.value));
          }, u("Click -> New onConfirm function: ", o.confirmData.onConfirm);
        } else
          o.confirmData.onConfirm = () => {
            if (o.resource)
              return S(e);
            if (o.onClickTo !== "") {
              e && (e.preventDefault(), e.stopPropagation()), o.onClickToExternal || E.push(o.onClickTo);
              return;
            }
            i("click", e, R(o.name, o.value));
          }, u("Click -> New onConfirm function: ", o.confirmData.onConfirm);
        return he(o.confirmModal, o.confirmModalKey, o.confirmData);
      }
      if (o.resource)
        return u("Click -> has resource"), S(e);
      if (u("Click -> Emit"), o.onClickTo !== "") {
        o.onClickToExternal ? window.location.href = o.onClickTo : E.push(o.onClickTo);
        return;
      }
      i("click", e, R(o.name, o.value));
    };
    b(() => o.loading, () => h.value = o.loading), b(() => o.checked, () => k.value = o.checked), b(k, (e) => i("update:checked", e)), b(g, (e) => {
      g.value && o.showTooltipOnHover ? (T.value !== void 0 && clearTimeout(T.value), T.value = setTimeout(() => {
        c.value = !0, clearTimeout(T.value);
      }, o.showTooltipOnHoverDelay)) : !g.value && o.hideTooltipOnLeave ? (c.value = !1, clearTimeout(T.value)) : g.value || clearTimeout(T.value);
    }), W(), _({
      click: () => X(null),
      focus: (e) => {
        N.value && (e && (O.value = !0), N.value.focus());
      }
    });
    const ce = p(() => o.type === U.content ? "div" : "button");
    return (e, r) => {
      const t = I("lkt-spinner"), L = I("lkt-anchor"), M = I("lkt-field"), Y = I("lkt-tooltip");
      return l(), f("div", {
        class: v(["lkt-button-container", le.value]),
        ref_key: "container",
        ref: y,
        id: oe,
        onMousemove: r[3] || (r[3] = (d) => g.value = !0),
        onMouseleave: r[4] || (r[4] = (d) => g.value = !1)
      }, [
        e.isAnchor ? (l(), C(L, {
          key: 0,
          class: "lkt-button",
          href: e.onClickToExternal ? e.onClickTo : "",
          to: e.onClickToExternal ? "" : e.onClickTo,
          download: e.download,
          target: e.newTab ? "_blank" : "",
          "download-file-name": e.downloadFileName,
          imposter: ""
        }, {
          default: A(() => [
            e.icon ? (l(), f("i", {
              key: 0,
              class: v(e.icon)
            }, null, 2)) : a("", !0),
            e.icon && e.iconDot ? (l(), f("i", ge, V(z.value), 1)) : a("", !0),
            e.img ? (l(), f("img", {
              key: 2,
              src: e.img,
              alt: D.value
            }, null, 8, Te)) : a("", !0),
            D.value ? (l(), f(q, { key: 3 }, [
              G(V(D.value), 1)
            ], 64)) : a("", !0),
            J(P).default ? F(e.$slots, "default", { key: 4 }) : a("", !0),
            h.value ? (l(), C(t, { key: 5 })) : a("", !0)
          ]),
          _: 3
        }, 8, ["href", "to", "download", "target", "download-file-name"])) : (l(), C(Q(ce.value), {
          key: 1,
          class: v(["lkt-button", te.value]),
          ref_key: "button",
          ref: N,
          name: e.name,
          type: e.type,
          disabled: e.disabled,
          tabindex: e.tabindex,
          onClick: X,
          onFocus: se,
          onBlur: fe
        }, {
          default: A(() => [
            e.icon ? (l(), f("i", {
              key: 0,
              class: v(e.icon)
            }, null, 2)) : a("", !0),
            e.icon && e.iconDot ? (l(), f("i", De, V(z.value), 1)) : a("", !0),
            e.img ? (l(), f("img", {
              key: 2,
              src: e.img,
              alt: D.value
            }, null, 8, Re)) : a("", !0),
            D.value ? (l(), f(q, { key: 3 }, [
              G(V(D.value), 1)
            ], 64)) : a("", !0),
            J(P).default ? F(e.$slots, "default", { key: 4 }) : a("", !0),
            h.value ? (l(), C(t, { key: 5 })) : a("", !0),
            e.showSwitch || e.hiddenSwitch ? me((l(), C(M, {
              key: 6,
              type: "switch",
              modelValue: k.value,
              "onUpdate:modelValue": r[0] || (r[0] = (d) => k.value = d)
            }, null, 8, ["modelValue"])), [
              [ke, !e.hiddenSwitch]
            ]) : a("", !0),
            e.iconEnd ? (l(), f("i", {
              key: 7,
              class: v([e.iconEnd, "lkt-button-icon-end"])
            }, null, 2)) : a("", !0),
            e.split ? (l(), f("div", Ee, [
              e.splitIcon ? (l(), f("i", {
                key: 0,
                class: v(e.splitIcon)
              }, null, 2)) : ne.value ? (l(), C(Q(ae.value), { key: 1 })) : a("", !0)
            ])) : a("", !0)
          ]),
          _: 3
        }, 40, ["class", "name", "type", "disabled", "tabindex"])),
        e.split && y.value ? (l(), C(Y, {
          key: 2,
          modelValue: w.value,
          "onUpdate:modelValue": r[1] || (r[1] = (d) => w.value = d),
          referrer: y.value,
          "window-margin": e.tooltipWindowMargin,
          "referrer-margin": e.tooltipReferrerMargin,
          class: v(["lkt-split-button-dropdown-content", e.splitClass]),
          engine: e.tooltipEngine
        }, Z({ _: 2 }, [
          ue.value ? {
            name: "default",
            fn: A(({ doClose: d, doRootClick: H }) => [
              F(e.$slots, "split", {
                doClose: d,
                doRootClick: H
              })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "engine"])) : a("", !0),
        e.tooltip && y.value ? (l(), C(Y, {
          key: 3,
          modelValue: c.value,
          "onUpdate:modelValue": r[2] || (r[2] = (d) => c.value = d),
          referrer: y.value,
          "window-margin": e.tooltipWindowMargin,
          "referrer-margin": e.tooltipReferrerMargin,
          class: v(e.tooltipClass),
          "location-x": e.tooltipLocationX,
          "location-y": e.tooltipLocationY,
          engine: e.tooltipEngine
        }, Z({ _: 2 }, [
          ie.value ? {
            name: "default",
            fn: A(({ doClose: d, doRootClick: H }) => [
              F(e.$slots, "tooltip", {
                doClose: d,
                doRootClick: H
              })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "location-x", "location-y", "engine"])) : a("", !0)
      ], 34);
    };
  }
}), Ue = {
  install: (n) => {
    n.component("lkt-button") === void 0 && n.component("lkt-button", Se);
  }
}, Pe = (n) => {
  m.defaultSplitIcon = n;
};
export {
  He as debugLktButton,
  Ue as default,
  Oe as setDefaultButtonPalette,
  Pe as setDefaultButtonSplitSlot
};
