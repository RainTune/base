export const trim = str => {
  if (!str) return "";
  str = str + "";
  str.replace(/(^\s*)|(\s*$)/g, "");
  return str;
};
export const isBlank = str => (trim(str) == "" ? true : false);
// 封装事件方法
export const addEvent = function(elem, type, handle) {
  if (elem.addEventListener) {
    elem.addEventListener(type, handle, false);
  } else if (elem.attachEvent) {
    elem.attachEvent("on" + type, function() {
      handle.call(elem);
    });
  } else {
    elem["on" + type] = handle;
  }
};

// 获取当前用户的所有信息
export const user = function() {
  let len = localStorage.length,
    i = len - 1,
    val = {};
  while (i >= 0 && Object.keys(val).length <= 0) {
    let getKey = localStorage.key(i);
    let getVal = localStorage.getItem(getKey);
    try {
      getVal = JSON.parse(getVal);
      if (getKey == getVal.username) {
        val = getVal;
      }
      i--;
    } catch (err) {
      i--;
      continue;
    }
  }
  return val;
};
// 获取当前用户的指定信息 注意此函数为了避免多次执行user函数
export const getUserInfo = function() {
  let userInfo = user();
  return info => (userInfo == null ? null : userInfo[info]);
};

// 导入文件方法
export const _import = file => () =>
  import(/* webpackChunkName: "[request]" */ `@/views/${file}`);

export const dataType = {
  isString(o) {
    //是否字符串
    return Object.prototype.toString.call(o).slice(8, -1) === "String";
  },
  isNumber(o) {
    //是否数字
    return Object.prototype.toString.call(o).slice(8, -1) === "Number";
  },
  isBoolean(o) {
    //是否boolean
    return Object.prototype.toString.call(o).slice(8, -1) === "Boolean";
  },
  isFunction(o) {
    //是否函数
    return Object.prototype.toString.call(o).slice(8, -1) === "Function";
  },
  isNull(o) {
    //是否为null
    return Object.prototype.toString.call(o).slice(8, -1) === "Null";
  },
  isUndefined(o) {
    //是否undefined
    return Object.prototype.toString.call(o).slice(8, -1) === "Undefined";
  },
  isObj(o) {
    //是否对象
    return Object.prototype.toString.call(o).slice(8, -1) === "Object";
  },
  isArray(o) {
    //是否数组
    return Object.prototype.toString.call(o).slice(8, -1) === "Array";
  },
  isDate(o) {
    //是否时间
    return Object.prototype.toString.call(o).slice(8, -1) === "Date";
  },
  isRegExp(o) {
    //是否正则
    return Object.prototype.toString.call(o).slice(8, -1) === "RegExp";
  },
  isError(o) {
    //是否错误对象
    return Object.prototype.toString.call(o).slice(8, -1) === "Error";
  },
  isSymbol(o) {
    //是否Symbol函数
    return Object.prototype.toString.call(o).slice(8, -1) === "Symbol";
  },
  isPromise(o) {
    //是否Promise对象
    return Object.prototype.toString.call(o).slice(8, -1) === "Promise";
  },
  isSet(o) {
    //是否Set对象
    return Object.prototype.toString.call(o).slice(8, -1) === "Set";
  },
  isBlob(o) {
    //是否Blob对象
    return Object.prototype.toString.call(o).slice(8, -1) === "Blob";
  }
};

// 将小数变成百分比,n是代表保留几位小数
export const toPercent = function(num, n) {
  if (num === 0) {
    return num + "%";
  }
  let str = num * 100 + "",
    index = str.indexOf("."),
    res = index > -1 ? str.substring(0, index + n + 1) : str;
  return res + "%";
};
