export const userRoles = {
    // 1Admin, 2Owner, 3Driver, 4Passenger, 5OPERATOR
    admin: 1,
    vehicleOwner: 2,
    driver: 3,
    passenger: 4,
    operator: 5
}

export const tripStatus = {
    waitingForDriver: 'WAITING FOR DRIVER',
    finished: 'FINISHED',
    finishedPaid: 'FINISHED PAID',
    started: 'STARTED',
    rejectedByDriver: 'REJECTED BY DRIVER',
    rejectedByPassenger: 'REJECTED BY PASNGR'
}

export const driverStatus = {
    busy: 0,
    available: 1
}

export const driverApproval = {
    approved: 1,
    declined: 0
}

export const paymentStatus = {
    paid: 'PAID',
    toBePaid: 'TO BE PAID'
}

export const userStatus = {
    active: 'ACTIVE',
    unregistered: 'UNREGISTERED'
}

export const tripCost = {
    perMeter: 0.15
}