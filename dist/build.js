import { defineComponent as tt, mergeDefaults as ot, useSlots as lt, ref as c, watch as A, computed as n, resolveComponent as j, createElementBlock as k, unref as L, openBlock as i, normalizeClass as Q, renderSlot as R, createVNode as nt, normalizeProps as ue, guardReactiveProps as it, createBlock as v, createCommentVNode as s, mergeProps as B, withCtx as X, resolveDynamicComponent as Oe, withDirectives as ut, toDisplayString as at, withModifiers as Ee, vShow as rt, createSlots as Re, Fragment as Ie, renderList as Me } from "vue";
import { generateRandomString as st, ucfirst as ct } from "lkt-string-tools";
import { httpCall as ft } from "lkt-http-client";
import { openModal as pt, openConfirm as dt, runModalCallback as vt } from "lkt-modal";
import { useRouter as mt } from "vue-router";
import { extractPropValue as H, ButtonType as l, MenuController as Fe, extractI18nValue as ae, IconPosition as re, FieldType as Ve, getDefaultValues as yt, Button as kt, LktSettings as Ae } from "lkt-vue-kernel";
const Y = class Y {
};
Y.debugEnabled = !1, Y.defaultSplitIcon = void 0;
let I = Y;
const It = (b = !0) => {
  I.debugEnabled = b;
}, u = (...b) => {
  I.debugEnabled && console.info("[LktButton] ", ...b);
}, bt = { key: 1 }, ht = ["src", "alt"], Ct = ["src", "alt"], gt = {
  key: 3,
  class: "lkt-button--label"
}, St = {
  key: 9,
  class: "lkt-split-button-arrow"
}, wt = /* @__PURE__ */ tt({
  __name: "LktButton",
  props: /* @__PURE__ */ ot({
    type: {},
    name: {},
    value: {},
    disabled: { type: [Boolean, Function] },
    openTooltip: { type: Boolean },
    loading: { type: Boolean },
    class: {},
    containerClass: {},
    wrapButton: { type: Boolean },
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
    aria: {},
    clickRef: {},
    events: {}
  }, yt(kt)),
  emits: [
    "click",
    "focus",
    "blur",
    "loading",
    "loaded",
    "update:checked",
    "update:openTooltip"
  ],
  setup(b, { expose: je, emit: Le }) {
    const e = b, S = Le, q = lt(), se = mt();
    let He = H(e.modalKey, e.prop);
    const ce = "lkt-button-" + st(), O = c(e.loading), D = c(null), Z = c(null), M = c(!1), y = c(e.openTooltip), fe = c(!1), h = c(!1), F = c(void 0), f = c(e.checked), pe = c(void 0), _ = c(!1), $ = c(null), ee = c(!1);
    A(() => e.openTooltip, (t) => y.value = t), A(y, (t) => S("update:openTooltip", t));
    const te = n(() => {
      let t = [];
      return e.class && t.push(e.class), e.containerClass && t.push(e.containerClass), e.type === l.InvisibleWrapper || (K.value && t.push("lkt-split-button"), t.push(`lkt-button--${e.type}`), O.value && t.push("is-loading"), fe.value && t.push("is-active-route"), y.value && t.push("show-tooltip"), M.value && t.push("show-split"), f.value && t.push("is-checked"), ye.value && t.push("is-disabled"), _.value && t.push("has-focus"), e.type === l.Menu && (t.push(`menu-target--${e.menuKey}`), Fe.getMenuStatus(e.menuKey) && t.push("menu-opened"))), t.join(" ");
    }), T = n(() => {
      if (e.type === l.Switch || e.type === l.HiddenSwitch) {
        if (f.value && typeof e.textOn < "u") return ae(e.textOn);
        if (!f.value && typeof e.textOff < "u") return ae(e.textOff);
      }
      return ae(e.text);
    }), p = n(() => {
      let t = e.icon;
      return (e.type === l.Switch || e.type === l.HiddenSwitch) && (f.value && typeof e.iconOn < "u" ? t = e.iconOn : !f.value && typeof e.iconOff < "u" && (t = e.iconOff)), H(t, e.prop);
    }), E = n(() => {
      if (typeof p.value == "object" && p.value.position === re.End)
        return p.value;
      let t = e.iconEnd;
      return (e.type === l.Switch || e.type === l.HiddenSwitch) && (f.value && typeof e.iconOn < "u" ? t = e.iconEndOn : !f.value && typeof e.iconOff < "u" && (t = e.iconEndOff)), H(t, e.prop);
    }), G = n(() => typeof e.modal == "function" ? e.modal(e.prop) : H(e.modal, e.prop)), N = n(() => typeof e.modalData == "function" ? e.modalData(e.prop) : e.modalData), Ne = n(() => typeof I.defaultSplitIcon < "u"), Ue = n(() => I.defaultSplitIcon), Ke = n(() => typeof e.dot == "boolean" ? "" : e.dot), C = (t, o = void 0) => {
      u("endClickMethod", t, o), Ge(), Je(t === null ? void 0 : t, o), S("click", t, o);
    }, oe = n(() => {
      if (typeof e.resourceData == "function") return e.resourceData(e.prop);
      if (typeof e.resourceData == "string") return H(e.resourceData, e.prop);
      if (typeof e.resourceData == "object" && !Array.isArray(e.resourceData)) {
        let t = {};
        for (let o in e.resourceData)
          t[o] = H(e.resourceData[o], e.prop);
        return t;
      }
      return e.resourceData;
    }), U = async (t) => {
      var m;
      u("Resource Click", e.resource, oe.value), O.value = !0, S("loading"), typeof ((m = e.events) == null ? void 0 : m.httpStart) == "function" && (u("Resource Click -> httpStart event"), e.events.httpStart());
      let o = { ...oe.value, isChecked: f.value };
      return ft(e.resource, o).then((d) => {
        var g;
        O.value = !1, S("loaded"), u("Resource Click -> Received response", d), typeof ((g = e.events) == null ? void 0 : g.httpEnd) == "function" && (u("Resource Click -> httpEnd event"), e.events.httpEnd({
          httpResponse: d
        })), C(t, d);
      }).catch((d) => {
        var g;
        O.value = !1, S("loaded"), u("Resource Click -> Received response error", d), typeof ((g = e.events) == null ? void 0 : g.httpEnd) == "function" && (u("Resource Click -> httpEnd event"), e.events.httpEnd({
          httpResponse: d
        })), C(t, d);
      });
    }, de = c(!1), ze = n(() => D.value ? e.type === l.TooltipLazy ? de.value : e.type === l.TooltipEver ? y.value : e.type === l.Tooltip : !1), Pe = c(!1), xe = n(() => D.value ? e.type === l.SplitLazy ? Pe.value : e.type === l.SplitEver ? M.value : e.type === l.Split : !1), ve = (t) => {
      if (_.value = !0, ee.value) {
        ee.value = !1, S("focus");
        return;
      }
      S("focus", t);
    }, me = (t) => {
      _.value = !1, S("blur", t);
    }, le = n(() => e.type === l.Switch || e.type === l.HiddenSwitch), We = n(() => e.type === l.Switch), ne = n(() => e.type === l.FileUpload || e.type === l.ImageUpload), qe = n(() => e.type === l.ImageUpload ? Ve.Image : Ve.File), Ge = () => {
      e.modalCallbacks.forEach((t) => {
        vt(t);
      });
    }, Je = (t, o) => {
      var m;
      u("doConfigClick: ", e), typeof ((m = e.events) == null ? void 0 : m.click) == "function" && e.events.click({
        event: t,
        httpResponse: o
      });
    }, K = n(() => [
      l.Split,
      l.SplitLazy,
      l.SplitEver
    ].includes(e.type)), ie = n(() => [
      l.Tooltip,
      l.TooltipLazy,
      l.TooltipEver
    ].includes(e.type)), J = (t) => {
      var o, m, d, g, z, P, x, r, V, Ce, ge, Se, we, Be;
      if (u("Click", e, t), t && (le.value ? (o = t.target) != null && o.closest(".lkt-field.is-switch") || (f.value = !f.value) : ne.value ? $.value && ((m = $.value) == null || m.click()) : ie.value ? (y.value = !y.value, y.value && (de.value = !0)) : K.value ? M.value = !M.value : e.type === l.Menu ? Fe.toggleMenu(e.menuKey) : (e.type, l.Tab)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), K.value || ie.value || ne.value) {
        C(t);
        return;
      }
      if (G.value) {
        let a = { ...N.value };
        u("Click -> has modal", e.modal, a), u("Click -> typeof beforeClose: ", typeof a.beforeClose), typeof a.beforeClose == "function" ? (a.beforeClose = (W) => {
          if (e.resource)
            return U(t).then(() => {
              typeof N.value.beforeClose == "function" && N.value.beforeClose(W);
            });
          typeof N.value.beforeClose == "function" && N.value.beforeClose(W), C(t);
        }, u("Click -> New beforeClose function: ", a.beforeClose)) : (a.beforeClose = () => {
          if (e.resource)
            return U(t);
          C(t);
        }, u("Click -> New beforeClose function: ", a.beforeClose));
        let w = G.value;
        return typeof G.value == "function" && (w = G.value()), pt(w, He, a);
      }
      if (e.confirmModal) {
        u("Click -> has confirm modal", e.confirmModal, e.confirmData), u("Click -> typeof confirmData.events?.click: ", typeof ((d = e.confirmData.events) == null ? void 0 : d.click));
        let a = { ...e.confirmData };
        if (a.confirmButton ? a.confirmButton = { ...Ae.defaultConfirmButton, ...a.confirmButton } : a.confirmButton = { ...Ae.defaultConfirmButton }, a.confirmButton.events || (a.confirmButton.events = {}), typeof ((z = (g = a.confirmButton) == null ? void 0 : g.events) == null ? void 0 : z.click) == "function") {
          let w = (x = (P = a.confirmButton) == null ? void 0 : P.events) == null ? void 0 : x.click;
          u("Click -> Has confirmData.events?.click function: ", w), a.confirmButton.events.click = () => {
            if (u("confirmData.events?.click -> Already: ", e), e.resource)
              return U(t).then(() => {
                w();
              });
            w(), C(t);
          }, u("Click -> New confirmData.events?.click function created: ", (V = (r = a.confirmButton) == null ? void 0 : r.events) == null ? void 0 : V.click);
        } else
          a.confirmButton.events.click = () => {
            var w, W, De, Te;
            if (u("confirmData.events?.click -> Created: ", e), e.resource)
              return U(t);
            if (((w = e.anchor) == null ? void 0 : w.to) !== "") {
              t && (t.preventDefault(), t.stopPropagation()), (W = e.anchor) != null && W.external || typeof ((De = e.anchor) == null ? void 0 : De.to) < "u" && se.push((Te = e.anchor) == null ? void 0 : Te.to);
              return;
            }
            C(t);
          }, u("Click -> New confirmData.events?.click function created: ", (Ce = a.confirmButton) == null ? void 0 : Ce.events.click);
        return dt(e.confirmModal, e.confirmModalKey, a);
      }
      if (e.resource)
        return u("Click -> has resource"), U(t);
      if (typeof ((ge = e.anchor) == null ? void 0 : ge.to) < "u" && ((Se = e.anchor) == null ? void 0 : Se.to) !== "") {
        u("Click -> Is Anchor", e.anchor), (we = e.anchor) != null && we.external ? typeof ((Be = e.anchor) == null ? void 0 : Be.to) == "string" && (window.location.href = e.anchor.to) : se.push(e.anchor.to), C(t);
        return;
      }
      if (le.value) {
        u("Click -> Is Switch"), C(t);
        return;
      }
      u("Click -> Emit", e), C(t);
    };
    A(() => e.loading, () => O.value = e.loading), A(() => e.checked, () => f.value = e.checked), A(f, (t) => S("update:checked", t)), A(h, (t) => {
      h.value && e.showTooltipOnHover ? (F.value !== void 0 && clearTimeout(F.value), F.value = setTimeout(() => {
        y.value = !0, clearTimeout(F.value);
      }, e.showTooltipOnHoverDelay)) : !h.value && e.hideTooltipOnLeave ? (y.value = !1, clearTimeout(F.value)) : h.value || clearTimeout(F.value);
    }), je({
      click: () => J(null),
      focus: (t) => {
        Z.value && (t && (ee.value = !0), Z.value.focus());
      }
    });
    const Qe = n(() => e.type === l.Content ? "div" : "button"), Xe = n(() => {
      switch (e.type) {
        case l.Button:
        case l.Submit:
          return e.type;
        default:
          return "button";
      }
    }), ye = n(() => e.disabled === void 0 ? !1 : typeof e.disabled == "function" ? e.disabled({
      prop: e.prop
    }) : typeof e.disabled == "boolean" ? e.disabled : !1), ke = (t) => J(t), Ye = (t) => fe.value = t, be = n(() => e.type === l.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), he = n(() => typeof p.value == "string" ? {
      icon: p.value,
      dot: e.dot ? Ke.value : !1
    } : typeof p.value == "object" && p.value.position !== re.End ? p.value : {}), Ze = n(() => typeof E.value == "string" && E.value !== "" ? {
      icon: E.value,
      class: "lkt-button-icon-end"
    } : typeof E.value == "object" && Object.keys(E.value).length > 0 ? {
      ...E.value,
      class: "lkt-button-icon-end"
    } : typeof p.value == "object" && p.value.position === re.End ? {
      ...p.value,
      class: "lkt-button-icon-end"
    } : {}), _e = n(() => {
      if (be.value) {
        let t = {};
        return p.value && (t.icon = he.value), T.value && (t.text = T.value), {
          ...e.anchor,
          ...t,
          prop: e.prop,
          disabled: e.anchor.disabled ?? e.disabled
        };
      }
      return {};
    }), $e = n(() => {
      if (e.type === l.Tab) return "tab";
    }), et = n(() => {
      let t = {};
      return typeof e.aria != "object" || Object.keys(e.aria).forEach((o) => {
        t[`aria${ct(o)}`] = e.aria[o];
      }), t;
    });
    return (t, o) => {
      const m = j("lkt-button", !0), d = j("lkt-spinner"), g = j("lkt-anchor"), z = j("lkt-icon"), P = j("lkt-field"), x = j("lkt-tooltip");
      return t.type === L(l).InvisibleWrapper ? (i(), k("div", {
        key: 0,
        onClick: J,
        onFocus: ve,
        onBlur: me,
        onMousemove: o[0] || (o[0] = (r) => h.value = !0),
        onMouseleave: o[1] || (o[1] = (r) => h.value = !1),
        class: Q(te.value)
      }, [
        R(t.$slots, "default")
      ], 34)) : t.wrapButton ? (i(), k("div", bt, [
        nt(m, ue(it({
          ...e,
          wrapButton: !1
        })), null, 16)
      ])) : t.type === L(l).Anchor ? (i(), k("div", {
        key: 2,
        class: Q(["lkt-button", te.value]),
        ref_key: "container",
        ref: D,
        id: ce,
        onMousemove: o[2] || (o[2] = (r) => h.value = !0),
        onMouseleave: o[3] || (o[3] = (r) => h.value = !1)
      }, [
        be.value ? (i(), v(g, B({ key: 0 }, _e.value, {
          class: "lkt-button-main",
          onActive: Ye
        }), {
          default: X(() => [
            t.img ? (i(), k("img", {
              key: 0,
              src: t.img,
              alt: T.value
            }, null, 8, ht)) : s("", !0),
            L(q).text ? R(t.$slots, "text", {
              key: 1,
              text: T.value
            }) : s("", !0),
            L(q).default ? R(t.$slots, "default", { key: 2 }) : s("", !0),
            O.value ? (i(), v(d, { key: 3 })) : s("", !0)
          ]),
          _: 3
        }, 16)) : s("", !0)
      ], 34)) : (i(), k("div", {
        key: 3,
        class: Q(["lkt-button", te.value]),
        ref_key: "container",
        ref: D,
        id: ce,
        onMousemove: o[8] || (o[8] = (r) => h.value = !0),
        onMouseleave: o[9] || (o[9] = (r) => h.value = !1)
      }, [
        (i(), v(Oe(Qe.value), B({
          class: "lkt-button-main",
          ref_key: "button",
          ref: Z,
          name: t.name,
          type: Xe.value,
          disabled: ye.value,
          tabindex: t.tabindex,
          role: $e.value
        }, et.value, {
          onClick: J,
          onFocus: ve,
          onBlur: me
        }), {
          default: X(() => [
            p.value ? (i(), v(z, ue(B({ key: 0 }, he.value)), null, 16)) : s("", !0),
            t.img ? (i(), k("img", {
              key: 1,
              src: t.img,
              alt: T.value
            }, null, 8, Ct)) : s("", !0),
            L(q).text ? R(t.$slots, "text", {
              key: 2,
              text: T.value
            }) : T.value ? (i(), k("span", gt, at(T.value), 1)) : s("", !0),
            L(q).default ? R(t.$slots, "default", { key: 4 }) : s("", !0),
            O.value ? (i(), v(d, { key: 5 })) : s("", !0),
            le.value ? ut((i(), v(P, {
              key: 6,
              type: "switch",
              modelValue: f.value,
              "onUpdate:modelValue": o[4] || (o[4] = (r) => f.value = r),
              disabled: t.disabled,
              onClick: Ee(() => {
              }, ["stop"])
            }, null, 8, ["modelValue", "disabled"])), [
              [rt, We.value]
            ]) : s("", !0),
            ne.value ? (i(), v(P, B({
              key: 7,
              ref_key: "fileFieldRef",
              ref: $,
              type: qe.value,
              modelValue: pe.value,
              "onUpdate:modelValue": o[5] || (o[5] = (r) => pe.value = r),
              hidden: ""
            }, {
              fileUploadHttp: {
                resource: t.resource,
                data: oe.value
              }
            }, {
              disabled: t.disabled,
              onClick: Ee(() => {
              }, ["stop"])
            }), null, 16, ["type", "modelValue", "disabled"])) : s("", !0),
            E.value ? (i(), v(z, ue(B({ key: 8 }, Ze.value)), null, 16)) : s("", !0),
            K.value ? (i(), k("div", St, [
              t.splitIcon ? (i(), k("i", {
                key: 0,
                class: Q(t.splitIcon)
              }, null, 2)) : Ne.value ? (i(), v(Oe(Ue.value), { key: 1 })) : s("", !0)
            ])) : s("", !0)
          ]),
          _: 3
        }, 16, ["name", "type", "disabled", "tabindex", "role"])),
        K.value && D.value ? (i(), v(x, B({
          key: 0,
          modelValue: M.value,
          "onUpdate:modelValue": o[6] || (o[6] = (r) => M.value = r)
        }, {
          referrer: D.value,
          ...t.tooltip
        }, {
          class: ["lkt-split-button-dropdown-content", t.splitClass]
        }), Re({ _: 2 }, [
          xe.value ? {
            name: "default",
            fn: X(({ doClose: r }) => [
              (i(!0), k(Ie, null, Me(t.splitButtons, (V) => (i(), v(m, B({ ref_for: !0 }, V, { onClick: r }), null, 16, ["onClick"]))), 256)),
              R(t.$slots, "split", {
                doClose: r,
                doRootClick: ke
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "class"])) : s("", !0),
        ie.value && D.value ? (i(), v(x, B({
          key: 1,
          modelValue: y.value,
          "onUpdate:modelValue": o[7] || (o[7] = (r) => y.value = r)
        }, {
          referrer: D.value,
          ...t.tooltip
        }), Re({ _: 2 }, [
          ze.value ? {
            name: "default",
            fn: X(({ doClose: r }) => [
              (i(!0), k(Ie, null, Me(t.splitButtons, (V) => (i(), v(m, B({ ref_for: !0 }, V, { onClick: r }), null, 16, ["onClick"]))), 256)),
              R(t.$slots, "tooltip", {
                doClose: r,
                doRootClick: ke
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue"])) : s("", !0)
      ], 34));
    };
  }
}), Mt = {
  install: (b) => {
    b.component("lkt-button") === void 0 && b.component("lkt-button", wt);
  }
}, Ft = (b) => {
  I.defaultSplitIcon = b;
};
export {
  It as debugLktButton,
  Mt as default,
  Ft as setDefaultButtonSplitSlot
};
