import * as readline from "readline";

export function resoudreNReines(taille: number): string[][] {
    const solutions: string[][] = [];
    const positions: number[] = new Array(taille).fill(-1);
    const colonnes = new Set<number>();
    const diagonalesPrincipales = new Set<number>(); // Calcul par (ligne - colonne)
    const diagonalesSecondaires = new Set<number>();  // Calcul par (ligne + colonne)

    function placerReinesSurLigne(ligne: number): void {
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
        for (let colonne = 0; colonne < taille; colonne++) {
            if (
                colonnes.has(colonne) ||
                diagonalesPrincipales.has(ligne - colonne) ||
                diagonalesSecondaires.has(ligne + colonne)
            ) {
                continue;
            }
            positions[ligne] = colonne;
            colonnes.add(colonne);
            diagonalesPrincipales.add(ligne - colonne);
            diagonalesSecondaires.add(ligne + colonne);

            placerReinesSurLigne(ligne + 1);

            positions[ligne] = -1;
            colonnes.delete(colonne);
            diagonalesPrincipales.delete(ligne - colonne);
            diagonalesSecondaires.delete(ligne + colonne);
        }
    }

    placerReinesSurLigne(0);
    return solutions;
}

// Saisie utilisateur via la console
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
