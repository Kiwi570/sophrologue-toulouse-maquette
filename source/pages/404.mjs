/* Page 404 aux couleurs du site : la porte ouverte (la devise), retour à l'accueil. */
import { html } from '../../outils/gabarit.mjs';

export const page = { cle: '404', fichier: '404', langues: ['fr'], partage: false };

export default (c) => html`
<section class="ouv-arche introuvable" id="debut">
  <div class="conteneur ouv-arche-grille">
    <div class="ouv-arche-texte">
      <h1 class="ouv-titre" data-anime="lignes">${c.tb('introuvable.titre')}</h1>
      <p class="ouv-texte" data-anime>${c.t('introuvable.texte')}</p>
      <p class="ouv-actions" data-anime>${c.lien('accueil', { classe: 'bouton', texte: c.t('introuvable.retour'), attrs: 'data-action-principale' })}</p>
      <p class="ouv-info" data-info-cle data-anime>${c.t('commun.horairesCabinet')}</p>
    </div>
    <div class="arche">
      ${c.media({ nom: 'grok/404', alt: c.s('introuvable.alt'), priorite: true, classe: 'arche-media', sizes: '(max-width: 760px) 90vw, 42vw', attrs: 'data-fx="parallaxe" data-iris-centre' })}
    </div>
  </div>
</section>
`;
