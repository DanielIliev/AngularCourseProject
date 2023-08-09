import {
  animate,
  animateChild,
  group,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fadeInOut = trigger('routeAnimations', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        animate(
          '300ms ease-in',
          style({
            opacity: 1,
          })
        ),
      ],
      { optional: true }
    ),
    query(
      ':leave',
      [
        style({ display: 'none', opacity: 0 }),
        animate(
          '0ms ease-in',
          style({
            opacity: 0,
          })
        ),
      ],
      { optional: true }
    ),
  ]),
]);
