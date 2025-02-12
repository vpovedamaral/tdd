export function genererConfigurations4DamesAttaqueUnique(taille: number): string[][][] {
    const configurations: string[][][] = [];
    const nbCases = taille * taille;

    for (let masque = 0; masque < (1 << nbCases); masque++) {
        const plateau: boolean[][] = [];
        for (let ligne = 0; ligne < taille; ligne++) {
            plateau[ligne] = [];
            for (let colonne = 0; colonne < taille; colonne++) {
                plateau[ligne][colonne] = false;
            }
        }

        let nombreDames = 0;
        for (let i = 0; i < nbCases; i++) {
            if ((masque >> i) & 1) {
                const ligne = Math.floor(i / taille);
                const colonne = i % taille;
                plateau[ligne][colonne] = true;
                nombreDames++;
            }
        }
        if (nombreDames !== 4) continue;
        const directions: [number, number][] = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1]
        ];

        let configurationValide = true;

        for (let ligne = 0; ligne < taille && configurationValide; ligne++) {
            for (let colonne = 0; colonne < taille && configurationValide; colonne++) {
                if (plateau[ligne][colonne]) {
                    let compteur = 0;

                    for (const [dLigne, dColonne] of directions) {
                        let nouvelleLigne = ligne + dLigne;
                        let nouvelleColonne = colonne + dColonne;
                        while (nouvelleLigne >= 0 && nouvelleLigne < taille && nouvelleColonne >= 0 && nouvelleColonne < taille) {
                            if (plateau[nouvelleLigne][nouvelleColonne]) {
                                compteur++;
                            }
                            nouvelleLigne += dLigne;
                            nouvelleColonne += dColonne;
                        }
                    }
                    if (compteur !== 1) {
                        configurationValide = false;
                    }
                }
            }
        }

        if (configurationValide) {
            const configuration = plateau.map(ligne => ligne.map(cellule => (cellule ? '#' : 'O')).join(''));
            // @ts-ignore
            configurations.push(configuration);
        }
    }

    return configurations;
}

const taillePlateau = 4; // Plateau de 4×4
const configurationsValides = genererConfigurations4DamesAttaqueUnique(taillePlateau);

console.log(`Total des solutions trouvées pour un plateau ${taillePlateau}x${taillePlateau} avec 4 dames : ${configurationsValides.length}\n`);

// Affichage de chaque solution
configurationsValides.forEach((configuration, index) => {
    console.log(`Solution ${index + 1} :`);
    configuration.forEach(ligne => console.log(ligne));
    console.log();
});
