import { defineComponent as Be, mergeDefaults as Se, useSlots as De, ref as p, watch as E, computed as u, resolveComponent as P, createElementBlock as d, openBlock as l, normalizeClass as h, createBlock as b, createCommentVNode as i, mergeProps as Re, withCtx as z, renderSlot as K, unref as A, toDisplayString as U, Fragment as te, createTextVNode as le, resolveDynamicComponent as ne, withDirectives as Ee, vShow as Ie, createSlots as ie, nextTick as Le } from "vue";
import { generateRandomString as Me } from "lkt-string-tools";
import { httpCall as Ae } from "lkt-http-client";
import { openModal as Ve, openConfirm as Fe } from "lkt-modal";
import { useRouter as Oe } from "vue-router";
import { extractPropValue as G, extractI18nValue as He, ButtonType as a, Anchor as Ne, getDefaultValues as Pe, Button as ze, LktSettings as re } from "lkt-vue-kernel";
const V = class V {
};
V.DEFAULT_PALETTE = "", V.debugEnabled = !1, V.defaultSplitIcon = void 0;
let g = V;
const xe = (f) => {
  g.DEFAULT_PALETTE = f;
}, $e = (f = !0) => {
  g.debugEnabled = f;
}, n = (...f) => {
  g.debugEnabled && console.info("[LktButton] ", ...f);
}, Ke = {
  key: 1,
  class: "lkt-button--icon-dot"
}, Ue = ["src", "alt"], je = {
  key: 1,
  class: "lkt-button--icon-dot"
}, We = ["src", "alt"], Xe = {
  key: 8,
  class: "lkt-split-button-arrow"
}, Ye = /* @__PURE__ */ Be({
  __name: "LktButton",
  props: /* @__PURE__ */ Se({
    type: {},
    checked: { type: Boolean },
    openTooltip: { type: Boolean },
    name: {},
    text: {},
    icon: {},
    class: {},
    containerClass: {},
    palette: {},
    value: {},
    disabled: { type: [Boolean, Function] },
    loading: { type: Boolean },
    wrapContent: { type: Boolean },
    anchor: {},
    resource: {},
    resourceData: {},
    modal: { type: [String, Function] },
    modalKey: { type: [String, Function] },
    modalData: {},
    confirmModal: { type: [String, Function] },
    confirmModalKey: { type: [String, Function] },
    confirmData: {},
    iconDot: { type: [Boolean, String, Number] },
    iconEnd: {},
    img: {},
    splitIcon: {},
    tooltipEngine: {},
    showTooltipOnHover: { type: Boolean },
    showTooltipOnHoverDelay: {},
    hideTooltipOnLeave: { type: Boolean },
    tooltipWindowMargin: {},
    tooltipReferrerMargin: {},
    tooltipClass: {},
    tooltipLocationY: {},
    tooltipLocationX: {},
    splitClass: {},
    clickRef: {},
    tabindex: {},
    prop: {},
    onClick: { type: Function },
    onConfirm: { type: Function }
  }, Pe(ze)),
  emits: ["click", "focus", "blur", "loading", "loaded", "update:checked", "update:openTooltip"],
  setup(f, { expose: ae, emit: ue }) {
    const e = f, r = ue, J = De(), Q = Oe();
    let F = G(e.modal, e.prop), ce = G(e.modalKey, e.prop), j = G(e.icon, e.prop);
    const se = "lkt-button-" + Me(), w = p(e.loading), T = p(null), W = p(null), B = p(!1), m = p(e.openTooltip), Z = p(!1), S = p(!1), D = p(void 0), y = p(e.checked), X = p(!1);
    E(() => e.openTooltip, (o) => m.value = o), E(m, (o) => r("update:openTooltip", o));
    const _ = u(() => {
      let o = [];
      return e.class && o.push(e.class), L.value && o.push("lkt-split-button"), e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), o.push(`lkt-button--${e.type}`), w.value && o.push("is-loading"), Z.value && o.push("is-active-route"), m.value && o.push("show-tooltip"), B.value && o.push("show-split"), y.value && o.push("is-checked"), o.join(" ");
    }), fe = u(() => {
      let o = [];
      return e.containerClass && o.push(e.containerClass), o.join(" ");
    }), R = u(() => He(e.text)), pe = u(() => typeof g.defaultSplitIcon < "u"), de = u(() => g.defaultSplitIcon), x = u(() => typeof e.iconDot == "boolean" ? "" : e.iconDot), I = async (o) => {
      n("Resource Click", e.resource, e.resourceData), w.value = !0, r("loading");
      let c = { ...e.resourceData, isChecked: y.value };
      return Ae(e.resource, c).then((k) => {
        w.value = !1, r("loaded"), n("Resource Click -> Received response", k), C(), r("click", o, k);
      }).catch((k) => {
        w.value = !1, r("loaded"), n("Resource Click -> Received response error", k), C(), r("click", o, k);
      });
    }, $ = p(!1), me = u(() => T.value ? e.type === a.TooltipLazy ? $.value : e.type === a.TooltipEver ? m.value : e.type === a.Tooltip : !1), ke = p(!1), ve = u(() => T.value ? e.type === a.SplitLazy ? ke.value : e.type === a.SplitEver ? B.value : e.type === a.Split : !1), ye = (o) => {
      if (X.value) {
        X.value = !1, r("focus");
        return;
      }
      r("focus", o);
    }, Ce = (o) => {
      r("blur", o);
    }, Y = u(() => e.type === a.Switch || e.type === a.HiddenSwitch), he = u(() => e.type === a.Switch), C = () => {
      n("doConfigClick: ", e), typeof e.onClick == "function" && e.onClick();
    }, L = u(() => [
      a.Split,
      a.SplitLazy,
      a.SplitEver
    ].includes(e.type)), q = u(() => [
      a.Tooltip,
      a.TooltipLazy,
      a.TooltipEver
    ].includes(e.type)), ee = (o) => {
      var c, k, O, H, M, s;
      if (n("Click", e), o && (Y.value ? (c = o.target) != null && c.closest(".lkt-field.is-switch") || (y.value = !y.value) : q.value ? (m.value = !m.value, m.value && ($.value = !0)) : L.value && (B.value = !B.value)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), L.value || q.value) {
        C(), r("click", o);
        return;
      }
      if (F) {
        let t = { ...e.modalData };
        n("Click -> has modal", e.modal, t), n("Click -> typeof beforeClose: ", typeof t.beforeClose), typeof t.beforeClose == "function" ? (t.beforeClose = (N) => {
          if (e.resource)
            return I(o).then(() => {
              N.beforeClose(N);
            });
          N.beforeClose(N), C(), r("click", o);
        }, n("Click -> New beforeClose function: ", t.beforeClose)) : (t.beforeClose = () => {
          if (e.resource)
            return I(o);
          C(), r("click", o);
        }, n("Click -> New beforeClose function: ", t.beforeClose));
        let v = F;
        return typeof F == "function" && (v = F()), Ve(v, ce, t);
      }
      if (e.confirmModal) {
        n("Click -> has confirm modal", e.confirmModal, e.confirmData), n("Click -> typeof onConfirm: ", typeof e.confirmData.onConfirm);
        let t = { ...e.confirmData };
        if (t.confirmButton ? t.confirmButton = { ...re.defaultConfirmButton, ...t.confirmButton } : t.confirmButton = { ...re.defaultConfirmButton }, typeof ((k = t.confirmButton) == null ? void 0 : k.onClick) == "function") {
          let v = (O = t.confirmButton) == null ? void 0 : O.onClick;
          n("Click -> Has onConfirm function: ", v), t.confirmButton.onClick = () => {
            if (n("OnConfirm -> Already: ", e), e.resource)
              return I(o).then(() => {
                v();
              });
            v(), C(), r("click", o);
          }, n("Click -> New onConfirm function created: ", (H = t.confirmButton) == null ? void 0 : H.onClick);
        } else
          t.confirmButton.onClick = () => {
            var v;
            if (n("OnConfirm -> Created: ", e), e.resource)
              return I(o);
            if (((v = e.anchor) == null ? void 0 : v.to) !== "") {
              o && (o.preventDefault(), o.stopPropagation()), e.anchor.external || typeof e.anchor.to < "u" && Q.push(e.anchor.to);
              return;
            }
            C(), r("click", o);
          }, n("Click -> New onConfirm function created: ", (M = t.confirmButton) == null ? void 0 : M.onClick);
        return Fe(e.confirmModal, e.confirmModalKey, t);
      }
      if (e.resource)
        return n("Click -> has resource"), I(o);
      if (((s = e.anchor) == null ? void 0 : s.to) !== "") {
        n("Click -> Is Anchor", e.anchor), e.anchor.external ? typeof e.anchor.to == "string" && (window.location.href = e.anchor.to) : typeof e.anchor.to < "u" && Q.push(e.anchor.to);
        return;
      }
      if (Y.value) {
        n("Click -> Is Switch"), Le(() => {
          C(), r("click", o);
        });
        return;
      }
      n("Click -> Emit", e), r("click", o);
    };
    E(() => e.loading, () => w.value = e.loading), E(() => e.checked, () => y.value = e.checked), E(y, (o) => r("update:checked", o)), E(S, (o) => {
      S.value && e.showTooltipOnHover ? (D.value !== void 0 && clearTimeout(D.value), D.value = setTimeout(() => {
        m.value = !0, clearTimeout(D.value);
      }, e.showTooltipOnHoverDelay)) : !S.value && e.hideTooltipOnLeave ? (m.value = !1, clearTimeout(D.value)) : S.value || clearTimeout(D.value);
    }), ae({
      click: () => ee(null),
      focus: (o) => {
        W.value && (o && (X.value = !0), W.value.focus());
      }
    });
    const be = u(() => e.type === a.Content ? "div" : "button"), ge = u(() => e.disabled === void 0 ? !1 : typeof e.disabled == "function" ? e.disabled({}) : typeof e.disabled == "boolean" ? e.disabled : !1), we = (o) => Z.value = o, oe = u(() => e.type === a.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), Te = u(() => oe.value ? new Ne({ ...e.anchor, class: _.value }) : {});
    return (o, c) => {
      const k = P("lkt-spinner"), O = P("lkt-anchor"), H = P("lkt-field"), M = P("lkt-tooltip");
      return l(), d("div", {
        class: h(["lkt-button-container", fe.value]),
        ref_key: "container",
        ref: T,
        id: se,
        onMousemove: c[3] || (c[3] = (s) => S.value = !0),
        onMouseleave: c[4] || (c[4] = (s) => S.value = !1)
      }, [
        oe.value ? (l(), b(O, Re({ key: 0 }, Te.value, {
          class: "lkt-button",
          onActive: we
        }), {
          default: z(() => [
            A(j) ? (l(), d("i", {
              key: 0,
              class: h(A(j))
            }, null, 2)) : i("", !0),
            A(j) && o.iconDot ? (l(), d("i", Ke, U(x.value), 1)) : i("", !0),
            o.img ? (l(), d("img", {
              key: 2,
              src: o.img,
              alt: R.value
            }, null, 8, Ue)) : i("", !0),
            R.value ? (l(), d(te, { key: 3 }, [
              le(U(R.value), 1)
            ], 64)) : i("", !0),
            A(J).default ? K(o.$slots, "default", { key: 4 }) : i("", !0),
            w.value ? (l(), b(k, { key: 5 })) : i("", !0)
          ]),
          _: 3
        }, 16)) : (l(), b(ne(be.value), {
          key: 1,
          class: h(["lkt-button", _.value]),
          ref_key: "button",
          ref: W,
          name: o.name,
          type: o.type,
          disabled: ge.value,
          tabindex: o.tabindex,
          onClick: ee,
          onFocus: ye,
          onBlur: Ce
        }, {
          default: z(() => [
            o.icon ? (l(), d("i", {
              key: 0,
              class: h(o.icon)
            }, null, 2)) : i("", !0),
            o.icon && o.iconDot ? (l(), d("i", je, U(x.value), 1)) : i("", !0),
            o.img ? (l(), d("img", {
              key: 2,
              src: o.img,
              alt: R.value
            }, null, 8, We)) : i("", !0),
            R.value ? (l(), d(te, { key: 3 }, [
              le(U(R.value), 1)
            ], 64)) : i("", !0),
            A(J).default ? K(o.$slots, "default", { key: 4 }) : i("", !0),
            w.value ? (l(), b(k, { key: 5 })) : i("", !0),
            Y.value ? Ee((l(), b(H, {
              key: 6,
              type: "switch",
              modelValue: y.value,
              "onUpdate:modelValue": c[0] || (c[0] = (s) => y.value = s)
            }, null, 8, ["modelValue"])), [
              [Ie, he.value]
            ]) : i("", !0),
            o.iconEnd ? (l(), d("i", {
              key: 7,
              class: h([o.iconEnd, "lkt-button-icon-end"])
            }, null, 2)) : i("", !0),
            L.value ? (l(), d("div", Xe, [
              o.splitIcon ? (l(), d("i", {
                key: 0,
                class: h(o.splitIcon)
              }, null, 2)) : pe.value ? (l(), b(ne(de.value), { key: 1 })) : i("", !0)
            ])) : i("", !0)
          ]),
          _: 3
        }, 40, ["class", "name", "type", "disabled", "tabindex"])),
        L.value && T.value ? (l(), b(M, {
          key: 2,
          modelValue: B.value,
          "onUpdate:modelValue": c[1] || (c[1] = (s) => B.value = s),
          referrer: T.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: h(["lkt-split-button-dropdown-content", o.splitClass]),
          engine: o.tooltipEngine
        }, ie({ _: 2 }, [
          ve.value ? {
            name: "default",
            fn: z(({ doClose: s, doRootClick: t }) => [
              K(o.$slots, "split", {
                doClose: s,
                doRootClick: t
              })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "engine"])) : i("", !0),
        q.value && T.value ? (l(), b(M, {
          key: 3,
          modelValue: m.value,
          "onUpdate:modelValue": c[2] || (c[2] = (s) => m.value = s),
          referrer: T.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: h(o.tooltipClass),
          "location-x": o.tooltipLocationX,
          "location-y": o.tooltipLocationY,
          engine: o.tooltipEngine
        }, ie({ _: 2 }, [
          me.value ? {
            name: "default",
            fn: z(({ doClose: s, doRootClick: t }) => [
              K(o.$slots, "tooltip", {
                doClose: s,
                doRootClick: t
              })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "location-x", "location-y", "engine"])) : i("", !0)
      ], 34);
    };
  }
}), eo = {
  install: (f) => {
    f.component("lkt-button") === void 0 && f.component("lkt-button", Ye);
  }
}, oo = (f) => {
  g.defaultSplitIcon = f;
};
export {
  $e as debugLktButton,
  eo as default,
  xe as setDefaultButtonPalette,
  oo as setDefaultButtonSplitSlot
};
