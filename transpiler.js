'use strict';
var ConditionTranspiler = {
    transpile: (function () {
        var vals = {
            $eq: "=",
            $neq: "!=",
            $lt: "<",
            $lte: "<=",
            $gt: ">",
            $gte: ">=",
            $and: "AND",
            $or: "OR",
        }

        return function (cond) {
            if (cond === null || cond === undefined) return;
            var keys = Object.keys(cond);
            if (keys === null || keys === undefined) return;
            var token = keys[0];

            var child = cond[token];
            if (child[0] !== undefined) {
                return "(" + this.transpile(child[0]) + " " + vals[token] + " " + this.transpile(child[1]);
            }

            var key = Object.keys(child)[0];
            return "'" + key + "' " + vals[token] + " " + child[key];
        }
    })()
}

var cond, sql;
// A single equality comparison with a ":name" parameter.
cond = {$eq: {name: ':name'}};
sql = ConditionTranspiler.transpile(cond);
console.log(sql); // `name` = :name
// A single less-than comparison with a ":myAge" parameter.
cond = {$lt: {age: ':myAge'}};
sql = ConditionTranspiler.transpile(cond);
console.log(sql); // `age` < :myAge
// Comparison between two table columns.
cond = {$eq: {'u.userID':'pn.userID'}};
sql = ConditionTranspiler.transpile(cond);
console.log(sql); // `u`.`userID` = `pn`.`userID`
// Nested boolean comparisons.
cond = {
    $and: [
        {$eq: {gender: ':male'}},
        {
            $or: [
                {$eq: {occupation: ':sales'}},
                {$lte: {salary: ':salary'}}
            ]
        }
    ]
};

sql = ConditionTranspiler.transpile(cond);
console.log(sql); // (`gender` = :male AND (`occupation` = :sales OR `salary` <= :salary))
