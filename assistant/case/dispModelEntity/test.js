module.exports=(businessModel)=>{
    const {dataStructure, dataType} = businessModel;
    /**
     * 学生模型
     */
    dataStructure.setModel({
        name: "testStudent",
        describe: "学生测试模型",
        structure: {
            "id": {
                "type": "int",
                "describe": "璐墿杞d",
                "key": true,
                "mappingName": "id",
                "mappingType": "int",
                "defaultValue": dataType.int("1")
            },
            "name": {
                "type": "string",
                "describe": "学生名称",
                "mappingName": "StudentName",
                "mappingType": "string",
                "defaultValue": dataType.string("张三")
            },
            "age": {
                "type": "int",
                "describe": "年龄",
                "mappingName": "StudentAge",
                "mappingType": "int",
                "defaultValue": dataType.int("23")
            },
            "sex": {
                "type": "string",
                "describe": "性别",
                "mappingName": "sex",
                "mappingType": "enum|sex",
                "defaultValue": dataType.enum("sex").convertToValue('man')
            }
        }
    });

    /**
     * 班级模型
     */
    dataStructure.setModel({
        name: "testClass",
        describe: "班级测试模型",
        structure: {
            "id": {
                "type": "int",
                "describe": "璐墿杞d",
                "key": true,
                "mappingName": "id",
                "mappingType": "int",
                "defaultValue": dataType.int("1")
            },
            "name": {
                "type": "string",
                "describe": "班级名称",
                "mappingName": "ClassName",
                "mappingType": "string",
                "defaultValue": dataType.string("一年级三班")
            },
            "grade": {
                "type": "string",
                "describe": "年级",
                "mappingName": "ClassGrade",
                "mappingType": "string",
                "defaultValue": dataType.string("三年级")
            }
        }
    });

    /**
     * 课程模型
     */
    dataStructure.setModel({
        name: "testSubject",
        describe: "课程测试模型",
        structure: {
            "id": {
                "type": "int",
                "describe": "璐墿杞d",
                "key": true,
                "mappingName": "id",
                "mappingType": "int",
                "defaultValue": dataType.int("1")
            },
            "name": {
                "type": "string",
                "describe": "课程名称",
                "mappingName": "SubjectName",
                "mappingType": "string",
                "defaultValue": dataType.string("语文")
            },
            "desc": {
                "type": "string",
                "describe": "课程描述",
                "mappingName": "desc",
                "mappingType": "string",
                "defaultValue": dataType.string("这是一门必修课")
            }
        }
    });

    /**
     * 教室模型
     */
    dataStructure.setModel({
        name: "testClassroom",
        describe: "教室测试模型",
        structure: {
            "id": {
                "type": "int",
                "describe": "璐墿杞d",
                "key": true,
                "mappingName": "id",
                "mappingType": "int",
                "defaultValue": dataType.int("1")
            },
            "house_number": {
                "type": "string",
                "describe": "门牌号",
                "mappingName": "HouseNumber",
                "mappingType": "string",
                "defaultValue": dataType.string("111")
            },
            "max_student": {
                "type": "int",
                "describe": "最大学生人数",
                "mappingName": "MaxStudent",
                "mappingType": "int",
                "defaultValue": dataType.int("234")
            }
        }
    });

    /**
     * 教师模型
     */
    dataStructure.setModel({
        name: "testTeacher",
        describe: "教师测试模型",
        structure: {
            "id": {
                "type": "int",
                "describe": "璐墿杞d",
                "key": true,
                "mappingName": "id",
                "mappingType": "int",
                "defaultValue": dataType.int("1")
            },
            "name": {
                "type": "string",
                "describe": "名称",
                "mappingName": "TeacherName",
                "mappingType": "string",
                "defaultValue": dataType.string("王老师")
            },
            "desc": {
                "type": "string",
                "describe": "描述",
                "mappingName": "desc",
                "mappingType": "string",
                "defaultValue": dataType.string("优秀教师")
            }
        }
    });
}