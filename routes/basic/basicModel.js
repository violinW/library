var Logger = require('logger-romens');
var logger = new Logger();
var knex = require('knex')({client: "mysql"});
var _ = require('lodash');

module.exports = (dbName, tableName, extMethods)=> {
    const basicMethods = {
        /**
         * 获取简单列表
         * @param fieldFilter 字段筛选条件 例：{"sex": "male", "age": "18"}
         * @param keywords 关键字
         * @param keywordsField 关键字匹配字段
         * @param pagesize 单页数据条数
         * @param page 当前查询页码
         * @param orderby 排序字段
         * @param orderDesc 排序规则 desc或者asc
         * @returns {*} knex promise
         */
        getSimpleList(fieldFilter, keywords, keywordsField, pagesize, page, orderby, orderDesc){
            logger.enter("BASIC EVENT: get simple list data." +
                "\ntip: with this method, you can get a list that meets the filter criteria." +
                "\n     but you can not associate foreign key relationships.");

            return knex.withSchema(dbName)
                .table(tableName)
                .select("*")
                .where(fieldFilter)
                .andWhere(keywords ? {[keywordsField]: keywords} : {})
                .orderBy(orderby || 'S.updatedOn', orderDesc || 'desc')
                .limit(pagesize)
                .offset((page - 1) * pagesize)
                .debug()
        },
        /**
         * 获取简单详情
         * @param conditionField 条件字段(必须是具有唯一性的字段)
         * @param value 条件值
         * @returns {*} knex promise
         */
        getSimpleDetail(conditionField, value){
            logger.enter("BASIC EVENT: get simple detail data." +
                "\ntip:with this method, you can get simple detail data by condition." +
                "n     but you can not associate foreign key relationships.");

            return knex.withSchema(dbName)
                .table(tableName)
                .select("*")
                .where(conditionField, value)
                .debug()
        },
        /**
         * 获取某字段的值
         * @param conditionField 条件字段(必须是具有唯一性的字段)
         * @param value 条件值
         * @param queryField 查询字段
         * @returns {*}  knex promise
         */
        getFieldValue(conditionField, value, queryField){
            logger.enter("BASIC EVENT: get field value data." +
                "\ntip:with this method, you can get a field value by condition.");

            return knex.withSchema(dbName)
                .table(tableName)
                .select(queryField)
                .where(conditionField, value)
                .debug()
        },
        /**
         * 插入单条数据
         * @param data 数据
         * @param trx 事务对象
         * @returns {*}  knex promise
         */
        addData(data, trx){
            console.log("BASIC EVENT: add data.TABLE:" + tableName +
                "\ntip:with this method, you can add a data to the table.");

            //如果事务对象不为空，则采用事务模式
            if (trx) {
                return trx.withSchema(dbName)
                    .table(tableName)
                    .insert(data)
                    .debug()
            } else {
                return knex.withSchema(dbName)
                    .table(tableName)
                    .insert(data)
                    .debug()
            }
        },
        /**
         * 更新单条数据
         * @param data 更新的数据
         * @param conditionField 条件字段(必须是具有唯一性的字段)
         * @param value 条件值
         * @returns {*}  knex promise
         */
        updateData(data, conditionField, value, trx){
            logger.enter("BASIC EVENT: update data." +
                "\ntip:with this method, you can update a data by condition.");

            //如果事务对象不为空，则采用事务模式
            if (trx) {
                return trx.withSchema(dbName)
                    .table(tableName)
                    .update(data)
                    .where(conditionField, value)
                    .debug()
            } else {
                return knex.withSchema(dbName)
                    .table(tableName)
                    .update(data)
                    .where(conditionField, value)
                    .debug()
            }
        },
        /**
         * 删除数据
         * @param conditionField 条件字段
         * @param value 条件值
         * @returns {*}  knex promise
         */
        deleteData(conditionField, value, trx){
            logger.enter("BASIC EVENT: delete data." +
                "\ntip:with this method, you can delete data by condition.");

            //如果事务对象不为空，则采用事务模式
            if (trx) {
                return trx.withSchema(dbName)
                    .table(tableName)
                    .where(conditionField, value)
                    .del()
                    .debug()
            } else {
                return knex.withSchema(dbName)
                    .table(tableName)
                    .where(conditionField, value)
                    .del()
                    .debug()
            }
        }
    };
    return _.assign({}, basicMethods, extMethods);
};