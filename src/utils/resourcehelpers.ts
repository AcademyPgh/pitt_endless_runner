interface BuildingCounts {
    topStart: number;
    topMid: number;
    topEnd: number;
    botStart: number;
    botMid: number;
    botEnd: number;
  }
  
interface BuildingArrays {
topStarts: string[];
botStarts: string[];
topMids: string[];
botMids: string[];
topEnds: string[];
botEnds: string[];
}

function generateBuildingArrays(basePath: string, counts: BuildingCounts): BuildingArrays {
    // Helper function to generate array of file paths
    const generatePaths = (prefix: string, count: number): string[] => {
        return Array.from({ length: count }, (_, i) => 
            `${basePath}/${prefix}_${String.fromCharCode(65 + i)}.png`
        );
    };

    return {
        topStarts: generatePaths('TopStart', counts.topStart),
        botStarts: generatePaths('BotStart', counts.botStart),
        topMids: generatePaths('TopMid', counts.topMid),
        botMids: generatePaths('BotMid', counts.botMid),
        topEnds: generatePaths('TopEnd', counts.topEnd),
        botEnds: generatePaths('BotEnd', counts.botEnd)
    };
}

export { generateBuildingArrays };
export type { BuildingCounts, BuildingArrays };