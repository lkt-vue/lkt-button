import { defineComponent as Ye, mergeDefaults as Ze, useSlots as $e, ref as s, watch as V, computed as a, resolveComponent as M, createElementBlock as v, openBlock as n, normalizeClass as ie, createBlock as p, createCommentVNode as r, mergeProps as D, withCtx as q, renderSlot as L, toDisplayString as G, unref as J, Fragment as Q, createTextVNode as we, resolveDynamicComponent as Be, withDirectives as et, normalizeProps as Te, withModifiers as Oe, vShow as tt, createSlots as Re, renderList as Ee } from "vue";
import { generateRandomString as ot } from "lkt-string-tools";
import { httpCall as lt } from "lkt-http-client";
import { openModal as nt, openConfirm as it, runModalCallback as ut } from "lkt-modal";
import { useRouter as at } from "vue-router";
import { extractPropValue as A, ButtonType as o, extractI18nValue as ue, FieldType as Ie, getDefaultValues as rt, Button as ct, LktSettings as Fe } from "lkt-vue-kernel";
const W = class W {
};
W.debugEnabled = !1, W.defaultSplitIcon = void 0;
let T = W;
const gt = (h = !0) => {
  T.debugEnabled = h;
}, i = (...h) => {
  T.debugEnabled && console.info("[LktButton] ", ...h);
}, st = {
  key: 1,
  class: "lkt-button--icon-dot"
}, ft = ["src", "alt"], pt = {
  key: 1,
  class: "lkt-button--icon-dot"
}, dt = ["src", "alt"], vt = {
  key: 10,
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
  }, rt(ct)),
  emits: [
    "click",
    "focus",
    "blur",
    "loading",
    "loaded",
    "update:checked",
    "update:openTooltip"
  ],
  setup(h, { expose: Ve, emit: Me }) {
    const e = h, C = Me, _ = $e(), ae = at();
    let Le = A(e.modalKey, e.prop);
    const Ae = "lkt-button-" + ot(), w = s(e.loading), B = s(null), X = s(null), O = s(!1), m = s(e.openTooltip), re = s(!1), R = s(!1), E = s(void 0), f = s(e.checked), ce = s(void 0), Y = s(!1), Z = s(null), $ = s(!1);
    V(() => e.openTooltip, (t) => m.value = t), V(m, (t) => C("update:openTooltip", t));
    const se = a(() => {
      let t = [];
      return e.class && t.push(e.class), N.value && t.push("lkt-split-button"), t.push(`lkt-button--${e.type}`), w.value && t.push("is-loading"), re.value && t.push("is-active-route"), m.value && t.push("show-tooltip"), O.value && t.push("show-split"), f.value && t.push("is-checked"), ve.value && t.push("is-disabled"), Y.value && t.push("has-focus"), e.containerClass && t.push(e.containerClass), t.join(" ");
    }), g = a(() => {
      if (e.type === o.Switch || e.type === o.HiddenSwitch) {
        if (f.value && typeof e.textOn < "u") return ue(e.textOn);
        if (!f.value && typeof e.textOff < "u") return ue(e.textOff);
      }
      return ue(e.text);
    }), I = a(() => {
      let t = e.icon;
      return (e.type === o.Switch || e.type === o.HiddenSwitch) && (f.value && typeof e.iconOn < "u" ? t = e.iconOn : !f.value && typeof e.iconOff < "u" && (t = e.iconOff)), A(t, e.prop);
    }), fe = a(() => {
      let t = e.iconEnd;
      return (e.type === o.Switch || e.type === o.HiddenSwitch) && (f.value && typeof e.iconOn < "u" ? t = e.iconEndOn : !f.value && typeof e.iconOff < "u" && (t = e.iconEndOff)), A(t, e.prop);
    }), P = a(() => typeof e.modal == "function" ? e.modal(e.prop) : A(e.modal, e.prop)), H = a(() => typeof e.modalData == "function" ? e.modalData(e.prop) : e.modalData), He = a(() => typeof T.defaultSplitIcon < "u"), Ue = a(() => T.defaultSplitIcon), pe = a(() => typeof e.dot == "boolean" ? "" : e.dot), b = (t, l = void 0) => {
      i("endClickMethod", t, l), qe(), Ge(t === null ? void 0 : t, l), C("click", t, l);
    }, ee = a(() => {
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
      var k;
      i("Resource Click", e.resource, ee.value), w.value = !0, C("loading"), typeof ((k = e.events) == null ? void 0 : k.httpStart) == "function" && (i("Resource Click -> httpStart event"), e.events.httpStart());
      let l = { ...ee.value, isChecked: f.value };
      return lt(e.resource, l).then((d) => {
        var y;
        w.value = !1, C("loaded"), i("Resource Click -> Received response", d), typeof ((y = e.events) == null ? void 0 : y.httpEnd) == "function" && (i("Resource Click -> httpEnd event"), e.events.httpEnd({
          httpResponse: d
        })), b(t, d);
      }).catch((d) => {
        var y;
        w.value = !1, C("loaded"), i("Resource Click -> Received response error", d), typeof ((y = e.events) == null ? void 0 : y.httpEnd) == "function" && (i("Resource Click -> httpEnd event"), e.events.httpEnd({
          httpResponse: d
        })), b(t, d);
      });
    }, de = s(!1), Ne = a(() => B.value ? e.type === o.TooltipLazy ? de.value : e.type === o.TooltipEver ? m.value : e.type === o.Tooltip : !1), xe = s(!1), ze = a(() => B.value ? e.type === o.SplitLazy ? xe.value : e.type === o.SplitEver ? O.value : e.type === o.Split : !1), je = (t) => {
      if (Y.value = !0, $.value) {
        $.value = !1, C("focus");
        return;
      }
      C("focus", t);
    }, Ke = (t) => {
      Y.value = !1, C("blur", t);
    }, te = a(() => e.type === o.Switch || e.type === o.HiddenSwitch), _e = a(() => e.type === o.Switch), oe = a(() => e.type === o.FileUpload || e.type === o.ImageUpload), Pe = a(() => e.type === o.ImageUpload ? Ie.Image : Ie.File), qe = () => {
      e.modalCallbacks.forEach((t) => {
        ut(t);
      });
    }, Ge = (t, l) => {
      var k;
      i("doConfigClick: ", e), typeof ((k = e.events) == null ? void 0 : k.click) == "function" && e.events.click({
        event: t,
        httpResponse: l
      });
    }, N = a(() => [
      o.Split,
      o.SplitLazy,
      o.SplitEver
    ].includes(e.type)), le = a(() => [
      o.Tooltip,
      o.TooltipLazy,
      o.TooltipEver
    ].includes(e.type)), ne = (t) => {
      var l, k, d, y, x, z, j, c, F, ye, he, Ce, be, Se;
      if (i("Click", e, t), t && (te.value ? (l = t.target) != null && l.closest(".lkt-field.is-switch") || (f.value = !f.value) : oe.value ? Z.value && ((k = Z.value) == null || k.click()) : le.value ? (m.value = !m.value, m.value && (de.value = !0)) : N.value && (O.value = !O.value)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), N.value || le.value || oe.value) {
        b(t);
        return;
      }
      if (P.value) {
        let u = { ...H.value };
        i("Click -> has modal", e.modal, u), i("Click -> typeof beforeClose: ", typeof u.beforeClose), typeof u.beforeClose == "function" ? (u.beforeClose = (K) => {
          if (e.resource)
            return U(t).then(() => {
              typeof H.value.beforeClose == "function" && H.value.beforeClose(K);
            });
          typeof H.value.beforeClose == "function" && H.value.beforeClose(K), b(t);
        }, i("Click -> New beforeClose function: ", u.beforeClose)) : (u.beforeClose = () => {
          if (e.resource)
            return U(t);
          b(t);
        }, i("Click -> New beforeClose function: ", u.beforeClose));
        let S = P.value;
        return typeof P.value == "function" && (S = P.value()), nt(S, Le, u);
      }
      if (e.confirmModal) {
        i("Click -> has confirm modal", e.confirmModal, e.confirmData), i("Click -> typeof confirmData.events?.click: ", typeof ((d = e.confirmData.events) == null ? void 0 : d.click));
        let u = { ...e.confirmData };
        if (u.confirmButton ? u.confirmButton = { ...Fe.defaultConfirmButton, ...u.confirmButton } : u.confirmButton = { ...Fe.defaultConfirmButton }, u.confirmButton.events || (u.confirmButton.events = {}), typeof ((x = (y = u.confirmButton) == null ? void 0 : y.events) == null ? void 0 : x.click) == "function") {
          let S = (j = (z = u.confirmButton) == null ? void 0 : z.events) == null ? void 0 : j.click;
          i("Click -> Has confirmData.events?.click function: ", S), u.confirmButton.events.click = () => {
            if (i("confirmData.events?.click -> Already: ", e), e.resource)
              return U(t).then(() => {
                S();
              });
            S(), b(t);
          }, i("Click -> New confirmData.events?.click function created: ", (F = (c = u.confirmButton) == null ? void 0 : c.events) == null ? void 0 : F.click);
        } else
          u.confirmButton.events.click = () => {
            var S, K, ge, De;
            if (i("confirmData.events?.click -> Created: ", e), e.resource)
              return U(t);
            if (((S = e.anchor) == null ? void 0 : S.to) !== "") {
              t && (t.preventDefault(), t.stopPropagation()), (K = e.anchor) != null && K.external || typeof ((ge = e.anchor) == null ? void 0 : ge.to) < "u" && ae.push((De = e.anchor) == null ? void 0 : De.to);
              return;
            }
            b(t);
          }, i("Click -> New confirmData.events?.click function created: ", (ye = u.confirmButton) == null ? void 0 : ye.events.click);
        return it(e.confirmModal, e.confirmModalKey, u);
      }
      if (e.resource)
        return i("Click -> has resource"), U(t);
      if (typeof ((he = e.anchor) == null ? void 0 : he.to) < "u" && ((Ce = e.anchor) == null ? void 0 : Ce.to) !== "") {
        i("Click -> Is Anchor", e.anchor), (be = e.anchor) != null && be.external ? typeof ((Se = e.anchor) == null ? void 0 : Se.to) == "string" && (window.location.href = e.anchor.to) : ae.push(e.anchor.to);
        return;
      }
      if (te.value) {
        i("Click -> Is Switch"), b(t);
        return;
      }
      i("Click -> Emit", e), b(t);
    };
    V(() => e.loading, () => w.value = e.loading), V(() => e.checked, () => f.value = e.checked), V(f, (t) => C("update:checked", t)), V(R, (t) => {
      R.value && e.showTooltipOnHover ? (E.value !== void 0 && clearTimeout(E.value), E.value = setTimeout(() => {
        m.value = !0, clearTimeout(E.value);
      }, e.showTooltipOnHoverDelay)) : !R.value && e.hideTooltipOnLeave ? (m.value = !1, clearTimeout(E.value)) : R.value || clearTimeout(E.value);
    }), Ve({
      click: () => ne(null),
      focus: (t) => {
        X.value && (t && ($.value = !0), X.value.focus());
      }
    });
    const Je = a(() => e.type === o.Content ? "div" : "button"), Qe = a(() => {
      switch (e.type) {
        case o.Button:
        case o.Submit:
          return e.type;
        default:
          return "button";
      }
    }), ve = a(() => e.disabled === void 0 ? !1 : typeof e.disabled == "function" ? e.disabled({
      prop: e.prop
    }) : typeof e.disabled == "boolean" ? e.disabled : !1), me = (t) => ne(t), We = (t) => re.value = t, ke = a(() => e.type === o.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), Xe = a(() => ke.value ? {
      ...e.anchor,
      class: se.value,
      prop: e.prop
    } : {});
    return (t, l) => {
      const k = M("lkt-spinner"), d = M("lkt-anchor"), y = M("lkt-icon"), x = M("lkt-field"), z = M("lkt-button", !0), j = M("lkt-tooltip");
      return n(), v("div", {
        class: ie(["lkt-button", se.value]),
        ref_key: "container",
        ref: B,
        id: Ae,
        onMousemove: l[4] || (l[4] = (c) => R.value = !0),
        onMouseleave: l[5] || (l[5] = (c) => R.value = !1)
      }, [
        ke.value ? (n(), p(d, D({ key: 0 }, Xe.value, {
          class: "lkt-button-main",
          onActive: We
        }), {
          default: q(() => [
            I.value ? (n(), v("i", {
              key: 0,
              class: ie(I.value)
            }, null, 2)) : r("", !0),
            I.value && t.dot ? (n(), v("i", st, G(pe.value), 1)) : r("", !0),
            t.img ? (n(), v("img", {
              key: 2,
              src: t.img,
              alt: g.value
            }, null, 8, ft)) : r("", !0),
            J(_).text ? L(t.$slots, "text", {
              key: 3,
              text: g.value
            }) : g.value ? (n(), v(Q, { key: 4 }, [
              we(G(g.value), 1)
            ], 64)) : r("", !0),
            J(_).default ? L(t.$slots, "default", { key: 5 }) : r("", !0),
            w.value ? (n(), p(k, { key: 6 })) : r("", !0)
          ]),
          _: 3
        }, 16)) : (n(), p(Be(Je.value), {
          key: 1,
          class: "lkt-button-main",
          ref_key: "button",
          ref: X,
          name: t.name,
          type: Qe.value,
          disabled: ve.value,
          tabindex: t.tabindex,
          onClick: ne,
          onFocus: je,
          onBlur: Ke
        }, {
          default: q(() => [
            I.value ? (n(), p(y, Te(D({ key: 0 }, { icon: I.value })), null, 16)) : r("", !0),
            I.value && t.dot ? (n(), v("i", pt, G(pe.value), 1)) : r("", !0),
            t.img ? (n(), v("img", {
              key: 2,
              src: t.img,
              alt: g.value
            }, null, 8, dt)) : r("", !0),
            J(_).text ? L(t.$slots, "text", {
              key: 3,
              text: g.value
            }) : g.value ? (n(), v(Q, { key: 4 }, [
              we(G(g.value), 1)
            ], 64)) : r("", !0),
            J(_).default ? L(t.$slots, "default", { key: 5 }) : r("", !0),
            w.value ? (n(), p(k, { key: 6 })) : r("", !0),
            te.value ? et((n(), p(x, {
              key: 7,
              type: "switch",
              modelValue: f.value,
              "onUpdate:modelValue": l[0] || (l[0] = (c) => f.value = c),
              disabled: t.disabled,
              onClick: Oe(() => {
              }, ["stop"])
            }, null, 8, ["modelValue", "disabled"])), [
              [tt, _e.value]
            ]) : r("", !0),
            oe.value ? (n(), p(x, D({
              key: 8,
              ref_key: "fileFieldRef",
              ref: Z,
              type: Pe.value,
              modelValue: ce.value,
              "onUpdate:modelValue": l[1] || (l[1] = (c) => ce.value = c),
              hidden: ""
            }, {
              fileUploadHttp: {
                resource: t.resource,
                data: ee.value
              }
            }, {
              disabled: t.disabled,
              onClick: Oe(() => {
              }, ["stop"])
            }), null, 16, ["type", "modelValue", "disabled"])) : r("", !0),
            fe.value ? (n(), p(y, Te(D({ key: 9 }, { icon: fe.value, class: "lkt-button-icon-end" })), null, 16)) : r("", !0),
            N.value ? (n(), v("div", vt, [
              t.splitIcon ? (n(), v("i", {
                key: 0,
                class: ie(t.splitIcon)
              }, null, 2)) : He.value ? (n(), p(Be(Ue.value), { key: 1 })) : r("", !0)
            ])) : r("", !0)
          ]),
          _: 3
        }, 40, ["name", "type", "disabled", "tabindex"])),
        N.value && B.value ? (n(), p(j, D({
          key: 2,
          modelValue: O.value,
          "onUpdate:modelValue": l[2] || (l[2] = (c) => O.value = c)
        }, {
          referrer: B.value,
          ...t.tooltip
        }, {
          class: ["lkt-split-button-dropdown-content", t.splitClass]
        }), Re({ _: 2 }, [
          ze.value ? {
            name: "default",
            fn: q(({ doClose: c }) => [
              (n(!0), v(Q, null, Ee(t.splitButtons, (F) => (n(), p(z, D({ ref_for: !0 }, F, { onClick: c }), null, 16, ["onClick"]))), 256)),
              L(t.$slots, "split", {
                doClose: c,
                doRootClick: me
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "class"])) : r("", !0),
        le.value && B.value ? (n(), p(j, D({
          key: 3,
          modelValue: m.value,
          "onUpdate:modelValue": l[3] || (l[3] = (c) => m.value = c)
        }, {
          referrer: B.value,
          ...t.tooltip
        }), Re({ _: 2 }, [
          Ne.value ? {
            name: "default",
            fn: q(({ doClose: c }) => [
              (n(!0), v(Q, null, Ee(t.splitButtons, (F) => (n(), p(z, D({ ref_for: !0 }, F, { onClick: c }), null, 16, ["onClick"]))), 256)),
              L(t.$slots, "tooltip", {
                doClose: c,
                doRootClick: me
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue"])) : r("", !0)
      ], 34);
    };
  }
}), Dt = {
  install: (h) => {
    h.component("lkt-button") === void 0 && h.component("lkt-button", mt);
  }
}, wt = (h) => {
  T.defaultSplitIcon = h;
};
export {
  gt as debugLktButton,
  Dt as default,
  wt as setDefaultButtonSplitSlot
};
