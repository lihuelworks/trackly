const getDateRangeFilter = (queryObj) => {
    const dateFilter = {};

    if (queryObj.from) dateFilter.$gte = queryObj.from;
    if (queryObj.to) dateFilter.$lte = queryObj.to;

    return dateFilter;
};

module.exports = { getDateRangeFilter };  