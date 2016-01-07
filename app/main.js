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

  const speed$ = DOM.select('input.speed')
    .events('input')
    .map(ev => ev.target.value)
    .startWith(REFRESH_RATE);

  const generate = speed$
    .debounce(100)
    .flatMapLatest(speed => Observable.interval(speed))
    .pausable();

  const togglePlay$ = DOM.select('input.toggle')
    .events('change')
    .map(ev => ev.target.checked)
    .startWith(true)
    .map(shouldRun => {
      if (shouldRun) {
        generate.resume();
      } else {
        generate.pause();
      }
    });

  const model = generate.map(() => {
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

  const vTree$ = speed$.withLatestFrom(
    togglePlay$,
    (speed, shouldPlay) =>

      h('div', [

        h('input.toggle', {
          type: 'checkbox',
          checked: shouldPlay
        }, 'Play?'),

        h('input.speed', {
          type: 'range',
          value: speed,
          min: 200,
          max: 2000
        })
      ])
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
