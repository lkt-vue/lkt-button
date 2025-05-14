import { defineComponent as We, mergeDefaults as Xe, useSlots as Ye, ref as s, watch as F, computed as a, resolveComponent as z, createElementBlock as p, openBlock as n, normalizeClass as K, createBlock as y, createCommentVNode as r, mergeProps as V, withCtx as q, renderSlot as M, toDisplayString as G, unref as J, Fragment as Q, createTextVNode as we, resolveDynamicComponent as Be, withDirectives as Ze, withModifiers as Te, vShow as $e, createSlots as Oe, renderList as Re } from "vue";
import { generateRandomString as et } from "lkt-string-tools";
import { httpCall as tt } from "lkt-http-client";
import { openModal as ot, openConfirm as lt, runModalCallback as nt } from "lkt-modal";
import { useRouter as it } from "vue-router";
import { extractPropValue as L, ButtonType as l, extractI18nValue as ie, FieldType as Ee, getDefaultValues as ut, Button as at, LktSettings as Ie } from "lkt-vue-kernel";
const W = class W {
};
W.debugEnabled = !1, W.defaultSplitIcon = void 0;
let B = W;
const bt = (h = !0) => {
  B.debugEnabled = h;
}, i = (...h) => {
  B.debugEnabled && console.info("[LktButton] ", ...h);
}, rt = {
  key: 1,
  class: "lkt-button--icon-dot"
}, ct = ["src", "alt"], st = {
  key: 1,
  class: "lkt-button--icon-dot"
}, ft = ["src", "alt"], pt = {
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
  }, ut(at)),
  emits: [
    "click",
    "focus",
    "blur",
    "loading",
    "loaded",
    "update:checked",
    "update:openTooltip"
  ],
  setup(h, { expose: Fe, emit: Ve }) {
    const e = h, C = Ve, P = Ye(), ue = it();
    let Me = L(e.modalKey, e.prop);
    const Le = "lkt-button-" + et(), D = s(e.loading), w = s(null), X = s(null), T = s(!1), v = s(e.openTooltip), ae = s(!1), O = s(!1), R = s(void 0), f = s(e.checked), re = s(void 0), Y = s(!1), Z = s(null), $ = s(!1);
    F(() => e.openTooltip, (t) => v.value = t), F(v, (t) => C("update:openTooltip", t));
    const ce = a(() => {
      let t = [];
      return e.class && t.push(e.class), U.value && t.push("lkt-split-button"), t.push(`lkt-button--${e.type}`), D.value && t.push("is-loading"), ae.value && t.push("is-active-route"), v.value && t.push("show-tooltip"), T.value && t.push("show-split"), f.value && t.push("is-checked"), de.value && t.push("is-disabled"), Y.value && t.push("has-focus"), e.containerClass && t.push(e.containerClass), t.join(" ");
    }), S = a(() => {
      if (e.type === l.Switch || e.type === l.HiddenSwitch) {
        if (f.value && typeof e.textOn < "u") return ie(e.textOn);
        if (!f.value && typeof e.textOff < "u") return ie(e.textOff);
      }
      return ie(e.text);
    }), E = a(() => {
      let t = e.icon;
      return (e.type === l.Switch || e.type === l.HiddenSwitch) && (f.value && typeof e.iconOn < "u" ? t = e.iconOn : !f.value && typeof e.iconOff < "u" && (t = e.iconOff)), L(t, e.prop);
    }), se = a(() => {
      let t = e.iconEnd;
      return (e.type === l.Switch || e.type === l.HiddenSwitch) && (f.value && typeof e.iconOn < "u" ? t = e.iconEndOn : !f.value && typeof e.iconOff < "u" && (t = e.iconEndOff)), L(t, e.prop);
    }), _ = a(() => typeof e.modal == "function" ? e.modal(e.prop) : L(e.modal, e.prop)), A = a(() => typeof e.modalData == "function" ? e.modalData(e.prop) : e.modalData), Ae = a(() => typeof B.defaultSplitIcon < "u"), He = a(() => B.defaultSplitIcon), fe = a(() => typeof e.dot == "boolean" ? "" : e.dot), b = (t, o = void 0) => {
      i("endClickMethod", t, o), _e(), qe(t === null ? void 0 : t, o), C("click", t, o);
    }, ee = a(() => {
      if (typeof e.resourceData == "function") return e.resourceData(e.prop);
      if (typeof e.resourceData == "string") return L(e.resourceData, e.prop);
      if (typeof e.resourceData == "object" && !Array.isArray(e.resourceData)) {
        let t = {};
        for (let o in e.resourceData)
          t[o] = L(e.resourceData[o], e.prop);
        return t;
      }
      return e.resourceData;
    }), H = async (t) => {
      var m;
      i("Resource Click", e.resource, ee.value), D.value = !0, C("loading"), typeof ((m = e.events) == null ? void 0 : m.httpStart) == "function" && (i("Resource Click -> httpStart event"), e.events.httpStart());
      let o = { ...ee.value, isChecked: f.value };
      return tt(e.resource, o).then((d) => {
        var k;
        D.value = !1, C("loaded"), i("Resource Click -> Received response", d), typeof ((k = e.events) == null ? void 0 : k.httpEnd) == "function" && (i("Resource Click -> httpEnd event"), e.events.httpEnd({
          httpResponse: d
        })), b(t, d);
      }).catch((d) => {
        var k;
        D.value = !1, C("loaded"), i("Resource Click -> Received response error", d), typeof ((k = e.events) == null ? void 0 : k.httpEnd) == "function" && (i("Resource Click -> httpEnd event"), e.events.httpEnd({
          httpResponse: d
        })), b(t, d);
      });
    }, pe = s(!1), Ue = a(() => w.value ? e.type === l.TooltipLazy ? pe.value : e.type === l.TooltipEver ? v.value : e.type === l.Tooltip : !1), Ne = s(!1), xe = a(() => w.value ? e.type === l.SplitLazy ? Ne.value : e.type === l.SplitEver ? T.value : e.type === l.Split : !1), je = (t) => {
      if (Y.value = !0, $.value) {
        $.value = !1, C("focus");
        return;
      }
      C("focus", t);
    }, ze = (t) => {
      Y.value = !1, C("blur", t);
    }, te = a(() => e.type === l.Switch || e.type === l.HiddenSwitch), Ke = a(() => e.type === l.Switch), oe = a(() => e.type === l.FileUpload || e.type === l.ImageUpload), Pe = a(() => e.type === l.ImageUpload ? Ee.Image : Ee.File), _e = () => {
      e.modalCallbacks.forEach((t) => {
        nt(t);
      });
    }, qe = (t, o) => {
      var m;
      i("doConfigClick: ", e), typeof ((m = e.events) == null ? void 0 : m.click) == "function" && e.events.click({
        event: t,
        httpResponse: o
      });
    }, U = a(() => [
      l.Split,
      l.SplitLazy,
      l.SplitEver
    ].includes(e.type)), le = a(() => [
      l.Tooltip,
      l.TooltipLazy,
      l.TooltipEver
    ].includes(e.type)), ne = (t) => {
      var o, m, d, k, N, x, c, I, ke, ye, he, Ce, be, ge;
      if (i("Click", e, t), t && (te.value ? (o = t.target) != null && o.closest(".lkt-field.is-switch") || (f.value = !f.value) : oe.value ? Z.value && ((m = Z.value) == null || m.click()) : le.value ? (v.value = !v.value, v.value && (pe.value = !0)) : U.value && (T.value = !T.value)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), U.value || le.value || oe.value) {
        b(t);
        return;
      }
      if (_.value) {
        let u = { ...A.value };
        i("Click -> has modal", e.modal, u), i("Click -> typeof beforeClose: ", typeof u.beforeClose), typeof u.beforeClose == "function" ? (u.beforeClose = (j) => {
          if (e.resource)
            return H(t).then(() => {
              typeof A.value.beforeClose == "function" && A.value.beforeClose(j);
            });
          typeof A.value.beforeClose == "function" && A.value.beforeClose(j), b(t);
        }, i("Click -> New beforeClose function: ", u.beforeClose)) : (u.beforeClose = () => {
          if (e.resource)
            return H(t);
          b(t);
        }, i("Click -> New beforeClose function: ", u.beforeClose));
        let g = _.value;
        return typeof _.value == "function" && (g = _.value()), ot(g, Me, u);
      }
      if (e.confirmModal) {
        i("Click -> has confirm modal", e.confirmModal, e.confirmData), i("Click -> typeof confirmData.events?.click: ", typeof ((d = e.confirmData.events) == null ? void 0 : d.click));
        let u = { ...e.confirmData };
        if (u.confirmButton ? u.confirmButton = { ...Ie.defaultConfirmButton, ...u.confirmButton } : u.confirmButton = { ...Ie.defaultConfirmButton }, u.confirmButton.events || (u.confirmButton.events = {}), typeof ((N = (k = u.confirmButton) == null ? void 0 : k.events) == null ? void 0 : N.click) == "function") {
          let g = (c = (x = u.confirmButton) == null ? void 0 : x.events) == null ? void 0 : c.click;
          i("Click -> Has confirmData.events?.click function: ", g), u.confirmButton.events.click = () => {
            if (i("confirmData.events?.click -> Already: ", e), e.resource)
              return H(t).then(() => {
                g();
              });
            g(), b(t);
          }, i("Click -> New confirmData.events?.click function created: ", (ke = (I = u.confirmButton) == null ? void 0 : I.events) == null ? void 0 : ke.click);
        } else
          u.confirmButton.events.click = () => {
            var g, j, Se, De;
            if (i("confirmData.events?.click -> Created: ", e), e.resource)
              return H(t);
            if (((g = e.anchor) == null ? void 0 : g.to) !== "") {
              t && (t.preventDefault(), t.stopPropagation()), (j = e.anchor) != null && j.external || typeof ((Se = e.anchor) == null ? void 0 : Se.to) < "u" && ue.push((De = e.anchor) == null ? void 0 : De.to);
              return;
            }
            b(t);
          }, i("Click -> New confirmData.events?.click function created: ", (ye = u.confirmButton) == null ? void 0 : ye.events.click);
        return lt(e.confirmModal, e.confirmModalKey, u);
      }
      if (e.resource)
        return i("Click -> has resource"), H(t);
      if (typeof ((he = e.anchor) == null ? void 0 : he.to) < "u" && ((Ce = e.anchor) == null ? void 0 : Ce.to) !== "") {
        i("Click -> Is Anchor", e.anchor), (be = e.anchor) != null && be.external ? typeof ((ge = e.anchor) == null ? void 0 : ge.to) == "string" && (window.location.href = e.anchor.to) : ue.push(e.anchor.to);
        return;
      }
      if (te.value) {
        i("Click -> Is Switch"), b(t);
        return;
      }
      i("Click -> Emit", e), b(t);
    };
    F(() => e.loading, () => D.value = e.loading), F(() => e.checked, () => f.value = e.checked), F(f, (t) => C("update:checked", t)), F(O, (t) => {
      O.value && e.showTooltipOnHover ? (R.value !== void 0 && clearTimeout(R.value), R.value = setTimeout(() => {
        v.value = !0, clearTimeout(R.value);
      }, e.showTooltipOnHoverDelay)) : !O.value && e.hideTooltipOnLeave ? (v.value = !1, clearTimeout(R.value)) : O.value || clearTimeout(R.value);
    }), Fe({
      click: () => ne(null),
      focus: (t) => {
        X.value && (t && ($.value = !0), X.value.focus());
      }
    });
    const Ge = a(() => e.type === l.Content ? "div" : "button"), de = a(() => e.disabled === void 0 ? !1 : typeof e.disabled == "function" ? e.disabled({
      prop: e.prop
    }) : typeof e.disabled == "boolean" ? e.disabled : !1), ve = (t) => ne(t), Je = (t) => ae.value = t, me = a(() => e.type === l.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), Qe = a(() => me.value ? {
      ...e.anchor,
      class: ce.value,
      prop: e.prop
    } : {});
    return (t, o) => {
      const m = z("lkt-spinner"), d = z("lkt-anchor"), k = z("lkt-field"), N = z("lkt-button", !0), x = z("lkt-tooltip");
      return n(), p("div", {
        class: K(["lkt-button", ce.value]),
        ref_key: "container",
        ref: w,
        id: Le,
        onMousemove: o[4] || (o[4] = (c) => O.value = !0),
        onMouseleave: o[5] || (o[5] = (c) => O.value = !1)
      }, [
        me.value ? (n(), y(d, V({ key: 0 }, Qe.value, {
          class: "lkt-button-main",
          onActive: Je
        }), {
          default: q(() => [
            E.value ? (n(), p("i", {
              key: 0,
              class: K(E.value)
            }, null, 2)) : r("", !0),
            E.value && t.dot ? (n(), p("i", rt, G(fe.value), 1)) : r("", !0),
            t.img ? (n(), p("img", {
              key: 2,
              src: t.img,
              alt: S.value
            }, null, 8, ct)) : r("", !0),
            J(P).text ? M(t.$slots, "text", {
              key: 3,
              text: S.value
            }) : S.value ? (n(), p(Q, { key: 4 }, [
              we(G(S.value), 1)
            ], 64)) : r("", !0),
            J(P).default ? M(t.$slots, "default", { key: 5 }) : r("", !0),
            D.value ? (n(), y(m, { key: 6 })) : r("", !0)
          ]),
          _: 3
        }, 16)) : (n(), y(Be(Ge.value), {
          key: 1,
          class: "lkt-button-main",
          ref_key: "button",
          ref: X,
          name: t.name,
          type: t.type,
          disabled: de.value,
          tabindex: t.tabindex,
          onClick: ne,
          onFocus: je,
          onBlur: ze
        }, {
          default: q(() => [
            E.value ? (n(), p("i", {
              key: 0,
              class: K(E.value)
            }, null, 2)) : r("", !0),
            E.value && t.dot ? (n(), p("i", st, G(fe.value), 1)) : r("", !0),
            t.img ? (n(), p("img", {
              key: 2,
              src: t.img,
              alt: S.value
            }, null, 8, ft)) : r("", !0),
            J(P).text ? M(t.$slots, "text", {
              key: 3,
              text: S.value
            }) : S.value ? (n(), p(Q, { key: 4 }, [
              we(G(S.value), 1)
            ], 64)) : r("", !0),
            J(P).default ? M(t.$slots, "default", { key: 5 }) : r("", !0),
            D.value ? (n(), y(m, { key: 6 })) : r("", !0),
            te.value ? Ze((n(), y(k, {
              key: 7,
              type: "switch",
              modelValue: f.value,
              "onUpdate:modelValue": o[0] || (o[0] = (c) => f.value = c),
              disabled: t.disabled,
              onClick: Te(() => {
              }, ["stop"])
            }, null, 8, ["modelValue", "disabled"])), [
              [$e, Ke.value]
            ]) : r("", !0),
            oe.value ? (n(), y(k, V({
              key: 8,
              ref_key: "fileFieldRef",
              ref: Z,
              type: Pe.value,
              modelValue: re.value,
              "onUpdate:modelValue": o[1] || (o[1] = (c) => re.value = c),
              hidden: ""
            }, {
              fileUploadHttp: {
                resource: t.resource,
                data: ee.value
              }
            }, {
              disabled: t.disabled,
              onClick: Te(() => {
              }, ["stop"])
            }), null, 16, ["type", "modelValue", "disabled"])) : r("", !0),
            se.value ? (n(), p("i", {
              key: 9,
              class: K([se.value, "lkt-button-icon-end"])
            }, null, 2)) : r("", !0),
            U.value ? (n(), p("div", pt, [
              t.splitIcon ? (n(), p("i", {
                key: 0,
                class: K(t.splitIcon)
              }, null, 2)) : Ae.value ? (n(), y(Be(He.value), { key: 1 })) : r("", !0)
            ])) : r("", !0)
          ]),
          _: 3
        }, 40, ["name", "type", "disabled", "tabindex"])),
        U.value && w.value ? (n(), y(x, V({
          key: 2,
          modelValue: T.value,
          "onUpdate:modelValue": o[2] || (o[2] = (c) => T.value = c)
        }, t.tooltip, {
          referrer: w.value,
          class: ["lkt-split-button-dropdown-content", t.splitClass]
        }), Oe({ _: 2 }, [
          xe.value ? {
            name: "default",
            fn: q(({ doClose: c }) => [
              (n(!0), p(Q, null, Re(t.splitButtons, (I) => (n(), y(N, V({ ref_for: !0 }, I, { onClick: c }), null, 16, ["onClick"]))), 256)),
              M(t.$slots, "split", {
                doClose: c,
                doRootClick: ve
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "referrer", "class"])) : r("", !0),
        le.value && w.value ? (n(), y(x, V({
          key: 3,
          modelValue: v.value,
          "onUpdate:modelValue": o[3] || (o[3] = (c) => v.value = c)
        }, t.tooltip, { referrer: w.value }), Oe({ _: 2 }, [
          Ue.value ? {
            name: "default",
            fn: q(({ doClose: c }) => [
              (n(!0), p(Q, null, Re(t.splitButtons, (I) => (n(), y(N, V({ ref_for: !0 }, I, { onClick: c }), null, 16, ["onClick"]))), 256)),
              M(t.$slots, "tooltip", {
                doClose: c,
                doRootClick: ve
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "referrer"])) : r("", !0)
      ], 34);
    };
  }
}), gt = {
  install: (h) => {
    h.component("lkt-button") === void 0 && h.component("lkt-button", dt);
  }
}, St = (h) => {
  B.defaultSplitIcon = h;
};
export {
  bt as debugLktButton,
  gt as default,
  St as setDefaultButtonSplitSlot
};
