module.exports = function (array, { order_by, order_type }) {
    if (!order_by || !order_type) {
        const error = new Error('Undefined order or type');
        error.status = 400;
        throw error;
    }
    if (order_by === 'id') {
        array.sort((a, b) => a.id > b.id);
    } else if (order_by === 'first_name') {
        array.sort((a, b) => a.first_name.localeCompare(b.first_name));
    }

    if (order_type === 'desc') {
        array = array.reverse();
    }
};
