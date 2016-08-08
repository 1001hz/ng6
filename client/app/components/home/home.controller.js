class HomeController {
  constructor(AlbumService, LoaderService) {
    var self = this;
    self.name = 'home';
    self.AlbumService = AlbumService;
    self.LoaderService = LoaderService;

    self.LoaderService.start();
    self.AlbumService.getAlbum()
      .then(function(album){
        self.album = album;
      })
      .catch(function(error){
        console.log("reject"+error);
      })
      .finally(function(){
        self.LoaderService.stop();
      });
  }
}
HomeController.$inject = ['AlbumService', 'LoaderService'];
export default HomeController;
