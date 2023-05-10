list = ["boy","girl","man","woman"]


function arrayTest(list,position) {

    if (list.includes(position)) {
        return list.indexOf(position);
    }
    else console.log("not here")
}


list2 = ["apple","banana","pear","orange"]

console.log(arrayTest(list2,"apple"))

