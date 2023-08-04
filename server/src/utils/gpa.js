const gpa = (point, unit)=>{
    const totalPoint = point.reduce((total, currentValue)=> total + currentValue, 0)
    const totalUnit = unit.reduce((total, currentValue)=> total + currentValue, 0)
    return totalPoint / totalUnit
}

module.exports = {
    gpa
}
