// @ts-ignore
import { genererConfigurations4DamesAttaqueUnique } from './singleAttackQueens';

describe("genererConfigurations4DamesAttaqueUnique", () => {
    const taillePlateau = 4;
    let configurations: string[][][];

    beforeAll(() => {
        configurations = genererConfigurations4DamesAttaqueUnique(taillePlateau);
    });

    test("devrait générer au moins une configuration", () => {
        expect(configurations.length).toBeGreaterThan(0);
    });

    test("chaque configuration devrait comporter 'taillePlateau' lignes", () => {
        configurations.forEach(configuration => {
            expect(configuration.length).toEqual(taillePlateau);
        });
    });


    test("chaque dame devrait attaquer exactement une autre dame", () => {
        // Les 8 directions possibles
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

        configurations.forEach(configuration => {
            for (let i = 0; i < taillePlateau; i++) {
                for (let j = 0; j < taillePlateau; j++) {
                    if (configuration[i][j] === '#') {
                        let compteurAttaques = 0;
                        // Pour chaque direction, on parcourt la ligne de vue
                        directions.forEach(([di, dj]) => {
                            let x = i + di;
                            let y = j + dj;
                            while (x >= 0 && x < taillePlateau && y >= 0 && y < taillePlateau) {
                                if (configuration[x][y] === '#') {
                                    compteurAttaques++;
                                }
                                x += di;
                                y += dj;
                            }
                        });
                        expect(compteurAttaques).toEqual(1);
                    }
                }
            }
        });
    });
});
