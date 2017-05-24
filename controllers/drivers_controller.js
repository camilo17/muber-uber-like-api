const Driver = require('../models/driver'); 

module.exports = {
    greeting(req, res) {
        res.send({hi: 'there'})
    },
    index(req, res, next) {
        const { lng, lat } = req.query; //express parses the query string for us

        Driver.geoNear(
            {
                type: 'Point',
                coordinates: [parseFloat(lng), parseFloat(lat)] //when express parses the query string it returns a string, not a number
            },
            {
                spherical: true,
                maxDistance: 200000         //200 kilometers or 200000 meters
            }
        )
            .then(drivers => res.send(driveres))
            .catch(next); 

    },
    create(req, res, next) {
        console.log(req.body); 
        const driverProps = req.body;

        Driver.create(driverProps)
            .then(driver => {
                res.send(driver)
            .catch(next);     
            })
        

    },
    edit(req, res, next) {
        const driverId = req.params.id; 
        const driverProps = req.body; 
        Driver.findByIdAndUpdate({_id: driverId}, driverProps)
            .then(() => Driver.findById({_id: driverId}))
            .then(driver => res.send(driver))
            .catch(next); 


    },
    delete(req, res, next) {
        const driverId = req.params.id; 

        Driver.findByIdAndRemove({_id: driverId})
            .then((driver) => {
                res.status(204).send(driver); 
            })
            .catch(next); 
    }

};