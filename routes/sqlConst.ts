import * as mysql from 'mysql2'

export namespace SqlConst {
    export const DB_NAME = "new_naroken"

    /** 降順用パーツ */
    export const SQL_ORDER_DESC = ` ORDER BY ? DESC `
    /** 昇順用パーツ */
    export const SQL_ORDER_ASC = ` ORDER BY ? ASC `
    /** オフセットパーツ */
    export const SQL_OFFSET = ` OFFSET ? `
    /** リミットパーツ */
    export const SQL_LIMIT = ` LIMIT ? `

    const FIND_RANKING = 
        `SELECT
            a.ncode,
            a.title,
            -- b.author_name,
            c.global_point,
            d.genre_name
        FROM
            trn_novel_base a
            -- LEFT JOIN
            --     trn_novel_author_base b ON a.author_id = b.author_id
            LEFT JOIN
                trn_novel_evanluation c ON a.ncode = c.ncode
            LEFT JOIN
                mst_genre d ON a.genre_id = d.genre_id`

    /** TOP画面 総合ランキング */
    export const FIND_TOTAL_RANKING_TOP = mysql.format(
        `${FIND_RANKING} WHERE c.global_point > 500000
        ORDER BY c.global_point DESC
        LIMIT 5`
    )

    /** TOP画面 各ジャンルランキング 大ジャンルIDを付与して使用する */
    export const FIND_GENRE_RANKING_TOP = mysql.format(
        `${FIND_RANKING} WHERE a.big_genre_id = ?
        ORDER BY c.global_point DESC
        LIMIT 3`
    )

    /** ランキング画面 大ジャンルランキング 大ジャンルIDを付与して使用する */
    export const FIND_BIG_GENRE_RANKING = mysql.format(
        `${FIND_RANKING} WHERE a.big_genre_id = ?
        ORDER BY c.global_point DESC
        LIMIT 30`
    )

    /** ランキング画面 ジャンルランキング ジャンルIDを付与して使用する */
    export const FIND_GENRE_RANKING = mysql.format(
        `${FIND_RANKING} WHERE a.genre_id = ?
        ORDER BY c.global_point DESC
        LIMIT 30`
    )

    /** 作者一覧画面 */
    export const FIND_AUTHOR =
        `SELECT
            DISTINCT
            author_id,
            author_name
        FROM
            trn_novel_author_base`

    /** 作者一覧画面 キーワード(param)を置換して使用すること */
    export const SQL_WHERE_AUTHOR_FROM_KEYWORD =
        ` WHERE
            (author_id LIKE '%param%'
            OR author_name LIKE '%param%'
            OR author_name_ruby LIKE '%param%')`

   /** 作者一覧画面 追加条件 キーワード(param)を置換して使用すること */
    export const SQL_ADD_AUTHOR_FROM_KEYWORD =
        ` AND
            (author_id LIKE '%param%'
            OR author_name LIKE '%param%'
            OR author_name_ruby LIKE '%param%')`
}

