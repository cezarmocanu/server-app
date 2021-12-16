user 
Cezar Mocanu(10) has a single account in TennantInc

#### TENNANT is IGNORED ATM

TennantInc has 2 services
- engeneering
    resources
    -> pr
- financial
    resources
    -> salaries


Cezar makes a GET request to engeneering/pr

data sent: (
    userId: 10 - thruogh JWT?,
    serviceUUID: enginnering,
    resource: pr,
    JWT
)

Engeneering/pr will require TennantInc to check the request of the user.
TennantInc sent to authorization to check if user has permissions to access that endpoint

data sent: (
    userId: 10 - thruogh JWT?,
    serviceUUID: enginnering,
    resource: pr,
    right: READ - infered form GET
    JWT
)

Authorization service will check if the JWT is valid

YES

Authorization will check if the user has a certificate for that service

YES

Authorization will check if the user can READ the resource from certificate

YES

Authorization will return that the user is authorized
