/* Tarifs et rendez-vous : ouverture « deux portes » (cabinet ou en ligne, prix en très grand), calculateur
   de tarifs et tableaux complets, questions pratiques, le cabinet (photo, plan simplifié), demande simulée, appel. */
import { html, brut } from '../../outils/gabarit.mjs';
import { appel } from '../gabarits/commun.mjs';

export const page = { cle: 'rendez-vous', fichier: 'rendez-vous', imagePartage: 'grok/rdv-ouverture-1280.webp' };

export default (c) => {
  const k = c.site.contact;
  const T = c.donnees.tarifs;
  const nouvel = html`<span class="visuellement-cache"> ${c.t('commun.nouvelOnglet')}</span>`;
  const tableau = (cle, forfait) => html`<div class="table-bloc"><h4 class="table-titre">${T[cle].nom}<small>${T[cle].duree}</small></h4><table class="table-prix">
    <caption class="visuellement-cache">${T[cle].nom}</caption>
    <thead><tr><th scope="col">${c.t('rdv.tarifs.colonneProfil')}</th><th scope="col">${c.t('rdv.tarifs.colonnePrix')}</th>${forfait ? html`<th scope="col">${c.t('rdv.tarifs.colonneForfait')}</th>` : ''}</tr></thead>
    <tbody>${T[cle].lignes.map((l) => html`<tr><th scope="row">${l.libelle}</th><td data-prix>${l.prix} €</td>${forfait ? html`<td data-prix>${l.forfait ? `${l.forfait} €` : '–'}</td>` : ''}</tr>`)}</tbody>
  </table></div>`;
  return html`
<section class="ouv-portes" id="debut">
  <div class="conteneur">
    <div class="ouv-portes-tete">
      <div>
        <p class="surtitre" data-anime="gsap">${c.t('rdv.hero.surtitre')}</p>
        <h1 class="ouv-titre" data-anime="gsap">${c.tb('rdv.hero.titre')}</h1>
        <p class="ouv-texte masque-ecran-bas" data-anime="gsap">${c.t('rdv.hero.texte')}</p>
      </div>
      <p class="prix-rond" data-iris-centre="disque" data-info-cle data-prix><strong>${c.t('rdv.hero.prixRond')}</strong><span>${c.t('rdv.hero.prixRondTexte')}</span></p>
    </div>
    <div class="portes" id="choisir" data-effet="choix">
      <article class="porte porte--cabinet">
        ${c.media({ nom: 'grok/rdv-ouverture', alt: c.s('rdv.hero.alt'), priorite: true, classe: 'porte-media', cadrage: '40% 55%', sizes: '(max-width: 760px) 92vw, 45vw' })}
        <div class="porte-corps">
          <h2>${c.t('rdv.hero.cabinet')}</h2>
          <p class="porte-quand">${c.t('rdv.hero.cabinetQuand')}</p>
          <p>${c.t('rdv.hero.cabinetOu')}</p>
          <a class="bouton" href="${k.agenda}" target="_blank" rel="noopener" data-action-principale data-survol="magnetique">${c.t('rdv.hero.cabinetAction')} <span aria-hidden="true">↗</span>${nouvel}</a>
        </div>
      </article>
      <article class="porte porte--ligne">
        <span class="porte-icone" aria-hidden="true"><svg viewBox="0 0 48 48"><rect x="6" y="10" width="36" height="24" rx="4" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M18 40h12M24 34v6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="24" cy="22" r="5" fill="currentColor"/></svg></span>
        <div class="porte-corps">
          <h2>${c.t('rdv.hero.ligne')}</h2>
          <p class="porte-quand">${c.t('rdv.hero.ligneQuand')}</p>
          <p>${c.t('rdv.hero.ligneOu')}</p>
          <a class="bouton bouton--contour" href="tel:${k.telephoneLien}" data-survol="magnetique">${c.t('rdv.hero.ligneAction')}</a>
        </div>
      </article>
    </div>
  </div>
</section>

<section class="section tarifs-page fond-ciel" id="tarifs">
  <div class="conteneur">
    <div class="tete-section">
      <p class="surtitre" data-anime>${c.t('rdv.tarifs.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('rdv.tarifs.titre')}</h2>
      <p class="chapo" data-anime>${c.t('rdv.tarifs.texte')}</p>
    </div>
    <form class="calcul" data-calcul data-anime action="#" onsubmit="return false" aria-describedby="calcul-resultat">
      <fieldset class="calcul-choix">
        <legend>${c.t('rdv.tarifs.accompagnement')}</legend>
        ${[['sophrologie', T.sophrologie.nom], ['acouphenes', c.s('rdv.tarifs.acouphenes')], ['buck', T.buck.nom], ['hypnose', T.hypnose.nom]].map(([v, n], i) => html`<label class="pastille"><input type="radio" name="accompagnement" value="${v}"${i === 0 ? brut(' checked') : ''}><span>${n}</span></label>`)}
      </fieldset>
      <fieldset class="calcul-choix">
        <legend>${c.t('rdv.tarifs.profil')}</legend>
        ${['adulte', 'etudiant', 'reconversion', 'enfant', 'groupe'].map((v, i) => html`<label class="pastille"><input type="radio" name="profil" value="${v}"${i === 0 ? brut(' checked') : ''}><span>${c.t(`rdv.tarifs.${v}`)}</span></label>`)}
      </fieldset>
      <output class="calcul-resultat" id="calcul-resultat" aria-live="polite" data-grille="retour" data-calcul-resultat data-par-seance="${c.s('rdv.tarifs.parSeance')}" data-non-propose="${c.s('rdv.tarifs.nonPropose')}">
        <span class="calcul-prix" data-prix><strong data-calcul-prix>50 €</strong> <span>${c.t('rdv.tarifs.parSeance')}</span></span>
        <span class="calcul-detail" data-calcul-detail>${T.sophrologie.duree} · 450 € les 10 séances</span>
      </output>
      <p class="calcul-suite">${c.lien('rendez-vous', { ancre: 'demande', classe: 'bouton', texte: c.t('rdv.tarifs.demande'), attrs: 'data-calcul-lien' })}<a class="lien-fleche" href="${k.agenda}" target="_blank" rel="noopener">${c.t('rdv.tarifs.agenda')} <span aria-hidden="true">↗</span>${nouvel}</a></p>
      <script type="application/json" data-calcul-donnees>${brut(JSON.stringify(T).replace(/</g, '\\u003c'))}</script>
    </form>
    <h3 class="tarifs-sous-titre" data-anime>${c.t('rdv.tarifs.tableauTitre')}</h3>
    <div class="tables" data-anime="cascade">
      ${tableau('sophrologie', true)}
      ${tableau('buck', false)}
      ${tableau('hypnose', false)}
    </div>
  </div>
</section>

<section class="section reglement" id="reglement">
  <div class="conteneur reglement-grille">
    <div>
      <p class="surtitre" data-anime>${c.t('rdv.reglement.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('rdv.reglement.titre')}</h2>
      <p data-anime><a class="lien-fleche" href="${k.mutuelles}" target="_blank" rel="noopener">${c.t('rdv.reglement.mutuelles')} <span aria-hidden="true">↗</span>${nouvel}</a></p>
    </div>
    <div class="faq" data-anime="cascade">
      ${c.donnees.faq.map((f) => html`<details class="faq-item"><summary>${f.q}</summary><p>${f.r}</p></details>`)}
    </div>
  </div>
</section>

<section class="section cabinet fond-ciel" id="cabinet">
  <div class="conteneur cabinet-grille">
    <div>
      <p class="surtitre" data-anime>${c.t('rdv.cabinet.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('rdv.cabinet.titre')}</h2>
      <p data-anime>${c.t('rdv.cabinet.texte')}</p>
      <address class="adresse" data-anime>${k.lieu}<br>${k.adresse}</address>
      <dl class="acces" data-anime="cascade">
        ${['metro', 'tram', 'bus', 'parking'].map((x) => html`<div><dt>${c.t(`rdv.cabinet.${x}`)}</dt><dd>${c.t(`rdv.cabinet.${x}Texte`)}</dd></div>`)}
      </dl>
      <p data-anime><a class="lien-fleche" href="${k.carte}" target="_blank" rel="noopener">${c.t('rdv.cabinet.carte')} <span aria-hidden="true">↗</span>${nouvel}</a></p>
    </div>
    <div class="cabinet-visuels">
      ${c.media({ nom: 'cabinet', alt: c.s('rdv.cabinet.photoAlt'), classe: 'cabinet-media', sizes: '(max-width: 760px) 100vw, 40vw', legende: c.s('rdv.cabinet.photoLegende'), attrs: 'data-anime="rideau"' })}
      <figure class="plan" data-visuel>
        <svg viewBox="0 0 400 120" aria-hidden="true" data-fx="trace">
          <path d="M40 60 H360" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
          <circle cx="40" cy="60" r="9" fill="none" stroke="currentColor" stroke-width="3"/>
          <circle cx="360" cy="60" r="9" fill="none" stroke="currentColor" stroke-width="3"/>
          <circle cx="200" cy="60" r="16" fill="none" stroke="currentColor" stroke-width="3"/>
        </svg>
        <ul class="plan-reperes">
          <li data-repere><span class="plan-pastille" aria-hidden="true">M</span>${c.t('rdv.cabinet.metro')} ${c.t('rdv.cabinet.metroTexte')}</li>
          <li data-repere class="plan-cabinet"><span class="plan-pastille" aria-hidden="true">P</span>${c.t('rdv.cabinet.surtitre')} · ${c.t('rdv.cabinet.parking')} ${c.t('rdv.cabinet.parkingTexte')}</li>
          <li data-repere><span class="plan-pastille" aria-hidden="true">T</span>${c.t('rdv.cabinet.tram')} ${c.t('rdv.cabinet.tramTexte')}</li>
        </ul>
        <figcaption>${c.t('rdv.cabinet.plan')}</figcaption>
      </figure>
    </div>
  </div>
</section>

<section class="section demande" id="demande">
  <div class="conteneur demande-grille">
    <div>
      <p class="surtitre" data-anime>${c.t('rdv.demande.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('rdv.demande.titre')}</h2>
      <p data-anime>${c.t('rdv.demande.texte')}</p>
      <p class="demande-tel" data-anime><a href="tel:${k.telephoneLien}">${k.telephone}</a></p>
      <span class="demande-souffle" aria-hidden="true" data-fx="vitesse" data-fx-force="6"></span>
    </div>
    <form data-formulaire class="formulaire" action="#" novalidate data-anime>
      <div class="champ"><label for="f-nom">${c.t('rdv.demande.nom')}</label><input id="f-nom" name="nom" autocomplete="name" required></div>
      <div class="champs-duo">
        <div class="champ"><label for="f-email">${c.t('rdv.demande.email')}</label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
        <div class="champ"><label for="f-tel">${c.t('rdv.demande.tel')}</label><input id="f-tel" name="tel" type="tel" autocomplete="tel"></div>
      </div>
      <div class="champ"><label for="f-ville">${c.t('rdv.demande.ville')}</label><input id="f-ville" name="ville" autocomplete="address-level2"></div>
      <div class="champs-duo">
        <div class="champ"><label for="f-sujet">${c.t('rdv.demande.sujet')}</label>
          <select id="f-sujet" name="sujet">
            <option value="sophrologie">${c.t('rdv.demande.sujetSophro')}</option>
            <option value="buck">${c.t('rdv.demande.sujetBuck')}</option>
            <option value="acouphenes">${c.t('rdv.demande.sujetAcouphenes')}</option>
            <option value="hypnose">${c.t('rdv.demande.sujetHypnose')}</option>
            <option value="entreprise">${c.t('rdv.demande.sujetEntreprise')}</option>
            <option value="autre">${c.t('rdv.demande.sujetAutre')}</option>
          </select></div>
        <div class="champ"><label for="f-lieu">${c.t('rdv.demande.lieu')}</label>
          <select id="f-lieu" name="lieu">
            <option value="indifferent">${c.t('rdv.demande.lieuIndifferent')}</option>
            <option value="cabinet">${c.t('rdv.demande.lieuCabinet')}</option>
            <option value="ligne">${c.t('rdv.demande.lieuLigne')}</option>
          </select></div>
      </div>
      <div class="champ"><label for="f-message">${c.t('rdv.demande.message')}</label><textarea id="f-message" name="message" rows="5" required></textarea></div>
      <p class="mention-donnees">${c.t('rdv.demande.donnees')}</p>
      <button type="submit" class="bouton">${c.t('rdv.demande.envoyer')}</button>
      <p data-message-envoi role="status" tabindex="-1" hidden></p>
    </form>
  </div>
</section>

${appel(c)}
`;
};
