import {
  e as o,
  o as c,
  h as l,
  j as e,
  w as t,
  n as _,
  aK as d,
  aL as f,
  aM as m,
  aN as v,
  aH as x,
  aI as g,
} from './vendor.c7239947.js'
/* empty css              */ const h = { style: { background: '#ececec', padding: '30px' } },
  w = o({
    setup(i) {
      return (r, u) => {
        const a = m,
          n = v,
          s = x,
          p = g
        return (
          c(),
          l('div', h, [
            e(
              p,
              { gutter: 16 },
              {
                default: t(() => [
                  e(
                    s,
                    { span: 6 },
                    {
                      default: t(() => [
                        e(n, null, {
                          default: t(() => [
                            e(
                              a,
                              {
                                title: 'Feedback',
                                value: 11.28,
                                precision: 2,
                                suffix: '%',
                                'value-style': { color: '#3f8600' },
                                style: { 'margin-right': '50px' },
                              },
                              { prefix: t(() => [e(_(d))]), _: 1 },
                              8,
                              ['value'],
                            ),
                          ]),
                          _: 1,
                        }),
                      ]),
                      _: 1,
                    },
                  ),
                  e(
                    s,
                    { span: 6 },
                    {
                      default: t(() => [
                        e(n, null, {
                          default: t(() => [
                            e(
                              a,
                              {
                                title: 'Idle',
                                value: 9.3,
                                precision: 2,
                                suffix: '%',
                                class: 'demo-class',
                                'value-style': { color: '#cf1322' },
                              },
                              { prefix: t(() => [e(_(f))]), _: 1 },
                              8,
                              ['value'],
                            ),
                          ]),
                          _: 1,
                        }),
                      ]),
                      _: 1,
                    },
                  ),
                  e(
                    s,
                    { span: 6 },
                    {
                      default: t(() => [
                        e(n, null, { default: t(() => [e(a, { title: 'Active Users', value: 112893 })]), _: 1 }),
                      ]),
                      _: 1,
                    },
                  ),
                  e(
                    s,
                    { span: 6 },
                    {
                      default: t(() => [
                        e(n, null, {
                          default: t(() => [e(a, { title: 'Account Balance (CNY)', precision: 2, value: 112893 })]),
                          _: 1,
                        }),
                      ]),
                      _: 1,
                    },
                  ),
                ]),
                _: 1,
              },
            ),
          ])
        )
      }
    },
  }),
  k = { class: 'container' },
  C = o({
    setup(i) {
      return (r, u) => (c(), l('div', k, [e(w)]))
    },
  })
export { C as default }
