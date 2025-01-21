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

interface InteriorCounts extends BuildingCounts {
  styles: {
    intStart: number;
    intMid: number;
    intEnd: number;
  }[];
}

interface InteriorArrays extends BuildingArrays {
  styles: {
    intStarts: string[];
    intMids: string[];
    intEnds: string[];
  }[];
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

function generateInteriorArrays(basePath: string, counts: InteriorCounts): InteriorArrays {
    const generatePaths = (prefix: string, count: number): string[] => {
        return Array.from({ length: count }, (_, i) => 
            `${basePath}/${prefix}_${String.fromCharCode(65 + i)}.png`
        );
    };

    const generateInteriorPaths = (prefix: string, count: number, style: number): string[] => {
        return Array.from({ length: count }, (_, i) => 
            `${basePath}/${prefix}_${String.fromCharCode(65 + i)}_${style}.png`
        );
    }

    const styles = counts.styles.map((style, index) => {
      return {
        intStarts: generateInteriorPaths('IntStart', style.intStart, index + 1),
        intMids: generateInteriorPaths('IntMid', style.intMid, index + 1),
        intEnds: generateInteriorPaths('IntEnd', style.intEnd, index+ 1)      
      }
    });

    return {
        topStarts: generatePaths('TopStart', counts.topStart),
        botStarts: generatePaths('BotStart', counts.botStart),
        topMids: generatePaths('TopMid', counts.topMid),
        botMids: generatePaths('BotMid', counts.botMid),
        topEnds: generatePaths('TopEnd', counts.topEnd),
        botEnds: generatePaths('BotEnd', counts.botEnd),
        styles: styles
    };
}

export { generateBuildingArrays, generateInteriorArrays };
export type { BuildingCounts, BuildingArrays, InteriorCounts, InteriorArrays };