import { defineComponent as tt, mergeDefaults as ot, useSlots as lt, ref as d, watch as V, computed as i, resolveComponent as j, createElementBlock as h, unref as A, openBlock as a, normalizeClass as X, renderSlot as E, createVNode as nt, normalizeProps as ae, guardReactiveProps as it, createBlock as m, createCommentVNode as f, mergeProps as B, withCtx as Y, resolveDynamicComponent as Re, withDirectives as ut, toDisplayString as at, withModifiers as Oe, vShow as rt, createSlots as Ee, Fragment as Ie, renderList as Me } from "vue";
import { generateRandomString as ct, ucfirst as st } from "lkt-string-tools";
import { httpCall as ft } from "lkt-http-client";
import { openModal as dt, openConfirm as pt, runModalCallback as vt } from "lkt-modal";
import { useRouter as mt } from "vue-router";
import { extractPropValue as L, ButtonType as l, MenuController as xe, extractI18nValue as re, IconPosition as ce, FieldType as Fe, getDefaultValues as yt, Button as kt, LktSettings as Ve } from "lkt-vue-kernel";
const Z = class Z {
};
Z.debugEnabled = !1, Z.defaultSplitIcon = void 0;
let I = Z;
const It = (n = !0) => {
  I.debugEnabled = n;
}, r = (...n) => {
  I.debugEnabled && console.info("[LktButton] ", ...n);
}, ht = { key: 1 }, bt = ["src", "alt"], Ct = ["src", "alt"], gt = {
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
    events: {},
    preventDefault: { type: Boolean },
    stopPropagation: { type: Boolean },
    hooks: {}
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
  setup(n, { expose: je, emit: Ae }) {
    const e = n, S = Ae, q = lt(), G = mt();
    let Le = L(e.modalKey, e.prop);
    const se = "lkt-button-" + ct(), R = d(e.loading), D = d(null), $ = d(null), M = d(!1), k = d(e.openTooltip), fe = d(!1), b = d(!1), x = d(void 0), p = d(e.checked), de = d(void 0), _ = d(!1), ee = d(null), te = d(!1);
    V(() => e.openTooltip, (t) => k.value = t), V(k, (t) => S("update:openTooltip", t));
    const oe = i(() => {
      let t = [];
      return e.class && t.push(e.class), e.containerClass && t.push(e.containerClass), e.type === l.InvisibleWrapper || (U.value && t.push("lkt-split-button"), t.push(`lkt-button--${e.type}`), R.value && t.push("is-loading"), fe.value && t.push("is-active-route"), k.value && t.push("show-tooltip"), M.value && t.push("show-split"), p.value && t.push("is-checked"), ye.value && t.push("is-disabled"), _.value && t.push("has-focus"), e.type === l.Menu && (t.push(`menu-target--${e.menuKey}`), xe.getMenuStatus(e.menuKey) && t.push("menu-opened"))), t.join(" ");
    }), T = i(() => {
      if (e.type === l.Switch || e.type === l.HiddenSwitch) {
        if (p.value && typeof e.textOn < "u") return re(e.textOn);
        if (!p.value && typeof e.textOff < "u") return re(e.textOff);
      }
      return re(e.text);
    }), v = i(() => {
      let t = e.icon;
      return (e.type === l.Switch || e.type === l.HiddenSwitch) && (p.value && typeof e.iconOn < "u" ? t = e.iconOn : !p.value && typeof e.iconOff < "u" && (t = e.iconOff)), L(t, e.prop);
    }), O = i(() => {
      if (typeof v.value == "object" && v.value.position === ce.End)
        return v.value;
      let t = e.iconEnd;
      return (e.type === l.Switch || e.type === l.HiddenSwitch) && (p.value && typeof e.iconOn < "u" ? t = e.iconEndOn : !p.value && typeof e.iconOff < "u" && (t = e.iconEndOff)), L(t, e.prop);
    }), J = i(() => typeof e.modal == "function" ? e.modal(e.prop) : L(e.modal, e.prop)), H = i(() => typeof e.modalData == "function" ? e.modalData(e.prop) : e.modalData), He = i(() => typeof I.defaultSplitIcon < "u"), Ne = i(() => I.defaultSplitIcon), Ue = i(() => typeof e.dot == "boolean" ? "" : e.dot), C = (t, o = void 0) => {
      r("endClickMethod", t, o), Ge(), Je(t === null ? void 0 : t, o), S("click", t, o);
    }, le = i(() => {
      if (typeof e.resourceData == "function") return e.resourceData(e.prop);
      if (typeof e.resourceData == "string") return L(e.resourceData, e.prop);
      if (typeof e.resourceData == "object" && !Array.isArray(e.resourceData)) {
        let t = {};
        for (let o in e.resourceData)
          t[o] = L(e.resourceData[o], e.prop);
        return t;
      }
      return e.resourceData;
    }), N = async (t) => {
      var y;
      r("Resource Click", e.resource, le.value), R.value = !0, S("loading"), typeof ((y = e.events) == null ? void 0 : y.httpStart) == "function" && (r("Resource Click -> httpStart event"), e.events.httpStart());
      let o = { ...le.value, isChecked: p.value };
      return ft(e.resource, o).then((u) => {
        var g;
        R.value = !1, S("loaded"), r("Resource Click -> Received response", u), typeof ((g = e.events) == null ? void 0 : g.httpEnd) == "function" && (r("Resource Click -> httpEnd event"), e.events.httpEnd({
          httpResponse: u
        })), C(t, u);
      }).catch((u) => {
        var g;
        R.value = !1, S("loaded"), r("Resource Click -> Received response error", u), typeof ((g = e.events) == null ? void 0 : g.httpEnd) == "function" && (r("Resource Click -> httpEnd event"), e.events.httpEnd({
          httpResponse: u
        })), C(t, u);
      });
    }, pe = d(!1), Ke = i(() => D.value ? e.type === l.TooltipLazy ? pe.value : e.type === l.TooltipEver ? k.value : e.type === l.Tooltip : !1), Pe = d(!1), ze = i(() => D.value ? e.type === l.SplitLazy ? Pe.value : e.type === l.SplitEver ? M.value : e.type === l.Split : !1), ve = (t) => {
      if (_.value = !0, te.value) {
        te.value = !1, S("focus");
        return;
      }
      S("focus", t);
    }, me = (t) => {
      _.value = !1, S("blur", t);
    }, ne = i(() => e.type === l.Switch || e.type === l.HiddenSwitch), We = i(() => e.type === l.Switch), ie = i(() => e.type === l.FileUpload || e.type === l.ImageUpload), qe = i(() => e.type === l.ImageUpload ? Fe.Image : Fe.File), Ge = () => {
      e.modalCallbacks.forEach((t) => {
        vt(t);
      });
    }, Je = (t, o) => {
      var y;
      if (r("doConfigClick: ", e), typeof ((y = e.events) == null ? void 0 : y.click) == "function" && e.events.click({
        event: t,
        httpResponse: o
      }), o != null && o.success) {
        if (typeof e.hooks.onSuccessReload < "u") {
          let u = e.hooks.onSuccessReload;
          typeof u == "function" && (u = u({
            event: t,
            httpResponse: o
          })), u && window.location.reload();
        } else if (typeof e.hooks.onSuccessRedirectTo < "u") {
          let u = e.hooks.onSuccessRedirectTo;
          typeof u == "function" && (u = u({
            event: t,
            httpResponse: o
          })), (typeof u == "object" || typeof u == "string") && (e.hooks.redirectType === "push" ? G.push(u) : G.replace(u));
        }
      }
    }, U = i(() => [
      l.Split,
      l.SplitLazy,
      l.SplitEver
    ].includes(e.type)), ue = i(() => [
      l.Tooltip,
      l.TooltipLazy,
      l.TooltipEver
    ].includes(e.type)), Q = (t) => {
      var o, y, u, g, K, P, z, s, F, Ce, ge, Se, we, Be;
      if (r("Click", e, t), t && (e.preventDefault && t.preventDefault(), e.stopPropagation && t.stopPropagation(), ne.value ? (o = t.target) != null && o.closest(".lkt-field.is-switch") || (p.value = !p.value) : ie.value ? ee.value && ((y = ee.value) == null || y.click()) : ue.value ? (k.value = !k.value, k.value && (pe.value = !0)) : U.value ? M.value = !M.value : e.type === l.Menu ? xe.toggleMenu(e.menuKey) : (e.type, l.Tab)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), U.value || ue.value || ie.value) {
        C(t);
        return;
      }
      if (J.value) {
        let c = { ...H.value };
        r("Click -> has modal", e.modal, c), r("Click -> typeof beforeClose: ", typeof c.beforeClose), typeof c.beforeClose == "function" ? (c.beforeClose = (W) => {
          if (e.resource)
            return N(t).then(() => {
              typeof H.value.beforeClose == "function" && H.value.beforeClose(W);
            });
          typeof H.value.beforeClose == "function" && H.value.beforeClose(W), C(t);
        }, r("Click -> New beforeClose function: ", c.beforeClose)) : (c.beforeClose = () => {
          if (e.resource)
            return N(t);
          C(t);
        }, r("Click -> New beforeClose function: ", c.beforeClose));
        let w = J.value;
        return typeof J.value == "function" && (w = J.value()), dt(w, Le, c);
      }
      if (e.confirmModal) {
        r("Click -> has confirm modal", e.confirmModal, e.confirmData), r("Click -> typeof confirmData.events?.click: ", typeof ((u = e.confirmData.events) == null ? void 0 : u.click));
        let c = { ...e.confirmData };
        if (c.confirmButton ? c.confirmButton = { ...Ve.defaultConfirmButton, ...c.confirmButton } : c.confirmButton = { ...Ve.defaultConfirmButton }, c.confirmButton.events || (c.confirmButton.events = {}), typeof ((K = (g = c.confirmButton) == null ? void 0 : g.events) == null ? void 0 : K.click) == "function") {
          let w = (z = (P = c.confirmButton) == null ? void 0 : P.events) == null ? void 0 : z.click;
          r("Click -> Has confirmData.events?.click function: ", w), c.confirmButton.events.click = () => {
            if (r("confirmData.events?.click -> Already: ", e), e.resource)
              return N(t).then(() => {
                w();
              });
            w(), C(t);
          }, r("Click -> New confirmData.events?.click function created: ", (F = (s = c.confirmButton) == null ? void 0 : s.events) == null ? void 0 : F.click);
        } else
          c.confirmButton.events.click = () => {
            var w, W, De, Te;
            if (r("confirmData.events?.click -> Created: ", e), e.resource)
              return N(t);
            if (((w = e.anchor) == null ? void 0 : w.to) !== "") {
              t && (t.preventDefault(), t.stopPropagation()), (W = e.anchor) != null && W.external || typeof ((De = e.anchor) == null ? void 0 : De.to) < "u" && G.push((Te = e.anchor) == null ? void 0 : Te.to);
              return;
            }
            C(t);
          }, r("Click -> New confirmData.events?.click function created: ", (Ce = c.confirmButton) == null ? void 0 : Ce.events.click);
        return pt(e.confirmModal, e.confirmModalKey, c);
      }
      if (e.resource)
        return r("Click -> has resource"), N(t);
      if (typeof ((ge = e.anchor) == null ? void 0 : ge.to) < "u" && ((Se = e.anchor) == null ? void 0 : Se.to) !== "") {
        r("Click -> Is Anchor", e.anchor), (we = e.anchor) != null && we.external ? typeof ((Be = e.anchor) == null ? void 0 : Be.to) == "string" && (window.location.href = e.anchor.to) : G.push(e.anchor.to), C(t);
        return;
      }
      if (ne.value) {
        r("Click -> Is Switch"), C(t);
        return;
      }
      r("Click -> Emit", e), C(t);
    };
    V(() => e.loading, () => R.value = e.loading), V(() => e.checked, () => p.value = e.checked), V(p, (t) => S("update:checked", t)), V(b, (t) => {
      b.value && e.showTooltipOnHover ? (x.value !== void 0 && clearTimeout(x.value), x.value = setTimeout(() => {
        k.value = !0, clearTimeout(x.value);
      }, e.showTooltipOnHoverDelay)) : !b.value && e.hideTooltipOnLeave ? (k.value = !1, clearTimeout(x.value)) : b.value || clearTimeout(x.value);
    }), je({
      click: () => Q(null),
      focus: (t) => {
        $.value && (t && (te.value = !0), $.value.focus());
      }
    });
    const Qe = i(() => e.type === l.Content ? "div" : "button"), Xe = i(() => {
      switch (e.type) {
        case l.Button:
        case l.Submit:
          return e.type;
        default:
          return "button";
      }
    }), ye = i(() => e.disabled === void 0 ? !1 : typeof e.disabled == "function" ? e.disabled({
      prop: e.prop
    }) : typeof e.disabled == "boolean" ? e.disabled : !1), ke = (t) => Q(t), Ye = (t) => fe.value = t, he = i(() => e.type === l.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), be = i(() => typeof v.value == "string" ? {
      icon: v.value,
      dot: e.dot ? Ue.value : !1
    } : typeof v.value == "object" && v.value.position !== ce.End ? v.value : {}), Ze = i(() => typeof O.value == "string" && O.value !== "" ? {
      icon: O.value,
      class: "lkt-button-icon-end"
    } : typeof O.value == "object" && Object.keys(O.value).length > 0 ? {
      ...O.value,
      class: "lkt-button-icon-end"
    } : typeof v.value == "object" && v.value.position === ce.End ? {
      ...v.value,
      class: "lkt-button-icon-end"
    } : {}), $e = i(() => {
      if (he.value) {
        let t = {};
        return v.value && (t.icon = be.value), T.value && (t.text = T.value), {
          ...e.anchor,
          ...t,
          prop: e.prop,
          disabled: e.anchor.disabled ?? e.disabled
        };
      }
      return {};
    }), _e = i(() => {
      if (e.type === l.Tab) return "tab";
    }), et = i(() => {
      let t = {};
      return typeof e.aria != "object" || Object.keys(e.aria).forEach((o) => {
        t[`aria${st(o)}`] = e.aria[o];
      }), t;
    });
    return (t, o) => {
      const y = j("lkt-button", !0), u = j("lkt-spinner"), g = j("lkt-anchor"), K = j("lkt-icon"), P = j("lkt-field"), z = j("lkt-tooltip");
      return n.type === A(l).InvisibleWrapper ? (a(), h("div", {
        key: 0,
        onClick: Q,
        onFocus: ve,
        onBlur: me,
        onMousemove: o[0] || (o[0] = (s) => b.value = !0),
        onMouseleave: o[1] || (o[1] = (s) => b.value = !1),
        class: X(oe.value)
      }, [
        E(t.$slots, "default")
      ], 34)) : n.wrapButton ? (a(), h("div", ht, [
        nt(y, ae(it({
          ...e,
          wrapButton: !1
        })), null, 16)
      ])) : n.type === A(l).Anchor ? (a(), h("div", {
        key: 2,
        class: X(["lkt-button", oe.value]),
        ref_key: "container",
        ref: D,
        id: se,
        onMousemove: o[2] || (o[2] = (s) => b.value = !0),
        onMouseleave: o[3] || (o[3] = (s) => b.value = !1)
      }, [
        he.value ? (a(), m(g, B({ key: 0 }, $e.value, {
          class: "lkt-button-main",
          onActive: Ye
        }), {
          default: Y(() => [
            n.img ? (a(), h("img", {
              key: 0,
              src: n.img,
              alt: T.value
            }, null, 8, bt)) : f("", !0),
            A(q).text ? E(t.$slots, "text", {
              key: 1,
              text: T.value
            }) : f("", !0),
            A(q).default ? E(t.$slots, "default", { key: 2 }) : f("", !0),
            R.value ? (a(), m(u, { key: 3 })) : f("", !0)
          ]),
          _: 3
        }, 16)) : f("", !0)
      ], 34)) : (a(), h("div", {
        key: 3,
        class: X(["lkt-button", oe.value]),
        ref_key: "container",
        ref: D,
        id: se,
        onMousemove: o[8] || (o[8] = (s) => b.value = !0),
        onMouseleave: o[9] || (o[9] = (s) => b.value = !1)
      }, [
        (a(), m(Re(Qe.value), B({
          class: "lkt-button-main",
          ref_key: "button",
          ref: $,
          name: n.name,
          type: Xe.value,
          disabled: ye.value,
          tabindex: n.tabindex,
          role: _e.value
        }, et.value, {
          onClick: Q,
          onFocus: ve,
          onBlur: me
        }), {
          default: Y(() => [
            v.value ? (a(), m(K, ae(B({ key: 0 }, be.value)), null, 16)) : f("", !0),
            n.img ? (a(), h("img", {
              key: 1,
              src: n.img,
              alt: T.value
            }, null, 8, Ct)) : f("", !0),
            A(q).text ? E(t.$slots, "text", {
              key: 2,
              text: T.value
            }) : T.value ? (a(), h("span", gt, at(T.value), 1)) : f("", !0),
            A(q).default ? E(t.$slots, "default", { key: 4 }) : f("", !0),
            R.value ? (a(), m(u, { key: 5 })) : f("", !0),
            ne.value ? ut((a(), m(P, {
              key: 6,
              type: "switch",
              modelValue: p.value,
              "onUpdate:modelValue": o[4] || (o[4] = (s) => p.value = s),
              disabled: n.disabled,
              onClick: Oe(() => {
              }, ["stop"])
            }, null, 8, ["modelValue", "disabled"])), [
              [rt, We.value]
            ]) : f("", !0),
            ie.value ? (a(), m(P, B({
              key: 7,
              ref_key: "fileFieldRef",
              ref: ee,
              type: qe.value,
              modelValue: de.value,
              "onUpdate:modelValue": o[5] || (o[5] = (s) => de.value = s),
              hidden: ""
            }, {
              fileUploadHttp: {
                resource: n.resource,
                data: le.value
              }
            }, {
              disabled: n.disabled,
              onClick: Oe(() => {
              }, ["stop"])
            }), null, 16, ["type", "modelValue", "disabled"])) : f("", !0),
            O.value ? (a(), m(K, ae(B({ key: 8 }, Ze.value)), null, 16)) : f("", !0),
            U.value ? (a(), h("div", St, [
              n.splitIcon ? (a(), h("i", {
                key: 0,
                class: X(n.splitIcon)
              }, null, 2)) : He.value ? (a(), m(Re(Ne.value), { key: 1 })) : f("", !0)
            ])) : f("", !0)
          ]),
          _: 3
        }, 16, ["name", "type", "disabled", "tabindex", "role"])),
        U.value && D.value ? (a(), m(z, B({
          key: 0,
          modelValue: M.value,
          "onUpdate:modelValue": o[6] || (o[6] = (s) => M.value = s)
        }, {
          referrer: D.value,
          ...n.tooltip
        }, {
          class: ["lkt-split-button-dropdown-content", n.splitClass]
        }), Ee({ _: 2 }, [
          ze.value ? {
            name: "default",
            fn: Y(({ doClose: s }) => [
              (a(!0), h(Ie, null, Me(n.splitButtons, (F) => (a(), m(y, B({ ref_for: !0 }, F, { onClick: s }), null, 16, ["onClick"]))), 256)),
              E(t.$slots, "split", {
                doClose: s,
                doRootClick: ke
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "class"])) : f("", !0),
        ue.value && D.value ? (a(), m(z, B({
          key: 1,
          modelValue: k.value,
          "onUpdate:modelValue": o[7] || (o[7] = (s) => k.value = s)
        }, {
          referrer: D.value,
          ...n.tooltip
        }), Ee({ _: 2 }, [
          Ke.value ? {
            name: "default",
            fn: Y(({ doClose: s }) => [
              (a(!0), h(Ie, null, Me(n.splitButtons, (F) => (a(), m(y, B({ ref_for: !0 }, F, { onClick: s }), null, 16, ["onClick"]))), 256)),
              E(t.$slots, "tooltip", {
                doClose: s,
                doRootClick: ke
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue"])) : f("", !0)
      ], 34));
    };
  }
}), Mt = {
  install: (n) => {
    n.component("lkt-button") === void 0 && n.component("lkt-button", wt);
  }
}, xt = (n) => {
  I.defaultSplitIcon = n;
};
export {
  It as debugLktButton,
  Mt as default,
  xt as setDefaultButtonSplitSlot
};
