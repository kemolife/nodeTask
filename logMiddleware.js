const fs = require('fs');
const file = 'request.csv';

/**
 * middleware, which would receive input into an array of methods
 * (for example, ['POST', 'PUT']) and entered the data in the csv-file
 * @param data
 * @returns {Function}
 */
module.exports = function (data) {
    return function (req, res, next) {
        try {
            data.forEach(function (value) {
                if (value === req.method) {
                    let data = [req.method, req.host];
                    addToCsv(file, data).then(function (data) {
                        console.log(data);
                    }, function (reason) {
                        console.error(reason);
                    })
                }
            });
            next();
        } catch (e) {
            throw e;
        }
    }
};

/**
 * add new row to csv file
 * @param file
 * @param data
 * @returns {Promise}
 */
function addToCsv(file, data) {
    return new Promise(function (resolve, reject) {
        let csvData = data.join(',') + '\r\n';
        fs.appendFile(file, csvData, function (err) {
            if (err) reject(err);
            resolve('Append to '+file);
        });
    });
}
