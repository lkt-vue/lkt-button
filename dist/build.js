import { defineComponent as qe, mergeDefaults as Ge, useSlots as Je, ref as f, watch as E, computed as n, resolveComponent as P, createElementBlock as p, openBlock as i, normalizeClass as I, createBlock as C, createCommentVNode as r, mergeProps as j, withCtx as z, renderSlot as R, toDisplayString as K, unref as q, Fragment as me, createTextVNode as ke, resolveDynamicComponent as ye, withDirectives as Qe, withModifiers as he, vShow as We, createSlots as Ce } from "vue";
import { generateRandomString as Xe } from "lkt-string-tools";
import { httpCall as Ye } from "lkt-http-client";
import { openModal as Ze, openConfirm as _e, runModalCallback as $e } from "lkt-modal";
import { useRouter as et } from "vue-router";
import { extractPropValue as G, ButtonType as o, extractI18nValue as $, FieldType as be, Anchor as tt, getDefaultValues as ot, Button as lt, LktSettings as we } from "lkt-vue-kernel";
const H = class H {
};
H.DEFAULT_PALETTE = "", H.debugEnabled = !1, H.defaultSplitIcon = void 0;
let w = H;
const kt = (d) => {
  w.DEFAULT_PALETTE = d;
}, yt = (d = !0) => {
  w.debugEnabled = d;
}, u = (...d) => {
  w.debugEnabled && console.info("[LktButton] ", ...d);
}, nt = {
  key: 1,
  class: "lkt-button--icon-dot"
}, it = ["src", "alt"], ut = {
  key: 1,
  class: "lkt-button--icon-dot"
}, at = ["src", "alt"], rt = {
  key: 10,
  class: "lkt-split-button-arrow"
}, ct = /* @__PURE__ */ qe({
  __name: "LktButton",
  props: /* @__PURE__ */ Ge({
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
    const e = d, k = ge, U = Je(), ee = et();
    let x = G(e.modal, e.prop), Se = G(e.modalKey, e.prop), Be = G(e.icon, e.prop), Oe = G(e.iconEnd, e.prop);
    const De = "lkt-button-" + Xe(), T = f(e.loading), g = f(null), J = f(null), S = f(!1), v = f(e.openTooltip), te = f(!1), B = f(!1), O = f(void 0), s = f(e.checked), oe = f(void 0), Q = f(null), W = f(!1);
    E(() => e.openTooltip, (t) => v.value = t), E(v, (t) => k("update:openTooltip", t));
    const le = n(() => {
      let t = [];
      return e.class && t.push(e.class), M.value && t.push("lkt-split-button"), t.push(`lkt-button--${e.type}`), T.value && t.push("is-loading"), te.value && t.push("is-active-route"), v.value && t.push("show-tooltip"), S.value && t.push("show-split"), s.value && t.push("is-checked"), t.join(" ");
    }), Ee = n(() => {
      let t = [];
      return e.containerClass && t.push(e.containerClass), t.join(" ");
    }), b = n(() => {
      if (e.type === o.Switch || e.type === o.HiddenSwitch) {
        if (s.value && typeof e.textOn < "u") return $(e.textOn);
        if (!s.value && typeof e.textOff < "u") return $(e.textOff);
      }
      return $(e.text);
    }), D = n(() => {
      if (e.type === o.Switch || e.type === o.HiddenSwitch) {
        if (s.value && typeof e.iconOn < "u") return e.iconOn;
        if (!s.value && typeof e.iconOff < "u") return e.iconOff;
      }
      return Be;
    }), ne = n(() => {
      if (e.type === o.Switch || e.type === o.HiddenSwitch) {
        if (s.value && typeof e.iconEndOn < "u") return e.iconEndOn;
        if (!s.value && typeof e.iconEndOff < "u") return e.iconEndOff;
      }
      return Oe;
    }), F = n(() => typeof e.modalData == "function" ? e.modalData(e.prop) : e.modalData), Ie = n(() => typeof w.defaultSplitIcon < "u"), Re = n(() => w.defaultSplitIcon), ie = n(() => typeof e.dot == "boolean" ? "" : e.dot), y = (t, a = void 0) => {
      u("endClickMethod", t, a), xe(), Ne(), k("click", t, a);
    }, V = async (t) => {
      u("Resource Click", e.resource, e.resourceData), T.value = !0, k("loading");
      let a = { ...e.resourceData, isChecked: s.value };
      return Ye(e.resource, a).then((m) => {
        T.value = !1, k("loaded"), u("Resource Click -> Received response", m), y(t, m);
      }).catch((m) => {
        T.value = !1, k("loaded"), u("Resource Click -> Received response error", m), y(t, m);
      });
    }, ue = f(!1), Fe = n(() => g.value ? e.type === o.TooltipLazy ? ue.value : e.type === o.TooltipEver ? v.value : e.type === o.Tooltip : !1), Ve = f(!1), Me = n(() => g.value ? e.type === o.SplitLazy ? Ve.value : e.type === o.SplitEver ? S.value : e.type === o.Split : !1), Le = (t) => {
      if (W.value) {
        W.value = !1, k("focus");
        return;
      }
      k("focus", t);
    }, Ae = (t) => {
      k("blur", t);
    }, X = n(() => e.type === o.Switch || e.type === o.HiddenSwitch), He = n(() => e.type === o.Switch), Y = n(() => e.type === o.FileUpload || e.type === o.ImageUpload), Ue = n(() => e.type === o.ImageUpload ? be.Image : be.File), xe = () => {
      e.modalCallbacks.forEach((t) => {
        $e(t);
      });
    }, Ne = () => {
      var t;
      u("doConfigClick: ", e), typeof ((t = e.events) == null ? void 0 : t.click) == "function" && e.events.click();
    }, M = n(() => [
      o.Split,
      o.SplitLazy,
      o.SplitEver
    ].includes(e.type)), Z = n(() => [
      o.Tooltip,
      o.TooltipLazy,
      o.TooltipEver
    ].includes(e.type)), _ = (t) => {
      var a, m, N, L, A, c, ce, se, fe, de, pe;
      if (u("Click", e, t), t && (X.value ? (a = t.target) != null && a.closest(".lkt-field.is-switch") || (s.value = !s.value) : Y.value ? Q.value && ((m = Q.value) == null || m.click()) : Z.value ? (v.value = !v.value, v.value && (ue.value = !0)) : M.value && (S.value = !S.value)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), M.value || Z.value || Y.value) {
        y(t);
        return;
      }
      if (x) {
        let l = { ...F.value };
        u("Click -> has modal", e.modal, l), u("Click -> typeof beforeClose: ", typeof l.beforeClose), typeof l.beforeClose == "function" ? (l.beforeClose = (ve) => {
          if (e.resource)
            return V(t).then(() => {
              typeof F.value.beforeClose == "function" && F.value.beforeClose(ve);
            });
          typeof F.value.beforeClose == "function" && F.value.beforeClose(ve), y(t);
        }, u("Click -> New beforeClose function: ", l.beforeClose)) : (l.beforeClose = () => {
          if (e.resource)
            return V(t);
          y(t);
        }, u("Click -> New beforeClose function: ", l.beforeClose));
        let h = x;
        return typeof x == "function" && (h = x()), Ze(h, Se, l);
      }
      if (e.confirmModal) {
        u("Click -> has confirm modal", e.confirmModal, e.confirmData), u("Click -> typeof onConfirm: ", typeof ((N = e.confirmData.events) == null ? void 0 : N.click));
        let l = { ...e.confirmData };
        if (l.confirmButton ? l.confirmButton = { ...we.defaultConfirmButton, ...l.confirmButton } : l.confirmButton = { ...we.defaultConfirmButton }, l.confirmButton.events || (l.confirmButton.events = {}), typeof ((A = (L = l.confirmButton) == null ? void 0 : L.events) == null ? void 0 : A.click) == "function") {
          let h = (ce = (c = l.confirmButton) == null ? void 0 : c.events) == null ? void 0 : ce.click;
          u("Click -> Has onConfirm function: ", h), l.confirmButton.events.click = () => {
            if (u("OnConfirm -> Already: ", e), e.resource)
              return V(t).then(() => {
                h();
              });
            h(), y(t);
          }, u("Click -> New onConfirm function created: ", (fe = (se = l.confirmButton) == null ? void 0 : se.events) == null ? void 0 : fe.click);
        } else
          l.confirmButton.events.click = () => {
            var h;
            if (u("OnConfirm -> Created: ", e), e.resource)
              return V(t);
            if (((h = e.anchor) == null ? void 0 : h.to) !== "") {
              t && (t.preventDefault(), t.stopPropagation()), e.anchor.external || typeof e.anchor.to < "u" && ee.push(e.anchor.to);
              return;
            }
            y(t);
          }, u("Click -> New onConfirm function created: ", (de = l.confirmButton) == null ? void 0 : de.events.click);
        return _e(e.confirmModal, e.confirmModalKey, l);
      }
      if (e.resource)
        return u("Click -> has resource"), V(t);
      if (((pe = e.anchor) == null ? void 0 : pe.to) !== "") {
        u("Click -> Is Anchor", e.anchor), e.anchor.external ? typeof e.anchor.to == "string" && (window.location.href = e.anchor.to) : typeof e.anchor.to < "u" && ee.push(e.anchor.to);
        return;
      }
      if (X.value) {
        u("Click -> Is Switch"), y(t);
        return;
      }
      u("Click -> Emit", e), y(t);
    };
    E(() => e.loading, () => T.value = e.loading), E(() => e.checked, () => s.value = e.checked), E(s, (t) => k("update:checked", t)), E(B, (t) => {
      B.value && e.showTooltipOnHover ? (O.value !== void 0 && clearTimeout(O.value), O.value = setTimeout(() => {
        v.value = !0, clearTimeout(O.value);
      }, e.showTooltipOnHoverDelay)) : !B.value && e.hideTooltipOnLeave ? (v.value = !1, clearTimeout(O.value)) : B.value || clearTimeout(O.value);
    }), Te({
      click: () => _(null),
      focus: (t) => {
        J.value && (t && (W.value = !0), J.value.focus());
      }
    });
    const Pe = n(() => e.type === o.Content ? "div" : "button"), je = n(() => e.disabled === void 0 ? !1 : typeof e.disabled == "function" ? e.disabled({
      prop: e.prop
    }) : typeof e.disabled == "boolean" ? e.disabled : !1), ae = (t) => _(t), ze = (t) => te.value = t, re = n(() => e.type === o.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), Ke = n(() => re.value ? new tt({ ...e.anchor, class: le.value }) : {});
    return (t, a) => {
      const m = P("lkt-spinner"), N = P("lkt-anchor"), L = P("lkt-field"), A = P("lkt-tooltip");
      return i(), p("div", {
        class: I(["lkt-button-container", Ee.value]),
        ref_key: "container",
        ref: g,
        id: De,
        onMousemove: a[4] || (a[4] = (c) => B.value = !0),
        onMouseleave: a[5] || (a[5] = (c) => B.value = !1)
      }, [
        re.value ? (i(), C(N, j({ key: 0 }, Ke.value, {
          class: "lkt-button",
          onActive: ze
        }), {
          default: z(() => [
            D.value ? (i(), p("i", {
              key: 0,
              class: I(D.value)
            }, null, 2)) : r("", !0),
            D.value && t.dot ? (i(), p("i", nt, K(ie.value), 1)) : r("", !0),
            t.img ? (i(), p("img", {
              key: 2,
              src: t.img,
              alt: b.value
            }, null, 8, it)) : r("", !0),
            q(U).text ? R(t.$slots, "text", {
              key: 3,
              text: b.value
            }) : b.value ? (i(), p(me, { key: 4 }, [
              ke(K(b.value), 1)
            ], 64)) : r("", !0),
            q(U).default ? R(t.$slots, "default", { key: 5 }) : r("", !0),
            T.value ? (i(), C(m, { key: 6 })) : r("", !0)
          ]),
          _: 3
        }, 16)) : (i(), C(ye(Pe.value), {
          key: 1,
          class: I(["lkt-button", le.value]),
          ref_key: "button",
          ref: J,
          name: t.name,
          type: t.type,
          disabled: je.value,
          tabindex: t.tabindex,
          onClick: _,
          onFocus: Le,
          onBlur: Ae
        }, {
          default: z(() => [
            D.value ? (i(), p("i", {
              key: 0,
              class: I(D.value)
            }, null, 2)) : r("", !0),
            D.value && t.dot ? (i(), p("i", ut, K(ie.value), 1)) : r("", !0),
            t.img ? (i(), p("img", {
              key: 2,
              src: t.img,
              alt: b.value
            }, null, 8, at)) : r("", !0),
            q(U).text ? R(t.$slots, "text", {
              key: 3,
              text: b.value
            }) : b.value ? (i(), p(me, { key: 4 }, [
              ke(K(b.value), 1)
            ], 64)) : r("", !0),
            q(U).default ? R(t.$slots, "default", { key: 5 }) : r("", !0),
            T.value ? (i(), C(m, { key: 6 })) : r("", !0),
            X.value ? Qe((i(), C(L, {
              key: 7,
              type: "switch",
              modelValue: s.value,
              "onUpdate:modelValue": a[0] || (a[0] = (c) => s.value = c),
              onClick: he(() => {
              }, ["stop"])
            }, null, 8, ["modelValue"])), [
              [We, He.value]
            ]) : r("", !0),
            Y.value ? (i(), C(L, j({
              key: 8,
              ref_key: "fileFieldRef",
              ref: Q,
              type: Ue.value,
              modelValue: oe.value,
              "onUpdate:modelValue": a[1] || (a[1] = (c) => oe.value = c),
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
            ne.value ? (i(), p("i", {
              key: 9,
              class: I([ne.value, "lkt-button-icon-end"])
            }, null, 2)) : r("", !0),
            M.value ? (i(), p("div", rt, [
              t.splitIcon ? (i(), p("i", {
                key: 0,
                class: I(t.splitIcon)
              }, null, 2)) : Ie.value ? (i(), C(ye(Re.value), { key: 1 })) : r("", !0)
            ])) : r("", !0)
          ]),
          _: 3
        }, 40, ["class", "name", "type", "disabled", "tabindex"])),
        M.value && g.value ? (i(), C(A, j({
          key: 2,
          modelValue: S.value,
          "onUpdate:modelValue": a[2] || (a[2] = (c) => S.value = c)
        }, t.tooltip, {
          referrer: g.value,
          class: ["lkt-split-button-dropdown-content", t.splitClass]
        }), Ce({ _: 2 }, [
          Me.value ? {
            name: "default",
            fn: z(({ doClose: c }) => [
              R(t.$slots, "split", {
                doClose: c,
                doRootClick: ae
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "referrer", "class"])) : r("", !0),
        Z.value && g.value ? (i(), C(A, j({
          key: 3,
          modelValue: v.value,
          "onUpdate:modelValue": a[3] || (a[3] = (c) => v.value = c)
        }, t.tooltip, { referrer: g.value }), Ce({ _: 2 }, [
          Fe.value ? {
            name: "default",
            fn: z(({ doClose: c }) => [
              R(t.$slots, "tooltip", {
                doClose: c,
                doRootClick: ae
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
  w.defaultSplitIcon = d;
};
export {
  yt as debugLktButton,
  ht as default,
  kt as setDefaultButtonPalette,
  Ct as setDefaultButtonSplitSlot
};
