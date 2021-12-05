import { container } from 'tsyringe'
import AppDatabase from '../../appDatabase'
import { SqlConst } from '../../sqlConst'
import { RowDataPacket } from 'mysql2'

export default class Ranking {

    /**
     * TOP画面 総合ランキングのデータを取得します。
     */
    async findTotalRankingTop() {
        const db = this.getDatabase()
        const rowData = await db.select(SqlConst.FIND_TOTAL_RANKING_TOP) as RowDataPacket
        console.log(rowData)
    }

    /**
     * TOP画面 各大ジャンルランキングのデータを取得します。
     *
     * @param bigGenreId 大ジャンルID
     */
    async findGenreRankingTop(bigGenreId: string) {
        const db = this.getDatabase()
        const rowData = await db.select(SqlConst.FIND_GENRE_RANKING_TOP, [bigGenreId]) as RowDataPacket
        console.log(rowData)
    }

    /**
     * ランキング画面 各大ジャンルランキングのデータを取得します。
     *
     * @param bigGenreId 大ジャンルID
     */
    async findBigGenreRanking(bigGenreId: string) {
        const db = this.getDatabase()
        const rowData = await db.select(SqlConst.FIND_BIG_GENRE_RANKING, [bigGenreId]) as RowDataPacket
        console.log(rowData)
    }

    /**
     * ランキング画面 各ジャンルランキングのデータを取得します。
     * 
     * @param genreId ジャンルID
     */
    async findGenreRanking(genreId: string) {
        const db = this.getDatabase()
        const rowData = await db.select(SqlConst.FIND_GENRE_RANKING, [genreId]) as RowDataPacket
        console.log(rowData)
    }

    private getDatabase(): AppDatabase {
        return container.resolve(SqlConst.DB_NAME)
    }
}
