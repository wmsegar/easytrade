export interface UserSignupRequestBody {
    PackageId: number
    FirstName: string
    LastName: string
    Username: string
    Email: string
    Address: string
    HashedPassword: string
    Origin: string
}