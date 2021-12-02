interface RetrieveAccountResponse extends BaseResponse {
    api_key: string,
    email: string,
}
type AccountsRetrieve = {
    retrieve: () => Promise<RetrieveAccountResponse>
}
interface AccountsConfig extends ConfigI {
    password: string,
}