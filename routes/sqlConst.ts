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
            a.big_genre_id,
            b.author_name,
            c.global_point,
            d.genre_name
        FROM
            trn_novel_base a
            LEFT JOIN
                trn_novel_author_base b ON a.author_id = b.author_id
            LEFT JOIN
                trn_novel_evanluation c ON a.ncode = c.ncode
            LEFT JOIN
                mst_genre d ON a.genre_id = d.genre_id`

    /** TOP画面 総合ランキング */
    export const FIND_TOTAL_RANKING_TOP_NCODE = mysql.format(
        `SELECT
            ncode
        FROM
            trn_novel_evanluation
        ORDER BY
            global_point DESC
        LIMIT 5`
    )

    /** TOP画面 各ジャンルランキング 大ジャンルIDを付与して使用する */
    export const FIND_GENRE_RANKING_TOP_NCODE = mysql.format(
        `SELECT
            a.ncode
        FROM
            trn_novel_base a,
            trn_novel_evanluation b
        WHERE
            a.ncode = b.ncode
            AND a.big_genre_id = ?
            AND b.global_point > 50000
        ORDER BY
            b.global_point DESC
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

    /** ncodeをもとにデータを取得 */
    export const FIND_RANKING_TOP_BY_NCODE = mysql.format(
        `${FIND_RANKING} WHERE a.ncode in (?) ORDER BY c.global_point DESC`
    )

    /** 作者一覧画面 */
    export const FIND_AUTHOR =
        `SELECT
            DISTINCT
            author_id,
            author_name
        FROM
            trn_novel_author_base`

    /** 作者一覧画面 ページネーション件数 */
    export const FIND_AUTHOR_PAGENATION_COUNT =
    `SELECT
        COUNT(*)
    FROM
        trn_novel_author_base`

    /** 作者一覧画面 キーワード(param)を置換して使用すること */
    export const SQL_WHERE_AUTHOR_FROM_FREE_WORD =
        ` WHERE
            (author_id LIKE '%param%'
            OR author_name LIKE '%param%'
            OR author_name_ruby LIKE '%param%')`

    /** 作者一覧画面 追加条件 キーワード(param)を置換して使用すること */
    export const SQL_ADD_AUTHOR_FROM_FREE_WORD =
        ` AND
            (author_id LIKE '%param%'
            OR author_name LIKE '%param%'
            OR author_name_ruby LIKE '%param%')`

    /** 作品一覧画面 */
    export const FIND_NOVEL =
        `SELECT
            a.ncode,
            a.title,
            b.author_name,
            c.genre_name
        FROM
            trn_novel_base a
            LEFT JOIN
                trn_novel_author_base b
                    ON a.author_id = b.author_id
            LEFT JOIN
                mst_genre c
                    ON a.genre_id = c.genre_id`

    /** 作品一覧画面 追加条件 フリーワード キーワード(freeWord)を置換して使用すること */
    export const SQL_WHERE_NOVEL_FROM_FREE_WORD = ` a.title LIKE '%freeWord%'`
    /** 作品一覧画面 追加条件 ジャンルID キーワード(genreId)を置換して使用すること */
    export const SQL_WHERE_NOVEL_FROM_GENRE_ID = ` a.genre_id = genreId`
    /** 作品一覧画面 追加条件 小説タイプ キーワード(novelType)を置換して使用すること */
    export const SQL_WHERE_NOVEL_FROM_NOVEL_TYPE = ` a.novel_type = novelType`
    /** 作品一覧画面 追加条件 完結フラグ キーワード(isCompleted)を置換して使用すること */
    export const SQL_WHERE_NOVEL_FROM_COMPLETION = ` a.completion_flg = isCompleted`
    /** 作品一覧画面 追加条件 R15フラグ */
    export const SQL_WHERE_NOVEL_FROM_R15 = ` a.r15_flg = '1'`
    /** 作品一覧画面 追加条件 ボーイズラブフラグ */
    export const SQL_WHERE_NOVEL_FROM_BOYS_LOVE = ` a.boys_love_flg = '1'`
    /** 作品一覧画面 追加条件 ガールズラブフラグ */
    export const SQL_WHERE_NOVEL_FROM_GIRLS_LOVE = ` a.girls_love_flg = '1'`
    /** 作品一覧画面 追加条件 残虐フラグ */
    export const SQL_WHERE_NOVEL_FROM_CRUELTY = ` a.cruelty_flg = '1'`
    /** 作品一覧画面 追加条件 異世界転生フラグ */
    export const SQL_WHERE_NOVEL_FROM_REINCARNATION = ` a.reincarnation_flg = '1'`
    /** 作品一覧画面 追加条件 異世界転移フラグ */
    export const SQL_WHERE_NOVEL_FROM_METASTASIS = ` a.metastasis_flg = '1'`

    export const FIND_KEYWORD_RANKING =
    `SELECT
        keyword
        , COUNT(keyword) AS cnt 
    FROM
        ( 
            ( 
                SELECT
                    keyword_1 AS keyword 
                FROM
                    trn_novel_keyword 
                WHERE
                    keyword_1 IS NOT NULL 
                    OR keyword_1 != ''
            ) 
            UNION ALL ( 
                SELECT
                    keyword_2 AS keyword 
                FROM
                    trn_novel_keyword 
                WHERE
                    keyword_2 IS NOT NULL 
                    OR keyword_2 != ''
            ) 
            UNION ALL ( 
                SELECT
                    keyword_3 AS keyword 
                FROM
                    trn_novel_keyword 
                WHERE
                    keyword_3 IS NOT NULL 
                    OR keyword_3 != ''
            ) 
            UNION ALL ( 
                SELECT
                    keyword_4 AS keyword 
                FROM
                    trn_novel_keyword 
                WHERE
                    keyword_4 IS NOT NULL 
                    OR keyword_4 != ''
            ) 
            UNION ALL ( 
                SELECT
                    keyword_5 AS keyword 
                FROM
                    trn_novel_keyword 
                WHERE
                    keyword_5 IS NOT NULL 
                    OR keyword_5 != ''
            ) 
            UNION ALL ( 
                SELECT
                    keyword_6 AS keyword 
                FROM
                    trn_novel_keyword 
                WHERE
                    keyword_6 IS NOT NULL 
                    OR keyword_6 != ''
            ) 
            UNION ALL ( 
                SELECT
                    keyword_7 AS keyword 
                FROM
                    trn_novel_keyword 
                WHERE
                    keyword_7 IS NOT NULL 
                    OR keyword_7 != ''
            ) 
            UNION ALL ( 
                SELECT
                    keyword_8 AS keyword 
                FROM
                    trn_novel_keyword 
                WHERE
                    keyword_8 IS NOT NULL 
                    OR keyword_8 != ''
            ) 
            UNION ALL ( 
                SELECT
                    keyword_9 AS keyword 
                FROM
                    trn_novel_keyword 
                WHERE
                    keyword_9 IS NOT NULL 
                    OR keyword_9 != ''
            ) 
            UNION ALL ( 
                SELECT
                    keyword_10 AS keyword 
                FROM
                    trn_novel_keyword 
                WHERE
                    keyword_10 IS NOT NULL 
                    OR keyword_10 != ''
            ) 
            UNION ALL ( 
                SELECT
                    keyword_11 AS keyword 
                FROM
                    trn_novel_keyword 
                WHERE
                    keyword_11 IS NOT NULL 
                    OR keyword_11 != ''
            ) 
            UNION ALL ( 
                SELECT
                    keyword_12 AS keyword 
                FROM
                    trn_novel_keyword 
                WHERE
                    keyword_12 IS NOT NULL 
                    OR keyword_12 != ''
            ) 
            UNION ALL ( 
                SELECT
                    keyword_13 AS keyword 
                FROM
                    trn_novel_keyword 
                WHERE
                    keyword_13 IS NOT NULL 
                    OR keyword_13 != ''
            ) 
            UNION ALL ( 
                SELECT
                    keyword_14 AS keyword 
                FROM
                    trn_novel_keyword 
                WHERE
                    keyword_14 IS NOT NULL 
                    OR keyword_14 != ''
            ) 
            UNION ALL ( 
                SELECT
                    keyword_15 AS keyword 
                FROM
                    trn_novel_keyword 
                WHERE
                    keyword_15 IS NOT NULL 
                    OR keyword_15 != ''
            )
        ) AS tmp_table_1 
    GROUP BY
        keyword 
    ORDER BY
        cnt DESC 
    LIMIT
        100`
}

