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

            // retirer la reine pour explorer d'autres possibilites
            positions[ligne] = -1;
            colonnes.delete(colonne);
            diagonalesPrincipales.delete(ligne - colonne);
            diagonalesSecondaires.delete(ligne + colonne);
        }
    }

    placerReinesSurLigne(0);
    return solutions;
}
