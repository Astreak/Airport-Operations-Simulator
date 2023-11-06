function createRideInfo(driverId: String, customerId: String, cost: Number,from: String, to: String): Object | undefined {
    let rideData: Object = {
                'driverId': driverId,
                'customerId': customerId,
                'pickup': false,
                'active': true,
                'tripCost': cost,
                'ride': [from, to],
    }
    return rideData;
}
export { createRideInfo };