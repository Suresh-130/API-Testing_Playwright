
exports.BookingById = class BookingById{
    constructor(request){
        this.request = request
    }

    async getBookingsById(URL){
        const getOneResponse = await this.request.get(URL)
        return getOneResponse;
    }
}