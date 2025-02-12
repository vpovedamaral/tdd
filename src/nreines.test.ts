import { resoudreNReines } from './nreines';


function estPlateauValide(plateau: string[]): boolean {
    const n = plateau.length;
    const positionsReines: number[] = [];

    for (let i = 0; i < n; i++) {
        const ligne = plateau[i];
        if (ligne.length !== n) return false;
        const indices: number[] = [];
        for (let j = 0; j < n; j++) {
            if (ligne[j] === '#') {
                indices.push(j);
            }
        }
        if (indices.length !== 1) return false;
        positionsReines.push(indices[0]);
    }

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (positionsReines[i] === positionsReines[j]) return false;
            if (Math.abs(positionsReines[i] - positionsReines[j]) === Math.abs(i - j)) return false;
        }
    }
    return true;
}

describe('resoudreNReines', () => {
    test('n = 1 doit retourner une solution unique', () => {
        const solutions = resoudreNReines(1);
        expect(solutions.length).toBe(1);
        expect(solutions[0]).toEqual(['#']);
        expect(estPlateauValide(solutions[0])).toBe(true);
    });
    test('n = 2 ne doit retourner aucune solution', () => {
        const solutions = resoudreNReines(2);
        expect(solutions).toEqual([]);
    });
    test('n = 3 ne doit retourner aucune solution', () => {
        const solutions = resoudreNReines(3);
        expect(solutions).toEqual([]);
    });
});
