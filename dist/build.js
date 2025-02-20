import { defineComponent as Se, mergeDefaults as De, useSlots as Re, ref as p, watch as I, computed as u, resolveComponent as z, createElementBlock as d, openBlock as l, normalizeClass as b, createBlock as g, createCommentVNode as i, mergeProps as Ee, withCtx as K, renderSlot as U, unref as V, toDisplayString as j, Fragment as le, createTextVNode as ne, resolveDynamicComponent as ie, withDirectives as Ie, vShow as Le, createSlots as ae, nextTick as Me } from "vue";
import { generateRandomString as Ae } from "lkt-string-tools";
import { httpCall as Ve } from "lkt-http-client";
import { openModal as Fe, openConfirm as Oe, runModalCallback as Ne } from "lkt-modal";
import { useRouter as He } from "vue-router";
import { extractPropValue as J, extractI18nValue as Pe, ButtonType as r, Anchor as ze, getDefaultValues as Ke, Button as Ue, LktSettings as re } from "lkt-vue-kernel";
const F = class F {
};
F.DEFAULT_PALETTE = "", F.debugEnabled = !1, F.defaultSplitIcon = void 0;
let w = F;
const eo = (f) => {
  w.DEFAULT_PALETTE = f;
}, oo = (f = !0) => {
  w.debugEnabled = f;
}, n = (...f) => {
  w.debugEnabled && console.info("[LktButton] ", ...f);
}, je = {
  key: 1,
  class: "lkt-button--icon-dot"
}, We = ["src", "alt"], Xe = {
  key: 1,
  class: "lkt-button--icon-dot"
}, Ye = ["src", "alt"], qe = {
  key: 8,
  class: "lkt-split-button-arrow"
}, Ge = /* @__PURE__ */ Se({
  __name: "LktButton",
  props: /* @__PURE__ */ De({
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
    modalKey: { type: [String, Number, Function] },
    modalData: {},
    confirmModal: { type: [String, Function] },
    confirmModalKey: { type: [String, Number, Function] },
    confirmData: {},
    modalCallbacks: {},
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
  }, Ke(Ue)),
  emits: ["click", "focus", "blur", "loading", "loaded", "update:checked", "update:openTooltip"],
  setup(f, { expose: ue, emit: ce }) {
    const e = f, a = ce, Q = Re(), Z = He();
    let O = J(e.modal, e.prop), se = J(e.modalKey, e.prop), W = J(e.icon, e.prop);
    const fe = "lkt-button-" + Ae(), T = p(e.loading), B = p(null), X = p(null), S = p(!1), m = p(e.openTooltip), _ = p(!1), D = p(!1), R = p(void 0), y = p(e.checked), Y = p(!1);
    I(() => e.openTooltip, (o) => m.value = o), I(m, (o) => a("update:openTooltip", o));
    const x = u(() => {
      let o = [];
      return e.class && o.push(e.class), M.value && o.push("lkt-split-button"), e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), o.push(`lkt-button--${e.type}`), T.value && o.push("is-loading"), _.value && o.push("is-active-route"), m.value && o.push("show-tooltip"), S.value && o.push("show-split"), y.value && o.push("is-checked"), o.join(" ");
    }), pe = u(() => {
      let o = [];
      return e.containerClass && o.push(e.containerClass), o.join(" ");
    }), E = u(() => Pe(e.text)), de = u(() => typeof w.defaultSplitIcon < "u"), me = u(() => w.defaultSplitIcon), $ = u(() => typeof e.iconDot == "boolean" ? "" : e.iconDot), L = async (o) => {
      n("Resource Click", e.resource, e.resourceData), T.value = !0, a("loading");
      let c = { ...e.resourceData, isChecked: y.value };
      return Ve(e.resource, c).then((k) => {
        T.value = !1, a("loaded"), n("Resource Click -> Received response", k), C(), h(), a("click", o, k);
      }).catch((k) => {
        T.value = !1, a("loaded"), n("Resource Click -> Received response error", k), C(), h(), a("click", o, k);
      });
    }, ee = p(!1), ke = u(() => B.value ? e.type === r.TooltipLazy ? ee.value : e.type === r.TooltipEver ? m.value : e.type === r.Tooltip : !1), ve = p(!1), ye = u(() => B.value ? e.type === r.SplitLazy ? ve.value : e.type === r.SplitEver ? S.value : e.type === r.Split : !1), Ce = (o) => {
      if (Y.value) {
        Y.value = !1, a("focus");
        return;
      }
      a("focus", o);
    }, he = (o) => {
      a("blur", o);
    }, q = u(() => e.type === r.Switch || e.type === r.HiddenSwitch), be = u(() => e.type === r.Switch), C = () => {
      e.modalCallbacks.forEach((o) => {
        Ne(o);
      });
    }, h = () => {
      n("doConfigClick: ", e), typeof e.onClick == "function" && e.onClick();
    }, M = u(() => [
      r.Split,
      r.SplitLazy,
      r.SplitEver
    ].includes(e.type)), G = u(() => [
      r.Tooltip,
      r.TooltipLazy,
      r.TooltipEver
    ].includes(e.type)), oe = (o) => {
      var c, k, N, H, A, s;
      if (n("Click", e), o && (q.value ? (c = o.target) != null && c.closest(".lkt-field.is-switch") || (y.value = !y.value) : G.value ? (m.value = !m.value, m.value && (ee.value = !0)) : M.value && (S.value = !S.value)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), M.value || G.value) {
        C(), h(), a("click", o);
        return;
      }
      if (O) {
        let t = { ...e.modalData };
        n("Click -> has modal", e.modal, t), n("Click -> typeof beforeClose: ", typeof t.beforeClose), typeof t.beforeClose == "function" ? (t.beforeClose = (P) => {
          if (e.resource)
            return L(o).then(() => {
              P.beforeClose(P);
            });
          P.beforeClose(P), C(), h(), a("click", o);
        }, n("Click -> New beforeClose function: ", t.beforeClose)) : (t.beforeClose = () => {
          if (e.resource)
            return L(o);
          C(), h(), a("click", o);
        }, n("Click -> New beforeClose function: ", t.beforeClose));
        let v = O;
        return typeof O == "function" && (v = O()), Fe(v, se, t);
      }
      if (e.confirmModal) {
        n("Click -> has confirm modal", e.confirmModal, e.confirmData), n("Click -> typeof onConfirm: ", typeof e.confirmData.onConfirm);
        let t = { ...e.confirmData };
        if (t.confirmButton ? t.confirmButton = { ...re.defaultConfirmButton, ...t.confirmButton } : t.confirmButton = { ...re.defaultConfirmButton }, typeof ((k = t.confirmButton) == null ? void 0 : k.onClick) == "function") {
          let v = (N = t.confirmButton) == null ? void 0 : N.onClick;
          n("Click -> Has onConfirm function: ", v), t.confirmButton.onClick = () => {
            if (n("OnConfirm -> Already: ", e), e.resource)
              return L(o).then(() => {
                v();
              });
            v(), C(), h(), a("click", o);
          }, n("Click -> New onConfirm function created: ", (H = t.confirmButton) == null ? void 0 : H.onClick);
        } else
          t.confirmButton.onClick = () => {
            var v;
            if (n("OnConfirm -> Created: ", e), e.resource)
              return L(o);
            if (((v = e.anchor) == null ? void 0 : v.to) !== "") {
              o && (o.preventDefault(), o.stopPropagation()), e.anchor.external || typeof e.anchor.to < "u" && Z.push(e.anchor.to);
              return;
            }
            C(), h(), a("click", o);
          }, n("Click -> New onConfirm function created: ", (A = t.confirmButton) == null ? void 0 : A.onClick);
        return Oe(e.confirmModal, e.confirmModalKey, t);
      }
      if (e.resource)
        return n("Click -> has resource"), L(o);
      if (((s = e.anchor) == null ? void 0 : s.to) !== "") {
        n("Click -> Is Anchor", e.anchor), e.anchor.external ? typeof e.anchor.to == "string" && (window.location.href = e.anchor.to) : typeof e.anchor.to < "u" && Z.push(e.anchor.to);
        return;
      }
      if (q.value) {
        n("Click -> Is Switch"), Me(() => {
          C(), h(), a("click", o);
        });
        return;
      }
      n("Click -> Emit", e), a("click", o);
    };
    I(() => e.loading, () => T.value = e.loading), I(() => e.checked, () => y.value = e.checked), I(y, (o) => a("update:checked", o)), I(D, (o) => {
      D.value && e.showTooltipOnHover ? (R.value !== void 0 && clearTimeout(R.value), R.value = setTimeout(() => {
        m.value = !0, clearTimeout(R.value);
      }, e.showTooltipOnHoverDelay)) : !D.value && e.hideTooltipOnLeave ? (m.value = !1, clearTimeout(R.value)) : D.value || clearTimeout(R.value);
    }), ue({
      click: () => oe(null),
      focus: (o) => {
        X.value && (o && (Y.value = !0), X.value.focus());
      }
    });
    const ge = u(() => e.type === r.Content ? "div" : "button"), we = u(() => e.disabled === void 0 ? !1 : typeof e.disabled == "function" ? e.disabled({}) : typeof e.disabled == "boolean" ? e.disabled : !1), Te = (o) => _.value = o, te = u(() => e.type === r.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), Be = u(() => te.value ? new ze({ ...e.anchor, class: x.value }) : {});
    return (o, c) => {
      const k = z("lkt-spinner"), N = z("lkt-anchor"), H = z("lkt-field"), A = z("lkt-tooltip");
      return l(), d("div", {
        class: b(["lkt-button-container", pe.value]),
        ref_key: "container",
        ref: B,
        id: fe,
        onMousemove: c[3] || (c[3] = (s) => D.value = !0),
        onMouseleave: c[4] || (c[4] = (s) => D.value = !1)
      }, [
        te.value ? (l(), g(N, Ee({ key: 0 }, Be.value, {
          class: "lkt-button",
          onActive: Te
        }), {
          default: K(() => [
            V(W) ? (l(), d("i", {
              key: 0,
              class: b(V(W))
            }, null, 2)) : i("", !0),
            V(W) && o.iconDot ? (l(), d("i", je, j($.value), 1)) : i("", !0),
            o.img ? (l(), d("img", {
              key: 2,
              src: o.img,
              alt: E.value
            }, null, 8, We)) : i("", !0),
            E.value ? (l(), d(le, { key: 3 }, [
              ne(j(E.value), 1)
            ], 64)) : i("", !0),
            V(Q).default ? U(o.$slots, "default", { key: 4 }) : i("", !0),
            T.value ? (l(), g(k, { key: 5 })) : i("", !0)
          ]),
          _: 3
        }, 16)) : (l(), g(ie(ge.value), {
          key: 1,
          class: b(["lkt-button", x.value]),
          ref_key: "button",
          ref: X,
          name: o.name,
          type: o.type,
          disabled: we.value,
          tabindex: o.tabindex,
          onClick: oe,
          onFocus: Ce,
          onBlur: he
        }, {
          default: K(() => [
            o.icon ? (l(), d("i", {
              key: 0,
              class: b(o.icon)
            }, null, 2)) : i("", !0),
            o.icon && o.iconDot ? (l(), d("i", Xe, j($.value), 1)) : i("", !0),
            o.img ? (l(), d("img", {
              key: 2,
              src: o.img,
              alt: E.value
            }, null, 8, Ye)) : i("", !0),
            E.value ? (l(), d(le, { key: 3 }, [
              ne(j(E.value), 1)
            ], 64)) : i("", !0),
            V(Q).default ? U(o.$slots, "default", { key: 4 }) : i("", !0),
            T.value ? (l(), g(k, { key: 5 })) : i("", !0),
            q.value ? Ie((l(), g(H, {
              key: 6,
              type: "switch",
              modelValue: y.value,
              "onUpdate:modelValue": c[0] || (c[0] = (s) => y.value = s)
            }, null, 8, ["modelValue"])), [
              [Le, be.value]
            ]) : i("", !0),
            o.iconEnd ? (l(), d("i", {
              key: 7,
              class: b([o.iconEnd, "lkt-button-icon-end"])
            }, null, 2)) : i("", !0),
            M.value ? (l(), d("div", qe, [
              o.splitIcon ? (l(), d("i", {
                key: 0,
                class: b(o.splitIcon)
              }, null, 2)) : de.value ? (l(), g(ie(me.value), { key: 1 })) : i("", !0)
            ])) : i("", !0)
          ]),
          _: 3
        }, 40, ["class", "name", "type", "disabled", "tabindex"])),
        M.value && B.value ? (l(), g(A, {
          key: 2,
          modelValue: S.value,
          "onUpdate:modelValue": c[1] || (c[1] = (s) => S.value = s),
          referrer: B.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: b(["lkt-split-button-dropdown-content", o.splitClass]),
          engine: o.tooltipEngine
        }, ae({ _: 2 }, [
          ye.value ? {
            name: "default",
            fn: K(({ doClose: s, doRootClick: t }) => [
              U(o.$slots, "split", {
                doClose: s,
                doRootClick: t
              })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "engine"])) : i("", !0),
        G.value && B.value ? (l(), g(A, {
          key: 3,
          modelValue: m.value,
          "onUpdate:modelValue": c[2] || (c[2] = (s) => m.value = s),
          referrer: B.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: b(o.tooltipClass),
          "location-x": o.tooltipLocationX,
          "location-y": o.tooltipLocationY,
          engine: o.tooltipEngine
        }, ae({ _: 2 }, [
          ke.value ? {
            name: "default",
            fn: K(({ doClose: s, doRootClick: t }) => [
              U(o.$slots, "tooltip", {
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
}), to = {
  install: (f) => {
    f.component("lkt-button") === void 0 && f.component("lkt-button", Ge);
  }
}, lo = (f) => {
  w.defaultSplitIcon = f;
};
export {
  oo as debugLktButton,
  to as default,
  eo as setDefaultButtonPalette,
  lo as setDefaultButtonSplitSlot
};
