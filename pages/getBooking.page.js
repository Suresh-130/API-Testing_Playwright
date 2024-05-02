
exports.BookingIds = class BookingIds{

    constructor(request){
        this.request = request
    }

    async getBookingIds(URL){
        const getResponse = await this.request.get(URL)
        return getResponse;
    }
}