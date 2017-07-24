modelList.setModel({
    name: "basicUserInfo",
    describe: "用户基础信息模型",
    structure: {
        "clientArea": {
            "type": "string",
            "describe": "客户所属区域",
            "mappingName": "clientArea",
            "mappingType": "string",
            "defaultValue": dataType.string("成都")
        },
        "reason": {
            "type": "string",
            "describe": "退回原因",
            "mappingName": "reason",
            "mappingType": "string",
            "defaultValue": dataType.string("退回原因abc")
        },
        "legalRepresentative": {
            "type": "string",
            "describe": "法人代表",
            "mappingName": "legalRepresentative",
            "mappingType": "string",
            "defaultValue": dataType.string("法人代表")
        },
        "registeredCapital": {
            "type": "string",
            "describe": "注册资本",
            "mappingName": "registeredCapital",
            "mappingType": "string",
            "defaultValue": dataType.string("注册资本")
        },
        "businessAddress": {
            "type": "string",
            "describe": "营业地址",
            "mappingName": "businessAddress",
            "mappingType": "string",
            "defaultValue": dataType.string("营业地址")
        },
        "clientName": {
            "type": "string",
            "describe": "客户名称",
            "mappingName": "clientName",
            "mappingType": "string",
            "defaultValue": dataType.string("joy")
        },
        "mobile": {
            "type": "string",
            "describe": "手机号",
            "mappingName": "mobile",
            "mappingType": "string",
            "defaultValue": dataType.string(18000000000)
        },
        "clientCode": {
            "type": "string",
            "describe": "客户编号",
            "mappingName": "clientCode",
            "mappingType": "string",
            "defaultValue": dataType.string(435473767)
        },
        "enabled": {
            "type": "enum|enabled",
            "describe": "禁用标志",
            "mappingName": "enabled",
            "mappingType": "enum|enabled",
            "defaultValue": dataType.enum("enabled").convertToValue("NEEDAPPROVAL")
        },
        "readOnly": {
            "type": "enum|readOnly",
            "describe": "停购标志",
            "mappingName": "readOnly",
            "mappingType": "enum|readOnly",
            "defaultValue": dataType.enum("readOnly").convertToValue(0)
        },
        "status": {
            "type": "string",
            "describe": "禁用停购显示字段",
            "mappingType": function (data) {
                return data.enabled + "/" + data.readOnly
            },
            "defaultValue": dataType.string("成都")
        }
    }
});
modelList.setModel({
    name: "clientBasic",
    describe: "客户基础模型",
    structure: {
        "id": {
            "type": "int",
            "describe": "客户id",
            "key": true,
            "mappingName": "id",
            "mappingType": "int",
            "defaultValue": dataType.int("1")
        },
        "key": {
            "type": "int",
            "describe": "key",
            "mappingType": function (data) {
                return data.id;
            },
            "defaultValue": dataType.int("1")
        }
    }
}).inheritOrganizer([modelList.getModel("zfBasicUserInfo")]);

modelList.setModel({
    name: "userGSP",
    describe: "用户GSP模型",
    structure: {
        "businessLicense": {
            "type": "string",
            "describe": "营业执照号",
            "mappingName": "businessLicense",
            "mappingType": "string",
            "defaultValue": dataType.string(434234234)
        }    }
});


/**
 * 中富客户拓展数据模型
 */
modelList.setModel({
    name: "client",
    describe: "客户模型",
    structure: {}
}).inheritOrganizer([modelList.getModel("zfClientBasic"), modelList.getModel("zfUserGSP")]);