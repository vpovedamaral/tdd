export function resoudreNReines(taille: number): string[][] {
    const solutions: string[][] = [];
    const positions: number[] = new Array(taille).fill(-1);

    function placerReinesSurLigne(ligne: number): void {
        if (ligne === taille) {
            // @ts-ignore
            solutions.push([...positions]);
            return;
        }
        for (let colonne = 0; colonne < taille; colonne++) {
            positions[ligne] = colonne;
            placerReinesSurLigne(ligne + 1);
        }
    }

    placerReinesSurLigne(0);
    return solutions;
}
