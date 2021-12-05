import { RowDataPacket } from "mysql2"
import AppDatabase from "../../appDatabase"
import { container } from "tsyringe"
import { SqlConst } from "../../sqlConst"
import * as mysql from 'mysql2'

export default class Novel {
    private addAnd = false

    /**
     * 作品一覧画面 作品のデータを取得します。
     *
     * @param freeWords 検索用フリーワード
     * @param genreId ジャンルID
     * @param novelTypes 小説タイプ
     * @param requiredKeywords 登録必須キーワード
     * @param offset 開始位置
     * @param limit 取得数
     */
    async findNovelFromSearch(
        freeWords: string[] = [],
        genreId = "",
        novelTypes: NovelType[] = [],
        requiredKeywords: RequiredKeyword[] = [],
        offset: number = 0,
        limit: number = 30
    ) {
        let where = ""
        if (freeWords.length != 0 || genreId != "" || novelTypes.length != 0 || requiredKeywords.length != 0) {
            where = " WHERE "
            where += this.makeSqlFromFreeWord(freeWords)
            where += this.makeSqlFromGenreId(genreId)
            where += this.makeSqlFromNovelType(novelTypes)
            where += this.makeSqlFromRequiredKeyword(requiredKeywords)
        }

        const sqlOrder = SqlConst.SQL_ORDER_ASC.replace("?", "ncode")
        const sqlLimit = SqlConst.SQL_LIMIT.replace("?", `${limit}`)
        const sqlOffset = SqlConst.SQL_OFFSET.replace("?", `${offset}`)
        const db = this.getDatabase()
        const sql = `${SqlConst.FIND_NOVEL}${where}${sqlOrder}${sqlLimit}${sqlOffset}`
        console.log(sql)
        const rowData = await db.select(mysql.format(sql)) as RowDataPacket
        console.log(rowData)
    }

    private makeSqlFromFreeWord(freeWords: string[]): string {
        const setFreeWords = new Set(freeWords)
        let sqlFreeWord = ""
        for (const freeWord of setFreeWords) {
            if (sqlFreeWord.length != 0) sqlFreeWord += " AND "
            sqlFreeWord += SqlConst.SQL_WHERE_NOVEL_FROM_FREE_WORD.replace("freeWord", freeWord)
        }
        this.addAnd = sqlFreeWord.length != 0
        return sqlFreeWord
    }

    private makeSqlFromGenreId(genreId: string): string {
        if (genreId === "") return ""
        let sqlGenreId = ""
        if (this.addAnd) {
            sqlGenreId = " AND "
        }
        sqlGenreId += SqlConst.SQL_WHERE_NOVEL_FROM_GENRE_ID.replace("genreId", genreId)
        this.addAnd = true
        return sqlGenreId
    }

    private makeSqlFromNovelType(novelTypes: NovelType[]): string {
        if (novelTypes.length === 0) return ""
        let sqlNovelType = ""
        for (const novelType of novelTypes) {
            switch (novelType) {
                case NovelType.SERIAL:
                    if (this.addAnd) sqlNovelType += " AND "
                    sqlNovelType += SqlConst.SQL_WHERE_NOVEL_FROM_NOVEL_TYPE.replace("novelType", "1")
                    break
                case NovelType.SHORT:
                    if (this.addAnd) sqlNovelType += " AND "
                    sqlNovelType += SqlConst.SQL_WHERE_NOVEL_FROM_NOVEL_TYPE.replace("novelType", "2")
                    if (this.addAnd) sqlNovelType += " AND "
                    sqlNovelType += SqlConst.SQL_WHERE_NOVEL_FROM_COMPLETION.replace("isCompleted", "0")
                    break
                case NovelType.COMPLETE:
                    if (this.addAnd) sqlNovelType += " AND "
                    sqlNovelType += SqlConst.SQL_WHERE_NOVEL_FROM_COMPLETION.replace("isCompleted", "0")
                    break
                case NovelType.SERIALIZED:
                    if (this.addAnd) sqlNovelType += " AND "
                    sqlNovelType += SqlConst.SQL_WHERE_NOVEL_FROM_NOVEL_TYPE.replace("novelType", "1")
                    if (this.addAnd) sqlNovelType += " AND "
                    sqlNovelType += SqlConst.SQL_WHERE_NOVEL_FROM_COMPLETION.replace("isCompleted", "1")
                    break
                default:
                    // ここには来ないはず
                    break
            }
            this.addAnd = true
        }

        return sqlNovelType
    }

    private makeSqlFromRequiredKeyword(requiredKeywords: RequiredKeyword[]): string {
        if (requiredKeywords.length === 0) return ""
        let sqlRequiredKeyword = ""
        for (const keyword of requiredKeywords) {
            switch (keyword) {
                case RequiredKeyword.R15:
                    if (this.addAnd) sqlRequiredKeyword += " AND "
                    sqlRequiredKeyword += SqlConst.SQL_WHERE_NOVEL_FROM_R15
                    break
                case RequiredKeyword.BOYS_LOVE:
                    if (this.addAnd) sqlRequiredKeyword += " AND "
                    sqlRequiredKeyword += SqlConst.SQL_WHERE_NOVEL_FROM_BOYS_LOVE
                    break
                case RequiredKeyword.GIRLS_LOVE:
                    if (this.addAnd) sqlRequiredKeyword += " AND "
                    sqlRequiredKeyword += SqlConst.SQL_WHERE_NOVEL_FROM_GIRLS_LOVE
                    break
                case RequiredKeyword.CRUEL:
                    if (this.addAnd) sqlRequiredKeyword += " AND "
                    sqlRequiredKeyword += SqlConst.SQL_WHERE_NOVEL_FROM_CRUELTY
                    break
                case RequiredKeyword.REINCARNATE:
                    if (this.addAnd) sqlRequiredKeyword += " AND "
                    sqlRequiredKeyword += SqlConst.SQL_WHERE_NOVEL_FROM_REINCARNATION
                    break
                case RequiredKeyword.METASTASIS:
                    if (this.addAnd) sqlRequiredKeyword += " AND "
                    sqlRequiredKeyword += SqlConst.SQL_WHERE_NOVEL_FROM_METASTASIS
                    break
                default:
                    // ここには来ないはず
                    break
            }
            this.addAnd = true
        }
        return sqlRequiredKeyword
    }

    private getDatabase(): AppDatabase {
        return container.resolve(SqlConst.DB_NAME)
    }
}
