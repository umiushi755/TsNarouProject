import { container } from 'tsyringe'
import AppDatabase from '../../appDatabase'
import { SqlConst } from '../../sqlConst'
import { RowDataPacket } from 'mysql2'
import * as mysql from 'mysql2/promise'

export default class Ranking {

    /**
     * TOP画面 ランキングのデータを全て取得します。
     */
    async findRankingTopAll() {
        const db = this.getDatabase()
        const sqls = [mysql.format(SqlConst.FIND_TOTAL_RANKING_TOP_NCODE)]
        for (const genre in this.bigGenre) {
            const sql = SqlConst.FIND_GENRE_RANKING_TOP_NCODE.replace("?", genre)
            sqls.push(sql)
        }
        const rowData = await db.selectAllForSqls(sqls) as RowDataPacket[][]
        var findSqls: string[] = []
        for (const rowIndex in rowData) {
            rowData[rowIndex]
            var ncode = ""
            for (const dataIndex in rowData[rowIndex]) {
                ncode += "\"" + rowData[rowIndex][dataIndex].ncode + "\","
            }
            ncode = ncode.slice(0, -1)
            findSqls.push(SqlConst.FIND_RANKING_TOP_BY_NCODE.replace("?", ncode))
        }
        return await db.selectAllForSqls(findSqls)
    }

    /**
     * ランキング画面 各大ジャンルランキングのデータを取得します。
     *
     * @param bigGenreId 大ジャンルID
     */
    async findBigGenreRanking(bigGenreId: string) {
        const db = this.getDatabase()
        return await db.select(SqlConst.FIND_BIG_GENRE_RANKING, [bigGenreId])
    }

    /**
     * ランキング画面 各ジャンルランキングのデータを取得します。
     * 
     * @param genreId ジャンルID
     */
    async findGenreRanking(genreId: string) {
        const db = this.getDatabase()
        return await db.select(SqlConst.FIND_GENRE_RANKING, [genreId])
    }

    private getDatabase(): AppDatabase {
        return container.resolve(SqlConst.DB_NAME)
    }

    private bigGenre = {
        /** 恋愛 */
        1: "LOVE",
        /** ファンタジー */
        2: "FANTASY",
        /** 文芸 */
        3: "LITETURE",
        /** SF */
        4: "SCIENCE_FICTION",
        /** ノンジャンル */
        98: "NON_GENRE",
        /** その他 */
        99: "OTHER",
    }
}
