/* Petits décors partagés : ciel d'étoiles (Les Amis de Buck), guillemet des témoignages. */
import { html } from '../../outils/gabarit.mjs';

export const etoiles = (n, graine) => {
  let x = graine;
  const alea = () => ((x = (x * 9301 + 49297) % 233280) / 233280);
  return html`<svg class="etoiles" viewBox="0 0 100 62" preserveAspectRatio="xMidYMid slice" aria-hidden="true" data-effet="etoiles">${Array.from({ length: n }, (_, i) => html`<circle cx="${(alea() * 100).toFixed(2)}" cy="${(alea() * 62).toFixed(2)}" r="${(0.08 + alea() * 0.22).toFixed(2)}" style="--i:${i}"/>`)}</svg>`;
};

export const guillemet = html`<svg class="guillemet" viewBox="0 0 64 48" aria-hidden="true" data-visuel><path d="M4 44V28C4 14 11 6 25 4l2 6c-8 2-12 7-12 14h10v20H4Zm34 0V28c0-14 7-22 21-24l2 6c-8 2-12 7-12 14h10v20H38Z" fill="currentColor"/></svg>`;
