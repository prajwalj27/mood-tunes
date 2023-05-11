export const getRandomImages = () => {
  const Images = [
    {
      image:
        'https://i.pinimg.com/564x/f5/31/be/f531be33d92a1431d5b274e65eae3a52.jpg',
    },
    {
      image:
        'https://e1.pxfuel.com/desktop-wallpaper/424/1010/desktop-wallpaper-all-things-spotify-playlist-covers-aesthetic-playlist-covers.jpg',
    },
    {
      image:
        'https://d2rd7etdn93tqb.cloudfront.net/wp-content/uploads/2022/03/spotify-playlist-cover-orange-headphones-032322.jpg',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLyC_WrqH3dfkrifv9Uj494gjXGUzDDb4ydQ&usqp=CAU',
    },
    {
      image:
        'https://e1.pxfuel.com/desktop-wallpaper/532/110/desktop-wallpaper-7-best-websites-to-spotify-playlist-covers-aesthetic-playlist-covers.jpg',
    },
    {
      image:
        'https://marketplace.canva.com/EAEdeiU-IeI/1/0/1600w/canva-purple-and-red-orange-tumblr-aesthetic-chill-acoustic-classical-lo-fi-playlist-cover-jGlDSM71rNM.jpg',
    },
    {
      image:
        'https://i.pinimg.com/550x/cb/52/5d/cb525d06688974811d8a94e130ab21dc.jpg',
    },
    {
      image:
        'https://e1.pxfuel.com/desktop-wallpaper/253/480/desktop-wallpaper-s%E2%80%8Bp%E2%80%8Bo%E2%80%8Bt%E2%80%8Bi%E2%80%8Bf%E2%80%8By%E2%80%8B-%E2%80%8Bc%E2%80%8Bo%E2%80%8Bv%E2%80%8Be%E2%80%8Br%E2%80%8B-%E2%80%8Bp%E2%80%8Bh%E2%80%8Bo%E2%80%8Bt%E2%80%8Bo%E2%80%8Bs-spotify-playlist-cover.jpg',
    },
    {
      image: 'https://i.redd.it/0ls5x7mm8r011.jpg',
    },
    {
      image:
        'https://i.pinimg.com/originals/19/f7/68/19f76854a898d32735a5cfdc2d2fc262.jpg',
    },
    {
      image:
        'https://blog.spoongraphics.co.uk/wp-content/uploads/2017/album-art/5.jpg',
    },
    {
      image:
        'https://i.pinimg.com/originals/ac/7d/a4/ac7da4faf6b2c46f6942b1d1bc64e980.jpg',
    },
    { image: 'https://picsum.photos/800/800?random=1' },
    { image: 'https://picsum.photos/800/800?random=2' },
    { image: 'https://picsum.photos/800/800?random=3' },
    { image: 'https://picsum.photos/800/800?random=4' },
    { image: 'https://picsum.photos/800/800?random=5' },
    { image: 'https://picsum.photos/800/800?random=6' },
    { image: 'https://picsum.photos/800/800?random=7' },
    { image: 'https://picsum.photos/800/800?random=8' },
    { image: 'https://picsum.photos/800/800?random=9' },
    { image: 'https://picsum.photos/800/800?random=10' },
    {
      image: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/rap-cd-album-mixtape-cover-design-template-e1d84d9b97be5ec554540c2899f532c7_screen.jpg?ts=1632156597'
    },
    {
      image: 'https://i.pinimg.com/236x/3f/64/4d/3f644dae1f36d81c094beb6ce6b0aef1--exposure-photography-white-photography.jpg'
    }
  ];

  const randomImageIndex = Math.floor(
    Math.random() * Math.floor(Images.length)
  );
  return Images[randomImageIndex].image;
};