import { defineComponent as $e, mergeDefaults as et, useSlots as tt, ref as s, watch as L, computed as n, resolveComponent as A, createElementBlock as S, unref as W, openBlock as a, renderSlot as I, normalizeClass as we, createBlock as d, createCommentVNode as c, mergeProps as T, withCtx as Q, resolveDynamicComponent as Be, withDirectives as ot, normalizeProps as Te, toDisplayString as lt, withModifiers as Oe, vShow as nt, createSlots as Ee, Fragment as Ie, renderList as Re } from "vue";
import { generateRandomString as it } from "lkt-string-tools";
import { httpCall as ut } from "lkt-http-client";
import { openModal as at, openConfirm as rt, runModalCallback as ct } from "lkt-modal";
import { useRouter as st } from "vue-router";
import { extractPropValue as H, ButtonType as o, MenuController as Me, extractI18nValue as ne, IconPosition as ie, FieldType as Fe, getDefaultValues as ft, Button as pt, LktSettings as Ve } from "lkt-vue-kernel";
const X = class X {
};
X.debugEnabled = !1, X.defaultSplitIcon = void 0;
let R = X;
const wt = (h = !0) => {
  R.debugEnabled = h;
}, i = (...h) => {
  R.debugEnabled && console.info("[LktButton] ", ...h);
}, dt = ["src", "alt"], vt = ["src", "alt"], mt = {
  key: 3,
  class: "lkt-button--label"
}, yt = {
  key: 9,
  class: "lkt-split-button-arrow"
}, kt = /* @__PURE__ */ $e({
  __name: "LktButton",
  props: /* @__PURE__ */ et({
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
    menuKey: { type: [String, Number, Function] },
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
  }, ft(pt)),
  emits: [
    "click",
    "focus",
    "blur",
    "loading",
    "loaded",
    "update:checked",
    "update:openTooltip"
  ],
  setup(h, { expose: Le, emit: Ae }) {
    const e = h, b = Ae, q = tt(), ue = st();
    let He = H(e.modalKey, e.prop);
    const je = "lkt-button-" + it(), O = s(e.loading), E = s(null), Y = s(null), M = s(!1), m = s(e.openTooltip), ae = s(!1), D = s(!1), F = s(void 0), f = s(e.checked), re = s(void 0), Z = s(!1), _ = s(null), $ = s(!1);
    L(() => e.openTooltip, (t) => m.value = t), L(m, (t) => b("update:openTooltip", t));
    const ce = n(() => {
      let t = [];
      return e.class && t.push(e.class), K.value && t.push("lkt-split-button"), t.push(`lkt-button--${e.type}`), O.value && t.push("is-loading"), ae.value && t.push("is-active-route"), m.value && t.push("show-tooltip"), M.value && t.push("show-split"), f.value && t.push("is-checked"), de.value && t.push("is-disabled"), Z.value && t.push("has-focus"), e.containerClass && t.push(e.containerClass), e.type === o.Menu && (t.push(`menu-target--${e.menuKey}`), Me.getMenuStatus(e.menuKey) && t.push("menu-opened")), t.join(" ");
    }), w = n(() => {
      if (e.type === o.Switch || e.type === o.HiddenSwitch) {
        if (f.value && typeof e.textOn < "u") return ne(e.textOn);
        if (!f.value && typeof e.textOff < "u") return ne(e.textOff);
      }
      return ne(e.text);
    }), p = n(() => {
      let t = e.icon;
      return (e.type === o.Switch || e.type === o.HiddenSwitch) && (f.value && typeof e.iconOn < "u" ? t = e.iconOn : !f.value && typeof e.iconOff < "u" && (t = e.iconOff)), H(t, e.prop);
    }), B = n(() => {
      if (typeof p.value == "object" && p.value.position === ie.End)
        return p.value;
      let t = e.iconEnd;
      return (e.type === o.Switch || e.type === o.HiddenSwitch) && (f.value && typeof e.iconOn < "u" ? t = e.iconEndOn : !f.value && typeof e.iconOff < "u" && (t = e.iconEndOff)), H(t, e.prop);
    }), G = n(() => typeof e.modal == "function" ? e.modal(e.prop) : H(e.modal, e.prop)), j = n(() => typeof e.modalData == "function" ? e.modalData(e.prop) : e.modalData), Ue = n(() => typeof R.defaultSplitIcon < "u"), Ke = n(() => R.defaultSplitIcon), Ne = n(() => typeof e.dot == "boolean" ? "" : e.dot), C = (t, l = void 0) => {
      i("endClickMethod", t, l), Ge(), Je(t === null ? void 0 : t, l), b("click", t, l);
    }, ee = n(() => {
      if (typeof e.resourceData == "function") return e.resourceData(e.prop);
      if (typeof e.resourceData == "string") return H(e.resourceData, e.prop);
      if (typeof e.resourceData == "object" && !Array.isArray(e.resourceData)) {
        let t = {};
        for (let l in e.resourceData)
          t[l] = H(e.resourceData[l], e.prop);
        return t;
      }
      return e.resourceData;
    }), U = async (t) => {
      var y;
      i("Resource Click", e.resource, ee.value), O.value = !0, b("loading"), typeof ((y = e.events) == null ? void 0 : y.httpStart) == "function" && (i("Resource Click -> httpStart event"), e.events.httpStart());
      let l = { ...ee.value, isChecked: f.value };
      return ut(e.resource, l).then((v) => {
        var k;
        O.value = !1, b("loaded"), i("Resource Click -> Received response", v), typeof ((k = e.events) == null ? void 0 : k.httpEnd) == "function" && (i("Resource Click -> httpEnd event"), e.events.httpEnd({
          httpResponse: v
        })), C(t, v);
      }).catch((v) => {
        var k;
        O.value = !1, b("loaded"), i("Resource Click -> Received response error", v), typeof ((k = e.events) == null ? void 0 : k.httpEnd) == "function" && (i("Resource Click -> httpEnd event"), e.events.httpEnd({
          httpResponse: v
        })), C(t, v);
      });
    }, se = s(!1), xe = n(() => E.value ? e.type === o.TooltipLazy ? se.value : e.type === o.TooltipEver ? m.value : e.type === o.Tooltip : !1), ze = s(!1), Pe = n(() => E.value ? e.type === o.SplitLazy ? ze.value : e.type === o.SplitEver ? M.value : e.type === o.Split : !1), fe = (t) => {
      if (Z.value = !0, $.value) {
        $.value = !1, b("focus");
        return;
      }
      b("focus", t);
    }, pe = (t) => {
      Z.value = !1, b("blur", t);
    }, te = n(() => e.type === o.Switch || e.type === o.HiddenSwitch), We = n(() => e.type === o.Switch), oe = n(() => e.type === o.FileUpload || e.type === o.ImageUpload), qe = n(() => e.type === o.ImageUpload ? Fe.Image : Fe.File), Ge = () => {
      e.modalCallbacks.forEach((t) => {
        ct(t);
      });
    }, Je = (t, l) => {
      var y;
      i("doConfigClick: ", e), typeof ((y = e.events) == null ? void 0 : y.click) == "function" && e.events.click({
        event: t,
        httpResponse: l
      });
    }, K = n(() => [
      o.Split,
      o.SplitLazy,
      o.SplitEver
    ].includes(e.type)), le = n(() => [
      o.Tooltip,
      o.TooltipLazy,
      o.TooltipEver
    ].includes(e.type)), J = (t) => {
      var l, y, v, k, N, x, z, r, V, ke, he, be, Ce, ge;
      if (i("Click", e, t), t && (te.value ? (l = t.target) != null && l.closest(".lkt-field.is-switch") || (f.value = !f.value) : oe.value ? _.value && ((y = _.value) == null || y.click()) : le.value ? (m.value = !m.value, m.value && (se.value = !0)) : K.value ? M.value = !M.value : e.type === o.Menu && Me.toggleMenu(e.menuKey)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), K.value || le.value || oe.value) {
        C(t);
        return;
      }
      if (G.value) {
        let u = { ...j.value };
        i("Click -> has modal", e.modal, u), i("Click -> typeof beforeClose: ", typeof u.beforeClose), typeof u.beforeClose == "function" ? (u.beforeClose = (P) => {
          if (e.resource)
            return U(t).then(() => {
              typeof j.value.beforeClose == "function" && j.value.beforeClose(P);
            });
          typeof j.value.beforeClose == "function" && j.value.beforeClose(P), C(t);
        }, i("Click -> New beforeClose function: ", u.beforeClose)) : (u.beforeClose = () => {
          if (e.resource)
            return U(t);
          C(t);
        }, i("Click -> New beforeClose function: ", u.beforeClose));
        let g = G.value;
        return typeof G.value == "function" && (g = G.value()), at(g, He, u);
      }
      if (e.confirmModal) {
        i("Click -> has confirm modal", e.confirmModal, e.confirmData), i("Click -> typeof confirmData.events?.click: ", typeof ((v = e.confirmData.events) == null ? void 0 : v.click));
        let u = { ...e.confirmData };
        if (u.confirmButton ? u.confirmButton = { ...Ve.defaultConfirmButton, ...u.confirmButton } : u.confirmButton = { ...Ve.defaultConfirmButton }, u.confirmButton.events || (u.confirmButton.events = {}), typeof ((N = (k = u.confirmButton) == null ? void 0 : k.events) == null ? void 0 : N.click) == "function") {
          let g = (z = (x = u.confirmButton) == null ? void 0 : x.events) == null ? void 0 : z.click;
          i("Click -> Has confirmData.events?.click function: ", g), u.confirmButton.events.click = () => {
            if (i("confirmData.events?.click -> Already: ", e), e.resource)
              return U(t).then(() => {
                g();
              });
            g(), C(t);
          }, i("Click -> New confirmData.events?.click function created: ", (V = (r = u.confirmButton) == null ? void 0 : r.events) == null ? void 0 : V.click);
        } else
          u.confirmButton.events.click = () => {
            var g, P, Se, De;
            if (i("confirmData.events?.click -> Created: ", e), e.resource)
              return U(t);
            if (((g = e.anchor) == null ? void 0 : g.to) !== "") {
              t && (t.preventDefault(), t.stopPropagation()), (P = e.anchor) != null && P.external || typeof ((Se = e.anchor) == null ? void 0 : Se.to) < "u" && ue.push((De = e.anchor) == null ? void 0 : De.to);
              return;
            }
            C(t);
          }, i("Click -> New confirmData.events?.click function created: ", (ke = u.confirmButton) == null ? void 0 : ke.events.click);
        return rt(e.confirmModal, e.confirmModalKey, u);
      }
      if (e.resource)
        return i("Click -> has resource"), U(t);
      if (typeof ((he = e.anchor) == null ? void 0 : he.to) < "u" && ((be = e.anchor) == null ? void 0 : be.to) !== "") {
        i("Click -> Is Anchor", e.anchor), (Ce = e.anchor) != null && Ce.external ? typeof ((ge = e.anchor) == null ? void 0 : ge.to) == "string" && (window.location.href = e.anchor.to) : ue.push(e.anchor.to);
        return;
      }
      if (te.value) {
        i("Click -> Is Switch"), C(t);
        return;
      }
      i("Click -> Emit", e), C(t);
    };
    L(() => e.loading, () => O.value = e.loading), L(() => e.checked, () => f.value = e.checked), L(f, (t) => b("update:checked", t)), L(D, (t) => {
      D.value && e.showTooltipOnHover ? (F.value !== void 0 && clearTimeout(F.value), F.value = setTimeout(() => {
        m.value = !0, clearTimeout(F.value);
      }, e.showTooltipOnHoverDelay)) : !D.value && e.hideTooltipOnLeave ? (m.value = !1, clearTimeout(F.value)) : D.value || clearTimeout(F.value);
    }), Le({
      click: () => J(null),
      focus: (t) => {
        Y.value && (t && ($.value = !0), Y.value.focus());
      }
    });
    const Qe = n(() => e.type === o.Content ? "div" : "button"), Xe = n(() => {
      switch (e.type) {
        case o.Button:
        case o.Submit:
          return e.type;
        default:
          return "button";
      }
    }), de = n(() => e.disabled === void 0 ? !1 : typeof e.disabled == "function" ? e.disabled({
      prop: e.prop
    }) : typeof e.disabled == "boolean" ? e.disabled : !1), ve = (t) => J(t), Ye = (t) => ae.value = t, me = n(() => e.type === o.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), ye = n(() => typeof p.value == "string" ? {
      icon: p.value,
      dot: e.dot ? Ne.value : !1
    } : typeof p.value == "object" && p.value.position !== ie.End ? p.value : {}), Ze = n(() => (console.log("de iconos va la cosa: ", p.value, B.value), typeof B.value == "string" && B.value !== "" ? {
      icon: B.value,
      class: "lkt-button-icon-end"
    } : typeof B.value == "object" && Object.keys(B.value).length > 0 ? {
      ...B.value,
      class: "lkt-button-icon-end"
    } : typeof p.value == "object" && p.value.position === ie.End ? {
      ...p.value,
      class: "lkt-button-icon-end"
    } : {})), _e = n(() => {
      if (me.value) {
        let t = {};
        return p.value && (t.icon = ye.value), w.value && (t.text = w.value), {
          ...e.anchor,
          class: ce.value,
          ...t,
          prop: e.prop,
          disabled: e.anchor.disabled ?? e.disabled
        };
      }
      return {};
    });
    return (t, l) => {
      const y = A("lkt-spinner"), v = A("lkt-anchor"), k = A("lkt-icon"), N = A("lkt-field"), x = A("lkt-button", !0), z = A("lkt-tooltip");
      return t.type === W(o).InvisibleWrapper ? (a(), S("div", {
        key: 0,
        onClick: J,
        onFocus: fe,
        onBlur: pe,
        onMousemove: l[0] || (l[0] = (r) => D.value = !0),
        onMouseleave: l[1] || (l[1] = (r) => D.value = !1)
      }, [
        I(t.$slots, "default")
      ], 32)) : (a(), S("div", {
        key: 1,
        class: we(["lkt-button", ce.value]),
        ref_key: "container",
        ref: E,
        id: je,
        onMousemove: l[6] || (l[6] = (r) => D.value = !0),
        onMouseleave: l[7] || (l[7] = (r) => D.value = !1)
      }, [
        me.value ? (a(), d(v, T({ key: 0 }, _e.value, {
          class: "lkt-button-main",
          onActive: Ye
        }), {
          default: Q(() => [
            t.img ? (a(), S("img", {
              key: 0,
              src: t.img,
              alt: w.value
            }, null, 8, dt)) : c("", !0),
            W(q).text ? I(t.$slots, "text", {
              key: 1,
              text: w.value
            }) : c("", !0),
            W(q).default ? I(t.$slots, "default", { key: 2 }) : c("", !0),
            O.value ? (a(), d(y, { key: 3 })) : c("", !0)
          ]),
          _: 3
        }, 16)) : (a(), d(Be(Qe.value), {
          key: 1,
          class: "lkt-button-main",
          ref_key: "button",
          ref: Y,
          name: t.name,
          type: Xe.value,
          disabled: de.value,
          tabindex: t.tabindex,
          onClick: J,
          onFocus: fe,
          onBlur: pe
        }, {
          default: Q(() => [
            p.value ? (a(), d(k, Te(T({ key: 0 }, ye.value)), null, 16)) : c("", !0),
            t.img ? (a(), S("img", {
              key: 1,
              src: t.img,
              alt: w.value
            }, null, 8, vt)) : c("", !0),
            W(q).text ? I(t.$slots, "text", {
              key: 2,
              text: w.value
            }) : w.value ? (a(), S("span", mt, lt(w.value), 1)) : c("", !0),
            W(q).default ? I(t.$slots, "default", { key: 4 }) : c("", !0),
            O.value ? (a(), d(y, { key: 5 })) : c("", !0),
            te.value ? ot((a(), d(N, {
              key: 6,
              type: "switch",
              modelValue: f.value,
              "onUpdate:modelValue": l[2] || (l[2] = (r) => f.value = r),
              disabled: t.disabled,
              onClick: Oe(() => {
              }, ["stop"])
            }, null, 8, ["modelValue", "disabled"])), [
              [nt, We.value]
            ]) : c("", !0),
            oe.value ? (a(), d(N, T({
              key: 7,
              ref_key: "fileFieldRef",
              ref: _,
              type: qe.value,
              modelValue: re.value,
              "onUpdate:modelValue": l[3] || (l[3] = (r) => re.value = r),
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
            }), null, 16, ["type", "modelValue", "disabled"])) : c("", !0),
            B.value ? (a(), d(k, Te(T({ key: 8 }, Ze.value)), null, 16)) : c("", !0),
            K.value ? (a(), S("div", yt, [
              t.splitIcon ? (a(), S("i", {
                key: 0,
                class: we(t.splitIcon)
              }, null, 2)) : Ue.value ? (a(), d(Be(Ke.value), { key: 1 })) : c("", !0)
            ])) : c("", !0)
          ]),
          _: 3
        }, 40, ["name", "type", "disabled", "tabindex"])),
        K.value && E.value ? (a(), d(z, T({
          key: 2,
          modelValue: M.value,
          "onUpdate:modelValue": l[4] || (l[4] = (r) => M.value = r)
        }, {
          referrer: E.value,
          ...t.tooltip
        }, {
          class: ["lkt-split-button-dropdown-content", t.splitClass]
        }), Ee({ _: 2 }, [
          Pe.value ? {
            name: "default",
            fn: Q(({ doClose: r }) => [
              (a(!0), S(Ie, null, Re(t.splitButtons, (V) => (a(), d(x, T({ ref_for: !0 }, V, { onClick: r }), null, 16, ["onClick"]))), 256)),
              I(t.$slots, "split", {
                doClose: r,
                doRootClick: ve
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "class"])) : c("", !0),
        le.value && E.value ? (a(), d(z, T({
          key: 3,
          modelValue: m.value,
          "onUpdate:modelValue": l[5] || (l[5] = (r) => m.value = r)
        }, {
          referrer: E.value,
          ...t.tooltip
        }), Ee({ _: 2 }, [
          xe.value ? {
            name: "default",
            fn: Q(({ doClose: r }) => [
              (a(!0), S(Ie, null, Re(t.splitButtons, (V) => (a(), d(x, T({ ref_for: !0 }, V, { onClick: r }), null, 16, ["onClick"]))), 256)),
              I(t.$slots, "tooltip", {
                doClose: r,
                doRootClick: ve
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue"])) : c("", !0)
      ], 34));
    };
  }
}), Bt = {
  install: (h) => {
    h.component("lkt-button") === void 0 && h.component("lkt-button", kt);
  }
}, Tt = (h) => {
  R.defaultSplitIcon = h;
};
export {
  wt as debugLktButton,
  Bt as default,
  Tt as setDefaultButtonSplitSlot
};
