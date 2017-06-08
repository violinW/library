'use strict';
var _ = require('lodash');
var Logger = require('logger-romens');
var logger = new Logger();
var Promise = require('bluebird');
var knex = require('../conf/knexConfig');
const businessModel = require("icrm-business-model")(knex);
const basicModel= businessModel.CommonDataSource;
var commonMethod = require('../util/commonMethod');
// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = (dbName)=> {
    var StudentModel = basicModel(dbName, 'Student', {});
    var BelongingModel = basicModel(dbName, 'Belonging', {});
    var StudentCourseModel = basicModel(dbName, 'StudentCourse', {});

    return {
        //getStudentJoinList(filter, page, pageSize){
        //    logger.enter("enter getStudentJoinList");
        //
        //    let count = knex.raw('count(Belonging.StudentId) AS countBelonging,' +
        //        'count(studentCourse.StudentId) AS studentCourseCount,'.replace(/(.*)[,]$/, '$1'));
        //
        //    let column = ["Student.*", count];
        //
        //    let whereRaw = {};
        //    _.each(filter, (field, key)=> {
        //        whereRaw[`Student.${key}`] = field;
        //    });
        //
        //    return knex.withSchema(dbName)
        //        .table("Student")
        //        .select(column)
        //        .leftJoin(dbName + '.Belonging', function () {
        //            this.on('Student.Id', '=', 'Belonging.StudentId');
        //        })
        //        .leftJoin(dbName + '.studentCourse', function () {
        //            this.on('Student.Id', '=', 'studentCourse.StudentId');
        //        })
        //        .where(whereRaw)
        //        .groupBy('Id')
        //        .orderBy('Student.updatedOn', 'desc')
        //        .limit(pageSize)
        //        .offset((page - 1) * pageSize)
        //        .debug()
        //        .then(function (data) {
        //            return data;
        //        })
        //},
        //getStudentDetailById(Id){
        //    logger.enter("enter getStudentDetailById");
        //
        //    return knex.withSchema(dbName)
        //        .table("Student")
        //        .select("*")
        //        .where("Id = '" + Id + "'")
        //        .debug()
        //        .then(function (data) {
        //            //处理外键关系表
        //            return getForeignTableInfo(dbName)
        //                .then(function (res) {
        //                    //TODO:处理res
        //                    return getMappingTableInfo(dbName)
        //                        .then(function (result) {
        //                            //TODO:处理result
        //                        })
        //                })
        //        })
        //
        //},
        //getStudentSimpleDetail(fieldName, Id){
        //    logger.enter("enter getStudentSimpleDetail");
        //
        //    return StudentModel.getSimpleDetail(fieldName, Id);
        //},
        //getStudentFieldById(Id, FieldName){
        //    logger.enter("enter getStudentFieldById");
        //
        //    return knex.withSchema(dbName)
        //        .table("Student")
        //        .select(FieldName)
        //        .where("Id = '" + Id + "'")
        //        .debug()
        //        .then(function (data) {
        //            return data;
        //        })
        //},
        addStudent(req, res, next){
            console.log("enter addStudent");

            var data = req.body;
            data.Id = commonMethod.UidMaker();
            console.log(JSON.stringify(data));
            knex.transacting((trx)=> {
                    console.log("--------------------");
                    Promise.all([
                            //添加 Student 数据
                            StudentModel.addData(data, trx)
                            ////添加 Belonging 数据
                            //BelongingModel.addData(data.BelongingData, trx),
                            ////添加 studentCourse 数据
                            //StudentCourseModel.addData(data.StudentCourseModel, trx)
                        ])
                        .then(trx.commit)
                        .catch(trx.rollback);
                })
                .then(()=> {
                    console.log('操作成功')
                    var result = {
                        code: 200,
                        msg: "操作成功"
                    };
                    jsonWrite(res, result);
                })
                .catch(()=> {
                    console.log('操作失败')

                })
        },
        //putStudentById(Id, data){
        //    logger.enter("putStudentById");
        //
        //    return knex.transaction((trx)=> {
        //        Promise.all([
        //                //更新 Student 数据
        //                StudentModel.updateData(data.StudentData, "Id", Id, trx),
        //                //删除 Belonging 数据
        //                BelongingModel.deleteData('StudentId', Id, trx),
        //                //添加新 Belonging 数据
        //                BelongingModel.addData(data.BelongingData, trx),
        //                //删除 studentCourse 数据
        //                StudentCourseModel.deleteData('undefined', Id, trx),
        //                //添加新 studentCourse 数据
        //                StudentCourseModel.addData(data.StudentCourseModel, trx)
        //            ])
        //            .then(trx.commit)
        //            .catch(trx.rollback);
        //    })
        //},
        //deleteStudentById(Id){
        //    logger.enter("enter deleteStudentById");
        //
        //    return knex.transaction((trx)=>{
        //        Promise.all([
        //                //删除 Student 数据
        //                StudentModel.deleteData(Id, Id, trx),
        //                //删除 Belonging 数据
        //                BelongingModel.deleteData('StudentId', Id, trx),
        //                //删除 studentCourse 数据
        //                StudentCourseModel.deleteData('undefined', Id, trx),
        //            ])
        //            .then(trx.commit)
        //            .catch(trx.rollback);
        //    })
        //}
    }
};
var getForeignTableInfo = (dbName)=> {
//处理外键关系表
    let foreignTables = [
        {
            tableName: 'Belonging',
            ForeignTableKey: 'StudentId'
        }
    ]

    return Promise.map(foreignTables, function (foreign) {
        return knex.withSchema(dbName)
            .table(foreign['tableName'])
            .where(foreign['tableName'] + "." + foreign['ForeignTableKey'] + " = '" + Id + "'")
            .select("*")
            .debug()
            .then(function (result) {
                return {
                    key: foreign['tableName'] + "Info",
                    value: result
                }
            })
    });
};

var getMappingTableInfo = (dbName)=> {
    //处理映射关系
    let mappingTables = [
        {
            MiddleTable: 'studentCourse',    //映射关系表名
            MiddleKey: 'StudentId',      //主表对应的Id
            MappingKey: 'CourseId',      //映射表对应的Id
            MappingTable: 'Course',        //映射表名
            MappingTableKey: 'Id'      //映射表Id
        }
    ];

    return Promise.map(mappingTables, function (mapping) {
        return knex.withSchema(dbName)
            .table(mapping['MiddleTable'])
            .leftJoin(dbName + '.' + mapping['MappingTable'], function () {
                this.on(mapping['MiddleTable'] + '.' + mapping['MappingKey'], '=', mapping['MappingTable'] + '.' + mapping['MappingTableKey']);
            })
            .where(mapping['MiddleTable'] + "." + mapping['MiddleKey'] + " = '" + Id + "'")
            .select(mapping['MappingTable'] + ".*")
            .debug()
            .then(function (result) {
                return {
                    key: mapping['tableName'] + "Info",
                    value: result
                };
            })
    });
};
