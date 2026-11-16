/* Sophrologie : grand titre puis bandeau panoramique qui s'ouvre, le mot (sôs, phren, logos), trois techniques,
   onze domaines filtrables, protocole acouphènes (onde qui s'apaise, parcours à plusieurs), déroulé d'une séance,
   individuel et entreprise, tarifs, appel. */
import { html } from '../../outils/gabarit.mjs';
import { appel } from '../gabarits/commun.mjs';
import { guillemet } from '../gabarits/decor.mjs';

export const page = { cle: 'sophrologie', fichier: 'sophrologie', imagePartage: 'grok/sophro-ouverture-1280.webp' };

export default (c) => {
  const familles = ['emotions', 'sante', 'pro', 'moments'];
  const t = c.donnees.tarifs.sophrologie;
  const temoin = c.donnees.temoignages.find((x) => x.cle === 'jean-baptiste');
  return html`
<section class="ouv-bandeau" id="debut">
  <div class="conteneur ouv-bandeau-tete">
    <p class="surtitre" data-anime="gsap">${c.t('sophro.hero.surtitre')}</p>
    <h1 class="ouv-titre" data-anime="gsap">${c.tb('sophro.hero.titre')}</h1>
    <div class="ouv-bandeau-bas" data-anime="gsap">
      <p class="ouv-texte masque-ecran-bas">${c.t('sophro.hero.texte')}</p>
      <div class="ouv-actions">
        ${c.lien('rendez-vous', { ancre: 'demande', params: 'sujet=sophrologie', classe: 'bouton', texte: c.t('sophro.hero.action'), attrs: 'data-action-principale data-survol="magnetique"' })}
        <p class="ouv-info" data-info-cle>${c.t('sophro.hero.info')}</p>
      </div>
    </div>
  </div>
  <div class="bandeau-zone">
    ${c.media({ nom: 'grok/sophro-ouverture', alt: c.s('sophro.hero.alt'), priorite: true, classe: 'bandeau-media', cadrage: '50% 60%', sizes: '100vw', attrs: 'data-effet="bandeau-ouvre" data-iris-centre' })}
  </div>
</section>

<section class="section definition" id="definition">
  <div class="conteneur">
    <div class="tete-section">
      <p class="surtitre" data-anime>${c.t('sophro.definition.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('sophro.definition.titre')}</h2>
      <p class="chapo" data-anime>${c.t('sophro.definition.texte')}</p>
    </div>
    <ul class="mots-grecs" data-anime="cascade">
      ${[1, 2, 3].map((n) => html`<li><span class="mot-grec" lang="grc-Latn">${c.t(`sophro.definition.m${n}`)}</span><span>${c.t(`sophro.definition.m${n}Texte`)}</span></li>`)}
    </ul>
    <p class="encart centre-bloc" data-anime>${c.t('sophro.definition.medical')}</p>
  </div>
</section>

<section class="section techniques fond-ciel" id="techniques">
  <div class="conteneur techniques-grille">
    ${c.media({ nom: 'grok/seance-eau', alt: c.s('sophro.techniques.alt'), classe: 'techniques-media', sizes: '(max-width: 760px) 100vw, 36vw', attrs: 'data-anime="rideau"' })}
    <div>
      <p class="surtitre" data-anime>${c.t('sophro.techniques.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('sophro.techniques.titre')}</h2>
      <ul class="techniques-liste" data-anime="cascade">
        ${[1, 2, 3].map((n) => html`<li><h3>${c.t(`sophro.techniques.t${n}`)}</h3><p>${c.t(`sophro.techniques.t${n}Texte`)}</p></li>`)}
      </ul>
      <p class="note" data-anime>${c.t('sophro.techniques.inspiration')}</p>
    </div>
  </div>
</section>

<section class="section domaines" id="domaines">
  <div class="conteneur">
    <div class="tete-section">
      <p class="surtitre" data-anime>${c.t('sophro.domaines.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('sophro.domaines.titre')}</h2>
    </div>
    <div class="filtres" role="group" aria-label="${c.s('sophro.domaines.filtres')}" data-filtres data-anime>
      <button type="button" class="filtre" data-filtre="tous" aria-pressed="true">${c.t('sophro.domaines.tous')}</button>
      ${familles.map((f) => html`<button type="button" class="filtre" data-filtre="${f}" aria-pressed="false">${c.t(`sophro.domaines.${f}`)}</button>`)}
    </div>
    <p class="visuellement-cache" aria-live="polite" data-filtre-compte="${c.s('sophro.domaines.compte')}"></p>
    <ul class="domaines-grille" data-anime="cascade">
      ${c.donnees.domaines.map((d, i) => html`<li class="domaine" data-famille="${d.famille}" id="domaine-${d.cle}"><span class="domaine-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><h3>${d.titre}</h3><p>${d.texte}</p><span class="domaine-famille">${c.t(`sophro.domaines.${d.famille}`)}</span></li>`)}
    </ul>
  </div>
</section>

<section class="section acouphenes acouphenes--page" id="acouphenes">
  <div class="conteneur acouphenes-grille">
    <div class="acouphenes-texte">
      <p class="surtitre" data-anime>${c.t('sophro.acouphenes.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('sophro.acouphenes.titre')}</h2>
      <p data-anime>${c.t('sophro.acouphenes.texte')}</p>
      <p class="grand-chiffre" data-anime><strong>${c.t('sophro.acouphenes.chiffre')}</strong> ${c.t('sophro.acouphenes.chiffreTexte')}</p>
      <ul class="coches" data-anime="cascade">${[1, 2, 3, 4].map((n) => html`<li>${c.t(`sophro.acouphenes.o${n}`)}</li>`)}</ul>
      <p class="note" data-anime>${c.t('sophro.acouphenes.aussi')}</p>
    </div>
    ${c.media({ nom: 'grok/acouphenes-eau', alt: c.s('sophro.acouphenes.alt'), classe: 'acouphenes-media', sizes: '(max-width: 760px) 100vw, 50vw', attrs: 'data-fx="zoom"' })}
  </div>
  <svg class="onde" viewBox="0 0 1200 160" preserveAspectRatio="none" aria-hidden="true" data-effet="onde-apaisee"><path d="M0 80 L1200 80"/><path class="onde-2" d="M0 80 L1200 80"/></svg>
  <div class="conteneur parcours">
    <h3 data-anime>${c.t('sophro.acouphenes.parcoursTitre')}</h3>
    <ol class="parcours-liste" data-anime="cascade">
      ${[1, 2, 3, 4, 5].map((n) => html`<li${n === 5 ? html` class="parcours-moi"` : ''}><strong>${c.t(`sophro.acouphenes.p${n}`)}</strong><span>${c.t(`sophro.acouphenes.p${n}Texte`)}</span></li>`)}
    </ol>
    <p class="encart" data-anime>${c.t('sophro.acouphenes.medical')}</p>
  </div>
</section>

<section class="section seance fond-ciel" id="seance">
  <div class="conteneur seance-grille">
    <div class="seance-tete">
      <p class="surtitre" data-anime>${c.t('accueil.seance.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('accueil.seance.titre')}</h2>
      <div class="durees" data-anime="cascade">
        <p><strong>${c.t('accueil.seance.duree1')}</strong> ${c.t('accueil.seance.duree1Texte')}</p>
        <p><strong>${c.t('accueil.seance.duree2')}</strong> ${c.t('accueil.seance.duree2Texte')}</p>
      </div>
      <blockquote class="petite-citation" data-anime>${guillemet}<p>${temoin.texte}</p><footer>${temoin.nom}</footer></blockquote>
    </div>
    <div class="temps">
      <svg class="temps-fil" viewBox="0 0 4 600" preserveAspectRatio="none" aria-hidden="true" data-visuel data-fx="trace"><path d="M2 0 V600" fill="none" stroke="currentColor" stroke-width="2"/></svg>
      <ol class="temps-liste" data-anime="cascade">
        ${c.donnees.seance.map((e, i) => html`<li><span class="temps-num" aria-hidden="true">${i + 1}</span><h3>${e.titre}</h3><p>${e.texte}</p></li>`)}
      </ol>
      <p class="note" data-anime>${c.t('accueil.seance.secret')}</p>
    </div>
  </div>
</section>

<section class="section entreprise" id="entreprise">
  <div class="conteneur entreprise-grille">
    <div>
      <p class="surtitre" data-anime>${c.t('sophro.entreprise.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('sophro.entreprise.titre')}</h2>
      <div class="duo" data-anime="cascade">
        <div><h3>${c.t('sophro.entreprise.indivTitre')}</h3><p>${c.t('sophro.entreprise.indivTexte')}</p></div>
        <div><h3>${c.t('sophro.entreprise.groupeTitre')}</h3><p>${c.t('sophro.entreprise.groupeTexte')}</p><p class="prix-ligne" data-prix>${c.t('sophro.entreprise.groupePrix')}</p></div>
      </div>
      <p data-anime>${c.lien('rendez-vous', { ancre: 'demande', params: 'sujet=entreprise', classe: 'bouton bouton--contour', texte: c.t('sophro.entreprise.action') })}</p>
    </div>
    ${c.media({ nom: 'grok/sophro-entreprise', alt: c.s('sophro.entreprise.alt'), classe: 'entreprise-media', sizes: '(max-width: 760px) 100vw, 45vw', attrs: 'data-anime="rideau"' })}
  </div>
</section>

<section class="section tarifs-bloc fond-ciel" id="tarifs">
  <div class="conteneur tarifs-bloc-grille">
    <div>
      <p class="surtitre" data-anime>${c.t('sophro.tarifs.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('sophro.tarifs.titre')}</h2>
      <p class="note" data-anime>${c.t('sophro.tarifs.note')}</p>
      <p data-anime>${c.lien('rendez-vous', { ancre: 'tarifs', params: 'accompagnement=sophrologie', classe: 'lien-fleche', texte: c.t('commun.voirTarifs') })}</p>
    </div>
    <table class="table-prix" data-anime>
      <caption class="visuellement-cache">${t.nom}</caption>
      <thead><tr><th scope="col">${c.t('rdv.tarifs.colonneProfil')}</th><th scope="col">${c.t('rdv.tarifs.colonnePrix')}</th><th scope="col">${c.t('rdv.tarifs.colonneForfait')}</th></tr></thead>
      <tbody>${t.lignes.map((l) => html`<tr><th scope="row">${l.libelle}</th><td data-prix>${l.prix} €</td><td data-prix>${l.forfait ? `${l.forfait} €` : '–'}</td></tr>`)}</tbody>
    </table>
  </div>
</section>

${appel(c)}
`;
};
