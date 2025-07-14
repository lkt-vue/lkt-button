import { defineComponent as Ye, mergeDefaults as Ze, useSlots as $e, ref as s, watch as V, computed as n, resolveComponent as M, createElementBlock as S, openBlock as a, normalizeClass as Se, createBlock as p, createCommentVNode as c, mergeProps as D, withCtx as G, renderSlot as L, unref as J, resolveDynamicComponent as De, withDirectives as et, normalizeProps as we, Fragment as ne, createTextVNode as tt, toDisplayString as ot, withModifiers as Be, vShow as lt, createSlots as Te, renderList as Oe } from "vue";
import { generateRandomString as nt } from "lkt-string-tools";
import { httpCall as it } from "lkt-http-client";
import { openModal as ut, openConfirm as at, runModalCallback as rt } from "lkt-modal";
import { useRouter as ct } from "vue-router";
import { extractPropValue as A, ButtonType as o, extractI18nValue as ie, FieldType as Re, getDefaultValues as st, Button as ft, LktSettings as Ee } from "lkt-vue-kernel";
const Q = class Q {
};
Q.debugEnabled = !1, Q.defaultSplitIcon = void 0;
let T = Q;
const St = (y = !0) => {
  T.debugEnabled = y;
}, i = (...y) => {
  T.debugEnabled && console.info("[LktButton] ", ...y);
}, pt = ["src", "alt"], dt = ["src", "alt"], vt = {
  key: 9,
  class: "lkt-split-button-arrow"
}, mt = /* @__PURE__ */ Ye({
  __name: "LktButton",
  props: /* @__PURE__ */ Ze({
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
    splitButtons: {},
    tabindex: {},
    prop: {},
    clickRef: {},
    events: {}
  }, st(ft)),
  emits: [
    "click",
    "focus",
    "blur",
    "loading",
    "loaded",
    "update:checked",
    "update:openTooltip"
  ],
  setup(y, { expose: Ie, emit: Fe }) {
    const e = y, h = Fe, _ = $e(), ue = ct();
    let Ve = A(e.modalKey, e.prop);
    const Me = "lkt-button-" + nt(), w = s(e.loading), B = s(null), W = s(null), O = s(!1), v = s(e.openTooltip), ae = s(!1), R = s(!1), E = s(void 0), f = s(e.checked), re = s(void 0), X = s(!1), Y = s(null), Z = s(!1);
    V(() => e.openTooltip, (t) => v.value = t), V(v, (t) => h("update:openTooltip", t));
    const ce = n(() => {
      let t = [];
      return e.class && t.push(e.class), N.value && t.push("lkt-split-button"), t.push(`lkt-button--${e.type}`), w.value && t.push("is-loading"), ae.value && t.push("is-active-route"), v.value && t.push("show-tooltip"), O.value && t.push("show-split"), f.value && t.push("is-checked"), fe.value && t.push("is-disabled"), X.value && t.push("has-focus"), e.containerClass && t.push(e.containerClass), t.join(" ");
    }), g = n(() => {
      if (e.type === o.Switch || e.type === o.HiddenSwitch) {
        if (f.value && typeof e.textOn < "u") return ie(e.textOn);
        if (!f.value && typeof e.textOff < "u") return ie(e.textOff);
      }
      return ie(e.text);
    }), I = n(() => {
      let t = e.icon;
      return (e.type === o.Switch || e.type === o.HiddenSwitch) && (f.value && typeof e.iconOn < "u" ? t = e.iconOn : !f.value && typeof e.iconOff < "u" && (t = e.iconOff)), A(t, e.prop);
    }), H = n(() => {
      let t = e.iconEnd;
      return (e.type === o.Switch || e.type === o.HiddenSwitch) && (f.value && typeof e.iconOn < "u" ? t = e.iconEndOn : !f.value && typeof e.iconOff < "u" && (t = e.iconEndOff)), A(t, e.prop);
    }), q = n(() => typeof e.modal == "function" ? e.modal(e.prop) : A(e.modal, e.prop)), x = n(() => typeof e.modalData == "function" ? e.modalData(e.prop) : e.modalData), Le = n(() => typeof T.defaultSplitIcon < "u"), Ae = n(() => T.defaultSplitIcon), He = n(() => typeof e.dot == "boolean" ? "" : e.dot), C = (t, l = void 0) => {
      i("endClickMethod", t, l), _e(), qe(t === null ? void 0 : t, l), h("click", t, l);
    }, $ = n(() => {
      if (typeof e.resourceData == "function") return e.resourceData(e.prop);
      if (typeof e.resourceData == "string") return A(e.resourceData, e.prop);
      if (typeof e.resourceData == "object" && !Array.isArray(e.resourceData)) {
        let t = {};
        for (let l in e.resourceData)
          t[l] = A(e.resourceData[l], e.prop);
        return t;
      }
      return e.resourceData;
    }), U = async (t) => {
      var m;
      i("Resource Click", e.resource, $.value), w.value = !0, h("loading"), typeof ((m = e.events) == null ? void 0 : m.httpStart) == "function" && (i("Resource Click -> httpStart event"), e.events.httpStart());
      let l = { ...$.value, isChecked: f.value };
      return it(e.resource, l).then((d) => {
        var k;
        w.value = !1, h("loaded"), i("Resource Click -> Received response", d), typeof ((k = e.events) == null ? void 0 : k.httpEnd) == "function" && (i("Resource Click -> httpEnd event"), e.events.httpEnd({
          httpResponse: d
        })), C(t, d);
      }).catch((d) => {
        var k;
        w.value = !1, h("loaded"), i("Resource Click -> Received response error", d), typeof ((k = e.events) == null ? void 0 : k.httpEnd) == "function" && (i("Resource Click -> httpEnd event"), e.events.httpEnd({
          httpResponse: d
        })), C(t, d);
      });
    }, se = s(!1), xe = n(() => B.value ? e.type === o.TooltipLazy ? se.value : e.type === o.TooltipEver ? v.value : e.type === o.Tooltip : !1), Ue = s(!1), Ne = n(() => B.value ? e.type === o.SplitLazy ? Ue.value : e.type === o.SplitEver ? O.value : e.type === o.Split : !1), je = (t) => {
      if (X.value = !0, Z.value) {
        Z.value = !1, h("focus");
        return;
      }
      h("focus", t);
    }, ze = (t) => {
      X.value = !1, h("blur", t);
    }, ee = n(() => e.type === o.Switch || e.type === o.HiddenSwitch), Ke = n(() => e.type === o.Switch), te = n(() => e.type === o.FileUpload || e.type === o.ImageUpload), Pe = n(() => e.type === o.ImageUpload ? Re.Image : Re.File), _e = () => {
      e.modalCallbacks.forEach((t) => {
        rt(t);
      });
    }, qe = (t, l) => {
      var m;
      i("doConfigClick: ", e), typeof ((m = e.events) == null ? void 0 : m.click) == "function" && e.events.click({
        event: t,
        httpResponse: l
      });
    }, N = n(() => [
      o.Split,
      o.SplitLazy,
      o.SplitEver
    ].includes(e.type)), oe = n(() => [
      o.Tooltip,
      o.TooltipLazy,
      o.TooltipEver
    ].includes(e.type)), le = (t) => {
      var l, m, d, k, j, z, K, r, F, me, ke, ye, he, Ce;
      if (i("Click", e, t), t && (ee.value ? (l = t.target) != null && l.closest(".lkt-field.is-switch") || (f.value = !f.value) : te.value ? Y.value && ((m = Y.value) == null || m.click()) : oe.value ? (v.value = !v.value, v.value && (se.value = !0)) : N.value && (O.value = !O.value)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), N.value || oe.value || te.value) {
        C(t);
        return;
      }
      if (q.value) {
        let u = { ...x.value };
        i("Click -> has modal", e.modal, u), i("Click -> typeof beforeClose: ", typeof u.beforeClose), typeof u.beforeClose == "function" ? (u.beforeClose = (P) => {
          if (e.resource)
            return U(t).then(() => {
              typeof x.value.beforeClose == "function" && x.value.beforeClose(P);
            });
          typeof x.value.beforeClose == "function" && x.value.beforeClose(P), C(t);
        }, i("Click -> New beforeClose function: ", u.beforeClose)) : (u.beforeClose = () => {
          if (e.resource)
            return U(t);
          C(t);
        }, i("Click -> New beforeClose function: ", u.beforeClose));
        let b = q.value;
        return typeof q.value == "function" && (b = q.value()), ut(b, Ve, u);
      }
      if (e.confirmModal) {
        i("Click -> has confirm modal", e.confirmModal, e.confirmData), i("Click -> typeof confirmData.events?.click: ", typeof ((d = e.confirmData.events) == null ? void 0 : d.click));
        let u = { ...e.confirmData };
        if (u.confirmButton ? u.confirmButton = { ...Ee.defaultConfirmButton, ...u.confirmButton } : u.confirmButton = { ...Ee.defaultConfirmButton }, u.confirmButton.events || (u.confirmButton.events = {}), typeof ((j = (k = u.confirmButton) == null ? void 0 : k.events) == null ? void 0 : j.click) == "function") {
          let b = (K = (z = u.confirmButton) == null ? void 0 : z.events) == null ? void 0 : K.click;
          i("Click -> Has confirmData.events?.click function: ", b), u.confirmButton.events.click = () => {
            if (i("confirmData.events?.click -> Already: ", e), e.resource)
              return U(t).then(() => {
                b();
              });
            b(), C(t);
          }, i("Click -> New confirmData.events?.click function created: ", (F = (r = u.confirmButton) == null ? void 0 : r.events) == null ? void 0 : F.click);
        } else
          u.confirmButton.events.click = () => {
            var b, P, be, ge;
            if (i("confirmData.events?.click -> Created: ", e), e.resource)
              return U(t);
            if (((b = e.anchor) == null ? void 0 : b.to) !== "") {
              t && (t.preventDefault(), t.stopPropagation()), (P = e.anchor) != null && P.external || typeof ((be = e.anchor) == null ? void 0 : be.to) < "u" && ue.push((ge = e.anchor) == null ? void 0 : ge.to);
              return;
            }
            C(t);
          }, i("Click -> New confirmData.events?.click function created: ", (me = u.confirmButton) == null ? void 0 : me.events.click);
        return at(e.confirmModal, e.confirmModalKey, u);
      }
      if (e.resource)
        return i("Click -> has resource"), U(t);
      if (typeof ((ke = e.anchor) == null ? void 0 : ke.to) < "u" && ((ye = e.anchor) == null ? void 0 : ye.to) !== "") {
        i("Click -> Is Anchor", e.anchor), (he = e.anchor) != null && he.external ? typeof ((Ce = e.anchor) == null ? void 0 : Ce.to) == "string" && (window.location.href = e.anchor.to) : ue.push(e.anchor.to);
        return;
      }
      if (ee.value) {
        i("Click -> Is Switch"), C(t);
        return;
      }
      i("Click -> Emit", e), C(t);
    };
    V(() => e.loading, () => w.value = e.loading), V(() => e.checked, () => f.value = e.checked), V(f, (t) => h("update:checked", t)), V(R, (t) => {
      R.value && e.showTooltipOnHover ? (E.value !== void 0 && clearTimeout(E.value), E.value = setTimeout(() => {
        v.value = !0, clearTimeout(E.value);
      }, e.showTooltipOnHoverDelay)) : !R.value && e.hideTooltipOnLeave ? (v.value = !1, clearTimeout(E.value)) : R.value || clearTimeout(E.value);
    }), Ie({
      click: () => le(null),
      focus: (t) => {
        W.value && (t && (Z.value = !0), W.value.focus());
      }
    });
    const Ge = n(() => e.type === o.Content ? "div" : "button"), Je = n(() => {
      switch (e.type) {
        case o.Button:
        case o.Submit:
          return e.type;
        default:
          return "button";
      }
    }), fe = n(() => e.disabled === void 0 ? !1 : typeof e.disabled == "function" ? e.disabled({
      prop: e.prop
    }) : typeof e.disabled == "boolean" ? e.disabled : !1), pe = (t) => le(t), Qe = (t) => ae.value = t, de = n(() => e.type === o.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), ve = n(() => typeof I.value == "string" ? {
      icon: I.value,
      dot: e.dot ? He.value : !1
    } : typeof I.value == "object" ? I.value : {}), We = n(() => typeof H.value == "string" ? {
      icon: H.value,
      class: "lkt-button-icon-end"
    } : typeof H.value == "object" ? {
      ...H.value,
      class: "lkt-button-icon-end"
    } : {}), Xe = n(() => {
      if (de.value) {
        let t = {};
        return I.value && (t.icon = ve.value), g.value && (t.text = g.value), {
          ...e.anchor,
          class: ce.value,
          ...t,
          prop: e.prop
        };
      }
      return {};
    });
    return (t, l) => {
      const m = M("lkt-spinner"), d = M("lkt-anchor"), k = M("lkt-icon"), j = M("lkt-field"), z = M("lkt-button", !0), K = M("lkt-tooltip");
      return a(), S("div", {
        class: Se(["lkt-button", ce.value]),
        ref_key: "container",
        ref: B,
        id: Me,
        onMousemove: l[4] || (l[4] = (r) => R.value = !0),
        onMouseleave: l[5] || (l[5] = (r) => R.value = !1)
      }, [
        de.value ? (a(), p(d, D({ key: 0 }, Xe.value, {
          class: "lkt-button-main",
          onActive: Qe
        }), {
          default: G(() => [
            t.img ? (a(), S("img", {
              key: 0,
              src: t.img,
              alt: g.value
            }, null, 8, pt)) : c("", !0),
            J(_).text ? L(t.$slots, "text", {
              key: 1,
              text: g.value
            }) : c("", !0),
            J(_).default ? L(t.$slots, "default", { key: 2 }) : c("", !0),
            w.value ? (a(), p(m, { key: 3 })) : c("", !0)
          ]),
          _: 3
        }, 16)) : (a(), p(De(Ge.value), {
          key: 1,
          class: "lkt-button-main",
          ref_key: "button",
          ref: W,
          name: t.name,
          type: Je.value,
          disabled: fe.value,
          tabindex: t.tabindex,
          onClick: le,
          onFocus: je,
          onBlur: ze
        }, {
          default: G(() => [
            I.value ? (a(), p(k, we(D({ key: 0 }, ve.value)), null, 16)) : c("", !0),
            t.img ? (a(), S("img", {
              key: 1,
              src: t.img,
              alt: g.value
            }, null, 8, dt)) : c("", !0),
            J(_).text ? L(t.$slots, "text", {
              key: 2,
              text: g.value
            }) : g.value ? (a(), S(ne, { key: 3 }, [
              tt(ot(g.value), 1)
            ], 64)) : c("", !0),
            J(_).default ? L(t.$slots, "default", { key: 4 }) : c("", !0),
            w.value ? (a(), p(m, { key: 5 })) : c("", !0),
            ee.value ? et((a(), p(j, {
              key: 6,
              type: "switch",
              modelValue: f.value,
              "onUpdate:modelValue": l[0] || (l[0] = (r) => f.value = r),
              disabled: t.disabled,
              onClick: Be(() => {
              }, ["stop"])
            }, null, 8, ["modelValue", "disabled"])), [
              [lt, Ke.value]
            ]) : c("", !0),
            te.value ? (a(), p(j, D({
              key: 7,
              ref_key: "fileFieldRef",
              ref: Y,
              type: Pe.value,
              modelValue: re.value,
              "onUpdate:modelValue": l[1] || (l[1] = (r) => re.value = r),
              hidden: ""
            }, {
              fileUploadHttp: {
                resource: t.resource,
                data: $.value
              }
            }, {
              disabled: t.disabled,
              onClick: Be(() => {
              }, ["stop"])
            }), null, 16, ["type", "modelValue", "disabled"])) : c("", !0),
            H.value ? (a(), p(k, we(D({ key: 8 }, We.value)), null, 16)) : c("", !0),
            N.value ? (a(), S("div", vt, [
              t.splitIcon ? (a(), S("i", {
                key: 0,
                class: Se(t.splitIcon)
              }, null, 2)) : Le.value ? (a(), p(De(Ae.value), { key: 1 })) : c("", !0)
            ])) : c("", !0)
          ]),
          _: 3
        }, 40, ["name", "type", "disabled", "tabindex"])),
        N.value && B.value ? (a(), p(K, D({
          key: 2,
          modelValue: O.value,
          "onUpdate:modelValue": l[2] || (l[2] = (r) => O.value = r)
        }, {
          referrer: B.value,
          ...t.tooltip
        }, {
          class: ["lkt-split-button-dropdown-content", t.splitClass]
        }), Te({ _: 2 }, [
          Ne.value ? {
            name: "default",
            fn: G(({ doClose: r }) => [
              (a(!0), S(ne, null, Oe(t.splitButtons, (F) => (a(), p(z, D({ ref_for: !0 }, F, { onClick: r }), null, 16, ["onClick"]))), 256)),
              L(t.$slots, "split", {
                doClose: r,
                doRootClick: pe
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "class"])) : c("", !0),
        oe.value && B.value ? (a(), p(K, D({
          key: 3,
          modelValue: v.value,
          "onUpdate:modelValue": l[3] || (l[3] = (r) => v.value = r)
        }, {
          referrer: B.value,
          ...t.tooltip
        }), Te({ _: 2 }, [
          xe.value ? {
            name: "default",
            fn: G(({ doClose: r }) => [
              (a(!0), S(ne, null, Oe(t.splitButtons, (F) => (a(), p(z, D({ ref_for: !0 }, F, { onClick: r }), null, 16, ["onClick"]))), 256)),
              L(t.$slots, "tooltip", {
                doClose: r,
                doRootClick: pe
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue"])) : c("", !0)
      ], 34);
    };
  }
}), Dt = {
  install: (y) => {
    y.component("lkt-button") === void 0 && y.component("lkt-button", mt);
  }
}, wt = (y) => {
  T.defaultSplitIcon = y;
};
export {
  St as debugLktButton,
  Dt as default,
  wt as setDefaultButtonSplitSlot
};
