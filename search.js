// 比较的方法
const compareMethods = {
  gt(a, b) {
    return a > b;
  },
  gte(a, b) {
    return a >= b;
  },
  lt(a, b) {
    return a < b;
  },
  lte(a, b) {
    return a <= b;
  },
};

let datalist = [
  // {
  //   age: null,
  //   createdname: "系统管理员",
  //   names: "张三",
  //   zhuangt: "待处理",
  //   yanzcd: "严重",
  //   yanzr: null,
  //   fuzr: "赵开",
  // },
  // {
  //   age: "10",
  //   createdname: "赵开元",
  //   names: "张三",
  //   zhuangt: "处理中",
  //   yanzcd: "严重",
  //   yanzr: null,
  //   fuzr: "赵开",
  // },
  // {
  //   age: "17",
  //   createdname: "系统管理员",
  //   names: "都铎",
  //   zhuangt: "待处理",
  //   yanzcd: "致命",
  //   yanzr: null,
  //   fuzr: "赵开",
  // },
  // {
  //   age: "21",
  //   createdname: "系统管理员",
  //   names: "李long",
  //   zhuangt: "待处理",
  //   yanzcd: "一般",
  //   yanzr: null,
  //   fuzr: "赵开",
  // },
  // {
  //   age: "19",
  //   createdname: "张三",
  //   names: "张三",
  //   zhuangt: "已完成",
  //   yanzcd: "低",
  //   yanzr: null,
  //   fuzr: "赵开",
  // },
  // {
  //   age: "12",
  //   createdname: "张2",
  //   names: "张五",
  //   zhuangt: "草稿",
  //   yanzcd: "一般",
  //   yanzr: null,
  //   fuzr: "赵开元",
  // },
  // {
  //   age: "12",
  //   createdname: "张2",
  //   names: "张三s",
  //   zhuangt: "草稿",
  //   yanzcd: "轻微",
  //   yanzr: null,
  //   fuzr: "赵开",
  // },
  // {
  //   age: "14",
  //   createdname: "张2",
  //   names: null,
  //   zhuangt: "处理中",
  //   yanzcd: "一般",
  //   yanzr: null,
  //   fuzr: "李四",
  // },
  {
    age: "12",
    createdname: "张2",
    names: "张三三",
    zhuangt: "处理中",
    yanzcd: "轻微",
    yanzr: null,
    fuzr: "李四",
    shijian:"2023-12-28"
  },
  {
    age: "12",
    createdname: "张2",
    names: "张三",
    zhuangt: [null],
    yanzcd: "严重",
    yanzr: null,
    fuzr: "李四",
    shijian:"2023-11-28"
  },
];

let params = {
  // age: "10",
  names: "张三", //&&
  // zhuangt: ["处理中", "待处理"], //||
  shijian:["2023-12-25","2024-01-23"],
  yanzcd: ["轻微", "一般"],
  //  yanzr:"zky"
};
export const generateCondition = () => {
  let searchdatas = [];

  searchdatas = datalist.filter((items, index) => {
    let list = [];
    list = Object.keys(params).map((key) => {
      const conditions = [];
      const value = params[key];
      //判断出参数项中为数组的 并且不是时间格式的   
      if (Array.isArray(value) && new Date(value[0])=='Invalid Date') {
        const orConditions = value.map((item) => ({
          func: () => {
            // console.log("items[key] === item",items[key] === item);
            if (items[key] == null) {
              return false;
            }
            return items[key] === item;
          },
        }));
        conditions.push({
          func: () => {
            return Or(orConditions);
          },
        });
      } else {
        //且的条件
        conditions.push({
          func: () => {
            console.log("items[key]", items[key]);
            console.log("params[key]", params[key]);
            // console.log("items[key] === params[key];",items[key] === params[key]);

            //判断是否是空值 如果是 就直接false
            if (items[key] == null) {
              return false;
            }
            //判断时间范围逻辑
            if(Array.isArray(params[key])){
              return contrasttime(params[key][0],params[key][1],items[key])
            }
            //精确查询查询
            // return items[key] === params[key];
            //模糊查询
            return items[key].indexOf(params[key]) === 0;
          },
        });
      }
      
      return conditions[0];
    });
    console.log(list);
    return And(list);
  });
  return searchdatas;
};

// 遍历条件做且运算/
export const And = (conditions) => {
  // console.log("且运算中的conditions参数:",conditions);
  let flag = true;
  for (let i = 0; i < conditions.length; i++) {
    // console.log(conditions.length);
    const func = conditions[i];
    // console.log(`且运算的func${i}:`,func);
    // console.log("且运算的func111:",func.func());

    if (!func.func()) {
      flag = false;
      break;
    }
  }
  // console.log("且运算中的flag",flag);
  return flag;
};

// 或预算
export const Or = (conditions) => {
  // console.log("或运算中的conditions参数",conditions);
  let flag = false;
  for (let i = 0; i < conditions.length; i += 1) {
    const func = conditions[i];
    // console.log("或运算的func:",func);
    // console.log("或运算的func111:",func.func());
    if (func.func()) {
      flag = true;
      break;
    }
  }
  // console.log("或运算中的flag",flag);
  return flag;
};

//查询是否在时间范围内
export const contrasttime = (starttime, endtime, time) => {
  let starttimes = new Date(starttime);
  let endtimes = new Date(endtime);
  let times = new Date(time);
  return (
    new Date(times) >= new Date(starttimes) && new Date(times) <= new Date(endtimes)
  );
};
