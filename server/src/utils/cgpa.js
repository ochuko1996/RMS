const CGPA = (points, units)=> {
    const totalPoint = points.reduce((total, selectedValue)=> total + selectedValue, 0)
    const totalUnit = units.reduce((total, selectedValue)=> total + selectedValue, 0)
    const cgpa = totalPoint / totalUnit
    return cgpa 
}

module.exports = CGPA