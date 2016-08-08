class AlbumService {

  constructor(ApiService) {
    this.ApiService = ApiService;
  }

  getAlbum() {
    return this.ApiService.get('/v1/albums/0sNOF9WDwhWunNAHPD3Baj')
      .then(function(response){
        return response.data;
      });
  }

}
AlbumService.$inject = ['ApiService'];
export default AlbumService;
