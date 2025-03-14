import { defineComponent as _e, mergeDefaults as qe, useSlots as Ge, ref as f, watch as E, computed as n, resolveComponent as N, createElementBlock as p, openBlock as i, normalizeClass as I, createBlock as C, createCommentVNode as r, mergeProps as P, withCtx as j, renderSlot as x, toDisplayString as z, Fragment as ve, createTextVNode as me, unref as ke, resolveDynamicComponent as ye, withDirectives as Je, withModifiers as he, vShow as Qe, createSlots as Ce } from "vue";
import { generateRandomString as We } from "lkt-string-tools";
import { httpCall as Xe } from "lkt-http-client";
import { openModal as Ye, openConfirm as Ze, runModalCallback as $e } from "lkt-modal";
import { useRouter as et } from "vue-router";
import { extractPropValue as K, ButtonType as o, extractI18nValue as Y, FieldType as be, Anchor as tt, getDefaultValues as ot, Button as lt, LktSettings as we } from "lkt-vue-kernel";
const A = class A {
};
A.DEFAULT_PALETTE = "", A.debugEnabled = !1, A.defaultSplitIcon = void 0;
let b = A;
const kt = (d) => {
  b.DEFAULT_PALETTE = d;
}, yt = (d = !0) => {
  b.debugEnabled = d;
}, u = (...d) => {
  b.debugEnabled && console.info("[LktButton] ", ...d);
}, nt = {
  key: 1,
  class: "lkt-button--icon-dot"
}, it = ["src", "alt"], ut = {
  key: 1,
  class: "lkt-button--icon-dot"
}, at = ["src", "alt"], rt = {
  key: 9,
  class: "lkt-split-button-arrow"
}, ct = /* @__PURE__ */ _e({
  __name: "LktButton",
  props: /* @__PURE__ */ qe({
    type: {},
    name: {},
    value: {},
    disabled: { type: [Boolean, Function] },
    openTooltip: { type: Boolean },
    loading: { type: Boolean },
    class: {},
    containerClass: {},
    wrapContent: { type: Boolean },
    text: {},
    icon: {},
    iconEnd: {},
    img: {},
    checked: { type: Boolean },
    textOn: {},
    textOff: {},
    iconOn: {},
    iconOff: {},
    iconEndOn: {},
    iconEndOff: {},
    dot: { type: [Boolean, String, Number] },
    anchor: {},
    resource: {},
    resourceData: {},
    modal: { type: [String, Function] },
    modalKey: { type: [String, Number, Function] },
    modalData: { type: [Object, Function] },
    confirmModal: { type: [String, Function] },
    confirmModalKey: { type: [String, Number, Function] },
    confirmData: {},
    modalCallbacks: {},
    tooltip: {},
    splitIcon: {},
    showTooltipOnHover: { type: Boolean },
    showTooltipOnHoverDelay: {},
    hideTooltipOnLeave: { type: Boolean },
    splitClass: {},
    tabindex: {},
    prop: {},
    clickRef: {},
    events: {}
  }, ot(lt)),
  emits: [
    "click",
    "focus",
    "blur",
    "loading",
    "loaded",
    "update:checked",
    "update:openTooltip"
  ],
  setup(d, { expose: Te, emit: ge }) {
    const e = d, k = ge, Z = Ge(), $ = et();
    let H = K(e.modal, e.prop), Se = K(e.modalKey, e.prop), Be = K(e.icon, e.prop), Oe = K(e.iconEnd, e.prop);
    const De = "lkt-button-" + We(), w = f(e.loading), T = f(null), _ = f(null), g = f(!1), v = f(e.openTooltip), ee = f(!1), S = f(!1), B = f(void 0), s = f(e.checked), te = f(void 0), q = f(null), G = f(!1);
    E(() => e.openTooltip, (t) => v.value = t), E(v, (t) => k("update:openTooltip", t));
    const oe = n(() => {
      let t = [];
      return e.class && t.push(e.class), V.value && t.push("lkt-split-button"), t.push(`lkt-button--${e.type}`), w.value && t.push("is-loading"), ee.value && t.push("is-active-route"), v.value && t.push("show-tooltip"), g.value && t.push("show-split"), s.value && t.push("is-checked"), t.join(" ");
    }), Ee = n(() => {
      let t = [];
      return e.containerClass && t.push(e.containerClass), t.join(" ");
    }), O = n(() => {
      if (e.type === o.Switch || e.type === o.HiddenSwitch) {
        if (s.value && typeof e.textOn < "u") return Y(e.textOn);
        if (!s.value && typeof e.textOff < "u") return Y(e.textOff);
      }
      return Y(e.text);
    }), D = n(() => {
      if (e.type === o.Switch || e.type === o.HiddenSwitch) {
        if (s.value && typeof e.iconOn < "u") return e.iconOn;
        if (!s.value && typeof e.iconOff < "u") return e.iconOff;
      }
      return Be;
    }), le = n(() => {
      if (e.type === o.Switch || e.type === o.HiddenSwitch) {
        if (s.value && typeof e.iconEndOn < "u") return e.iconEndOn;
        if (!s.value && typeof e.iconEndOff < "u") return e.iconEndOff;
      }
      return Oe;
    }), R = n(() => typeof e.modalData == "function" ? e.modalData(e.prop) : e.modalData), Ie = n(() => typeof b.defaultSplitIcon < "u"), Re = n(() => b.defaultSplitIcon), ne = n(() => typeof e.dot == "boolean" ? "" : e.dot), y = (t, a = void 0) => {
      u("endClickMethod", t, a), Ne(), Pe(), k("click", t, a);
    }, F = async (t) => {
      u("Resource Click", e.resource, e.resourceData), w.value = !0, k("loading");
      let a = { ...e.resourceData, isChecked: s.value };
      return Xe(e.resource, a).then((m) => {
        w.value = !1, k("loaded"), u("Resource Click -> Received response", m), y(t, m);
      }).catch((m) => {
        w.value = !1, k("loaded"), u("Resource Click -> Received response error", m), y(t, m);
      });
    }, ie = f(!1), Fe = n(() => T.value ? e.type === o.TooltipLazy ? ie.value : e.type === o.TooltipEver ? v.value : e.type === o.Tooltip : !1), Ve = f(!1), Me = n(() => T.value ? e.type === o.SplitLazy ? Ve.value : e.type === o.SplitEver ? g.value : e.type === o.Split : !1), Le = (t) => {
      if (G.value) {
        G.value = !1, k("focus");
        return;
      }
      k("focus", t);
    }, Ae = (t) => {
      k("blur", t);
    }, J = n(() => e.type === o.Switch || e.type === o.HiddenSwitch), He = n(() => e.type === o.Switch), Q = n(() => e.type === o.FileUpload || e.type === o.ImageUpload), Ue = n(() => e.type === o.ImageUpload ? be.Image : be.File), Ne = () => {
      e.modalCallbacks.forEach((t) => {
        $e(t);
      });
    }, Pe = () => {
      var t;
      u("doConfigClick: ", e), typeof ((t = e.events) == null ? void 0 : t.click) == "function" && e.events.click();
    }, V = n(() => [
      o.Split,
      o.SplitLazy,
      o.SplitEver
    ].includes(e.type)), W = n(() => [
      o.Tooltip,
      o.TooltipLazy,
      o.TooltipEver
    ].includes(e.type)), X = (t) => {
      var a, m, U, M, L, c, re, ce, se, fe, de;
      if (u("Click", e, t), t && (J.value ? (a = t.target) != null && a.closest(".lkt-field.is-switch") || (s.value = !s.value) : Q.value ? q.value && ((m = q.value) == null || m.click()) : W.value ? (v.value = !v.value, v.value && (ie.value = !0)) : V.value && (g.value = !g.value)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), V.value || W.value || Q.value) {
        y(t);
        return;
      }
      if (H) {
        let l = { ...R.value };
        u("Click -> has modal", e.modal, l), u("Click -> typeof beforeClose: ", typeof l.beforeClose), typeof l.beforeClose == "function" ? (l.beforeClose = (pe) => {
          if (e.resource)
            return F(t).then(() => {
              typeof R.value.beforeClose == "function" && R.value.beforeClose(pe);
            });
          typeof R.value.beforeClose == "function" && R.value.beforeClose(pe), y(t);
        }, u("Click -> New beforeClose function: ", l.beforeClose)) : (l.beforeClose = () => {
          if (e.resource)
            return F(t);
          y(t);
        }, u("Click -> New beforeClose function: ", l.beforeClose));
        let h = H;
        return typeof H == "function" && (h = H()), Ye(h, Se, l);
      }
      if (e.confirmModal) {
        u("Click -> has confirm modal", e.confirmModal, e.confirmData), u("Click -> typeof onConfirm: ", typeof ((U = e.confirmData.events) == null ? void 0 : U.click));
        let l = { ...e.confirmData };
        if (l.confirmButton ? l.confirmButton = { ...we.defaultConfirmButton, ...l.confirmButton } : l.confirmButton = { ...we.defaultConfirmButton }, l.confirmButton.events || (l.confirmButton.events = {}), typeof ((L = (M = l.confirmButton) == null ? void 0 : M.events) == null ? void 0 : L.click) == "function") {
          let h = (re = (c = l.confirmButton) == null ? void 0 : c.events) == null ? void 0 : re.click;
          u("Click -> Has onConfirm function: ", h), l.confirmButton.events.click = () => {
            if (u("OnConfirm -> Already: ", e), e.resource)
              return F(t).then(() => {
                h();
              });
            h(), y(t);
          }, u("Click -> New onConfirm function created: ", (se = (ce = l.confirmButton) == null ? void 0 : ce.events) == null ? void 0 : se.click);
        } else
          l.confirmButton.events.click = () => {
            var h;
            if (u("OnConfirm -> Created: ", e), e.resource)
              return F(t);
            if (((h = e.anchor) == null ? void 0 : h.to) !== "") {
              t && (t.preventDefault(), t.stopPropagation()), e.anchor.external || typeof e.anchor.to < "u" && $.push(e.anchor.to);
              return;
            }
            y(t);
          }, u("Click -> New onConfirm function created: ", (fe = l.confirmButton) == null ? void 0 : fe.events.click);
        return Ze(e.confirmModal, e.confirmModalKey, l);
      }
      if (e.resource)
        return u("Click -> has resource"), F(t);
      if (((de = e.anchor) == null ? void 0 : de.to) !== "") {
        u("Click -> Is Anchor", e.anchor), e.anchor.external ? typeof e.anchor.to == "string" && (window.location.href = e.anchor.to) : typeof e.anchor.to < "u" && $.push(e.anchor.to);
        return;
      }
      if (J.value) {
        u("Click -> Is Switch"), y(t);
        return;
      }
      u("Click -> Emit", e), y(t);
    };
    E(() => e.loading, () => w.value = e.loading), E(() => e.checked, () => s.value = e.checked), E(s, (t) => k("update:checked", t)), E(S, (t) => {
      S.value && e.showTooltipOnHover ? (B.value !== void 0 && clearTimeout(B.value), B.value = setTimeout(() => {
        v.value = !0, clearTimeout(B.value);
      }, e.showTooltipOnHoverDelay)) : !S.value && e.hideTooltipOnLeave ? (v.value = !1, clearTimeout(B.value)) : S.value || clearTimeout(B.value);
    }), Te({
      click: () => X(null),
      focus: (t) => {
        _.value && (t && (G.value = !0), _.value.focus());
      }
    });
    const je = n(() => e.type === o.Content ? "div" : "button"), xe = n(() => e.disabled === void 0 ? !1 : typeof e.disabled == "function" ? e.disabled({
      prop: e.prop
    }) : typeof e.disabled == "boolean" ? e.disabled : !1), ue = (t) => X(t), ze = (t) => ee.value = t, ae = n(() => e.type === o.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), Ke = n(() => ae.value ? new tt({ ...e.anchor, class: oe.value }) : {});
    return (t, a) => {
      const m = N("lkt-spinner"), U = N("lkt-anchor"), M = N("lkt-field"), L = N("lkt-tooltip");
      return i(), p("div", {
        class: I(["lkt-button-container", Ee.value]),
        ref_key: "container",
        ref: T,
        id: De,
        onMousemove: a[4] || (a[4] = (c) => S.value = !0),
        onMouseleave: a[5] || (a[5] = (c) => S.value = !1)
      }, [
        ae.value ? (i(), C(U, P({ key: 0 }, Ke.value, {
          class: "lkt-button",
          onActive: ze
        }), {
          default: j(() => [
            D.value ? (i(), p("i", {
              key: 0,
              class: I(D.value)
            }, null, 2)) : r("", !0),
            D.value && t.dot ? (i(), p("i", nt, z(ne.value), 1)) : r("", !0),
            t.img ? (i(), p("img", {
              key: 2,
              src: t.img,
              alt: O.value
            }, null, 8, it)) : r("", !0),
            O.value ? (i(), p(ve, { key: 3 }, [
              me(z(O.value), 1)
            ], 64)) : r("", !0),
            ke(Z).default ? x(t.$slots, "default", { key: 4 }) : r("", !0),
            w.value ? (i(), C(m, { key: 5 })) : r("", !0)
          ]),
          _: 3
        }, 16)) : (i(), C(ye(je.value), {
          key: 1,
          class: I(["lkt-button", oe.value]),
          ref_key: "button",
          ref: _,
          name: t.name,
          type: t.type,
          disabled: xe.value,
          tabindex: t.tabindex,
          onClick: X,
          onFocus: Le,
          onBlur: Ae
        }, {
          default: j(() => [
            D.value ? (i(), p("i", {
              key: 0,
              class: I(D.value)
            }, null, 2)) : r("", !0),
            D.value && t.dot ? (i(), p("i", ut, z(ne.value), 1)) : r("", !0),
            t.img ? (i(), p("img", {
              key: 2,
              src: t.img,
              alt: O.value
            }, null, 8, at)) : r("", !0),
            O.value ? (i(), p(ve, { key: 3 }, [
              me(z(O.value), 1)
            ], 64)) : r("", !0),
            ke(Z).default ? x(t.$slots, "default", { key: 4 }) : r("", !0),
            w.value ? (i(), C(m, { key: 5 })) : r("", !0),
            J.value ? Je((i(), C(M, {
              key: 6,
              type: "switch",
              modelValue: s.value,
              "onUpdate:modelValue": a[0] || (a[0] = (c) => s.value = c),
              onClick: he(() => {
              }, ["stop"])
            }, null, 8, ["modelValue"])), [
              [Qe, He.value]
            ]) : r("", !0),
            Q.value ? (i(), C(M, P({
              key: 7,
              ref_key: "fileFieldRef",
              ref: q,
              type: Ue.value,
              modelValue: te.value,
              "onUpdate:modelValue": a[1] || (a[1] = (c) => te.value = c),
              hidden: ""
            }, {
              fileUploadHttp: {
                resource: t.resource,
                data: t.resourceData
              }
            }, {
              onClick: he(() => {
              }, ["stop"])
            }), null, 16, ["type", "modelValue"])) : r("", !0),
            le.value ? (i(), p("i", {
              key: 8,
              class: I([le.value, "lkt-button-icon-end"])
            }, null, 2)) : r("", !0),
            V.value ? (i(), p("div", rt, [
              t.splitIcon ? (i(), p("i", {
                key: 0,
                class: I(t.splitIcon)
              }, null, 2)) : Ie.value ? (i(), C(ye(Re.value), { key: 1 })) : r("", !0)
            ])) : r("", !0)
          ]),
          _: 3
        }, 40, ["class", "name", "type", "disabled", "tabindex"])),
        V.value && T.value ? (i(), C(L, P({
          key: 2,
          modelValue: g.value,
          "onUpdate:modelValue": a[2] || (a[2] = (c) => g.value = c)
        }, t.tooltip, {
          referrer: T.value,
          class: ["lkt-split-button-dropdown-content", t.splitClass]
        }), Ce({ _: 2 }, [
          Me.value ? {
            name: "default",
            fn: j(({ doClose: c }) => [
              x(t.$slots, "split", {
                doClose: c,
                doRootClick: ue
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "referrer", "class"])) : r("", !0),
        W.value && T.value ? (i(), C(L, P({
          key: 3,
          modelValue: v.value,
          "onUpdate:modelValue": a[3] || (a[3] = (c) => v.value = c)
        }, t.tooltip, { referrer: T.value }), Ce({ _: 2 }, [
          Fe.value ? {
            name: "default",
            fn: j(({ doClose: c }) => [
              x(t.$slots, "tooltip", {
                doClose: c,
                doRootClick: ue
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "referrer"])) : r("", !0)
      ], 34);
    };
  }
}), ht = {
  install: (d) => {
    d.component("lkt-button") === void 0 && d.component("lkt-button", ct);
  }
}, Ct = (d) => {
  b.defaultSplitIcon = d;
};
export {
  yt as debugLktButton,
  ht as default,
  kt as setDefaultButtonPalette,
  Ct as setDefaultButtonSplitSlot
};
