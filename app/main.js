import {Observable} from 'rx';
import Cycle from '@cycle/core';
import {h, makeDOMDriver} from '@cycle/dom';
import {sample} from 'lodash';
import draw from './logoGenerator';

const main = () => {

  const REFRESH_RATE = 800;

  const PALETTE = [
    '#fc000',
    '#0038CC',
    '#215CFF',
    '#FFD605',
    '#FF7D05'
  ];

  const intent = Observable.interval(REFRESH_RATE)
    .startWith(0)
    .map(i => i+1);

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

  const DOM = Observable.just(
    h('button', 'Refresh')
  );

  return {
    svg,
    DOM
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
