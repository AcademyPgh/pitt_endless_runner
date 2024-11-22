const url = "https://pitt-game-web.vercel.app/api/scores"
class ScoreProvider {
    private nonce: string
    private startTime: EpochTimeStamp

    async openSession()
    {
        const response = await fetch(url, {method: "PUT"})
        const parsed = await response.json() as PutResponse
        this.nonce = parsed.nonce
        this.startTime = Date.now()
    }

    async submitScore(score: number){
        let gameEnd = Date.now()
        let request: ScoreRequest = {nonce: this.nonce, name: "test", score, gameStart: this.startTime, gameEnd}
        await fetch(url, {method: "POST", body: JSON.stringify(request)})
    }

    async getHighScores(){
        const response = await fetch(url, {method: "GET"})
        const json = await response.json()
        let output = json as LeaderboardEntry[]
        return output
    }

}

interface PutResponse{
    nonce: string
}

interface ScoreRequest{
    nonce: string,
    name: string,
    score: number,
    gameStart: EpochTimeStamp,
    gameEnd: EpochTimeStamp
}

export interface LeaderboardEntry{
    id: number,
    name: string,
    score: number
}

export const scoreProvider = new ScoreProvider