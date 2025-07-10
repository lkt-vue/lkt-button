import { defineComponent as Xe, mergeDefaults as Ye, useSlots as Ze, ref as s, watch as F, computed as n, resolveComponent as V, createElementBlock as S, openBlock as a, normalizeClass as Se, createBlock as p, createCommentVNode as c, mergeProps as D, withCtx as q, renderSlot as M, unref as G, resolveDynamicComponent as De, withDirectives as $e, normalizeProps as we, Fragment as le, createTextVNode as et, toDisplayString as tt, withModifiers as Be, vShow as ot, createSlots as Te, renderList as Oe } from "vue";
import { generateRandomString as lt } from "lkt-string-tools";
import { httpCall as nt } from "lkt-http-client";
import { openModal as it, openConfirm as ut, runModalCallback as at } from "lkt-modal";
import { useRouter as rt } from "vue-router";
import { extractPropValue as L, ButtonType as o, extractI18nValue as ne, FieldType as Re, getDefaultValues as ct, Button as st, LktSettings as Ee } from "lkt-vue-kernel";
const J = class J {
};
J.debugEnabled = !1, J.defaultSplitIcon = void 0;
let T = J;
const gt = (y = !0) => {
  T.debugEnabled = y;
}, i = (...y) => {
  T.debugEnabled && console.info("[LktButton] ", ...y);
}, ft = ["src", "alt"], pt = ["src", "alt"], dt = {
  key: 9,
  class: "lkt-split-button-arrow"
}, vt = /* @__PURE__ */ Xe({
  __name: "LktButton",
  props: /* @__PURE__ */ Ye({
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
  }, ct(st)),
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
    const e = y, h = Fe, K = Ze(), ie = rt();
    let Ve = L(e.modalKey, e.prop);
    const Me = "lkt-button-" + lt(), w = s(e.loading), B = s(null), Q = s(null), O = s(!1), v = s(e.openTooltip), ue = s(!1), R = s(!1), E = s(void 0), f = s(e.checked), ae = s(void 0), W = s(!1), X = s(null), Y = s(!1);
    F(() => e.openTooltip, (t) => v.value = t), F(v, (t) => h("update:openTooltip", t));
    const re = n(() => {
      let t = [];
      return e.class && t.push(e.class), x.value && t.push("lkt-split-button"), t.push(`lkt-button--${e.type}`), w.value && t.push("is-loading"), ue.value && t.push("is-active-route"), v.value && t.push("show-tooltip"), O.value && t.push("show-split"), f.value && t.push("is-checked"), fe.value && t.push("is-disabled"), W.value && t.push("has-focus"), e.containerClass && t.push(e.containerClass), t.join(" ");
    }), g = n(() => {
      if (e.type === o.Switch || e.type === o.HiddenSwitch) {
        if (f.value && typeof e.textOn < "u") return ne(e.textOn);
        if (!f.value && typeof e.textOff < "u") return ne(e.textOff);
      }
      return ne(e.text);
    }), P = n(() => {
      let t = e.icon;
      return (e.type === o.Switch || e.type === o.HiddenSwitch) && (f.value && typeof e.iconOn < "u" ? t = e.iconOn : !f.value && typeof e.iconOff < "u" && (t = e.iconOff)), L(t, e.prop);
    }), ce = n(() => {
      let t = e.iconEnd;
      return (e.type === o.Switch || e.type === o.HiddenSwitch) && (f.value && typeof e.iconOn < "u" ? t = e.iconEndOn : !f.value && typeof e.iconOff < "u" && (t = e.iconEndOff)), L(t, e.prop);
    }), _ = n(() => typeof e.modal == "function" ? e.modal(e.prop) : L(e.modal, e.prop)), A = n(() => typeof e.modalData == "function" ? e.modalData(e.prop) : e.modalData), Le = n(() => typeof T.defaultSplitIcon < "u"), Ae = n(() => T.defaultSplitIcon), He = n(() => typeof e.dot == "boolean" ? "" : e.dot), C = (t, l = void 0) => {
      i("endClickMethod", t, l), _e(), qe(t === null ? void 0 : t, l), h("click", t, l);
    }, Z = n(() => {
      if (typeof e.resourceData == "function") return e.resourceData(e.prop);
      if (typeof e.resourceData == "string") return L(e.resourceData, e.prop);
      if (typeof e.resourceData == "object" && !Array.isArray(e.resourceData)) {
        let t = {};
        for (let l in e.resourceData)
          t[l] = L(e.resourceData[l], e.prop);
        return t;
      }
      return e.resourceData;
    }), H = async (t) => {
      var m;
      i("Resource Click", e.resource, Z.value), w.value = !0, h("loading"), typeof ((m = e.events) == null ? void 0 : m.httpStart) == "function" && (i("Resource Click -> httpStart event"), e.events.httpStart());
      let l = { ...Z.value, isChecked: f.value };
      return nt(e.resource, l).then((d) => {
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
    }, se = s(!1), xe = n(() => B.value ? e.type === o.TooltipLazy ? se.value : e.type === o.TooltipEver ? v.value : e.type === o.Tooltip : !1), Ue = s(!1), Ne = n(() => B.value ? e.type === o.SplitLazy ? Ue.value : e.type === o.SplitEver ? O.value : e.type === o.Split : !1), ze = (t) => {
      if (W.value = !0, Y.value) {
        Y.value = !1, h("focus");
        return;
      }
      h("focus", t);
    }, je = (t) => {
      W.value = !1, h("blur", t);
    }, $ = n(() => e.type === o.Switch || e.type === o.HiddenSwitch), Ke = n(() => e.type === o.Switch), ee = n(() => e.type === o.FileUpload || e.type === o.ImageUpload), Pe = n(() => e.type === o.ImageUpload ? Re.Image : Re.File), _e = () => {
      e.modalCallbacks.forEach((t) => {
        at(t);
      });
    }, qe = (t, l) => {
      var m;
      i("doConfigClick: ", e), typeof ((m = e.events) == null ? void 0 : m.click) == "function" && e.events.click({
        event: t,
        httpResponse: l
      });
    }, x = n(() => [
      o.Split,
      o.SplitLazy,
      o.SplitEver
    ].includes(e.type)), te = n(() => [
      o.Tooltip,
      o.TooltipLazy,
      o.TooltipEver
    ].includes(e.type)), oe = (t) => {
      var l, m, d, k, U, N, z, r, I, me, ke, ye, he, Ce;
      if (i("Click", e, t), t && ($.value ? (l = t.target) != null && l.closest(".lkt-field.is-switch") || (f.value = !f.value) : ee.value ? X.value && ((m = X.value) == null || m.click()) : te.value ? (v.value = !v.value, v.value && (se.value = !0)) : x.value && (O.value = !O.value)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), x.value || te.value || ee.value) {
        C(t);
        return;
      }
      if (_.value) {
        let u = { ...A.value };
        i("Click -> has modal", e.modal, u), i("Click -> typeof beforeClose: ", typeof u.beforeClose), typeof u.beforeClose == "function" ? (u.beforeClose = (j) => {
          if (e.resource)
            return H(t).then(() => {
              typeof A.value.beforeClose == "function" && A.value.beforeClose(j);
            });
          typeof A.value.beforeClose == "function" && A.value.beforeClose(j), C(t);
        }, i("Click -> New beforeClose function: ", u.beforeClose)) : (u.beforeClose = () => {
          if (e.resource)
            return H(t);
          C(t);
        }, i("Click -> New beforeClose function: ", u.beforeClose));
        let b = _.value;
        return typeof _.value == "function" && (b = _.value()), it(b, Ve, u);
      }
      if (e.confirmModal) {
        i("Click -> has confirm modal", e.confirmModal, e.confirmData), i("Click -> typeof confirmData.events?.click: ", typeof ((d = e.confirmData.events) == null ? void 0 : d.click));
        let u = { ...e.confirmData };
        if (u.confirmButton ? u.confirmButton = { ...Ee.defaultConfirmButton, ...u.confirmButton } : u.confirmButton = { ...Ee.defaultConfirmButton }, u.confirmButton.events || (u.confirmButton.events = {}), typeof ((U = (k = u.confirmButton) == null ? void 0 : k.events) == null ? void 0 : U.click) == "function") {
          let b = (z = (N = u.confirmButton) == null ? void 0 : N.events) == null ? void 0 : z.click;
          i("Click -> Has confirmData.events?.click function: ", b), u.confirmButton.events.click = () => {
            if (i("confirmData.events?.click -> Already: ", e), e.resource)
              return H(t).then(() => {
                b();
              });
            b(), C(t);
          }, i("Click -> New confirmData.events?.click function created: ", (I = (r = u.confirmButton) == null ? void 0 : r.events) == null ? void 0 : I.click);
        } else
          u.confirmButton.events.click = () => {
            var b, j, be, ge;
            if (i("confirmData.events?.click -> Created: ", e), e.resource)
              return H(t);
            if (((b = e.anchor) == null ? void 0 : b.to) !== "") {
              t && (t.preventDefault(), t.stopPropagation()), (j = e.anchor) != null && j.external || typeof ((be = e.anchor) == null ? void 0 : be.to) < "u" && ie.push((ge = e.anchor) == null ? void 0 : ge.to);
              return;
            }
            C(t);
          }, i("Click -> New confirmData.events?.click function created: ", (me = u.confirmButton) == null ? void 0 : me.events.click);
        return ut(e.confirmModal, e.confirmModalKey, u);
      }
      if (e.resource)
        return i("Click -> has resource"), H(t);
      if (typeof ((ke = e.anchor) == null ? void 0 : ke.to) < "u" && ((ye = e.anchor) == null ? void 0 : ye.to) !== "") {
        i("Click -> Is Anchor", e.anchor), (he = e.anchor) != null && he.external ? typeof ((Ce = e.anchor) == null ? void 0 : Ce.to) == "string" && (window.location.href = e.anchor.to) : ie.push(e.anchor.to);
        return;
      }
      if ($.value) {
        i("Click -> Is Switch"), C(t);
        return;
      }
      i("Click -> Emit", e), C(t);
    };
    F(() => e.loading, () => w.value = e.loading), F(() => e.checked, () => f.value = e.checked), F(f, (t) => h("update:checked", t)), F(R, (t) => {
      R.value && e.showTooltipOnHover ? (E.value !== void 0 && clearTimeout(E.value), E.value = setTimeout(() => {
        v.value = !0, clearTimeout(E.value);
      }, e.showTooltipOnHoverDelay)) : !R.value && e.hideTooltipOnLeave ? (v.value = !1, clearTimeout(E.value)) : R.value || clearTimeout(E.value);
    }), Ie({
      click: () => oe(null),
      focus: (t) => {
        Q.value && (t && (Y.value = !0), Q.value.focus());
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
    }) : typeof e.disabled == "boolean" ? e.disabled : !1), pe = (t) => oe(t), Qe = (t) => ue.value = t, de = n(() => e.type === o.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), ve = n(() => P.value ? {
      icon: P.value,
      dot: e.dot ? He.value : !1
    } : {}), We = n(() => {
      if (de.value) {
        let t = {};
        return P.value && (t.icon = ve.value), g.value && (t.text = g.value), {
          ...e.anchor,
          class: re.value,
          ...t,
          prop: e.prop
        };
      }
      return {};
    });
    return (t, l) => {
      const m = V("lkt-spinner"), d = V("lkt-anchor"), k = V("lkt-icon"), U = V("lkt-field"), N = V("lkt-button", !0), z = V("lkt-tooltip");
      return a(), S("div", {
        class: Se(["lkt-button", re.value]),
        ref_key: "container",
        ref: B,
        id: Me,
        onMousemove: l[4] || (l[4] = (r) => R.value = !0),
        onMouseleave: l[5] || (l[5] = (r) => R.value = !1)
      }, [
        de.value ? (a(), p(d, D({ key: 0 }, We.value, {
          class: "lkt-button-main",
          onActive: Qe
        }), {
          default: q(() => [
            t.img ? (a(), S("img", {
              key: 0,
              src: t.img,
              alt: g.value
            }, null, 8, ft)) : c("", !0),
            G(K).text ? M(t.$slots, "text", {
              key: 1,
              text: g.value
            }) : c("", !0),
            G(K).default ? M(t.$slots, "default", { key: 2 }) : c("", !0),
            w.value ? (a(), p(m, { key: 3 })) : c("", !0)
          ]),
          _: 3
        }, 16)) : (a(), p(De(Ge.value), {
          key: 1,
          class: "lkt-button-main",
          ref_key: "button",
          ref: Q,
          name: t.name,
          type: Je.value,
          disabled: fe.value,
          tabindex: t.tabindex,
          onClick: oe,
          onFocus: ze,
          onBlur: je
        }, {
          default: q(() => [
            P.value ? (a(), p(k, we(D({ key: 0 }, ve.value)), null, 16)) : c("", !0),
            t.img ? (a(), S("img", {
              key: 1,
              src: t.img,
              alt: g.value
            }, null, 8, pt)) : c("", !0),
            G(K).text ? M(t.$slots, "text", {
              key: 2,
              text: g.value
            }) : g.value ? (a(), S(le, { key: 3 }, [
              et(tt(g.value), 1)
            ], 64)) : c("", !0),
            G(K).default ? M(t.$slots, "default", { key: 4 }) : c("", !0),
            w.value ? (a(), p(m, { key: 5 })) : c("", !0),
            $.value ? $e((a(), p(U, {
              key: 6,
              type: "switch",
              modelValue: f.value,
              "onUpdate:modelValue": l[0] || (l[0] = (r) => f.value = r),
              disabled: t.disabled,
              onClick: Be(() => {
              }, ["stop"])
            }, null, 8, ["modelValue", "disabled"])), [
              [ot, Ke.value]
            ]) : c("", !0),
            ee.value ? (a(), p(U, D({
              key: 7,
              ref_key: "fileFieldRef",
              ref: X,
              type: Pe.value,
              modelValue: ae.value,
              "onUpdate:modelValue": l[1] || (l[1] = (r) => ae.value = r),
              hidden: ""
            }, {
              fileUploadHttp: {
                resource: t.resource,
                data: Z.value
              }
            }, {
              disabled: t.disabled,
              onClick: Be(() => {
              }, ["stop"])
            }), null, 16, ["type", "modelValue", "disabled"])) : c("", !0),
            ce.value ? (a(), p(k, we(D({ key: 8 }, { icon: ce.value, class: "lkt-button-icon-end" })), null, 16)) : c("", !0),
            x.value ? (a(), S("div", dt, [
              t.splitIcon ? (a(), S("i", {
                key: 0,
                class: Se(t.splitIcon)
              }, null, 2)) : Le.value ? (a(), p(De(Ae.value), { key: 1 })) : c("", !0)
            ])) : c("", !0)
          ]),
          _: 3
        }, 40, ["name", "type", "disabled", "tabindex"])),
        x.value && B.value ? (a(), p(z, D({
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
            fn: q(({ doClose: r }) => [
              (a(!0), S(le, null, Oe(t.splitButtons, (I) => (a(), p(N, D({ ref_for: !0 }, I, { onClick: r }), null, 16, ["onClick"]))), 256)),
              M(t.$slots, "split", {
                doClose: r,
                doRootClick: pe
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "class"])) : c("", !0),
        te.value && B.value ? (a(), p(z, D({
          key: 3,
          modelValue: v.value,
          "onUpdate:modelValue": l[3] || (l[3] = (r) => v.value = r)
        }, {
          referrer: B.value,
          ...t.tooltip
        }), Te({ _: 2 }, [
          xe.value ? {
            name: "default",
            fn: q(({ doClose: r }) => [
              (a(!0), S(le, null, Oe(t.splitButtons, (I) => (a(), p(N, D({ ref_for: !0 }, I, { onClick: r }), null, 16, ["onClick"]))), 256)),
              M(t.$slots, "tooltip", {
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
}), St = {
  install: (y) => {
    y.component("lkt-button") === void 0 && y.component("lkt-button", vt);
  }
}, Dt = (y) => {
  T.defaultSplitIcon = y;
};
export {
  gt as debugLktButton,
  St as default,
  Dt as setDefaultButtonSplitSlot
};
