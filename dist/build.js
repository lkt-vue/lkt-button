import { defineComponent as We, mergeDefaults as Xe, useSlots as Ye, ref as s, watch as F, computed as a, resolveComponent as z, createElementBlock as d, openBlock as l, normalizeClass as K, createBlock as y, createCommentVNode as r, mergeProps as V, withCtx as q, renderSlot as M, toDisplayString as G, unref as J, Fragment as Q, createTextVNode as we, resolveDynamicComponent as Be, withDirectives as Ze, withModifiers as De, vShow as _e, createSlots as Te, renderList as Oe } from "vue";
import { generateRandomString as $e } from "lkt-string-tools";
import { httpCall as et } from "lkt-http-client";
import { openModal as tt, openConfirm as ot, runModalCallback as lt } from "lkt-modal";
import { useRouter as nt } from "vue-router";
import { extractPropValue as W, ButtonType as o, extractI18nValue as ne, FieldType as Re, getDefaultValues as it, Button as ut, LktSettings as Ee } from "lkt-vue-kernel";
const X = class X {
};
X.debugEnabled = !1, X.defaultSplitIcon = void 0;
let D = X;
const Ct = (h = !0) => {
  D.debugEnabled = h;
}, n = (...h) => {
  D.debugEnabled && console.info("[LktButton] ", ...h);
}, at = {
  key: 1,
  class: "lkt-button--icon-dot"
}, rt = ["src", "alt"], ct = {
  key: 1,
  class: "lkt-button--icon-dot"
}, st = ["src", "alt"], ft = {
  key: 10,
  class: "lkt-split-button-arrow"
}, dt = /* @__PURE__ */ We({
  __name: "LktButton",
  props: /* @__PURE__ */ Xe({
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
  }, it(ut)),
  emits: [
    "click",
    "focus",
    "blur",
    "loading",
    "loaded",
    "update:checked",
    "update:openTooltip"
  ],
  setup(h, { expose: Ie, emit: Fe }) {
    const e = h, C = Fe, j = Ye(), ie = nt();
    let Ve = W(e.modalKey, e.prop);
    const Me = "lkt-button-" + $e(), w = s(e.loading), B = s(null), Y = s(null), T = s(!1), v = s(e.openTooltip), ue = s(!1), O = s(!1), R = s(void 0), f = s(e.checked), ae = s(void 0), Z = s(!1), _ = s(null), $ = s(!1);
    F(() => e.openTooltip, (t) => v.value = t), F(v, (t) => C("update:openTooltip", t));
    const re = a(() => {
      let t = [];
      return e.class && t.push(e.class), A.value && t.push("lkt-split-button"), t.push(`lkt-button--${e.type}`), w.value && t.push("is-loading"), ue.value && t.push("is-active-route"), v.value && t.push("show-tooltip"), T.value && t.push("show-split"), f.value && t.push("is-checked"), de.value && t.push("is-disabled"), Z.value && t.push("has-focus"), e.containerClass && t.push(e.containerClass), t.join(" ");
    }), g = a(() => {
      if (e.type === o.Switch || e.type === o.HiddenSwitch) {
        if (f.value && typeof e.textOn < "u") return ne(e.textOn);
        if (!f.value && typeof e.textOff < "u") return ne(e.textOff);
      }
      return ne(e.text);
    }), E = a(() => {
      let t = e.icon;
      return (e.type === o.Switch || e.type === o.HiddenSwitch) && (f.value && typeof e.iconOn < "u" ? t = e.iconOn : !f.value && typeof e.iconOff < "u" && (t = e.iconOff)), W(t, e.prop);
    }), ce = a(() => {
      let t = e.iconEnd;
      return (e.type === o.Switch || e.type === o.HiddenSwitch) && (f.value && typeof e.iconOn < "u" ? t = e.iconEndOn : !f.value && typeof e.iconOff < "u" && (t = e.iconEndOff)), W(t, e.prop);
    }), P = a(() => typeof e.modal == "function" ? e.modal(e.prop) : W(e.modal, e.prop)), L = a(() => typeof e.modalData == "function" ? e.modalData(e.prop) : e.modalData), Le = a(() => typeof D.defaultSplitIcon < "u"), He = a(() => D.defaultSplitIcon), se = a(() => typeof e.dot == "boolean" ? "" : e.dot), b = (t, i = void 0) => {
      n("endClickMethod", t, i), Pe(), qe(t === null ? void 0 : t, i), C("click", t, i);
    }, H = async (t) => {
      var m;
      n("Resource Click", e.resource, e.resourceData), w.value = !0, C("loading"), typeof ((m = e.events) == null ? void 0 : m.httpStart) == "function" && (n("Resource Click -> httpStart event"), e.events.httpStart());
      let i = { ...e.resourceData, isChecked: f.value };
      return et(e.resource, i).then((p) => {
        var k;
        w.value = !1, C("loaded"), n("Resource Click -> Received response", p), typeof ((k = e.events) == null ? void 0 : k.httpEnd) == "function" && (n("Resource Click -> httpEnd event"), e.events.httpEnd({
          httpResponse: p
        })), b(t, p);
      }).catch((p) => {
        var k;
        w.value = !1, C("loaded"), n("Resource Click -> Received response error", p), typeof ((k = e.events) == null ? void 0 : k.httpEnd) == "function" && (n("Resource Click -> httpEnd event"), e.events.httpEnd({
          httpResponse: p
        })), b(t, p);
      });
    }, fe = s(!1), Ae = a(() => B.value ? e.type === o.TooltipLazy ? fe.value : e.type === o.TooltipEver ? v.value : e.type === o.Tooltip : !1), Ue = s(!1), Ne = a(() => B.value ? e.type === o.SplitLazy ? Ue.value : e.type === o.SplitEver ? T.value : e.type === o.Split : !1), xe = (t) => {
      if (Z.value = !0, $.value) {
        $.value = !1, C("focus");
        return;
      }
      C("focus", t);
    }, ze = (t) => {
      Z.value = !1, C("blur", t);
    }, ee = a(() => e.type === o.Switch || e.type === o.HiddenSwitch), Ke = a(() => e.type === o.Switch), te = a(() => e.type === o.FileUpload || e.type === o.ImageUpload), je = a(() => e.type === o.ImageUpload ? Re.Image : Re.File), Pe = () => {
      e.modalCallbacks.forEach((t) => {
        lt(t);
      });
    }, qe = (t, i) => {
      var m;
      n("doConfigClick: ", e), typeof ((m = e.events) == null ? void 0 : m.click) == "function" && e.events.click({
        event: t,
        httpResponse: i
      });
    }, A = a(() => [
      o.Split,
      o.SplitLazy,
      o.SplitEver
    ].includes(e.type)), oe = a(() => [
      o.Tooltip,
      o.TooltipLazy,
      o.TooltipEver
    ].includes(e.type)), le = (t) => {
      var i, m, p, k, U, N, c, I, me, ke, ye, he, Ce, be;
      if (n("Click", e, t), t && (ee.value ? (i = t.target) != null && i.closest(".lkt-field.is-switch") || (f.value = !f.value) : te.value ? _.value && ((m = _.value) == null || m.click()) : oe.value ? (v.value = !v.value, v.value && (fe.value = !0)) : A.value && (T.value = !T.value)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), A.value || oe.value || te.value) {
        b(t);
        return;
      }
      if (P.value) {
        let u = { ...L.value };
        n("Click -> has modal", e.modal, u), n("Click -> typeof beforeClose: ", typeof u.beforeClose), typeof u.beforeClose == "function" ? (u.beforeClose = (x) => {
          if (e.resource)
            return H(t).then(() => {
              typeof L.value.beforeClose == "function" && L.value.beforeClose(x);
            });
          typeof L.value.beforeClose == "function" && L.value.beforeClose(x), b(t);
        }, n("Click -> New beforeClose function: ", u.beforeClose)) : (u.beforeClose = () => {
          if (e.resource)
            return H(t);
          b(t);
        }, n("Click -> New beforeClose function: ", u.beforeClose));
        let S = P.value;
        return typeof P.value == "function" && (S = P.value()), tt(S, Ve, u);
      }
      if (e.confirmModal) {
        n("Click -> has confirm modal", e.confirmModal, e.confirmData), n("Click -> typeof confirmData.events?.click: ", typeof ((p = e.confirmData.events) == null ? void 0 : p.click));
        let u = { ...e.confirmData };
        if (u.confirmButton ? u.confirmButton = { ...Ee.defaultConfirmButton, ...u.confirmButton } : u.confirmButton = { ...Ee.defaultConfirmButton }, u.confirmButton.events || (u.confirmButton.events = {}), typeof ((U = (k = u.confirmButton) == null ? void 0 : k.events) == null ? void 0 : U.click) == "function") {
          let S = (c = (N = u.confirmButton) == null ? void 0 : N.events) == null ? void 0 : c.click;
          n("Click -> Has confirmData.events?.click function: ", S), u.confirmButton.events.click = () => {
            if (n("confirmData.events?.click -> Already: ", e), e.resource)
              return H(t).then(() => {
                S();
              });
            S(), b(t);
          }, n("Click -> New confirmData.events?.click function created: ", (me = (I = u.confirmButton) == null ? void 0 : I.events) == null ? void 0 : me.click);
        } else
          u.confirmButton.events.click = () => {
            var S, x, Se, ge;
            if (n("confirmData.events?.click -> Created: ", e), e.resource)
              return H(t);
            if (((S = e.anchor) == null ? void 0 : S.to) !== "") {
              t && (t.preventDefault(), t.stopPropagation()), (x = e.anchor) != null && x.external || typeof ((Se = e.anchor) == null ? void 0 : Se.to) < "u" && ie.push((ge = e.anchor) == null ? void 0 : ge.to);
              return;
            }
            b(t);
          }, n("Click -> New confirmData.events?.click function created: ", (ke = u.confirmButton) == null ? void 0 : ke.events.click);
        return ot(e.confirmModal, e.confirmModalKey, u);
      }
      if (e.resource)
        return n("Click -> has resource"), H(t);
      if (typeof ((ye = e.anchor) == null ? void 0 : ye.to) < "u" && ((he = e.anchor) == null ? void 0 : he.to) !== "") {
        n("Click -> Is Anchor", e.anchor), (Ce = e.anchor) != null && Ce.external ? typeof ((be = e.anchor) == null ? void 0 : be.to) == "string" && (window.location.href = e.anchor.to) : ie.push(e.anchor.to);
        return;
      }
      if (ee.value) {
        n("Click -> Is Switch"), b(t);
        return;
      }
      n("Click -> Emit", e), b(t);
    };
    F(() => e.loading, () => w.value = e.loading), F(() => e.checked, () => f.value = e.checked), F(f, (t) => C("update:checked", t)), F(O, (t) => {
      O.value && e.showTooltipOnHover ? (R.value !== void 0 && clearTimeout(R.value), R.value = setTimeout(() => {
        v.value = !0, clearTimeout(R.value);
      }, e.showTooltipOnHoverDelay)) : !O.value && e.hideTooltipOnLeave ? (v.value = !1, clearTimeout(R.value)) : O.value || clearTimeout(R.value);
    }), Ie({
      click: () => le(null),
      focus: (t) => {
        Y.value && (t && ($.value = !0), Y.value.focus());
      }
    });
    const Ge = a(() => e.type === o.Content ? "div" : "button"), de = a(() => e.disabled === void 0 ? !1 : typeof e.disabled == "function" ? e.disabled({
      prop: e.prop
    }) : typeof e.disabled == "boolean" ? e.disabled : !1), pe = (t) => le(t), Je = (t) => ue.value = t, ve = a(() => e.type === o.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), Qe = a(() => ve.value ? { ...e.anchor, class: re.value, prop: e.prop } : {});
    return (t, i) => {
      const m = z("lkt-spinner"), p = z("lkt-anchor"), k = z("lkt-field"), U = z("lkt-button", !0), N = z("lkt-tooltip");
      return l(), d("div", {
        class: K(["lkt-button", re.value]),
        ref_key: "container",
        ref: B,
        id: Me,
        onMousemove: i[4] || (i[4] = (c) => O.value = !0),
        onMouseleave: i[5] || (i[5] = (c) => O.value = !1)
      }, [
        ve.value ? (l(), y(p, V({ key: 0 }, Qe.value, {
          class: "lkt-button-main",
          onActive: Je
        }), {
          default: q(() => [
            E.value ? (l(), d("i", {
              key: 0,
              class: K(E.value)
            }, null, 2)) : r("", !0),
            E.value && t.dot ? (l(), d("i", at, G(se.value), 1)) : r("", !0),
            t.img ? (l(), d("img", {
              key: 2,
              src: t.img,
              alt: g.value
            }, null, 8, rt)) : r("", !0),
            J(j).text ? M(t.$slots, "text", {
              key: 3,
              text: g.value
            }) : g.value ? (l(), d(Q, { key: 4 }, [
              we(G(g.value), 1)
            ], 64)) : r("", !0),
            J(j).default ? M(t.$slots, "default", { key: 5 }) : r("", !0),
            w.value ? (l(), y(m, { key: 6 })) : r("", !0)
          ]),
          _: 3
        }, 16)) : (l(), y(Be(Ge.value), {
          key: 1,
          class: "lkt-button-main",
          ref_key: "button",
          ref: Y,
          name: t.name,
          type: t.type,
          disabled: de.value,
          tabindex: t.tabindex,
          onClick: le,
          onFocus: xe,
          onBlur: ze
        }, {
          default: q(() => [
            E.value ? (l(), d("i", {
              key: 0,
              class: K(E.value)
            }, null, 2)) : r("", !0),
            E.value && t.dot ? (l(), d("i", ct, G(se.value), 1)) : r("", !0),
            t.img ? (l(), d("img", {
              key: 2,
              src: t.img,
              alt: g.value
            }, null, 8, st)) : r("", !0),
            J(j).text ? M(t.$slots, "text", {
              key: 3,
              text: g.value
            }) : g.value ? (l(), d(Q, { key: 4 }, [
              we(G(g.value), 1)
            ], 64)) : r("", !0),
            J(j).default ? M(t.$slots, "default", { key: 5 }) : r("", !0),
            w.value ? (l(), y(m, { key: 6 })) : r("", !0),
            ee.value ? Ze((l(), y(k, {
              key: 7,
              type: "switch",
              modelValue: f.value,
              "onUpdate:modelValue": i[0] || (i[0] = (c) => f.value = c),
              disabled: t.disabled,
              onClick: De(() => {
              }, ["stop"])
            }, null, 8, ["modelValue", "disabled"])), [
              [_e, Ke.value]
            ]) : r("", !0),
            te.value ? (l(), y(k, V({
              key: 8,
              ref_key: "fileFieldRef",
              ref: _,
              type: je.value,
              modelValue: ae.value,
              "onUpdate:modelValue": i[1] || (i[1] = (c) => ae.value = c),
              hidden: ""
            }, {
              fileUploadHttp: {
                resource: t.resource,
                data: t.resourceData
              }
            }, {
              disabled: t.disabled,
              onClick: De(() => {
              }, ["stop"])
            }), null, 16, ["type", "modelValue", "disabled"])) : r("", !0),
            ce.value ? (l(), d("i", {
              key: 9,
              class: K([ce.value, "lkt-button-icon-end"])
            }, null, 2)) : r("", !0),
            A.value ? (l(), d("div", ft, [
              t.splitIcon ? (l(), d("i", {
                key: 0,
                class: K(t.splitIcon)
              }, null, 2)) : Le.value ? (l(), y(Be(He.value), { key: 1 })) : r("", !0)
            ])) : r("", !0)
          ]),
          _: 3
        }, 40, ["name", "type", "disabled", "tabindex"])),
        A.value && B.value ? (l(), y(N, V({
          key: 2,
          modelValue: T.value,
          "onUpdate:modelValue": i[2] || (i[2] = (c) => T.value = c)
        }, t.tooltip, {
          referrer: B.value,
          class: ["lkt-split-button-dropdown-content", t.splitClass]
        }), Te({ _: 2 }, [
          Ne.value ? {
            name: "default",
            fn: q(({ doClose: c }) => [
              (l(!0), d(Q, null, Oe(t.splitButtons, (I) => (l(), y(U, V({ ref_for: !0 }, I, { onClick: c }), null, 16, ["onClick"]))), 256)),
              M(t.$slots, "split", {
                doClose: c,
                doRootClick: pe
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "referrer", "class"])) : r("", !0),
        oe.value && B.value ? (l(), y(N, V({
          key: 3,
          modelValue: v.value,
          "onUpdate:modelValue": i[3] || (i[3] = (c) => v.value = c)
        }, t.tooltip, { referrer: B.value }), Te({ _: 2 }, [
          Ae.value ? {
            name: "default",
            fn: q(({ doClose: c }) => [
              (l(!0), d(Q, null, Oe(t.splitButtons, (I) => (l(), y(U, V({ ref_for: !0 }, I, { onClick: c }), null, 16, ["onClick"]))), 256)),
              M(t.$slots, "tooltip", {
                doClose: c,
                doRootClick: pe
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "referrer"])) : r("", !0)
      ], 34);
    };
  }
}), bt = {
  install: (h) => {
    h.component("lkt-button") === void 0 && h.component("lkt-button", dt);
  }
}, St = (h) => {
  D.defaultSplitIcon = h;
};
export {
  Ct as debugLktButton,
  bt as default,
  St as setDefaultButtonSplitSlot
};
