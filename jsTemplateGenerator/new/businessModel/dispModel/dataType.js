var enumMaker = require('./enum');
window.dataType = {
    "string": function (string) {
        return string && string.toString();
    },
    "int": function (int) {
        return parseInt(int);
    },
    "float": function (float) {
        return Number(float).toFixed(2);
    },
    "boolean": function (boolean) {
        return !!boolean;
    },
    "time": function (time) {
        if (typeof time == "string") {
            time = new Date(time);
            if (time.toString() == "Invalid Date") {
                return undefined;
            }
            return time;
        }
        else return time
    },
    "enum": function (type) {
        return enumMaker(type);
    },
    "encode": function (value) {
        return encodeURI(value);
    }
};