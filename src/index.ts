import * as readline from "readline";

export function resoudreNReines(taille: number): string[][] {
    const solutions: string[][] = [];
    const positions: number[] = new Array(taille).fill(-1);
    const colonnes = new Set<number>();
    const diagonalesPrincipales = new Set<number>(); // Calcul par (ligne - colonne)
    const diagonalesSecondaires = new Set<number>();  // Calcul par (ligne + colonne)

    function placerReinesSurLigne(ligne: number): void {
        // Si toutes les lignes sont traitées,  solution complète trouvee
        if (ligne === taille) {
            const solution: string[] = [];
            for (let i = 0; i < taille; i++) {
                let ligneStr = "";
                for (let j = 0; j < taille; j++) {
                    ligneStr += positions[i] === j ? "#" : "O";
                }
                solution.push(ligneStr);
            }
            solutions.push(solution);
            return;
        }

        // Essayer de placer une reine dans chaque colonne de la ligne actuelle.
        for (let colonne = 0; colonne < taille; colonne++) {
            // Vérifier que la colonne et les diagonales ne sont pas déjà occupées.
            if (
                colonnes.has(colonne) ||
                diagonalesPrincipales.has(ligne - colonne) ||
                diagonalesSecondaires.has(ligne + colonne)
            ) {
                continue;
            }

            // Placer la reine à la position (ligne, colonne)
            positions[ligne] = colonne;
            colonnes.add(colonne);
            diagonalesPrincipales.add(ligne - colonne);
            diagonalesSecondaires.add(ligne + colonne);

            // Passer à la ligne suivante
            placerReinesSurLigne(ligne + 1);

            // Retirer la reine pour explorer d'autres configurations
            positions[ligne] = -1;
            colonnes.delete(colonne);
            diagonalesPrincipales.delete(ligne - colonne);
            diagonalesSecondaires.delete(ligne + colonne);
        }
    }

    placerReinesSurLigne(0);
    return solutions;
}

// SAisie N via la console
if (require.main === module) {
    const interfaceLecture = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    interfaceLecture.question("Entrez la valeur de N : ", (reponse) => {
        const taille = parseInt(reponse.trim(), 10);
        if (isNaN(taille) || taille <= 0) {
            console.error("Veuillez entrer un entier positif.");
            interfaceLecture.close();
            process.exit(1);
        }
        const solutions = resoudreNReines(taille);
        console.log(`Nombre total de solutions pour N = ${taille} : ${solutions.length}`);
        console.log(JSON.stringify(solutions, null, 2));
        interfaceLecture.close();
    });
}
