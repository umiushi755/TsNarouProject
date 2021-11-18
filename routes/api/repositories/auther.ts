import { container } from 'tsyringe'
import AppDatabase from '../../appDatabase'
import { SqlConst } from '../../sqlConst'
import { RowDataPacket } from 'mysql2'
import * as mysql from 'mysql2'

export default class Auther {

    /**
     * 作者一覧画面 作者のデータを取得します。
     * @param keywords 
     * @param offset 
     * @param limit 
     */
    async findAutherFromKeyword(params: string[] = [], offset: number = 0, limit: number = 40) {
        const db = this.getDatabase()
        const rowData = await db.select(this.makeSqlFindAutherFromKeyword(params, offset, limit)) as RowDataPacket
        console.log(rowData)
    }

    private makeSqlFindAutherFromKeyword(params: string[], offset: number, limit: number): string {
        const setParam = new Set(params)
        let paramReplaced = ""
        let count = 0
        for (const param of setParam) {
            if (count == 0) {
                paramReplaced = SqlConst.SQL_WHERE_AUTHER_FROM_KEYWORD.replace(/param/g, param)
            } else {
                paramReplaced = paramReplaced + SqlConst.SQL_ADD_AUTHER_FROM_KEYWORD.replace(/param/g, param)
            }
            count++
        }
        
        const sqlOrderAsc = SqlConst.SQL_ORDER_ASC.replace("?", "auther_id")
        const sqlOffset = SqlConst.SQL_OFFSET.replace("?", `${offset}`)
        const sqlLimit = SqlConst.SQL_LIMIT.replace("?", `${limit}`)
        console.log(mysql.format(`${SqlConst.FIND_AUTHER}${paramReplaced}${sqlOrderAsc}${sqlLimit}${sqlOffset}`))
        return mysql.format(`${SqlConst.FIND_AUTHER}${paramReplaced}${sqlOrderAsc}${sqlLimit}${sqlOffset}`)
    }

    private getDatabase(): AppDatabase {
        return container.resolve(SqlConst.DB_NAME)
    }
}
