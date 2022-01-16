import 'reflect-metadata'
import * as mysql from 'mysql2/promise'

export default class AppDatabase {

    /**
     * SQLを使用して、データベースからデータを取得
     * 
     * @param sql 使用するSQL
     * @param params SQLで使用するパラメータ(無くてもOK)
     * @returns SQLに応じたデータをJSON形式で返却
     */
    async select(sql: string, params: string[] = []) {
        const pool = await mysql.createPool(dbConfig)
        console.log("database open")
        try {
            const [row, field] = await pool.execute(sql, params)
            return row
        } catch (error) {
            // TODO: DB固有のExceptionをthrowする？
            console.log(error)
        } finally {
            console.log("database close")
            pool.end()
        }
    }

    /**
     * 複数のSQLを使用して、データベースからデータを取得
     * 
     * @param sqls 使用する複数のSQL
     * @returns SQLに応じたデータをJSON形式で返却
     */
    async selectAllForSqls(sqls: string[] = []) {
        const pool = await mysql.createPool(dbConfig)
        console.log("database open")
        try {
            var data: mysql.RowDataPacket[][] = []
            for (const sql in sqls) {
                const [row, field] = await pool.execute(sql)
                data.push(row as mysql.RowDataPacket[])
            }
            return data
        } catch (error) {
            // TODO: DB固有のExceptionをthrowする？
            console.log(error)
        } finally {
            console.log("database close")
            pool.end()
        }
    }
}

interface DbConfig {
    host: string;
    user: string;
    password: string;
    database: string;
}

// TODO: 環境変数を見るように変更する？
const dbConfig: DbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'siina1987',
    database: 'new_naroken'
}
