import moment from 'moment'

export default {
    sortNumbers: (array, field, compareFn) => {
        let noDataArray = array.filter(el => isNaN(parseInt(el[field])))
        const sortedArray = array
                .filter(el => !noDataArray.includes(el))
                .map(el => {
                    el[field] = parseInt(el[field])
                    return el
                })
                .sort(compareFn)
        return sortedArray[0][field] > sortedArray[sortedArray.length-1][field] 
                    ? sortedArray.concat(noDataArray) 
                    : noDataArray.concat(sortedArray)
    },
    sortStrings: (array, field, sortParams) => {
        if (sortParams.compareFn != undefined) return array.sort(sortParams.compareFn)
        if (sortParams.method != undefined) {
            if (sortParams.method == 'asc') return array.sort((el1, el2) => el1[field].localeCompare(el2[field]))
            if (sortParams.method == 'desc') return array.sort((el1, el2) => el2[field].localeCompare(el1[field]))
        }

        return array
    },
    sortProcents: (array, field, sortParams) => {
        if (sortParams.compareFn != undefined) return array.sort(sortParams.compareFn)
        if (sortParams.method != undefined) {
            if (sortParams.method == 'asc') return array.sort((el1, el2) => parseFloat(el1[field].replace(',', '.')) - parseFloat(el2[field].replace(',', '.')))
            if (sortParams.method == 'desc') return array.sort((el1, el2) => parseFloat(el2[field].replace(',', '.')) - parseFloat(el1[field].replace(',', '.')))
        }

        return array
    },
    sortDates: (array, field, sortParams) => {
        if (sortParams.compareFn != undefined) return array.sort(sortParams.compareFn)
        if (sortParams.method != undefined) {
            if (sortParams.method == 'asc') 
                return array
                    .sort((el1, el2) => moment(el1[field]).diff(moment(el2[field])))
            if (sortParams.method == 'desc') 
            return array
                    .sort((el1, el2) => moment(el2[field]).diff(moment(el1[field])))
        }

        return array
    },
    elementsToInt: (array, field) => {
        return array.map(el => {
            el[field] = isNaN(parseInt(el[field])) ? el[field] : parseInt(el[field])
            return el
        })
    },
    shuffle: (array) => array.sort(() => Math.random() - 0.5)
}
