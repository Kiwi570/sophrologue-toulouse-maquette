/* Parcours propres à la maquette : calculateur de tarifs (prix vérifiés par le calcul) et filtres des domaines. */
export default async function ({ contexte, attendrePret, attendre, BASE, R, T }) {
  const { ctx, page } = await contexte({ taille: T('390×844') });
  try {
    await page.goto(BASE + '/rendez-vous?accompagnement=buck', { waitUntil: 'load' });
    await attendrePret(page);
    const cas = [['sophrologie', 'adulte', 50], ['buck', 'enfant', 20], ['hypnose', 'etudiant', 40], ['acouphenes', 'reconversion', 35], ['buck', 'groupe', 10], ['hypnose', 'enfant', null]];
    const choisi = await page.evaluate(() => document.querySelector('input[name="accompagnement"]:checked')?.value);
    if (choisi !== 'buck') R.echec('calculateur', `accompagnement prérempli « ${choisi} » au lieu de « buck »`, { page: '/rendez-vous', taille: '390×844' });
    for (const [acc, prof, attendu] of cas) {
      await page.locator(`input[name="accompagnement"][value="${acc}"]`).check({ force: true });
      await page.locator(`input[name="profil"][value="${prof}"]`).check({ force: true });
      await attendre(900);
      const affiche = await page.evaluate(() => document.querySelector('[data-calcul-prix]').textContent.trim());
      const ok = attendu == null ? affiche === '–' : affiche === `${attendu} €`;
      if (!ok) R.echec('calculateur', `${acc} × ${prof} : « ${affiche} » au lieu de ${attendu == null ? '–' : attendu + ' €'}`, { page: '/rendez-vous', taille: '390×844' });
    }
    await page.goto(BASE + '/sophrologie?domaine=sante', { waitUntil: 'load' });
    await attendrePret(page);
    const n = await page.evaluate(() => document.querySelectorAll('.domaine:not(.cache)').length);
    if (n !== 4) R.echec('filtres', `filtre « Corps et santé » depuis l’adresse : ${n} domaines au lieu de 4`, { page: '/sophrologie', taille: '390×844' });
    await page.locator('[data-filtre="tous"]').click();
    await attendre(600);
    const tous = await page.evaluate(() => document.querySelectorAll('.domaine:not(.cache)').length);
    if (tous !== 11) R.echec('filtres', `filtre « Tous » : ${tous} domaines au lieu de 11`, { page: '/sophrologie', taille: '390×844' });
  } finally { await ctx.close(); }
}
