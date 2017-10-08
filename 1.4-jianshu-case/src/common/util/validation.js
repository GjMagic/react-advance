
// 表单的策略类, 定义了所有的验证算法, 他们不会主动调用, 而是等待执行环境的调用
let formValidation = {
    isEmpty: function(val, errorMsg){
        if(val === ''){
            return errorMsg;
        }
    },
    hasSpace: function(val, errorMsg){
        if(/\s/g.test(val)){
            return errorMsg;
        }
    },
    minLength: function(val, length, errorMsg){
        if(val.length < length){
            return errorMsg;
        }
    },
    maxLength: function(val, length, errorMsg){
        if(val.length > length){
            return errorMsg;
        }
    },
    mustLetterHead: function(val, errorMsg){
        if(!/^[a-z]/i.test(val)){
            return errorMsg;
        }
    },
    isNumberHead: function(val, errorMsg){
        if(/^\d/.test(val)){
            return errorMsg;
        }
    },
    isZeroHead: function(val, errorMsg){
        if(/^0/.test(val)){
            return errorMsg;
        }
    },
    mustAllNum: function(val, errorMsg){
        if(/\D/g.test(val)){
            return errorMsg;
        }
    },
    isPhoneNum: function(val, errorMsg){
        if(!/^1[34578][0-9]{9}$/.test(val)){
            return errorMsg;
        }
    },
    isID: function(val, errorMsg){
        var ary = val.split('');
        var facAry = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
        var tempFac = 0;
        for(var i=0, l=facAry.length; i<l; i++){
            tempFac += (parseInt(ary[i])*facAry[i]);
        }
        tempFac = tempFac%11;
        tempFac = tempFac === 10 ? 'X' : tempFac;

        if(!/^([1[1-5]|2[1-3]|3[1-7]|4[1-6]|5[0-4]|6[1-5]])0\d{14}[\dX]$/.test(val) || tempFac!=ary[17]){
            return errorMsg;
        }
    },
    isMail: function(val, errorMsg){
        if(!/^[a-z][\w\.-]{3,19}@[\da-z]{2,12}\.com(\.cn)?$/i.test(val)){
            return errorMsg;
        }
    },
    isBirth: function(val, errorMsg){
        var dateArr = val.match(/\d+/g);
        var date = dateInfo(new Date(dateArr.join()));

        if( !isMatch() || !isVali()){
            return errorMsg;
        }

        function isMatch(){
            return dateArr[2] == date.day;
        };

        function isVali(){
            var newDate = dateInfo(new Date());
            if(newDate.year > date.year){return true;};
            if(newDate.year == date.year && newDate.mon > date.mon){return true;};
            if(newDate.year == date.year && newDate.mon == date.mon && newDate.day >= date.day){return true;};
        };
        function dateInfo(date){
            return {
                year: date.getFullYear(),
                mon: date.getMonth(),
                day: date.getDate()
            };
        };

    }
};

/*
    Validator 是一个执行环境,它接收用户请求,并告知用户是否验证通过
    但它本身不具备验证能力, 它需要把请求委托给表单的策略类, 策略类才是真正的封装了验证算法(策略类见上面代码)
*/

export default class Validator{
    constructor(){
        this.domRuleCache = {};
        this.valueRuleCache = {};
    }
    /*
    add方法负责给某个表单控件绑定验证规则, 把验证规则存到ruleCache中
    它支持同时一次添加多条规则到同一个dom上
    */
    addByDom(dom, name, rules){
        let ary = [],
            self = this;
        for(var i=0, rule; rule = rules[i++];){
            (function(rule){
                var strategyAry = rule.strategy.split(':'),
                    strategy = strategyAry.shift();
                    strategyAry.unshift(null);
                    strategyAry.push(rule.errorMsg);

                ary.push(function(){
                    strategyAry[0] = dom.value;
                    return formValidation[strategy].apply(self,strategyAry);
                });
            })(rule);
        }
        this.domRuleCache[name] = ary;
    }

    addByValue(name, rules){
        let ary = [],
            self = this;
        for(var i=0, rule; rule = rules[i++];){
            (function(rule){
                var strategyAry = rule.strategy.split(':'),
                    strategy = strategyAry.shift();
                    strategyAry.unshift(null);
                    strategyAry.push(rule.errorMsg);

                ary.push(function(value){
                    strategyAry[0] = value;
                    return formValidation[strategy].apply(self,strategyAry);
                });
            })(rule);
        }
        this.valueRuleCache[name] = ary;
    }

    /*
    valiOne方法对某个表单提交的值进行验证,
    它需要传入一个name,来取出对应的验证规则
    如果值不合法, 返回对应的错误信息
    */

    valiOneByDom(name){
        for(var i=0, fn; fn = this.domRuleCache[name][i++];){
            var msg = fn();
            if( msg ){
                return msg;
            }
        }
    }

    valiOneByValue(name,value){
        for(var i=0, fn; fn = this.valueRuleCache[name][i++];){
            var msg = fn(value);
            if( msg ){
                return msg;
            }
        }
    }

    /*
    valiAll方法在此处用不到,他会遍历所有的规则进行验证,并返回错误信息
    比如你有一个提交按钮对整个表单进行提交,这个方法就很有用了
    因为是遍历所有绑定到dom上的验证规则,也就不需要传入name了
    */

    valiAllByDom(){
        for(var name in this.domRuleCache){
            this.valiOneByDom(name);
        }
    }

    valiALlByValue(){
        for(var name in this.valueRuleCache){
            this.valiOneBy(name);
        }
    }

    alertTool(msg){
        if(msg){
            return mag;
        }
    }
}
