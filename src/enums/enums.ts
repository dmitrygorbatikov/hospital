export enum RolesEnum {
   'doctor' = 'doctor',
   'patient' = 'patient',
   'admin' = 'admin',
}

export enum ErrorsEnum {
   'exist' = 'User already exist',
   'userNotFound' = 'User not found',
   'incorrectEmail' = 'Enter correct email',
   'incorrectPassword' = 'Incorrect password',
   'notEnoughRights' = 'Not enough rights',
   'storageNotFound' = 'Storage not found',
   'setRightCapacity' = 'Please set capacity no less than 100',
}

export enum DrugEnum {
   'add' = 'add',
   'get' = 'get',
   'giveOut' = 'giveOut',
}
