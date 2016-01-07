import {Observable, Subject} from 'rx';
import Cycle from '@cycle/core';
import {h, makeDOMDriver} from '@cycle/dom';
import {sample} from 'lodash';
import draw from './logoGenerator';

const main = ({DOM}) => {

  const REFRESH_RATE = 1000;

  const PALETTE = [
    '#0038CC',
    '#215CFF',
    '#FFD605',
    '#FF7D05'
  ];

  const togglePlay$ = DOM.select('input.toggle')
    .events('change')
    .map(ev => ev.target.checked)
    .startWith(true);

  const intent = Observable.interval(REFRESH_RATE);

  const speed$ = DOM.select('input.speed')
    .events('input')
    .startWith(1000)
    .map(value => {
      refreshInterval.onNext(value);
    });

  const model = intent.map(() => {
      return sample(PALETTE, 4);
  });

  const svg = model
    .map(colours => {

      const data = {
        colour1: colours[0],
        colour2: colours[1],
        colour3: colours[2],
        colour4: colours[3]
      };

      const output = draw(data);

      return output;
    });

  const vTree$ = togglePlay$.map(
    shouldPlay => {
      return h('div', [

        //h('input.toggle', {
        //  type: 'checkbox',
        //  checked: shouldPlay
        //}, 'Play?'),

        //h('input.speed', {
        //  type: 'range',
        //  min: 200,
        //  max: 2000
        //})
      ])
    }
  );

  return {
    svg,
    DOM: vTree$
  };
};

const makeCanvasDriver = (canvasId) => {
  return svgStr$ => {
    svgStr$.subscribe(svgStr => {
      canvg(canvasId, svgStr, {
        ignoreMouse: true,
        ignoreAnimation: true
      });
    })
  };
};

const drivers = {
  DOM: makeDOMDriver('#app'),
  svg: makeCanvasDriver('display')
};

Cycle.run(main, drivers);
