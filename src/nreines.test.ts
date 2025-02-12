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
    test('n = 4 doit retourner 2 solutions valides', () => {
        const solutions = resoudreNReines(4);
        expect(solutions.length).toBe(2);
        solutions.forEach(plateau => {
            expect(plateau.length).toBe(4);
            plateau.forEach(ligne => {
                expect(ligne.length).toBe(4);
                expect(/^[O#]+$/.test(ligne)).toBe(true);
            });
            expect(estPlateauValide(plateau)).toBe(true);
        });
    });
    test('n = 8 doit retourner 92 solutions valides', () => {
        const solutions = resoudreNReines(8);
        expect(solutions.length).toBe(92);
        solutions.forEach(plateau => {
            expect(plateau.length).toBe(8);
            plateau.forEach(ligne => {
                expect(ligne.length).toBe(8);
                expect(/^[O#]+$/.test(ligne)).toBe(true);
            });
            expect(estPlateauValide(plateau)).toBe(true);
        });
    });
    test('n = 0 doit retourner une solution unique (plateau vide)', () => {
        const solutions = resoudreNReines(0);
        // On considère qu'un plateau 0x0 possède une solution "vide"
        expect(solutions.length).toBe(1);
        expect(solutions[0]).toEqual([]);
    });

    test('Les solutions pour n = 4 doivent être uniques', () => {
        const solutions = resoudreNReines(4);
        const solutionSet = new Set(solutions.map(sol => sol.join(',')));
        expect(solutionSet.size).toBe(solutions.length);
    });
});
