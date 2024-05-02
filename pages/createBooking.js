
exports.CreateBooking = class CreateBooking{

    constructor(request){
        this.request = request
    }

    async addBooking(authToken,fakeData,URL){
        const postResponse = await this.request.post(URL,{
        headers : {
          Cookie : `token=${authToken}`
        },
        data : fakeData
        })
      return postResponse;
    }
}